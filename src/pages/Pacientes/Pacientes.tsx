// src/pages/Pacientes/Pacientes.tsx
import { useState } from 'react';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import PacientesList from './components/PacientesList/PacientesList';
import TitlePacientesList from './components/TitlePacientesList/TitlePacientesList';

const Pacientes = () => {

  const [pacienteCreado, setPacienteCreado] = useState<PacienteProps | null>(null);

  const handlePacienteCreado = (paciente: PacienteProps) => {
    console.log("paciente creado recibido en el padre de todos: ", paciente);
    setPacienteCreado(paciente);
  }

  return (
    <div className="max-w-[1200px] mt-6 m-auto">

      <TitlePacientesList className='py-6' onPacienteCreado={handlePacienteCreado}/>
      <PacientesList  params={{ size: 25, sortDir: 'desc'}} nuevoPaciente={pacienteCreado}/>
    </div>
  );
};

export default Pacientes;
