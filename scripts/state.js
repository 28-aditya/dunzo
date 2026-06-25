// =========================
// STATE
// =========================

let state = {
    currentView: "dashboard",

    tasks: [],
    archivedTasks: [],
    notes: [],
    addedCategories: [],

    activeNoteId: null,

    settings: {
        darkTheme: true,
        dailyGoal: 1,
        autoArchive: false,
        notifyOverdue: true
    },

    user: {
        username: "name",
        email: "email"
    }
};