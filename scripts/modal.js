// =========================
// MODAL MODULE (SAFE VERSION)
// =========================

document.addEventListener("DOMContentLoaded", initModal);

// -------------------------
// STATE
// -------------------------
let editingTaskId = null;

// -------------------------
// DOM CACHE
// -------------------------
let taskModal;
let newTaskBtn;
let closeBtns;
let saveBtn;
let deleteBtn;

let titleEl;
let descEl;
let statusEl;
let categoryEl;
let customCategoryEl;
let customGroupEl;
let dateEl;
let timeEl;

let timeError;

// -------------------------
// INIT
// -------------------------
function initModal() {
    taskModal = document.getElementById("task-modal");
    newTaskBtn = document.getElementById("new-task-btn");

    closeBtns = document.querySelectorAll(".close-modal");
    saveBtn = document.querySelector(".task-modal .btn-primary");
    deleteBtn = document.getElementById("delete-task-btn");

    titleEl = document.getElementById("task-title");
    descEl = document.getElementById("task-desc");
    statusEl = document.getElementById("task-status");
    categoryEl = document.getElementById("task-category");
    customCategoryEl = document.getElementById("custom-category");
    customGroupEl = document.getElementById("custom-category-group");
    dateEl = document.getElementById("task-date");
    timeEl = document.getElementById("task-time");

    timeError = document.getElementById("task-time-error");

    if (newTaskBtn) newTaskBtn.addEventListener("click", openCreateModal);

    closeBtns.forEach(btn =>
        btn.addEventListener("click", closeModal)
    );

    if (saveBtn) saveBtn.addEventListener("click", handleSave);

    if (deleteBtn) deleteBtn.addEventListener("click", handleDelete);

    if (categoryEl) {
        categoryEl.addEventListener("change", handleCategoryChange);
    }

    if (dateEl) {
        dateEl.addEventListener("change", handleDateChange);
    }

    setDateMin();
}

// -------------------------
// HELPERS
// -------------------------
function setDateMin() {
    if (!dateEl) return;
    dateEl.min = new Date().toISOString().split("T")[0];
}

function handleCategoryChange() {
    if (!categoryEl || !customGroupEl || !customCategoryEl) return;

    if (categoryEl.value === "custom") {
        customGroupEl.style.display = "block";
    } else {
        customGroupEl.style.display = "none";
        customCategoryEl.value = "";
    }
}

function handleDateChange() {
    if (!dateEl || !timeEl) return;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const currentTime =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");

    timeEl.min = (dateEl.value === today) ? currentTime : "";
}

// -------------------------
// MODAL ACTIONS
// -------------------------
function openCreateModal() {
    editingTaskId = null;
    resetFields();
    setMode("create");

    taskModal?.classList.add("active");
}

function openEditModal(task) {
    if (!task) return;
    setMode("edit");

    editingTaskId = task.task_id;

    titleEl.value = task.task_title || "";
    descEl.value = task.task_description || "";
    statusEl.value = task.task_status || "";
    dateEl.value = task.task_date || "";
    timeEl.value = task.task_time || "";

    // ensure category exists
    if (categoryEl) {
        const exists = [...categoryEl.options]
            .some(opt => opt.value === task.task_category);

        if (!exists) {
            const opt = document.createElement("option");
            opt.value = task.task_category;
            opt.textContent = task.task_category;

            const customOpt = categoryEl.querySelector('option[value="custom"]');
            categoryEl.insertBefore(opt, customOpt);
        }

        categoryEl.value = task.task_category;
    }

    taskModal?.classList.add("active");
}

function closeModal() {
    editingTaskId = null;
    resetFields();
    setMode("create");
    taskModal?.classList.remove("active");
}

// -------------------------
// RESET
// -------------------------
function resetFields() {
    if (titleEl) titleEl.value = "";
    if (descEl) descEl.value = "";
    if (statusEl) statusEl.value = "";
    if (categoryEl) categoryEl.value = "";
    if (customCategoryEl) customCategoryEl.value = "";
    if (dateEl) dateEl.value = "";
    if (timeEl) timeEl.value = "";

    if (customGroupEl) customGroupEl.style.display = "none";
    if (timeEl) timeEl.min = "";

    if (timeError) timeError.classList.remove("visible");
}

