// src/api/solicitudApi.ts
import authenticatedApiClient from '../authenticatedApiClient';

/**
 * Llama al endpoint que descarga el PDF de una solicitud.
 * @param requestId Identificador de la solicitud
 * @param token Token de autenticación
 * @returns Blob de tipo application/pdf
 */
export const descargarPDFSolicitudApi = async (
  requestId: number,
  token: string
): Promise<Blob> => {
  const api = authenticatedApiClient(token);
  const response = await api.get(`/api/v1/responses/medico/descargar/${requestId}`, {
    responseType: 'blob',
  });

  const blob = response.data;
  const contentType = response.headers['content-type'];

  // ✅ Verificamos si es PDF por su Content-Type correcto
  if (contentType === 'application/pdf') {
    return blob;
  }

  // ⛔️ Si no es un PDF, intentamos leerlo como texto para obtener un posible error JSON
  try {
    const text = await blob.text();
    const json = JSON.parse(text);
    throw new Error(json?.mensaje || 'Error desconocido al descargar el PDF');
  } catch {
    throw new Error('Respuesta inesperada del servidor al intentar descargar el PDF');
  }
};
