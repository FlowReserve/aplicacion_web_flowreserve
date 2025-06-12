// src/services/pacienteService.ts
import { getPacientesAPI, crearNuevoPaciente, obtenerInformacionPacienteByIdAPI } from '../api/pacienteApi';
import type { APIResponseProps } from '../interfaces/global/APIResponseProps';
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import type { ResponseNuevoPacienteProps } from '../interfaces/Paciente/ResponseNuevoPacienteProps';
import type { PaginatedResponse } from '../interfaces/PaginatedResponse';
import type { QueryParams } from '../interfaces/QueryParams';


export const crearPaciente = async (paciente: NuevoPacienteProps, token: string): Promise<ResponseNuevoPacienteProps> => {
  const newPaciente = await crearNuevoPaciente(paciente, token);
  return newPaciente.data;
}

/**
 * Obtiene los pacientes que tiene un medico asociado
 * @param token 
 * @returns 
 */
export const fetchPacientesList = async (
  token: string,
  params?: QueryParams
): Promise<APIResponseProps<PaginatedResponse<PacienteProps>>> => {
  const allPacientes = await getPacientesAPI(token, params);
  return allPacientes;
};

/**
 * Obtiene la información de un paciente
 * @param id identificador del paciente sobre el que se quiere obtener la información
 * @param token token del usuario autenticado
 * @returns 
 */
export const obtenerInformacionPacienteByIDService = async (
  id: string,
  token: string
): Promise<APIResponseProps<PacienteProps>> => {
  const response = await obtenerInformacionPacienteByIdAPI(id, token);
  return response;
};
