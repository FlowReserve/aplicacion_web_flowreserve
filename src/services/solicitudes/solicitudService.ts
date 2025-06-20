import { crearSolicitudPacienteRequestAPI, verListadoTotalConsultasAdminApi, verSolicitudesPacienteAPI, verSolicitudesPacienteByIdAPI } from '../../api/solicitudes/solicitudApi';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { QueryParams } from '../../interfaces/global/QueryParams';

/**
 * Crea una solicitud para un paciente. Devuelve una promesa con los datos de la nueva solicitud creada.
 * @param token JWT del usuario authenticado que se empleará para validar la sesión y asociar la solicitud a dicho usuario.
 * @param formData Objeto formData que contiene: JSON con los datos del formulario + idPaciente sobre el que se realizará la consulta + fichero ZIP
 * @returns ResponseNuevaSoliciutdPacienteProps objeto con la información de la nueva soliciutd creada.s
 */
export const crearSolicitudPacienteService = async (
  token: string, 
  formData: FormData): 
  Promise<ResponseSolicitudPaciente> => {
  const response = await crearSolicitudPacienteRequestAPI(token, formData);

    if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al crear la petición para un paciente');
  }

  return response.responseObject;
};


export const listarSolicitudesPaciente = async (
  token: string,
  params: QueryParams): Promise<PaginatedResponse<ResponseSolicitudPaciente>> => {

  const response = await verSolicitudesPacienteAPI(token, params);
  if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al obtener los datos paginados de un paciente');
  }
  
  return response.responseObject;
}

/**
 * Lista las solicitudes que tiene un paciente. La función devuelve una promesa con un objeto de paginación de Solicitudes paciente.
 * @param idPaciente identificador del paciente sobre el que se quieren ver las solicitudes 
 * @param token JWT del usuario authenticado que se empleará para validar la sesión y obtener los pacientes asociados a ese usuario
 * @returns PaginatedResponse<ResponseSolicitudPaciente> Objeto de paginación de solicitudes realizadas a un paciente.
 */
export const listarSolicitudesPacienteByIDService = async (
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
