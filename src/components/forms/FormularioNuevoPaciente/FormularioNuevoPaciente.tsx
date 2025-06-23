// src/components/FormularioPaciente.tsx
import React from 'react';
import type { NuevoPacienteProps } from '../../../interfaces/Paciente/NuevoPacienteProps';
    

interface FormularioNuevoPacienteProps {
  formData: NuevoPacienteProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

const FormularioNuevoPaciente: React.FC<FormularioNuevoPacienteProps> = ({
  formData,
  onChange,
  onSubmit,
  loading = false,
  error,
  successMessage,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="nombrePaciente" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          id='nombrePaciente'
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
};

export default FormularioNuevoPaciente;
