// src/services/pacienteService.ts
import { obtenerListadoPacientesAPI, crearNuevoPacienteAPI, obtenerInformacionPacienteByIdAPI } from '../api/Paciente/pacienteApi';
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import type { PaginatedResponse } from '../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../interfaces/global/QueryParams';


/**
 * Crea un nuevo paciente en la base de datos
 * @param paciente 
 * @param token 
 * @returns 
 */
export const crearNuevoPacienteService = async (
  paciente: NuevoPacienteProps, 
  token: string):
   Promise<PacienteProps> => {
  const response = await crearNuevoPacienteAPI(paciente, token);

      if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al obtener los datos paginados de un paciente');
  }
  return response.responseObject;
}

/**
 * Obtiene los pacientes que tiene un medico asociado
 * @param token 
 * @returns 
 */
export const obtenerListadoPacientesService = async (
  token: string,
  params?: QueryParams
): Promise<PaginatedResponse<PacienteProps>> => {
  const response = await obtenerListadoPacientesAPI(token, params);

  if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al obtener los datos paginados de un paciente');
  }
  return response.responseObject;
};

/**
 * Obtiene la información de un paciente
 * @param id identificador del paciente sobre el que se quiere obtener la información
 * @param token token del usuario autenticado
 * @returns 
 */
export const obtenerInformacionPacienteByIDService = async (
  id: number,
  token: string
): Promise<PacienteProps> => {
  const response = await obtenerInformacionPacienteByIdAPI(id, token);

    if (!response.status || !response.responseObject) {
    throw new Error(response.message || 'Error al obtener los datos paginados de un paciente');
  }

  return response.responseObject;
};
