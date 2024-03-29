<script type="module">
import firebase from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
  import auth from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";
  </script>
const firebaseConfig = {
  apiKey: "AIzaSyAhhbCR2KSfaLCmzCiICs-o0MczdwDpet0",
  authDomain: "louis-pasteur-ad3b0.firebaseapp.com",
  databaseURL: "https://louis-pasteur-ad3b0-default-rtdb.firebaseio.com",
  projectId: "louis-pasteur-ad3b0",
  storageBucket: "louis-pasteur-ad3b0.appspot.com",
  messagingSenderId: "109973193042",
  appId: "1:109973193042:web:542a97fed35be6ce5f3a8b"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
function
// Function to sign in
signIn() {
  const
 
email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please enter an email address and password.');
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      
const user = userCredential.user;
      // You can redirect the user to the home page or perform any other actions here

      
window.location.href = 'Contact.html';
      console.log("Signed in successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle the error case here

      
switch (errorCode) {
        case
 
'auth/invalid-email':
          alert('The email address you entered is invalid.');
          break;
        case
 
'auth/wrong-password':
          alert('The password you entered is incorrect.');
          break;
        default:
          alert('An unknown error occurred while attempting to sign in.');
          break;
      }
    });
}

// Add an event listener to the sign-in form
document.getElementById('signInForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  signIn(); // Call the sign-in function
});