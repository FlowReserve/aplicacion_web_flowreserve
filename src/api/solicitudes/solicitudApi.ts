import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../../interfaces/global/QueryParams';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import authenticatedApiClient from '../authenticatedApiClient';


export const crearSolicitudRequest = (token: string, data: FormData) => {
  const api = authenticatedApiClient(token);
  return api.post('/api/v1/solicitudes/new', data);
};


/**
 * Devuelve un listado de las consultas existentes de un medico.
 * @param token del usuario authenticado en la aplicación
 * @returns 
 */
export const verSolicitudesPacienteAPI = async (
  token: string,
  params?: QueryParams
): Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const api = authenticatedApiClient(token);

  const response = await api.get("api/v1/solicitudes/mis-solicitudes", {params});
  return response.data;
}


/**
 * Lista las solicitudes asociadas con un paciente.
 * @param idPaciente identificador del paciente sobre el que se quieren obtener las consultas
 * @param token del usuario authenticado a validar en la aplicación
 * @returns 
 */
export const verSolicitudesPacienteByIdAPI = async (
  idPaciente: number,
  token: string,
  params?: QueryParams,
):
  Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {

  const api = authenticatedApiClient(token);

  const response = await api.get(`/api/v1/solicitudes/mis-solicitudes/${idPaciente}`, {params});
  return response.data;
}

/**
 * Listado de consultas existentes en el API para el apartado de administración.
 * @param token 
 * @returns 
 */
export const verListadoTotalConsultasAdminApi = async (token: string): Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const api = authenticatedApiClient(token);
  const response = await api.get("/api/v1/solicitudes/listarRequestAdmin");
  
  return response.data;
}