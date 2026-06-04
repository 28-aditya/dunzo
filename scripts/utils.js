// =========================
// HELPER FUNCTIONS
// =========================

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

function stepNumber(inputId, delta, min, max) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const current = Number(input.value) || 0;
    const next    = Math.min(max, Math.max(min, current + delta));
    input.value   = next;
    // fire change event so settings.js picks it up
    input.dispatchEvent(new Event("change"));
}
 