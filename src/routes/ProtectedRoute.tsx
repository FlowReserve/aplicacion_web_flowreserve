// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ProtectedRouteProps } from '../interfaces/ProtectedRouteProps';

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, authData } = useAuth();

  console.log("Is authenticated:", isAuthenticated);
console.log("User roles:", authData?.roles);
console.log("Allowed roles:", allowedRoles);

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // Si hay restricción de roles, y ninguno de los roles del usuario coincide, redirige a /unauthorized
  if (
    allowedRoles &&
    (!authData?.roles || !authData.roles.some(role => allowedRoles.includes(role)))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está correcto, renderiza el contenido
  return children;
};

export default ProtectedRoute;
