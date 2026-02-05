import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: process quote request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Quote request failed" },
      { status: 500 }
    );
  }
}
