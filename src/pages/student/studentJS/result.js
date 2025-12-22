import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function displayUserData() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
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

document.getElementById('printButton').addEventListener('click', () => {
  const doc = new jsPDF();
  const printableDiv = document.getElementById('printableDiv');
  html2canvas(printableDiv)
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('table.pdf');
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
    });
});


const results = [
  {
    semester: 'First Semester',
    courses: [
      { code: 'GST 111', test: 19, exam: 47, unit: 2 },
      { code: 'CSC 101', test: 20, exam: 53, unit: 2 },
      { code: 'MTH 101', test: 14, exam: 34, unit: 3 },
      { code: 'CHM 101', test: 10, exam: 32, unit: 3 },
      { code: 'PHY 101', test: 16, exam: 42, unit: 3 },
      { code: 'PHY 161', test: 32, exam: 52, unit: 1 },
      { code: 'CSC 103', test: 26, exam: 57, unit: 3 },
    ],
  },
  {
    semester: 'Second Semester',
    courses: [
      { code: 'GST 113', test: 16, exam: 38, unit: 2 },
      { code: 'CSC 102', test: 24, exam: 59, unit: 3 },
      { code: 'MTH 102', test: 18, exam: 44, unit: 3 },
      { code: 'PHY 102', test: 14, exam: 40, unit: 3 },
      { code: 'PHY 162', test: 36, exam: 36, unit: 1 },
      { code: 'CSC 104', test: 22, exam: 50, unit: 3 },
    ],
  },
];

results.forEach((semester) => {
  semester.courses.forEach((course) => {
    course.total = course.test + course.exam;
    if (course.total >= 70) {
      course.grade = 'A';
      course.gradeInt = 5;
    } else if (course.total >= 60) {
      course.grade = 'B';
      course.gradeInt = 4;
    } else if (course.total >= 50) {
      course.grade = 'C';
      course.gradeInt = 3;
    } else if (course.total >= 45) {
      course.grade = 'D';
      course.gradeInt = 2;
    } else if (course.total >= 40) {
      course.grade = 'E';
      course.gradeInt = 1;
    } else {
      course.grade = 'F';
      course.gradeInt = 0;
    }
    course.gradeUnit = course.unit * course.gradeInt;
  });

  semester.totalUnit = semester.courses.reduce((acc, course) => acc + course.unit, 0);
  semester.totalGrade = semester.courses.reduce((acc, course) => acc + course.gradeUnit, 0);
  semester.gpa = semester.totalGrade / semester.totalUnit;
});

const tables = results.map((semester) => {
  const rows = semester.courses.map((course) => `
    <tr>
      <td>${course.code}</td>
      <td>${course.test}</td>
      <td>${course.exam}</td>
      <td>${course.total}</td>
      <td>${course.unit}</td>
      <td>${course.grade}</td>
    </tr>
  `).join('');

  return `
    <h3>${semester.semester}</h3>
    <table>
      <thead>
        <tr>
          <th>Course Code</th>
          <th>CA (40)</th>
          <th>Exam (60)</th>
          <th>Total (100)</th>
          <th>Unit</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">GPA</td>
          <td colspan="2">${semester.gpa.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  `;
}).join('');

const cgpa = results.reduce((acc, semester) => acc + semester.totalGrade, 0) / results.reduce((acc, semester) => acc + semester.totalUnit, 0);

document.querySelector('.cgpa').innerHTML = cgpa.toFixed(2)

document.querySelector('#printableDiv').innerHTML = tables;