document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const registerLink = document.getElementById("register-link");
  const backToLoginBtn = document.getElementById("back-to-login");
  const registerBtn = document.getElementById("register-btn");
  const messageDiv = document.getElementById("message");

  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    window.location.href = "chatrooms.html";
  }

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  backToLoginBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    messageDiv.textContent = "";
    messageDiv.className = "message";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", username);
      window.location.href = "chatrooms.html";
    } else {
      showMessage("Invalid username or password.", "error");
    }
  });

  registerBtn.addEventListener("click", () => {
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!newUsername || !newPassword) {
      showMessage("Username and password are required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.username === newUsername)) {
      showMessage("Username already exists.", "error");
      return;
    }

    users.push({
      username: newUsername,
      password: newPassword,
    });

    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Registration successful! You can now login.", "success");

    document.getElementById("new-username").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";

    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
  }
});
