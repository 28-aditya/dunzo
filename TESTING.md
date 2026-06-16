# dunzo. — Testing Procedure

## Pre-Testing Checklist

Complete all development work before beginning testing:

* [x] Task cards clickable
* [x] Edit task functionality
* [x] Settings page functionality
* [x] Analytics finalized
* [x] Notes finalized
* [x] Search finalized
* [ ] Local storage implementation completed

---

# Phase 1 — Smoke Test

Verify that the application launches correctly.

## Startup

* [x] Dashboard loads
* [x] No console errors
* [x] Sidebar navigation works
* [x] Theme toggle works
* [x] User information displays correctly

## Navigation

* [x] Dashboard view
* [x] Today view
* [x] Upcoming view
* [x] Completed view
* [x] Overdue view
* [x] Analytics view
* [x] Notes view
* [x] Search view
* [x] Settings view

---

# Phase 2 — Task System

## Create Task

Test every field.

* [x] Title
* [x] Description
* [x] Status
* [x] Category
* [x] Custom category
* [x] Due date
* [x] Due time

## Validation

* [x] Empty title
* [x] Empty status
* [x] Empty category
* [x] Empty date
* [x] Empty time
* [x] Past date rejection
* [x] Past time rejection

## Editing

* [x] Edit title
* [x] Edit description
* [x] Edit category
* [x] Edit status
* [x] Edit date
* [x] Edit time

## Deletion

* [x] Delete todo task
* [x] Delete in-progress task
* [x] Delete completed task
* [x] Delete overdue task

## Status Changes

* [x] Todo → In Progress
* [x] Todo → Completed
* [x] In Progress → Todo
* [x] In Progress → Completed
* [x] Completed → Todo
* [x] Completed → In Progress

## Quick Add

* [x] Add task
* [x] Empty input validation
* [x] Multiple tasks added quickly

---

# Phase 3 — Dashboard

## Statistics

* [x] Total tasks updates
* [x] In progress updates
* [x] Overdue updates
* [x] Completion rate updates

## Overview Cards

* [x] Tasks completed updates
* [x] Productivity score updates
* [x] Last completion timer updates

## Kanban Board

### Todo

* [x] Count correct
* [x] Cards render correctly

### In Progress

* [x] Count correct
* [x] Cards render correctly

### Completed

* [x] Count correct
* [x] Cards render correctly

---

# Phase 4 — Today View

* [x] Tasks due today appear
* [x] Completed tasks appear
* [x] Counts update correctly
* [x] Empty state works

---

# Phase 5 — Upcoming View

* [x] Future tasks appear
* [x] Completed future tasks appear
* [x] Counts update correctly
* [x] Empty state works

---

# Phase 6 — Completed View

* [x] Completed tasks appear
* [x] Newly completed tasks appear immediately
* [x] Deleted completed tasks disappear

---

# Phase 7 — Overdue View

* [x] Overdue tasks appear
* [x] Completed overdue tasks disappear
* [x] Counts update correctly

---

# Phase 8 — Notes System

## Creation

* [x] Create note
* [x] Empty note title
* [x] Long note title
* [x] Long note content

## Editing

* [x] Edit title
* [x] Edit content

## Saving

* [x] Save note
* [ ] Refresh page
* [x] Data persists

## Deletion

* [x] Delete note
* [x] Delete active note
* [x] Delete final note

## Linked Tasks

* [x] Link task
* [x] Link multiple tasks
* [x] Remove linked task
* [x] Prevent duplicate links
* [x] Maximum linked task limit enforced

---

# Phase 9 — Search

## Search Types

* [x] Search title
* [x] Search description
* [x] Search category

## Edge Cases

* [x] Empty search
* [x] One character
* [x] Uppercase search
* [x] Lowercase search
* [x] Special characters
* [x] No results

---

# Phase 10 — Analytics

## Weekly Trend

* [x] Graph renders
* [x] Labels render
* [x] Values render
* [x] Updates after task completion

## Task Flow

* [x] Created line renders
* [x] Completed line renders
* [x] Legend renders
* [x] Values update correctly

## Category Distribution

* [x] Chart renders
* [x] Legend renders
* [x] Percentages correct
* [x] Custom category handling

## Metrics

* [x] This Week value
* [x] Completion Rate value
* [x] Best Day value
* [x] Streak value

---

# Phase 11 — Settings

## Account

* [x] Username update
* [x] Email update

## Appearance

* [x] Theme toggle

## Productivity

* [x] Daily goal
* [x] Streak toggle
* [x] Auto archive toggle

## Data

* [x] Export JSON
* [x] Clear workspace

---

# Phase 12 — Local Storage

## Persistence

* [x] Tasks persist
* [x] Notes persist
* [x] Categories persist
* [x] Settings persist

## Reload Testing

* [x] Create task → refresh
* [x] Edit task → refresh
* [ ] Delete task → refresh
* [x] Create note → refresh
* [ ] Delete note → refresh

---

# Phase 13 — Stress Testing

## Task Stress Test

* [x] 50 tasks
* [x] 100 tasks
* [x] 250 tasks
* [x] 500 tasks

## Notes Stress Test

* [x] 25 notes
* [x] 50 notes

## Search Stress Test

* [x] Search with 500 tasks

## Analytics Stress Test

* [x] Charts render correctly with large datasets

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
