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

const headerTitle    = document.querySelector(".dash-header h1");
const headerSubtitle = document.querySelector(".dash-header p");

const viewData = {
    dashboard: { title: "Dashboard",  subtitle: "Stay focused and keep your workflow moving." },
    today:     { title: "Today",      subtitle: "Your schedule and priorities for today." },
    upcoming:  { title: "Upcoming",   subtitle: "Plan ahead and stay organized." },
    completed: { title: "Completed",  subtitle: "Review your finished work." },
    overdue:   { title: "Overdue",    subtitle: "Tasks that need immediate attention." },
    analytics: { title: "Analytics",  subtitle: "Track your productivity insights." },
    notes:     { title: "Notes",      subtitle: "Keep your ideas and thoughts organized." },
    search:    { title: "Search",     subtitle: "Find tasks, notes, and projects quickly." },
    settings:  { title: "Settings",   subtitle: "Customize your workspace experience." }
};

document.querySelectorAll(".sidebar-item").forEach(item => {
    item.addEventListener("click", function () {
        const viewName = this.dataset.view;
        headerTitle.textContent    = viewData[viewName].title;
        headerSubtitle.textContent = viewData[viewName].subtitle;
    });
});

// ==============================
// VIEW SWITCHING
// ==============================

sb_dashboard.addEventListener("click", () => {
    switchView("view-dashboard", "dashboard", sb_dashboard);
    refreshCurrentView();
});

document.getElementById("nav-today").addEventListener("click", function () {
    switchView("view-today", "today", this);
    refreshCurrentView();
});

document.getElementById("nav-upcoming").addEventListener("click", function () {
    switchView("view-upcoming", "upcoming", this);
    refreshCurrentView();
});

document.getElementById("nav-completed").addEventListener("click", function () {
    switchView("view-completed", "completed", this);
    refreshCurrentView();
});

document.getElementById("nav-overdue").addEventListener("click", function () {
    switchView("view-overdue", "overdue", this);
    refreshCurrentView();
});

document.getElementById("nav-analytics").addEventListener("click", function () {
    switchView("view-analytics", "analytics", this);
    refreshCurrentView();
});

document.getElementById("nav-notes").addEventListener("click", function () {
    switchView("view-notes", "notes", this);
    refreshCurrentView();
});

document.getElementById("nav-search").addEventListener("click", function () {
    switchView("view-search", "search", this);
    refreshCurrentView();
});

document.getElementById("nav-settings").addEventListener("click", function () {
    switchView("view-settings", "settings", this);
    refreshCurrentView();
});

// =========================
// DYNAMIC UPDATING
// =========================

// guard so initSettings only attaches listeners once
let settingsInitialised = false;

function refreshCurrentView() {

    renderDashboard();

    saveUIState(state.currentView);

    switch (state.currentView) {
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
                containerId: "upcoming-task-list",
                dueCounterId: "upcoming-tasks-due",
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
                containerId: "overdue-task-list"
            });
            break;
        case "search":
            renderSearchResults();
            break;
        case "notes":
            renderNotes();
            break;
        case "analytics":
            renderAnalytics();
            break;
        case "settings":
            if (!settingsInitialised) {
                initSettings();
                settingsInitialised = true;
            } else {
                renderSettings();
            }
            break;
        default:
            break;
    }
}