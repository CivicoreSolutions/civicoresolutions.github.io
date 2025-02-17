// SIGN UP FUNCTION
document.getElementById("signupForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;
    const licenseNumber = document.getElementById("licenseNumber").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                fullName: fullName,
                email: email,
                licenseNumber: licenseNumber,
                role: "Security Guard"
            });
        })
        .then(() => {
            alert("Account created! You can now log in.");
            window.location.href = "login.html";  // Redirect to login page after signup
        })
        .catch(error => alert(error.message));
});

// LOGIN FUNCTION
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            localStorage.setItem("user", userCredential.user.uid);  // Save user UID in localStorage
            window.location.href = "dashboard.html";  // Redirect to dashboard
        })
        .catch(error => alert(error.message));
});

// CHECK IF USER IS LOGGED IN (Only for protected pages like dashboard.html)
function checkIfLoggedIn() {
    const userId = localStorage.getItem("user");
    if (!userId) {
        window.location.href = "login.html";  // If not logged in, redirect to login page
    }
}

// LOGOUT FUNCTION
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    auth.signOut().then(() => {
        localStorage.removeItem("user");  // Remove user from localStorage
        window.location.href = "login.html";  // Redirect to login page after logout
    });
});

// CHECK IF USER IS LOGGED IN WHEN ACCESSING DASHBOARD
if (window.location.pathname === "/dashboard.html") {
    checkIfLoggedIn();
}
