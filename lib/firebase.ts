import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCpeJfDo7Mv3Fo-tbVz2K9OW_igTOWs1OU",
  authDomain: "medical-ml-ea287.firebaseapp.com",
  projectId: "medical-ml-ea287",
  storageBucket: "medical-ml-ea287.firebasestorage.app",
  messagingSenderId: "685023716994",
  appId: "1:685023716994:web:4935b183efe64187ccf69b",
  measurementId: "G-GNKQQTFBNJ"
};


let app;
let analytics;
let db;
let storage;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
    
    // Initialize Analytics
    if (typeof window !== 'undefined') {
      isSupported().then(supported => {
        if (supported) {
          analytics = getAnalytics(app);
          console.log('Firebase Analytics initialized successfully');
        }
      });
    }

    // Initialize Firestore
    db = getFirestore(app);
    console.log('Firestore initialized successfully');

    // Initialize Storage
    storage = getStorage(app);
    console.log('Firebase Storage initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
} else {
  app = getApp();
  db = getFirestore(app);
  storage = getStorage(app);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google Sign-In successful:', result.user);
    return result.user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error.code, error.message);
    if (error.email) {
      console.error('Email already in use:', error.email);
    }
    throw error;
  }
};

export { app, auth, db, storage, analytics };

export const uploadFileWithRetry = async (storageRef: any, file: File, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const uploadResult = await uploadBytes(storageRef, file);
      return await getDownloadURL(uploadResult.ref);
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      // Wait for 2^attempt seconds before retrying
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
};

