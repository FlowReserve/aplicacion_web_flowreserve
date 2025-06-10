import React, { useRef, useState, useCallback } from 'react';
import JSZip from 'jszip';

interface FileDropInputProps {
    archivoSeleccionado: File | null;
    setArchivoSeleccionado: (file: File | null) => void;
}

// Interfaz extendida para el input con propiedades webkit
interface ExtendedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: string;
    directory?: string;
}

// Clase personalizada que extiende File para permitir webkitRelativePath
class ExtendedFile extends File {
    public webkitRelativePath: string;
    
    constructor(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag, relativePath?: string) {
        super(fileBits, fileName, options);
        this.webkitRelativePath = relativePath || '';
    }
}

const FileDropInput: React.FC<FileDropInputProps> = ({
    archivoSeleccionado,
    setArchivoSeleccionado
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Función para crear un ZIP desde archivos
    const createZipFromFiles = async (files: File[], folderName: string): Promise<File> => {
        const zip = new JSZip();

        for (const file of files) {
            const relativePath = file.webkitRelativePath || file.name;
            const trimmedPath = relativePath.startsWith(folderName + '/')
                ? relativePath.substring(folderName.length + 1)
                : relativePath;

            zip.file(trimmedPath, file);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });

        return new File([zipBlob], `${folderName}.zip`, { type: 'application/zip' });
    };

    const handleFileSelect = useCallback(async (files: FileList | null, isFolder: boolean = false) => {
        if (!files || files.length === 0) return;

        setIsProcessing(true);

        try {
            if (isFolder) {
                // Convertir FileList a Array
                const fileArray = Array.from(files);

                if (fileArray.length === 0) {
                    alert('La carpeta está vacía');
                    return;
                }

                // Obtener el nombre de la carpeta desde el primer archivo
                const firstFile = fileArray[0];
                const folderName = firstFile.webkitRelativePath.split('/')[0] || 'carpeta';

                // Crear ZIP desde los archivos de la carpeta
                const zipFile = await createZipFromFiles(fileArray, folderName);
                setArchivoSeleccionado(zipFile);

            } else {
                // Manejo de archivo único (debe ser ZIP)
                const file = files[0];

                if (
                    file.type === 'application/zip' ||
                    file.type === 'application/x-zip-compressed' ||
                    file.name.toLowerCase().endsWith('.zip')
                ) {
                    setArchivoSeleccionado(file);
                } else {
                    alert('Por favor selecciona un archivo ZIP');
                }
            }
        } catch (error) {
            console.error('Error procesando archivos:', error);
            alert('Error al procesar los archivos. Inténtalo de nuevo.');
        } finally {
            setIsProcessing(false);
        }
    }, [setArchivoSeleccionado]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const items = e.dataTransfer.items;

        if (items) {
            // Verificar si se está arrastrando una carpeta
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.kind === 'file') {
                    const entry = item.webkitGetAsEntry();
                    if (entry?.isDirectory) {
                        // Es una carpeta - procesar todos los archivos
                        const files = await getAllFilesFromDirectory(entry);
                        if (files.length > 0) {
                            await handleFileSelect(createFileListFromArray(files), true);
                        }
                        return;
                    }
                }
            }
        }

        // Si no es carpeta, manejar como archivos normales
        handleFileSelect(e.dataTransfer.files, false);
    }, [handleFileSelect]);

    // Función auxiliar para obtener todos los archivos de un directorio
    const getAllFilesFromDirectory = (dirEntry: any): Promise<ExtendedFile[]> => {
        return new Promise((resolve) => {
            const files: ExtendedFile[] = [];
            let pendingOperations = 0;

            const finishIfDone = () => {
                if (pendingOperations === 0) {
                    resolve(files);
                }
            };

            const readDirectory = (entry: any, path: string = '') => {
                if (entry.isFile) {
                    pendingOperations++;
                    entry.file((file: File) => {
                        // Crear un nuevo archivo extendido con la ruta relativa
                        const relativePath = path ? path + file.name : file.name;
                        const extendedFile = new ExtendedFile([file], file.name, { type: file.type }, dirEntry.name + '/' + relativePath);
                        files.push(extendedFile);
                        pendingOperations--;
                        finishIfDone();
                    });
                } else if (entry.isDirectory) {
                    pendingOperations++;
                    const dirReader = entry.createReader();
                    dirReader.readEntries((entries: any[]) => {
                        entries.forEach(childEntry => {
                            readDirectory(childEntry, path + entry.name + '/');
                        });
                        pendingOperations--;
                        finishIfDone();
                    });
                }
            };

            readDirectory(dirEntry, '');
            
            // Si no hay operaciones pendientes al inicio, resolver inmediatamente
            if (pendingOperations === 0) {
                resolve(files);
            }
        });
    };

    // Función auxiliar para crear FileList desde Array
    const createFileListFromArray = (files: File[]): FileList => {
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        return dt.files;
    };

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files, false);
    }, [handleFileSelect]);

    const handleFolderInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files, true);
    }, [handleFileSelect]);

    const handleRemoveFile = useCallback(() => {
        setArchivoSeleccionado(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (folderInputRef.current) {
            folderInputRef.current.value = '';
        }
    }, [setArchivoSeleccionado]);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div>
            <label className="block mb-2 font-medium">Archivo ZIP o Carpeta</label>

            {!archivoSeleccionado ? (
                <div
                    className={`border-2 border-dashed rounded-lg p-6 min-h-[156px] text-center cursor-pointer transition-colors ${isDragOver
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="space-y-4">
                        <div className="mx-auto w-8 h-8 text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p className="font-medium">
                                {isProcessing ? 'Procesando archivos...' : 'Arrastra y suelta tu archivo o carpeta aquí'}
                            </p>
                            {!isProcessing && (
                                <p>o selecciona desde tu ordenador</p>
                            )}
                        </div>
                        {!isProcessing && (
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-blue-500 underline hover:text-blue-700"
                                >
                                    Seleccionar archivo ZIP
                                </button>
                                <button
                                    type="button"
                                    onClick={() => folderInputRef.current?.click()}
                                    className="text-green-500 underline hover:text-green-700"
                                >
                                    Seleccionar carpeta
                                </button>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            Archivos ZIP o carpetas (se convertirán automáticamente a ZIP)
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-start justify-between border border-gray-300 rounded-lg p-4 min-h-[156px] bg-gray-50">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 text-blue-500">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {archivoSeleccionado.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatFileSize(archivoSeleccionado.size)}
                                </p>
                                {archivoSeleccionado.name.endsWith('.zip') && (
                                    <p className="text-xs text-green-600">
                                        ✓ Listo para enviar
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Input para archivos ZIP */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".zip,application/zip,application/x-zip-compressed"
                onChange={handleFileInputChange}
                className="hidden"
            />

            {/* Input para carpetas - usando casting para evitar error de TypeScript */}
            <input
                {...({
                    ref: folderInputRef,
                    type: "file",
                    onChange: handleFolderInputChange,
                    className: "hidden",
                    webkitdirectory: "",
                    directory: "",
                    multiple: true
                } as ExtendedInputProps)}
            />
        </div>
    );
};

export default FileDropInput;