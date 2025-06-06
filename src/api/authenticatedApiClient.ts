// src/api/authenticatedApiClient.ts
import axios from 'axios';

const authenticatedApiClient = (token: string | null) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_FLOWRESEVE_API_REST_URL,
    withCredentials: true,
  });

  // Interceptor para añadir el token
  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default authenticatedApiClient;
