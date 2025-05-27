import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthState } from '../interfaces/AuthStateProps';
import type { Role } from '../types/Role';

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuth] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [role, setRole] = useState<Role | null>(() => {
    return localStorage.getItem('role') as Role | null;
  });

  const login = (userRole: Role, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setAuth(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
