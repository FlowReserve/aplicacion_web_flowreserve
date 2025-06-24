import { useAuth } from '../../../../../context/AuthContext';
import { useEstadisticasMedico} from '../../../../../hooks/medico/useEstadisticasMedico'
import MedicoEstadisticasChart from '../../../../../components/webElements/MedicoEstadisticasChart/MedicoEstadisticasChart';

const EstadisticasDashboard = () => {
  const { authData } = useAuth();
  const idMedico = authData?.id ?? 0;
  const token = authData?.token ?? '';

  const { data, loading, error } = useEstadisticasMedico(idMedico, token);

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="w-fit shadow border p-4 rounded">
      <h2 className="text-4xl font-semibold mb-6 text-primary text-center">Resumen de Informes</h2>
      <MedicoEstadisticasChart data={data} />
    </div>
  );
};

export default EstadisticasDashboard;
