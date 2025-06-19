import React, { useEffect, useState } from 'react';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import ItemStats from '../../../../components/ItemStats/ItemStats';
import NuevoPacienteModal from '../NuevoPacienteModal/NuevoPacienteModal';
import type { MedicoProfileResponseProps } from '../../../../interfaces/Medico/MedicoProfileResponseProps';
import { obtenerPerfilMedicoService } from '../../../../services/Medico/medicoService';
import { useAuth } from '../../../../context/AuthContext';
import { useEstadisticasMedico } from '../../../../hooks/medico/useEstadisticasMedico';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';

interface Props {
    className?: string;
    onPacienteCreado?: (paciente: PacienteProps) => void; //Callback cuando un paciente es creado envia información al padre
}

const TitlePacientesList: React.FC<Props> = ({ className, onPacienteCreado }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [medico, setMedico] = useState<MedicoProfileResponseProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { authData } = useAuth();
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const { data: estadisticas, loading: loadingStats, error: errorStats } = useEstadisticasMedico(
        authData?.id || 0,
        authData?.token || ''
    );

    useEffect(() => {
        const fetchMedico = async () => {
            try {
                const token = authData?.token || "";
                if (!token) {
                    setError("Token no encontrado");
                    return;
                }

                const response: MedicoProfileResponseProps = await obtenerPerfilMedicoService(token);

                if (response != null) {
                    setMedico(response);
                } else {
                    setError("Error al cargar el perfil del médico");
                }
            } catch (err) {
                setError("Ocurrió un error al obtener el perfil del médico.");
            } finally {
                setLoading(false);
            }
        };

        fetchMedico();
    }, []);

    if (loadingStats) return <p>Cargando perfil del médico...</p>;
    if (errorStats) return <p className="text-red-600">{errorStats}</p>;

    return (
        <>
            <header className={`flex flex-col items-center lg:flex-row justify-between ${className} gap-4`}>
                <div className='flex gap-3'>
                    <img src="/web/icons/user-solid.svg" className="w-20 " alt="Paciente" />
                    <div className='flex flex-col justify-between'>
                        <h1 className={`text-2xl font-semibold flex items-center gap-2 `}>
                            Pacientes de <span className="font-bold">{medico?.nombre} {medico?.apellido}</span>
                        </h1>
                        <CustomButton className='flex justify-center' onClick={openModal}>
                            <img src="/web/icons/plus-solid.svg" alt="Icono añadir solicitud" className='w-4 inline-block mr-1' />
                            Añadir nuevo paciente
                        </CustomButton>
                    </div>
                </div>

                <ul className='flex gap-2'>
                    <li>
                        <ItemStats number={estadisticas?.totalPacientes || 0}>Pacientes <br /> totales</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={estadisticas?.enCurso || 0}>Consultas <br /> en curso</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={estadisticas?.finalizadas || 0}>Consultas <br /> finalizadas</ItemStats>
                    </li>
                </ul>
            </header>

            <NuevoPacienteModal
                isOpen={modalOpen}
                onClose={closeModal}
                onPacienteCreado={(paciente) => {
                    console.log("Paciente creado correctamente:", paciente);
                    if (onPacienteCreado) onPacienteCreado(paciente); // Propaga hacia arriba
                }}
            />
        </>
    );
};

export default TitlePacientesList;
