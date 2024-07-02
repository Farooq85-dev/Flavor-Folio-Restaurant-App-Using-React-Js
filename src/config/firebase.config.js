// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV2ecN1fjbFryZF0CEi88I-pLHkYoqRb4",
  authDomain: "flavor-folio-restaurant-app.firebaseapp.com",
  projectId: "flavor-folio-restaurant-app",
  storageBucket: "flavor-folio-restaurant-app.appspot.com",
  messagingSenderId: "16365493697",
  appId: "1:16365493697:web:8b937c762b0159f14fe340",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  sendEmailVerification,
};
