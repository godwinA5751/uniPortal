function displayUserData() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    const nameElement = document.querySelector(".name");
    if (nameElement) {
      nameElement.innerHTML = `${userData.firstName}`;
    } else {
      // Handle the case where user data is not found
      window.location.href = "student-login.html";
    }
  } else {
    // Handle the case where user data is not found
    window.location.href = "student-login.html";
  }
}

displayUserData();