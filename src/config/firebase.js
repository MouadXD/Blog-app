import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  // Put your config here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
