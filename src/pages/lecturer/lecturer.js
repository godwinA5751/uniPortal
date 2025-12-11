const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // For demo, use hardcoded lecturer credentials
  const lecturer = {
    username: "lecturer1",
    password: "12345"
  };

  if (username === lecturer.username && password === lecturer.password) {
    // Save login state
    localStorage.setItem("lecturerLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    loginError.textContent = "Invalid username or password";
  }
});



