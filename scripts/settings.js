// =========================
// SETTINGS MODULE — dunzo
// =========================

// ---- DOM refs ----
let settingsUsername;
let settingsEmail;
let dailyGoalInput;
let saveChangesRow;
let saveChangesBtn;
let autoArchiveToggle;
let exportBtn;
let clearBtn;
let resetPwdBtn;

// focus refs
let focusDurationInput;
let focusBreakInput;

// notification refs
let notifyOverdueToggle;

// display refs
let defaultViewSelect;

// =========================
// INIT
// =========================

function initSettings() {
    settingsUsername   = document.getElementById("settings-username");
    settingsEmail      = document.getElementById("settings-email");
    dailyGoalInput     = document.getElementById("daily-goal");
    saveChangesRow     = document.getElementById("save-changes-row");
    saveChangesBtn     = document.getElementById("save-changes-btn");
    autoArchiveToggle  = document.getElementById("auto-archive");
    exportBtn          = document.getElementById("export-data");
    clearBtn           = document.getElementById("clear-data");
    resetPwdBtn        = document.getElementById("reset-pwd-btn");
    focusDurationInput = document.getElementById("focus-duration");
    focusBreakInput    = document.getElementById("focus-break");
    notifyOverdueToggle = document.getElementById("notify-overdue");
    defaultViewSelect  = document.getElementById("default-view");

    renderSettings();
    attachSettingsEvents();
}

// =========================
// RENDER
// =========================

function renderSettings() {
    settingsUsername.value      = state.user.username || "";
    settingsEmail.value         = state.user.email    || "";
    dailyGoalInput.value        = state.settings.dailyGoal   ?? 5;
    autoArchiveToggle.checked   = state.settings.autoArchive  ?? false;

    if (focusDurationInput)
        focusDurationInput.value = state.settings.focusDuration ?? 25;
    if (focusBreakInput)
        focusBreakInput.value    = state.settings.focusBreak    ?? 5;
    if (notifyOverdueToggle)
        notifyOverdueToggle.checked = state.settings.notifyOverdue ?? true;
    if (defaultViewSelect)
        defaultViewSelect.value  = state.settings.defaultView ?? "dashboard";

    refreshThemeChips();
    renderSettingsStats();
    saveChangesRow.classList.add("hidden");
}

// =========================
// STATS PANEL
// =========================

function renderSettingsStats() {
    const total = (state.tasks || []).length;
    const done  = (state.tasks || []).filter(t => t.task_status === "done").length; // fixed: was t.status
    const notes = (state.notes || []).length;
    const rate  = total > 0 ? Math.round((done / total) * 100) : 0;

    const elTotal = document.getElementById("stat-total-tasks");
    const elDone  = document.getElementById("stat-done-tasks");
    const elNotes = document.getElementById("stat-notes-count");
    const elRate  = document.getElementById("stat-completion-rate");

    if (elTotal) elTotal.textContent = total;
    if (elDone)  elDone.textContent  = done;
    if (elNotes) elNotes.textContent = notes;
    if (elRate)  elRate.textContent  = rate + "%";
}

// =========================
// EVENTS
// =========================

function attachSettingsEvents() {
    settingsUsername.addEventListener("input",  showSaveButton);
    settingsEmail.addEventListener("input",     showSaveButton);
    saveChangesBtn.addEventListener("click",    saveAccountChanges);
    resetPwdBtn.addEventListener("click",       handleResetPassword);

    dailyGoalInput.addEventListener("change",    updateDailyGoal);
    autoArchiveToggle.addEventListener("change", updateAutoArchive);

    if (notifyOverdueToggle)
        notifyOverdueToggle.addEventListener("change", updateNotifications);
    if (defaultViewSelect)
        defaultViewSelect.addEventListener("change", updateDisplaySettings);

    document.querySelectorAll(".theme-chip").forEach(chip => {
        chip.addEventListener("click", () => applyTheme(chip.dataset.theme));
    });

    exportBtn.addEventListener("click", exportData);
    clearBtn.addEventListener("click",  clearWorkspace);

    const importBtn  = document.getElementById("import-data");
    const importFile = document.getElementById("import-file-input");
    if (importBtn && importFile) {
        importBtn.addEventListener("click",   () => importFile.click());
        importFile.addEventListener("change", handleImport);
    }
}

// =========================
// ACCOUNT
// =========================

function showSaveButton() {
    saveChangesRow.classList.remove("hidden");
    saveChangesBtn.classList.remove("btn-saved");
    saveChangesBtn.textContent = "Save Changes";
}

