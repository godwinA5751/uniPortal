const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav__menu');

// ------------------------
// CONFIG: Update login keys
// ------------------------

 const studentKey = "studentLoggedIn"

// ------------------------
// CHECK LOGIN FUNCTION
// ------------------------
function checkLoginStatus() {
  if (!studentKey) {
    console.error("Invalid role provided for checkLogin.");
    return;
  }

  if (sessionStorage.getItem(studentKey) !== "true") {
    // Redirect to the respective login page
    window.location.href = "student-login.html";
  }
}

// ------------------------
// LOGOUT FUNCTION
// ------------------------
function logoutHandler() {
  // Clear all session storage keys
  sessionStorage.removeItem("studentLoggedIn");

  // Redirect to a default login page
  window.location.href = "student-login.html"; // or your generic login page
}

// ------------------------
// OPTIONAL: Attach logout to any button
// ------------------------
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutHandler);
}


function setupMobileMenu() {
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const opened = navMenu.classList.toggle('show');
  hamburger.textContent = opened ? '×' : '☰';
  hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
};

function closeMobileMenu() {
  navMenu.classList.remove('show');
  hamburger.textContent = '☰';
  hamburger.setAttribute('aria-expanded', 'false');
};

setupMobileMenu();

