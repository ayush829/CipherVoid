package com.rev.passwordmanager;

import com.rev.passwordmanager.dto.*;
import com.rev.passwordmanager.entity.User;
import com.rev.passwordmanager.repository.PasswordEntryRepository;
import com.rev.passwordmanager.repository.UserRepository;
import com.rev.passwordmanager.repository.SecurityQuestionRepository;
import com.rev.passwordmanager.repository.UserSecurityAnswerRepository;
import com.rev.passwordmanager.service.UserService;
import com.rev.passwordmanager.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;
import com.rev.passwordmanager.entity.SecurityQuestion;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEntryRepository passwordEntryRepository;
    
    @Mock
    private SecurityQuestionRepository securityQuestionRepository;

    @Mock
    private UserSecurityAnswerRepository userSecurityAnswerRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Verifies that the User entity correctly stores and retrieves the username.
     */
    @Test
    public void testUserUsername() {
        User user = new User();
        user.setUsername("ayush");
        assertEquals("ayush", user.getUsername());
    }

    /**
     * Verifies that the User entity correctly stores and retrieves the email address.
     */
    @Test
    public void testUserEmail() {
        User user = new User();
        user.setEmail("ayush@gmail.com");
        assertEquals("ayush@gmail.com", user.getEmail());
    }

    /**
     * Tests the successful registration of a new user.
     * Maps a valid RegisterRequest and verifies that the new user is saved
     * to the database with no pre-existing username or email conflicts.
     */
    @Test
    public void testRegisterUser_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("newuser");
        request.setEmail("new@example.com");
        request.setMasterPassword("password123");
        
        // Mock 3 security answers
        List<SecurityAnswerDTO> mockAnswers = Arrays.asList(
            new SecurityAnswerDTO(), new SecurityAnswerDTO(), new SecurityAnswerDTO()
        );
        mockAnswers.get(0).setQuestionId(1L);
        mockAnswers.get(0).setAnswer("A");
        mockAnswers.get(1).setQuestionId(2L);
        mockAnswers.get(1).setAnswer("B");
        mockAnswers.get(2).setQuestionId(3L);
        mockAnswers.get(2).setAnswer("C");
        request.setSecurityAnswers(mockAnswers);

        when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        
        SecurityQuestion sq1 = new SecurityQuestion();
        when(securityQuestionRepository.findById(anyLong())).thenReturn(Optional.of(sq1));

        ApiResponse<?> response = userService.registerUser(request);

        assertTrue(response.isSuccess());
        assertEquals("User registered successfully!", response.getMessage());
        verify(userRepository, times(1)).save(any(User.class));
    }

    /**
     * Tests standard login where 2FA is NOT enabled.
     * Verifies that matching credentials generate and return a valid JWT token.
     */
    @Test
    public void testLoginUser_Success() {
        LoginRequest request = new LoginRequest();
        request.setUsername("user1");
        request.setMasterPassword("password123");

        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setMasterPassword("hashedPassword");
        mockUser.setTwoFactorEnabled(false);

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("password123", "hashedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("user1")).thenReturn("mock-jwt-token");

        ApiResponse<?> response = userService.loginUser(request);

        assertTrue(response.isSuccess());
        assertEquals("Login successful", response.getMessage());
        assertNotNull(response.getData());
    }

    /**
     * Tests login flow when 2FA IS enabled for the user.
     * Verifies that valid credentials return a "2FA_REQUIRED" response payload
     * instead of a JWT token, forcing the user through the OTP flow.
     */
    @Test
    public void testLoginUser_2FA_Required() {
        LoginRequest request = new LoginRequest();
        request.setUsername("user1");
        request.setMasterPassword("password123");

        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setMasterPassword("hashedPassword");
        mockUser.setTwoFactorEnabled(true);

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("password123", "hashedPassword")).thenReturn(true);

        ApiResponse<?> response = userService.loginUser(request);

        assertTrue(response.isSuccess());
        assertEquals("2FA_REQUIRED", response.getMessage());
    }

    /**
     * Tests the generation of a 6-digit OTP for 2FA.
     * Verifies that an OTP is created, assigned an expiration timestamp,
     * and saved to the user's database record.
     */
    @Test
    public void testGenerateOtp_Success() {
        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setTwoFactorEnabled(true);

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(mockUser));

        ApiResponse<?> response = userService.generateOtp("user1");

        assertTrue(response.isSuccess());
        assertEquals("OTP generated successfully", response.getMessage());
        assertNotNull(response.getData());
        verify(userRepository, times(1)).save(mockUser);
        assertNotNull(mockUser.getOtpCode());
        assertNotNull(mockUser.getOtpExpiry());
    }

    /**
     * Tests the successful verification of an active OTP.
     * Confirms that if the provided OTP matches the stored code and hasn't expired,
     * the system returns a JWT token and clears the OTP from the database.
     */
    @Test
    public void testVerify2FA_Success() {
        Verify2FARequest request = new Verify2FARequest();
        request.setUsername("user1");
        request.setOtp("123456");

        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setOtpCode("123456");
        mockUser.setOtpExpiry(LocalDateTime.now().plusMinutes(1)); // Valid expiry

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(mockUser));
        when(jwtUtil.generateToken("user1")).thenReturn("mock-jwt-token");

        ApiResponse<?> response = userService.verify2FA(request);

        assertTrue(response.isSuccess());
        assertEquals("2FA verification successful", response.getMessage());
        assertNull(mockUser.getOtpCode()); // Cleared after use
        assertNull(mockUser.getOtpExpiry());
        verify(userRepository, times(1)).save(mockUser);
    }

    /**
     * Tests the rejection of an expired OTP.
     * Confirms that if the OTP's expiration timestamp has passed, the validation
     * fails and access is denied.
     */
    @Test
    public void testVerify2FA_Expired() {
        Verify2FARequest request = new Verify2FARequest();
        request.setUsername("user1");
        request.setOtp("123456");

        User mockUser = new User();
        mockUser.setUsername("user1");
        mockUser.setOtpCode("123456");
        mockUser.setOtpExpiry(LocalDateTime.now().minusMinutes(1)); // Expired timer

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(mockUser));

        ApiResponse<?> response = userService.verify2FA(request);

        assertFalse(response.isSuccess());
        assertEquals("OTP has expired. Please generate a new one.", response.getMessage());
    }
}