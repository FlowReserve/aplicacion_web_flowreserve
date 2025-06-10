// src/pages/Pacientes/PacienteSolicitudesList.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarSolicitudesAsociadasPaciente } from '../../services/solicitudService';
import { useAuth } from '../../context/AuthContext';
import type { ResponseSolicitudPaciente } from '../../interfaces/Solicitud/ResponseSolicitudPaciente';
import type { PaginatedResponse } from '../../interfaces/PaginatedResponse';
import type { PacienteProps } from '../../interfaces/Paciente/PacienteProps';
import ItemPacienteSolicitud from './components/ItemPacienteSolicitud/ItemPacienteSolicitud';
import TitlePacienteSolicitud from './components/TitlePacienteSolicitud/TitlePacienteSolicitud';
import type { APIResponseProps } from '../../interfaces/global/APIResponseProps';
import { obtenerInformacionPacienteByIDService } from '../../services/pacientesService';

const PacienteSolicitudesList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { authData } = useAuth();

    const [solicitudes, setSolicitudes] = useState<ResponseSolicitudPaciente[]>([]);
    const [paciente, setPaciente] = useState<PacienteProps | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!authData?.token || !id) return;

            setLoading(true);
            setError(null);
            try {
                // Cargar información del paciente
                const pacienteResponse: APIResponseProps<PacienteProps> = await obtenerInformacionPacienteByIDService(id, authData.token);
                
                // Verificar si la respuesta es exitosa y tiene datos
                if (pacienteResponse.status && pacienteResponse.responseObject) {
                    setPaciente(pacienteResponse.responseObject);
                } else {
                    throw new Error(pacienteResponse.message || 'Error al obtener información del paciente');
                }

                // Cargar solicitudes del paciente
                const response: PaginatedResponse<ResponseSolicitudPaciente> =
                    await listarSolicitudesAsociadasPaciente(authData.token, id);
                setSolicitudes(response.content);
            } catch (err: any) {
                setError(err.message || 'Error al cargar los datos');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [authData, id]);

    // Mostrar loading mientras se cargan los datos
    if (loading) {
        return (
            <div className="p-6 max-w-[1200px] m-auto">
                <p>Cargando información del paciente y solicitudes...</p>
            </div>
        );
    }

    // Mostrar error si algo falló
    if (error) {
        return (
            <div className="p-6 max-w-[1200px] m-auto">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    // Mostrar mensaje si no se encontró el paciente
    if (!paciente) {
        return (
            <div className="p-6 max-w-[1200px] m-auto">
                <p>No se encontró información del paciente.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1200px] m-auto">
            <TitlePacienteSolicitud paciente={paciente} className='py-6' />
            <hr className='w-full pb-6'/>
            
            {solicitudes.length === 0 && (
                <p>No hay solicitudes registradas para este paciente.</p>
            )}

            <ul className="space-y-4">
                {solicitudes.map((solicitud) => (
                    <li key={solicitud.id}>
                        <ItemPacienteSolicitud solicitud={solicitud} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PacienteSolicitudesList;