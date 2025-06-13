import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useListarSolicitudesAdmin } from '../../../../hooks/useListarSolicitudesAdmin';
import SubirRespuestaConsultaModal from '../SubirRespuestaConsultaModal/SubirRespuestaconsultaModal';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import { EstadoMap } from '../../../../types/estadoColores';
import type { EstadoType } from '../../../../types/estadoColores';

const TodasConsultasList: React.FC = () => {
  const { authData } = useAuth();
  const { solicitudes, loading, error } = useListarSolicitudesAdmin(authData?.token ?? null);

  const [isPDFModalOpen, setPDFModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<ResponseSolicitudPaciente | null>(null);



  const abrirModalPDF = (solicitud: ResponseSolicitudPaciente) => {
    // Prevenir abrir múltiples modales
    if (isPDFModalOpen) {
      console.warn("Modal ya está abierta");
      return;
    }

    setSolicitudSeleccionada(solicitud);
    setPDFModalOpen(true);
  };

  const cerrarModalPDF = () => {
    setSolicitudSeleccionada(null);
    setPDFModalOpen(false);
  };

  if (loading) return (
    <div className="p-6 max-w-[1200px] m-auto">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        <p>Cargando información de las solicitudes...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 max-w-[1200px] m-auto">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">Error al cargar las solicitudes</p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );

  if (!solicitudes || solicitudes.content.length === 0) return (
    <div className="p-6 max-w-[1200px] m-auto">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>No hay solicitudes registradas.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-[1200px] m-auto">
      <h2 className="text-xl font-semibold mb-4">Todas las Consultas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Código</th>
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Estado</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.content.map((solicitud) => (
              <tr key={solicitud.id} className="text-sm hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{solicitud.id}</td>
                <td className="px-4 py-2 border-b">{solicitud.codigo}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(solicitud.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {(() => {
                    const estado = solicitud.state as EstadoType;
                    const estadoInfo = EstadoMap[estado] ?? { text: estado, className: 'bg-gray-100 text-gray-800' };
                    return (
                      <span className={`flex justify-center px-2 py-1 rounded  font-medium w-[120px] ${estadoInfo.className}`}>
                        {estadoInfo.text}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                    Ver datos
                  </button>
                  <button
                    className={`px-3 py-1 rounded transition-colors ${isPDFModalOpen
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    onClick={() => abrirModalPDF(solicitud)}
                    disabled={isPDFModalOpen}
                    title={isPDFModalOpen ? "Modal ya está abierta" : "Subir PDF de respuesta"}
                  >
                    Subir PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de subir PDF */}
      {solicitudSeleccionada && (
        <SubirRespuestaConsultaModal
          isOpen={isPDFModalOpen}
          onClose={cerrarModalPDF}
          solicitud={solicitudSeleccionada}
        />
      )}
    </div>
  );
};

export default TodasConsultasList;