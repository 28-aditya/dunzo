// =========================
// ANALYTICS CALCULATION
// =========================

function getTotalTasks() {
    return state.tasks.length;
}

function getCompletedTasksCount() {
    return state.tasks.filter(task => task.task_status === "done").length;
}

function getCompletionRate() {
    if (state.tasks.length === 0) return 0;
    return Math.round((getCompletedTasksCount() / state.tasks.length) * 100);
}

function getOverdueTasksCount() {
    return getOverdueTasks().length;
}

function getProductivityScore() {
    const total = state.tasks.length;
    if (total === 0) return 25;

    const completed = state.tasks.filter(task => task.task_status === "done").length;
    const doing     = state.tasks.filter(task => task.task_status === "doing").length;
    const overdue   = getOverdueTasksCount();

    let score = (completed * 60 + doing * 10 - overdue * 30) / total;
    score += 25;
    score = Math.max(25, Math.min(100, Math.round(score)));

    return score;
}

// ==============================
// RENDERING ANALYTICS
// ==============================

function renderDashboard() {

    const completionRate    = getCompletionRate();
    const productivityScore = getProductivityScore();

    // =====================
    // OVERVIEW CARDS
    // =====================

    document.getElementById("tasks-completed-stat")
        .textContent = getCompletedTasksCount();

    document.getElementById("task-completed-subtext")
        .textContent = `${getCompletedTasksCount()} tasks finished`;

    document.getElementById("productivity-score-stat")
        .textContent = `${productivityScore}`;

    const productivityText = document.getElementById("productivity-score-subtext");

    if      (productivityScore === 100) productivityText.textContent = "Perfection";
    else if (productivityScore >= 80)   productivityText.textContent = "Excellent consistency";
    else if (productivityScore >= 65)   productivityText.textContent = "Great consistency";
    else if (productivityScore >= 45)   productivityText.textContent = "Good consistency";
    else                                productivityText.textContent = "Needs improvement";

    // =====================
    // STATS GRID
    // =====================

    document.getElementById("total-tasks-stat")
        .textContent = getTotalTasks();

    document.getElementById("in-progress-stat")
        .textContent = state.tasks.filter(task => task.task_status === "doing").length;

    document.getElementById("overdue-stat")
        .textContent = getOverdueTasksCount();

    document.getElementById("completion-rate-stat")
        .textContent = `${completionRate}%`;

    // =======================
    // TIME SINCE COMPLETION
    // =======================

    const completedTasks = state.tasks.filter(task => task.task_status === "done");

    if (completedTasks.length === 0) {
        document.getElementById("timer-stat").textContent        = "--";
        document.getElementById("timer-stat-subtext").textContent = "No completed tasks yet";
    } else {

        const completionTimes = completedTasks.map(task => {
            if (task.time_completed) {
                return new Date(task.time_completed).getTime();
            }
            if (task.task_date && task.task_time) {
                return new Date(`${task.task_date}T${task.task_time}`).getTime();
            }
            return new Date(task.time_created).getTime();
        });

        const latestCompletion = Math.max(...completionTimes);
        const diffMs           = Math.max(0, Date.now() - latestCompletion);
        const minutes          = Math.floor(diffMs / 60000);
        const hours            = Math.floor(minutes / 60);
        const days             = Math.floor(hours / 24);

        document.getElementById("timer-stat").textContent =
            days > 0  ? `${days}d`  :
            hours > 0 ? `${hours}h` :
                        `${minutes}m`;

        document.getElementById("timer-stat-subtext").textContent = "Since last completion";
    }

    // ====================
    // TASK BOARD
    // ====================

    const todoBoardList  = document.getElementById("todo-board-list");
    const doingBoardList = document.getElementById("doing-board-list");
    const doneBoardList  = document.getElementById("done-board-list");

    todoBoardList.innerHTML  = "";
    doingBoardList.innerHTML = "";
    doneBoardList.innerHTML  = "";

    document.getElementById("todo-board-count").textContent  =
        state.tasks.filter(task => task.task_status === "todo").length;
    document.getElementById("doing-board-count").textContent =
        state.tasks.filter(task => task.task_status === "doing").length;
    document.getElementById("done-board-count").textContent  =
        state.tasks.filter(task => task.task_status === "done").length;

    for (const task of state.tasks) {
        // braces around each case body fix the const-in-switch scope bug
        switch (task.task_status) {
            case "todo": {
                const div  = document.createElement("div");
                const para = document.createElement("p");
                div.classList.add("task-card");
                para.textContent = task.task_title;
                div.appendChild(para);
                div.addEventListener("click", () => openEditModal(task));
                todoBoardList.appendChild(div);
                break;
            }
            case "doing": {
                const div  = document.createElement("div");
                const para = document.createElement("p");
                div.classList.add("task-card");
                para.textContent = task.task_title;
                div.appendChild(para);
                div.addEventListener("click", () => openEditModal(task));
                doingBoardList.appendChild(div);
                break;
            }
            case "done": {
                const div  = document.createElement("div");
                const para = document.createElement("p");
                div.classList.add("task-card");
                para.textContent = task.task_title;
                div.appendChild(para);
                div.addEventListener("click", () => openEditModal(task));
                doneBoardList.appendChild(div);
                break;
            }
            default:
                break;
        }
    }
}