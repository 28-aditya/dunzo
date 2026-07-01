// scripts/app.js

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
    toggleTheme();
});

// =========================
// QUICK ADD
// =========================

const quickInput  = document.getElementById("quick-add-input");
const quickButton = document.getElementById("quick-add-button");

if (quickInput && quickButton) {
    async function handleQuickAdd() {
        const title = quickInput.value.trim();
        if (!title) return;

        const today = new Date().toISOString().split("T")[0];
        const now   = new Date();
        const time  = String(now.getHours()).padStart(2, "0") + ":" +
                      String(now.getMinutes()).padStart(2, "0");

        const task = new TaskItem(title, "", "todo", "personal", today, time);
        state.tasks.push(task);
        quickInput.value = "";

        try {
            await apiCreateTask(task);
        } catch (err) {
            console.error("Quick add failed:", err);
        }

        refreshCurrentView();
    }

    quickButton.addEventListener("click", handleQuickAdd);
    quickInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleQuickAdd();
    });
}

// =========================
// BOOT
// =========================

async function initApp() {
    await loadUserData();
}

initApp();