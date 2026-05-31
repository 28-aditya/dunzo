# dunzo. v2.0.3.3

> A modern productivity dashboard focused on clean design, fast workflow, and simple task management.

---

## Preview

A responsive productivity workspace built with vanilla HTML, CSS, and JavaScript. Manage tasks, track progress, organize schedules, and navigate between dedicated workflow views.

---

## Features

### Workspace Dashboard

* Responsive dashboard interface
* Sidebar navigation system
* Dedicated workspace views:

  * Dashboard
  * Today
  * Upcoming
  * Completed
  * Overdue
  * Analytics
  * Notes
  * Search
  * Settings
* Dynamic page header updates
* Productivity overview cards
* Recent activity section

### Task Management

* Create tasks with:

  * Title
  * Description
  * Status
  * Category
  * Due date
  * Due time
* Custom category creation
* Dynamic category insertion
* Task validation system
* Modal-based task creation workflow
* Centralized task state management
* Dynamic task rendering engine
* Reusable rendering architecture
* Status cycling:

  * Todo → In Progress → Completed
* Automatic UI refresh after task updates

### Task Views

#### Today

* Displays tasks scheduled for the current day
* Sorted by due time
* Live incomplete task counter
* Live completed task counter

#### Upcoming

* Displays future scheduled tasks
* Dynamic completion statistics

#### Completed

* Displays completed tasks across all dates
* Automatically updates when task status changes

#### Overdue

* Displays incomplete tasks with past due dates
* Automatically excludes completed tasks

### User Experience

* Dark mode / light mode toggle
* Dynamic date restrictions
* Dynamic time restrictions
* Form validation feedback
* Smooth modal animations
* View-based state updates
* Responsive layout system

---

## Built With

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)

---

## Architecture

### State Management

```js
state = {
    currentView,
    tasks,
    addedCategories
}
```

### Task Object

```js
{
    task_title,
    task_description,
    task_status,
    task_category,
    task_date,
    task_time
}
```

### Core Systems

* View Switching System
* Modal Management System
* Task Filtering Engine
* Reusable Task Rendering Engine
* Dynamic Category Management
* Theme Management

---

## Project Structure

```txt
dunzo/
│
├── dashboard.html
├── styles.css
├── script.js
└── README.md
```

---

## Current Development Progress

### Completed

* Dashboard UI
* Responsive layout
* Sidebar navigation
* Theme switching
* Task creation modal
* Task validation
* Dynamic category creation
* State management
* Today task view
* Upcoming task view
* Completed task view
* Overdue task view
* Reusable rendering system
* Status update system
* Dynamic counters

### In Progress

* Analytics system
* Search functionality
* Notes system
* Dashboard statistics integration
* Task editing functionality

### Planned

* Local storage persistence
* Authentication system
* Backend integration
* User accounts
* Real-time synchronization
* Drag and drop task management
* Notifications and reminders

---

## Known Limitations

* Data is stored only in memory
* Refreshing the page resets all tasks
* Analytics view not implemented
* Search view not implemented
* Notes view not implemented
* No backend integration yet

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/28-aditya/dunzo.git
```

### Run Project

Open:

```txt
dashboard.html
```

in any modern web browser.

---

## Version

**v2.0.3.3**

### Changelog

* Added reusable task rendering engine
* Added Today task view
* Added Upcoming task view
* Added Completed task view
* Added Overdue task view
* Added dynamic status updates
* Added automatic view refresh system
* Added task filtering utilities
* Improved state architecture
* Improved category management

---

## Goals

* Improve frontend architecture skills
* Strengthen DOM manipulation skills
* Learn scalable state management
* Practice reusable UI systems
* Build production-style project structure

---

## License

MIT

---

## Author

Aditya Sharma
