import type { Role } from "../types/Role";


export interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role: Role, token :string) => void;
  logout: () => void;
}