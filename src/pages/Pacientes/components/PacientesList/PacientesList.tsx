import { useState, useEffect } from 'react';
import { useListadoPacientes } from '../../../../hooks/paciente/useListadoPacientes';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import NuevaSolicitudModal from '../NuevaSolicitudModal/NuevaSolicitudModal';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import { useNavigate } from 'react-router-dom';
import type { QueryParams } from '../../../../interfaces/global/QueryParams';
import CustomButtonOutline from '../../../../components/interactive/CustomButtonOutline/CustomButtonOutline';

interface PacientesListProps {
    params?: QueryParams; // <-- parámetros opcionales
    nuevoPaciente?: PacienteProps | null;
}

const PacientesList = (
    { params, nuevoPaciente }: PacientesListProps) => {

    const { pacientes, loading, error, loadPacientes, setPacientes } = useListadoPacientes();
    const navigate = useNavigate();
    // Estado para la modal
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<PacienteProps | null>(null);


    useEffect(() => {
        if (
            nuevoPaciente &&
            pacientes &&
            !pacientes.content.some((p) => p.id === nuevoPaciente.id)
        ) {
            const nuevosPacientes = {
                ...pacientes,
                content: [nuevoPaciente, ...pacientes.content],
                totalElements: pacientes.totalElements + 1,
                numberOfElements: pacientes.numberOfElements + 1,
                size: pacientes.size + 1,
            };
            // 👇 Esto actualiza el estado interno del hook
            setPacientes(nuevosPacientes);
        }
    }, [nuevoPaciente]);

    useEffect(() => {
        loadPacientes(params);
    }, [params]);

    const handleNuevaSolicitud = (paciente: PacienteProps) => {
        setPacienteSeleccionado(paciente);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPacienteSeleccionado(null);
    };

    const handleVerSolicitudes = async (pacienteId: number) => {
        navigate(`/pacientes/${pacienteId}`);
    };

    if (loading) return <p>Cargando pacientes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overflow-x-auto w-full max-w-[1200px] m-auto">
            {pacientes?.size === 0 ? (
                <p>No hay pacientes asignados a este médico.</p>
            ) : (
                <table className="min-w-full border border-gray-300 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border-b"></th>
                            <th className="p-2 border-b">Código NHC</th>
                            <th className="p-2 border-b">Apellido</th>
                            <th className="p-2 border-b">Nombre</th>
                            <th className="p-2 border-b text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes?.content.map((p, index) => (
                            <tr key={index} className="hover:bg-gray-200">
                                <td className="p-2 border-b w-[50px] text-right pr-3 bg-gray-100 font-medium">{index +1}</td>
                                <td className="p-2 border-b w-[120px]">{p.codigoNHC}</td>
                                <td className="p-2 border-b">{p.apellido}</td>
                                <td className="p-2 border-b w-[150px]">{p.nombre}</td>
                                <td className="p-2 border-b space-x-2 text-right">
                                    <CustomButton
                                        onClick={() => handleVerSolicitudes(p.id)}
                                        className="text-white px-2 py-1 rounded w-[150px]"
                                    >
                                        Ver solicitudes
                                    </CustomButton>

                                    <CustomButtonOutline
                                        onClick={() => handleNuevaSolicitud(p)}
                                        className="bg-transparent hover:bg-secondary hover:text-white text-primary px-3 py-1 rounded w-[150px]"
                                    >
                                        Nueva solicitud
                                    </CustomButtonOutline>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <NuevaSolicitudModal
                isOpen={modalOpen && pacienteSeleccionado?.id !== null}
                onClose={closeModal}
                paciente={pacienteSeleccionado}
            />

        </div>
    );
};

export default PacientesList;
