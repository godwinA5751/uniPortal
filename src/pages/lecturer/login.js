const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const password = document.getElementById('password')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const passwordValue = document.getElementById("password").value.trim();
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find((u) => u.userName === username && u.passwordField === passwordValue);

  if (user) {
    const loadingTime = 3000; 
    const loadPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, loadingTime);
    });
    sessionStorage.setItem("lecturerLoggedIn", "true"); // changed to lecturerLoggedIn
    sessionStorage.setItem("userData", JSON.stringify(user));
    loadPromise.then(() => {
      window.location.href = "dashboard.html";
    });
  } else {
    loginError.textContent = "Invalid username or password";
  }
});

const togglePasswordIcon = document.getElementById('toggle-password');
togglePasswordIcon.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
    togglePasswordIcon.className = 'fa-solid fa-eye-slash toggle-password';
  } else {
    password.type = 'password';
    togglePasswordIcon.className = 'fa-solid fa-eye toggle-password';
  }
});