import authenticatedApiClient from './authenticatedApiClient';


export const crearSolicitudRequest = (token:string,  data: FormData) => {
  const api = authenticatedApiClient(token);
  return api.post('/api/v1/solicitudes/new', data);
};

/**
 * Lista las solicitudes asociadas con un paciente.
 * @param token 
 * @param idPaciente 
 * @returns 
 */
export const verSolicitudesPaciente = (token: string, idPaciente: string) => {
  const api = authenticatedApiClient(token);
  return api.get("/api/v1/solicitudes/mis-solicitudes", {params: {pacienteId: idPaciente}} )
}