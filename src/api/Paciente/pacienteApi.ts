import type { NuevoPacienteProps } from '../../interfaces/Paciente/NuevoPacienteProps';
import type { QueryParams } from '../../interfaces/global/QueryParams';
import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import authenticatedApiClient from '../authenticatedApiClient';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';

//Realiza la petición al endpoint indicado para añadir un nuevo paciente asociado al médico que está logueado.
export const crearNuevoPaciente = (paciente: NuevoPacienteProps, token: string) => {
  const api = authenticatedApiClient(token);
  return api.post('api/v1/pacientes/new', paciente);
};


/**
 * Obtiene el listado de pacientes asociados con un médico.
 * @returns 
 */
export const obtenerListadoPacientesAPI = async (
  token: string,
  params?: QueryParams
): Promise<APIResponseProps<PaginatedResponse<PacienteProps>>> => {
  const api = authenticatedApiClient(token);
  const response = await api.get('api/v1/pacientes/mis-pacientes', { params });
  return response.data;
};

/**
 * Obtiene la información de un paciente pasado como parámetro
 * @param id identificador del paciente del que se quiere obtener la información
 * @param token token del usuario authenticado
 * @returns ApiResponseProps<PacienteProps>
 */
export const obtenerInformacionPacienteByIdAPI = async (id: number, token: string): Promise<APIResponseProps<PacienteProps>> => {
  const api = authenticatedApiClient(token);
  const response = await api.get(`api/v1/pacientes/${id}`);
  return response.data;
}
