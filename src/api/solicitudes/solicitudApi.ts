import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../../interfaces/global/QueryParams';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import authenticatedApiClient from '../authenticatedApiClient';


/**
 * Crea una nueva peticion para un paciente
 * @param token string identificador del usuario que quiere realizar la petición
 * @param data datos del formulario enviados por el médico
 * @returns ApiResponse con los datos de la solicitud que ha sido creada.
 */
export const crearSolicitudPacienteRequestAPI = async (
  token: string,
  data: FormData):
  Promise<APIResponseProps<ResponseSolicitudPaciente>> => {
  const api = authenticatedApiClient(token);
  const response = await api.post('/api/v1/solicitudes/new', data);

  return response.data;
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

  const response = await api.get("api/v1/solicitudes/mis-solicitudes", { params });
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

  const response = await api.get(`/api/v1/solicitudes/mis-solicitudes/${idPaciente}`, { params });
  return response.data;
}

/**
 * Listado de consultas existentes en el API para el apartado de administración.
 * @param token 
 * @returns 
 */
export const verListadoTotalConsultasAdminApi = async (
  token: string,
  params?: QueryParams):
  Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const api = authenticatedApiClient(token);
  const response = await api.get("/api/v1/solicitudes/listarRequestAdmin", { params });

  return response.data;
}