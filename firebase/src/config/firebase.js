// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrJh2lW09S_BIF3YtCjb4BJDjgNZIuynI",
  authDomain: "wsb-177-179.firebaseapp.com",
  databaseURL: "https://wsb-177-179-default-rtdb.firebaseio.com",
  projectId: "wsb-177-179",
  storageBucket: "wsb-177-179.firebasestorage.app",
  messagingSenderId: "352742891023",
  appId: "1:352742891023:web:3b547057c3bc0cf27c0d7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;