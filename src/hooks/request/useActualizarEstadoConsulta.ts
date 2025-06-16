import { useState } from 'react';
import { actualizarEstadoResponseService } from '../../services/Response/actualizarEstadoResponseService';
import type { EstadoType } from '../../types/estadoColores';

export function useActualizarEstadoConsulta() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actualizarEstado = async (id: string, nuevoEstado: EstadoType, token: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await actualizarEstadoResponseService(id, { estado: nuevoEstado }, token);
      return result;
    } catch (err: any) {
      console.error('Error al actualizar estado:', err);
      setError(err.message || 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    actualizarEstado,
    loading,
    error,
  };
}
