// components/forms/SolicitudPacienteForm/SolicitudPacienteForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import CustomButton from '../../interactive/CustomButton/CustomButton';
import FileDropInput from '../../FileDropInput/FileDropInput';
import CheckboxSelect from '../../forms/CheckboxSelect/CheckboxSelect';
import CustomButtonOutline from '../../interactive/CustomButtonOutline/CustomButtonOutline';
import { useCrearSolicitud } from '../../../hooks/useCrearSolicitud';
import type { SolicitudPacienteProps } from '../../../interfaces/Solicitud/SolicitudPacienteProps';
import type { PacienteProps } from '../../../interfaces/Paciente/PacienteProps';
import type { ResponseSolicitudPaciente } from '../../../interfaces/Solicitud/ResponseSolicitudPaciente';

interface SolicitudPacienteFormProps {
    paciente: PacienteProps;
    onCancel?: () => void;
    onSolicitudCreada: (solicitud: ResponseSolicitudPaciente) => void;
}

const SolicitudPacienteForm: React.FC<SolicitudPacienteFormProps> = ({ paciente, onCancel, onSolicitudCreada }) => {
    const { submitSolicitud, loading, error } = useCrearSolicitud();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [presionSistolica, setPresionSistolica] = useState('');
    const [presionDiastolica, setPresionDiastolica] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
    const [lesionesPersonalizadas, setLesionesPersonalizadas] = useState('');
    const arterias = ['LAD', 'Cx', 'RI', 'RCA', 'PLA', 'PDA'];

    type LesionState = {
        [arteria: string]: { checked: boolean; value: string | null };
    };

    const [lesiones, setLesiones] = useState<LesionState>({});

    const handleLesionChange = ({ label, checked, value }: { label: string; checked: boolean; value: string | null }) => {
        setLesiones(prev => ({ ...prev, [label]: { checked, value } }));
    };

    const lesionesSeleccionadas = Object.entries(lesiones)
        .filter(([_, val]) => val.checked && val.value)
        .map(([nombre, val]) => `${nombre}_${val.value}`);

    const isValidForm = (): boolean => {
        const sistolica = Number(presionSistolica);
        const diastolica = Number(presionDiastolica);

        if (!archivoSeleccionado) return alert('Debes subir un archivo ZIP o carpeta'), false;
        if (isNaN(sistolica) || isNaN(diastolica)) return alert('PAS y PAD deben ser números válidos'), false;
        if (sistolica < 0 || diastolica < 0) return alert('Los valores de PAS y PAD no pueden ser negativos'), false;
        if (sistolica > 300 || diastolica > 300) return alert('Los valores de PAS y PAD no pueden ser mayores a 300'), false;
        if (sistolica < diastolica) return alert('PAS debe ser mayor o igual a PAD'), false;
        if (lesionesPersonalizadas.length > 40) return alert('La descripción personalizada no puede superar 40 caracteres'), false;

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidForm()) return;

        const payload: SolicitudPacienteProps = {
            idPaciente: paciente.id,
            presionSistolica: Number(presionSistolica),
            presionDiastolica: Number(presionDiastolica),
            comentarios,
            lesiones: lesionesSeleccionadas.join('; '),
            lesionesPersonalizadas: lesionesPersonalizadas.trim(),
        };

        try {
            const response = await submitSolicitud(payload, archivoSeleccionado!);
            alert('Solicitud creada correctamente');
            onSolicitudCreada(response);
        } catch {
            // error ya manejado en hook
        }
    };

    useEffect(() => {
        return () => {
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
            <h2 className="text-xl font-semibold text-center mb-2">
                Nueva Solicitud para <span className='font-bold'>{paciente.codigoNHC}</span><br />
                <span>{paciente.nombre} {paciente.apellido}</span>
            </h2>
            <hr className='mb-3' />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                    <label htmlFor='valuePAS' className="block mb-1">PAS (Presión aórtica sistólica)</label>
                    <input id='valuePAS' type='number' value={presionSistolica} onChange={e => setPresionSistolica(e.target.value)} className='input' min={0} max={300} required />
                </div>
                <div>
                    <label htmlFor='valuePAD' className="block mb-1">PAD (Presión aórtica diastólica)</label>
                    <input id='valuePAD' type='number' value={presionDiastolica} onChange={e => setPresionDiastolica(e.target.value)} className='input' min={0} max={300} required />
                </div>
                <p className='md:col-span-2 text-xs text-gray-600'>Unidades: <strong>mmHg</strong></p>
            </div>

            <div>
                <label htmlFor='solicitudComentarios' className='block mb-1'>Comentarios</label>
                <textarea id='solicitudComentarios' value={comentarios} onChange={e => setComentarios(e.target.value)} rows={5} className='input resize-none' maxLength={400} placeholder='Añade información relevante' />
                <p className='text-xs text-gray-500 text-end'>{comentarios.length}/400 caracteres</p>
            </div>

            <div className='grid gap-2'>
                <h3 className='col-span-1 xs:col-span-2 sm:col-span-3 font-semibold mb-2'>Zonas de lesión</h3>
                {arterias.map(art => (
                    <CheckboxSelect key={art} label={art} onChange={handleLesionChange} checkboxDesign='w-[55px]' />
                ))}
                <div className='col-span-1 xs:col-span-2 sm:col-span-3'>
                    <label htmlFor='customAreaLesion'>Área personalizada</label>
                    <input
                        id="customAreaLesion"
                        type="text"
                        className='input mt-1'
                        maxLength={40}
                        placeholder='Ej: D1 Distal'
                        value={lesionesPersonalizadas}
                        onChange={e => setLesionesPersonalizadas(e.target.value)}
                    />
                    <p className='text-xs text-gray-500 text-end'>
                        {lesionesPersonalizadas.length}/40 caracteres
                    </p>
                </div>
            </div>


            <FileDropInput archivoSeleccionado={archivoSeleccionado} setArchivoSeleccionado={setArchivoSeleccionado} />
            <p className='text-xs text-gray-600'>Solo se admite un ZIP o carpeta con archivos DICOM.</p>

            {error && <p className='text-red-500'>Error: {error}</p>}

            <div className='mt-4'>
                <input id='checkbox-confirm-data' type='checkbox' required className='mr-2' />
                <label htmlFor='checkbox-confirm-data' className='text-sm font-semibold'>Confirmo que la información es correcta</label>
            </div>

            <div className="mt-5 flex justify-between gap-2">
                {onCancel && (
                    <CustomButtonOutline onClick={onCancel} className="w-[180px]">
                        Cancelar
                    </CustomButtonOutline>
                )}
                <CustomButton type="submit" className="w-[180px]" disabled={loading}>
                    {loading ? 'Enviando...' : 'Crear solicitud'}
                </CustomButton>
            </div>
        </form>
    );
};

export default SolicitudPacienteForm;
