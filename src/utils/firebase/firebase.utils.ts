import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGY_jDq85-ABDhSr9dTTWU16H5aiDMkgg",
  authDomain: "estherrex-db.firebaseapp.com",
  projectId: "estherrex-db",
  storageBucket: "estherrex-db.appspot.com",
  messagingSenderId: "709031016852",
  appId: "1:709031016852:web:3b7e1847d4130f1c047781",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// export const authenticateWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  console.log("userAuth", userAuth);
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log("userAuth uid", userAuth.uid);
  console.log("userDocRef", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("User Snap Shot", userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(`Error fetching the user: ${error.message}`);
    }
  }

  return userSnapshot;
};

export const authenticateWithGooglePopup = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      console.log("User exists, proceed to the app");
      return { userExists: true, user };
    } else {
      console.log("User does not exist, trigger sign-up flow");
      return { userExists: false, user };
    }
  } catch (error) {
    console.log("Error authenticating with Google:", error);
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-credential":
        alert("Invalid Credential");
        break;
      default:
        console.log("Error from firebase", error);
    }
  }
};

export const signOutUser = async () => await signOut(auth);

//   export const onAuthStateChangedListener = (callback) =>
//     onAuthStateChanged(auth, callback);
