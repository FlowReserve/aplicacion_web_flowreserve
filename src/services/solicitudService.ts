import { crearSolicitudRequest, verListadoTotalConsultasAdminApi, verSolicitudesPaciente } from '../api/solicitudApi';
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
 * @param token JWT del usuario authenticado que se empleará para validar la sesión y obtener los pacientes asociados a ese usuario
 * @param idPaciente identificador del paciente sobre el que se quieren ver las solicitudes
 * @returns PaginatedResponse<ResponseSolicitudPaciente> Objeto de paginación de solicitudes realizadas a un paciente.
 */
export const listarSolicitudesAsociadasPaciente = async (token: string, idPaciente: string): Promise<PaginatedResponse<ResponseSolicitudPaciente>> => {
  const response = await verSolicitudesPaciente(token, idPaciente);
  return response.data;
}

export const listarConsultasPacientesAdminService = async (token: string): Promise<APIResponseProps<PaginatedResponse<ResponseSolicitudPaciente>>> => {
  const response = await verListadoTotalConsultasAdminApi(token);
  return response;
}
