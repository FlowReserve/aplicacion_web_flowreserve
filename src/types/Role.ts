// src/constants/roles.ts
export const ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
} as const;

export type Role = keyof typeof ROLES; 
