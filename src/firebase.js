import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = { apiKey: "AIzaSyB9Jlc1RUlqdLXrzD2F-cHApC5Ks3npFrc",
  authDomain: "sanskaranapp.firebaseapp.com",
  projectId: "sanskaranapp",
  storageBucket: "sanskaranapp.firebasestorage.app",
  messagingSenderId: "760474137269",
  appId: "1:760474137269:web:25ada2b9ed5c51f45d84fc",
  measurementId: "G-EXFS7BR6W9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);