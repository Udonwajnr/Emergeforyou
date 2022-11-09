// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWLlCSVwYRHXbz9u10z6AYQnYNMXWz7AI",
  authDomain: "emergeforyou-b3a32.firebaseapp.com",
  projectId: "emergeforyou-b3a32",
  storageBucket: "emergeforyou-b3a32.appspot.com",
  messagingSenderId: "131854488587",
  appId: "1:131854488587:web:c64701cbffdbcf24b1e30e",
  measurementId: "G-81BRFDRGJB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);