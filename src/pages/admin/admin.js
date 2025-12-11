// ===== Helper Functions =====
function getData(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ------------------------
// CONFIG: Update login keys
// ------------------------

 const adminKey = "adminLoggedIn"

// ------------------------
// CHECK LOGIN FUNCTION
// ------------------------
function checkLoginStatus() {
  if (!adminKey) {
    console.error("Invalid role provided for checkLogin.");
    return;
  }

  if (sessionStorage.getItem(studentKey) !== "true") {
    // Redirect to the respective login page
    window.location.href = "admin-login.html";
  }
}

// ===== Render Table =====
function renderTable(key, tableId, fields) {
  const tableBody = document.getElementById(tableId);
  const data = getData(key);
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const tr = document.createElement("tr");

    fields.forEach(field => {
      const td = document.createElement("td");
      td.textContent = item[field];
      tr.appendChild(td);
    });

    // Actions
    const actionTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editItem(key, index, fields, tableId);
    actionTd.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteItem(key, index, tableId, fields);
    actionTd.appendChild(deleteBtn);

    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  });
}

// ===== Handle Form Submission =====
function handleFormSubmit(formId, key, inputIds, tableId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getData(key);

    const newItem = {};
    inputIds.forEach(id => {
      newItem[id] = document.getElementById(id).value;
      document.getElementById(id).value = "";
    });

    data.push(newItem);
    setData(key, data);
    renderTable(key, tableId, inputIds);
  });
}

// ===== Edit Item =====
function editItem(key, index, fields, tableId) {
  const data = getData(key);
  const item = data[index];

  fields.forEach(field => {
    const input = document.getElementById(field);
    if (input) input.value = item[field];
  });

  // Remove from array to update
  data.splice(index, 1);
  setData(key, data);
  renderTable(key, tableId, fields);
}

// ===== Delete Item =====
function deleteItem(key, index, tableId, fields) {
  const data = getData(key);
  data.splice(index, 1);
  setData(key, data);
  renderTable(key, tableId, fields);
}
