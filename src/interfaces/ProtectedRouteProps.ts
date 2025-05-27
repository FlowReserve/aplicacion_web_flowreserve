import type { ReactElement } from 'react';

export interface ProtectedRouteProps {
  allowedRoles?: string[];       // Lista opcional de roles permitidos
  children: ReactElement;        // Componente hijo que se renderiza si el usuario tiene acceso
}
