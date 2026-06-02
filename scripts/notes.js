// =====================
// NOTES FUNCTIONALITY (FULL FIXED VERSION)
// =====================

let notesList;
let noteTitleInput;
let noteContentInput;
let newNoteBtn;
let saveNoteBtn;
let deleteNoteBtn;
let taskSelect;
let linkTaskBtn;
let linkedTaskContainer;

let noteEditor;
let emptyState;

// =====================
// INIT
// =====================
function initNotes() {

    notesList = document.getElementById("notes-list");
    noteTitleInput = document.getElementById("note-title");
    noteContentInput = document.getElementById("note-content");

    newNoteBtn = document.getElementById("new-note-btn");
    saveNoteBtn = document.getElementById("save-note-btn");
    deleteNoteBtn = document.getElementById("delete-note-btn");

    taskSelect = document.getElementById("task-link-select");
    linkTaskBtn = document.getElementById("link-task-btn");

    linkedTaskContainer = document.getElementById("linked-task-list");

    noteEditor = document.getElementById("note-editor");
    emptyState = document.getElementById("notes-empty-state");

    if (!notesList || !noteEditor) return;

    hideEditor();

    renderNotes();
    renderTaskDropdown();

    newNoteBtn?.addEventListener("click", createNewNote);
    saveNoteBtn?.addEventListener("click", saveNote);
    deleteNoteBtn?.addEventListener("click", deleteNote);
    linkTaskBtn?.addEventListener("click", linkTaskToNote);

    noteTitleInput?.addEventListener("input", autosave);
    noteContentInput?.addEventListener("input", autosave);
    
    document.getElementById("close-note-editor")
    ?.addEventListener("click", () => {
        state.activeNoteId = null;
        clearEditor();
        hideEditor();
    });
}

// =====================
// UI CONTROL
// =====================
function showEditor() {
    noteEditor?.classList.remove("hidden");
    emptyState?.classList.remove("active");
}

function hideEditor() {
    noteEditor?.classList.add("hidden");
    emptyState?.classList.add("active");
}

function clearEditor() {
    noteTitleInput.value = "";
    noteContentInput.value = "";
    linkedTaskContainer.innerHTML = "";
}

// =====================
// CREATE NOTE
// =====================
function createNewNote() {

    const count = state.notes.length + 1;

    const newNote = new NoteItem(
        "",
        ""
    );

    newNote.note_title = ""; // keep empty on creation

    state.notes.push(newNote);
    state.activeNoteId = newNote.note_id;

    openNote(newNote.note_id);

    showEditor();
}

// =====================
// OPEN NOTE
// =====================

function openNote(id) {

    const note = state.notes.find(n => n.note_id === id);
    if (!note) return;

    state.activeNoteId = id;

    noteTitleInput.value = note.note_title;
    noteContentInput.value = note.note_content;

    // if empty title, show placeholder hint behavior
    if (!note.note_title) {
        noteTitleInput.placeholder = "Untitled Note";
    }

    showEditor();

    renderNotes();
    renderLinkedTasks(note);
}

// =====================
// SAVE NOTE
// =====================
function saveNote() {

    const errorBox = document.getElementById("note-error");

    const note = state.notes.find(n => n.note_id === state.activeNoteId);
    if (!note) return;

    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();

    // RESET ERROR
    if (errorBox) errorBox.textContent = "";

    // BLOCK: empty content
    if (!content) {
        if (errorBox) {
            errorBox.textContent = "Note content cannot be empty.";
        }
        return;
    }

    // auto-title if missing
    const count = state.notes.filter(n => !n.note_title || n.note_title.startsWith("Untitled Note")).length + 1;

    note.note_title = title || `Untitled Note (${count})`;
    note.note_content = content;
    note.time_modified = new Date().toISOString();

    renderNotes();

    state.activeNoteId = null;
    clearEditor();
    hideEditor();
}

// =====================
// DELETE NOTE
// =====================
function deleteNote() {

    const idx = state.notes.findIndex(n => n.note_id === state.activeNoteId);
    if (idx === -1) return;

    state.notes.splice(idx, 1);

    state.activeNoteId = null;

    renderNotes();
    clearEditor();
    hideEditor();
}

// =====================
// AUTOSAVE (NO UI CHANGE)
// =====================
function autosave() {

    const note = state.notes.find(n => n.note_id === state.activeNoteId);
    if (!note) return;

    note.note_title = noteTitleInput.value;
    note.note_content = noteContentInput.value;

    renderNotes();
}

// =====================
// RENDER NOTES LIST
// =====================
function renderNotes() {

    if (!notesList) return;

    notesList.innerHTML = "";

    state.notes.forEach(note => {

        const div = document.createElement("div");
        div.classList.add("note-item");

        if (note.note_id === state.activeNoteId) {
            div.classList.add("active");
        }

        div.innerHTML = `
            <div class="note-item-title">
                ${note.note_title}
            </div>
            <div class="note-item-meta">
                ${note.linked_tasks.length} linked tasks
            </div>
        `;

        div.addEventListener("click", () => openNote(note.note_id));

        notesList.appendChild(div);
    });
}

// =====================
// TASK DROPDOWN
// =====================
function renderTaskDropdown() {

    if (!taskSelect) return;

    taskSelect.innerHTML = `<option value="">Select task...</option>`;

    state.tasks.forEach(task => {

        const option = document.createElement("option");
        option.value = task.task_id;
        option.textContent = task.task_title;

        taskSelect.appendChild(option);
    });
}

// =====================
// LINK TASK
// =====================
function linkTaskToNote() {

    const note = state.notes.find(n => n.note_id === state.activeNoteId);
    if (!note) return;

    const taskId = taskSelect?.value;
    if (!taskId) return;

    if (!note.linked_tasks.includes(taskId)) {
        note.linked_tasks.push(taskId);
        const taskLinkSelect = document.getElementById("task-link-select");
        taskLinkSelect.value="";
    }

    renderLinkedTasks(note);
    renderNotes();
}

// =====================
// LINKED TASKS
// =====================
function renderLinkedTasks(note) {

    if (!linkedTaskContainer) return;

    linkedTaskContainer.innerHTML = "";

    note.linked_tasks.forEach(id => {

        const task = state.tasks.find(t => t.task_id === id);
        if (!task) return;

        const div = document.createElement("div");
        div.classList.add("linked-task-card");

        div.innerHTML = `
            <div class="task-title">
                ${task.task_title}
            </div>

            <div class="task-meta-row">
                <span>${task.task_category}</span>
                <span>•</span>
                <span>${task.task_status}</span>
                <span>•</span>
                <span>${task.task_date} ${task.task_time}</span>
            </div>
        `;

        linkedTaskContainer.appendChild(div);
    });
}

// =====================
// BOOT
// =====================
document.addEventListener("DOMContentLoaded", initNotes);