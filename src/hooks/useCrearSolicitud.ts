// src/hooks/useCrearSolicitud.ts
import { useState } from 'react';
import { crearSolicitud } from '../services/solicitudService';
import type { SolicitudPacienteProps } from '../interfaces/Solicitud/SolicitudPacienteProps';
import { useAuth } from '../context/AuthContext';

export const useCrearSolicitud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authData } = useAuth(); // Asume que tienes un hook de auth para acceder al token

  const submitSolicitud = async (payload: SolicitudPacienteProps, archivoZip: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Agrega el JSON como Blob
      const jsonBlob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      formData.append('json', jsonBlob);

      // Agrega el archivo ZIP
      formData.append('archivoZip', archivoZip);
      const token = authData?.token || '';
      await crearSolicitud(token, formData);
    } catch (err: any) {
      console.error('Error al crear solicitud:', err);
      setError(err?.response?.data?.message || 'Error al crear solicitud');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitSolicitud,
    loading,
    error,
  };
};
