import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8PZWaEkSrDLYhztjC566kVl-0PcgilMA",
  authDomain: "biogas-5eb9d.firebaseapp.com",
  projectId: "biogas-5eb9d",
  storageBucket: "biogas-5eb9d.appspot.com",
  messagingSenderId: "589714800332",
  appId: "1:589714800332:web:206313b70062ff88ed8c69",
  measurementId: "G-HX00HN5F46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export default app;