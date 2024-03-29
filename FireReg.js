const firebaseConfig = {
  apiKey: "AIzaSyAhhbCR2KSfaLCmzCiICs-o0MczdwDpet0",
  authDomain: "louis-pasteur-ad3b0.firebaseapp.com",
  databaseURL: "https://louis-pasteur-ad3b0-default-rtdb.firebaseio.com",
  projectId: "louis-pasteur-ad3b0",
  storageBucket: "louis-pasteur-ad3b0.appspot.com",
  messagingSenderId: "109973193042",
  appId: "1:109973193042:web:542a97fed35be6ce5f3a8b"
};

// Initialize Firebase with your Firebase project config
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
var auth = firebase.auth();

// Reference to the Firebase Realtime Database
var doctorRegistrationDB = firebase.database().ref("Doctors");

// Reference to Firebase Storage
var storage = firebase.storage();
var storageRef = storage.ref("Doctors");

document.getElementById("doctorRegistration").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var email = getElementVal("hiddenEmail");
  var password = getElementVal("hiddenPassword");

  // Create a new user account using Firebase Authentication
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User account created successfully
      var user = userCredential.user;

      var name = getElementVal("name");
      var surname = getElementVal("surname");
      var specialty = getElementVal("specialty");
      var license = getElementVal("license");
      var practice = getElementVal("practice");
      var number = getElementVal("number");
      var profile_picture = document.getElementById("profile_picture").files[0];

      // Upload the profile picture to Firebase Storage
      var newDoctorKey = doctorRegistrationDB.push().key;
      var imageRef = storageRef.child(newDoctorKey + "/" + profile_picture.name);
      var uploadTask = imageRef.put(profile_picture);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring, you can add a progress bar if needed
        },
        (error) => {
          // Handle errors during upload
          console.error("Error uploading image: " + error);
        },
        () => {
          // Image successfully uploaded, get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Data to be saved in the Realtime Database
            var doctorData = {
              email: email,
              password: password, // You can remove this if you don't want to store the password
              name: name,
              surname: surname,
              specialty: specialty,
              license: license,
              practice: practice,
              number: number,
              profile_picture: downloadURL,
            };

            // Save the data in the Realtime Database
            doctorRegistrationDB.child(newDoctorKey).set(doctorData);

            // You can add success handling or redirection here
            console.log("Data saved successfully!");
            window.location.href = "Home.html";
          });
        }
      );
    })
    .catch((error) => {
      // Handle any errors during user account creation
      console.error("Error creating user account: " + error);
    });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
