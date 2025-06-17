// src/hooks/useSolicitudesPacientePaginadas.ts
import { useState, useEffect, useCallback } from 'react';
import { listarSolicitudesPaciente } from '../../services/solicitudes/solicitudService';
import { useAuth } from '../../context/AuthContext';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../../interfaces/global/QueryParams';

export const useSolicitudesPacientePaginadas = (
  initialParams: QueryParams = { page: 0, size: 10, sort: 'date', sortDir: 'desc' }
) => {
  const { authData } = useAuth();

  const [solicitudes, setSolicitudes] = useState<ResponseSolicitudPaciente[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>(initialParams);

  const loadSolicitudes = useCallback(async () => {
    if (!authData?.token) return;

    setLoading(true);
    setError(null);

    try {
      const response: PaginatedResponse<ResponseSolicitudPaciente> = await listarSolicitudesPaciente(
        authData.token,
        {
          ...queryParams,
        }
      );

      setSolicitudes(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err: any) {
      setError(err.message || 'Error al cargar solicitudes paginadas');
    } finally {
      setLoading(false);
    }
  }, [authData?.token, queryParams]);

  useEffect(() => {
    loadSolicitudes();
  }, [loadSolicitudes]);

  return {
    solicitudes,
    totalPages,
    totalElements,
    loading,
    error,
    queryParams,
    setQueryParams,
    loadSolicitudes, // opcional si quieres refrescar manualmente
  };
};
