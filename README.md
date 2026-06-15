<div align="center">

```
██████╗ ██╗   ██╗███╗   ██╗███████╗ ██████╗ 
██╔══██╗██║   ██║████╗  ██║╚══███╔╝██╔═══██╗
██║  ██║██║   ██║██╔██╗ ██║  ███╔╝ ██║   ██║
██║  ██║██║   ██║██║╚██╗██║ ███╔╝  ██║   ██║
██████╔╝╚██████╔╝██║ ╚████║███████╗╚██████╔╝
╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ 
```

**v2.1.0.0**

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
- Daily goal and auto-archive
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
modal.js            task create / edit modal system
taskRendering.js    task list rendering and filtering
dashboard.js        dashboard analytics and kanban board
navigation.js       sidebar routing and view switching
search.js           real-time search engine
notes.js            notes system
settings.js         settings module
app.js              entry point
dashboardData.js    mock data seeding
```

### State Shape
```js
state = {
    currentView,
    tasks,
    notes,
    addedCategories,
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
- Local storage persistence
- Dark / light theme with persistence
- Comprehensive bug audit and fixes

### 🔄 In Progress
- Authentication pages (index, sign-in, create-account, profile)
- Comprehensive testing

### 📌 Planned
- Backend integration
- User accounts and authentication
- Cloud synchronization
- Notifications and reminders
- Database support

---

## Known Limitations
- No backend — data lives in localStorage only
- No cloud sync or multi-device support
- Authentication UI in progress, not yet functional

---

## Changelog

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