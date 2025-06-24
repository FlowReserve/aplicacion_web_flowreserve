import React from 'react';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import { useDescargarPDFSolicitud } from '../../../../hooks/useDescargarPDFSolicitud';
import type { EstadoType } from '../../../../types/estadoColores';
import EstadoBadge from '../../../../components/webElements/EstadoBadge/EstadoBadge';

interface Props {
    solicitud: ResponseSolicitudPaciente;
}

const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
};

const ItemPacienteSolicitud: React.FC<Props> = ({ solicitud }) => {

    const { descargarPDF } = useDescargarPDFSolicitud();
    return (
        <article className="grid p-4 border rounded-lg shadow-sm hover:shadow-md">

            <header className="grid grid-cols-[auto_1fr] gap-4 items-start">
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
                <ul className="flex gap-3 justify-end items-center relative">
                    {solicitud.listadoEstados
                        .sort((a, b) => new Date(a.fechaCambio).getTime() - new Date(b.fechaCambio).getTime())
                        .map((estadoObj, index) => (
                            <li
                                key={index}
                                className='flex gap-3'
                            >
                                <EstadoBadge
                                    className='min-w-[140px]'
                                    estado={estadoObj.estado as EstadoType}
                                    fecha={estadoObj.fechaCambio}
                                />
                                {/* Flecha divisoria - no se muestra en el último elemento */}
                                {index < solicitud.listadoEstados.length - 1 && (
                                    <img
                                        src="/web/icons/caret-right-solid.svg"
                                        alt=""
                                        width="16"
                                        height="16"
                                        className="inline-flex"
                                        aria-hidden="true"
                                    />
                                )}
                            </li>
                        ))}
                </ul>

            </header>

            <hr className="my-2" />

            <section className="grid grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                    <h3 className="font-semibold">Detalles de la consulta</h3>
                    <p className="mt-2">{solicitud.comentarios}</p>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className='flex gap-1'>
                            <p className="p-1 border rounded border-blue-300 bg-blue-50 w-[75px] text-center text-blue-800">
                                PAS: <span className="font-medium">{solicitud.presionSistolica}</span>
                            </p>
                            <p className="p-1 border rounded border-purple-300 bg-purple-50 w-[75px] text-center text-purple-800">
                                PAD: <span className="font-medium">{solicitud.presionDiastolica}</span>
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
