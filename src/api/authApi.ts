// src/api/authApi.ts
import apiClient from './apiClient';
import type { UserLoginProps } from '../interfaces/Medico/UserLoginProps';
import type { UserRegisterProps } from '../interfaces/Medico/UserRegisterProps';

//Realiza la petición al endpoint indicado para iniciar sesión.
export const loginRequest = (credentials : UserLoginProps) => {
  return apiClient.post('/auth/log-in', credentials);
};

// Realiza la petición al enpoint indicado para crear un usuario
export const registerRequest = (newUser : UserRegisterProps) => {
    return apiClient.post('api/v1/medicos', newUser);
}
