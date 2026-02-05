/**
 * File validation for artwork uploads.
 */

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
const MAX_FILE_SIZE_MB = 25;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File): ValidationResult {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Max ${MAX_FILE_SIZE_MB}MB.`,
    };
  }
  return { valid: true };
}

export function validateFiles(files: File[]): ValidationResult {
  for (const file of files) {
    const result = validateFile(file);
    if (!result.valid) return result;
  }
  return { valid: true };
}
