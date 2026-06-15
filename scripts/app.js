console.log("JS connected");

// =========================
// GLOBAL UI CLEANUP
// =========================

document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.remove("active");
});

document.getElementById("nav-dashboard").classList.add("active");

// =========================
// THEME TOGGLE
// =========================

const theme_button = document.getElementById("theme-toggle");

theme_button.addEventListener("click", function () {
    toggleTheme(); // uses settings.js toggleTheme — updates class, state, and saves
});

refreshCurrentView();