import React from 'react';
import type { EstadoType } from '../../../types/estadoColores';
import { EstadoMap } from '../../../types/estadoColores';

interface Props {
  estado: EstadoType;
  fecha: string;
  className?: string
}

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

const EstadoBadge: React.FC<Props> = ({ estado, fecha, className }) => {
  const estadoInfo = EstadoMap[estado] ?? {
    text: estado,
    className: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className= {`flex flex-col items-center w-full ${className}`}>
      <time 
        className="text-sm text-gray-600" 
        dateTime={fecha}
        title={`Última actualización: ${formatDate(fecha)}`}
      >
        {formatDate(fecha)}
      </time>
      <span
        className={`flex justify-center px-3 py-1 rounded font-medium w-full text-sm text-center ${estadoInfo.className}`}
        role="status"
        aria-live="polite"
        aria-label={`Estado: ${estadoInfo.text}`}
      >
        {estadoInfo.text}
      </span>
    </div>
  );
};

export default EstadoBadge;