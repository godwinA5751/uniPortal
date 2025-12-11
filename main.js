


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
function setupMobileMenu() {
  if (!mobileMenuBtn || !mainNav) return;

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const opened = mainNav.classList.toggle('show');
  mobileMenuBtn.textContent = opened ? '×' : '☰';
  mobileMenuBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
};

function closeMobileMenu() {
  mainNav.classList.remove('show');
  mobileMenuBtn.textContent = '☰';
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
};

setupMobileMenu();

