import type { APIResponseProps } from '../interfaces/global/APIResponseProps';
import type { PaginatedResponse } from '../interfaces/PaginatedResponse';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';
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

/**
 * Listado de consultas existentes en el API para el apartado de administración.
 * @param token 
 * @returns 
 */
export const verListadoTotalConsultasAdminApi = async (token: string): Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const api = authenticatedApiClient(token);
  const response = await api.get("/api/v1/solicitudes/listarRequestAdmin");
  console.log("Listado admin:", response.data)
  return response.data;
}