// hooks/medico/useEstadisticasMedico.ts
import { useEffect, useState, useCallback } from 'react';
import { obtenerMedicoEstadisticasProfileService } from '../../services/Medico/medicoEstadisticasService';
import type { MedicoEstadisticasProps } from '../../interfaces/Medico/MedicoEstadisticasProps';

export const useEstadisticasMedico = (id: number, token: string) => {
  const [data, setData] = useState<MedicoEstadisticasProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEstadisticas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const estadisticas = await obtenerMedicoEstadisticasProfileService(id, token);
      setData(estadisticas);
    } catch (err: any) {
      setError(err.message || 'Error al obtener estadísticas del médico');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    if (id && token) {
      fetchEstadisticas();
    }
  }, [fetchEstadisticas]);

  return {
    data,
    loading,
    error,
    refetch: fetchEstadisticas,
    updateEstadisticas: (updater: (prev: MedicoEstadisticasProps) => MedicoEstadisticasProps) => {
      setData(prev => (prev ? updater(prev) : prev));
    }
  };
};
