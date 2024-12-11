// '@/lib/firebase.ts'
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth, UserCredential } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

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
let storage: FirebaseStorage;
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

    // Initialize Storage
    storage = getStorage(app);
    console.log('Firebase Storage initialized successfully');

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
  storage = getStorage(app);
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

export { app, auth, db, storage, analytics };

/**
 * Uploads a file to Firebase Storage with retry logic.
 * @param storageRef - Reference to the storage location.
 * @param file - File to upload.
 * @param maxRetries - Maximum number of retry attempts.
 * @returns A promise that resolves with the download URL of the uploaded file.
 */
export const uploadFileWithRetry = async (
  storageRef: any,
  file: File,
  maxRetries = 3
): Promise<string> => {
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
  throw new Error('Failed to upload file after maximum retries.');
};
