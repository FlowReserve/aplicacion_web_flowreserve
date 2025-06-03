import { getPacientes } from '../api/pacienteApi'; 
import type { PacienteProps } from '../interfaces/PacienteProps';

/**
 * Obtiene los datos de pacientes de un médico en específico.
 * @param medicoID String con el ID del médico.
 * @returns 
 */
export const fetchPacientesByMedico = async (medicoID: string): Promise<PacienteProps[]> => {
  const allPacientes = await getPacientes();
  console.log("listado pacientes: ", allPacientes)
  return allPacientes.filter(paciente => paciente.medicoID === medicoID);
};
