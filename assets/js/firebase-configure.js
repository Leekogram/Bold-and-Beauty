// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
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
const database = getDatabase(app);

const processing = document.getElementById("processing");
const success = document.getElementById("success");
const error = document.getElementById("error");

document.getElementById("bookingForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  processing.style.display = "block";

  // Get values
  var name = getInputVal("contact-name");
  var email = getInputVal("contact-email");
  var phone = getInputVal("contact-phone");
  var services = getInputVal("contact-services");
  var instruction = getInputVal("contact-message");

  setTimeout(saveMessage(name, email, phone, services, instruction), 5000);


}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, service, instruction) {
 

  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), "booking_orders/")).key;

  update(ref(database, "booking_orders/" + newPostKey), {
    name: name,
    email: email,
    phone: phone,
    service: service,
    instruction: instruction,
  })
    .then(() => {
      // Data saved successfully!
      success.style.display = "block";
      processing.style.display = "none";
    })
    .catch((error) => {
      // The write failed...
      processing.style.display = "none";
      error.style.display = "block";
    });
}

function showSuccess(){
   success.style.display = "none";
   document.getElementById("bookingForm").reset();
  window.location.href = "http://example.com/new_url";
  
}
