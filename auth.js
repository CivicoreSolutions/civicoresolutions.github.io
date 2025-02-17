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
            // Optional: Redirect to login page after sign-up
            // window.location.href = "login.html"; 
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
            localStorage.setItem("user", userCredential.user.uid);
            // Redirect to dashboard after successful login
            window.location.href = "dashboard.html"; 
        })
        .catch(error => alert(error.message));
});

// CHECK IF USER IS LOGGED IN (On pages where you want to show user data or handle login)
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user");

    // If the user is logged in, display their name (on protected pages like dashboard)
    if (userId) {
        db.collection("users").doc(userId).get().then(doc => {
            if (doc.exists) {
                document.getElementById("userName").textContent = doc.data().fullName;
            }
        });
    } else {
        // Optional: Redirect to login page if not logged in
        // window.location.href = "login.html";
    }
});

// LOGOUT FUNCTION
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    auth.signOut().then(() => {
        localStorage.removeItem("user");
        // Redirect to login page after logout
        window.location.href = "login.html";
    });
});
