import { Schema, model, models } from "mongoose";

export interface IArtworkFile {
  url: string;
  fileName: string;
  fileSize: number;
}

export interface IArtworkUpload {
  name: string;
  email: string;
  phone?: string;
  files: IArtworkFile[];
  createdAt: Date;
  updatedAt: Date;
}

const artworkFileSchema = new Schema<IArtworkFile>(
  {
    url: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
  },
  { _id: false }
);

const artworkUploadSchema = new Schema<IArtworkUpload>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    files: { type: [artworkFileSchema], required: true, default: [] },
  },
  { timestamps: true }
);

export const ArtworkUpload =
  models.ArtworkUpload ?? model<IArtworkUpload>("ArtworkUpload", artworkUploadSchema);
