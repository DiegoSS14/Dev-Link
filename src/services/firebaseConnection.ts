
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwj5ylUuLSVVVE_0Yxleu-hapLw5sjk2g",
  authDomain: "reactlinks-ed2d1.firebaseapp.com",
  databaseURL: "https://reactlinks-ed2d1-default-rtdb.firebaseio.com",
  projectId: "reactlinks-ed2d1",
  storageBucket: "reactlinks-ed2d1.firebasestorage.app",
  messagingSenderId: "100469439534",
  appId: "1:100469439534:web:1c3b9b44e50ffdcdb2f3bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };