// src/hooks/useCrearSolicitud.ts
import { useState } from 'react';
import { crearSolicitudPacienteService } from '../services/solicitudes/solicitudService';
import type { SolicitudPacienteProps } from '../interfaces/Solicitud/SolicitudPacienteProps';
import { useAuth } from '../context/AuthContext';
import type { ResponseSolicitudPaciente } from '../interfaces/Solicitud/ResponseSolicitudPaciente';

export const useCrearSolicitud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authData } = useAuth(); // Asume que tienes un hook de auth para acceder al token

  const submitSolicitud = async (
    payload: SolicitudPacienteProps, 
    archivoZip: File
  ): Promise<ResponseSolicitudPaciente> => {
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
      const nuevaSolicitud =  await crearSolicitudPacienteService(token, formData);

      return nuevaSolicitud; //Devuelve la nueva solicitud que ha sido creada en la aplicación.
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
