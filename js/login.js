const username = document.getElementById("username");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usrName = username.value.trim();
    const pswd = password.value.trim();

    const storedUsrName = localStorage.getItem(usrName);
    const storedPswd = localStorage.getItem(pswd);

    if(usrName === "" || pswd === "") {
        window.alert("All form fields are required");
        return;
    } else if(storedUsrName !== usrName) {
        window.alert("Username is not found. Please sign up");
        return;
    } else if(storedPswd !== pswd) {
        window.alert("Password is wrong. Please enter correct password");
        return;
    } else {
        window.alert("You have been logged in successfully. Redirecting you to chat page");
        setTimeout(() => {
            window.location = "chat.html";
        }, 1000)
    }
})