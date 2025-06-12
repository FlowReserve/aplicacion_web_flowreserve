import type { APIResponseProps } from "../../interfaces/global/APIResponseProps";
import type { MedicoProfileResponseProps } from "../../interfaces/Medico/MedicoProfileResponseProps";
import authenticatedApiClient from "../authenticatedApiClient";

/**
 * Obtiene los datos de perfil de un medico
 * @param id 
 * @param token 
 * @returns 
 */
export const obtenerMedicoProfileAPI = async (token: string): Promise<APIResponseProps<MedicoProfileResponseProps>> => {
    const api =  authenticatedApiClient(token);
    const response =  await api.get(`api/v1/medico`);
    return response.data;
}