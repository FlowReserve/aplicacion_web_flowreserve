import React, { useState, useEffect } from 'react';
import { usePacientes } from '../../../../hooks/usePacientes';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import NuevaSolicitudModal from '../NuevaSolicitudModal/NuevaSolicitudModal';

interface PacientesListProps {
    medicoID: string;
}

const PacientesList: React.FC<PacientesListProps> = () => {

    const { pacientes, loading, error, loadPacientes } = usePacientes();

    // Estado para la modal
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteSeleccionadoID, setPacienteSeleccionadoID] = useState<string | null>(null);


    useEffect(() => {
        loadPacientes(); 
    }, []);

    const handleNuevaSolicitud = (idPaciente: string) => {
        console.log('Crear nueva solicitud para:', idPaciente);
        setPacienteSeleccionadoID(idPaciente);
        setModalOpen(true);
        // Aquí podrías redirigir a un formulario o abrir un modal
    };

    const closeModal = () => {
        setModalOpen(false);
        setPacienteSeleccionadoID(null);
    };

    const handleVerSolicitudes = (pacienteId: string) => {
        console.log('Ver solicitudes para:', pacienteId);
        // Aquí podrías redirigir a una vista de historial
    };

    if (loading) return <p>Cargando pacientes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Listado de pacientes</h2>

            {pacientes.length === 0 ? (
                <p>No hay pacientes asignados a este médico.</p>
            ) : (
                <table className="min-w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border-b">Código NHC</th>
                            <th className="p-2 border-b">Nombre</th>
                            <th className="p-2 border-b">Apellido</th>
                            <th className="p-2 border-b text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((p, index) => (
                            <tr key={index} className="hover:bg-gray-200">
                                <td className="p-2 border-b w-[120px]">{p.nhc}</td>
                                <td className="p-2 border-b w-[150px]">{p.nombre}</td>
                                <td className="p-2 border-b">{p.apellido}</td>
                                <td className="p-2 border-b space-x-2 text-right">
                                    <CustomButton
                                        onClick={() => handleVerSolicitudes(p.nhc)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 w-[150px]"
                                    >
                                        Ver solicitudes
                                    </CustomButton>

                                    <CustomButton
                                        onClick={() => handleNuevaSolicitud(p.nhc)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded w-[150px]"
                                    >
                                        Nueva solicitud
                                    </CustomButton>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <NuevaSolicitudModal
                isOpen={modalOpen && pacienteSeleccionadoID !== null}
                onClose={closeModal}
                idPaciente={pacienteSeleccionadoID || ''}
            />

        </div>
    );
};

export default PacientesList;
