const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usrName = username.value.trim();
  const pswd = password.value.trim();
  const confirmPswd = confirmPassword.value.trim();

  if (usrName === "" || pswd === "" || confirmPswd === "") {
    window.alert("All form fields are required");
    return;
  } else if (pswd !== confirmPswd) {
    window.alert("Passwords do not match. Please re-enter passwords");
    return;
  } else {
    // Store user credentials
    localStorage.setItem(usrName, usrName);
    localStorage.setItem(pswd, pswd);

    // Also store them as the current user and email
    localStorage.setItem("currentUser", usrName);
    localStorage.setItem("currentUserEmail", usrName + "@dal.ca");

    console.log("Registration successful!");
    console.log("Username stored:", usrName);
    console.log("Email stored:", usrName + "@dal.ca");

    // Log all stored items for debugging
    console.log("All localStorage items after registration:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    window.alert(
      "You have been registered successfully. Redirecting you to login page"
    );
    setTimeout(() => {
      window.location = "login.html";
    }, 1000);
  }
});
