// src/components/forms/FormularioPacienteWizard/FormularioPacienteWizard.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import SolicitudPacienteForm from '../../../../components/forms/SolicitudPacienteForm/SolicitudPacienteForm';
import type { NuevoPacienteProps } from '../../../../interfaces/Paciente/NuevoPacienteProps';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';

interface FormularioPacienteWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

const FormularioPacienteWizard: React.FC<FormularioPacienteWizardProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<1 | 2>(1);



    const [formData, setFormData] = useState<NuevoPacienteProps>({
        nombre: '',
        apellido: '',
        codigoNHC: '',
    });

    const [pacienteTemp, setPacienteTemp] = useState<PacienteProps | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isPacienteValido = (): boolean => {
        return (
            formData.nombre.trim() !== '' &&
            formData.apellido.trim() !== '' &&
            formData.codigoNHC.trim() !== ''
        );
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            className="modal bg-white w-full h-[95dvh] max-w-[700px] overflow-y-scroll rounded p-4 focus:outline-none"
            overlayClassName="modal-overlay flex justify-center items-center"
        >
            {step === 1 && (
                <div className='flex flex-col h-full'>

                    <form className='flex-grow'>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Paso 1: Datos del paciente</h2>
                        <div>
                            <label htmlFor="nombrePaciente" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                                id='nombrePaciente'
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={onChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="apellidoPaciente" className="text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                            <input
                                id='apellidoPaciente'
                                type="text"
                                name="apellido"
                                placeholder="Apellidos"
                                value={formData.apellido}
                                onChange={onChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="codigoNHC" className="text-sm font-medium text-gray-700 mb-1">Código NHC</label>
                            <input
                                id='codigoNHC'
                                type="text"
                                name="codigoNHC"
                                placeholder="EJ: 00000000X"
                                value={formData.codigoNHC}
                                onChange={onChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </form>
                    <CustomButton
                        onClick={() => {
                            setPacienteTemp({
                                id: -1,
                                ...formData}); // guarda el paciente temporal
                            setStep(2);                // avanza al paso 2
                        }}
                        disabled={!isPacienteValido()}
                    >
                        Siguiente
                    </CustomButton>

                </div>
            )}

            {step === 2 && pacienteTemp && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Paso 2: Nueva solicitud</h2>
                    <SolicitudPacienteForm
                        paciente={pacienteTemp}
                        
                        onSolicitudCreada={(solicitud) => {
                            
                        }}
                    />
                    <div className="mt-4 flex justify-end">
                    <CustomButton onClick={() => { setStep(1) }}>Atrás</CustomButton>
                    <CustomButton>Finalizar</CustomButton>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default FormularioPacienteWizard;
