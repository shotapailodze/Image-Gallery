// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpJ2VIcVGwuSTUk3_m-5sTIR2HtzEbX5A",
  authDomain: "gallery-app-bfacc.firebaseapp.com",
  projectId: "gallery-app-bfacc",
  storageBucket: "gallery-app-bfacc.appspot.com",
  messagingSenderId: "174337548025",
  appId: "1:174337548025:web:f2a120910ac852ed6c4c28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
