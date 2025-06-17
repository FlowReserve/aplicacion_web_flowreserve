// src/hooks/useDescargarPDFSolicitud.ts
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { descargarPDFSolicitudService } from '../services/Response/descargarDocumentoService';

/**
 * Hook para descargar el PDF de una solicitud con token incluido automáticamente.
 */
export const useDescargarPDFSolicitud = () => {
    const { authData } = useAuth();

    const descargarPDF = useCallback(
        async (requestId: number) => {
            if (!authData?.token) {
                throw new Error('No hay token disponible. El usuario no está autenticado.');
            }

            try {
                await descargarPDFSolicitudService(requestId, authData.token);
            } catch (err: any) {
                let errorMessage = 'Error desconocido al descargar el PDF';

                // Axios agrupa la respuesta del servidor en err.response
                if (err?.response?.data) {
                    const data = err.response.data;

                    if (typeof data === 'string') {
                        errorMessage = data;
                    } else if (typeof data === 'object' && data.mensaje) {
                        errorMessage = data.mensaje;
                    }
                } else if (err instanceof Error) {
                    // Captura de errores genéricos
                    errorMessage = err.message;
                }

                console.error('Error al descargar el PDF:', err);
            }
        },
        [authData?.token]
    );

    return { descargarPDF };
};
