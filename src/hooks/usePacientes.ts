import { useState } from 'react';
import { fetchPacientesListService } from '../services/pacientesService';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import { useAuth } from '../context/AuthContext';
import type { PaginatedResponse } from '../interfaces/global/PaginatedResponse';

export const usePacientes = () => {
  const [pacientes, setPacientes] = useState<PaginatedResponse<PacienteProps>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { authData } = useAuth();

  const loadPacientes = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = authData?.token || "";
      const result = await fetchPacientesListService(token, {size: 25,page: 0});
      setPacientes(result);
    } catch (err: any) {
      setError(err.message || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  return { pacientes, loading, error, loadPacientes };
};
