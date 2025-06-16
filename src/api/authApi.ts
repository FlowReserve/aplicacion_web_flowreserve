// src/api/authApi.ts
import apiClient from './apiClient';
import type { UserLoginProps } from '../interfaces/Medico/UserLoginProps';
import type { UserRegisterProps } from '../interfaces/Medico/UserRegisterProps';
import type { APIResponseProps } from '../interfaces/global/APIResponseProps';
import type { authResponseProps } from '../interfaces/auth/authResponseProps';

/**
 * Realiza una petición al controller para iniciar la sesión de un usuario
 * @param credentials objeto UserLoginProps con los datos de inicio de sesión de un usuario: username + password
 * @returns APIResponseProps con los datos de authenticacion si el login fue exitoso.
 */
export const loginRequest = async (
  credentials: UserLoginProps):
  Promise<APIResponseProps<authResponseProps>> => {

  const response = await apiClient.post('api/v1/auth/login', credentials);
  return response.data;
};

// Realiza la petición al enpoint indicado para crear un usuario
export const registerRequest = (newUser: UserRegisterProps) => {
  return apiClient.post('api/v1/medicos', newUser);
}
