import type { PacienteProps } from "../Paciente/PacienteProps";

export interface ResponseSolicitudPaciente{
    id: number,
    paciente: PacienteProps,
    date: string,
    state: string,
    presionSistolica: number,
    presionDiastolica: number,
    nombreArchivoZip: string,
    comentarios: string,
    codigo: string
}