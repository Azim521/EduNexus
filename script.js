async function submitForm() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email,
        password: "default123",
        role
      })
    });

    const data = await res.json();
    alert(data.message || "Success");

  } catch (err) {
    alert("Server error");
    console.log(err);
  }
}
