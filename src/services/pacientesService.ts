// src/services/pacienteService.ts
import { getPacientes, crearNuevoPaciente } from '../api/pacienteApi'; 
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import type { ResponseNuevoPacienteProps } from '../interfaces/Paciente/ResponseNuevoPacienteProps';


export const crearPaciente = async (paciente: NuevoPacienteProps, token: string): Promise<ResponseNuevoPacienteProps> => {
  const newPaciente = await crearNuevoPaciente(paciente, token);
  return newPaciente.data;
}

/**
 * Obtiene los pacientes que tiene un medico asociado
 * @param token 
 * @returns 
 */
export const fetchPacientesByMedico = async (token: string): Promise<PacienteProps[]> => {
  const allPacientes = await getPacientes(token);
  console.log("listado pacientes: ", allPacientes)
  return allPacientes;
};
