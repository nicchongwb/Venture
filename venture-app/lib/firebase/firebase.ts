// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUoZqA5FCfIDIg1_Stseox0CImrw9VHRg",
  authDomain: "venture-b7e57.firebaseapp.com",
  projectId: "venture-b7e57",
  storageBucket: "venture-b7e57.appspot.com",
  messagingSenderId: "20596914391",
  appId: "1:20596914391:web:3b92c581c66b0816ded892",
  measurementId: "G-82FSV9W8S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
