import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebase_credentials from "../firebase-credentials.json";

const firebase = initializeApp(firebase_credentials);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

let updateData = null;
let refresh = null;
let setAuth = null;

onValue(ref(database, "/SonarData"), (snapshot) => {
  const data = snapshot.val();
  if (updateData !== null && updateData !== undefined) {
    updateData(data);
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    if (refresh != null && refresh != undefined) {
      setAuth(false);
    }
    localStorage.removeItem("authenticated");
  }
});

export async function signInUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Sign in successful";
  } 
  catch(e) {
    console.error(e);
    return "Invalid email or password";
  }
}

export async function signOutUser() {
  await signOut(auth);
}

export function setRefreshFunction(func) {
  refresh = func;
}

export function setUpdateFunction(func) {
  updateData = func;
}

export function setAuthFunction(func) {
  setAuth = func;
}
