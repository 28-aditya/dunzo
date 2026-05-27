console.log("JS connected");

// =========================
// GLOBAL UI CLEANUP
// =========================

document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.remove("active");
});

// =========================
// THEME TOGGLE
// =========================

const theme_button = document.getElementById("theme-toggle");

theme_button.addEventListener("click", function () {
    console.log("theme toggled");
    document.body.classList.toggle("light-mode");
});

// =========================
// STATE
// =========================

let state = {
    currentView: "dashboard",
    tasks: [],
    addedCategories: []
};

// =========================
// TASK CLASS
// =========================

class TaskItem {
    constructor(title, description, status, category, date, time) {
        this.task_title = title;
        this.task_description = description;
        this.task_status = status;
        this.task_category = category;
        this.task_date = date;
        this.task_time = time;
    }
}

// =========================
// SIDEBAR NAVIGATION
// =========================

function switchView(viewId, viewName, element) {
    document.querySelectorAll(".sidebar-item").forEach(i => i.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));

    document.getElementById(viewId).classList.add("active");
    element.classList.add("active");

    state.currentView = viewName;
}

const sb_dashboard = document.getElementById("nav-dashboard");
sb_dashboard.classList.add("active");

sb_dashboard.addEventListener("click", () => {
    switchView("view-dashboard", "dashboard", sb_dashboard);
});

document.getElementById("nav-today").addEventListener("click", function () {
    switchView("view-today", "today", this);
});

document.getElementById("nav-upcoming").addEventListener("click", function () {
    switchView("view-upcoming", "upcoming", this);
});

document.getElementById("nav-completed").addEventListener("click", function () {
    switchView("view-completed", "completed", this);
});

document.getElementById("nav-overdue").addEventListener("click", function () {
    switchView("view-overdue", "overdue", this);
});

document.getElementById("nav-analytics").addEventListener("click", function () {
    switchView("view-analytics", "analytics", this);
});

document.getElementById("nav-notes").addEventListener("click", function () {
    switchView("view-notes", "notes", this);
});

document.getElementById("nav-search").addEventListener("click", function () {
    switchView("view-search", "search", this);
});

document.getElementById("nav-settings").addEventListener("click", function () {
    switchView("view-settings", "settings", this);
});

// =========================
// TASK MODAL ELEMENTS
// =========================

const new_task = document.getElementById("new-task-btn");
const task_modal = document.getElementById("task-modal");
const close_task_modal = document.getElementById("close-modal");
const create_task_modal = document.getElementById("create-task");

const date = document.getElementById("task-date");
const time = document.getElementById("task-time");

const categorySelect = document.getElementById("task-category");
const customInput = document.getElementById("custom-category");
const customGroup = document.getElementById("custom-category-group");

// =========================
// FIX: DATE MIN (IMPORTANT)
// =========================

const nowInit = new Date();
date.min = nowInit.toISOString().split("T")[0];

// =========================
// CUSTOM CATEGORY TOGGLE
// =========================

categorySelect.addEventListener("change", function () {
    if (this.value === "custom") {
        customGroup.style.display = "block";
    } else {
        customGroup.style.display = "none";
        customInput.value = "";
    }
});

// =========================
// DATE VALIDATION (TIME MIN)
// =========================

date.addEventListener("click", function() {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    date.min = today;
});

date.addEventListener("change", function () {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    time.min = (date.value === today) ? currentTime : "";
});

// =========================
// CREATE TASK
// =========================

create_task_modal.addEventListener("click", function () {

    const title = document.getElementById("task-title");
    const description = document.getElementById("task-desc");
    const status = document.getElementById("task-status");

    const task_error = document.getElementById("task-error");
    const time_error = document.getElementById("task-time-error");

    task_error.classList.remove("visible");
    time_error.classList.remove("visible");

    // REQUIRED FIELDS CHECK
    if (
        title.value === "" ||
        status.value === "" ||
        categorySelect.value === "" ||
        date.value === "" ||
        time.value === ""
    ) {
        task_error.classList.add("visible");
        return;
    }

    // TIME VALIDATION
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    if (date.value === today && time.value < currentTime) {
        time_error.classList.add("visible");
        return;
    }

    // CATEGORY HANDLING
    let finalCategory = categorySelect.value;

    if (finalCategory === "custom") {

        if (customInput.value.trim() === "") {
            task_error.classList.add("visible");
            return;
        }

        finalCategory = customInput.value.trim();

        const exists = [...categorySelect.options].some(
            opt => opt.value === finalCategory
        );

        if (!exists) {
            const option = document.createElement("option");
            option.value = finalCategory;
            option.textContent = finalCategory;

            const customOption = categorySelect.querySelector('option[value="custom"]');
            categorySelect.insertBefore(option, customOption);

            state.addedCategories.push(finalCategory);
        }
    }

    // CREATE TASK
    const task = new TaskItem(
        title.value,
        description.value,
        status.value,
        finalCategory,
        date.value,
        time.value
    );

    state.tasks.push(task);

    console.log(state.tasks);

    // CLOSE MODAL
    task_modal.classList.remove("active");

    // RESET FORM
    title.value = "";
    description.value = "";
    status.value = "";
    categorySelect.value = "";
    customInput.value = "";
    customGroup.style.display = "none";
    date.value = "";
    time.value = "";
});

// =========================
// MODAL CONTROLS
// =========================

new_task.addEventListener("click", function () {
    task_modal.classList.add("active");
});

close_task_modal.addEventListener("click", function () {
    task_modal.classList.remove("active");

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-status").value = "";
    categorySelect.value = "";
    customInput.value = "";
    customGroup.style.display = "none";
    date.value = "";
    time.value = "";

    document.getElementById("task-error").classList.remove("visible");
    document.getElementById("task-time-error").classList.remove("visible");
});