import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlf1CyulMxHPjchxMLWg_5XbpsqfN7x9A",
  authDomain: "c-solve.firebaseapp.com",
  databaseURL: "https://c-solve-default-rtdb.firebaseio.com",
  projectId: "c-solve",
  storageBucket: "c-solve.firebasestorage.app",
  messagingSenderId: "968342779401",
  appId: "1:968342779401:web:5dbaeec8ac901e5e42ead8",
  measurementId: "G-GVVBX5F9M5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
