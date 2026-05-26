console.log("JS connected");

document.querySelectorAll(".sidebar-item").forEach(item=> {
    item.classList.remove("active");
});


const theme_button = document.getElementById("theme-toggle");
theme_button.addEventListener("click", function(){

    console.log("theme toggled");
    document.body.classList.toggle("light-mode");

});

let state = {
    currentView: "dashboard",
    tasks: []
};

// *****************************
// Sidebar -- Workspace Section
// *****************************

const sb_dashboard = document.getElementById("nav-dashboard");
sb_dashboard.classList.add("active");
sb_dashboard.addEventListener("click", function(){

    console.log("dashboard");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const dashboard_view = document.getElementById("view-dashboard");
    dashboard_view.classList.add("active");
    sb_dashboard.classList.add("active");

    state.currentView = "dashboard";
});

const sb_today = document.getElementById("nav-today");
sb_today.addEventListener("click", function(){

    console.log("today's tasks");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const today_view = document.getElementById("view-today");
    today_view.classList.add("active");
    sb_today.classList.add("active");

    state.currentView = "today";
});

const sb_upcoming = document.getElementById("nav-upcoming");
sb_upcoming.addEventListener("click", function(){

    console.log("upcoming tasks");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const upcoming_view = document.getElementById("view-upcoming");
    upcoming_view.classList.add("active");
    sb_upcoming.classList.add("active");

    state.currentView="upcoming";
});

const sb_completed = document.getElementById("nav-completed");
sb_completed.addEventListener("click", function(){

    console.log("completed tasks");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const completed_view = document.getElementById("view-completed");
    completed_view.classList.add("active"); 
    sb_completed.classList.add("active");

    state.currentView="completed";
});

const sb_overdue = document.getElementById("nav-overdue");
sb_overdue.addEventListener("click", function(){

    console.log("overdue tasks");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const view_overdue = document.getElementById("view-overdue");
    view_overdue.classList.add("active");
    sb_overdue.classList.add("active");

    state.currentView="overdue";    
});

// *****************************
// Sidebar -- Analytics Section
// *****************************

const sb_analytics = document.getElementById("nav-analytics");
sb_analytics.addEventListener("click", function(){

    console.log("task analytics");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const view_analytics = document.getElementById("view-analytics");
    view_analytics.classList.add("active");
    sb_analytics.classList.add("active");
    
    state.currentView="analytics";
});

const sb_notes = document.getElementById("nav-notes");
sb_notes.addEventListener("click", function(){

    console.log("notes page");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const view_notes = document.getElementById("view-notes");
    view_notes.classList.add("active");
    sb_notes.classList.add("active");

    state.currentView="notes";    
});

const sb_search = document.getElementById("nav-search");
sb_search.addEventListener("click", function(){

    console.log("search tasks");
    
    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const view_search = document.getElementById("view-search");
    view_search.classList.add("active");
    sb_search.classList.add("active");

    state.currentView="notes";
});

const sb_settings = document.getElementById("nav-settings");
sb_settings.addEventListener("click", function(){

    console.log("settings page");

    document.querySelectorAll(".sidebar-item").forEach(item=> {
        item.classList.remove("active");
    });

    document.querySelectorAll(".view").forEach(item=> {
        item.classList.remove("active");
    });

    const view_settings = document.getElementById("view-settings");
    view_settings.classList.add("active");
    sb_settings.classList.add("active");

    state.currentView="settings";    
});

