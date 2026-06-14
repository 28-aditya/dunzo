// =========================
// TASK MODAL ELEMENTS
// =========================

const new_task          = document.getElementById("new-task-btn");
const task_modal        = document.getElementById("task-modal");
const close_task_modal  = document.getElementById("close-modal");
const create_task_modal = document.getElementById("create-task");

const date           = document.getElementById("task-date");
const time           = document.getElementById("task-time");

const categorySelect = document.getElementById("task-category");
const customInput    = document.getElementById("custom-category");
const customGroup    = document.getElementById("custom-category-group");

// =========================
// EDIT STATE
// =========================

let editingTaskId = null;

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

date.addEventListener("click", function () {
    const now   = new Date();
    const today = now.toISOString().split("T")[0];
    date.min    = today;
});

date.addEventListener("change", function () {
    const now   = new Date();
    const today = now.toISOString().split("T")[0];

    const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    time.min = (date.value === today) ? currentTime : "";
});

// =========================
// MODAL HELPERS
// =========================

function resetModalFields() {
    document.getElementById("task-title").value  = "";
    document.getElementById("task-desc").value   = "";
    document.getElementById("task-status").value = "";
    document.getElementById("task-category").value         = "";
    document.getElementById("custom-category").value       = "";
    document.getElementById("custom-category-group").style.display = "none";
    document.getElementById("task-date").value   = "";
    document.getElementById("task-time").value   = "";
    document.getElementById("task-time").min     = "";

    document.getElementById("task-error").classList.remove("visible");
    document.getElementById("task-time-error").classList.remove("visible");
}

function setModalMode(mode) {
    const isEdit = mode === "edit";
    document.querySelector("#task-modal h2").textContent    = isEdit ? "Edit Task"    : "Create Task";
    document.getElementById("create-task").textContent      = isEdit ? "Save Changes" : "Create Task";
    document.getElementById("create-task").dataset.mode     = mode;
}

function openCreateModal() {
    editingTaskId = null;
    resetModalFields();
    setModalMode("create");
    document.getElementById("task-modal").classList.add("active");
}

// called from taskRendering.js — fully self-contained, no top-level refs
function openEditModal(task) {
    editingTaskId = task.task_id;

    document.getElementById("task-title").value  = task.task_title;
    document.getElementById("task-desc").value   = task.task_description;
    document.getElementById("task-status").value = task.task_status;
    document.getElementById("task-date").value   = task.task_date;
    document.getElementById("task-time").value   = task.task_time;

    const catSelect  = document.getElementById("task-category");
    const catCustom  = document.getElementById("custom-category");
    const catGroup   = document.getElementById("custom-category-group");

    const optionExists = [...catSelect.options].some(
        opt => opt.value === task.task_category
    );

    if (!optionExists) {
        const option       = document.createElement("option");
        option.value       = task.task_category;
        option.textContent = task.task_category;
        const customOption = catSelect.querySelector('option[value="custom"]');
        catSelect.insertBefore(option, customOption);
    }

    catSelect.value        = task.task_category;
    catGroup.style.display = "none";
    catCustom.value        = "";

    document.getElementById("task-error").classList.remove("visible");
    document.getElementById("task-time-error").classList.remove("visible");

    setModalMode("edit");
    document.getElementById("task-modal").classList.add("active");
}

function closeModal() {
    editingTaskId = null;
    resetModalFields();
    setModalMode("create");
    document.getElementById("task-modal").classList.remove("active");
}

// =========================
// CATEGORY HELPER
// =========================

function resolveFinalCategory() {
    const catSelect  = document.getElementById("task-category");
    const catCustom  = document.getElementById("custom-category");
    const task_error = document.getElementById("task-error");

    if (catSelect.value !== "custom")
        return catSelect.value;

    const custom = catCustom.value.trim();

    if (!custom) {
        task_error.classList.add("visible");
        return null;
    }

    const exists = [...catSelect.options].some(opt => opt.value === custom);

    if (!exists) {
        const option       = document.createElement("option");
        option.value       = custom;
        option.textContent = custom;
        const customOption = catSelect.querySelector('option[value="custom"]');
        catSelect.insertBefore(option, customOption);
        state.addedCategories.push(custom);
    }

    return custom;
}

// =========================
// VALIDATION
// =========================

function validateFields(skipTimeCheck = false) {
    const title      = document.getElementById("task-title");
    const status     = document.getElementById("task-status");
    const catSelect  = document.getElementById("task-category");
    const dateEl     = document.getElementById("task-date");
    const timeEl     = document.getElementById("task-time");
    const task_error = document.getElementById("task-error");
    const time_error = document.getElementById("task-time-error");

    task_error.classList.remove("visible");
    time_error.classList.remove("visible");

    if (
        title.value.trim() === "" ||
        status.value       === "" ||
        catSelect.value    === "" ||
        dateEl.value       === "" ||
        timeEl.value       === ""
    ) {
        task_error.classList.add("visible");
        return false;
    }

    if (!skipTimeCheck) {
        const now         = new Date();
        const today       = now.toISOString().split("T")[0];
        const currentTime =
            String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0");

        if (dateEl.value === today && timeEl.value < currentTime) {
            time_error.classList.add("visible");
            return false;
        }
    }

    return true;
}

// =========================
// CREATE / SAVE HANDLER
// =========================

create_task_modal.addEventListener("click", function () {

    const isEdit = document.getElementById("create-task").dataset.mode === "edit";

    if (!validateFields(isEdit)) return;

    const finalCategory = resolveFinalCategory();
    if (!finalCategory) return;

    const title       = document.getElementById("task-title");
    const description = document.getElementById("task-desc");
    const status      = document.getElementById("task-status");
    const dateEl      = document.getElementById("task-date");
    const timeEl      = document.getElementById("task-time");

    if (isEdit) {
        const task = state.tasks.find(t => t.task_id === editingTaskId);

        if (task) {
            task.task_title       = title.value.trim();
            task.task_description = description.value;
            task.task_category    = finalCategory;
            task.task_date        = dateEl.value;
            task.task_time        = timeEl.value;

            if (status.value === "done" && task.task_status !== "done") {
                task.time_completed = new Date().toISOString();
            } else if (status.value !== "done") {
                task.time_completed = null;
            }

            task.task_status = status.value;
        }

    } else {
        const task = new TaskItem(
            title.value.trim(),
            description.value,
            status.value,
            finalCategory,
            dateEl.value,
            timeEl.value
        );
        state.tasks.push(task);
    }

    saveState();
    refreshCurrentView();
    closeModal();
});

// =========================
// MODAL CONTROLS
// =========================

new_task.addEventListener("click", openCreateModal);
close_task_modal.addEventListener("click", closeModal);

// =========================
// QUICK ADD
// =========================

const quickAddInput  = document.getElementById("quick-add-input");
const quickAddButton = document.getElementById("quick-add-button");

quickAddButton.addEventListener("click", function () {
    const val = quickAddInput.value.trim();

    if (!val) {
        alert("Please enter a valid task title");
        return;
    }

    const quickTask = new TaskItem(
        val,
        "",
        "todo",
        "quick",
        new Date().toISOString().split("T")[0],
        "23:59"
    );

    state.tasks.push(quickTask);
    quickAddInput.value = "";

    saveState();
    refreshCurrentView();
});