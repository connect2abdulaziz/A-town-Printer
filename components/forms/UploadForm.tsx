'use client';

import { useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/pdf',
  'application/pdf',
  'application/zip',
  'application/postscript', // .ai
  'image/vnd.adobe.photoshop' // .psd
];

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} exceeds 1GB limit`;
    }
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(ai|eps|psd)$/i)) {
      return `${file.name} is not a supported file type`;
    }
    return null;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles: File[] = [];
    
    for (const file of droppedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      
      for (const file of selectedFiles) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        validFiles.push(file);
      }

      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    files.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      setSuccess(true);
      setFiles([]);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          required
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          required
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileInput}
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.ai,.eps,.psd,.zip"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
        <p className="text-sm text-gray-500">
          Supports: JPG, PNG, PDF, AI, EPS, PSD, ZIP (max 1GB per file)
        </p>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm truncate flex-1">{file.name}</span>
                <span className="text-xs text-gray-500 mx-3">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span>Files uploaded successfully! We'll be in touch soon.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading || files.length === 0}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>
    </form>
  );
}