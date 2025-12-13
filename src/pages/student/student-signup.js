const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name')
const otherNameInput = document.querySelector('#other-name')
const lastNameInput = document.querySelector('#last-name')
const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirm-password')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = firstNameInput.value;
  const otherName = otherNameInput.value;
  const lastName = lastNameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const messageDiv = document.querySelector('.message-container');
  const messageEl = document.querySelector('.message');
  const idEl = document.querySelector('.id');
  const errorMsg = document.querySelector('#error-msg');
  
  if (password !== confirmPassword) {
    errorMsg.innerHTML = 'passwords do not match'
    setTimeout(() => {
      errorMsg.innerHTML = ''
    }, 3000);
    return;
  }
  
  const id = generateUUID();
  const user = { id, firstName, otherName, lastName, password };
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  storedUsers.push(user);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  
  messageDiv.style.display = 'block';
  messageEl.innerHTML = 'Signup successful!';
  idEl.innerHTML = `Your Student ID is: <strong>${id}</strong>`;
  
  const redirectTime = 5000; // adjust this to match your desired redirect time
  const redirectPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, redirectTime);
  });
  
  redirectPromise.then(() => {
    messageDiv.style.display = 'none';
    window.location.href = 'student-login.html';
  });
  
  form.reset();
})

function generateUUID() {
  return Math.floor(10000 + Math.random() * 90000)
}