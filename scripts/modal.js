// =========================
// MODAL MODULE
// =========================

document.addEventListener("DOMContentLoaded", initModal);

let editingTaskId = null;

let taskModal, newTaskBtn, closeBtns, saveBtn, deleteBtn;
let titleEl, descEl, statusEl, categoryEl, customCategoryEl, customGroupEl, dateEl, timeEl, timeError;

// -------------------------
// INIT
// -------------------------
function initModal() {
    taskModal        = document.getElementById("task-modal");
    newTaskBtn       = document.getElementById("new-task-btn");
    closeBtns        = document.querySelectorAll(".close-modal");
    saveBtn          = document.querySelector(".task-modal .btn-primary");
    deleteBtn        = document.getElementById("delete-task-btn");
    titleEl          = document.getElementById("task-title");
    descEl           = document.getElementById("task-desc");
    statusEl         = document.getElementById("task-status");
    categoryEl       = document.getElementById("task-category");
    customCategoryEl = document.getElementById("custom-category");
    customGroupEl    = document.getElementById("custom-category-group");
    dateEl           = document.getElementById("task-date");
    timeEl           = document.getElementById("task-time");
    timeError        = document.getElementById("task-time-error");

    if (newTaskBtn) newTaskBtn.addEventListener("click", openCreateModal);
    closeBtns.forEach(btn => btn.addEventListener("click", closeModal));
    if (saveBtn)   saveBtn.addEventListener("click", handleSave);
    if (deleteBtn) deleteBtn.addEventListener("click", handleDelete);
    if (categoryEl) categoryEl.addEventListener("change", handleCategoryChange);
    if (dateEl)     dateEl.addEventListener("change", handleDateChange);

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
    const currentTime = String(now.getHours()).padStart(2,"0") + ":" +
                        String(now.getMinutes()).padStart(2,"0");
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

    titleEl.value  = task.task_title       || "";
    descEl.value   = task.task_description || "";
    statusEl.value = task.task_status      || "";
    dateEl.value   = task.task_date        || "";
    timeEl.value   = task.task_time        || "";

    if (categoryEl) {
        const exists = [...categoryEl.options].some(opt => opt.value === task.task_category);
        if (!exists && task.task_category) {
            const opt = document.createElement("option");
            opt.value = task.task_category;
            opt.textContent = task.task_category;
            const customOpt = categoryEl.querySelector('option[value="custom"]');
            categoryEl.insertBefore(opt, customOpt);
        }
        categoryEl.value = task.task_category || "";
    }

    taskModal?.classList.add("active");
}

function closeModal() {
    editingTaskId = null;
    resetFields();
    setMode("create");
    taskModal?.classList.remove("active");
}

function resetFields() {
    if (titleEl)          titleEl.value          = "";
    if (descEl)           descEl.value           = "";
    if (statusEl)         statusEl.value         = "";
    if (categoryEl)       categoryEl.value       = "";
    if (customCategoryEl) customCategoryEl.value = "";
    if (dateEl)           dateEl.value           = "";
    if (timeEl)           timeEl.value           = "";
    if (customGroupEl)    customGroupEl.style.display = "none";
    if (timeEl)           timeEl.min             = "";
    if (timeError)        timeError.classList.remove("visible");
}

function setMode(mode) {
    const isEdit = mode === "edit";
    const header = document.querySelector("#task-modal h2");
    if (header)  header.textContent  = isEdit ? "Edit Task" : "Create Task";
    if (saveBtn) {
        saveBtn.textContent  = isEdit ? "Save Changes" : "Create Task";
        saveBtn.dataset.mode = mode;
    }
    if (deleteBtn) deleteBtn.classList.toggle("hidden", !isEdit);
}

// -------------------------
// VALIDATION
// -------------------------
function validate(skipTimeCheck = false) {
    const taskError = ensureTaskError();
    taskError.classList.remove("visible");
    if (timeError) timeError.classList.remove("visible");

    if (!titleEl?.value.trim() || !statusEl?.value || !categoryEl?.value ||
        !dateEl?.value || !timeEl?.value) {
        taskError.classList.add("visible");
        return false;
    }

    if (!skipTimeCheck) {
        const now = new Date();
        const today = now.toISOString().split("T")[0];
        const currentTime = String(now.getHours()).padStart(2,"0") + ":" +
                            String(now.getMinutes()).padStart(2,"0");
        if (dateEl.value === today && timeEl.value < currentTime) {
            if (timeError) timeError.classList.add("visible");
            return false;
        }
    }
    return true;
}

function ensureTaskError() {
    let el = document.getElementById("task-error");
    if (!el) {
        el = document.createElement("p");
        el.id = "task-error";
        el.className = "task-error";
        el.textContent = "Please fill all required fields";
        document.querySelector(".task-modal-body")?.appendChild(el);
    }
    return el;
}

// -------------------------
// SAVE
// -------------------------
async function handleSave() {
    const isEdit = saveBtn?.dataset.mode === "edit";
    if (!validate(isEdit)) return;

    const finalCategory = resolveCategory();
    if (!finalCategory) return;

    if (isEdit) {
        const t = state.tasks.find(x => x.task_id === editingTaskId);
        if (!t) return;

        t.task_title       = titleEl.value.trim();
        t.task_description = descEl.value;
        t.task_category    = finalCategory;
        t.task_date        = dateEl.value;
        t.task_time        = timeEl.value;

        if (statusEl.value === "done" && t.task_status !== "done") {
            t.time_completed = new Date().toISOString();
        } else if (statusEl.value !== "done") {
            t.time_completed = null;
        }
        t.task_status = statusEl.value;

        try {
            await apiUpdateTask(t);
        } catch (err) {
            console.error("Update task failed:", err);
        }

    } else {
        const task = new TaskItem(
            titleEl.value.trim(),
            descEl.value,
            statusEl.value,
            finalCategory,
            dateEl.value,
            timeEl.value
        );
        state.tasks.push(task);

        try {
            await apiCreateTask(task);
        } catch (err) {
            console.error("Create task failed:", err);
            // task stays in local state so the user doesn't lose their work
        }
    }

    refreshCurrentView();
    closeModal();
}

// -------------------------
// DELETE
// -------------------------
async function handleDelete() {
    if (!editingTaskId) return;
    if (!confirm("Delete this task?")) return;

    const taskId = editingTaskId;
    state.tasks = state.tasks.filter(t => t.task_id !== taskId);

    try {
        await apiDeleteTask(taskId);
    } catch (err) {
        console.error("Delete task failed:", err);
    }

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

window.openEditModal = openEditModal;