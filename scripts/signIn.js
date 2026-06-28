// scripts/signIn.js

const API_URL = "http://localhost:8000";

// ── Google OAuth ──────────────────────────────────────────
document.getElementById("google-signin-btn")
    ?.addEventListener("click", () => {
        window.location.href = `${API_URL}/auth/google/login`;
    });

// ── Password toggle ───────────────────────────────────────
document.getElementById("toggle-password-btn")
    ?.addEventListener("click", () => {
        const input = document.getElementById("password-input");
        const icon  = document.querySelector("#toggle-password-btn i");
        const isHidden = input.type === "password";
        input.type     = isHidden ? "text" : "password";
        if (icon) icon.className = isHidden ? "ti ti-eye-off" : "ti ti-eye";
    });

// ── Forgot password ───────────────────────────────────────
document.getElementById("forgot-password-link")
    ?.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-input").value.trim();
        if (!email) {
            alert("Enter your email address first, then click Forgot password.");
            return;
        }

        try {
            await fetch(`${API_URL}/auth/email/forgot-password`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email }),
            });
            // Always show the same message to avoid email enumeration
            alert("If that email is registered, a reset link has been sent.");
        } catch {
            alert("Something went wrong. Please try again.");
        }
    });

// ── Email sign-in form ────────────────────────────────────
document.getElementById("signin-form")
    ?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email    = document.getElementById("email-input").value.trim();
        const password = document.getElementById("password-input").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        const submitBtn = document.getElementById("signin-submit-btn");
        submitBtn.textContent = "Signing in...";
        submitBtn.disabled    = true;

        try {
            const res = await fetch(`${API_URL}/auth/email/login`, {
                method:      "POST",
                credentials: "include",       // receive the httpOnly cookie
                headers:     { "Content-Type": "application/json" },
                body:        JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 403) {
                    alert("Please verify your email before signing in. Check your inbox.");
                } else {
                    alert(data.detail || "Invalid email or password.");
                }
                return;
            }

            window.location.href = "/pages/dashboard.html";

        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            submitBtn.textContent = "Sign in";
            submitBtn.disabled    = false;
        }
    });