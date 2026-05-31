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
});

document.getElementById("nav-today").addEventListener("click", function () {
    switchView("view-today", "today", this);
    renderTodaysTasks(getTodaysTasks());
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

    if (state.currentView === "today") {
        renderTodaysTasks(getTodaysTasks());
    }

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

    switch (state.currentView) {

        case "today":
            renderTodaysTasks(getTodaysTasks());
            break;

        case "dashboard":
            renderDashboard();
            break;

        case "completed":
            renderCompletedTasks();
            break;

        case "upcoming":
            renderUpcomingTasks();
            break;

        case "overdue":
            renderOverdueTasks();
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
        .sort((a, b) => a.task_time.localeCompare(b.task_time));

}

function renderTodaysTasks(tasks) {
    const taskList = document.getElementById("today-task-list");
    taskList.innerHTML = "";
    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">
                No tasks scheduled for today.
            </div>
        `;

        document.getElementById("todays-tasks-due").textContent = "0";
        document.getElementById("tasks-completed-today").textContent = "0";

        return;

    } else {
        const taskList = document.getElementById("today-task-list");
        taskList.innerHTML = "";
        let completedTaskCount = 0;

        for (const task of tasks) {
            const taskRow           =   document.createElement("div");
            const leftDiv           =   document.createElement("div");
            const rightDiv          =   document.createElement("div");
            const taskTitle         =   document.createElement("p");
            const taskDesc          =   document.createElement("p");
            const taskTime          =   document.createElement("span");
            const taskStatusPill    =   document.createElement("span");
            const taskCategoryPill  =   document.createElement("span");
            
            taskRow.classList.add("task-row");
            taskTitle.classList.add("task-row-title");
            taskDesc.classList.add("task-row-desc");
            taskTime.classList.add("task-row-time");
            rightDiv.classList.add("task-right");
            taskCategoryPill.classList.add("category-pill");
            
            taskStatusPill.classList.add("task-pill");
            taskStatusPill.classList.add(`${task.task_status}-pill`);

            if (task.task_status === "done") {
                completedTaskCount = completedTaskCount + 1;
            }

            taskTitle.textContent           =   task.task_title;
            taskDesc.textContent            =   task.task_description;
            taskTime.textContent            =   task.task_time;
            taskStatusPill.textContent      =   task.task_status;
            taskCategoryPill.textContent    =   task.task_category.toUpperCase();

            rightDiv.append(taskStatusPill);
            rightDiv.append(taskCategoryPill);

            leftDiv.appendChild(taskTitle);
            leftDiv.appendChild(taskDesc);
            leftDiv.appendChild(taskTime);

            taskRow.appendChild(leftDiv);
            taskRow.appendChild(rightDiv);

            taskList.appendChild(taskRow);
            taskStatusPill.addEventListener("click", () => {

            const statuses = ["todo", "doing", "done"];

                let currentIndex = statuses.indexOf(task.task_status);

                task.task_status =
                    statuses[(currentIndex + 1) % statuses.length];

                renderTodaysTasks(getTodaysTasks());
                
                console.log(state.tasks);
            });
        }   

        const todaysTasksDue        =   document.getElementById("todays-tasks-due");
        const todaysCompletedTasks  =   document.getElementById("tasks-completed-today");

        todaysTasksDue.textContent          =   tasks.length - completedTaskCount; 
        todaysCompletedTasks.textContent    =   completedTaskCount;

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
    )
];