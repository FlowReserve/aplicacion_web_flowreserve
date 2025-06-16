import React, { useState } from 'react';
import { actualizarEstadoResponseService } from '../../../../../services/Response/actualizarEstadoResponseService';
import type { EstadoType } from '../../../../../types/estadoColores';
import { EstadoMap } from '../../../../../types/estadoColores';

interface Props {
  idConsulta: string;
  token: string;
  estadoActual: EstadoType;
  onSuccess: (nuevoEstado: EstadoType) => void;
}

const ActualizarEstadoConsultaForm: React.FC<Props> = ({
  idConsulta,
  token,
  estadoActual,
  onSuccess,
}) => {
  const [nuevoEstado, setNuevoEstado] = useState<EstadoType>(estadoActual);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await actualizarEstadoResponseService(
        idConsulta,
        { estado: nuevoEstado },
        token
      );
      console.log('result:', result);
      onSuccess(result.estado as EstadoType);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <select
        className="border rounded px-2 py-1"
        value={nuevoEstado}
        onChange={(e) => setNuevoEstado(e.target.value as EstadoType)}
        disabled={loading}
      >
        {Object.entries(EstadoMap).map(([key, { text }]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Actualizar'}
      </button>
    </form>
  );
};

export default ActualizarEstadoConsultaForm;
