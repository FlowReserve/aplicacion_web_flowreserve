import React, { useState } from 'react';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import NuevaSolicitudModal from '../../../Pacientes/components/NuevaSolicitudModal/NuevaSolicitudModal';
import ItemStats from '../../../../components/ItemStats/ItemStats';

interface Props {
    paciente: PacienteProps;
    className?: string;
}

const TitlePacienteSolicitud: React.FC<Props> = ({ paciente, className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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
                            <img src="/web/icons/plus-solid.svg" alt="Icono añadir solicitud" className='w-4 inline-block mr-1'/>
                            Crear nueva solicitud
                        </CustomButton>
                    </div>
                </div>

                <ul className='flex gap-2'>
                    <li>
                        <ItemStats number={1}>Consultas <br /> totales</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={1}>Consultas <br /> en curso</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={0}>Consultas <br /> finalizadas</ItemStats>
                    </li>
                </ul>
            </header>

            <NuevaSolicitudModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                paciente={paciente}
            />
        </>
    );
};

export default TitlePacienteSolicitud;
