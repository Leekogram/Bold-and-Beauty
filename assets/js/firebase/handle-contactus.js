
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjW8pGmsL9l5olUhU5je0zKD8hkrQThZw",
  authDomain: "boldandbeautifulsalon-89023.firebaseapp.com",
  projectId: "boldandbeautifulsalon-89023",
  storageBucket: "boldandbeautifulsalon-89023.appspot.com",
  messagingSenderId: "466649288397",
  appId: "1:466649288397:web:150d344db30d3f2185a384",
  measurementId: "G-0V7GXFY5ZP",
  databaseURL:
    "https://boldandbeautifulsalon-89023-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getFirestore(app);

const processing = document.getElementById("processing");
const success = document.getElementById("success");
const error = document.getElementById("error");
const servicesDropDown = document.getElementById("error");

document.getElementById("contact-us-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  processing.style.display = "block";

  // Get values
  var name = getInputVal("contact-name");
  var email = getInputVal("contact-email");
  var phone = getInputVal("contact-phone");
  var message = getInputVal("contact-message");

  sendMessage(
    name,
    email,
    phone,
    message
  );
}

// Function to get form values
function getInputVal(id) {
   
  return document.getElementById(id).value;
}

// Save message to firebase
async function sendMessage(
  name,
  email,
  phone,
  message
) {
  // Add a new document with a generated id.
  await addDoc(collection(database, "feedbacks"), {
 
    fullName: name,
    emailAddress: email,
    phoneNumber: phone,
    sourceType: "from Web",
    message: message,
    createdBy: serverTimestamp(),
  })
    .then((docRef) => {
      // Data sent successfully!
      console.log("Document has been added successfully");
      showSuccess();
 
     
  
    })
    .catch((error) => {
      // Data sent failed...
      showError()
      console.log(error);
    });
  // Add a new document with a generated id.
  await addDoc(collection(database, "orderNotification"), {
    title:"New Message !!!",
    message: `You have received a message from ${name}`,
    type: "feedback",
    status:"unread",
    timestamp: serverTimestamp(),
  })
    .then((docRef) => {
      // Data sent successfully!
      console.log("Notification sent");
      // showSuccess();
    })
    .catch((error) => {
      // Data sent failed...
      // showError()
      console.log(error);
    });
}

function showSuccess() {
  /*  success.style.display = "none";
   document.getElementById("bookingForm").reset();
  window.location.href = "http://example.com/new_url"; */
  success.style.display = "block";
  processing.style.display = "none";
  document.getElementById("contact-us-form").reset();
  setTimeout(function(){
    success.style.display = "none";
  },3000);
}

function showError() {
  processing.style.display = "none";
  error.style.display = "block";
}






