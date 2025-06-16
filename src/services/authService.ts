import { loginRequest, registerRequest } from "../api/authApi";
import type { UserLoginProps } from "../interfaces/Medico/UserLoginProps";
import type { UserRegisterProps } from "../interfaces/Medico/UserRegisterProps";
import type { authResponseProps } from "../interfaces/auth/authResponseProps";


/**
 * Servicio que se encarga de manejar la respuesta del servidor y extraer los datos del usuario tras un login exitoso
 * @param credentials objeto UserLoginProps con los datos de inicio de sesión de un usuario: username + password
 * @returns objeto con la authenticacion del usuario logueado exitosamente.
 */
export const login = async (credentials: UserLoginProps): Promise<authResponseProps> => {
    const response = await loginRequest(credentials);

    if (!response.status || !response.responseObject) {
        throw new Error(response.message || 'Error en la autenticación');
    }

    return response.responseObject;
}

export const register = async (newUser: UserRegisterProps) => {
    const response = await registerRequest(newUser);
    return response.data;
}