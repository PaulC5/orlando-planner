import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "edge";

interface ShareData {
  itinerary: string;
  answers: Record<string, unknown>;
  createdAt: string;
}

function extractDay1Title(itinerary: string): string {
  const match = itinerary.match(/(?:^|\n)(?:##?\s*)?Day\s*1[:\s—–-]*(.*)/i);
  if (match && match[1]) {
    return `Day 1: ${match[1].replace(/\*\*/g, "").trim()}`.slice(0, 60);
  }
  return "Day 1: Arrival & First Adventures";
}

function getParks(answers: Record<string, unknown>): string {
  if (Array.isArray(answers.parks) && answers.parks.length > 0) {
    const parks = answers.parks.filter(
      (p: string) => !p.toLowerCase().includes("not sure")
    );
    if (parks.length === 0) return "Custom Park Selection";
    if (parks.length <= 3) return parks.join(" · ");
    return `${parks.slice(0, 2).join(" · ")} + ${parks.length - 2} more`;
  }
  return "Orlando Theme Parks";
}

function getTripInfo(answers: Record<string, unknown>): string {
  const parts: string[] = [];
  if (answers.days) parts.push(String(answers.days));
  if (answers.groupSize) parts.push(String(answers.groupSize));
  if (answers.vibe) parts.push(String(answers.vibe));
  return parts.join(" · ") || "Custom Orlando Trip";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let day1Title = "Day 1: Arrival & First Adventures";
  let parks = "Orlando Theme Parks";
  let tripInfo = "Custom Orlando Trip";

  if (id) {
    try {
      const raw = await kv.get<string>(`share:${id}`);
      if (raw) {
        const data: ShareData = typeof raw === "string" ? JSON.parse(raw) : raw;
        day1Title = extractDay1Title(data.itinerary);
        parks = getParks(data.answers);
        tripInfo = getTripInfo(data.answers);
      }
    } catch {
      // Use defaults
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #fb923c 0%, #ec4899 50%, #9333ea 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 70px",
            flex: 1,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Top section */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                }}
              >
                🌴
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "22px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                Orlando Unpacked
              </div>
            </div>

            <div
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.15,
                marginBottom: "16px",
                display: "flex",
              }}
            >
              Check out my Orlando trip plan!
            </div>

            <div
              style={{
                fontSize: "24px",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.4,
                display: "flex",
              }}
            >
              {tripInfo}
            </div>
          </div>

          {/* Bottom section — Day 1 preview card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "20px",
              padding: "24px 30px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "white",
                    display: "flex",
                  }}
                >
                  📅 {day1Title}
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    color: "rgba(255,255,255,0.75)",
                    display: "flex",
                  }}
                >
                  🎢 {parks}
                </div>
              </div>
              <div
                style={{
                  background: "#facc15",
                  color: "#1a1a1a",
                  fontWeight: 700,
                  padding: "12px 28px",
                  borderRadius: "50px",
                  fontSize: "18px",
                  display: "flex",
                }}
              >
                Plan Your Own Trip →
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
