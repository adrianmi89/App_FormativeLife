import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv"

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyAbdu7HhUcKUlOfpcECH609aEnv46cyJqY",
    authDomain: "formativelife-24f63.firebaseapp.com",
    projectId: "formativelife-24f63",
    storageBucket: "formativelife-24f63.appspot.com",
    messagingSenderId: "60078783003",
    appId: "1:60078783003:web:5d92dc1ef61bc3ffced6be"
    //measurementId: "G-8JD5SZ9B1N"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  
  export const storage = getStorage(firebaseApp)