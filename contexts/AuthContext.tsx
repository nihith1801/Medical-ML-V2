'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, signInWithGoogle as firebaseSignInWithGoogle } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  updateUserProfile: (user: User, updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          avatar: firebaseUser.photoURL || '',
          emailVerified: firebaseUser.emailVerified,
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Error signing in:', error.code, error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await firebaseUpdateProfile(userCredential.user, { displayName: name });
        setUser({
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          name: name,
          avatar: userCredential.user.photoURL || '',
          emailVerified: userCredential.user.emailVerified,
        });
      }
    } catch (error: any) {
      console.error('Error signing up:', error.code, error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error.code, error.message);
      throw error;
    }
  };

  const sendEmailVerification = async () => {
    if (auth.currentUser) {
      try {
        await firebaseSendEmailVerification(auth.currentUser);
      } catch (error: any) {
        console.error('Error sending email verification:', error.code, error.message);
        throw error;
      }
    }
  };

  const updateUserProfile = async (user: User, updates: Partial<User>) => {
    if (auth.currentUser) {
      try {
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, updates);
        setUser({ ...user, ...updates });
      } catch (error: any) {
        console.error('Error updating user profile:', error.code, error.message);
        throw error;
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result: UserCredential = await firebaseSignInWithGoogle();
      if (result.user) {
        setUser({
          id: result.user.uid,
          email: result.user.email || '',
          name: result.user.displayName || '',
          avatar: result.user.photoURL || '',
          emailVerified: result.user.emailVerified,
        });
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error.code, error.message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    sendEmailVerification,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

