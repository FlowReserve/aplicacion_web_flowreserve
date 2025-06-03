import axios from 'axios';
import type { PacienteProps } from '../interfaces/PacienteProps';

/**
 * Obtiene el listado de pacientes asociados con un médico.
 * @returns 
 */
export const getPacientes = async (): Promise<PacienteProps[]> => {
  const response = await axios.get<PacienteProps[]>('/static_data/pacientes_test.json');
  console.log(response)
  return response.data;
};
