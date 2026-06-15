// ============================
// TASK RENDERING FUNCTIONS
// ============================

function getTodaysTasks() {
    const today = new Date().toISOString().split("T")[0];
    return state.tasks.filter(task => task.task_date === today);
}

function getUpcomingTasks() {
    const today = new Date().toISOString().split("T")[0];
    return state.tasks.filter(task => task.task_date > today);
}

function getCompletedTasks() {
    return state.tasks.filter(task => task.task_status === "done");
}

function getOverdueTasks() {
    const today = new Date().toISOString().split("T")[0];
    return state.tasks.filter(task =>
        task.task_date < today &&
        task.task_status !== "done"
    );
}

function renderTaskList({
    tasks,
    containerId,
    dueCounterId = null,
    completedCounterId = null
}) {

    const taskList = document.getElementById(containerId);
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `<div class="empty-state">No tasks found.</div>`;

        if (dueCounterId)
            document.getElementById(dueCounterId).textContent = "0";
        if (completedCounterId)
            document.getElementById(completedCounterId).textContent = "0";

        return;
    }

    tasks.sort((a, b) => a.task_time.localeCompare(b.task_time));

    let completedCount = 0;

    tasks.forEach(task => {

        if (task.task_status === "done") completedCount++;

        const taskRow          = document.createElement("div");
        const leftDiv          = document.createElement("div");
        const rightDiv         = document.createElement("div");
        const taskTitle        = document.createElement("p");
        const taskDesc         = document.createElement("p");
        const taskTime         = document.createElement("span");
        const taskStatusPill   = document.createElement("span");
        const taskCategoryPill = document.createElement("span");

        taskRow.classList.add("task-row", task.task_status);
        taskTitle.classList.add("task-row-title");
        taskDesc.classList.add("task-row-desc");
        taskTime.classList.add("task-row-time");
        rightDiv.classList.add("task-right");
        taskStatusPill.classList.add("task-pill", `${task.task_status}-pill`);
        taskCategoryPill.classList.add("category-pill");

        taskTitle.textContent = task.task_title;
        taskDesc.textContent  = task.task_description;
        taskTime.textContent  = state.currentView !== "today"
            ? `${formatDate(task.task_date)} • ${task.task_time}`
            : task.task_time;

        taskStatusPill.textContent   = task.task_status;
        taskCategoryPill.textContent = (task.task_category || "uncategorised").toUpperCase(); // null guard

        rightDiv.append(taskStatusPill, taskCategoryPill);
        leftDiv.append(taskTitle, taskDesc, taskTime);
        taskRow.append(leftDiv, rightDiv);
        taskList.append(taskRow);

        taskRow.addEventListener("click", () => openEditModal(task));

        taskStatusPill.addEventListener("click", e => {
            e.stopPropagation();

            const statuses  = ["todo", "doing", "done"];
            const nextIndex = (statuses.indexOf(task.task_status) + 1) % statuses.length;
            task.task_status = statuses[nextIndex];

            task.time_completed = task.task_status === "done"
                ? new Date().toISOString()
                : null;

            saveState();
            refreshCurrentView();
        });
    });

    if (dueCounterId)
        document.getElementById(dueCounterId).textContent = tasks.length - completedCount;

    if (completedCounterId)
        document.getElementById(completedCounterId).textContent = completedCount;
}