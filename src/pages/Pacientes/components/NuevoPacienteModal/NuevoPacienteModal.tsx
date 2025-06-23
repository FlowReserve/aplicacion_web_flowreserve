// src/components/NuevoPacienteModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioNuevoPaciente from '../../../../components/forms/FormularioNuevoPaciente/FormularioNuevoPaciente';
import { useCrearPaciente } from '../../../../hooks/useCrearPaciente';
import type { NuevoPacienteProps } from '../../../../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';

interface PacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPacienteCreado?: (paciente: PacienteProps) => void;
}

const NuevoPacienteModal: React.FC<PacienteModalProps> = ({ isOpen, onClose, onPacienteCreado }) => {
  const [formData, setFormData] = useState<NuevoPacienteProps>({
    nombre: '',
    apellido: '',
    codigoNHC: ''
  });

  const {
    handleCrearPaciente,
    loading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    createdPaciente
  } = useCrearPaciente();

  // Observa cuando el estado de createdPaciente del hook se actualiza para propagar al padre los datos del nuevo paciente.
  useEffect(() => {
    if (createdPaciente && onPacienteCreado) {
      onPacienteCreado(createdPaciente); // propaga al padre
    }
  }, [createdPaciente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCrearPaciente(formData);
  };

  // Cada vez el formulario se cierra, se limpia tanto los datos del formulario como los mensajes.
  useEffect(() => {
    if (!isOpen) {
      setFormData({ nombre: '', apellido: '', codigoNHC: '' });
      setError(null);
      setSuccessMessage(null);
      
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal bg-white w-full max-w-[600px] rounded p-4 focus:outline-none"
      overlayClassName="modal-overlay flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear nuevo paciente</h2>
      <FormularioNuevoPaciente
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        successMessage={successMessage}
      />
    </Modal>
  );
};

export default NuevoPacienteModal;
