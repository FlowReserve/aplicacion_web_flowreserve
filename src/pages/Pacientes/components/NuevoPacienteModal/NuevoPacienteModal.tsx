// src/components/CrearPacienteModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import type { NuevoPacienteProps } from '../../../../interfaces/Paciente/NuevoPacienteProps';
import { useCrearPaciente } from '../../../../hooks/useCrearPaciente';

interface PacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPacienteCreado?: () => void; // callback opcional
}

const NuevoPacienteModal: React.FC<PacienteModalProps> = ({ isOpen, onClose, onPacienteCreado }) => {
  const [formData, setFormData] = useState<NuevoPacienteProps>({
    nombre: '',
    apellido: '',
    codigoNHC: ''
  });

  const { handleCrearPaciente, loading, error, successMessage } = useCrearPaciente();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCrearPaciente(formData);

    if (onPacienteCreado) onPacienteCreado();

  };

  useEffect(() => {
    // Limpia formulario al cerrar
    if (!isOpen) {
      setFormData({ nombre: '', apellido: '', codigoNHC: '' });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} className="modal bg-white w-full max-w-[600px] rounded p-4 focus:outline-none" overlayClassName="modal-overlay flex justify-center items-center">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear nuevo paciente</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
            <label htmlFor="nombrePaciente" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
                id='nombrePaciente'
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
        </div>
        <div>
            <label htmlFor="apellidoPaciente" className="text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input
                id='apellidoPaciente'
              type="text"
              name="apellido"
              placeholder="Apellidos"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
        </div>

        <div>
            <label htmlFor="codigoNHC" className="text-sm font-medium text-gray-700 mb-1">Código NHC</label>
            <input
            id='codigoNHC'
              type="text"
              name="codigoNHC"
              placeholder="EJ: 00000000X"
              value={formData.codigoNHC}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
        </div>

        <div className='min-h-[24px]'>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Creando...' : 'Crear paciente'}
        </button>
      </form>
    </Modal>
  );
};

export default NuevoPacienteModal;
