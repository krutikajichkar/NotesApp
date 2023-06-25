// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRr46ScwR9i9qzLf0RSIUesuXnzXgBY1w",
  authDomain: "notesapp-dcd3c.firebaseapp.com",
  projectId: "notesapp-dcd3c",
  storageBucket: "notesapp-dcd3c.appspot.com",
  messagingSenderId: "822492547644",
  appId: "1:822492547644:web:f071437c6f4ec255c85139",
  measurementId: "G-DT3M92YXBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
const auth = getAuth(app);

export const signUp = (email,password) => createUserWithEmailAndPassword(auth,email,password);
export const logOut = () => signOut(auth);
export const signIn = (email,password) => signInWithEmailAndPassword(auth,email,password);