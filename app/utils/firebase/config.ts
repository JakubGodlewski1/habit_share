// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZX1BK4V9-p2yPJ4CuFYrx_QkIv1VjtgQ",
    authDomain: "habit-share-8697a.firebaseapp.com",
    projectId: "habit-share-8697a",
    storageBucket: "habit-share-8697a.appspot.com",
    messagingSenderId: "896683494143",
    appId: "1:896683494143:web:357037e41de04bd73b9aca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)