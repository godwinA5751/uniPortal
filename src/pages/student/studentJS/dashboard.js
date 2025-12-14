window.addEventListener("load", () => {
  if (sessionStorage.getItem("studentLoggedIn") !== "true") {
    window.location.href = "student-login.html";
  }
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    const welcomeMessage = document.querySelector('.name');
    welcomeMessage.innerHTML = `Welcome, ${userData.firstName}`;
  }
});