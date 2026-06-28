// =====================
// NOTES MODULE
// =====================

let notesList, noteTitleInput, noteContentInput;
let newNoteBtn, saveNoteBtn, deleteNoteBtn;
let taskSelect, linkTaskBtn, linkedTaskContainer;
let noteEditor, emptyState, errorEl, linkedCountEl;

const MAX_LINKED_TASKS = 4;
let draftNote = null;

// =====================
// HELPERS
// =====================

function getActiveNote() {
    return (
        state.notes.find(n => n.note_id === state.activeNoteId) ||
        (draftNote?.note_id === state.activeNoteId ? draftNote : null)
    );
}

function ensureNote(note) {
    if (!note.linked_tasks) note.linked_tasks = [];
}

function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg || "";
    errorEl.classList.add("visible");
}

function clearError() {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
}

function clearEditor() {
    noteTitleInput.value          = "";
    noteContentInput.value        = "";
    linkedTaskContainer.innerHTML = "";
    taskSelect.value              = "";
}

// =====================
// UI STATE
// =====================

function showEditor() {
    noteEditor.classList.remove("hidden");
    emptyState.classList.remove("active");
    document.querySelector(".notes-sidebar").style.display = "none";
    document.querySelector(".notes-layout").classList.add("editor-mode");
}

function hideEditor() {
    noteEditor.classList.add("hidden");
    emptyState.classList.add("active");
    document.querySelector(".notes-sidebar").style.display = "block";
    document.querySelector(".notes-layout").classList.remove("editor-mode");
    taskSelect.value = "";
    clearError();
}

// =====================
// INIT
// =====================

function initNotes() {
    notesList           = document.getElementById("notes-list");
    noteTitleInput      = document.getElementById("note-title");
    noteContentInput    = document.getElementById("note-content");
    newNoteBtn          = document.getElementById("new-note-btn");
    saveNoteBtn         = document.getElementById("save-note-btn");
    deleteNoteBtn       = document.getElementById("delete-note-btn");
    taskSelect          = document.getElementById("task-link-select");
    linkTaskBtn         = document.getElementById("link-task-btn");
    linkedTaskContainer = document.getElementById("linked-task-list");
    noteEditor          = document.getElementById("note-editor");
    emptyState          = document.getElementById("notes-empty-state");
    errorEl             = document.getElementById("note-error");
    linkedCountEl       = document.getElementById("linked-task-count");

    renderTaskDropdown();
    renderNotes();
    hideEditor();

    newNoteBtn.addEventListener("click",    createNewNote);
    saveNoteBtn.addEventListener("click",   saveNote);
    deleteNoteBtn.addEventListener("click", deleteNote);
    linkTaskBtn.addEventListener("click",   linkTask);

    noteTitleInput.addEventListener("input",   autosave);
    noteContentInput.addEventListener("input", autosave);

    document.getElementById("close-note-editor")
        ?.addEventListener("click", closeEditor);
}

// =====================
// CREATE NOTE
// =====================

function createNewNote() {
    draftNote = new NoteItem("", "");
    ensureNote(draftNote);
    state.activeNoteId = draftNote.note_id;

    clearEditor();
    deleteNoteBtn.classList.add("hidden");
    clearError();
    updateLinkedCount(draftNote);
    showEditor();
}

// =====================
// OPEN NOTE
// =====================

function openNote(id) {
    const note = state.notes.find(n => n.note_id === id);
    if (!note) return;

    ensureNote(note);
    state.activeNoteId = id;
    draftNote          = null;

    noteTitleInput.value   = note.note_title   || "";
    noteContentInput.value = note.note_content || "";

    deleteNoteBtn.classList.remove("hidden");
    clearError();
    showEditor();
    renderNotes();
    renderLinked(note);
    updateLinkedCount(note);
}

// =====================
// SAVE NOTE
// =====================

async function saveNote() {
    clearError();

    const title   = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();

    if (!title && !content) {
        showError("Cannot save empty note");
        return;
    }

    let note = state.notes.find(n => n.note_id === state.activeNoteId);
    const isNew = !note && draftNote;

    if (isNew) {
        note = draftNote;
        state.notes.push(note);
    }

    if (!note) return;

    ensureNote(note);
    note.note_title    = title ||
        `Untitled Note ${state.notes.filter(n => (n.note_title || "").startsWith("Untitled Note")).length}`;
    note.note_content  = content;
    note.time_modified = new Date().toISOString();

    draftNote = null;

    try {
        if (isNew) {
            await apiCreateNote(note);    // sets note.note_id to real DB id
        } else {
            await apiUpdateNote(note);
        }
    } catch (err) {
        console.error("Save note failed:", err);
    }

    renderNotes();
    closeEditor();
}

