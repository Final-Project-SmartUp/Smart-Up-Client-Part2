// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjTCnzbYIBQSUARuJCGXqW7-2fxfyKoZ4",
    authDomain: "smartup-1.firebaseapp.com",
    projectId: "smartup-1",
    storageBucket: "smartup-1.appspot.com",
    messagingSenderId: "348882863531",
    appId: "1:348882863531:web:94dbf3d51d4b6ed3d87eee",
    measurementId: "G-X9ZWPMRKT9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
