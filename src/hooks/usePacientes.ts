import { useEffect, useState } from 'react';
import { fetchPacientesByMedico } from '../services/pacientesService';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';

export const usePacientes = (medicoID: string) => {
  const [pacientes, setPacientes] = useState<PacienteProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPacientesByMedico(medicoID);
        setPacientes(result);
      } catch (err: any) {
        setError(err.message || 'Error al cargar pacientes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [medicoID]);

  return { pacientes, loading, error };
};
