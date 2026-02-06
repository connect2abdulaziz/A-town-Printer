'use client';

import { useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

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

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Files Uploaded Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          We&apos;ve received your files and will review them shortly. We&apos;ll be in touch soon.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
        >
          Upload More Files
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-semibold text-foreground">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-foreground">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* File Upload Area */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-foreground">
          Artwork Files <span className="text-accent">*</span>
        </label>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50 bg-muted/30'
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
          <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${
            dragActive ? 'text-accent' : 'text-muted-foreground'
          }`} />
          <p className="text-lg font-medium mb-2 text-foreground">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-muted-foreground">
            Supports: JPG, PNG, PDF, AI, EPS, PSD, ZIP (max 1GB per file)
          </p>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
              >
                <span className="text-sm truncate flex-1 text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground mx-3">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border-2 border-red-200 text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="pt-2 flex justify-center">
        <Button
          type="submit"
          disabled={uploading || files.length === 0}
          variant="primary"
          className="w-full md:w-auto px-8 py-3 text-base font-semibold"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading Files...
            </>
          ) : (
            'Upload Files'
          )}
        </Button>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground pt-1 text-center">
        By uploading files, you agree to our privacy policy. We&apos;ll never share your information.
      </p>
    </form>
  );
}