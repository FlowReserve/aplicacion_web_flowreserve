// src/hooks/useSubirDocumento.ts
import { useState } from "react";
import { subirDocumentoService } from "../services/Response/subirDocumentoService";
import { useAuth } from "../context/AuthContext"; // O donde tengas tu contexto de auth

export const useSubirDocumento = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { authData } = useAuth(); // Asumimos que tienes algo así

    const subirDocumento = async (requestId: string, archivo: File) => {
        setLoading(true);
        setError(null);
        try {
            const token = authData?.token || '';
            const response = await subirDocumentoService(requestId, archivo, token);
            return response;
        } catch (err: any) {
            setError("Error al subir el documento");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { subirDocumento, loading, error };
};
