import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEf_cOZ_Pkrs-BzwsklB-x1xVwgquMrjk",
  authDomain: "listgpt-ff2ba.firebaseapp.com",
  projectId: "listgpt-ff2ba",
  storageBucket: "listgpt-ff2ba.appspot.com",
  messagingSenderId: "578893529176",
  appId: "1:578893529176:web:a3d000b577e42424cd8a2d",
  measurementId: "G-K53J45TZBX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
