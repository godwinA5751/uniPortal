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
    messageDiv.style.display = 'flex';
    const loadingTime = 3000; // adjust this to match your loading phase duration
    
    const loadPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, loadingTime);
    });
    
    sessionStorage.setItem("studentLoggedIn", "true");
    sessionStorage.setItem("userData", JSON.stringify(user));
    
    loadPromise.then(() => {
      window.location.href = "dashboard.html";
    });
  } else {
    errorMsg.textContent = "Invalid username or password";
  }
});