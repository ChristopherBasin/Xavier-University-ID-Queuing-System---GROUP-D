async function addStudent() {
  const token = localStorage.getItem("token");

  const payload = {
    name: document.getElementById("name").value,
    studentId: document.getElementById("studentId").value,
    birthday: document.getElementById("birthday").value,
    address: document.getElementById("address").value,
    emergencyPerson: document.getElementById("emergencyPerson").value,
    emergencyPhone: document.getElementById("emergencyPhone").value,
    password: document.getElementById("password").value
  };

  const res = await fetch("http://localhost:3000/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Failed to create student");
    return;
  }

  alert("Student account created successfully!");
  clearForm();
}

function clearForm() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}

function goBack() {
  window.location.href = "adminDashboard.html";
}
