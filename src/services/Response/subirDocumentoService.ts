// src/services/solicitudes/subirDocumentoService.ts
import { subirDocumentoApi } from "../../api/Response/subirDocumentoApi";
import type { APIResponseProps } from "../../interfaces/global/APIResponseProps";

/**
 * Lógica intermedia para subir documento a una solicitud.
 */
export const subirDocumentoService = async (
  requestId: string,
  archivo: File,
  token: string
): Promise<APIResponseProps<null>> => {
  return subirDocumentoApi(requestId, archivo, token);
};
