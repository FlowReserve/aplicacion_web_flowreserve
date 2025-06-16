import type { userResponseProps } from "./userResponseProps";

export interface authResponseProps{
    user: userResponseProps;
    jwt: string;
}