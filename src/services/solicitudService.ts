import { crearSolicitudRequest } from '../api/solicitudApi';
import type { SolicitudPacienteProps } from '../interfaces/Solicitud/SolicitudPacienteProps';

export const crearSolicitud = async (solicitud: SolicitudPacienteProps) => {
  const formData = new FormData();
  formData.append('idPaciente', solicitud.idPaciente);
  formData.append('pressureA', solicitud.pressureA);
  formData.append('pressureB', solicitud.pressureB);
  formData.append('comentarios', solicitud.comentarios);
  formData.append('archivoZIP', solicitud.archivoZIP);

  const response = await crearSolicitudRequest(formData);
  return response.data;
};
