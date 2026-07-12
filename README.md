<div align="center">

```
██████╗ ██╗   ██╗███╗   ██╗███████╗ ██████╗ 
██╔══██╗██║   ██║████╗  ██║╚══███╔╝██╔═══██╗
██║  ██║██║   ██║██╔██╗ ██║  ███╔╝ ██║   ██║
██║  ██║██║   ██║██║╚██╗██║ ███╔╝  ██║   ██║
██████╔╝╚██████╔╝██║ ╚████║███████╗╚██████╔╝
╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ 
```

**v2.2.0.0**

*A modern productivity workspace. Clean design, fast workflow, zero friction.*

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vanilla](https://img.shields.io/badge/No_Framework-pure_vanilla-c8f261?style=flat-square)

</div>

---

## What is dunzo?

dunzo is a productivity dashboard built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, no fluff. Manage tasks, write notes, track progress, and stay on top of your day through a clean dark-first interface.

---

## Features

### 🗂 Task Management
- Create tasks with title, description, status, category, due date and time
- **Click-to-edit** any task directly from the board or list
- Custom category creation with dynamic insertion
- Status cycling — Todo → Doing → Done
- Completion timestamps and overdue detection
- Form validation with contextual error messages
- Manual archive action from the task modal (edit mode)
- Automatic archiving of tasks completed 5+ days ago (opt-in via Settings)

### 🔔 Notifications
- Bell icon on the dashboard opens a live notifications panel
- Automatic alerts when a task becomes overdue
- Automatic alerts when a task is due within 30 minutes
- Unread count badge on the bell icon
- Notifications marked as read when the panel is opened
- Delete individual notifications
- Badge refreshes immediately after completing, deleting, or archiving a task (not just on the poll interval)

### 🔐 Authentication
- Email/password sign-up and sign-in
- Google OAuth sign-in
- Live password strength meter (weak / medium / strong) on account creation
- Weak passwords are rejected at submission, not just flagged visually
- Password reset flow (email link)

### 📋 Views
| View | Description |
|---|---|
| **Dashboard** | Kanban board, productivity score, stats overview |
| **Today** | Tasks due today with live counters |
| **Upcoming** | Future tasks in chronological order |
| **Completed** | All finished tasks across dates |
| **Overdue** | Unfinished past-due tasks |
| **Search** | Real-time search across title, description, category |

### 📝 Notes
- Create, edit, and delete notes
- Link up to 4 tasks per note
- Sidebar navigation between notes
- Autosave on input

### 📊 Analytics
- Weekly completion trend chart
- Task flow visualization
- Category distribution chart
- Activity heatmap
- Productivity streak and best day tracking

### ⚙️ Settings
- Account management
- Daily goal and auto-archive (archives completed tasks after 5 days when enabled)
- Focus session timer configuration
- Notification preferences
- Default view selection
- Dark / light theme with persistence
- JSON data export and import
- Workspace reset

---

## Architecture

### Module Structure
```
state.js            global state object
models.js           TaskItem, NoteItem classes
utils.js            shared helpers (formatDate, stepNumber)
modal.js            task create / edit modal system (incl. archive action)
taskRendering.js    task list rendering and filtering
dashboard.js        dashboard analytics and kanban board
navigation.js       sidebar routing and view switching
search.js           real-time search engine
notes.js            notes system
settings.js         settings module
notifications.js    notifications bell, panel, badge, read/delete
createAccount.js    account creation, password strength meter + enforcement
app.js              entry point
dashboardData.js    mock data seeding
```

### State Shape
```js
state = {
    currentView,
    tasks,
    archivedTasks,
    notes,
    addedCategories,
    notifications,
    activeNoteId,
    settings: {
        darkTheme,
        dailyGoal,
        autoArchive,
        notifyOverdue,
        focusDuration,
        focusBreak,
        defaultView
    },
    user: {
        username,
        email
    }
}
```

### Task Object
```js
{
    task_id,          // UUID
    task_title,
    task_description,
    task_status,      // "todo" | "doing" | "done"
    task_category,
    task_date,        // YYYY-MM-DD
    task_time,        // HH:MM
    time_created,     // ISO string
    time_completed    // ISO string | null
}
```

### Note Object
```js
{
    note_id,          // UUID
    note_title,
    note_content,
    linked_tasks,     // task_id[]  max 4
    time_created,     // ISO string
    time_modified     // ISO string | null
}
```

### Notification Object
```js
{
    id,                // UUID
    type,              // "overdue" | "due_soon"
    message,
    is_read,
    created_at,        // ISO string
    task_id            // UUID | null
}
```

---

## Progress

### ✅ Completed
- Dashboard UI and kanban board
- Sidebar navigation and view switching
- Task creation and editing
- Task validation and status cycling
- Dynamic categories
- Dashboard analytics and productivity score
- Today / Upcoming / Completed / Overdue views
- Real-time search
- Notes system with linked tasks
- Analytics charts (trend, flow, category, heatmap)
- Settings module (full)
- Data export and import
- Dark / light theme with persistence
- Comprehensive bug audit and fixes
- FastAPI backend integration (auth, tasks, notes, settings, categories)
- Email/password and Google OAuth sign-in
- Notifications system (overdue / due-soon alerts, read/unread, delete)
- Auto-archiving of completed tasks
- Password strength enforcement on account creation

### 🔄 In Progress
- Comprehensive end-to-end testing
- Production hardening (see backend README for outstanding auth/security items)

### 📌 Planned
- Real-time sync (WebSockets) instead of polling for notifications
- Offline-first support
- Cloud/multi-device sync beyond the current backend

---

## Known Limitations
- Notifications are computed on read (no background scheduler) — the bell badge polls every 30s and also refreshes immediately after task mutations, so there's no scheduler process to keep running
- Task due dates/times are stored and compared as naive local strings with no timezone conversion, consistent with the rest of the app
- No cloud sync beyond the single connected backend/database

---

## Changelog

### v2.2.0.0
- Notifications system: overdue and due-in-30-minutes alerts, bell icon panel, unread badge, mark-as-read on open, delete
- Auto-archiving: tasks completed 5+ days ago archive automatically when enabled in Settings
- Manual "Archive" action added to the task modal (edit mode)
- Notification badge now refreshes immediately after completing/deleting/archiving a task instead of waiting on the poll interval
- Fixed a settings-page crash (missing password-reset button reference) that was silently blocking the auto-archive and notify-overdue toggles from saving
- Password strength checker on account creation now actually blocks weak passwords at submit time instead of only showing a cosmetic rating

### v2.1.0.0
- Full settings module
- Click-to-edit tasks
- Local storage persistence
- Real-time search fix
- Theme preference persistence
- Duplicate event listener fix
- `const`-in-switch scope fix
- Null guard on task category rendering
- `activeNoteId` added to initial state
- Notes task dropdown refresh on task changes
- Mock data seeding guard
- Export error handling
- Post-import view refresh
- Comprehensive bug audit across all modules

### v2.0.4.1
- Notes system with linked tasks
- Analytics dashboard
- Weekly trend, task flow, category distribution, heatmap
- Modular JavaScript architecture

---

<div align="center">
  <sub>Built with focus. Ship what matters.</sub>
</div>