'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle as firebaseSignInWithGoogle } from '@/lib/firebase';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
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
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          avatar: firebaseUser.photoURL,
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
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await firebaseUpdateProfile(userCredential.user, { displayName: name });
      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: name,
        avatar: userCredential.user.photoURL,
        emailVerified: userCredential.user.emailVerified,
      });
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  const sendEmailVerification = async () => {
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser);
    }
  };

  const updateUserProfile = async (user: User, updates: Partial<User>) => {
    if (auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser, updates as { displayName?: string, photoURL?: string });
      setUser({ ...user, ...updates });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await firebaseSignInWithGoogle();
      if (result.user) {
        setUser({
          id: result.user.uid,
          email: result.user.email || '',
          name: result.user.displayName || '',
          avatar: result.user.photoURL,
          emailVerified: result.user.emailVerified,
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const value = {
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

