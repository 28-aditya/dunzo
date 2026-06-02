# dunzo. v2.0.4.0

> A modern productivity dashboard focused on clean design, fast workflow, and simple task management.

---

## Preview

A responsive productivity workspace built with vanilla HTML, CSS, and JavaScript. Manage tasks, track progress, monitor productivity, and organize work through dedicated workflow views.

---

## Features

### Workspace Dashboard

* Responsive dashboard interface
* Sidebar navigation system
* Dynamic page header updates
* Productivity overview cards
* Workspace statistics dashboard
* Task status tracking
* Recent activity section
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

---

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

* Modal-based task creation workflow

* Form validation system

* Dynamic task status updates

* Task completion tracking

* Automatic completion timestamps

* Centralized state management

* Reusable rendering architecture

#### Status Workflow

* Todo → In Progress → Completed
* One-click status cycling
* Automatic dashboard refresh after updates

---

### Search System

* Real-time task searching
* Search by title
* Search by description
* Search by category
* Empty-state handling
* Dynamic search rendering

---

### Dashboard Analytics

* Total tasks counter
* Tasks completed counter
* In-progress task counter
* Overdue task counter
* Completion rate calculation
* Productivity score calculation
* Time since last completed task
* Dynamic productivity feedback
* Dashboard task board

---

### Task Views

#### Today

* Displays tasks due today
* Automatically sorted by due time
* Live incomplete task counter
* Live completed task counter

#### Upcoming

* Displays future scheduled tasks
* Dynamic completion statistics
* Chronological task display

#### Completed

* Displays completed tasks across all dates
* Automatically updates when task status changes

#### Overdue

* Displays overdue unfinished tasks
* Automatically excludes completed tasks

---

### User Experience

* Dark mode / light mode toggle
* Dynamic date restrictions
* Dynamic time restrictions
* Real-time form validation
* Responsive layout system
* Smooth modal workflow
* Dynamic view updates
* Empty-state handling

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
    addedCategories,
    notes
}
```

### Task Object

```js
{
    task_id,
    task_title,
    task_description,
    task_status,
    task_category,
    task_date,
    task_time,
    time_created,
    time_completed
}
```

### Core Systems

* View Switching System
* Modal Management System
* Analytics Engine
* Search Engine
* Task Filtering Engine
* Reusable Task Rendering Engine
* Dynamic Category Management
* Theme Management
* State Management System

---

## Project Structure

```txt
dunzo/
│
├── assets/
│
├── css/
│   └── styles.css
│
├── pages/
│   ├── create-account.html
│   ├── dashboard.html
│   ├── profile.html
│   └── sign-in.html
│
├── scripts/
│   ├── app.js
│   ├── dashboard.js
│   ├── dashboardData.js
│   ├── modal.js
│   ├── models.js
│   ├── navigation.js
│   ├── search.js
│   ├── state.js
│   ├── taskRendering.js
│   └── utils.js
│
├── .gitignore
├── index.html
├── LICENSE
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
* Dashboard analytics
* Productivity score system
* Completion tracking
* Today task view
* Upcoming task view
* Completed task view
* Overdue task view
* Search system
* Dynamic counters
* Reusable rendering engine
* Status update system
* Completion timestamp tracking
* Modular JavaScript architecture

### In Progress

* Analytics page UI
* Notes system
* Recent activity automation
* Task editing functionality

### Planned

* Local storage persistence
* Authentication system
* Backend integration
* User accounts
* Real-time synchronization
* Drag-and-drop task management
* Notifications and reminders
* Database support
* Team collaboration features

---

## Known Limitations

* Data is stored only in memory
* Refreshing the page resets all tasks
* Analytics page not implemented
* Notes functionality not implemented
* No backend integration
* No persistent storage
* No user authentication

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/28-aditya/dunzo.git
```

### Run Project

Open:

```txt
index.html
```

in any modern web browser.

---

## Version

**v2.0.4.0**

### Changelog

* Refactored project structure
* Introduced modular JavaScript architecture
* Added search functionality
* Added dedicated navigation module
* Added dashboard module
* Added models and state separation
* Added utility module
* Improved maintainability and scalability
* Improved code organization
* Reduced monolithic script size
* Updated project directory structure

---

## Goals

* Improve frontend architecture skills
* Strengthen DOM manipulation skills
* Learn scalable state management
* Practice reusable UI systems
* Explore productivity application design
* Build production-style project structure

---

## License

MIT

---

## Author

Aditya Sharma
