document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const usersList = document.getElementById("users-list");
  const logoutBtn = document.getElementById("logout-btn");
  const backBtn = document.getElementById("back-btn");
  const chatroomTitle = document.getElementById("chatroom-title");
  const currentUserSpan = document.getElementById("current-user");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  if (!roomId) {
    window.location.href = "chatrooms.html";
    return;
  }

  currentUserSpan.textContent = currentUser;

  const roomInfo = getChatroomInfo(roomId);
  if (roomInfo) {
    chatroomTitle.textContent = `${roomInfo.name}: ${roomInfo.title}`;
  } else {
    chatroomTitle.textContent = "Unknown Chatroom";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "chatrooms.html";
  });

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const message = {
      user: currentUser,
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    addMessageToChat(message, true);

    saveChatMessage(roomId, message);

    messageInput.value = "";
  });

  loadChatHistory(roomId);

  updateOnlineUsers(roomId);

  function getChatroomInfo(id) {
    const chatrooms = [
      {
        id: "CSCI2690",
        name: "CSCI 2690",
        title: "Intro to Software Projects",
      },
      {
        id: "CSCI2691",
        name: "CSCI2691",
        title: "Introductory Project",
      },
      {
        id: "CSCI3160",
        name: "CSCI 3160",
        title: "Designing User Interface",
      },
    ];

    return chatrooms.find((room) => room.id === id);
  }

  function addMessageToChat(message, isSent) {
    const messageElement = document.createElement("div");
    messageElement.className = `message-bubble ${isSent ? "sent" : "received"}`;

    const sender = document.createElement("div");
    sender.className = "sender";
    sender.textContent = message.user;

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = message.text;

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = formatTimestamp(message.timestamp);

    messageElement.appendChild(sender);
    messageElement.appendChild(text);
    messageElement.appendChild(time);

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function saveChatMessage(roomId, message) {
    const storageKey = `chatroom_${roomId}`;
    const messages = JSON.parse(localStorage.getItem(storageKey) || "[]");
    messages.push(message);
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }

  function loadChatHistory(roomId) {
    const storageKey = `chatroom_${roomId}`;
    const messages = JSON.parse(localStorage.getItem(storageKey) || "[]");

    messages.forEach((message) => {
      const isSent = message.user === currentUser;
      addMessageToChat(message, isSent);
    });
  }

  function updateOnlineUsers(roomId) {
    usersList.innerHTML = "";

    const currentUserItem = document.createElement("li");
    currentUserItem.textContent = `${currentUser} (You)`;
    usersList.appendChild(currentUserItem);

    const storageKey = `online_users_${roomId}`;

    const simulatedUsers = ["Prof. Smith", "StudentA", "TutorJohn", "TAMaria"];
    let onlineUsers = JSON.parse(localStorage.getItem(storageKey) || "[]");

    onlineUsers = onlineUsers.filter((user) => !simulatedUsers.includes(user));

    if (!onlineUsers.includes(currentUser)) {
      onlineUsers.push(currentUser);
    }

    localStorage.setItem(storageKey, JSON.stringify(onlineUsers));

    onlineUsers.forEach((user) => {
      if (user !== currentUser) {
        const userItem = document.createElement("li");
        userItem.textContent = user;
        usersList.appendChild(userItem);
      }
    });
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function clearSimulatedMessages(roomId) {
    const chatStorageKey = `chatroom_${roomId}`;
    const messages = JSON.parse(localStorage.getItem(chatStorageKey) || "[]");

    const simulatedUsers = ["Prof. Smith", "StudentA", "TutorJohn", "TAMaria"];
    const filteredMessages = messages.filter(
      (message) => !simulatedUsers.includes(message.user)
    );

    localStorage.setItem(chatStorageKey, JSON.stringify(filteredMessages));

    chatMessages.innerHTML = "";

    filteredMessages.forEach((message) => {
      const isSent = message.user === currentUser;
      addMessageToChat(message, isSent);
    });
  }

  clearSimulatedMessages(roomId);
});
