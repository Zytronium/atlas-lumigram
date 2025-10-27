// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApEGt1Hm-H_d6LUErLMyQ4Jma6Vz2zhK8",
  authDomain: "atlas-lumigram-e384f.firebaseapp.com",
  projectId: "atlas-lumigram-e384f",
  storageBucket: "atlas-lumigram-e384f.firebasestorage.app",
  messagingSenderId: "1066644268015",
  appId: "1:1066644268015:web:0353a4331fbae71f714c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
