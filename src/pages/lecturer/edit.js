

const editCourseSelect = document.getElementById("edit-course");
const editStudentsContainer = document.getElementById("edit-students-container");
const saveEditsBtn = document.getElementById("save-edits");

editCourseSelect.addEventListener("change", () => {
  const course = editCourseSelect.value;
  editStudentsContainer.innerHTML = "";
  if (!course) return;

  const saved = localStorage.getItem(`scores_${course}`);
  if (!saved) {
    editStudentsContainer.innerHTML = "<p>No scores available for this course.</p>";
    return;
  }

  const data = JSON.parse(saved);
  data.forEach((student, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${student.name} (${student.id})</span>
      <input type="number" min="0" max="100" value="${student.score}" data-index="${index}" class="edit-score">
    `;
    editStudentsContainer.appendChild(div);
  });
});

saveEditsBtn.addEventListener("click", () => {
  const course = editCourseSelect.value;
  if (!course) return alert("Select a course");

  const saved = localStorage.getItem(`scores_${course}`);
  if (!saved) return alert("No scores to edit");

  const data = JSON.parse(saved);
  const editedInputs = document.querySelectorAll(".edit-score");

  editedInputs.forEach(input => {
    const idx = input.dataset.index;
    data[idx].score = input.value;
  });

  localStorage.setItem(`scores_${course}`, JSON.stringify(data));
  alert("Scores updated successfully!");
});
