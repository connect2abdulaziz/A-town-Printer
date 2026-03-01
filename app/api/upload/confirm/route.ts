import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ArtworkUpload } from "@/models/ArtworkUpload";
import { getPublicUrl } from "@/lib/s3";

const MAX_FILES = 10;

type FileEntry = { key: string; fileName: string; fileSize: number };
type Body = {
  name: string;
  email: string;
  phone?: string;
  files: FileEntry[];
};

function validateBody(body: unknown): { ok: true; data: Body } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || !Array.isArray((body as Body).files)) {
    return { ok: false, error: "Invalid request. name, email, and files are required." };
  }
  const b = body as Body;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (b.files.length === 0) return { ok: false, error: "At least one file is required." };
  if (b.files.length > MAX_FILES) return { ok: false, error: `Maximum ${MAX_FILES} files allowed.` };

  const files: FileEntry[] = [];
  for (let i = 0; i < b.files.length; i++) {
    const f = b.files[i];
    if (!f || typeof f.key !== "string" || typeof f.fileName !== "string" || typeof f.fileSize !== "number") {
      return { ok: false, error: `Invalid file entry at index ${i}.` };
    }
    files.push({ key: f.key, fileName: f.fileName, fileSize: f.fileSize });
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone: typeof b.phone === "string" ? b.phone.trim() || undefined : undefined,
      files,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validateBody(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const filesWithUrl = result.data.files.map((f) => ({
      url: getPublicUrl(f.key),
      fileName: f.fileName,
      fileSize: f.fileSize,
    }));

    await connectDB();
    await ArtworkUpload.create({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      files: filesWithUrl,
    });

    return NextResponse.json(
      {
        message: "Files uploaded successfully.",
        count: filesWithUrl.length,
        files: filesWithUrl.map((f) => ({ fileName: f.fileName, url: f.url })),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload confirm API error:", err);
    return NextResponse.json(
      { error: "Failed to save upload. Please try again." },
      { status: 500 }
    );
  }
}
