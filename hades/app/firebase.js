// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGOzYOUhD5g5QT7kwOTdfXmSTYeE1aghg",
  authDomain: "athena-439002.firebaseapp.com",
  databaseURL: "https://athena-439002-default-rtdb.firebaseio.com",
  projectId: "athena-439002",
  storageBucket: "athena-439002.appspot.com",
  messagingSenderId: "389834718899",
  appId: "1:389834718899:web:f785f4f7cf78504cc93ac6",
  measurementId: "G-SSBTLQRHYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };