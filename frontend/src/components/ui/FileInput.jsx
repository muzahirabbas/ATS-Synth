import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

const FileInput = ({ onFileSelect, acceptedTypes = ".pdf,.docx" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = useCallback((file) => {
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    // Reset the input field
    document.getElementById('file-upload-input').value = "";
  }

  return (
    <div className="w-full">
        <label htmlFor="file-upload-input" className="block text-sm font-medium mb-2 text-secondary-text">
            Upload Your Resume
        </label>
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
            ${dragActive ? 'border-accent bg-accent/10' : 'border-card-border hover:border-accent/80'}`}
        >
            <input
                id="file-upload-input"
                type="file"
                className="hidden"
                accept={acceptedTypes}
                onChange={handleChange}
            />
            
            {selectedFile ? (
                <div className="text-center p-4">
                    <FileText className="mx-auto h-12 w-12 text-accent" />
                    <p className="mt-2 font-semibold text-primary-text truncate max-w-xs">{selectedFile.name}</p>
                    <p className="text-xs text-secondary-text">{Math.round(selectedFile.size / 1024)} KB</p>
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 p-1 rounded-full bg-error/80 text-white hover:bg-error transition-transform duration-200 hover:scale-110"
                        aria-label="Remove file"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <UploadCloud className={`mx-auto h-12 w-12 transition-colors duration-200 ${dragActive ? 'text-accent' : 'text-secondary-text'}`} />
                    <p className="mt-2 text-sm text-secondary-text">
                        <span className="font-semibold text-accent">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-secondary-text">PDF or DOCX</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default FileInput;