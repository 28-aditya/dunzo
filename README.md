# dunzo. v2.0.3.3

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

### Dashboard Analytics

* Total tasks counter
* Tasks completed counter
* In-progress task counter
* Overdue task counter
* Completion rate calculation
* Productivity score calculation
* Time since last completed task
* Dynamic productivity feedback

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
    task_time,
    time_created,
    time_completed
}
```

### Core Systems

* View Switching System
* Modal Management System
* Analytics Engine
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
* Dashboard analytics
* Productivity score system
* Completion tracking
* Today task view
* Upcoming task view
* Completed task view
* Overdue task view
* Dynamic counters
* Reusable rendering engine
* Status update system
* Completion timestamp tracking

### In Progress

* Analytics page UI
* Search functionality
* Notes system
* Dashboard task board integration
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
* Analytics view page not implemented
* Search functionality not implemented
* Notes functionality not implemented
* Dashboard task board currently uses placeholder content
* No backend integration
* No persistent storage

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

* Added dashboard analytics system
* Added productivity score calculations
* Added completion rate calculations
* Added overdue task calculations
* Added task completion timestamp tracking
* Added time-since-completion tracking
* Added dynamic dashboard statistics
* Improved rendering architecture
* Improved task state management
* Improved task filtering utilities
* Improved dashboard data synchronization

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
