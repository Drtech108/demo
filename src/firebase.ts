// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7wgNHnxPDHnvfayAvf4UxwiCdg3A3vMA",
  authDomain: "tastybites-cb835.firebaseapp.com",
  projectId: "tastybites-cb835",
  storageBucket: "tastybites-cb835.appspot.com", // ✅ FIXED
  messagingSenderId: "382943742463",
  appId: "1:382943742463:web:1ac8aab56b9817a524ffca",
  measurementId: "G-K9CH1537T7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Analytics (optional)
export const analytics = getAnalytics(app);
