import { NextRequest, NextResponse } from "next/server";
import { getPresignedPutUrl } from "@/lib/s3";

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
const MAX_FILES = 10;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/zip",
  "application/postscript",
  "image/vnd.adobe.photoshop",
];
const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|pdf|zip|ai|eps|psd)$/i;

type Body = { fileName: string; fileSize: number; contentType?: string };

function validateFilePayload(p: Body): string | null {
  if (typeof p.fileName !== "string" || !p.fileName.trim()) {
    return "fileName is required.";
  }
  if (typeof p.fileSize !== "number" || p.fileSize <= 0) {
    return "Valid fileSize is required.";
  }
  if (p.fileSize > MAX_FILE_SIZE) {
    return `File exceeds ${MAX_FILE_SIZE / 1024 / 1024 / 1024}GB limit.`;
  }
  const okType =
    (typeof p.contentType === "string" && ALLOWED_TYPES.includes(p.contentType)) ||
    ALLOWED_EXTENSIONS.test(p.fileName);
  if (!okType) {
    return "Unsupported file type (JPG, PNG, PDF, AI, EPS, PSD, ZIP).";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.AWS_S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { error: "Upload is not configured. Set AWS_S3_BUCKET and AWS credentials." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as Body;
    const err = validateFilePayload(body);
    if (err) {
      return NextResponse.json({ error: err }, { status: 400 });
    }

    const contentType =
      typeof body.contentType === "string" && body.contentType
        ? body.contentType
        : "application/octet-stream";

    const { uploadUrl, key } = await getPresignedPutUrl(body.fileName, contentType);

    return NextResponse.json({ uploadUrl, key });
  } catch (e) {
    console.error("Upload request API error:", e);
    return NextResponse.json(
      { error: "Failed to get upload URL. Please try again." },
      { status: 500 }
    );
  }
}
