import type { PacienteProps } from "../Paciente/PacienteProps";

export interface ResponseSolicitudPaciente{
    id: string,
    paciente: PacienteProps,
    date: string,
    state: string,
    pressureA: string,
    pressureB: string,
    nombreArchivoZip: string,
    campoComentarios: string,
    codigo: string
}