import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `You are Katie, an expert Orlando family vacation planner. The user has already received an itinerary from you. They're now asking you to adjust or refine it.

Rules:
- Keep your warm, slightly cheeky personality.
- Return the FULL updated itinerary (not just the changed parts) so it can replace the previous version.
- Maintain the same formatting style (day-by-day with bullet points).
- Always end with the disclaimer: "---\\n\\n*Prices and availability are approximate and subject to change. Always verify current rates when booking.*"
- If the request is unclear, make your best judgment and note what you assumed.`;

export async function POST(request: NextRequest) {
  // Rate limit: 10 refinements per IP per hour
  const rateLimited = await enforceRateLimit(request, {
    limit: 10,
    windowSeconds: 3600,
    prefix: "refine",
  });
  if (rateLimited) return rateLimited;

  try {
    const { itinerary, message, answers, paid } = await request.json();

    // Basic gating — in production, replace with real auth/payment verification
    // (e.g., check a Stripe session ID or JWT token)
    if (!paid) {
      return NextResponse.json(
        { error: "Upgrade to Katie Pro to refine your itinerary.", upgrade: true },
        { status: 403 }
      );
    }

    if (!itinerary || !message) {
      return NextResponse.json(
        { error: "Missing itinerary or message" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Without an API key, return a friendly message
      return NextResponse.json({
        itinerary,
        reply:
          "I'd love to tweak that for you, but I'm running in demo mode right now! Deploy with an API key and I can make real-time adjustments.",
      });
    }

    const userPrompt = `Here is the current itinerary I gave this family:

---
${itinerary}
---

Their original trip preferences: ${JSON.stringify(answers || {})}

They're now asking me to make this change:
"${message}"

Please return the full updated itinerary incorporating their request.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Claude API error:", errorData);
      return NextResponse.json(
        { error: "Failed to refine itinerary" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const refinedItinerary =
      data.content?.[0]?.text || "Sorry, I couldn't process that request.";

    return NextResponse.json({ itinerary: refinedItinerary });
  } catch (error) {
    console.error("Refine API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
