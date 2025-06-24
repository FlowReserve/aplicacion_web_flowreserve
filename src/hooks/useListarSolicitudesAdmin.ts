// src/hooks/useListarSolicitudesAdmin.ts
import { useEffect, useState, useCallback } from 'react';
import { listarConsultasPacientesAdminService } from '../services/solicitudes/solicitudService';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PaginatedResponse } from '../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../interfaces/global/QueryParams';

interface UseSolicitudesAdminResult {
  solicitudes: PaginatedResponse<ResponseSolicitudPaciente> | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

// src/hooks/useListarSolicitudesAdmin.ts
export const useListarSolicitudesAdmin = (
  token: string | null,
  initialParams?: QueryParams
): UseSolicitudesAdminResult & { setParams: (params: QueryParams) => void } => {
  const [params, setParams] = useState<QueryParams>({
    page: 0,
    size: 20,
    ...initialParams,
  });

  const [solicitudes, setSolicitudes] = useState<PaginatedResponse<ResponseSolicitudPaciente> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSolicitudes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await listarConsultasPacientesAdminService(token, params);
      if (response.status && response.responseObject) {
        setSolicitudes(response.responseObject);
      } else {
        throw new Error(response.message || 'Error al obtener solicitudes');
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  }, [token, params]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  return {
    solicitudes,
    loading,
    error,
    reload: fetchSolicitudes,
    setParams,
  };
};
