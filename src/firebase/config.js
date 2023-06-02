// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCFqcDlxQmhYi6CjQQcXbvCJWQ-wS3MUpU",
  authDomain: "eshop-a4b2b.firebaseapp.com",
  projectId: "eshop-a4b2b",
  storageBucket: "eshop-a4b2b.appspot.com",
  messagingSenderId: "576847434192",
  appId: "1:576847434192:web:f2963be5b41e0ddb7da9d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export  const storage = getStorage(app);