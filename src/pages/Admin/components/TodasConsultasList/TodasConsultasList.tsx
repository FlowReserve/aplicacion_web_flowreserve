import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useListarSolicitudesAdmin } from '../../../../hooks/useListarSolicitudesAdmin';
import SubirRespuestaConsultaModal from '../SubirRespuestaConsultaModal/SubirRespuestaconsultaModal';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';

const TodasConsultasList: React.FC = () => {
  const { authData } = useAuth();
  const { solicitudes, loading, error } = useListarSolicitudesAdmin(authData?.token ?? null);

  const [isPDFModalOpen, setPDFModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<ResponseSolicitudPaciente | null>(null);

  const abrirModalPDF = (solicitud: ResponseSolicitudPaciente) => {
    setSolicitudSeleccionada(solicitud);
    setPDFModalOpen(true);
  };

  const cerrarModalPDF = () => {
    setSolicitudSeleccionada(null);
    setPDFModalOpen(false);
  };

  if (loading) return <div className="p-6 max-w-[1200px] m-auto"><p>Cargando información de las solicitudes...</p></div>;
  if (error) return <div className="p-6 max-w-[1200px] m-auto"><p className="text-red-500">Error al cargar las solicitudes: {error}</p></div>;
  if (!solicitudes || solicitudes.content.length === 0) return <div className="p-6 max-w-[1200px] m-auto"><p>No hay solicitudes registradas.</p></div>;

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
                <td className="px-4 py-2 border-b">{new Date(solicitud.date).toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{solicitud.state}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Ver datos
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => abrirModalPDF(solicitud)}
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
