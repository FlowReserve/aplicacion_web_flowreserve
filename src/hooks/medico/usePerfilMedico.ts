import { useEffect, useState, useCallback } from 'react';
import { obtenerPerfilMedicoService } from '../../services/Medico/medicoService';
import type { MedicoProfileResponseProps } from '../../interfaces/Medico/MedicoProfileResponseProps';

export const usePerfilMedico = (token: string) => {
  const [data, setData] = useState<MedicoProfileResponseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerfil = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const perfil = await obtenerPerfilMedicoService(token);
      setData(perfil);
    } catch (err: any) {
      setError(err.message || 'Error al obtener el perfil del médico');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPerfil();
    }
  }, [fetchPerfil, token]);

  return {
    data,
    loading,
    error,
    refetch: fetchPerfil,
  };
};
