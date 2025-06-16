export type EstadoType = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA' | 'CANCELADA';

export interface EstadoInfo {
  text: string;          // Texto a mostrar en UI
  className: string;     // Clases CSS para estilos (background, color, etc)
}

export const EstadoMap: Record<EstadoType, EstadoInfo> = {
  PENDIENTE: {
    text: 'Pendiente',
    className: 'bg-gray-300 text-black',
  },
    CANCELADA: {
    text: 'Cancelada',
    className: 'bg-red-300 text-black',
  },
  EN_PROCESO: {
    text: 'En proceso',
    className: 'bg-yellow-300 text-black',
  },
  COMPLETADA: {
    text: 'Completada',
    className: 'bg-green-300 text-black',
  },

};
