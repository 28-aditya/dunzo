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
// DATE MIN
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
// DATE VALIDATION
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
    refreshCurrentView();

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

// ========================
// QUICK ADD FUNCTIONALITY
// ========================

const quickAddInput     =   document.getElementById("quick-add-input");
const quickAddButton    =   document.getElementById("quick-add-button");

const isAlNum = str => /^[a-z0-9]+$/i.test(str);

quickAddButton.addEventListener("click", function() {
    if (quickAddInput.value.length > 0) {
        const quickTask = new TaskItem(quickAddInput.value,
            "",
            "todo",
            "quick",
            new Date().toISOString().split("T")[0],
            "23:59"
        );

        state.tasks.push(quickTask);
        quickAddInput.value="";

        refreshCurrentView();
    } else {
        alert("please enter a valid task title");
    }
});
