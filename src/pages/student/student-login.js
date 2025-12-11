// Hardcoded student credentials for demo
const STUDENT_CREDENTIALS = {
  username: "student",
  password: "student123",
  dashboard: "dashboard.html" // Link to your student dashboard
};

const loginForm = document.getElementById("student-login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === STUDENT_CREDENTIALS.username && password === STUDENT_CREDENTIALS.password) {
    // Save login session
    sessionStorage.setItem("studentLoggedIn", "true");

    // Redirect to student dashboard
    window.location.href = STUDENT_CREDENTIALS.dashboard;
  } else {
    errorMsg.textContent = "Invalid username or password";
  }
});

// Optional: redirect already logged-in student
window.addEventListener("load", () => {
  if (sessionStorage.getItem("studentLoggedIn") === "true") {
    window.location.href = STUDENT_CREDENTIALS.dashboard;
  }
});
