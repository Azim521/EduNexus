const API = "https://edunexus-e0p8.onrender.com";

let role = "student";

function switchTab(type) {
  role = type;

  document.getElementById("studentTab").classList.remove("active");
  document.getElementById("tutorTab").classList.remove("active");

  document.getElementById(type + "Tab").classList.add("active");

  if (type === "tutor") {
    document.getElementById("tutorFields").style.display = "block";
  } else {
    document.getElementById("tutorFields").style.display = "none";
  }
}

async function submitForm() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email,
      password: "default123",
      role: role
    })
  });

  const data = await res.json();
  alert(data.message);
}

function scrollToForm() {
  document.querySelector(".form-card").scrollIntoView({ behavior: "smooth" });
}
