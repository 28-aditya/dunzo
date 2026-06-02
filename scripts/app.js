console.log("JS connected");

// =========================
// GLOBAL UI CLEANUP
// =========================

document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.remove("active");
});

document.getElementById("nav-dashboard").classList.add("active");

const view_header = document.getElementById("view-header");

// =========================
// THEME TOGGLE
// =========================

const theme_button = document.getElementById("theme-toggle");

theme_button.addEventListener("click", function () {
    console.log("theme toggled");
    document.body.classList.toggle("light-mode");
});

refreshCurrentView();
