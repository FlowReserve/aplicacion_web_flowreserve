import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import FileDropPDF from '../../../../components/FileDropPDF/FileDropPDF';
import { useSubirDocumento } from '../../../../hooks/useSubirDocumentoSolicitud';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';

interface SubirPDFModalProps {
    isOpen: boolean;
    onClose: () => void;
    solicitud: ResponseSolicitudPaciente;
}

const SubirRespuestaConsultaModal: React.FC<SubirPDFModalProps> = ({
    isOpen,
    onClose,
    solicitud
}) => {
    const [archivoPDF, setArchivoPDF] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const { subirDocumento, loading, error } = useSubirDocumento();

    // Crear URL temporal cuando se selecciona un PDF
    useEffect(() => {
        if (archivoPDF) {
            const url = URL.createObjectURL(archivoPDF);
            setPreviewURL(url);

            // Limpieza al desmontar o cambiar archivo
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewURL(null);
        }
    }, [archivoPDF]);

    useEffect(() => {
        if (!isOpen) {
            setArchivoPDF(null);
            setPreviewURL(null);
            // Puedes limpiar otros estados aquí si agregas más
        }
    }, [isOpen]);



    const handleEnviar = async () => {
        if (!archivoPDF) return;

        try {
            const res = await subirDocumento(solicitud.id, archivoPDF);
            console.log("Respuesta del servidor:", res);
            onClose();
        } catch (e) {
            console.error("Error al subir PDF:", e);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Subir respuesta en PDF"
            className="bg-white rounded-lg p-6 shadow-lg min-h-[90dvh] w-[80%] flex flex-col"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="grid grid-cols-[auto_1fr] gap-5 flex-grow h-full">
                {/* Columna izquierda */}
                <div className="flex flex-col h-full min-w-[400px]">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        PDF para la solicitud <strong>{solicitud?.codigo}</strong>
                    </h2>
                    <p className="my-4 text-gray-600">Estado actual: {solicitud?.state}</p>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEnviar();
                    }} className='flex flex-col h-full'>
                        <FileDropPDF archivoSeleccionado={archivoPDF} setArchivoSeleccionado={setArchivoPDF} />
                        <div className="flex justify-between space-x-3 mt-auto">
                            <button  onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-[140px]">
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-[140px]"
                                disabled={!archivoPDF}
                            >
                                Enviar
                            </button>
                        </div>
                    </form>

                </div>

                {/* Columna derecha */}
                <div className="bg-purple-100 flex flex-col h-full rounded">
                    <h3 className="text-md font-semibold my-3 text-center">Vista previa del PDF</h3>
                    {previewURL ? (
                        <iframe
                            src={previewURL}
                            title="Vista previa del PDF"
                            className="w-full flex-grow border border-gray-300 rounded"
                        />
                    ) : (
                        <div className="text-gray-500 italic flex-grow flex items-center justify-center">
                            No se ha cargado un documento PDF.
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );

};

export default SubirRespuestaConsultaModal;
