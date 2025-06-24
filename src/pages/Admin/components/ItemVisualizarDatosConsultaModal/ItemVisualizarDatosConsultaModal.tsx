import React, { useState } from 'react';
import Modal from 'react-modal';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { EstadoType } from '../../../../types/estadoColores';
import { EstadoMap } from '../../../../types/estadoColores';
import ActualizarEstadoConsultaForm from './ActualizarEstadoConsultaForm/ActualizarEstadoConsultaForm';
import EstadoBadge from '../../../../components/webElements/EstadoBadge/EstadoBadge';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  solicitud: ResponseSolicitudPaciente;
  authToken: string;
  onEstadoActualizado: (id: number, nuevoEstado: EstadoType) => void;
}


const ItemVisualizarDatosConsultaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  solicitud,
  authToken,
  onEstadoActualizado,
}) => {
  console.log("solicitud:", solicitud)
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

        <div className="grid grid-cols-[1fr_auto] gap-4 items-start mt-2">
          {/* Columna 1: Listado de estados con scroll horizontal */}
          <div className="overflow-x-auto">
            <ul className="flex gap-3 items-center min-w-max">
              {solicitud.listadoEstados
                .sort((a, b) => new Date(a.fechaCambio).getTime() - new Date(b.fechaCambio).getTime())
                .map((estadoObj, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <EstadoBadge
                      className="min-w-[140px]"
                      estado={estadoObj.estado as EstadoType}
                      fecha={estadoObj.fechaCambio}
                    />
                    {index < solicitud.listadoEstados.length - 1 && (
                      <img
                        src="/web/icons/caret-right-solid.svg"
                        alt=""
                        width="16"
                        height="16"
                        className="inline-flex"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Columna 2: Formulario para actualizar estado */}
          <div>
            <ActualizarEstadoConsultaForm
              idConsulta={solicitud.id.toString()}
              token={authToken}
              estadoActual={estadoActual}
              onSuccess={(nuevoEstado: EstadoType) => {
                setEstadoActual(nuevoEstado);
                onEstadoActualizado(solicitud.id, nuevoEstado);
                console.log('Estado actualizado correctamente: ', nuevoEstado);
              }}
            />
          </div>
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
