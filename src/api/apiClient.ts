// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_FLOWRESEVE_API_REST_URL,
  withCredentials: true, // Para incluir cookies si usás JWT con SameSite
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;