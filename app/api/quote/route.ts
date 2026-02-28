import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { QuoteRequest } from "@/models/QuoteRequest";
import { sendQuoteNotificationEmails } from "@/lib/utils/email";

type QuoteBody = {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
  quantity?: string;
  product?: string;
};

type ValidatedQuoteData = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  category?: string;
  quantity?: string;
  product?: string;
};

function validate(body: QuoteBody): { ok: true; data: ValidatedQuoteData } | { ok: false; error: string } {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!message) return { ok: false, error: "Project details (message) are required." };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { ok: false, error: "Please enter a valid email address." };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
      category: typeof body.category === "string" ? body.category.trim() || undefined : undefined,
      message,
      quantity: typeof body.quantity === "string" ? body.quantity.trim() || undefined : undefined,
      product: typeof body.product === "string" ? body.product.trim() || undefined : undefined,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuoteBody;
    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await connectDB();
    const doc = await QuoteRequest.create({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      category: result.data.category,
      message: result.data.message,
      quantity: result.data.quantity,
      product: result.data.product,
      status: "new",
    });

    try {
      await sendQuoteNotificationEmails({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        category: result.data.category,
        message: result.data.message,
        quantity: result.data.quantity,
        product: result.data.product,
      });
    } catch (err) {
      console.error("Quote email notification error:", err);
    }

    return NextResponse.json(
      { message: "Quote request saved.", id: doc._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json(
      { error: "Failed to save quote request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const list = await QuoteRequest.find()
      .sort({ createdAt: -1 })
      .lean();
    const serialized = list.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      phone: item.phone,
      category: item.category,
      message: item.message,
      quantity: item.quantity,
      product: item.product,
      fileUrl: item.fileUrl,
      fileName: item.fileName,
      status: item.status,
      createdAt: item.createdAt,
    }));
    return NextResponse.json(serialized);
  } catch (err) {
    console.error("Quote list API error:", err);
    return NextResponse.json(
      { error: "Failed to load quote requests." },
      { status: 500 }
    );
  }
}
