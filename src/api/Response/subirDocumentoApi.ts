import type { APIResponseProps } from "../../interfaces/global/APIResponseProps";
import authenticatedApiClient from "../authenticatedApiClient";


/**
 * Permite subir a un endpoint un fichero pasado como formData
 * @param requestId 
 * @param token 
 * @returns 
 */
export const subirDocumentoApi = async (
    requestId: string,
    archivoRespuesta: File,
    token: string
): Promise<APIResponseProps<null>> => {

    const api = authenticatedApiClient(token);

    const formData = new FormData();
    formData.append("archivoRespuesta", archivoRespuesta); // clave esperada por Spring

    const response = await api.post(
        `/api/v1/responses/upload/${requestId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}