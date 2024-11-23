import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCehNV4NgiHPKTYor0Cr371qfXyqLOQ9jc",
    authDomain: "doodlle.firebaseapp.com",
    databaseURL: "https://doodlle-default-rtdb.firebaseio.com",
    projectId: "doodlle",
    storageBucket: "doodlle.appspot.com",
    messagingSenderId: "876024271936",
    appId: "1:876024271936:web:3b21b1006540b6e177bba5",
    measurementId: "G-65QK5KEKTL"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getFirestore(app);
export { db, storage };