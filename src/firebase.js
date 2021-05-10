import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC66QGP2pqcHXk6Mh_1qWmFcyNjwA3wvVA",
  authDomain: "workteam-b437f.firebaseapp.com",
  projectId: "workteam-b437f",
  storageBucket: "workteam-b437f.appspot.com",
  messagingSenderId: "1075448025494",
  appId: "1:1075448025494:web:5da53ce2b369295bd98db7",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

export { firebaseApp, auth };
