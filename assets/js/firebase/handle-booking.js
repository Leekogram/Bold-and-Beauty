
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

document.getElementById("bookingForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  processing.style.display = "block";

  // Get values
  var name = getInputVal("contact-name");
  var email = getInputVal("contact-email");
  var phone = getInputVal("contact-phone");
  var services = getInputVal("contact-services");
  var bookingTime = getInputVal("contact-time");
  var bookingDate = getInputVal("contact-date");
  var instruction = getInputVal("contact-message");

  sendOrder(
    name,
    email,
    phone,
    services,
    bookingDate,
    bookingTime,
    instruction
  );
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
async function sendOrder(
  name,
  email,
  phone,
  service,
  bookdate,
  booktime,
  instruction
) {
  // Add a new document with a generated id.
  await addDoc(collection(database, "bookings"), {
    bookingId:generateRandomOrderId(),
    name: name,
    email: email,
    phone: phone,
    service: service,
    bookdate: bookdate,
    booktime: booktime,
    sourceType: "from Web",
    status: "New",
    instruction: instruction,
    timestamp: serverTimestamp(),
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
    title:"New Booking !!!",
    message: `${service} Scheduled for ${bookdate} at ${booktime}`,
    type: "service",
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
  document.getElementById("bookingForm").reset();
  setTimeout(function(){
    success.style.display = "none";
  },3000);
}

function showError() {
  processing.style.display = "none";
  error.style.display = "block";
}

/* function generateUniqueInteger() {
  const seen = new Set(); // set to keep track of seen integers

  while (true) {
    const num = Math.floor(Math.random() * 900000) + 100000; // generate a random integer between 100000 and 999999
    if (!seen.has(num)) { // check if integer is unique
      seen.add(num); // add integer to set of seen integers
      return num.toString(); // return integer as a string
    }
  }
} */

function generateRandomOrderId() {
  var randomMoment = moment().millisecond(Math.floor(Math.random() * 100000));
  var randomOrderId = parseInt(randomMoment.format('x').slice(-4));
  return randomOrderId;
}


var servicesDropdown = document.getElementById("contact-services");
const colRef = collection(database, "service");

 async function getServcies() {
 

  try {
    //  const docsSnap = await getDocs(colRef);

    onSnapshot(colRef, { includeMetadataChanges: true }, (docsSnap) => {
     
  
        // Clear existing options
  servicesDropdown.innerHTML = "";

  // Create an option group
  var optionGroup = document.createElement("optgroup");
  optionGroup.setAttribute("id", "services-dropdown");
  optionGroup.label = "Select a service";

  // Loop through the documents in the query snapshot and create an option for each one
  docsSnap.forEach((doc) => {
    var option = document.createElement("option");
    option.value = doc.data().serviceName;
    option.text = doc.data().serviceName;
    optionGroup.appendChild(option);
  });

  // Add the option group to the dropdown
  servicesDropdown.appendChild(optionGroup);
   
      

     
    });

  
  } catch (error) {
    console.log(error);
  }
}

window.onload = getServcies;
