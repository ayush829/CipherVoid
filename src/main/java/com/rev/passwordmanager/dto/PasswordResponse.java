package com.rev.passwordmanager.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PasswordResponse {

    private Long id;
    private String accountName;
    private String website;
    private String username;
    private String password;
    private String category;
    private String notes;
    private Boolean favorite;

    public PasswordResponse() {}

    public PasswordResponse(Long id, String accountName, String website,
                            String username, String password,
                            String category, String notes, Boolean favorite) {
        this.id = id;
        this.accountName = accountName;
        this.website = website;
        this.username = username;
        this.password = password;
        this.category = category;
        this.notes = notes;
        this.favorite = favorite;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAccountName() { return accountName; }
    public void setAccountName(String accountName) { this.accountName = accountName; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getFavorite() { return favorite; }
    public void setFavorite(Boolean favorite) { this.favorite = favorite; }
}