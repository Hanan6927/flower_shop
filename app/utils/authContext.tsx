'use client'
// utils/authContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const authContextValue: AuthContextType = {
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
