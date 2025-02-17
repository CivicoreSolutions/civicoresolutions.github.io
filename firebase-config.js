<script type="module">
  // Import the functions you need from Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

  // Your Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyBLUXfmLksn-DKhiBl_tULEsa4j5y7pTRY",
    authDomain: "civicoresolutions-vanguard.firebaseapp.com",
    projectId: "civicoresolutions-vanguard",
    storageBucket: "civicoresolutions-vanguard.appspot.com",  // corrected the storage bucket
    messagingSenderId: "783587797610",
    appId: "1:783587797610:web:0b847f90b416f0ff673813"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);
</script>
