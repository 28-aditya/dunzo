// scripts/signIn.js

const API_URL = "http://127.0.0.1:8000";

document.getElementById("google-signin-btn").addEventListener("click", () => {
    window.location.href = `${API_URL}/auth/google/login`;
});