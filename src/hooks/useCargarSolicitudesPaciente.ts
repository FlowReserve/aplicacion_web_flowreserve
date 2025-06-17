import { useState, useCallback } from 'react';
import { listarSolicitudesPacienteByIDService } from '../services/solicitudes/solicitudService';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';
import { useAuth } from '../context/AuthContext';
import type { PaginatedResponse } from '../interfaces/global/PaginatedResponse';

export const useSolicitudesPaciente = (idPaciente: number | null) => {
  const [solicitudes, setSolicitudes] = useState<ResponseSolicitudPaciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authData } = useAuth();

  // useCallback para evitar recrear la función innecesariamente
  const loadSolicitudes = useCallback(async () => {
    if (!idPaciente) return;

    setLoading(true);
    setError(null);

    try {
      const token = authData?.token || '';
      const result: PaginatedResponse<ResponseSolicitudPaciente> = await listarSolicitudesPacienteByIDService(idPaciente, token);
      setSolicitudes(result.content);
    } catch (err: any) {
      setError(err.message || 'Error al cargar solicitudes');
    } finally {
      setLoading(false);
    }
  }, [authData?.token, idPaciente]);

  return { solicitudes, loading, error, loadSolicitudes };
};
