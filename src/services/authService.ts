import { loginRequest, registerRequest } from "../api/authApi";
import type { UserLoginProps } from "../interfaces/UserLoginProps";
import type { UserRegisterProps } from "../interfaces/UserRegisterProps";


// Servicio asíncrono encargado de manjear el login del usuario en la aplicación
export const login = async (credentials : UserLoginProps) => {
    const response = await loginRequest(credentials);
    return response.data;
}

export const register = async (newUser : UserRegisterProps) => {
    const response = await registerRequest(newUser);
    return response.data;
}