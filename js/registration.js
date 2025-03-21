const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usrName = username.value.trim();
    const pswd = password.value.trim();
    const confirmPswd = confirmPassword.value.trim();

    if(usrName === "" || pswd === "" || confirmPswd === "") {
        window.alert("All form fields are required");
        return;
    } else if(pswd !== confirmPswd) {
        window.alert("Passowrds do not match. Please re-enter passwords");
        return;
    } else {
        window.alert("You have been registered successfully. Redirecting you to login page")
        setTimeout(() => {
            window.location = "login.html";
        }, 1000)
    }

    localStorage.setItem(usrName, usrName);
    localStorage.setItem(pswd, pswd);
})