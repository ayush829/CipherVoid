/**
 * Handles toggling between light and dark modes globally.
 * Uses localStorage to remember the user's preference across pages.
 */

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        updateThemeIcon("☀️", "Switch to Light Mode");
    } else {
        updateThemeIcon("🌙", "Switch to Dark Mode");
    }
});

function toggleTheme() {
    const isDark = document.body.classList.contains("dark-theme");
    
    if (isDark) {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
        updateThemeIcon("🌙", "Switch to Dark Mode");
    } else {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
        updateThemeIcon("☀️", "Switch to Light Mode");
    }
}

function updateThemeIcon(icon, title) {
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach(btn => {
        btn.innerHTML = icon;
        btn.title = title;
    });
}
