import { crearSolicitudRequest, verListadoTotalConsultasAdminApi, verSolicitudesPacienteByIdAPI } from '../api/solicitudApi';
import type { PaginatedResponse } from '../interfaces/global/PaginatedResponse';
import type { ResponseNuevaSolicitudPacienteProps } from '../interfaces/Solicitud/ResponseNuevaSolicitudPacienteProps';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { APIResponseProps } from '../interfaces/global/APIResponseProps';

/**
 * Crea una solicitud para un paciente. Devuelve una promesa con los datos de la nueva solicitud creada.
 * @param token JWT del usuario authenticado que se empleará para validar la sesión y asociar la solicitud a dicho usuario.
 * @param formData Objeto formData que contiene: JSON con los datos del formulario + idPaciente sobre el que se realizará la consulta + fichero ZIP
 * @returns ResponseNuevaSoliciutdPacienteProps objeto con la información de la nueva soliciutd creada.s
 */
export const crearSolicitud = async (token: string, formData: FormData): Promise<ResponseNuevaSolicitudPacienteProps> => {
  const response = await crearSolicitudRequest(token, formData);
  return response.data;
};

/**
 * Lista las solicitudes que tiene un paciente. La función devuelve una promesa con un objeto de paginación de Solicitudes paciente.
 * @param idPaciente identificador del paciente sobre el que se quieren ver las solicitudes 
 * @param token JWT del usuario authenticado que se empleará para validar la sesión y obtener los pacientes asociados a ese usuario
 * @returns PaginatedResponse<ResponseSolicitudPaciente> Objeto de paginación de solicitudes realizadas a un paciente.
 */
export const listarSolicitudesAsociadasPacienteByIDService = async (
  idPaciente: number,
  token: string):
  Promise<PaginatedResponse<ResponseSolicitudPaciente>> => {

  const response = await verSolicitudesPacienteByIdAPI(idPaciente, token);

  if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al obtener los datos paginados de un paciente');
  }
  return response.responseObject;
}



export const listarConsultasPacientesAdminService = async (token: string): Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const response = await verListadoTotalConsultasAdminApi(token);
  return response;
}
