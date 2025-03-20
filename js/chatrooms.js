document.addEventListener("DOMContentLoaded", () => {
  const chatroomsList = document.getElementById("chatrooms-list");
  const logoutBtn = document.getElementById("logout-btn");
  const currentUserSpan = document.getElementById("current-user");

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  currentUserSpan.textContent = currentUser;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  const chatrooms = [
    {
      id: "CSCI2690",
      name: "CSCI 2690",
      title: "Intro to Software Projects",
      description:
        "This course will introduce the core elements of project management within the context of software and technology project.",
    },
    {
      id: "CSCI2691",
      name: "CSCI 2691",
      title: "Introductory Project",
      description:
        "In this course, students take on junior roles, learning the fundamentals of professional programming in a team environment.",
    },
    {
      id: "CSCI3160",
      name: "CSCI 3160",
      title: "Designing User Interfaces",
      description:
        "This course deals with concepts and techniques underlying the design of interactive systems.",
    },
  ];

  console.log("Loading chatrooms:", chatrooms.length, "courses found");

  chatroomsList.innerHTML = "";

  chatrooms.forEach((chatroom) => {
    console.log("Creating card for:", chatroom.name);

    if (!localStorage.getItem(`chatroom_${chatroom.id}`)) {
      localStorage.setItem(`chatroom_${chatroom.id}`, JSON.stringify([]));
    }

    const card = document.createElement("div");
    card.className = "chatroom-card";

    const title = document.createElement("h3");
    title.textContent = `${chatroom.name}: ${chatroom.title}`;

    const description = document.createElement("p");
    description.textContent = chatroom.description;

    const joinBtn = document.createElement("a");
    joinBtn.href = `chat.html?room=${chatroom.id}`;
    joinBtn.className = "btn";
    joinBtn.textContent = "Join Chatroom";

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(joinBtn);

    chatroomsList.appendChild(card);
    console.log("Card added to DOM");
  });

  if (chatroomsList.children.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No chatrooms available. Please check back later.";
    message.style.textAlign = "center";
    message.style.padding = "20px";
    chatroomsList.appendChild(message);
    console.log("No cards were added - showing message");
  }
});
