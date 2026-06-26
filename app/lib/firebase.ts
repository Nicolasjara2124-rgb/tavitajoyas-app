import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tavitajoyas.firebaseapp.com",
  projectId: "tavitajoyas-....",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// ESTO ES LO QUE FALTA EN TU ARCHIVO:
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);