'use client';

import { useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
const MAX_FILES = 10;
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/zip',
  'application/postscript', // .ai
  'image/vnd.adobe.photoshop', // .psd
];

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} exceeds ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB limit`;
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
    if (files.length + droppedFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }
    for (const file of droppedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, [files.length]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (files.length + selectedFiles.length > MAX_FILES) {
        setError(`Maximum ${MAX_FILES} files allowed.`);
        return;
      }
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

    const form = e.currentTarget;
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value?.trim();
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value?.trim();
    const phone = (form.querySelector('[name="phone"]') as HTMLInputElement)?.value?.trim();

    if (!name || !email) {
      setError('Name and email are required.');
      setUploading(false);
      return;
    }

    try {
      const uploadedFiles: { key: string; fileName: string; fileSize: number }[] = [];

      for (const file of files) {
        const res = await fetch('/api/upload/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileSize: file.size,
            contentType: file.type || undefined,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Failed to get upload URL.');
          return;
        }
        const { uploadUrl, key } = data;
        if (!uploadUrl || !key) {
          setError('Invalid response from server.');
          return;
        }

        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: file.type ? { 'Content-Type': file.type } : {},
        });
        if (!putRes.ok) {
          setError(`Upload failed for ${file.name}. Please try again.`);
          return;
        }
        uploadedFiles.push({ key, fileName: file.name, fileSize: file.size });
      }

      const confirmRes = await fetch('/api/upload/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          files: uploadedFiles,
        }),
      });

      const confirmData = await confirmRes.json().catch(() => ({}));
      if (!confirmRes.ok) {
        setError(typeof confirmData.error === 'string' ? confirmData.error : 'Failed to save upload.');
        return;
      }

      setSuccess(true);
      setFiles([]);
      setError(null);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-semibold text-accent">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-accent">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border-2 border-border bg-white px-4 py-2.5 text-accent placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* File Upload Area */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-accent">
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
          <p className="text-lg font-medium mb-2 text-accent">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-muted-foreground">
            Supports: JPG, PNG, PDF, AI, EPS, PSD, ZIP (max 1GB per file, {MAX_FILES} files)
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
                <span className="text-sm truncate flex-1 text-accent">{file.name}</span>
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

      {/* Success Message */}
      {success && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm font-medium text-success"
        >
          <CheckCircle className="h-4 w-4 shrink-0" />
          Files uploaded successfully.
        </motion.p>
      )}

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