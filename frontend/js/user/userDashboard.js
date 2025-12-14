document.getElementById("loginBtn").addEventListener("click", loginUser);

async function loginUser() {
  const idNumber = document.getElementById("idNumber").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!idNumber || !password) {
    alert("Fill in all fields");
    return;
  }

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idNumber, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "userDashboard.html";
}
