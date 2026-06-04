# dunzo. — Testing Procedure

## Pre-Testing Checklist

Complete all development work before beginning testing:

* [ ] Task cards clickable
* [ ] Edit task functionality
* [ ] Settings page functionality
* [ ] Analytics finalized
* [ ] Notes finalized
* [ ] Search finalized
* [ ] Local storage implementation completed

---

# Phase 1 — Smoke Test

Verify that the application launches correctly.

## Startup

* [ ] Dashboard loads
* [ ] No console errors
* [ ] Sidebar navigation works
* [ ] Theme toggle works
* [ ] User information displays correctly

## Navigation

* [ ] Dashboard view
* [ ] Today view
* [ ] Upcoming view
* [ ] Completed view
* [ ] Overdue view
* [ ] Analytics view
* [ ] Notes view
* [ ] Search view
* [ ] Settings view

---

# Phase 2 — Task System

## Create Task

Test every field.

* [ ] Title
* [ ] Description
* [ ] Status
* [ ] Category
* [ ] Custom category
* [ ] Due date
* [ ] Due time

## Validation

* [ ] Empty title
* [ ] Empty status
* [ ] Empty category
* [ ] Empty date
* [ ] Empty time
* [ ] Past date rejection
* [ ] Past time rejection

## Editing

* [ ] Edit title
* [ ] Edit description
* [ ] Edit category
* [ ] Edit status
* [ ] Edit date
* [ ] Edit time

## Deletion

* [ ] Delete todo task
* [ ] Delete in-progress task
* [ ] Delete completed task
* [ ] Delete overdue task

## Status Changes

* [ ] Todo → In Progress
* [ ] Todo → Completed
* [ ] In Progress → Todo
* [ ] In Progress → Completed
* [ ] Completed → Todo
* [ ] Completed → In Progress

## Quick Add

* [ ] Add task
* [ ] Empty input validation
* [ ] Multiple tasks added quickly

---

# Phase 3 — Dashboard

## Statistics

* [ ] Total tasks updates
* [ ] In progress updates
* [ ] Overdue updates
* [ ] Completion rate updates

## Overview Cards

* [ ] Tasks completed updates
* [ ] Productivity score updates
* [ ] Last completion timer updates

## Kanban Board

### Todo

* [ ] Count correct
* [ ] Cards render correctly

### In Progress

* [ ] Count correct
* [ ] Cards render correctly

### Completed

* [ ] Count correct
* [ ] Cards render correctly

---

# Phase 4 — Today View

* [ ] Tasks due today appear
* [ ] Completed tasks appear
* [ ] Counts update correctly
* [ ] Empty state works

---

# Phase 5 — Upcoming View

* [ ] Future tasks appear
* [ ] Completed future tasks appear
* [ ] Counts update correctly
* [ ] Empty state works

---

# Phase 6 — Completed View

* [ ] Completed tasks appear
* [ ] Newly completed tasks appear immediately
* [ ] Deleted completed tasks disappear

---

# Phase 7 — Overdue View

* [ ] Overdue tasks appear
* [ ] Completed overdue tasks disappear
* [ ] Counts update correctly

---

# Phase 8 — Notes System

## Creation

* [ ] Create note
* [ ] Empty note title
* [ ] Long note title
* [ ] Long note content

## Editing

* [ ] Edit title
* [ ] Edit content

## Saving

* [ ] Save note
* [ ] Refresh page
* [ ] Data persists

## Deletion

* [ ] Delete note
* [ ] Delete active note
* [ ] Delete final note

## Linked Tasks

* [ ] Link task
* [ ] Link multiple tasks
* [ ] Remove linked task
* [ ] Prevent duplicate links
* [ ] Maximum linked task limit enforced

---

# Phase 9 — Search

## Search Types

* [ ] Search title
* [ ] Search description
* [ ] Search category

## Edge Cases

* [ ] Empty search
* [ ] One character
* [ ] Uppercase search
* [ ] Lowercase search
* [ ] Special characters
* [ ] No results

---

# Phase 10 — Analytics

## Weekly Trend

* [ ] Graph renders
* [ ] Labels render
* [ ] Values render
* [ ] Updates after task completion

## Task Flow

* [ ] Created line renders
* [ ] Completed line renders
* [ ] Legend renders
* [ ] Values update correctly

## Category Distribution

* [ ] Chart renders
* [ ] Legend renders
* [ ] Percentages correct
* [ ] Custom category handling

## Metrics

* [ ] This Week value
* [ ] Completion Rate value
* [ ] Best Day value
* [ ] Streak value

---

# Phase 11 — Settings

## Account

* [ ] Username update
* [ ] Email update

## Appearance

* [ ] Theme toggle

## Productivity

* [ ] Daily goal
* [ ] Streak toggle
* [ ] Auto archive toggle

## Data

* [ ] Export JSON
* [ ] Clear workspace

---

# Phase 12 — Local Storage

## Persistence

* [ ] Tasks persist
* [ ] Notes persist
* [ ] Categories persist
* [ ] Settings persist

## Reload Testing

* [ ] Create task → refresh
* [ ] Edit task → refresh
* [ ] Delete task → refresh
* [ ] Create note → refresh
* [ ] Delete note → refresh

---

# Phase 13 — Stress Testing

## Task Stress Test

* [ ] 50 tasks
* [ ] 100 tasks
* [ ] 250 tasks
* [ ] 500 tasks

## Notes Stress Test

* [ ] 25 notes
* [ ] 50 notes

## Search Stress Test

* [ ] Search with 500 tasks

## Analytics Stress Test

* [ ] Charts render correctly with large datasets

---

# Phase 14 — Full User Simulation

Start with an empty workspace.

Perform:

1. Create 20 tasks.
2. Create 5 custom categories.
3. Complete 10 tasks.
4. Leave 5 overdue.
5. Create 10 notes.
6. Link notes to tasks.
7. Search various tasks.
8. Visit every page.
9. Export data.
10. Refresh page.
11. Continue working.
12. Delete random tasks.
13. Delete random notes.
14. Verify analytics.
15. Clear workspace.

Expected result:

No crashes.
No incorrect counts.
No missing data.
No console errors.

---

# Release Checklist

* [ ] No console errors
* [ ] All tests passed
* [ ] Local storage stable
* [ ] Mobile layout checked
* [ ] Export works
* [ ] Analytics accurate
* [ ] Search accurate
* [ ] Notes stable
* [ ] Task system stable

Ready for backend integration.
