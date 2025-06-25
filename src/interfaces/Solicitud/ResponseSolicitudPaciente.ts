import type EstadoRequestProps from "../estados/EstadoRequestProps";
import type { PacienteProps } from "../Paciente/PacienteProps";

export interface ResponseSolicitudPaciente{
    id: number,
    paciente: PacienteProps,
    date: string,
    state: string,
    listadoEstados: EstadoRequestProps[]
    presionSistolica: number,
    rutaPublica: string,
    presionDiastolica: number,
    nombreArchivoZip: string,
    comentarios: string,
    codigo: string
}