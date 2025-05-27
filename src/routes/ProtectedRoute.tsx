import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ProtectedRouteProps } from '../interfaces/ProtectedRouteProps';

// Componente que protege rutas según autenticación y roles
const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth(); // Obtiene el estado actual de autenticación y el rol del usuario

  // Si el usuario no está autenticado, lo redirige al login
  if (!isAuthenticated) return <Navigate to="/" />;

  // Si hay una restricción de roles y el rol del usuario no está permitido, redirige a /unauthorized
  if (allowedRoles && !allowedRoles.includes(role!)) return <Navigate to="/unauthorized" />;

  // Si pasa los filtros, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
