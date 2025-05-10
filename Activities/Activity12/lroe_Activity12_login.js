// Logan Roe
// lroe@iastate.edu
// Oct 9, 2024

function fetchUser() {
    document.getElementById("loginuser").innerHTML = `Authenticating...`;

    return new Promise((resolve, reject) => {
        fetch("./lroe_Activity12_login.json")
        .then((response) => {return response.json()})
        .then((data) => {resolve(data)})
        .catch((err) => {console.log(err)});
    });
}

function login(users, userInput, passwordInput) {
    console.log(users);
    console.log(userInput);
    console.log(passwordInput);
    if (users.user === userInput && users.password === passwordInput) {
        document.getElementById('loginuser').innerHTML = "user and password correct";
    } else {
        document.getElementById('loginuser').innerHTML = "user and password incorrect";
    }
}

async function useAdmin(userInput, passwordInput) {
    const users = await fetchUser();
    login(users, userInput, passwordInput);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("loginButton").addEventListener("click", (event) => {
        event.preventDefault();
        // read input
        const userInput = document.getElementById("userInput").value;
        const passwordInput = document.getElementById("passwordInput").value;
        useAdmin(userInput, passwordInput);
    });
});