import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyBLUXfmLksn-DKhiBl_tULEsa4j5y7pTRY",
  authDomain: "civicoresolutions-vanguard.firebaseapp.com",
  projectId: "civicoresolutions-vanguard",
  storageBucket: "civicoresolutions-vanguard.firebasestorage.app",
  messagingSenderId: "783587797610",
  appId: "1:783587797610:web:0b847f90b416f0ff673813"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth state observer
onAuthStateChanged(auth, (user) => {
  const currentPath = window.location.pathname;
  
  if (user) {
    // User is signed in
    if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
      window.location.href = 'dashboard.html';
    }
  } else {
    // User is signed out
    if (currentPath.includes('dashboard.html')) {
      window.location.href = 'login.html';
    }
  }
});

// SIGN UP FUNCTION
document.getElementById("signupForm")?.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;
    const licenseNumber = document.getElementById("licenseNumber").value;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      licenseNumber: licenseNumber,
      role: "Security Guard",
      createdAt: new Date().toISOString()
    });

    alert("Account created successfully!");
    window.location.href = "dashboard.html"; // Direct to dashboard instead of login
  } catch (error) {
    alert(error.message);
  }
});

// LOGIN FUNCTION
document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(auth, email, password);
    // No need to manually redirect - the auth state observer will handle it
  } catch (error) {
    alert(error.message);
  }
});

// LOGOUT FUNCTION
document.getElementById("logoutBtn")?.addEventListener("click", async function () {
  try {
    await signOut(auth);
    // No need to manually redirect - the auth state observer will handle it
  } catch (error) {
    alert(error.message);
  }
});

// Function to get current user data (use this in dashboard.html)
async function loadUserData() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    
    // Example: Update dashboard with user data
    const userNameElement = document.getElementById("userName");
    if (userNameElement && userData) {
      userNameElement.textContent = userData.fullName;
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// Load user data when dashboard page loads
if (window.location.pathname.includes('dashboard.html')) {
  loadUserData();
}
