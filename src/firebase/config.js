// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "badbank-59e32.firebaseapp.com",
  projectId: "badbank-59e32",
  storageBucket: "badbank-59e32.appspot.com",
  messagingSenderId: "542038101451",
  appId: "1:542038101451:web:9d28cb50bde19750c73a4e",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
