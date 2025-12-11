const updateData = document.querySelector('.update-bio-data');
const userProfile = document.querySelector('.users-profile');
const updateProfile = document.querySelector('.updateprofile');
const updatebtn = document.querySelector('.update');

updateData.addEventListener('click', () => {
  userProfile.classList.add('hide');
  updateProfile.style.display = 'block';
});

// Form inputs
const updateedBioData = document.querySelector('.bio-data-result');
const ID = document.querySelector('#ID');
const surName = document.querySelector('#surname');
const firstName = document.querySelector('#firstname');
const otherName = document.querySelector('#othername');
const gender = document.querySelector('#gender');
const DOB = document.querySelector('#dob');
const country = document.querySelector('#country');
const origin = document.querySelector('#origin');
const lGa = document.querySelector('#lga');
const martStatus = document.querySelector('#martStatus');
const religion = document.querySelector('#religion');
const blood = document.querySelector('#blood');
const genotype = document.querySelector('#genotype');
const home = document.querySelector('#home');
const contact = document.querySelector('#contact');

// Profile display elements
const profileContact = document.querySelector('.Phone');
const profileImage = document.querySelector('.image'); // <-- IMPORTANT
const imageInput = document.querySelector('#file');

// ------------------------------
// SAVE EVERYTHING ON UPDATE
// ------------------------------
updatebtn.addEventListener('click', () => {
  userProfile.classList.remove('hide');
  updateProfile.style.display = 'none';

  // Save biodata as an object
  const savedData = {
    ID: ID.value,
    surname: surName.value,
    firstname: firstName.value,
    othername: otherName.value,
    gender: gender.value,
    dob: DOB.value,
    country: country.value,
    origin: origin.value,
    lga: lGa.value,
    martStatus: martStatus.value,
    religion: religion.value,
    blood: blood.value,
    genotype: genotype.value,
    home: home.value,
    contact: contact.value
  };

  localStorage.setItem('bioData', JSON.stringify(savedData));

  profileContact.innerHTML = contact.value;

  // Handle image saving
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.src = reader.result;

      // Save image to localStorage
      localStorage.setItem("savedImage", reader.result);
    };
    reader.readAsDataURL(file);
  }

  // BUILD DISPLAYED BIODATA
  updateedBioData.innerHTML = `
    <p>ID: <span>${savedData.ID}</span></p>
    <p>Surname: <span>${savedData.surname}</span></p>
    <p>First Name: <span>${savedData.firstname}</span></p>
    <p>Other Name: <span>${savedData.othername}</span></p>
    <p>Gender: <span>${savedData.gender}</span></p>
    <p>Date of Birth: <span>${savedData.dob}</span></p>
    <p>Country: <span>${savedData.country}</span></p>
    <p>State of Origin: <span>${savedData.origin}</span></p>
    <p>LGA of Origin: <span>${savedData.lga}</span></p>
    <p>Marital Status: <span>${savedData.martStatus}</span></p>
    <p>Religion: <span>${savedData.religion}</span></p>
    <p>Blood Group: <span>${savedData.blood}</span></p>
    <p>Genotype: <span>${savedData.genotype}</span></p>
    <p>Home Address: <span>${savedData.home}</span></p>
    <p>Contact Address: <span>${savedData.contact}</span></p>
  `;
});

// ------------------------------
// LOAD EVERYTHING ON PAGE LOAD
// ------------------------------
window.addEventListener('load', () => {
  const stored = localStorage.getItem('bioData');

  if (stored) {
    const data = JSON.parse(stored);

    ID.value = data.ID;
    surName.value = data.surname;
    firstName.value = data.firstname;
    otherName.value = data.othername;
    gender.value = data.gender;
    DOB.value = data.dob;
    country.value = data.country;
    origin.value = data.origin;
    lGa.value = data.lga;
    martStatus.value = data.martStatus;
    religion.value = data.religion;
    blood.value = data.blood;
    genotype.value = data.genotype;
    home.value = data.home;
    contact.value = data.contact;

    profileContact.innerHTML = data.contact;

    updateedBioData.innerHTML = `
      <p>ID: <span>${data.ID}</span></p>
      <p>Surname: <span>${data.surname}</span></p>
      <p>First Name: <span>${data.firstname}</span></p>
      <p>Other Name: <span>${data.othername}</span></p>
      <p>Gender: <span>${data.gender}</span></p>
      <p>Date of Birth: <span>${data.dob}</span></p>
      <p>Country: <span>${data.country}</span></p>
      <p>State of Origin: <span>${data.origin}</span></p>
      <p>LGA of Origin: <span>${data.lga}</span></p>
      <p>Marital Status: <span>${data.martStatus}</span></p>
      <p>Religion: <span>${data.religion}</span></p>
      <p>Blood Group: <span>${data.blood}</span></p>
      <p>Genotype: <span>${data.genotype}</span></p>
      <p>Home Address: <span>${data.home}</span></p>
      <p>Contact Address: <span>${data.contact}</span></p>
    `;
  }

  // ------------------------------------
  // SAFE DEFAULT + LOAD SAVED IMAGE
  // ------------------------------------
  const savedImage = localStorage.getItem("savedImage");

  if (savedImage) {
    profileImage.src = savedImage;
  } else {
    // Set your fallback image here
    profileImage.src = "/src/images/default-profile.png";
  }
});
