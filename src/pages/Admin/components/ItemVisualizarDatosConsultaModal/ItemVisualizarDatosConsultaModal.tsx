import React, { useState } from 'react';
import Modal from 'react-modal';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { EstadoType } from '../../../../types/estadoColores';
import { EstadoMap } from '../../../../types/estadoColores';
import ActualizarEstadoConsultaForm from './ActualizarEstadoConsultaForm/ActualizarEstadoConsultaForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  solicitud: ResponseSolicitudPaciente;
  authToken: string;
  onEstadoActualizado: (id: number, nuevoEstado: EstadoType) => void; // ✅ NUEVO
}

const ItemVisualizarDatosConsultaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  solicitud,
  authToken,
  onEstadoActualizado, // ✅ NUEVO
}) => {
  const [estadoActual, setEstadoActual] = useState<EstadoType>(solicitud.state as EstadoType);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalles de la Solicitud"
      className="bg-white p-6 w-[80%] min-h-[90dvh] rounded-lg shadow-lg mx-auto flex flex-col outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center z-50"
    >
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-xl font-semibold mb-4 text-center">Detalles de la Solicitud</h2>
        <div className="flex justify-between gap-2">
          <p className="text-lg"><strong>Código:</strong> {solicitud.codigo}</p>
          <p className="text-lg"><strong>Fecha:</strong> {new Date(solicitud.date).toLocaleString()}</p>
        </div>

        <div className="flex gap-3 items-center mt-2">
          <p className="text-lg"><strong>Estado:</strong> </p>
          <p className="inline-flex flex-col">
            {(() => {
              const estadoInfo = EstadoMap[estadoActual] ?? {
                text: estadoActual,
                className: 'bg-gray-100 text-gray-800',
              };
              return (
                <span
                  className={`flex justify-center px-2 py-1 rounded font-medium w-[120px] ${estadoInfo.className}`}
                >
                  {estadoInfo.text}
                </span>
              );
            })()}
            <span className="text-sm">{new Date(solicitud.date).toLocaleString()}</span>
          </p>

          <ActualizarEstadoConsultaForm
            idConsulta={solicitud.id.toString()}
            token={authToken}
            estadoActual={estadoActual}
            onSuccess={(nuevoEstado: EstadoType) => {
              setEstadoActual(nuevoEstado);
              onEstadoActualizado(solicitud.id, nuevoEstado); // ✅ NUEVO
              console.log('Estado actualizado correctamente: ', nuevoEstado);
            }}
          />
        </div>

        <hr />
        <div className="flex gap-3">
          <p><strong>Presión Sistólica:</strong> {solicitud.presionSistolica} mmHg</p>
          <p><strong>Presión Diastólica:</strong> {solicitud.presionDiastolica} mmHg</p>
        </div>

        <div>
          <p><strong>Comentarios:</strong>
            <br /> {solicitud.comentarios || 'Sin comentarios'}
          </p>
        </div>
        <hr />
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ItemVisualizarDatosConsultaModal;
