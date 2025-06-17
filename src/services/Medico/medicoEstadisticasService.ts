import { obtenerMedicoEstadisticasProfileAPI } from "../../api/Medico/medicoEstadisticasApi";
import type { MedicoEstadisticasProps } from "../../interfaces/Medico/MedicoEstadisticasProps";

export const obtenerMedicoEstadisticasProfileService = async(id: number, token: string): Promise<MedicoEstadisticasProps> => {
    const response = await obtenerMedicoEstadisticasProfileAPI(id, token);

        if (!response.status || !response.responseObject) {
        throw new Error(response.message || 'Error al obtener estadísticas del usuario');
    }
    return response.responseObject;
}