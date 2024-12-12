// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNU4zMW9_wYijf28xi5fAB_zVCFfedRFY",
  authDomain: "hm-foods.firebaseapp.com",
  projectId: "hm-foods",
  storageBucket: "hm-foods.firebasestorage.app",
  messagingSenderId: "410779434443",
  appId: "1:410779434443:web:dfc60a92c2798fba2eca4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database=getDatabase(app);
export const storage=getStorage(app);
export const auth=getAuth(app);