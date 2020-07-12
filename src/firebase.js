import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCu9A50p4clufXz8Ft-GJ7PeckR554OCpE",
  authDomain: "minesweeper-5e51e.firebaseapp.com",
  databaseURL: "https://minesweeper-5e51e.firebaseio.com",
  projectId: "minesweeper-5e51e",
  storageBucket: "minesweeper-5e51e.appspot.com",
  messagingSenderId: "778902912347",
  appId: "1:778902912347:web:8220def6b1ccb2ca9d2e7e",
  measurementId: "G-T22JZMP503",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
