// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWjYyRGR4NtRZan0ufHGfla24Zuyghhgg",
  authDomain: "seo-gallerypro.firebaseapp.com",
  projectId: "seo-gallerypro",
  storageBucket: "seo-gallerypro.appspot.com",
  messagingSenderId: "744407865819",
  appId: "1:744407865819:web:abd1fa7af9b605d3336ffe",
  measurementId: "G-BFNDWMZ5M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

export default firebaseConfig;
