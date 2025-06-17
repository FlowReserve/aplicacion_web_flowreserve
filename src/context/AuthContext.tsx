// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { Role } from '../types/Role';

interface AuthData {
  id: number;
  username: string;
  token: string;
  roles: Role[];
}

interface AuthContextType {
  authData: AuthData | null;
  login: (data: AuthData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const login = (data: AuthData) => {
    setAuthData(data);
    console.log("data guardada en el context:", data)
  };

  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        isAuthenticated: !!authData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return ctx;
};