// =====================
// DELETE NOTE
// =====================

async function deleteNote() {
    const noteId = state.activeNoteId;
    const idx    = state.notes.findIndex(n => n.note_id === noteId);
    if (idx === -1) return;

    state.notes.splice(idx, 1);

    try {
        await apiDeleteNote(noteId);
    } catch (err) {
        console.error("Delete note failed:", err);
    }

    renderNotes();
    closeEditor();
}

// =====================
// CLOSE
// =====================

function closeEditor() {
    state.activeNoteId = null;
    draftNote          = null;
    clearEditor();
    clearError();
    hideEditor();
}

// =====================
// AUTOSAVE (local only — updates in-memory while typing)
// =====================

function autosave() {
    const note = getActiveNote();
    if (!note) return;
    ensureNote(note);
    note.note_title   = noteTitleInput.value;
    note.note_content = noteContentInput.value;
    renderNotes();
}

// =====================
// RENDER NOTES
// =====================

function renderNotes() {
    if (!notesList) return;

    notesList.innerHTML = "";

    if (!state.notes || state.notes.length === 0) {
        const empty = document.createElement("div");
        empty.className   = "notes-empty-list";
        empty.textContent = "Get started by creating a new note";
        notesList.appendChild(empty);
        return;
    }

    state.notes.forEach(note => {
        ensureNote(note);

        const div       = document.createElement("div");
        div.className   = "note-item";
        if (note.note_id === state.activeNoteId) div.classList.add("active");

        div.innerHTML = `
            <div class="note-title">${note.note_title || "Untitled"}</div>
            <div class="note-meta">🔗 ${note.linked_tasks.length}/${MAX_LINKED_TASKS} tasks linked</div>
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
        const opt       = document.createElement("option");
        opt.value       = task.task_id;
        opt.textContent = task.task_title;
        taskSelect.appendChild(opt);
    });
    taskSelect.value = "";
}

// =====================
// LINK TASK
// =====================

async function linkTask() {
    clearError();

    const note   = getActiveNote();
    const taskId = taskSelect.value;

    if (!note || !taskId) return;
    ensureNote(note);

    if (note.linked_tasks.includes(taskId)) {
        showError("Task already linked");
        return;
    }

    if (note.linked_tasks.length >= MAX_LINKED_TASKS) {
        showError("Max 4 tasks allowed");
        return;
    }

    note.linked_tasks.push(taskId);
    taskSelect.value = "";

    try {
        await apiLinkTask(note.note_id, taskId);
    } catch (err) {
        // Roll back optimistic update
        note.linked_tasks = note.linked_tasks.filter(id => id !== taskId);
        showError("Failed to link task");
        console.error(err);
    }

    renderLinked(note);
    renderNotes();
    updateLinkedCount(note);
}

// =====================
// UNLINK TASK
// =====================

async function unlinkTask(note, taskId) {
    note.linked_tasks = note.linked_tasks.filter(id => id !== taskId);

    try {
        await apiUnlinkTask(note.note_id, taskId);
    } catch (err) {
        console.error("Unlink task failed:", err);
    }

    renderLinked(note);
    renderNotes();
    updateLinkedCount(note);
}

// =====================
// RENDER LINKED TASKS
// =====================

function renderLinked(note) {
    linkedTaskContainer.innerHTML = "";

    note.linked_tasks.forEach(id => {
        const task = state.tasks.find(t => t.task_id === id);
        if (!task) return;

        const chip       = document.createElement("div");
        chip.className   = "linked-task-chip";
        chip.innerHTML   = `
            <span>${task.task_title}</span>
            <button class="unlink">✕</button>
        `;

        chip.querySelector(".unlink").addEventListener("click", e => {
            e.stopPropagation();
            unlinkTask(note, id);
        });

        linkedTaskContainer.appendChild(chip);
    });

    updateLinkedCount(note);
}

// =====================
// COUNTER
// =====================

function updateLinkedCount(note) {
    if (!linkedCountEl || !note) return;
    linkedCountEl.textContent = `🔗 ${note.linked_tasks.length}/${MAX_LINKED_TASKS} Tasks Linked`;
}

// =====================
// BOOT
// =====================

document.addEventListener("DOMContentLoaded", initNotes);