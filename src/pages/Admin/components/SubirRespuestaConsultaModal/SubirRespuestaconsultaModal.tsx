import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import FileDropPDF from '../../../../components/FileDropPDF/FileDropPDF';
import { useSubirDocumento } from '../../../../hooks/useSubirDocumentoSolicitud';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import { EstadoMap } from '../../../../types/estadoColores';
import type { EstadoType } from '../../../../types/estadoColores';


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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const estado = solicitud.state as EstadoType;
    const estadoInfo = EstadoMap[estado] ?? { text: estado, className: 'bg-gray-100 text-gray-800' };

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

    // Limpiar estados cuando se cierra la modal
    useEffect(() => {
        if (!isOpen) {
            setArchivoPDF(null);
            setPreviewURL(null);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    // Función segura para cerrar modal
    const handleClose = () => {
        // No permitir cerrar si se está enviando
        if (isSubmitting || loading) {
            return;
        }
        onClose();
    };

    // Manejar el escape key
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && (isSubmitting || loading)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, isSubmitting, loading]);

    const handleEnviar = async () => {
        // Validaciones de seguridad
        if (!archivoPDF) {
            console.warn("No se puede enviar sin un archivo PDF");
            return;
        }

        if (isSubmitting || loading) {
            console.warn("Ya se está procesando una solicitud");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await subirDocumento(solicitud.id, archivoPDF);
            console.log("Respuesta del servidor:", res);

            // Solo cerrar si el envío fue exitoso
            onClose();
        } catch (e) {
            console.error("Error al subir PDF:", e);
            // Mantener la modal abierta en caso de error para que el usuario pueda reintentar
        } finally {
            setIsSubmitting(false);
        }
    };

    // Estado de carga general
    const isLoading = isSubmitting || loading;
    const canSubmit = archivoPDF !== null && !isLoading;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={!isLoading}
            shouldCloseOnEsc={!isLoading}
            contentLabel="Subir respuesta en PDF"
            className="bg-white rounded-lg p-6 shadow-lg min-h-[90dvh] w-[80%] flex flex-col"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            {/* Overlay de carga */}
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">
                            {isSubmitting ? 'Subiendo documento...' : 'Procesando...'}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-[auto_1fr] gap-5 flex-grow h-full">
                {/* Columna izquierda */}
                <div className="flex flex-col h-full min-w-[400px]">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        PDF para la solicitud <strong>{solicitud?.codigo}</strong>
                    </h2>
                    
                    <p className="flex items-center justify-between my-4 text-gray-600">
                        <span>Estado actual:</span>
                        <strong className={`p-2 rounded ${estadoInfo.className}`}>
                            {estadoInfo.text}
                        </strong>
                    </p>


                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEnviar();
                    }} className='flex flex-col h-full'>
                        <FileDropPDF
                            archivoSeleccionado={archivoPDF}
                            setArchivoSeleccionado={setArchivoPDF}
                            disabled={isLoading}
                        />

                        {/* Mensaje de validación */}
                        {!archivoPDF && (
                            <p className="text-sm text-amber-600 mt-2">
                                ⚠️ Debe seleccionar un archivo PDF antes de enviar
                            </p>
                        )}

                        {/* Mostrar errores si los hay */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                <p className="text-sm">Error al subir el documento: {error}</p>
                            </div>
                        )}

                        <div className="flex justify-between space-x-3 mt-auto">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isLoading}
                                className={`px-4 py-2 rounded w-[140px] transition-colors ${isLoading
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            >
                                {isLoading ? 'Procesando...' : 'Cancelar'}
                            </button>
                            <button
                                type='submit'
                                disabled={!canSubmit}
                                className={`px-4 py-2 text-white rounded w-[140px] transition-colors ${canSubmit
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? 'Enviando...' : 'Enviar'}
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