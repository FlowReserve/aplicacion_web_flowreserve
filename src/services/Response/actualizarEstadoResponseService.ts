import { actualizarEstadoConsultaAPI } from "../../api/Response/actualizarEstadoResponseApi"
import type { RequestUpdateEstadoProps } from "../../interfaces/Solicitud/RequestUpdateEstadoProps";
import type { ResponseRequestUpdatedEstadoProps } from "../../interfaces/Solicitud/ResponseRequestUpdatedEstadoProps";

/**
 *   
 * @param id 
 * @param data 
 * @param jwt 
 * @returns 
 */
export const actualizarEstadoResponseService = async (
    id: string,
    data: RequestUpdateEstadoProps,
    jwt: string):
    Promise<ResponseRequestUpdatedEstadoProps> => {
    const response = await actualizarEstadoConsultaAPI(id, data, jwt);

       if (!response.status || !response.responseObject) {
        throw new Error(response.message || 'Error al actualizar el estado de la consulta');
    }

    return response.responseObject;
}