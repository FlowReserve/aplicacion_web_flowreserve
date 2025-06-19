export interface SolicitudPacienteProps {
  idPaciente: number;
  presionSistolica: number;
  presionDiastolica: number;
  comentarios: string;
  lesiones?: string;
  lesionesPersonalizadas?: string;
}
