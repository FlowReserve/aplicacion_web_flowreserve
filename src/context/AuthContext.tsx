import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthState } from '../interfaces/AuthStateProps';
import type { Role } from '../types/Role';

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuth] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  const login = (userRole: Role) => {
    setAuth(true);
    setRole(userRole);
  };

  const logout = () => {
    setAuth(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
