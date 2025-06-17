import { obtenerMedicoProfileAPI } from "../../api/Medico/medicoApi";
import type { MedicoProfileResponseProps } from "../../interfaces/Medico/MedicoProfileResponseProps";

/**
 * Obtiene el perfil de un medico pasando el identificador del medico
 * @param id string identificador del medico que se quiere buscar
 * @param token token de authenticacion del usuario logueado
 * @returns apiResponseProps que contiene la información del médico.
 */
export const obtenerPerfilMedicoService = async (
    token: string
): Promise<MedicoProfileResponseProps> => {
    const response = await obtenerMedicoProfileAPI(token);

    if (!response.status || !response.responseObject) {
        throw new Error(response.message || 'Error al actualizar el estado de la consulta');
    }
    return response.responseObject;

}