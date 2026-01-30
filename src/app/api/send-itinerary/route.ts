import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, itinerary } = await request.json();

    if (!email || !itinerary) {
      return NextResponse.json(
        { error: "Email and itinerary are required" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log("Resend not configured - email not sent");
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 200 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format itinerary for email (basic HTML conversion)
    const htmlItinerary = formatItineraryHTML(itinerary);

    const data = await resend.emails.send({
      from: "Katie <onboarding@resend.dev>", // Use verified domain in production
      to: [email],
      subject: "Your Custom Orlando Trip Plan ✨",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Orlando Itinerary</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #fb923c, #ec4899, #9333ea); padding: 40px 20px; text-align: center;">
      <img src="https://orlando-planner-ten.vercel.app/katie-avatar.png" alt="Katie" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; margin-bottom: 16px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Your Custom Orlando Plan ✨</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Built by Katie just for you</p>
    </div>
    
    <!-- Intro Message -->
    <div style="padding: 30px 20px; border-left: 4px solid #fbbf24; background-color: #fffbeb; margin: 20px;">
      <p style="margin: 0 0 10px 0; color: #374151; font-size: 16px;"><strong>Hey! Here's your personalized Orlando itinerary.</strong></p>
      <p style="margin: 0; color: #6b7280; font-size: 14px;">I've organized everything by day with timing suggestions. Have an amazing trip! 🎢</p>
    </div>
    
    <!-- Itinerary Content -->
    <div style="padding: 0 20px 30px 20px; color: #374151; line-height: 1.6;">
      ${htmlItinerary}
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f3f4f6; padding: 30px 20px; text-align: center;">
      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px;">
        Need to make changes? <a href="https://orlando-planner-ten.vercel.app/plan" style="color: #14b8a6; text-decoration: none;">Create another plan →</a>
      </p>
      <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px;">
        <strong>AI Disclaimer:</strong> These recommendations are AI-generated. Always verify park hours, reservations, and critical details before your trip.
      </p>
      <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">
        © 2026 Katie Orlando Planner | 
        <a href="https://orlando-planner-ten.vercel.app/privacy" style="color: #9ca3af; text-decoration: none;">Privacy</a> | 
        <a href="https://orlando-planner-ten.vercel.app/terms" style="color: #9ca3af; text-decoration: none;">Terms</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error },
      { status: 500 }
    );
  }
}

function formatItineraryHTML(itinerary: string): string {
  const lines = itinerary.split("\n");
  let html = "";
  let inList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      return;
    }

    // Day headers
    if (trimmed.match(/^(Day \d+|## Day \d+|\*\*Day \d+)/i)) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      const dayText = trimmed.replace(/^#+\s*|\*\*/g, "");
      html += `<div style="background: linear-gradient(to right, #14b8a6, #06b6d4); color: white; padding: 16px; border-radius: 12px; margin: 24px 0 16px 0; font-weight: bold; font-size: 20px;">📅 ${dayText}</div>`;
    }
    // Section headers
    else if (trimmed.startsWith("### ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      html += `<h3 style="color: #14b8a6; font-size: 18px; margin: 20px 0 12px 0;">${trimmed.replace("### ", "")}</h3>`;
    }
    else if (trimmed.startsWith("## ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      html += `<h2 style="color: #374151; font-size: 20px; margin: 24px 0 12px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">${trimmed.replace("## ", "")}</h2>`;
    }
    // List items
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        html += '<ul style="margin: 8px 0; padding-left: 24px;">';
        inList = true;
      }
      const text = trimmed.replace(/^[-*]\s*/, "");
      const isTime = text.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
      if (isTime) {
        html += `<li style="margin: 8px 0; color: #374151;"><strong style="color: #14b8a6;">${isTime[1]}</strong> ${text.replace(isTime[0], "").trim()}</li>`;
      } else {
        html += `<li style="margin: 8px 0; color: #374151;">${text}</li>`;
      }
    }
    // Regular paragraphs
    else {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      // Check if it's a tip/important note
      if (trimmed.startsWith("💡") || trimmed.includes("Pro tip") || trimmed.includes("Note:")) {
        html += `<div style="background-color: #fffbeb; border-left: 4px solid #fbbf24; padding: 12px; margin: 12px 0; color: #92400e; font-size: 14px;">${trimmed}</div>`;
      } else {
        html += `<p style="margin: 12px 0; color: #374151;">${trimmed}</p>`;
      }
    }
  });

  if (inList) {
    html += "</ul>";
  }

  return html;
}
