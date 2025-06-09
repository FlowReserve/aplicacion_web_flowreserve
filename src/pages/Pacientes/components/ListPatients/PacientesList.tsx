import { useState, useEffect } from 'react';
import { usePacientes } from '../../../../hooks/usePacientes';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import NuevaSolicitudModal from '../NuevaSolicitudModal/NuevaSolicitudModal';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const PacientesList = () => {

    const { pacientes, loading, error, loadPacientes } = usePacientes();
    const { authData } = useAuth();
    const navigate = useNavigate();
    // Estado para la modal
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteSeleccionadoID, setPacienteSeleccionadoID] = useState<number | null>(null); //Id del paciente seleccionado para pasar como props (Form añadir solicitud)
    const [pacienteSeleccionadoNHC, setPacienteSeleccionadoNHC] = useState<string | null>(); //NHC del paciente seleccionado para pasar como props (Form  añadir solicitud)


    useEffect(() => {
        loadPacientes();
    }, []);

    const handleNuevaSolicitud = (idPaciente: number, pacienteNHC: string) => {
        setPacienteSeleccionadoNHC(pacienteNHC);
        setPacienteSeleccionadoID(idPaciente);
        setModalOpen(true);
        // Aquí podrías redirigir a un formulario o abrir un modal
    };

    const closeModal = () => {
        setModalOpen(false);
        setPacienteSeleccionadoID(null);
    };

    const handleVerSolicitudes = async (pacienteId: number) => {
        navigate(`/pacientes/${pacienteId}`);
        // if (!authData?.token) {
        //     console.error("No hay token de autenticación");
        //     return;
        // }

        // try {
        //     const solicitudes = await listarSolicitudesAsociadasPaciente(authData.token, pacienteId.toString());
        //     console.log(`Solicitudes del paciente ${pacienteId}:`, solicitudes.content);
        // } catch (error) {
        //     console.error("Error al cargar solicitudes:", error);
        // }
    };

    if (loading) return <p>Cargando pacientes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 overflow-x-auto max-w-[1200px] m-auto">
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
                                        onClick={() => handleVerSolicitudes(p.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 w-[150px]"
                                    >
                                        Ver solicitudes
                                    </CustomButton>

                                    <CustomButton
                                        onClick={() => handleNuevaSolicitud(p.id, p.nhc)}
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
                idPaciente={pacienteSeleccionadoID || 0}
                NHCPaciente={pacienteSeleccionadoNHC || 'null'}
            />

        </div>
    );
};

export default PacientesList;
