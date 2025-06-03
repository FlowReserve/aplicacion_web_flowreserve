import { useState } from 'react';
import { crearSolicitud } from '../services/solicitudService';
import type { SolicitudPacienteProps } from '../interfaces/SolicitudPacienteProps'; 

export const useCrearSolicitud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSolicitud = async (solicitud: SolicitudPacienteProps) => {
    setLoading(true);
    setError(null);

    try {
      const result = await crearSolicitud(solicitud);
      return result;
    } catch (err: any) {
      setError(err.message || 'Error desconocido al crear solicitud');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitSolicitud, loading, error };
};
