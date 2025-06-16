import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { useCrearSolicitud } from '../../../../hooks/useCrearSolicitud';
import FileDropInput from '../../../../components/FileDropInput/FileDropInput';
import type { SolicitudPacienteProps } from '../../../../interfaces/Solicitud/SolicitudPacienteProps';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import './NuevaSolicitudModal.css'

interface NuevaSolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    paciente: PacienteProps | null;
}

const NuevaSolicitudModal: React.FC<NuevaSolicitudModalProps> = ({
    isOpen,
    onClose,
    paciente
}) => {
    const { submitSolicitud, loading, error } = useCrearSolicitud();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [presionSistolica, setPresionSistolica] = useState<string>('');
    const [presionDiastolica, setPresionDiastolica] = useState<string>('');
    const [comentarios, setComentarios] = useState('');
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);

    // Limpia formulario cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setPresionSistolica('');
            setPresionDiastolica('');
            setComentarios('');
            setArchivoSeleccionado(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!archivoSeleccionado) return alert('Debes subir un archivo ZIP o carpeta');

        const payload: SolicitudPacienteProps = {
            idPaciente: paciente?.id ?? 0,
            presionSistolica: Number(presionSistolica),
            presionDiastolica: Number(presionDiastolica),
            comentarios,
        };

        try {
            await submitSolicitud(payload, archivoSeleccionado);
            alert('Solicitud creada correctamente');
            onClose();
        } catch {
            // error ya manejado por el hook
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Nueva Solicitud" className="modal mx-3 my-8 md:mx-auto md:my-auto rounded bg-white p-6 max-w-[600px]" overlayClassName="modal-overlay flex justify-center items-center">
            <h2 className="text-xl font-semibold mb-4 text-center">Nueva Solicitud para paciente  <span className='font-bold'>{paciente?.codigoNHC}</span>
                <br />
                <span>{paciente?.nombre} {paciente?.apellido}</span>
            </h2>
            <hr className='w-full mb-4' />
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div>
                        <label className="block mb-1" htmlFor='valuePAS'>Presión aortica sistólica (PAS)</label>
                        <input
                            id="valuePAS"
                            type="number"
                            value={presionSistolica}
                            onChange={(e) => setPresionSistolica(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor='valuePAD'>Presión aortica diástolica (PAD)</label>
                        <input id="valuePAD" 
                        type="number" 
                        value={presionDiastolica} 
                        onChange={e => setPresionDiastolica(e.target.value)} 
                        className="input" 
                        required />
                    </div>
                    <p className='md:col-span-2 text-xs text-gray-600'><strong>NOTA:</strong> Las unidades de la Presión Aortica Sistólica y Diástolica (<strong>PAS y PAD</strong>) se miden en <strong>mmHg</strong></p>
                </div>

                <div>
                    <label className="block mb-1" htmlFor='solicitudComentarios'>Comentarios</label>
                    <textarea id='solicitudComentarios' placeholder='Añade cualquier información que pueda ser de utilidad' value={comentarios} onChange={e => setComentarios(e.target.value)} rows={5} className="input resize-none" />
                </div>


                <FileDropInput
                    archivoSeleccionado={archivoSeleccionado}
                    setArchivoSeleccionado={setArchivoSeleccionado}
                />
                <p className='text-xs text-gray-600'>NOTA: Únicamente será admitida una (1) única carpeta o fichero ZIP que contenga en su interior los ficheros DICOM del paciente</p>
                {error && <p className="text-red-500">Error: {error}</p>}

                <div className='mt-4'>
                    <input id='checkbox-confirm-data' type='checkbox' required className='mr-2'></input>
                    <label htmlFor='checkbox-confirm-data' className='text-sm font-semibold'>Confirmo que la información que voy a enviar es correcta y me hago responsable de cualquier error con el envío de la información sobre el paciente</label>
                </div>
                <div className="mt-5 flex justify-between gap-2">
                    <CustomButton onClick={onClose} className="bg-transparent text-primary px-3 py-1 w-[180px]">
                        Cancelar y cerrar
                    </CustomButton>
                    <CustomButton type="submit" className=" px-3 py-1 w-[180px]" disabled={loading}>
                        {loading ? 'Enviando...' : 'Crear solicitud'}
                    </CustomButton>
                </div>
            </form>
        </Modal>
    );
};

export default NuevaSolicitudModal;