function saveAccountChanges() {
    const newUsername = settingsUsername.value.trim();
    const newEmail    = settingsEmail.value.trim();

    if (!newUsername || !newEmail) {
        flashError(saveChangesBtn, "Fill in all fields");
        return;
    }

    state.user.username = newUsername;
    state.user.email    = newEmail;

    saveChangesBtn.textContent = "✓ Saved";
    saveChangesBtn.classList.add("btn-saved");
    setTimeout(() => saveChangesRow.classList.add("hidden"), 1400);

    updateUserPanel();
    saveState();
}

function updateUserPanel() {
    const name   = document.getElementById("user-name");
    const email  = document.getElementById("user-email");
    const avatar = document.getElementById("user-avatar");

    if (name)   name.textContent   = state.user.username;
    if (email)  email.textContent  = state.user.email;
    if (avatar) avatar.textContent = state.user.username.charAt(0).toUpperCase();
}

function handleResetPassword() {
    resetPwdBtn.textContent   = "Email sent ✓";
    resetPwdBtn.disabled      = true;
    resetPwdBtn.style.opacity = "0.6";
    setTimeout(() => {
        resetPwdBtn.textContent   = "Reset";
        resetPwdBtn.disabled      = false;
        resetPwdBtn.style.opacity = "";
    }, 3000);
}

// =========================
// PRODUCTIVITY
// =========================

function updateDailyGoal() {
    state.settings.dailyGoal = Number(dailyGoalInput.value) || 1;
    saveState();
}

function updateAutoArchive() {
    state.settings.autoArchive = autoArchiveToggle.checked;
    saveState();
}

// =========================
// NOTIFICATIONS
// =========================

function updateNotifications() {
    state.settings.notifyOverdue = notifyOverdueToggle?.checked ?? true;
    saveState();
}

// =========================
// DISPLAY
// =========================

function updateDisplaySettings() {
    state.settings.defaultView = defaultViewSelect?.value ?? "dashboard";
    saveState();
}

// =========================
// THEME
// =========================

function applyTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-mode");
        state.settings.darkTheme = false;
    } else {
        document.body.classList.remove("light-mode");
        state.settings.darkTheme = true;
    }
    refreshThemeChips();
    saveState();
}

function refreshThemeChips() {
    const isDark = !document.body.classList.contains("light-mode");
    document.querySelectorAll(".theme-chip").forEach(chip => {
        const active = (chip.dataset.theme === "dark"  &&  isDark) ||
                       (chip.dataset.theme === "light" && !isDark);
        chip.classList.toggle("active", active);
    });
}

function toggleTheme() {
    const isDark = !document.body.classList.contains("light-mode");
    applyTheme(isDark ? "light" : "dark");
}

// =========================
// EXPORT
// =========================

function exportData() {
    try {
        const data = JSON.stringify(state, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = `dunzo-export-${formatExportDate()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Export failed: " + err.message);
    }
}

function formatExportDate() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

// =========================
// IMPORT
// =========================

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const imported = JSON.parse(evt.target.result);

            if (typeof imported !== "object" || imported === null)
                throw new Error("Invalid file format");

            if (imported.tasks)    state.tasks    = imported.tasks;
            if (imported.notes)    state.notes    = imported.notes;
            if (imported.settings) state.settings = { ...state.settings, ...imported.settings };
            if (imported.user)     state.user     = { ...state.user,     ...imported.user };

            saveState();
            renderSettings();
            renderTaskDropdown(); // refresh notes task dropdown after import

            ["renderDashboard","renderToday","renderUpcoming",
             "renderCompleted","renderOverdue","renderNotes","renderAnalytics"
            ].forEach(fn => { if (typeof window[fn] === "function") window[fn](); });

        } catch (err) {
            alert("Import failed: " + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = "";
}

// =========================
// CLEAR WORKSPACE
// =========================

function clearWorkspace() {
    const confirmed = confirm("Delete all tasks and notes? This cannot be undone.");
    if (!confirmed) return;

    state.tasks = [];
    state.notes = [];
    saveState();
    renderSettingsStats();

    ["renderDashboard","renderToday","renderUpcoming",
     "renderCompleted","renderOverdue","renderNotes","renderAnalytics"
    ].forEach(fn => { if (typeof window[fn] === "function") window[fn](); });
}

// =========================
// SAVE STATE
// =========================

function saveState() {
    try {
        localStorage.setItem("dunzo-state", JSON.stringify(state));
    } catch {
        // storage unavailable
    }
}

// =========================
// UTIL
// =========================

function flashError(el, msg) {
    const orig = el.textContent;
    el.textContent      = msg;
    el.style.background = "var(--danger)";
    el.style.color      = "#fff";
    setTimeout(() => {
        el.textContent      = orig;
        el.style.background = "";
        el.style.color      = "";
    }, 2000);
}