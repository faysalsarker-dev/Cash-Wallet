// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDafgdywQ-wSAs30NQ0_H-YrhBlIsIpZfc",
  authDomain: "cash-wallet-a056e.firebaseapp.com",
  projectId: "cash-wallet-a056e",
  storageBucket: "cash-wallet-a056e.appspot.com",
  messagingSenderId: "113271350008",
  appId: "1:113271350008:web:ebfc9a587d5e127889510d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app