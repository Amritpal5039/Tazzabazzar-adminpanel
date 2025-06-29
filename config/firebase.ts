import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual config when ready
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "tazzabazzar-demo.firebaseapp.com",
  projectId: "tazzabazzar-demo",
  storageBucket: "tazzabazzar-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;