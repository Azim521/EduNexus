const API = "https://edunexus-e0p8.onrender.com";

// ================= UI TOGGLE =================
function showLogin() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
}

function showRegister() {
    document.getElementById("registerBox").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
}

// ================= LOGIN =================
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Enter email and password");
        return;
    }

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Login successful");

        if (data.role === "admin") {
            window.location.href = "admin.html";
        } else if (data.role === "tutor") {
            window.location.href = "tutor.html";
        } else {
            window.location.href = "student.html";
        }
    } else {
        alert(data.message);
    }
}

// ================= REGISTER =================
async function register() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("role").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    alert(data.message);

    showLogin();
}
