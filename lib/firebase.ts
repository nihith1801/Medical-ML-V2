import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth, UserCredential } from 'firebase/auth';
import { getFirestore, Firestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

if (process.env.NODE_ENV !== 'production') {
  console.log('Firebase Config:', {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  });
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID!
};

let app: FirebaseApp;
let analytics: Analytics | undefined;
let db: Firestore;
let auth: Auth;

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


    // Initialize Auth
    auth = getAuth(app);
    console.log('Firebase Auth initialized successfully');

  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
} else {
  app = getApp();
  db = getFirestore(app);
  auth = getAuth(app);
}

const googleProvider = new GoogleAuthProvider();

/**
 * Signs in with Google using a popup.
 * @returns A promise that resolves with the UserCredential.
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    console.log('Google Sign-In successful:', result.user);
    return result; // Return the entire UserCredential
  } catch (error: any) {
    console.error('Error signing in with Google:', error.code, error.message);
    if (error.email) {
      console.error('Email already in use:', error.email);
    }
    throw error;
  }
};

export { app, auth, db, analytics };

