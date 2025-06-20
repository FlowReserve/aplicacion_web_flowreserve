import React, { useState } from 'react';
import { useEstadisticasPaciente } from '../../../../hooks/paciente/useEstadisticasPaciente';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import NuevaSolicitudModal from '../../../Pacientes/components/NuevaSolicitudModal/NuevaSolicitudModal';
import ItemStats from '../../../../components/ItemStats/ItemStats';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';

interface Props {
    paciente: PacienteProps;
    className?: string;
    onNuevaSolicitudCreada?: (nuevaSolicitud: ResponseSolicitudPaciente) => void;
}

const TitlePacienteSolicitud: React.FC<Props> = ({ paciente, className, onNuevaSolicitudCreada }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const { data: estadisticas, loading, error, updateEstadisticas } = useEstadisticasPaciente(paciente.id);


    const handleSolicitudCreada = (nuevaSolicitud: ResponseSolicitudPaciente) => {
        console.log("Solicitud recibida en el componente padre: ", nuevaSolicitud);
        if (onNuevaSolicitudCreada) {
            onNuevaSolicitudCreada(nuevaSolicitud);
            updateEstadisticas(prev => ({
                ...prev,
                total: (prev.total ?? 0) + 1
            }));
        }
    }

    return (
        <>
            <header className={`flex flex-col items-center lg:flex-row justify-between ${className} gap-4`}>
                <div className='flex gap-3'>
                    <img src="/web/icons/user-solid.svg" className="w-20 " alt="Paciente" />
                    <div className='flex flex-col justify-between'>
                        <h1 className={`text-2xl font-semibold flex items-center gap-2 `}>
                            Solicitudes de <span className="font-bold">{paciente.nombre} {paciente.apellido}</span>
                        </h1>
                        <CustomButton className='flex justify-center' onClick={handleOpenModal}>
                            <img src="/web/icons/plus-solid.svg" alt="Icono añadir solicitud" className='w-4 inline-block mr-1' />
                            Crear nueva solicitud
                        </CustomButton>
                    </div>
                </div>

                <ul className='flex gap-2'>
                    <li>
                        <ItemStats number={loading ? '-' : estadisticas?.total ?? 0}>Consultas <br /> totales</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={loading ? '-' : estadisticas?.enCurso ?? 0}>Consultas <br /> en curso</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={loading ? '-' : estadisticas?.finalizadas ?? 0}>Consultas <br /> finalizadas</ItemStats>
                    </li>
                </ul>
            </header>

            <NuevaSolicitudModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                paciente={paciente}
                onSolicitudCreada={handleSolicitudCreada}
            />
        </>
    );
};

export default TitlePacienteSolicitud;
