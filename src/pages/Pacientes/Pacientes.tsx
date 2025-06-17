// src/pages/Pacientes/Pacientes.tsx
import PacientesList from './components/PacientesList/PacientesList';
import TitlePacientesList from './components/TitlePacientesList/TitlePacientesList';

const Pacientes = () => {
  return (
    <div className="max-w-[1200px] mt-6 m-auto">

      <TitlePacientesList className='py-6'/>
      <PacientesList  params={{ size: 25, sortDir: 'desc'}}/>
    </div>
  );
};

export default Pacientes;
