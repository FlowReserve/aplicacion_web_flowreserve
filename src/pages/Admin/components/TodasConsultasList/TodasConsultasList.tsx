import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useListarSolicitudesAdmin } from '../../../../hooks/useListarSolicitudesAdmin';
import SubirRespuestaConsultaModal from '../SubirRespuestaConsultaModal/SubirRespuestaconsultaModal';
import ItemVisualizarDatosConsultaModal from '../ItemVisualizarDatosConsultaModal/ItemVisualizarDatosConsultaModal';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import CustomButtonOutline from '../../../../components/interactive/CustomButtonOutline/CustomButtonOutline';
import { EstadoMap } from '../../../../types/estadoColores';
import type { EstadoType } from '../../../../types/estadoColores';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';

const TodasConsultasList: React.FC = () => {
  const { authData } = useAuth();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { solicitudes, loading, error, reload, setParams } = useListarSolicitudesAdmin(authData?.token ?? null, {
    page: 0,
    size: 20,
  });

  const [solicitudesLocal, setSolicitudesLocal] = useState<ResponseSolicitudPaciente[]>([]);

  useEffect(() => {
    if (solicitudes?.content) {
      setSolicitudesLocal(prev => (page === 0 ? solicitudes.content : [...prev, ...solicitudes.content]));
      setHasMore(!solicitudes.last);
    }
  }, [solicitudes]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          setPage(nextPage);
          setParams({ page: nextPage, size: 20 });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, setParams]
  );

  const actualizarEstadoSolicitud = (id: number, nuevoEstado: EstadoType) => {
    setSolicitudesLocal(prev =>
      prev.map(s => (s.id === id ? { ...s, state: nuevoEstado } : s))
    );
  };

  const [isVerDatosOpen, setVerDatosOpen] = useState(false);
  const [solicitudVerDatos, setSolicitudVerDatos] = useState<ResponseSolicitudPaciente | null>(null);

  const abrirModalVerDatos = (solicitud: ResponseSolicitudPaciente) => {
    setSolicitudVerDatos(solicitud);
    setVerDatosOpen(true);
  };

  const cerrarModalVerDatos = () => {
    setSolicitudVerDatos(null);
    setVerDatosOpen(false);
  };

  const [isPDFModalOpen, setPDFModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<ResponseSolicitudPaciente | null>(null);

  const abrirModalPDF = (solicitud: ResponseSolicitudPaciente) => {
    if (isPDFModalOpen) return;
    setSolicitudSeleccionada(solicitud);
    setPDFModalOpen(true);
  };

  const cerrarModalPDF = () => {
    setSolicitudSeleccionada(null);
    setPDFModalOpen(false);
  };

  if (loading && solicitudesLocal.length === 0) {
    return (
      <div className="m-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        <p>Cargando información de las solicitudes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">Error al cargar las solicitudes</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (solicitudesLocal.length === 0) {
    return (
      <div className="m-auto bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>No hay solicitudes registradas.</p>
      </div>
    );
  }

  return (
    <div className="m-auto">
      <div className="flex justify-between my-4">
        <h2 className="text-xl font-semibold">Todas las Consultas</h2>
        <CustomButton onClick={() => {
          setPage(0);
          setSolicitudesLocal([]);
          setParams({ page: 0, size: 20 });
          reload();
        }}>
          Actualizar consultas
        </CustomButton>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2 border-b"></th>
              <th className="px-4 py-2 border-b">Código</th>
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Estado</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesLocal.map((solicitud, index) => {
              const esUltimo = index === solicitudesLocal.length - 1;
              const estado = solicitud.state as EstadoType;
              const estadoInfo = EstadoMap[estado] ?? { text: estado, className: 'bg-gray-100 text-gray-800' };

              return (
                <tr key={solicitud.id} className="text-sm hover:bg-gray-50" ref={esUltimo ? lastItemRef : null}>
                  <td className="px-4 py-2 border-b">{index +1}</td>
                  <td className="px-4 py-2 border-b">{solicitud.codigo}</td>
                  <td className="px-4 py-2 border-b">{new Date(solicitud.date).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">
                    <span className={`flex justify-center px-2 py-1 rounded font-medium w-[120px] ${estadoInfo.className}`}>
                      {estadoInfo.text}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b text-center space-x-2">
                    <CustomButton className="px-3 py-1 w-[120px]" onClick={() => abrirModalVerDatos(solicitud)}>
                      Ver datos
                    </CustomButton>
                    <CustomButtonOutline
                      className="w-[120px]"
                      onClick={() => abrirModalPDF(solicitud)}
                      disabled={isPDFModalOpen || estado === 'CANCELADA' || estado === 'COMPLETADA'}
                      title={isPDFModalOpen ? "Modal ya está abierta" : "Subir PDF de respuesta"}
                    >
                      Subir PDF
                    </CustomButtonOutline>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Div para scroll infinito */}
        <div ref={lastItemRef} className="h-1" />
      </div>

      {/* Modal: ver datos consulta */}
      {solicitudVerDatos && (
        <ItemVisualizarDatosConsultaModal
          isOpen={isVerDatosOpen}
          onClose={cerrarModalVerDatos}
          solicitud={solicitudVerDatos}
          authToken={authData?.token || ''}
          onEstadoActualizado={actualizarEstadoSolicitud}
        />
      )}

      {/* Modal: subir PDF */}
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
