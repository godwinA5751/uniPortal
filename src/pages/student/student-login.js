const loginForm = document.getElementById("student-login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const messageDiv = document.querySelector('.message-container');

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = storedUsers.find((u) => u.id.toString() === username && u.password === password);

  if (user) {
    // Save login session
    sessionStorage.setItem("studentLoggedIn", "true");
    sessionStorage.setItem("userData", JSON.stringify(user));
    messageDiv.style.display = 'flex';
    setTimeout(() => {
      // Redirect to student dashboard
      window.location.href = "dashboard.html";
      messageDiv.style.display = 'none';
    }, 3000)
  } else {
    errorMsg.textContent = "Invalid username or password";
  }
});

// Optional: redirect already logged-in student
window.addEventListener("load", () => {
  if (sessionStorage.getItem("studentLoggedIn") === "true") {
    window.location.href = "dashboard.html";
  }
});
