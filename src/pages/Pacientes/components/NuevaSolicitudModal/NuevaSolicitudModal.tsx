import React, { useState } from 'react';
import Modal from 'react-modal';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { useCrearSolicitud } from '../../../../hooks/useCrearSolicitud';
import type { SolicitudPacienteProps } from '../../../../interfaces/SolicitudPacienteProps';
import './NuevaSolicitudModal.css'

interface NuevaSolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    idPaciente: string;
}

const NuevaSolicitudModal: React.FC<NuevaSolicitudModalProps> = ({
    isOpen,
    onClose,
    idPaciente,
}) => {
    const { submitSolicitud, loading, error } = useCrearSolicitud();

    const [pressureA, setPressureA] = useState('');
    const [pressureB, setPressureB] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [archivoZIP, setArchivoZIP] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!archivoZIP) return alert('Debes subir un archivo ZIP');

        const payload: SolicitudPacienteProps = {
            idPaciente,
            pressureA,
            pressureB,
            comentarios,
            archivoZIP,
        };

        try {
            await submitSolicitud(payload);
            alert('Solicitud creada correctamente');
            onClose();
        } catch {
            // error ya manejado por el hook
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Nueva Solicitud" className="modal" overlayClassName="modal-overlay">
            <h2 className="text-xl font-semibold mb-4 text-center">Nueva Solicitud para paciente  <span className='font-bold'>{idPaciente}</span></h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Presión A</label>
                    <input type="text" value={pressureA} onChange={e => setPressureA(e.target.value)} className="input" required />
                </div>

                <div>
                    <label className="block mb-1">Presión B</label>
                    <input type="text" value={pressureB} onChange={e => setPressureB(e.target.value)} className="input" required />
                </div>

                <div>
                    <label className="block mb-1">Comentarios</label>
                    <textarea value={comentarios} onChange={e => setComentarios(e.target.value)} className="input" />
                </div>

                <div>
                    <label className="block mb-1">Archivo ZIP</label>
                    <input type="file" accept=".zip" onChange={e => setArchivoZIP(e.target.files?.[0] || null)} required />
                </div>

                {error && <p className="text-red-500">Error: {error}</p>}

                <div className="flex justify-end gap-2">
                    <CustomButton onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded">
                        Cancelar
                    </CustomButton>
                    <CustomButton type="submit" className="bg-blue-600 text-white px-3 py-1 rounded" disabled={loading}>
                        {loading ? 'Enviando...' : 'Crear solicitud'}
                    </CustomButton>
                </div>
            </form>
        </Modal>
    );
};

export default NuevaSolicitudModal;
