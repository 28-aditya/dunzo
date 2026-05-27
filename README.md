# dunzo.

> A modern productivity dashboard focused on clean design, fast workflow, and simple task management.

---

## Preview

A sleek workspace for managing tasks, tracking productivity, and organizing daily workflow — built completely with vanilla HTML, CSS, and JavaScript.

---

## Features

### Workspace Dashboard
- Modern responsive UI
- Sidebar navigation system
- Multiple workspace views:
  - Dashboard
  - Today
  - Upcoming
  - Completed
  - Overdue
  - Analytics
  - Notes
  - Search
  - Settings
- Productivity overview cards
- Recent activity section

### Task Management
- Create tasks with:
  - Title
  - Description
  - Status (Todo / In Progress / Completed)
  - Category
  - Due date
  - Due time
- Custom category creation inside task modal
- Custom categories inserted before “+ Create Category”
- Validation system:
  - Required fields
  - Prevent empty custom category
  - Prevent past-time scheduling (same-day validation)
- Modal-based task creation flow
- Tasks stored in internal state object

### User Experience
- Dark / light mode toggle
- Improved form UX (dynamic date/time restrictions)
- Error handling for invalid inputs
- Smooth UI transitions and state switching
- Centralized state management (`state.tasks`, `state.addedCategories`)

---

## Built With
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

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
- Dashboard UI layout
- Sidebar navigation system
- Theme switching
- Task modal system
- Task validation system
- Custom category creation feature
- Task object architecture
- State management setup

### In Progress
- Dynamic task rendering into UI
- Category system improvements
- Analytics logic
- Search functionality

### Planned
- Drag & drop task board
- Local storage persistence
- Authentication system
- Backend integration
- User accounts
- Real-time sync

---

## Known Limitations
- Tasks are not dynamically rendered yet
- No persistence (refresh clears state)
- Analytics section is UI-only

---

## Getting Started

### Clone repository
```bash
git clone https://github.com/28-aditya/dunzo.git
```

### Open project
Open `dashboard.html` in a browser.

---

## Goals
- Improve frontend architecture skills
- Strengthen DOM manipulation
- Practice state management
- Build UI/UX consistency
- Learn real-world project structure

---

## License
MIT

---

## Author
Aditya Sharma