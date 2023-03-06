// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4iyWgxs7CZj6HOsN834Oa-qoFYn3d1wk",
    authDomain: "smartuppart2.firebaseapp.com",
    projectId: "smartuppart2",
    storageBucket: "smartuppart2.appspot.com",
    messagingSenderId: "343650966373",
    appId: "1:343650966373:web:2d59517d394465e6899f8c",
    measurementId: "G-JBFY6Z9CJ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
