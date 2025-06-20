import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import CustomButton from '../../../../components/interactive/CustomButton/CustomButton';
import { useCrearSolicitud } from '../../../../hooks/useCrearSolicitud';
import FileDropInput from '../../../../components/FileDropInput/FileDropInput';
import type { SolicitudPacienteProps } from '../../../../interfaces/Solicitud/SolicitudPacienteProps';
import type { PacienteProps } from '../../../../interfaces/Paciente/PacienteProps';
import './NuevaSolicitudModal.css'
import CustomButtonOutline from '../../../../components/interactive/CustomButtonOutline/CustomButtonOutline';
import CheckboxSelect from '../../../../components/forms/CheckboxSelect/CheckboxSelect';
import type { ResponseSolicitudPaciente } from '../../../../interfaces/Solicitud/ResponseSolicitudPaciente';

interface NuevaSolicitudModalProps {
    isOpen: boolean;
    onClose: () => void;
    paciente: PacienteProps | null;
    onSolicitudCreada?: (nuevaSolicitud: ResponseSolicitudPaciente) => void; //Maneja el objeto creado en la solicitud.
}

const NuevaSolicitudModal: React.FC<NuevaSolicitudModalProps> = ({
    isOpen,
    onClose,
    paciente,
    onSolicitudCreada
}) => {
    const { submitSolicitud, loading, error } = useCrearSolicitud();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [presionSistolica, setPresionSistolica] = useState<string>('');
    const [presionDiastolica, setPresionDiastolica] = useState<string>('');
    const [comentarios, setComentarios] = useState('');
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
    const [lesiones, setLesiones] = useState<LesionState>({});
    const [lesionesPersonalizadas, setLesionesPersonalizadas] = useState<string>('');

    const arterias = ['LAD', 'Cx', 'RI', 'RCA', 'PLA', 'PDA'];
    type LesionState = {
        [arteria: string]: { checked: boolean; value: string | null };
    };



    const handleLesionChange = ({
        label,
        checked,
        value,
    }: {
        label: string;
        checked: boolean;
        value: string | null;
    }) => {
        setLesiones((prev) => ({
            ...prev,
            [label]: { checked, value },
        }));
    };

    const lesionesSeleccionadas = Object.entries(lesiones)
        .filter(([_, val]) => val.checked && val.value)
        .map(([nombre, val]) => `${nombre}_${val.value}`);


    // Limpia formulario cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setPresionSistolica('');
            setPresionDiastolica('');
            setComentarios('');
            setArchivoSeleccionado(null);
            setLesionesPersonalizadas('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isOpen]);

    /**
     * Comprueba que los datos del formulario sean válidos.
     * @returns 
     */
    const isValidForm = (): boolean => {
        const sistolica = Number(presionSistolica);
        const diastolica = Number(presionDiastolica);

        if (!archivoSeleccionado) {
            alert('Debes subir un archivo ZIP o carpeta');
            return false;
        }
        if (isNaN(sistolica) || isNaN(diastolica)) {
            alert('PAS y PAD deben ser números válidos');
            return false;
        }
        if (sistolica < 0 || diastolica < 0) {
            alert('Los valores de PAS y PAD no pueden ser negativos');
            return false;
        }
        if (sistolica > 300 || diastolica > 300) {
            alert('Los valores de PAS y PAD no pueden ser mayores a 300');
            return false;
        }
        if (sistolica < diastolica) {
            alert('La presión sistólica (PAS) debe ser mayor o igual que la diastólica (PAD)');
            return false;
        }
        if (lesionesPersonalizadas.length > 40) {
            alert('La descripción personalizada de lesión no puede superar los 40 caracteres');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidForm()) return;
        if (!archivoSeleccionado) return alert('Debes subir un archivo ZIP o carpeta');

        const payload: SolicitudPacienteProps = {
            idPaciente: paciente?.id ?? 0,
            presionSistolica: Number(presionSistolica),
            presionDiastolica: Number(presionDiastolica),
            comentarios,
            lesiones: lesionesSeleccionadas.join('; '),
            lesionesPersonalizadas: lesionesPersonalizadas.trim(),
        };

        try {
            console.log("enviando datos de la nueva solicitud: ", payload);
            const response : ResponseSolicitudPaciente =  await submitSolicitud(payload, archivoSeleccionado);
            alert('Solicitud creada correctamente');

            if(onSolicitudCreada){
                onSolicitudCreada(response); //Envía al componente padre los datos de la solicitud creada.
            }
            onClose();
        } catch {
            // error ya manejado por el hook
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Nueva Solicitud"
            className="mx-3 my-8 md:mx-auto md:my-auto rounded bg-white p-2 max-w-[800px] outline-none" overlayClassName="modal-overlay flex justify-center items-center">
            <div className="modal overflow-y-auto max-h-[90vh] p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Nueva Solicitud para paciente  <span className='font-bold'>{paciente?.codigoNHC}</span>
                    <br />
                    <span>{paciente?.nombre} {paciente?.apellido}</span>
                </h2>
                <hr className='w-full mb-4' />
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div>
                            <label className="block mb-1" htmlFor='valuePAS'>Presión aortica sistólica (PAS)</label>
                            <input
                                id="valuePAS"
                                type="number"
                                value={presionSistolica}
                                onChange={(e) => setPresionSistolica(e.target.value)}
                                className="input"
                                required
                                min={0}
                                max={300}
                            />
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor='valuePAD'>Presión aortica diástolica (PAD)</label>
                            <input id="valuePAD"
                                type="number"
                                value={presionDiastolica}
                                onChange={e => setPresionDiastolica(e.target.value)}
                                className="input"
                                required 
                                min={0}
                                max={300}/>
                        </div>
                        <p className='md:col-span-2 text-xs text-gray-600'><strong>NOTA:</strong> Las unidades de la Presión Aortica Sistólica y Diástolica (<strong>PAS y PAD</strong>) se miden en <strong>mmHg</strong></p>
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor='solicitudComentarios'>Comentarios</label>
                        <textarea id='solicitudComentarios'
                            placeholder='Añade cualquier información que pueda ser de utilidad'
                            value={comentarios} onChange={e => setComentarios(e.target.value)}
                            rows={5} className="input resize-none" 
                            maxLength={400}/>
                        <p className="text-xs text-gray-500 text-end">
                            {comentarios.length}/400 caracteres
                        </p>
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <h3 className="col-span-3 font-semibold mb-2">Selecciona posibles áreas de lesión</h3>
                        {arterias.map((nombre) => (
                            <CheckboxSelect key={nombre} label={nombre} onChange={handleLesionChange} checkboxDesign='w-[55px]' />
                        ))}
                        <div className='col-span-3'>
                            <label htmlFor='customAreaLesion'>Area de lesión personalizada</label>
                            <input
                                id="customAreaLesion"
                                name="customAreaLesion"
                                className='input mt-1'
                                placeholder='Opcional - Escribe zonas de posibles lesiones. Ej: D1 Distal'
                                value={lesionesPersonalizadas}
                                onChange={(e) => setLesionesPersonalizadas(e.target.value)}
                                maxLength={40}
                                type="text" />
                            <p className="text-xs text-gray-500 text-end">
                                {lesionesPersonalizadas.length}/40 caracteres
                            </p>
                        </div>
                    </div>

                    <FileDropInput
                        archivoSeleccionado={archivoSeleccionado}
                        setArchivoSeleccionado={setArchivoSeleccionado}
                    />
                    <p className='text-xs text-gray-600'>NOTA: Únicamente será admitida una (1) única carpeta o fichero ZIP que contenga en su interior los ficheros DICOM del paciente</p>
                    {error && <p className="text-red-500">Error: {error}</p>}
                    <div className='mt-4'>
                        <input id='checkbox-confirm-data' type='checkbox' required className='mr-2'></input>
                        <label htmlFor='checkbox-confirm-data' className='text-sm font-semibold'>Confirmo que la información que voy a enviar es correcta y me hago responsable de cualquier error con el envío de la información sobre el paciente</label>
                    </div>
                    <div className="mt-5 flex justify-between gap-2">
                        <CustomButtonOutline onClick={onClose} className="w-[180px]">
                            Cancelar y cerrar
                        </CustomButtonOutline>
                        <CustomButton type="submit" className=" px-3 py-1 w-[180px]" disabled={loading}>
                            {loading ? 'Enviando...' : 'Crear solicitud'}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default NuevaSolicitudModal;