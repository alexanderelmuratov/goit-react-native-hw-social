import * as firebase from "firebase";
import "firebase/auth";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8rUkpNQszm3UCzGRGwRbRQS0BJgFmaxg",
  authDomain: "react-native-social-9f7e4.firebaseapp.com",
  projectId: "react-native-social-9f7e4",
  storageBucket: "react-native-social-9f7e4.appspot.com",
  messagingSenderId: "12843454382",
  appId: "1:12843454382:web:f5f549e50d12e74cb2023f",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

firebase.initializeApp(firebaseConfig);

export default firebase;
