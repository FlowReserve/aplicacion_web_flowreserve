import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MedicoEstadisticasProps } from '../../../interfaces/Medico/MedicoEstadisticasProps';

interface Props {
  data: MedicoEstadisticasProps;
}

const COLORS = ['#f1cd38', '#e46d46', '#38f178', '#9ca3af']; //Amarillo rojo verde gris

const MedicoEstadisticasChart = ({ data }: Props) => {
  const chartData = [
    { name: 'En curso', value: data.enCurso },
    { name: 'Canceladas', value: data.canceladas },
    { name: 'Finalizadas', value: data.finalizadas },
    { name: 'Pendientes', value: data.pendientes },
  ];

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  if (total === 0) {
    return (
      <div className="h-[350px] w-[500px] flex items-center justify-center bg-blue-50 rounded text-lg">
        Aún no se ha realizado ninguna consulta.
      </div>
    );
  }

  return (
    <div className="h-[350px] w-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [`${value} informes`, name]} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicoEstadisticasChart;
