// Get DOM elements
const courseTitleElement = document.getElementById("course-title");
const courseHeaderElement = document.getElementById("course-header");
const backButton = document.getElementById("back-button");
const logoutButton = document.getElementById("logout-button");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

// Get course information from localStorage
const courseCode = localStorage.getItem("currentCourse") || "Course";
const courseName = localStorage.getItem("currentCourseName") || "Chat";

// Update page title and header with course information
courseTitleElement.textContent = courseCode + " Chatroom";
courseHeaderElement.textContent = courseCode + " - " + courseName;

// Get current username and email from localStorage
const currentUser = localStorage.getItem("currentUser") || "You";
const currentUserEmail =
  localStorage.getItem("currentUserEmail") || currentUser + "@dal.ca";

// Load existing messages from localStorage
function loadMessages() {
  // Create a unique key for this course's messages
  const courseMessagesKey = `messages_${courseCode.replace(/\s+/g, "_")}`;

  // Get existing messages or initialize an empty array
  const savedMessages = localStorage.getItem(courseMessagesKey);
  const messages = savedMessages ? JSON.parse(savedMessages) : [];

  // Display each saved message
  messages.forEach((message) => {
    displayMessage(
      message.sender,
      message.email,
      message.text,
      message.time,
      false
    );
  });
}

// Save a message to localStorage
function saveMessage(sender, email, text, time) {
  // Create a unique key for this course's messages
  const courseMessagesKey = `messages_${courseCode.replace(/\s+/g, "_")}`;

  // Get existing messages or initialize an empty array
  const savedMessages = localStorage.getItem(courseMessagesKey);
  const messages = savedMessages ? JSON.parse(savedMessages) : [];

  // Add the new message
  messages.push({
    sender: sender,
    email: email,
    text: text,
    time: time,
  });

  // Save back to localStorage
  localStorage.setItem(courseMessagesKey, JSON.stringify(messages));
}

// Function to display a message in the chat
function displayMessage(sender, email, text, time, isNew = true) {
  // Create message elements
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";

  const senderDiv = document.createElement("div");
  senderDiv.className = "message-sender";

  // Create sender name element
  const senderNameSpan = document.createElement("span");
  senderNameSpan.className = "sender-name";
  senderNameSpan.textContent = sender;

  // Create sender email element
  const senderEmailSpan = document.createElement("span");
  senderEmailSpan.className = "sender-email";
  senderEmailSpan.textContent = email;

  // Add sender information to the sender div
  senderDiv.appendChild(senderNameSpan);
  senderDiv.appendChild(document.createTextNode(" "));
  senderDiv.appendChild(senderEmailSpan);

  const textDiv = document.createElement("div");
  textDiv.className = "message-text";
  textDiv.textContent = text;

  const timeDiv = document.createElement("div");
  timeDiv.className = "message-time";
  timeDiv.textContent = time;

  // Add elements to message
  messageDiv.appendChild(senderDiv);
  messageDiv.appendChild(textDiv);
  messageDiv.appendChild(timeDiv);

  // Add message to chat
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Save to localStorage if it's a new message
  if (isNew) {
    saveMessage(sender, email, text, time);
  }
}

// Add event listener to back button
backButton.addEventListener("click", () => {
  window.location = "courses.html";
});

// Add event listener to logout button
logoutButton.addEventListener("click", () => {
  // Clear current user data
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserEmail");

  window.alert("You have been logged out successfully");
  window.location = "login.html";
});

// Function to add a new message to the chat
function addMessage(text) {
  if (!text.trim()) return;

  // Get current time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // Display the message
  displayMessage(currentUser, currentUserEmail, text, timeString);
}

// Add event listener to send button
sendButton.addEventListener("click", () => {
  addMessage(messageInput.value);
  messageInput.value = "";
});

// Add event listener to message input for Enter key
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addMessage(messageInput.value);
    messageInput.value = "";
  }
});

// Load existing messages when the page loads
loadMessages();
