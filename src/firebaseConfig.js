// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3SlGp798dQndI_uBRkHQH-V2EANFLVA8",
  authDomain: "el-pepe-store.firebaseapp.com",
  projectId: "el-pepe-store",
  storageBucket: "el-pepe-store.appspot.com",
  messagingSenderId: "744359915860",
  appId: "1:744359915860:web:f392fa7e95bb22439498c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)