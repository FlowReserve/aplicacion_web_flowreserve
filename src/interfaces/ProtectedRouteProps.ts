import type { ReactElement } from 'react';
import type { Role } from '../types/Role';

export interface ProtectedRouteProps {
  allowedRoles: Role[];       // Lista opcional de roles permitidos
  children: ReactElement;     // Componente hijo que se renderiza si el usuario tiene acceso
}
