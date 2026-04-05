// ================= CONFIG =================
const API = "https://your-render-url.onrender.com"; // change after deploy

// ================= NAVIGATION (safe basic) =================
function navigate(page) {
    window.location.href = page;
}

// ================= LOGIN =================
async function login() {
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful");

            // Redirect based on role
            if (data.role === "admin") {
                window.location.href = "admin.html";
            } else if (data.role === "tutor") {
                window.location.href = "tutor.html";
            } else {
                window.location.href = "student.html";
            }
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        alert("Server error. Try again later.");
    }
}

// ================= REGISTER =================
async function register() {
    const email = document.getElementById("reg-email")?.value;
    const password = document.getElementById("reg-password")?.value;
    const role = document.getElementById("role")?.value;

    if (!email || !password || !role) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role })
        });

        const data = await res.json();
        alert(data.message);
    } catch (err) {
        alert("Server error");
    }
}

// ================= SIMPLE UI EFFECTS =================

// Smooth scroll (optional)
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Basic button animation
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mouseover", () => {
        btn.style.opacity = "0.8";
    });
    btn.addEventListener("mouseout", () => {
        btn.style.opacity = "1";
    });
});
