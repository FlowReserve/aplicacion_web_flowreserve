import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_FLOWRESEVE_API_REST_URL,
  withCredentials: true, // Para enviar cookies (auth)
});

export const crearSolicitudRequest = (data: FormData) => {
  return API.post('/solicitudes', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
