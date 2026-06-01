console.log("JS connected");

// =========================
// GLOBAL UI CLEANUP
// =========================

document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.remove("active");
});

const view_header = document.getElementById("view-header");

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

        this.time_created = new Date().toISOString();
        this.time_completed = null;
    }
}

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
        return 0;

    const completed =
        state.tasks.filter(task => task.task_status === "done").length;

    const doing =
        state.tasks.filter(task => task.task_status === "doing").length;

    const overdue =
        getOverdueTasksCount();

    let score =
        (completed * 100 + doing * 50 - overdue * 25) / total;

    score = Math.max(0, Math.min(100, Math.round(score)));

    return score;
}

// ==============================
// RENDERING ANALYTICS
// ==============================

function renderDashboard() {

    const completionRate = getCompletionRate();

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

    if (completionRate === 100) {
        productivityText.textContent = "Perfection";
    }
    else if (completionRate >= 90) {
        productivityText.textContent = "Excellent consistency";
    }
    else if (completionRate >= 80) {
        productivityText.textContent = "Great consistency";
    }
    else if (completionRate >= 65) {
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

const headerTitle = document.querySelector(".dash-header h1");
const headerSubtitle = document.querySelector(".dash-header p");

const viewData = {
    dashboard: {
        title: "Dashboard",
        subtitle: "Stay focused and keep your workflow moving."
    },

    today: {
        title: "Today",
        subtitle: "Your schedule and priorities for today."
    },

    upcoming: {
        title: "Upcoming",
        subtitle: "Plan ahead and stay organized."
    },

    completed: {
        title: "Completed",
        subtitle: "Review your finished work."
    },

    overdue: {
        title: "Overdue",
        subtitle: "Tasks that need immediate attention."
    },

    analytics: {
        title: "Analytics",
        subtitle: "Track your productivity insights."
    },

    notes: {
        title: "Notes",
        subtitle: "Keep your ideas and thoughts organized."
    },

    search: {
        title: "Search",
        subtitle: "Find tasks, notes, and projects quickly."
    },

    settings: {
        title: "Settings",
        subtitle: "Customize your workspace experience."
    }
};

document.querySelectorAll(".sidebar-item").forEach(item => {

    item.addEventListener("click", function () {

        const viewName = this.dataset.view;

        headerTitle.textContent = viewData[viewName].title;
        headerSubtitle.textContent = viewData[viewName].subtitle;

    });

}); 


// ==============================
// VIEW SWITCHING
// ==============================

sb_dashboard.addEventListener("click", () => {
    switchView("view-dashboard", "dashboard", sb_dashboard);
    state.currentView = "dashboard";

    refreshCurrentView();
});

document.getElementById("nav-today").addEventListener("click", function () {
    switchView("view-today", "today", this);
    state.currentView = "today";

    refreshCurrentView();

});

document.getElementById("nav-upcoming").addEventListener("click", function () {
    switchView("view-upcoming", "upcoming", this);
    state.currentView = "upcoming";

    refreshCurrentView();
});

document.getElementById("nav-completed").addEventListener("click", function () {
    switchView("view-completed", "completed", this);
    state.currentView = "completed";

    refreshCurrentView();
});

document.getElementById("nav-overdue").addEventListener("click", function () {
    switchView("view-overdue", "overdue", this);
    state.currentView = "overdue";

    refreshCurrentView();
});

document.getElementById("nav-analytics").addEventListener("click", function () {
    switchView("view-analytics", "analytics", this);
    state.currentView = "analytics";

    refreshCurrentView();
});

document.getElementById("nav-notes").addEventListener("click", function () {
    switchView("view-notes", "notes", this);
    state.currentView = "notes";

    refreshCurrentView();
});

document.getElementById("nav-search").addEventListener("click", function () {
    switchView("view-search", "search", this);
    state.currentView = "search";

    refreshCurrentView();
});

document.getElementById("nav-settings").addEventListener("click", function () {
    switchView("view-settings", "settings", this);
    state.currentView = "settings";

    refreshCurrentView();
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
// DYNAMIC UPDATING
// =========================

function refreshCurrentView() {

    renderDashboard();

    switch (state.currentView)
    {
        case "today":
            renderTaskList({
                tasks: getTodaysTasks(), 
                containerId: "today-task-list",
                dueCounterId: "todays-tasks-due",
                completedCounterId: "tasks-completed-today"
            });
            break;
        case "upcoming":
            renderTaskList({
                tasks: getUpcomingTasks(),
                containerId : "upcoming-task-list",
                dueCounterId : "upcoming-tasks-due",
                completedCounterId: "upcoming-completed-tasks"
            });
            break;
        case "completed":
            renderTaskList({
                tasks: getCompletedTasks(),
                containerId: "completed-task-list"
            });
            break;
        case "overdue":
            renderTaskList({
                tasks: getOverdueTasks(),
                containerId: "overdue-task-list",
            });
            break;

        default:
            break;
    }

}

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

// ============================
// TASK RENDERING FUNCTIONS
// ============================

function getTodaysTasks() {
    const today = new Date().toISOString().split("T")[0];
    return state.tasks
        .filter(task => task.task_date === today)
        .sort((a,b) => a.task_time.localeCompare(b.task_time));
}

function getUpcomingTasks() {
    const today = new Date().toISOString().split("T")[0];

    return state.tasks.filter(task =>
        task.task_date > today
    );
}

function getCompletedTasks() {
    return state.tasks.filter(task =>
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
                `${task.task_date} • ${task.task_time}`;
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



state.tasks = [
    new TaskItem(
        "Complete dashboard JavaScript",
        "Finish rendering logic",
        "doing",
        "study",
        "2026-05-31",
        "09:00"
    ),

    new TaskItem(
        "Study database normalization",
        "Review 3NF and BCNF",
        "todo",
        "study",
        "2026-05-31",
        "13:00"
    ),

    new TaskItem(
        "Workout session",
        "Chest and triceps",
        "done",
        "health",
        "2026-05-31",
        "19:00"
    ),

    new TaskItem(
        "Finish economics assignment",
        "Macroeconomics questions",
        "todo",
        "study",
        "2026-06-01",
        "11:00"
    ),

    new TaskItem(
        "Prepare presentation slides",
        "For project review",
        "doing",
        "work",
        "2026-06-02",
        "15:30"
    ),

    new TaskItem(
        "Complete dashboard JavaScript",
        "Finish rendering logic",
        "doing",
        "study",
        "2026-06-01",
        "09:00"
    ),

    new TaskItem(
        "Study database normalization",
        "Review 3NF and BCNF",
        "todo",
        "study",
        "2026-06-01",
        "13:00"
    ),

    new TaskItem(
        "Workout session",
        "Chest and triceps",
        "done",
        "health",
        "2026-06-01",
        "19:00"
    ),

    new TaskItem(
        "Finish economics assignment",
        "Macroeconomics questions",
        "todo",
        "study",
        "2026-06-02",
        "11:00"
    ),

    new TaskItem(
        "Prepare presentation slides",
        "For project review",
        "doing",
        "work",
        "2026-06-03",
        "15:30"
    ),

    new TaskItem(
        "Update LinkedIn profile",
        "Add latest projects",
        "done",
        "personal",
        "2026-05-30",
        "17:00"
    ),

    new TaskItem(
        "Practice LeetCode",
        "Solve 5 medium questions",
        "doing",
        "study",
        "2026-06-01",
        "20:00"
    ),

    new TaskItem(
        "Book dentist appointment",
        "Annual checkup",
        "todo",
        "health",
        "2026-06-05",
        "10:00"
    ),

    new TaskItem(
        "Review cybersecurity notes",
        "Authentication and hashing",
        "done",
        "study",
        "2026-05-29",
        "21:00"
    ),

    new TaskItem(
        "Clean workspace",
        "Organize desk and cables",
        "todo",
        "personal",
        "2026-06-04",
        "18:00"
    ),

    new TaskItem(
        "Prepare internship applications",
        "Finalize resume and cover letter",
        "doing",
        "work",
        "2026-06-03",
        "14:00"
    ),

    new TaskItem(
        "Read system design article",
        "Distributed caching",
        "todo",
        "study",
        "2026-06-06",
        "16:00"
    ),

    new TaskItem(
        "Morning run",
        "5km easy pace",
        "done",
        "fitness",
        "2026-05-28",
        "07:00"
    ),

    new TaskItem(
        "Budget planning",
        "Review monthly expenses",
        "todo",
        "finance",
        "2026-06-07",
        "12:00"
    ),

    new TaskItem(
        "Create API documentation",
        "Endpoints and examples",
        "doing",
        "work",
        "2026-06-02",
        "09:30"
    ),

    new TaskItem(
        "Buy groceries",
        "Weekly shopping",
        "done",
        "personal",
        "2026-05-31",
        "17:30"
    ),

    new TaskItem(
        "Research cloud providers",
        "AWS vs Azure comparison",
        "todo",
        "study",
        "2026-06-08",
        "15:00"
    ),

    new TaskItem(
        "Refactor CSS",
        "Reduce duplication",
        "doing",
        "work",
        "2026-06-04",
        "11:00"
    ),

    new TaskItem(
        "Submit scholarship documents",
        "Upload remaining forms",
        "done",
        "personal",
        "2026-05-27",
        "13:00"
    ),

    // Overdue tasks

    new TaskItem(
        "Finish database report",
        "Submission missed",
        "todo",
        "study",
        "2026-05-20",
        "23:59"
    ),

    new TaskItem(
        "Pay internet bill",
        "Monthly payment",
        "todo",
        "finance",
        "2026-05-25",
        "18:00"
    ),

    new TaskItem(
        "Review project proposal",
        "Feedback required",
        "doing",
        "work",
        "2026-05-26",
        "12:00"
    )
];


refreshCurrentView();