// scripts/api.js

const API_URL = "http://localhost:8000";

async function loadUserData() {
    try {
        const res = await fetch(`${API_URL}/api/me`, {
            credentials: "include"  // sends the httpOnly cookie
        });

        if (res.status === 401) {
            // Not logged in — send back to sign-in
            window.location.href = "/pages/sign-in.html";
            return;
        }

        const data = await res.json();

        // Populate user
        state.user.username = data.user.name;
        state.user.email    = data.user.email;

        // Map backend tasks → TaskItem objects
        state.tasks = data.tasks
        .filter(t=> !t.is_archived)
        .map(t => new TaskItem(
            t.title,
            t.description || "",
            t.is_completed ? "done" : "todo",
            "",                        // category not in DB yet
            t.created_at?.split("T")[0] || "",
            "",
            t.created_at,
            t.is_completed ? t.created_at : null,
            t.is_archived
        ));

        state.archivedTasks = data.tasks
        .filter(t=> t.is_archived)
        .map(t => new TaskItem(
                        t.title,
            t.description || "",
            t.is_completed ? "done" : "todo",
            "",                        // category not in DB yet
            t.created_at?.split("T")[0] || "",
            "",
            t.created_at,
            t.is_completed ? t.created_at : null,
            t.is_archived
        ));

        state.addedCategories = data.added_categories.map(c => c.name);

        // Map backend notes → NoteItem objects
        state.notes = data.notes.map(n => {
            const note = new NoteItem(n.title || "", n.content);
            note.note_id      = n.id;
            note.time_created = n.created_at;
            return note;
        });

        // Map settings
        state.settings.darkTheme      = data.settings.dark_theme;
        state.settings.dailyGoal      = data.settings.daily_goal;
        state.settings.autoArchive    = data.settings.auto_archive;
        state.settings.notifyOverdue  = data.settings.notify_overdue;

        // Re-render with real data
        refreshCurrentView();

    } catch (err) {
        console.error("Failed to load user data:", err);
    }
}