import { Metadata } from "next";
import { kv } from "@vercel/kv";
import Link from "next/link";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

interface ShareData {
  itinerary: string;
  answers: Record<string, unknown>;
  createdAt: string;
}

// Parse itinerary markdown into day objects (server-side version)
function parseItinerary(text: string) {
  const lines = text.split("\n");
  const days: { title: string; activities: { icon: string; time?: string; text: string; type: string }[] }[] = [];
  let currentDay: typeof days[0] | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.match(/^(Day \d+|## Day \d+|\*\*Day \d+)/i)) {
      if (currentDay) days.push(currentDay);
      currentDay = {
        title: trimmed.replace(/^#+\s*|\*\*/g, ""),
        activities: [],
      };
    } else if (
      currentDay &&
      trimmed &&
      (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.match(/^\d{1,2}:\d{2}/))
    ) {
      const text = trimmed.replace(/^[-*]\s*/, "");

      let icon = "🎯";
      let type = "activity";

      if (/breakfast|lunch|dinner/i.test(text)) {
        icon = "🍽️";
        type = "meal";
      } else if (/tip|pro tip/i.test(text) || text.includes("💡")) {
        icon = "💡";
        type = "tip";
      } else if (/park|ride|attraction/i.test(text)) {
        icon = "🎢";
        type = "park";
      } else if (/hotel|check-in|rest/i.test(text)) {
        icon = "🏨";
        type = "rest";
      } else if (/show|parade/i.test(text)) {
        icon = "🎭";
        type = "show";
      }

      const timeMatch = text.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
      const time = timeMatch ? timeMatch[1] : undefined;
      const cleanText = timeMatch && time ? text.replace(timeMatch[0], "").trim() : text;

      currentDay.activities.push({ icon, time, text: cleanText, type });
    }
  });

  if (currentDay) days.push(currentDay);
  return days;
}

// Extract trip summary from answers for OG tags
function getTripSummary(answers: Record<string, unknown>) {
  const parts: string[] = [];
  if (answers.days) parts.push(String(answers.days));
  if (answers.groupSize) parts.push(String(answers.groupSize));
  if (Array.isArray(answers.parks) && answers.parks.length > 0) {
    const parkNames = answers.parks.slice(0, 3).join(", ");
    parts.push(parkNames);
  }
  return parts.length > 0 ? parts.join(" · ") : "Custom Orlando Itinerary";
}

async function getShareData(id: string): Promise<ShareData | null> {
  try {
    const raw = await kv.get<string>(`share:${id}`);
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getShareData(id);

  if (!data) {
    return { title: "Itinerary Not Found" };
  }

  const summary = getTripSummary(data.answers);
  const title = "Check out my Orlando trip plan!";
  const description = `${summary} — Built by Katie, your AI Orlando concierge. Plan your own trip free in 5 minutes.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.orlandounpacked.com";
  const ogImageUrl = `${siteUrl}/api/og?id=${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteUrl}/share/${id}`,
      siteName: "Orlando Unpacked",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Orlando Trip Plan by Katie",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  const data = await getShareData(id);

  if (!data) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-3xl font-bold mb-4">Itinerary Not Found</h1>
          <p className="opacity-90 mb-8 max-w-md mx-auto">
            This share link may have expired or the itinerary was removed. Share links are available for 90 days.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg text-lg"
          >
            Plan Your Own Trip — Free
          </Link>
        </div>
      </main>
    );
  }

  const days = parseItinerary(data.itinerary);
  const day1 = days[0] || null;
  const totalDays = days.length;
  const summary = getTripSummary(data.answers);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/katie-avatar.png"
              alt="Katie — AI Orlando Concierge"
              className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Someone planned an Orlando trip with Katie!
          </h1>
          <p className="opacity-90 text-lg">{summary}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Katie intro */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-yellow-400">
          <div className="flex items-start gap-4">
            <img src="/katie-avatar.png" alt="Katie" className="w-12 h-12 rounded-full flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium mb-1">Here&rsquo;s a sneak peek at Day 1 of their trip!</p>
              <p className="text-gray-500 text-sm">
                Want your own personalized Orlando itinerary? It takes about 5 minutes and it&rsquo;s totally free.
              </p>
            </div>
          </div>
        </div>

        {/* Day 1 preview */}
        {day1 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                📅 {day1.title}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {day1.activities.map((activity, i) => (
                <div
                  key={i}
                  className={`flex gap-4 p-4 rounded-xl transition-all ${
                    activity.type === "tip"
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : activity.type === "meal"
                      ? "bg-orange-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex-shrink-0 text-3xl">{activity.icon}</div>
                  <div className="flex-1">
                    {activity.time && (
                      <div className="text-sm font-semibold text-teal-600 mb-1">{activity.time}</div>
                    )}
                    <p className="text-gray-800 leading-relaxed">{activity.text}</p>
                    {activity.type === "tip" && (
                      <div className="text-xs text-gray-500 mt-1 italic">— Katie&rsquo;s tip</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-gray-500">
            <p>Preview unavailable for this itinerary.</p>
          </div>
        )}

        {/* Remaining days teaser */}
        {totalDays > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">
                Plus {totalDays - 1} more day{totalDays - 1 > 1 ? "s" : ""} of Orlando magic
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {days.slice(1).map((day, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-500"
                  >
                    📅 {day.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want your own Orlando plan?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Katie builds a personalized, day-by-day itinerary based on your crew, budget, and park picks. Free, no signup, takes about 5 minutes.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-10 py-4 rounded-full transition-all shadow-lg text-lg"
          >
            Plan My Trip — It&rsquo;s Free
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center pb-8">
          <div className="flex justify-center gap-6 text-gray-400 text-sm">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-4">© 2026 Katie Orlando Planner</p>
        </footer>
      </div>
    </main>
  );
}
