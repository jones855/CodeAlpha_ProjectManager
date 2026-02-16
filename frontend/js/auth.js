function login() {
  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(user => {
    localStorage.setItem("userId", user._id);
    localStorage.setItem("userName", user.name);
    window.location.href = "dashboard.html";
  });
}
