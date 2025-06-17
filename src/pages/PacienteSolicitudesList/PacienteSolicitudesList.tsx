import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSolicitudesPaciente } from '../../hooks/useCargarSolicitudesPaciente';
import { useCargarPerfilPacienteByID } from '../../hooks/paciente/useCargarPerfilPacienteByID'
import ItemPacienteSolicitud from './components/ItemPacienteSolicitud/ItemPacienteSolicitud';
import TitlePacienteSolicitud from './components/TitlePacienteSolicitud/TitlePacienteSolicitud';

const PacienteSolicitudesList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pacienteId = id ? parseInt(id, 10) : null;

  const {
    paciente,
    loading: pacienteLoading,
    error: pacienteError,
    loadPaciente,
  } = useCargarPerfilPacienteByID(pacienteId);

  const {
    solicitudes,
    loading: solicitudesLoading,
    error: solicitudesError,
    loadSolicitudes,
  } = useSolicitudesPaciente(pacienteId);

  useEffect(() => {
    loadPaciente();
    loadSolicitudes();
  }, [loadPaciente, loadSolicitudes]);

  // Loading
  if (pacienteLoading || solicitudesLoading) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p>Cargando información del paciente y solicitudes...</p>
      </div>
    );
  }

  // Error
  if (pacienteError || solicitudesError) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p className="text-red-500">Error: {pacienteError || solicitudesError}</p>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="p-6 max-w-[1200px] m-auto">
        <p>No se encontró información del paciente.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1200px] m-auto">
      <TitlePacienteSolicitud paciente={paciente} className="py-6" />
      <hr className="w-full pb-6" />

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas para este paciente.</p>
      ) : (
        <ul className="space-y-4">
          {solicitudes.map((solicitud) => (
            <li key={solicitud.id}>
              <ItemPacienteSolicitud solicitud={solicitud} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PacienteSolicitudesList;
