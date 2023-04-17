import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC_VZX0Y3gV1SEdy6nqmEIPrltx0I7FJwU",
  authDomain: "blog-project-f2620.firebaseapp.com",
  projectId: "blog-project-f2620",
  storageBucket: "blog-project-f2620.appspot.com",
  messagingSenderId: "538121740213",
  appId: "1:538121740213:web:e664f556148c66e6dbc3fc",
  measurementId: "G-D7HQQDGPH4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)