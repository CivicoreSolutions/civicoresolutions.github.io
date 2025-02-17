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
            window.location.href = "login.html"; // Redirect to login page after successful sign up
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
            // After successful login, redirect to the dashboard or the previous page
            window.location.href = localStorage.getItem("redirectURL") || "dashboard.html";
        })
        .catch(error => alert(error.message));
});

// CHECK IF USER IS LOGGED IN
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user");
    const currentPage = window.location.pathname;

    // Skip login check on signup and login pages
    if (!userId && currentPage !== "/login.html" && currentPage !== "/signup.html") {
        // If the user is not logged in and we're not on the login/signup page, store the redirect URL
        localStorage.setItem("redirectURL", currentPage);
        window.location.href = "login.html";  // Redirect to login page
    }

    // If the user is logged in, display their name
    if (userId) {
        db.collection("users").doc(userId).get().then(doc => {
            if (doc.exists) {
                document.getElementById("userName").textContent = doc.data().fullName;
            }
        });
    }
});

// LOGOUT FUNCTION
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    auth.signOut().then(() => {
        localStorage.removeItem("user");
        window.location.href = "login.html"; // Redirect to login page after logging out
    });
});
