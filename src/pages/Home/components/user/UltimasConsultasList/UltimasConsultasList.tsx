import ItemPacienteSolicitud from '../../../../PacienteSolicitudesList/components/ItemPacienteSolicitud/ItemPacienteSolicitud';
import { useSolicitudesPacientePaginadas } from '../../../../../hooks/solicitudes/useSolicitudesPacientePaginadas';


const UltimasConsultasList = () => {
  const {
    solicitudes,
    loading,
    error,
  } = useSolicitudesPacientePaginadas({
    page: 0,
    size: 3,
    sort: 'date', 
    sortDir: 'desc',
  });

  if (loading) {
    return <p className="text-gray-500">Cargando últimas consultas...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (solicitudes.length === 0) {
    return <p>No hay consultas recientes para este paciente.</p>;
  }

  return (
    <ul className="space-y-4">
      {solicitudes.map((solicitud) => (
        <li key={solicitud.id}>
          <ItemPacienteSolicitud solicitud={solicitud} />
        </li>
      ))}
    </ul>
  );
};

export default UltimasConsultasList;
