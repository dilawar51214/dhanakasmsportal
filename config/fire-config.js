import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAGMXquETbjkjNjovJaWb_ng3d5nYCiupo",
  authDomain: "dhankasmsportal.firebaseapp.com",
  projectId: "dhankasmsportal",
  storageBucket: "dhankasmsportal.appspot.com",
  messagingSenderId: "143996522826",
  appId: "1:143996522826:web:5ed8673a106bfbfdc5f1b3",
  measurementId: "G-D319R8D5WY"
  };

  export const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp);
  export const firestore = getFirestore(firebaseApp);
  export const fire = firebase;