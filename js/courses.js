// Get the logout button element
const logoutButton = document.getElementById("logout-button");

// Add click event listener to the logout button
logoutButton.addEventListener("click", () => {
  window.alert("You have been logged out successfully");

  // Redirect to the login page
  window.location = "login.html";
});

// Get all chat buttons
const chatButtons = document.querySelectorAll(".chat-button");

// Add click event listeners to all chat buttons
chatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const courseCode = button.getAttribute("data-course");
    const courseName = button.getAttribute("data-name");

    // Store course information in localStorage so chat page can access it
    localStorage.setItem("currentCourse", courseCode);
    localStorage.setItem("currentCourseName", courseName);

    // Redirect to chat page
    window.location = "chat.html";
  });
});
