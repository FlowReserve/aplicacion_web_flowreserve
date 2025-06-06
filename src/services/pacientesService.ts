// src/services/pacienteService.ts
import { getPacientes, crearNuevoPaciente } from '../api/pacienteApi'; 
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
export const fetchPacientesList = async (token: string, params?: QueryParams): Promise<PaginatedResponse<PacienteProps>> => {
  const allPacientes = await getPacientes(token, params);
  return allPacientes.data;
};
