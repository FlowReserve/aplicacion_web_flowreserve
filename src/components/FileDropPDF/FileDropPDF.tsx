// src/components/FileDropPDF.tsx
import React, { useRef, useState, useCallback } from 'react';

interface FileDropPDFProps {
  archivoSeleccionado: File | null;
  setArchivoSeleccionado: (file: File | null) => void;
}

const FileDropPDF: React.FC<FileDropPDFProps> = ({
  archivoSeleccionado,
  setArchivoSeleccionado
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setArchivoSeleccionado(file);
    } else {
      alert('Por favor selecciona un archivo PDF.');
    }
  }, [setArchivoSeleccionado]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleRemoveFile = () => {
    setArchivoSeleccionado(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Archivo PDF</label>

      {!archivoSeleccionado ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 min-h-[156px] text-center cursor-pointer transition-colors ${isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">
              Arrastra y suelta un archivo PDF aquí
            </p>
            <p className="text-sm text-gray-600">o selecciónalo desde tu ordenador</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Seleccionar archivo PDF
            </button>
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
                <p className="text-sm font-medium text-gray-900">{archivoSeleccionado.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(archivoSeleccionado.size)}</p>
                <p className="text-xs text-green-600">✓ Listo para enviar</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileDropPDF;
