import type { APIResponseProps } from "../../interfaces/global/APIResponseProps";
import type { MedicoEstadisticasProps } from "../../interfaces/Medico/MedicoEstadisticasProps";
import authenticatedApiClient from "../authenticatedApiClient";

/**
 * Obtiene información de las estadisticas de un medico logueado.
 * @param id identificadordel usuario del que se quiere obtener las estadisticas
 * @param token token del usuario authenticado
 * @returns Promesa que contiene un objeto de estructura APIResponseProps y en su interior la información solicitada.
 */
export const obtenerMedicoEstadisticasProfileAPI = async (id: number, token: string): Promise<APIResponseProps<MedicoEstadisticasProps>> => {
    const api = authenticatedApiClient(token);
    const result = await api.get(`/api/v1/solicitudes/${id}/resumen`);
    return result.data;
}