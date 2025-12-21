function displayUserData() {
  //const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    const nameElement = document.querySelector(".name");
    const idElement = document.querySelector(".id");
    if (nameElement && idElement) {
      nameElement.innerHTML = `${userData.firstName} ${userData.otherName} ${userData.lastName}`;
      idElement.innerHTML = userData.id;
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

function printDiv(divId) {
  const divToPrint = document.getElementById(divId);
  divToPrint.classList.add('print-only');
  
  window.onafterprint = function() {
    divToPrint.classList.remove('print-only');
  };
  
  window.print();
}