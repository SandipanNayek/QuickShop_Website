import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5czpeoyO5RTgQfIn44vBYzZzsjD9lLtc",
  authDomain: "quickshop-903ba.firebaseapp.com",
  projectId: "quickshop-903ba",
  storageBucket: "quickshop-903ba.firebasestorage.app",
  messagingSenderId: "204672635189",
  appId: "1:204672635189:web:36a7787940ded5d2483c7c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();