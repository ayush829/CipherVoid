// Yin-Yang Icons for the theme toggle
const LIGHT_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 0.5s ease;">
    <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
    <path d="M12 2C14.761 2 17 4.239 17 7C17 9.761 14.761 12 12 12C9.239 12 7 14.239 7 17C7 19.761 9.239 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2Z" fill="#000000"/>
    <circle cx="12" cy="7" r="1.5" fill="#000000"/>
    <circle cx="12" cy="17" r="1.5" fill="#ffffff"/>
</svg>`;

const DARK_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg); transition: transform 0.5s ease;">
    <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
    <path d="M12 2C14.761 2 17 4.239 17 7C17 9.761 14.761 12 12 12C9.239 12 7 14.239 7 17C7 19.761 9.239 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2Z" fill="#000000"/>
    <circle cx="12" cy="7" r="1.5" fill="#000000"/>
    <circle cx="12" cy="17" r="1.5" fill="#ffffff"/>
</svg>`;

function updateThemeIcon() {
    const btns = document.querySelectorAll(".theme-toggle-btn");
    const isDark = document.body.classList.contains("dark-theme");
    btns.forEach(btn => {
        btn.innerHTML = isDark ? DARK_ICON : LIGHT_ICON;
        btn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
    updateThemeIcon();
});
