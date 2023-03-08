// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDJZsLz7UzGfiBLdNUoXV9RANqEay0zjX8",
  authDomain: "smart-up-capek.firebaseapp.com",
  projectId: "smart-up-capek",
  storageBucket: "smart-up-capek.appspot.com",
  messagingSenderId: "866756455195",
  appId: "1:866756455195:web:1366c11c075b2a2465c1be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
