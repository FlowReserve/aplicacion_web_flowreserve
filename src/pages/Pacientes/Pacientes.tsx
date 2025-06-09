// src/pages/Pacientes/Pacientes.tsx
import { useState } from 'react';
import PacientesList from './components/ListPatients/PacientesList';
import NuevoPacienteModal from './components/NuevoPacienteModal/NuevoPacienteModal';
import CustomButton from '../../components/CustomButton/CustomButton';

const Pacientes = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <CustomButton
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir Paciente
        </CustomButton>
      </div>

      <PacientesList  />

      <NuevoPacienteModal
        isOpen={modalOpen}
        onClose={closeModal}
        onPacienteCreado={() => {
          // aquí podrías recargar la lista de pacientes
          console.log("Paciente creado correctamente.");
        }}
      />
    </div>
  );
};

export default Pacientes;
