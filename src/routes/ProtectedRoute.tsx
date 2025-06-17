// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ProtectedRouteProps } from '../interfaces/ProtectedRouteProps';

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, authData } = useAuth();

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // Si hay restricción de roles, y ninguno de los roles del usuario coincide, redirige a /unauthorized
  const userRoles = authData?.roles ?? [];
  const hasAccess = userRoles.some(role => allowedRoles.includes(role));

  if (!hasAccess) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
