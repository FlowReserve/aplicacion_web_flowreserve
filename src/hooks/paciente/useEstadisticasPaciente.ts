// hooks/paciente/useEstadisticasPaciente.ts
import { useState, useEffect, useCallback } from 'react';
import { obtenerEstadisticasConsultasPacienteService } from '../../services/pacientesService';
import type { PacienteEstadisticasConsultasProps } from '../../interfaces/Paciente/PacienteEstadisticasConsultasProps';
import { useAuth } from '../../context/AuthContext';

export const useEstadisticasPaciente = (pacienteId: number) => {
    const { authData } = useAuth();
    const [data, setData] = useState<PacienteEstadisticasConsultasProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = authData?.token;

    const fetchData = useCallback(async () => {
        if (!pacienteId || !token) return;

        setLoading(true);
        setError(null);

        try {
            const result = await obtenerEstadisticasConsultasPacienteService(pacienteId, token);
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Error al obtener estadísticas del paciente');
        } finally {
            setLoading(false);
        }
    }, [pacienteId, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        updateEstadisticas: (actualizador: (prev: PacienteEstadisticasConsultasProps) => PacienteEstadisticasConsultasProps) => {
            setData(prev => prev ? actualizador(prev) : prev);
        }
    };
};
