import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 10 share links per IP per hour
  const rateLimited = await enforceRateLimit(request, {
    limit: 10,
    windowSeconds: 3600,
    prefix: "share",
  });
  if (rateLimited) return rateLimited;

  try {
    const { itinerary, answers } = await request.json();

    if (!itinerary) {
      return NextResponse.json({ error: "Missing itinerary" }, { status: 400 });
    }

    // Generate a short, URL-friendly ID
    const id = randomBytes(6).toString("base64url"); // 8 chars, URL-safe

    const shareData = {
      itinerary,
      answers: answers || {},
      createdAt: new Date().toISOString(),
    };

    // Store in KV with 90-day TTL
    await kv.set(`share:${id}`, JSON.stringify(shareData), { ex: 60 * 60 * 24 * 90 });

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.orlandounpacked.com"}/share/${id}`;

    return NextResponse.json({ id, url: shareUrl });
  } catch (error) {
    console.error("Share save error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const raw = await kv.get<string>(`share:${id}`);
    if (!raw) {
      return NextResponse.json({ error: "Itinerary not found or expired" }, { status: 404 });
    }

    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Share fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve itinerary" },
      { status: 500 }
    );
  }
}
