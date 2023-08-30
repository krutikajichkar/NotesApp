// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {  getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAX84ItZw7Ml0EXUwxr8JK1hgpYKOg6vE",
  authDomain: "notesapp-d28e3.firebaseapp.com",
  projectId: "notesapp-d28e3",
  storageBucket: "notesapp-d28e3.appspot.com",
  messagingSenderId: "140478312468",
  appId: "1:140478312468:web:8981428b03d598bdc1b701",
  measurementId: "G-MKRMKTGJJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore(app)
export const auth = getAuth(app);


