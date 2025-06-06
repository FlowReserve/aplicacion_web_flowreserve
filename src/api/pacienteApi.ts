import axios from 'axios';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import authenticatedApiClient from './authenticatedApiClient';


//Realiza la petición al endpoint indicado para añadir un nuevo paciente asociado al médico que está logueado.
export const crearNuevoPaciente = (paciente: NuevoPacienteProps, token: string)  => {
  const api = authenticatedApiClient(token);
  return api.post('api/v1/pacientes/new', paciente);
};


/**
 * Obtiene el listado de pacientes asociados con un médico.
 * @returns 
 */
export const getPacientes = async (token: string): Promise<PacienteProps[]> => {
  const api = authenticatedApiClient(token);
  const response = await api.get('api/v1/pacientes/mis-pacientes');
  console.log(response)
  return response.data;
};
