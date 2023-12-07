// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfmFiBIhCEnFNv9jGbRWRcvAD9YvlF2xQ",
  authDomain: "next-firebase-66dcc.firebaseapp.com",
  projectId: "next-firebase-66dcc",
  storageBucket: "next-firebase-66dcc.appspot.com",
  messagingSenderId: "975666236047",
  appId: "1:975666236047:web:e82285128f5810b0217efa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