// -------------------------
// MODE
// -------------------------
function setMode(mode) {
    const isEdit = mode === "edit";

    const header = document.querySelector("#task-modal h2");
    if (header) header.textContent = isEdit ? "Edit Task" : "Create Task";

    if (saveBtn) {
        saveBtn.textContent = isEdit ? "Save Changes" : "Create Task";
        saveBtn.dataset.mode = mode;
    }

    if (deleteBtn) {
        deleteBtn.classList.toggle("hidden", !isEdit);
    }
}

// -------------------------
// VALIDATION
// -------------------------
function validate(skipTimeCheck = false) {
    const taskError = ensureTaskError();

    taskError.classList.remove("visible");
    if (timeError) timeError.classList.remove("visible");

    if (
        !titleEl?.value.trim() ||
        !statusEl?.value ||
        !categoryEl?.value ||
        !dateEl?.value ||
        !timeEl?.value
    ) {
        taskError.classList.add("visible");
        return false;
    }

    if (!skipTimeCheck) {
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        const currentTime =
            String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0");

        if (dateEl.value === today && timeEl.value < currentTime) {
            if (timeError) timeError.classList.add("visible");
            return false;
        }
    }

    return true;
}

// fallback so you NEVER get null crash
function ensureTaskError() {
    let el = document.getElementById("task-error");

    if (!el) {
        el = document.createElement("p");
        el.id = "task-error";
        el.className = "task-error";
        el.textContent = "Please fill all required fields";

        const body = document.querySelector(".task-modal-body");
        body?.appendChild(el);
    }

    return el;
}

// -------------------------
// SAVE
// -------------------------
function handleSave() {
    const isEdit = saveBtn?.dataset.mode === "edit";
    if (!validate(isEdit)) return;

    const finalCategory = resolveCategory();
    if (!finalCategory) return;

    const taskData = {
        title: titleEl.value.trim(),
        desc: descEl.value,
        status: statusEl.value,
        category: finalCategory,
        date: dateEl.value,
        time: timeEl.value
    };

    if (isEdit) {
        const t = state.tasks.find(x => x.task_id === editingTaskId);

        if (t) {
            t.task_title = taskData.title;
            t.task_description = taskData.desc;
            t.task_category = taskData.category;
            t.task_date = taskData.date;
            t.task_time = taskData.time;

            if (taskData.status === "done" && t.task_status !== "done") {
                t.time_completed = new Date().toISOString();
            } else if (taskData.status !== "done") {
                t.time_completed = null;
            }

            t.task_status = taskData.status;
        }
    } else {
        state.tasks.push(
            new TaskItem(
                taskData.title,
                taskData.desc,
                taskData.status,
                taskData.category,
                taskData.date,
                taskData.time
            )
        );
    }

    saveState();
    refreshCurrentView();
    closeModal();
}

// -------------------------
// DELETE
// -------------------------
function handleDelete() {
    if (!editingTaskId) return;

    if (!confirm("Delete this task?")) return;

    state.tasks = state.tasks.filter(t => t.task_id !== editingTaskId);

    saveState();
    refreshCurrentView();
    closeModal();
}

// -------------------------
// CATEGORY
// -------------------------
function resolveCategory() {
    if (categoryEl.value !== "custom") return categoryEl.value;

    const custom = customCategoryEl.value.trim();

    if (!custom) {
        ensureTaskError().classList.add("visible");
        return null;
    }

    const exists = [...categoryEl.options].some(o => o.value === custom);

    if (!exists) {
        const opt = document.createElement("option");
        opt.value = custom;
        opt.textContent = custom;

        const customOpt = categoryEl.querySelector('option[value="custom"]');
        categoryEl.insertBefore(opt, customOpt);

        state.addedCategories.push(custom);
    }

    return custom;
}

// expose edit function globally (used by renderer)
window.openEditModal = openEditModal;