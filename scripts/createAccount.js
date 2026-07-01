// scripts/createAccount.js

const API_URL = "http://localhost:8000";

// ── Google OAuth ──────────────────────────────────────────
document.getElementById("google-signup-btn")
    ?.addEventListener("click", () => {
        window.location.href = `${API_URL}/auth/google/login`;
    });

// ── Password strength ─────────────────────────────────────
const passwordInput   = document.getElementById("password-input");
const strengthWrap    = document.getElementById("password-strength-wrap");
const strengthLabel   = document.getElementById("strength-label");
const togglePwBtn     = document.getElementById("toggle-password-btn");
const togglePwIcon    = document.getElementById("toggle-password-icon");

function getStrength(pw) {
    if (pw.length < 6)  return { level: "weak",   label: "Too short" };
    if (pw.length < 8)  return { level: "weak",   label: "Weak" };
    const has = {
        upper: /[A-Z]/.test(pw),
        lower: /[a-z]/.test(pw),
        digit: /\d/.test(pw),
        special: /[^A-Za-z0-9]/.test(pw),
    };
    const score = Object.values(has).filter(Boolean).length;
    if (score <= 2) return { level: "weak",   label: "Weak" };
    if (score === 3) return { level: "medium", label: "Medium" };
    return            { level: "strong",  label: "Strong" };
}

passwordInput?.addEventListener("input", () => {
    const pw = passwordInput.value;
    if (!pw) { strengthWrap?.classList.remove("visible"); return; }
    strengthWrap?.classList.add("visible");
    const { level, label } = getStrength(pw);
    strengthWrap.className = `strength-wrap visible ${level}`;
    if (strengthLabel) strengthLabel.textContent = label;
});

togglePwBtn?.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    if (togglePwIcon) {
        togglePwIcon.className = isHidden ? "ti ti-eye-off" : "ti ti-eye";
    }
});

// ── Form submission ───────────────────────────────────────
document.getElementById("create-account-form")
    ?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name     = document.getElementById("fullname-input").value.trim();
        const email    = document.getElementById("email-input").value.trim();
        const password = document.getElementById("password-input").value;
        const terms    = document.getElementById("terms-checkbox").checked;

        // Clear previous errors
        ["fullname-error", "email-error", "password-error"].forEach(id => {
            document.getElementById(id)?.classList.remove("visible");
        });

        let valid = true;

        if (!name) {
            document.getElementById("fullname-error").classList.add("visible");
            valid = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById("email-error").classList.add("visible");
            valid = false;
        }
        if (!password || password.length < 8) {
            document.getElementById("password-error").textContent = "Password must be at least 8 characters";
            document.getElementById("password-error").classList.add("visible");
            valid = false;
        }
        if (!terms) {
            alert("Please accept the Terms of Service to continue.");
            valid = false;
        }
        if (!valid) return;

        const submitBtn = document.getElementById("create-account-submit-btn");
        submitBtn.textContent = "Creating account...";
        submitBtn.disabled    = true;

        try {
            const res = await fetch(`${API_URL}/auth/email/register`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Show server error under the right field
                if (data.detail?.toLowerCase().includes("email")) {
                    const el = document.getElementById("email-error");
                    el.textContent = data.detail;
                    el.classList.add("visible");
                } else {
                    alert(data.detail || "Registration failed");
                }
                return;
            }

            // Success — redirect to sign in
            window.location.href = "dashboard.html";

        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            submitBtn.textContent = "Create account";
            submitBtn.disabled    = false;
        }
    });