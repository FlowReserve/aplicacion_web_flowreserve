import ItemPacienteSolicitud from '../../../../PacienteSolicitudesList/components/ItemPacienteSolicitud/ItemPacienteSolicitud';
import { useSolicitudesPacientePaginadas } from '../../../../../hooks/solicitudes/useSolicitudesPacientePaginadas';
import { Link } from 'react-router-dom';

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
    return <p>No hay consultas recientes realizadas.</p>;
  }

  return (
    <section className='p-4 border rounded bg-gray-50'>
        <div className='flex justify-between items-end pb-4'>
            <h2 className='text-5xl py-3 text-primary font-bold'>Tús últimas consultas creadas.</h2>
            <Link className='rounded px-3 py-2 bg-primary text-white hover:bg-accent transition-colors w-[180px] text-center' to={"/solicitudes"}>Ver todas</Link>
        </div>
        <ul className="space-y-4">
          {solicitudes.map((solicitud) => (
            <li key={solicitud.id}>
              <ItemPacienteSolicitud solicitud={solicitud} />
            </li>
          ))}
        </ul>
    </section>
  );
};

export default UltimasConsultasList;
