
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

const textElement = document.getElementById('text');
const texts = [
  'Welcome to UniPortal!',
  'Where knowledge meets innovation.',
  'Empowering minds, shaping futures.',
  'Learn, grow, and succeed with us.'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 70;
const deletingSpeed = 50;

function typeText() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    textElement.innerText = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(typeText, deletingSpeed);
  } else {
    textElement.innerText = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeText, 1000); // wait for 1 second before deleting
      return;
    }
    setTimeout(typeText, typingSpeed);
  }
}
typeText();