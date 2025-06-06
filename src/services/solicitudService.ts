import { crearSolicitudRequest, verSolicitudesPaciente } from '../api/solicitudApi';
import type { PaginatedResponse } from '../interfaces/PaginatedResponse';
import type { ResponseNuevaSolicitudPacienteProps } from '../interfaces/Solicitud/ResponseNuevaSolicitudPacienteProps';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';


export const crearSolicitud = async (token: string, formData: FormData): Promise<ResponseNuevaSolicitudPacienteProps> => {
  const response = await crearSolicitudRequest(token, formData);
  return response.data;
};

export const listarSolicitudesAsociadasPaciente = async (token: string, idPaciente: string): Promise<PaginatedResponse<ResponseSolicitudPaciente>> => {
  const response = await verSolicitudesPaciente(token, idPaciente);
  return response.data;
}
