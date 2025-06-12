import { useState } from 'react';
import { fetchPacientesList } from '../services/pacientesService';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import { useAuth } from '../context/AuthContext';
import type { PaginatedResponse } from '../interfaces/PaginatedResponse';

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
      const result = await fetchPacientesList(token, {size: 20});
      setPacientes(result.responseObject);
    } catch (err: any) {
      setError(err.message || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  return { pacientes, loading, error, loadPacientes };
};
