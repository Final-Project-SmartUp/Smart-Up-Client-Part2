// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeO9_0688BmiroD7XmBujdYCwMtSiz_vM",
    authDomain: "smartup-part3.firebaseapp.com",
    projectId: "smartup-part3",
    storageBucket: "smartup-part3.appspot.com",
    messagingSenderId: "652867128132",
    appId: "1:652867128132:web:3ef5de5e12d1710ed52511",
    measurementId: "G-RDLPDVGPWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
