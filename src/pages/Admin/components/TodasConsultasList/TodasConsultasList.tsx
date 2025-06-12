import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useListarSolicitudesAdmin } from '../../../../hooks/useListarSolicitudesAdmin';
import ItemPacienteSolicitud from '../../../PacienteSolicitudesList/components/ItemPacienteSolicitud/ItemPacienteSolicitud';

const TodasConsultasList: React.FC = () => {
  const { authData } = useAuth();
  const { solicitudes, loading, error } = useListarSolicitudesAdmin(authData?.token ?? null);

  if (loading) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p>Cargando información de las solicitudes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p className="text-red-500">Error al cargar las solicitudes: {error}</p>
      </div>
    );
  }

  if (!solicitudes || solicitudes.content.length === 0) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p>No hay solicitudes registradas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1200px] m-auto">
      <h2 className="text-xl font-semibold mb-4">Todas las Consultas</h2>
      <ul className="space-y-4">
        {solicitudes.content.map((solicitud) => (
          <li key={solicitud.id}>
            <ItemPacienteSolicitud solicitud={solicitud} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodasConsultasList;
