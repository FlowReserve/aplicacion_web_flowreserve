import React, { useEffect, useState } from 'react';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import ItemStats from '../../../../components/ItemStats/ItemStats';
import NuevoPacienteModal from '../NuevoPacienteModal/NuevoPacienteModal';
import type { MedicoProfileResponseProps } from '../../../../interfaces/Medico/MedicoProfileResponseProps';
import { obtenerPerfilMedicoService } from '../../../../services/Medico/medicoService';
import type { APIResponseProps } from '../../../../interfaces/global/APIResponseProps';
import { useAuth } from '../../../../context/AuthContext';

interface Props {
    className?: string;
}

const TitlePacientesList: React.FC<Props> = ({ className }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [medico, setMedico] = useState<MedicoProfileResponseProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { authData } = useAuth();
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const fetchMedico = async () => {
            try {
                const token = authData?.token || "";
                if (!token) {
                    setError("Token no encontrado");
                    return;
                }

                const response: APIResponseProps<MedicoProfileResponseProps> = await obtenerPerfilMedicoService(token);
                console.log("respuesta servidor", response)
                if (response.status && response.responseObject) {
                    setMedico(response.responseObject);
                } else {
                    setError(response.message || "Error al cargar el perfil del médico");
                }
            } catch (err) {
                setError("Ocurrió un error al obtener el perfil del médico.");
            } finally {
                setLoading(false);
            }
        };

        fetchMedico();
    }, []);

    if (loading) return <p>Cargando perfil del médico...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

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
                        <ItemStats number={4}>Pacientes <br /> totales</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={1}>Consultas <br /> en curso</ItemStats>
                    </li>
                    <li>
                        <ItemStats number={0}>Consultas <br /> finalizadas</ItemStats>
                    </li>
                </ul>
            </header>

            <NuevoPacienteModal
                isOpen={modalOpen}
                onClose={closeModal}
                onPacienteCreado={() => {
                    console.log("Paciente creado correctamente.");
                }}
            />
        </>
    );
};

export default TitlePacientesList;
