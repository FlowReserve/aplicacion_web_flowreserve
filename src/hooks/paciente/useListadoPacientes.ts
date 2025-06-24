// src/hooks/usePacientes.ts

import { useState, useCallback } from 'react';
import { obtenerListadoPacientesService } from '../../services/pacientesService';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import type { PaginatedResponse } from '../../interfaces/global/PaginatedResponse';
import type { QueryParams } from '../../interfaces/global/QueryParams';
import { useAuth } from '../../context/AuthContext';

export const useListadoPacientes = () => {
  const [pacientes, setPacientes] = useState<PaginatedResponse<PacienteProps>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authData } = useAuth();

  const loadPacientes = useCallback(
    async (params: QueryParams = { page: 0, size: 25, sort: 'id', sortDir: 'desc' }) => {
      if (!authData?.token) return;

      setLoading(true);
      setError(null);

      try {
        const result = await obtenerListadoPacientesService(authData.token, params);
        setPacientes(result);
        console.log("pacientes:", result)
      } catch (err: any) {
        setError(err.message || 'Error al cargar pacientes');
      } finally {
        setLoading(false);
      }
    },
    [authData?.token]
  );

  return { pacientes, loading, error, loadPacientes, setPacientes };
};
