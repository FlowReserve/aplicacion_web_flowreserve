import { crearSolicitudRequest } from '../api/solicitudApi';
import type { ResponseNuevaSolicitudPacienteProps } from '../interfaces/Solicitud/ResponseNuevaSolicitudPacienteProps';

export const crearSolicitud = async (token: string, formData: FormData): Promise<ResponseNuevaSolicitudPacienteProps> => {
  const response = await crearSolicitudRequest(token, formData);
  return response.data;
};
