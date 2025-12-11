// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

const loginForm = document.getElementById("admin-login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Save login status to sessionStorage
    sessionStorage.setItem("adminLoggedIn", "true");

    // Redirect to admin dashboard
    window.location.href = "admin-dashboard.html"; // change to your unified admin dashboard HTML
  } else {
    errorMsg.textContent = "Invalid username or password";
  }
});

// Optional: Check if already logged in
window.addEventListener("load", () => {
  if (sessionStorage.getItem("adminLoggedIn") === "true") {
    window.location.href = "admin.html";
  }
});
