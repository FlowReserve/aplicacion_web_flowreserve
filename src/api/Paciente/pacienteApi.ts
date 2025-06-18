import type { NuevoPacienteProps } from '../../interfaces/Paciente/NuevoPacienteProps';
import type { QueryParams } from '../../interfaces/global/QueryParams';
import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import authenticatedApiClient from '../authenticatedApiClient';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';



/**
 * Realiza la petición al endpoint indicado para añadir un nuevo paciente asociado al médico que está logueado.
 * @param paciente datos del paciente que se quiere subir a la base de datos.
 * @param token string con la authenticacion del usuario logueado.
 * @returns APIResponseProps que contiene dentro los datos del usuario creado en la base de datos.
 */
export const crearNuevoPacienteAPI = async (
  paciente: NuevoPacienteProps,
  token: string):
  Promise<APIResponseProps<PacienteProps>> => {

  const api = authenticatedApiClient(token);
  const response = await api.post('api/v1/pacientes/new', paciente);
  return response.data;
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
