// src/services/solicitudService.ts
import { descargarPDFSolicitudApi } from "../../api/Response/descargarDocumentoApi";

/**
 * Descarga el PDF de la solicitud especificada y lo dispara automáticamente.
 * @param requestId ID de la solicitud
 * @param token Token del usuario autenticado
 */
export const descargarPDFSolicitudService = async (
  requestId: number,
  token: string
): Promise<void> => {
  const blob = await descargarPDFSolicitudApi(requestId, token);

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `solicitud_${requestId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
