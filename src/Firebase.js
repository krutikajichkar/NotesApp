// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA998rNQTEGFkLYrZDxRqDFfdZAXBqNTG8",
  authDomain: "notes-app-68fd7.firebaseapp.com",
  projectId: "notes-app-68fd7",
  storageBucket: "notes-app-68fd7.appspot.com",
  messagingSenderId: "178368417282",
  appId: "1:178368417282:web:ae2eda006aaf0dcad2211b",
  measurementId: "G-HXPDHJNSPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFireStore(app);
const auth = getAuth();

export const signUp = (email,password) =>  createUserWithEmailAndPassword(auth,email,password);
export const logOut = () => signOut();
export const signIn = (email,password) => signInWithEmailAndPassword(auth,email,password);


