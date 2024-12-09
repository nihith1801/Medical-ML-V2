import { db } from './firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { User } from '@/types/user';
import { ModelType } from './api';

export interface Prediction {
  id?: string;
  userId: string;
  modelType: ModelType;
  prediction: string;
  confidenceScore: number;
  imageUrl: string;
  timestamp: Date;
}

export const savePrediction = async (prediction: Omit<Prediction, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'predictions'), {
      ...prediction,
      timestamp: new Date()
    });
    console.log('Prediction saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw error;
  }
};

export const getUserPredictions = async (user: User, limitCount: number = 10) => {
  try {
    const predictionsRef = collection(db, 'predictions');
    const q = query(
      predictionsRef,
      where('userId', '==', user.id),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Prediction));
  } catch (error) {
    console.error('Error fetching user predictions:', error);
    throw error;
  }
};

