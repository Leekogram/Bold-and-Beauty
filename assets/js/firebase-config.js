
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
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
    measurementId: "G-0V7GXFY5ZP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
