// =========================
// ANALYTICS CALCULATION
// =========================

function getTotalTasks() {
    return state.tasks.length;
}

function getCompletedTasksCount() {
    return state.tasks
        .filter(task => task.task_status === "done")
        .length;
}

function getCompletionRate() {

    if (state.tasks.length === 0)
        return 0;

    return Math.round(
        (getCompletedTasksCount() / state.tasks.length) * 100
    );
}

function getOverdueTasksCount() {
    return getOverdueTasks().length;
}

function getProductivityScore() {

    const total = state.tasks.length;

    if (total === 0)
        return 25;

    const completed =
        state.tasks.filter(task => task.task_status === "done").length;

    const doing =
        state.tasks.filter(task => task.task_status === "doing").length;

    const overdue =
        getOverdueTasksCount();

    let score =
        (completed * 100 + doing * 25 - overdue * 10) / total;

    score += 25;

    score = Math.max(25, Math.min(100, Math.round(score)));

    return score;
}

// ==============================
// RENDERING ANALYTICS
// ==============================

function renderDashboard() {

    const completionRate        =    getCompletionRate();
    const productivityScore     =    getProductivityScore();

    // =====================
    // OVERVIEW CARDS
    // =====================

    document.getElementById("tasks-completed-stat")
        .textContent = getCompletedTasksCount();

    document.getElementById("task-completed-subtext")
        .textContent = `${getCompletedTasksCount()} tasks finished`;

    document.getElementById("productivity-score-stat")
        .textContent = `${getProductivityScore()}`;

    const productivityText =
        document.getElementById("productivity-score-subtext");

    if (productivityScore === 100) {
        productivityText.textContent = "Perfection";
    }
    else if (productivityScore >= 80) {
        productivityText.textContent = "Excellent consistency";
    }
    else if (productivityScore >= 65) {
        productivityText.textContent = "Great consistency";
    }
    else if (productivityScore >= 45) {
        productivityText.textContent = "Good consistency";
    }
    else {
        productivityText.textContent = "Needs improvement";
    }

    // =====================
    // STATS GRID
    // =====================

    document.getElementById("total-tasks-stat")
        .textContent = getTotalTasks();

    document.getElementById("in-progress-stat")
        .textContent = state.tasks.filter(
            task => task.task_status === "doing"
        ).length;

    document.getElementById("overdue-stat")
        .textContent = getOverdueTasksCount();

    document.getElementById("completion-rate-stat")
        .textContent = `${completionRate}%`;

    // =======================
    // TIME COMPLETED
    // =======================
    const completedTasks = state.tasks.filter(
        task => task.time_completed
    );

    if (completedTasks.length === 0) {

        document.getElementById("timer-stat")
            .textContent = "--";

        document.getElementById("timer-stat-subtext")
            .textContent = "No completed tasks yet";
    }
    else {

        const latestTask = completedTasks.sort(
            (a, b) =>
                new Date(b.time_completed) -
                new Date(a.time_completed)
        )[0];

        const minutesAgo = Math.floor(
            (Date.now() - new Date(latestTask.time_completed))
            / 60000
        );

        document.getElementById("timer-stat")
            .textContent = `${minutesAgo}m`;

        document.getElementById("timer-stat-subtext")
            .textContent = "Since last completion";
    }

    // ====================
    // TASK BOARD
    // ====================
    const todoBoardList     =   document.getElementById("todo-board-list");
    const doingBoardList    =   document.getElementById("doing-board-list");
    const doneBoardList     =   document.getElementById("done-board-list");

    todoBoardList.innerHTML     =   "";
    doingBoardList.innerHTML    =   "";
    doneBoardList.innerHTML     =   "";

    const todoBoardCount    =   document.getElementById("todo-board-count");
    const doingBoardCount   =   document.getElementById("doing-board-count");
    const doneBoardCount    =   document.getElementById("done-board-count");

    todoBoardCount.textContent  =   
        state.tasks.filter(task => task.task_status === "todo").length;
    doingBoardCount.textContent =
        state.tasks.filter(task => task.task_status === "doing").length;
    doneBoardCount.textContent  =
        state.tasks.filter(task => task.task_status === "done").length;
    
    for (const task of state.tasks) {
        switch (task.task_status) {
            case "todo":
                const todoBoardDiv = document.createElement("div");
                todoBoardDiv.classList.add("task-card");

                const todoBoardPara = document.createElement("p");
                todoBoardPara.textContent = task.task_title;
                
                todoBoardDiv.appendChild(todoBoardPara);
                todoBoardList.appendChild(todoBoardDiv);
                break;
            case "doing":
                const doingBoardDiv = document.createElement("div");
                doingBoardDiv.classList.add("task-card");

                const doingBoardPara = document.createElement("p");
                doingBoardPara.textContent = task.task_title;
                
                doingBoardDiv.appendChild(doingBoardPara);
                doingBoardList.appendChild(doingBoardDiv);
                break;
            case "done":
                const doneBoardDiv = document.createElement("div");
                doneBoardDiv.classList.add("task-card");

                const doneBoardPara = document.createElement("p");
                doneBoardPara.textContent = task.task_title;

                doneBoardDiv.appendChild(doneBoardPara);
                doneBoardList.appendChild(doneBoardDiv);
                break;
            default:
                break;
        }
    }
}
