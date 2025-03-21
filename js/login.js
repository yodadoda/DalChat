const username = document.getElementById("username");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usrName = username.value.trim();
  const pswd = password.value.trim();

  const storedUsrName = localStorage.getItem(usrName);
  const storedPswd = localStorage.getItem(pswd);

  if (usrName === "" || pswd === "") {
    window.alert("All form fields are required");
    return;
  } else if (storedUsrName !== usrName) {
    window.alert("Username is not found. Please sign up");
    return;
  } else if (storedPswd !== pswd) {
    window.alert("Password is wrong. Please enter correct password");
    return;
  } else {
    // Store the current logged-in username explicitly
    localStorage.setItem("currentUser", usrName);
    // Store the user's email (we'll use their username@dal.ca as email)
    localStorage.setItem("currentUserEmail", usrName + "@dal.ca");

    console.log("Login successful!");
    console.log("Username stored:", usrName);
    console.log("Email stored:", usrName + "@dal.ca");

    // Log all stored items for debugging
    console.log("All localStorage items after login:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    window.alert(
      "You have been logged in successfully. Redirecting you to courses page"
    );
    setTimeout(() => {
      window.location = "courses.html";
    }, 1000);
  }
});
