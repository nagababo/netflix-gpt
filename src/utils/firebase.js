// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcByLDw_trnNChsH4irsk8YCkqv0mm8iA",
  authDomain: "netflix-gpt-5b1cf.firebaseapp.com",
  projectId: "netflix-gpt-5b1cf",
  storageBucket: "netflix-gpt-5b1cf.firebasestorage.app",
  messagingSenderId: "751894374863",
  appId: "1:751894374863:web:6f525770cde146ae864aba",
  measurementId: "G-MWLQ7ZC6V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();