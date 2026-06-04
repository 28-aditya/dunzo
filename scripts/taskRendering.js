// ============================
// TASK RENDERING FUNCTIONS
// ============================

function getTodaysTasks() {
    const today = new Date().toISOString().split("T")[0];
    return state.tasks
        .filter(task => task.task_date === today);
}

function getUpcomingTasks() {
    const today = new Date().toISOString().split("T")[0];

    return state.tasks.filter(task =>
        task.task_date > today
    );
}

function getCompletedTasks() {
    return state.tasks
        .filter(task =>
            task.task_status === "done"
        );
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

        taskList.innerHTML = `
            <div class="empty-state">
                No tasks found.
            </div>
        `;

        if (dueCounterId)
            document.getElementById(dueCounterId).textContent = "0";

        if (completedCounterId)
            document.getElementById(completedCounterId).textContent = "0";

        return;
    }

    tasks.sort((a,b) => a.task_time.localeCompare(b.task_time));
    
    let completedCount = 0;

    tasks.forEach(task => {

        if (task.task_status === "done")
            completedCount++;

        const taskRow = document.createElement("div");
        const leftDiv = document.createElement("div");
        const rightDiv = document.createElement("div");

        const taskTitle = document.createElement("p");
        const taskDesc = document.createElement("p");
        const taskTime = document.createElement("span");

        const taskStatusPill = document.createElement("span");
        const taskCategoryPill = document.createElement("span");

        taskRow.classList.add("task-row");
        taskRow.classList.add(task.task_status);

        taskTitle.classList.add("task-row-title");
        taskDesc.classList.add("task-row-desc");
        taskTime.classList.add("task-row-time");

        rightDiv.classList.add("task-right");

        taskStatusPill.classList.add(
            "task-pill",
            `${task.task_status}-pill`
        );

        taskCategoryPill.classList.add("category-pill");

        taskTitle.textContent = task.task_title;
        taskDesc.textContent = task.task_description;
        if (state.currentView !== "today") {
            taskTime.textContent =
                `${formatDate(task.task_date)} • ${task.task_time}`;
        } else {
            taskTime.textContent = task.task_time;
        }

        taskStatusPill.textContent = task.task_status;
        taskCategoryPill.textContent =
            task.task_category.toUpperCase();

        rightDiv.append(taskStatusPill);
        rightDiv.append(taskCategoryPill);

        leftDiv.append(taskTitle);
        leftDiv.append(taskDesc);
        leftDiv.append(taskTime);

        taskRow.append(leftDiv);
        taskRow.append(rightDiv);

        taskList.append(taskRow);

        taskStatusPill.addEventListener("click", e => {

            e.stopPropagation();

            const statuses = ["todo", "doing", "done"];

            const currentIndex =
                statuses.indexOf(task.task_status);

            task.task_status =
                statuses[(currentIndex + 1) % statuses.length];
            
            if (task.task_status === "done") {
                task.time_completed = new Date().toISOString();
            } else {
                task.time_completed = null;
            }

            refreshCurrentView();
        });

    });

    if (dueCounterId) {
        document.getElementById(dueCounterId).textContent =
            tasks.length - completedCount;
    }

    if (completedCounterId) {
        document.getElementById(completedCounterId).textContent =
            completedCount;
    }
}
