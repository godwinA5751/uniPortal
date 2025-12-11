if (localStorage.getItem("lecturerLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const courseSelect = document.getElementById("course");
const studentsContainer = document.getElementById("students-container");
const uploadForm = document.getElementById("upload-form");

// Example students
const students = [
  {id: "S001", name: "Alice"},
  {id: "S002", name: "Bob"},
  {id: "S003", name: "Charlie"}
];

courseSelect.addEventListener("change", () => {
  studentsContainer.innerHTML = "";
  const selected = courseSelect.value;
  if (!selected) return;

  students.forEach((s, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${s.name} (${s.id})</span>
      <input type="number" min="0" max="100" placeholder="Score" data-index="${i}" class="score-input">
    `;
    studentsContainer.appendChild(div);
  });
});

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = courseSelect.value;
  if (!selected) return alert("Select a course");

  const scoreInputs = document.querySelectorAll(".score-input");
  const data = students.map((s, i) => ({...s, score: scoreInputs[i].value}));
  localStorage.setItem(`scores_${selected}`, JSON.stringify(data));
  alert("Scores uploaded successfully!");
});
