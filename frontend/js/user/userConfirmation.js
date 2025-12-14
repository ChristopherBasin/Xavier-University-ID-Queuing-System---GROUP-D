const student = JSON.parse(localStorage.getItem("loggedStudent"));

document.getElementById("confName").textContent = student.name;
document.getElementById("confId").textContent = student.studentId;
document.getElementById("confBday").textContent = student.birthday;
document.getElementById("confAddress").textContent = student.address;
document.getElementById("confEmergency").textContent = student.emergencyPerson;
document.getElementById("confPhone").textContent = student.emergencyPhone;

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "userLogin.html";
    return;
  }

  // show student info (from login payload)
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("studentInfo").innerHTML = `
    <p><b>Student Name:</b> ${user.name}</p>
    <p><b>Student ID:</b> ${user.idNumber}</p>
    <p><b>Birthday:</b> ${user.birthdate}</p>
    <p><b>Address:</b> ${user.address}</p>
    <p><b>Emergency Contact:</b> ${user.emergencyContact}</p>
    <p><b>Contact Number:</b> ${user.mobileNumber}</p>
  `;
});

document.getElementById("confirmBtn").addEventListener("click", async () => {
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value;
  const token = localStorage.getItem("token");

  if (!date || !hour) {
    alert("Please select date and time");
    return;
  }

  const res = await fetch("http://localhost:3000/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ date, hour })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  window.location.href = "userDashboard.html";
});
