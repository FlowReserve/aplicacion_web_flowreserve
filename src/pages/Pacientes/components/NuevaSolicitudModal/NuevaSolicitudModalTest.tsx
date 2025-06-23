import React from 'react';
import Modal from 'react-modal';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import SolicitudPacienteForm from '../../../../components/forms/SolicitudPacienteForm/SolicitudPacienteForm';
import './NuevaSolicitudModal.css'

interface NuevaSolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    paciente: PacienteProps;
    onSolicitudCreada: (solicitud: ResponseSolicitudPaciente) => void;
}

const NuevaSolicitudModalTest: React.FC<NuevaSolicitudModalProps> = ({
    isOpen,
    onClose,
    paciente,
    onSolicitudCreada,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Nueva Solicitud"
            className="mx-3 my-8 md:mx-auto md:my-auto rounded bg-white p-2 max-w-[800px] w-[90%] outline-none"
            overlayClassName="modal-overlay flex justify-center items-center"
        >
            <div className="modal overflow-y-auto max-h-[90vh] p-4">
                
                <SolicitudPacienteForm
                    paciente={paciente}
                    onCancel={onClose}
                    onSolicitudCreada={(solicitud) => {
                        onSolicitudCreada(solicitud);
                        onClose();
                    }}
                />
            </div>
        </Modal>
    );
};

export default NuevaSolicitudModalTest;
