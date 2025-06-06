// src/hooks/useCrearPaciente.ts
import { useState } from 'react';
import { crearPaciente } from '../services/pacientesService';
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import { useAuth } from '../context/AuthContext';

export const useCrearPaciente = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { authData } = useAuth();


    const handleCrearPaciente = async (paciente: NuevoPacienteProps) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            //Llama a la función del endpoint para crear un paciente
            const token = authData?.token || "";
            console.log(authData)
            console.log("token consulta:", token)
            const msg = await crearPaciente(paciente, token);
            setSuccessMessage(msg.mensaje);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear el paciente');
        } finally {
            setLoading(false);
        }
    };

    return {
        handleCrearPaciente,
        loading,
        error,
        successMessage,
    };
};
