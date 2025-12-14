window.addEventListener("load", () => {
  if (sessionStorage.getItem("studentLoggedIn") !== "true") {
    window.location.href = "student-login.html";
  }
  
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData.id;
  
  const updateData = document.querySelector('.update-bio-data');
  const userProfile = document.querySelector('.users-profile');
  const updateProfile = document.querySelector('.updateprofile');
  const updatebtn = document.querySelector('.update');
  
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
  const profileName = document.querySelector('.name')
  const id = document.querySelector('.id')
  const profileContact = document.querySelector('.Phone');
  const profileImage = document.querySelector('.image');
  const imageInput = document.querySelector('#file');
  
  profileName.innerHTML = `${userData.firstName} ${userData.otherName} ${userData.lastName}`;
  id.innerHTML = userData.id;
  ID.value = userData.id;
  surName.value = userData.lastName;
  firstName.value = userData.firstName;
  otherName.value = userData.otherName;
  console.log(userData);
  
  const stored = localStorage.getItem(`bioData-${userId}`);
  if (stored) {
    const data = JSON.parse(stored);
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
    if (data.image) {
      profileImage.src = data.image;
    }
    updateProfileData(data);
  }
  
  updateData.addEventListener('click', () => {
    userProfile.classList.add('hide');
    updateProfile.style.display = 'block';
  });
  
  updatebtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    const reader = new FileReader();
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
      contact: contact.value,
    };
    
    if (file) {
      reader.onload = () => {
        savedData.image = reader.result;
        localStorage.setItem(`bioData-${userId}`, JSON.stringify(savedData));
        profileImage.src = savedData.image;
        updateProfileData(savedData);
      };
      reader.readAsDataURL(file);
    } else {
      const stored = localStorage.getItem(`bioData-${userId}`);
      if (stored) {
        const data = JSON.parse(stored);
        savedData.image = data.image;
      }
      localStorage.setItem(`bioData-${userId}`, JSON.stringify(savedData));
      updateProfileData(savedData);
    }
    
    userProfile.classList.remove('hide');
    updateProfile.style.display = 'none';
  });
  
  function updateProfileData(data) {
    profileContact.innerHTML = data.contact;
    document.querySelector('.bio-data-result').innerHTML = `
      <p>ID: <span class="in-id">${data.ID}</span></p>
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
    if (data.image) {
      profileImage.src = data.image;
    }
  }
});