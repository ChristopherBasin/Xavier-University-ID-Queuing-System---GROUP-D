async function loginAdmin() {
  const idNumber = document.getElementById("idNumber").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/auth/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idNumber, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "adminDashboard.html";
}
