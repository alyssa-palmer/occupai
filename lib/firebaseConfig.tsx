import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3bLLVXWil-jeb7a7W_nETD0p1Qx2kW7s",
    authDomain: "occupai-40146.firebaseapp.com",
    projectId: "occupai-40146",
    storageBucket: "occupai-40146.firebasestorage.app",
    messagingSenderId: "414737502484",
    appId: "1:414737502484:web:9b6445e5cff81926913201",
    measurementId: "G-ZM63E5SZ67"
};

const app = initializeApp(firebaseConfig); // Await the Promise
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };


