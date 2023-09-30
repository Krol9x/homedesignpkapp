// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDTDEg6CKkxIvDET_bLjDkF-XsB35Q968Q",

  authDomain: "login-6332e.firebaseapp.com",

  projectId: "login-6332e",

  storageBucket: "login-6332e.appspot.com",

  messagingSenderId: "971611087391",

  appId: "1:971611087391:web:3f744f524a6f866d72ab2a"

};


// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);




const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp =  firebase.firestore.FieldValue.serverTimestamp;
  
export { projectStorage, projectFirestore, timestamp };
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;