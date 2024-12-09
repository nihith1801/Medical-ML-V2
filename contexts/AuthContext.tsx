"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification as firebaseSendEmailVerification,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  Auth
} from 'firebase/auth';
import { User } from '@/types/user';

const firebaseConfig = {
  apiKey: "AIzaSyCpeJfDo7Mv3Fo-tbVz2K9OW_igTOWs1OU",
  authDomain: "medical-ml-ea287.firebaseapp.com",
  projectId: "medical-ml-ea287",
  storageBucket: "medical-ml-ea287.firebasestorage.app",
  messagingSenderId: "685023716994",
  appId: "1:685023716994:web:4935b183efe64187ccf69b",
  measurementId: "G-GNKQQTFBNJ"
};

let app: FirebaseApp;
let auth: Auth;

if (typeof window !== "undefined") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, name: string) => Promise<User>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  updateUserProfile: (user: User, updates: Partial<User>) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  isEmailVerified: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUserToUser(firebaseUser));
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const firebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || '',
    avatar: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  });

  const signIn = async (email: string, password: string): Promise<User> => {
    if (!auth) throw new Error('Auth is not initialized');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return firebaseUserToUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<User> => {
    if (!auth) throw new Error('Auth is not initialized');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: name });
      await firebaseSendEmailVerification(firebaseUser);
      return firebaseUserToUser(firebaseUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) throw new Error('Auth is not initialized');
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<User> => {
    if (!auth) throw new Error('Auth is not initialized');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return firebaseUserToUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const updateUserProfile = async (user: User, updates: Partial<User>) => {
    if (!auth) throw new Error('Auth is not initialized');
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: updates.name || user.name,
          photoURL: updates.avatar || user.avatar,
        });
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const sendEmailVerification = async () => {
    if (!auth) throw new Error('Auth is not initialized');
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser);
    }
  };

  const isEmailVerified = () => {
    if (!auth) throw new Error('Auth is not initialized');
    return auth.currentUser?.emailVerified || false;
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateUserProfile,
    sendEmailVerification,
    isEmailVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

