import React from 'react';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { useDescargarPDFSolicitud } from '../../../../hooks/useDescargarPDFSolicitud';

interface Props {
    solicitud: ResponseSolicitudPaciente;
}

const statusColors: Record<string, string> = {
    PENDIENTE: 'bg-gray-400',
    'EN PROCESO': 'bg-yellow-400',
    COMPLETADA: 'bg-green-500',
    CANCELADA: 'bg-red-500',
};

const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const ItemPacienteSolicitud: React.FC<Props> = ({ solicitud }) => {

    const { descargarPDF } = useDescargarPDFSolicitud();
    return (
        <article className="grid p-4 border rounded-lg shadow-sm hover:shadow-md">
            
            <header className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                    <p className="text-sm text-gray-600">Fecha solicitud: {formatDate(solicitud.date)}</p>
                    <h2 className="text-lg">
                        Solicitud <span className="font-medium">{solicitud.codigo}</span>
                    </h2>
                    <h3>
                        Paciente{' '}
                        <span className="font-medium">
                            {solicitud.paciente.nombre} {solicitud.paciente.apellido}
                        </span>
                    </h3>
                </div>
                <div className="flex flex-col gap-2 items-center w-[200px]">
                    <p className="text-sm text-gray-600">Última actualización: {formatDate(solicitud.date)}</p>
                    <p
                        className={`text-white text-sm font-bold px-3 py-1 rounded w-full text-center ${statusColors[solicitud.state] || 'bg-gray-300'}`}
                    >
                        {solicitud.state}
                    </p>
                </div>
            </header>

            <hr className="my-2" />

            <section className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                    <h3 className="font-semibold">Detalles de la consulta</h3>
                    <p className="mt-2">{solicitud.campoComentarios}</p>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className='flex gap-1'>
                            <p className="p-1 border rounded border-blue-300 bg-blue-50 w-[75px] text-center text-blue-800">
                                PAS: <span className="font-medium">{solicitud.pressureA}</span>
                            </p>
                            <p className="p-1 border rounded border-purple-300 bg-purple-50 w-[75px] text-center text-purple-800">
                                PAD: <span className="font-medium">{solicitud.pressureB}</span>
                            </p>
                        </div>
                        <p className="text-gray-700 text-xs leading-none flex flex-col">
                            <span>PAS: Presión aortica sistólica.</span>
                            <span>PAD: Presión aortica diastólica.</span>
                            <span>Unidades medidas en mmHg.</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 w-[200px]">
                    <h3 className="font-semibold">Acciones</h3>
                    <CustomButton onClick={() => descargarPDF(solicitud.id)} disabled={solicitud.state !== 'COMPLETADA'} className='flex'>
                        <img src="/web/icons/file-arrow-down-solid.svg" alt="icono descarga documento PDF" className='w-4 inline-block mr-2' />
                        Descargar PDF
                    </CustomButton>
                </div>
            </section>
        </article>
    );
};

export default ItemPacienteSolicitud;
