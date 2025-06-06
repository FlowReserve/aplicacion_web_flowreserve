import React from 'react';
import { useParams } from 'react-router-dom';

const PacienteSolicitudesList: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1>Detalle paciente ID: {id}</h1>
      <p>Aquí irá la lista de solicitudes asociadas (más adelante).</p>
    </div>
  );
};

export default PacienteSolicitudesList;
