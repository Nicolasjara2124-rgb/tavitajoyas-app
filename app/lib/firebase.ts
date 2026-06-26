import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpOnza7soqLEqRCQ2bKKCd6U9oinw1O3Y",
  authDomain: "tavitajoyas.firebaseapp.com",
  projectId: "tavitajoyas",
  storageBucket: "tavitajoyas.firebasestorage.app",
  messagingSenderId: "623843810702",
  appId: "1:623843810702:web:baaca8c95fcc846a2518df"
};

// Inicializamos Firebase asegurándonos de que no se duplique
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);