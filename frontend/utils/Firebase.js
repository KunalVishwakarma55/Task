import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "onecart-44078.firebaseapp.com",
  projectId: "onecart-44078",
  storageBucket: "onecart-44078.firebasestorage.app",
  messagingSenderId: "842930936615",
  appId: "1:842930936615:web:b76a25624639bbbaca6702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}
