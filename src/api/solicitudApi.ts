import authenticatedApiClient from './authenticatedApiClient';


export const crearSolicitudRequest = (token:string,  data: FormData) => {
  const api = authenticatedApiClient(token);
  return api.post('/api/v1/solicitudes/new', data);
};
