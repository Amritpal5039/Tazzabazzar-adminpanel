import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user data for demo
const DEMO_USER: User = {
  uid: 'demo-admin-123',
  phoneNumber: '9876543210',
  displayName: 'Admin User',
  role: 'admin',
};

// Demo credentials
const DEMO_CREDENTIALS = {
  phone: '9876543210',
  password: 'admin123'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (localStorage for web)
    const checkAuthState = () => {
      try {
        const savedUser = localStorage.getItem('tazzabazzar_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log('No saved user found');
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const signIn = async (phone: string, password: string) => {
    try {
      // Demo authentication - replace with Firebase auth later
      if (phone === DEMO_CREDENTIALS.phone && password === DEMO_CREDENTIALS.password) {
        setUser(DEMO_USER);
        localStorage.setItem('tazzabazzar_user', JSON.stringify(DEMO_USER));
      } else {
        throw new Error('Invalid credentials. Use phone: 9876543210, password: admin123');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('tazzabazzar_user');
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    logout,
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

/* 
  Firebase Integration Code (for future use):
  
  import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
  import { auth } from '@/config/firebase';

  // Replace the dummy authentication with this Firebase code when ready:
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber || '',
          displayName: firebaseUser.displayName || undefined,
          role: 'admin',
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (phone: string, password: string) => {
    try {
      const email = phone + '@tazzabazzar.com';
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };
*/