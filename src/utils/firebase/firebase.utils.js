// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxKN-iUriGRDfhv8klF_xYrV2D1oMgrOY",
  authDomain: "crwn-clothing-db-be0dd.firebaseapp.com",
  projectId: "crwn-clothing-db-be0dd",
  storageBucket: "crwn-clothing-db-be0dd.appspot.com",
  messagingSenderId: "101920875803",
  appId: "1:101920875803:web:e97ff89bbe5229bfe6dfbe",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.error("Error creating the user ", error.message);
    }
  }
  return userDocRef;
};
