import { Schema, model, models } from "mongoose";

export interface IQuoteRequest {
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  quantity?: string;
  product?: string;
  fileKey?: string;
  fileUrl?: string;
  fileName?: string;
  status: "new" | "viewed" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

const quoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    category: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    quantity: { type: String, trim: true },
    product: { type: String, trim: true },
    fileKey: { type: String, trim: true },
    fileUrl: { type: String, trim: true },
    fileName: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "viewed", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const QuoteRequest =
  models.QuoteRequest ?? model<IQuoteRequest>("QuoteRequest", quoteRequestSchema);
