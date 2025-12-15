
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

function animateCount(elements, targets, increments) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      elements.forEach((element, index) => {
        let count = 0;
        const target = targets[index];
        const increment = increments[index];
        const interval = setInterval(() => {
          if (count >= target) {
            clearInterval(interval);
            count = target;
          }
          element.innerText = count.toLocaleString(); // Format number with commas
          count += increment;
        }, 1); // Adjust the speed of the count here
      });
      observer.unobserve(entries[0].target); // Stop observing after animation starts
    }
  }, {
    threshold: 0.5, // Trigger when 50% of the element is visible
  });
  
  elements.forEach((element) => {
    observer.observe(element);
  });
}

const element1 = document.getElementById('count1');
const element2 = document.getElementById('count2');
const element3 = document.getElementById('count3');
const element4 = document.getElementById('count4');

animateCount([element1, element2, element3, element4], [5, 25, 15000, 1000], [1, 1, 50, 5]);