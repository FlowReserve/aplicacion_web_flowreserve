// src/hooks/usePacienteById.ts
import { useState, useCallback } from 'react';
import { obtenerInformacionPacienteByIDService } from '../../services/pacientesService';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import { useAuth } from '../../context/AuthContext';

export const useCargarPerfilPacienteByID = (pacienteId: number | null) => {
    const [paciente, setPaciente] = useState<PacienteProps | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { authData } = useAuth();

    const loadPaciente = useCallback(async () => {
        if (!authData?.token || !pacienteId) return;

        setLoading(true);
        setError(null);

        try {
            const response: PacienteProps = await obtenerInformacionPacienteByIDService(pacienteId, authData.token);
            setPaciente(response);
        }
        catch (err: any) {
            setError(err.message || 'Error al cargar información del paciente');
        } finally {
            setLoading(false);
        }
    }, [authData?.token, pacienteId]);

    return { paciente, loading, error, loadPaciente };
};
