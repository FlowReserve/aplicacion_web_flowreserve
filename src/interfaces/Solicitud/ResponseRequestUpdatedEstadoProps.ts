import type { EstadoType } from "../../types/estadoColores";

export interface ResponseRequestUpdatedEstadoProps{
    id: number;
    codigo: string,
    estado: EstadoType
}