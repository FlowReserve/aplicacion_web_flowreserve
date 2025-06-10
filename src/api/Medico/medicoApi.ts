import authenticatedApiClient from "../authenticatedApiClient";

/**
 * Obtiene los datos de perfil de un medico
 * @param id 
 * @param token 
 * @returns 
 */
export const obtenerMedicoProfile = (id: string, token: string) => {
    const api = authenticatedApiClient(token);
    return api.post(`api/v1/medico${id}`);
}