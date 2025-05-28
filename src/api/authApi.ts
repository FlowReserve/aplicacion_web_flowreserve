// src/api/authApi.ts
import axios from 'axios';
import type { UserLoginProps } from '../interfaces/UserLoginProps';
import type { UserRegisterProps } from '../interfaces/UserRegisterProps';

const API = axios.create({
  baseURL: import.meta.env.FLOWRESEVE_API_REST_URL,
  withCredentials: true, // ← Para que las cookies se envíen
});

//Realiza la petición al endpoint indicado para iniciar sesión.
export const loginRequest = (credentials : UserLoginProps) => {
  return API.post('/auth/login', credentials);
};

// Realiza la petición al enpoint indicado para crear un usuario
export const registerRequest = (newUser : UserRegisterProps) => {
    return API.post('auth/register', newUser);
}
