// src/hooks/useCrearPaciente.ts
import { useState } from 'react';
import { crearNuevoPacienteService } from '../services/pacientesService';
import type { NuevoPacienteProps } from '../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../interfaces/Paciente/PacienteProps';
import { useAuth } from '../context/AuthContext';

export const useCrearPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdPaciente, setCreatedPaciente] = useState<PacienteProps | null>(null);

  const { authData } = useAuth();

  const handleCrearPaciente = async (paciente: NuevoPacienteProps) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setCreatedPaciente(null);

    try {
      const token = authData?.token || '';
      const newPaciente = await crearNuevoPacienteService(paciente, token);
        console.log("paciente creado: ", newPaciente)
      setCreatedPaciente(newPaciente);
      setSuccessMessage('Paciente creado exitosamente');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el paciente');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCrearPaciente,
    loading,
    error,
    successMessage,
    createdPaciente,
  };
};
