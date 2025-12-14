const togglePasswordIcon = document.getElementById('toggle-password');
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')
const toggleConfirmPasswordIcon = document.getElementById('toggle-confirm-password');
const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const passwordField = password.value;
  const confirmPasswordField = confirmPassword.value;
  const errorMsg = document.querySelector('#error-msg');
  
  if (passwordField !== confirmPasswordField) {
    errorMsg.innerHTML = 'passwords do not match'
    setTimeout(() => {
      errorMsg.innerHTML = ''
    }, 2000);
    return;
  }
  
  const userName = generateUserName();
  const user = { userName, firstName, lastName, passwordField };
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  storedUsers.push(user);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  const redirectTime = 3000; // adjust this to match your desired redirect time
  const redirectPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, redirectTime);
  });
  
  redirectPromise.then(() => {
    window.location.href = 'dashboard.html';
  });
  
  form.reset();
})

function generateUserName(){
  let randomNumber = Math.floor(Math.random() * 90) + 10;
  const username = firstNameInput.value.toLowerCase() + randomNumber;
  return username;
} 

togglePasswordIcon.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
    togglePasswordIcon.className = 'fa-solid fa-eye-slash toggle-password';
  } else {
    password.type = 'password';
    togglePasswordIcon.className = 'fa-solid fa-eye toggle-password';
  }
});


toggleConfirmPasswordIcon.addEventListener('click', () => {
  if (confirmPassword.type === 'password') {
    confirmPassword.type = 'text';
    toggleConfirmPasswordIcon.className = 'fa-solid fa-eye-slash toggle-password';
  } else {
    confirmPassword.type = 'password';
    toggleConfirmPasswordIcon.className = 'fa-solid fa-eye toggle-password';
  }
});
