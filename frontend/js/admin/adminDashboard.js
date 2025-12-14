const API = "http://localhost:3000/api/admin";

document.addEventListener("DOMContentLoaded", loadReservations);

async function loadReservations() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/reservations`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  renderTable(data.reservations);
}

function renderTable(reservations) {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  reservations.forEach(r => {
    body.innerHTML += `
      <tr>
        <td>${r.studentId}</td>
        <td>${r.date}</td>
        <td>${r.hour}</td>
        <td>
          <select onchange="updateStatus('${r._id}', this.value)">
            <option ${r.status==="pending"?"selected":""}>pending</option>
            <option ${r.status==="processing"?"selected":""}>processing</option>
            <option ${r.status==="ready"?"selected":""}>ready</option>
            <option ${r.status==="done"?"selected":""}>done</option>
            <option ${r.status==="cancelled"?"selected":""}>cancelled</option>
          </select>
        </td>
        <td></td>
      </tr>
    `;
  });
}

async function updateStatus(id, status) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/reservations/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ status })
  });
}

function openAddAccount() {
  window.location.href = "adminAddAccount.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "adminLogin.html";
}
