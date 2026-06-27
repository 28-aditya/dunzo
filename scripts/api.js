// =========================
// API CONFIG
// =========================

const API_URL = "http://localhost:8000";

// =========================
// LOAD USER DATA
// =========================

async function loadUserData() {
    try {
        const res = await fetch(`${API_URL}/api/me`, {
            credentials: "include"
        });

        if (res.status === 401) {
            window.location.href = "/pages/sign-in.html";
            return;
        }

        const data = await res.json();

        // -------------------------
        // USER
        // -------------------------
        state.user.username = data.user.name;
        state.user.email = data.user.email;

        // -------------------------
        // TASKS
        // -------------------------
        state.tasks = data.tasks
            .filter(t => !t.is_archived)
            .map(t => {
                const task = new TaskItem(
                    t.title,
                    t.description || "",
                    t.status,
                    t.category || "",
                    t.due_date || "",
                    t.due_time || "",
                    t.created_at,
                    t.status === "done" ? t.created_at : null,
                    t.is_archived
                );

                task.task_id = t.id;
                return task;
            });

        state.archivedTasks = data.tasks
            .filter(t => t.is_archived)
            .map(t => {
                const task = new TaskItem(
                    t.title,
                    t.description || "",
                    t.status,
                    t.category || "",
                    t.due_date || "",
                    t.due_time || "",
                    t.created_at,
                    t.status === "done" ? t.created_at : null,
                    t.is_archived
                );

                task.task_id = t.id;
                return task;
            });

        // -------------------------
        // CATEGORIES
        // -------------------------
        state.addedCategories = data.added_categories.map(c => c.name);

        // -------------------------
        // NOTES
        // -------------------------
        state.notes = data.notes.map(n => {
            const note = new NoteItem(
                n.title || "",
                n.content
            );

            note.note_id = n.id;
            note.time_created = n.created_at;
            note.time_modified = n.updated_at;

            return note;
        });

        // -------------------------
        // SETTINGS
        // -------------------------
        state.settings.darkTheme = data.settings.dark_theme;
        state.settings.dailyGoal = data.settings.daily_goal;
        state.settings.autoArchive = data.settings.auto_archive;
        state.settings.notifyOverdue = data.settings.notify_overdue;

        // -------------------------
        // FIRST RENDER
        // -------------------------
        refreshCurrentView();

    } catch (err) {
        console.error("Failed to load user data:", err);
    }
}

// =========================
// TASK API
// =========================

async function saveTask(task) {
    const payload = {
        title: task.task_title,
        description: task.task_description,
        status: task.task_status,
        category: task.task_category,
        due_date: task.task_date,
        due_time: task.task_time,
        is_archived: task.is_archived || false
    };

    const url = task.task_id
        ? `${API_URL}/api/tasks/${task.task_id}`
        : `${API_URL}/api/tasks`;

    const method = task.task_id ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to save task");
}

// =========================
// NOTE API
// =========================

async function saveNote(note) {
    const payload = {
        title: note.note_title,
        content: note.note_content
    };

    const url = note.note_id
        ? `${API_URL}/api/notes/${note.note_id}`
        : `${API_URL}/api/notes`;

    const method = note.note_id ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to save note");
}

// =========================
// SETTINGS API
// =========================

async function saveSettings(settings) {
    const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            dark_theme: settings.darkTheme,
            daily_goal: settings.dailyGoal,
            auto_archive: settings.autoArchive,
            notify_overdue: settings.notifyOverdue
        })
    });

    if (!res.ok) throw new Error("Failed to save settings");
}

// =========================
// UI STATE
// =========================

async function saveUIState(currentView) {
    const res = await fetch(`${API_URL}/user/state`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            current_view: currentView
        })
    });

    if (!res.ok) throw new Error("Failed to save UI state");
}