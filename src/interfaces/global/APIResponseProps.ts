//Objeto que se recibe que envuelve las solicitudes realizadas al API.
export interface APIResponseProps<T>{
    status: boolean;
    message: string;
    serverCode: number;
    responseObject?: T;
    timeStamp: string;
}