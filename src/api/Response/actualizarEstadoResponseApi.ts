import authenticatedApiClient from '../authenticatedApiClient';
import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import type { ResponseRequestUpdatedEstadoProps } from '../../interfaces/Solicitud/ResponseRequestUpdatedEstadoProps';
import type { RequestUpdateEstadoProps } from '../../interfaces/Solicitud/RequestUpdateEstadoProps';


/**
 * Actualiza el estado de una consulta realizada por un médico. Este endpoint sólo puede ser llamado por usuarios ADMINISTRADORES.
 * @param id identificador de la consulta
 * @param data objeto con el nuevo estado
 * @param token token del usuario autenticado
 */
export const actualizarEstadoConsultaAPI = async (
    id: string,
    data: RequestUpdateEstadoProps,
    token: string):
    Promise<APIResponseProps<ResponseRequestUpdatedEstadoProps>> => {
    const api = authenticatedApiClient(token);
    const response = await api.put(`/api/v1/solicitudes/${id}/estado`, data);
    return response.data;
}