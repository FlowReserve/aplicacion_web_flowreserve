// src/hooks/useListarSolicitudesAdmin.ts
import { useEffect, useState, useCallback } from 'react';
import { listarConsultasPacientesAdminService } from '../services/solicitudService';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PaginatedResponse } from '../interfaces/PaginatedResponse';

interface UseSolicitudesAdminResult {
  solicitudes: PaginatedResponse<ResponseSolicitudPaciente> | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export const useListarSolicitudesAdmin = (
  token: string | null,
): UseSolicitudesAdminResult => {
  const [solicitudes, setSolicitudes] = useState<PaginatedResponse<ResponseSolicitudPaciente> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSolicitudes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const response = await listarConsultasPacientesAdminService(token);
      console.log("response en el useListar: ", response)
      if (response.status && response.responseObject) {
        setSolicitudes(response.responseObject);
        console.log("solicitudes: ", solicitudes);
      } else {
        throw new Error(response.message || 'Error al obtener solicitudes');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  return {
    solicitudes,
    loading,
    error,
    reload: fetchSolicitudes,
  };
};
