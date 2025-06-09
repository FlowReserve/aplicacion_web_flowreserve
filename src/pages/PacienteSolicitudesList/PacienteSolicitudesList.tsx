// src/pages/Pacientes/PacienteSolicitudesList.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarSolicitudesAsociadasPaciente } from '../../services/solicitudService';
import { useAuth } from '../../context/AuthContext';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PaginatedResponse } from '../../interfaces/PaginatedResponse';
import ItemPacienteSolicitud from './components/ItemPacienteSolicitud/ItemPacienteSolicitud';

const PacienteSolicitudesList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { authData } = useAuth();

    const [solicitudes, setSolicitudes] = useState<ResponseSolicitudPaciente[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSolicitudes = async () => {
            if (!authData?.token || !id) return;

            setLoading(true);
            setError(null);
            try {
                const response: PaginatedResponse<ResponseSolicitudPaciente> =
                    await listarSolicitudesAsociadasPaciente(authData.token, id);
                setSolicitudes(response.content);
            } catch (err: any) {
                setError(err.message || 'Error al cargar solicitudes');
            } finally {
                setLoading(false);
            }
        };

        loadSolicitudes();
    }, [authData, id]);

    return (
        <div className="p-6 max-w-[1200px] m-auto">
            <h1 className="text-2xl font-semibold mb-4">Solicitudes del paciente #{id}</h1>

            {loading && <p>Cargando solicitudes...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && solicitudes.length === 0 && <p>No hay solicitudes registradas para este paciente.</p>}

            <ul className="space-y-4">
                {solicitudes.map((solicitud) => (
                    <li>
                        <ItemPacienteSolicitud key={solicitud.id} solicitud={solicitud} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PacienteSolicitudesList;
