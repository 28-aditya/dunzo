// scripts/api.js

const API_URL = "http://localhost:8000";

// ─────────────────────────────────────────
// LOAD (called once on app boot)
// ─────────────────────────────────────────

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

        // User
        state.user.username = data.user.name;
        state.user.email    = data.user.email;

        // Tasks — map every real DB field correctly
        const mapTask = t => {
            const item = new TaskItem(
                t.title,
                t.description || "",
                t.status || "todo",          // real status column (todo/doing/done)
                t.category || "",
                t.due_date   || "",
                t.due_time   || "",
                t.created_at || null,
                t.status === "done" ? (t.updated_at || t.created_at) : null,
                t.is_archived || false
            );
            item.task_id = t.id;            // keep the real DB UUID so PATCH/DELETE work
            return item;
        };

        state.tasks         = data.tasks.filter(t => !t.is_archived).map(mapTask);
        state.archivedTasks = data.tasks.filter(t =>  t.is_archived).map(mapTask);

        // Categories
        state.addedCategories = data.added_categories.map(c => c.name);

        // Notes
        state.notes = data.notes.map(n => {
            const note          = new NoteItem(n.title || "", n.content || "");
            note.note_id        = n.id;
            note.time_created   = n.created_at;
            note.linked_tasks   = (n.linked_tasks || []).map(lt => lt.task_id);
            return note;
        });

        // Settings
        state.settings.darkTheme     = data.settings.dark_theme;
        state.settings.dailyGoal     = data.settings.daily_goal;
        state.settings.autoArchive   = data.settings.auto_archive;
        state.settings.notifyOverdue = data.settings.notify_overdue;

        refreshCurrentView();

    } catch (err) {
        console.error("loadUserData failed:", err);
    }
}

// ─────────────────────────────────────────
// TASKS
// ─────────────────────────────────────────

async function apiCreateTask(task) {
    const body = {
        title:       task.task_title,
        description: task.task_description || "",
        category:    task.task_category    || "",
        due_date:    task.task_date        || "",
        due_time:    task.task_time        || "",
        status:      task.task_status
    };

    const res = await fetch(`${API_URL}/api/tasks/`, {
        method:      "POST",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Failed to create task");
    const created = await res.json();
    // Update the in-memory task with the real DB id
    task.task_id = created.id;
    return created;
}

async function apiUpdateTask(task) {
    const body = {
        title:       task.task_title,
        description: task.task_description || "",
        category:    task.task_category    || "",
        due_date:    task.task_date        || "",
        due_time:    task.task_time        || "",
        status:      task.task_status,
        is_archived: task.is_archived      || false
    };

    const res = await fetch(`${API_URL}/api/tasks/${task.task_id}`, {
        method:      "PUT",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
}

async function apiDeleteTask(taskId) {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method:      "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
}

// ─────────────────────────────────────────
// NOTES
// ─────────────────────────────────────────

async function apiCreateNote(note) {
    const res = await fetch(`${API_URL}/api/notes/`, {
        method:      "POST",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({
            title:   note.note_title   || "",
            content: note.note_content || ""
        })
    });
    if (!res.ok) throw new Error("Failed to create note");
    const created = await res.json();
    note.note_id = created.id;
    return created;
}

async function apiUpdateNote(note) {
    const res = await fetch(`${API_URL}/api/notes/${note.note_id}`, {
        method:      "PUT",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({
            title:   note.note_title   || "",
            content: note.note_content || ""
        })
    });
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
}

async function apiDeleteNote(noteId) {
    const res = await fetch(`${API_URL}/api/notes/${noteId}`, {
        method:      "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to delete note");
    return res.json();
}

// ─────────────────────────────────────────
// LINKED TASKS
// ─────────────────────────────────────────

async function apiLinkTask(noteId, taskId) {
    const res = await fetch(`${API_URL}/api/notes/${noteId}/tasks`, {
        method:      "POST",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({ task_id: taskId })
    });
    if (!res.ok) throw new Error("Failed to link task");
    return res.json();
}

async function apiUnlinkTask(noteId, taskId) {
    const res = await fetch(`${API_URL}/api/notes/${noteId}/tasks/${taskId}`, {
        method:      "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to unlink task");
    return res.json();
}

// ─────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────

async function apiSaveSettings() {
    const res = await fetch(`${API_URL}/api/settings/`, {
        method:      "PUT",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({
            dark_theme:     state.settings.darkTheme,
            daily_goal:     state.settings.dailyGoal,
            auto_archive:   state.settings.autoArchive,
            notify_overdue: state.settings.notifyOverdue
        })
    });
    if (!res.ok) throw new Error("Failed to save settings");
    return res.json();
}

// ─────────────────────────────────────────
// UI STATE
// ─────────────────────────────────────────

async function apiSaveUIState(view) {
    const res = await fetch(`${API_URL}/user/state`, {
        method:      "PUT",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({ current_view: view })
    });
    if (!res.ok) throw new Error("Failed to save UI state");
    return res.json();
}