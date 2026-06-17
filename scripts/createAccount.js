const googleSignUpBtn = document.getElementById("google-signup-btn");
const githubSignUpBtn = document.getElementById("github-signup-btn");

const API_URL = "http://127.0.0.1:8000";

googleSignUpBtn.addEventListener("click",googleSignIn);
githubSignUpBtn.addEventListener("click",githubSignIn);

function googleSignIn() {
    window.location.href = `${API_URL}/auth/google/login`
}

function githubSignIn() {
    window.location.href = `${API_URL}/auth/github/login`
}