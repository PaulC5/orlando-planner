"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ResultsPage() {
  const [itinerary, setItinerary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const generateItinerary = async () => {
      // Get answers from localStorage
      const stored = localStorage.getItem("orlandoPlanAnswers");
      if (!stored) {
        setError("No trip information found. Please start over.");
        setLoading(false);
        return;
      }

      const parsedAnswers = JSON.parse(stored);
      setAnswers(parsedAnswers);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedAnswers),
        });

        if (!response.ok) {
          throw new Error("Failed to generate itinerary");
        }

        const data = await response.json();
        setItinerary(data.itinerary);

        // Send email with itinerary
        if (parsedAnswers.email && data.itinerary) {
          try {
            await fetch("/api/send-itinerary", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: parsedAnswers.email,
                itinerary: data.itinerary,
              }),
            });
            // Silently succeed or fail - don't block user experience
          } catch (emailError) {
            console.log("Email delivery failed (non-critical):", emailError);
          }
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    generateItinerary();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-6 animate-bounce">🌴</div>
          <h2 className="text-2xl font-bold mb-2">Katie&apos;s Building Your Plan...</h2>
          <p className="opacity-75">Checking crowd calendars, optimizing park days, finding the good stuff...</p>
          <p className="opacity-50 text-sm mt-4">Usually takes about 20 seconds ☕</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold mb-4">{error}</h2>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-full"
          >
            Start Over
          </Link>
        </div>
      </main>
    );
  }

  // Parse itinerary into structured format
  const parseItinerary = (text: string) => {
    const lines = text.split("\n");
    const days: { title: string; activities: { icon: string; time?: string; text: string; type: string }[] }[] = [];
    let currentDay: { title: string; activities: { icon: string; time?: string; text: string; type: string }[] } | null = null;

    lines.forEach((line) => {
      const trimmed = line.trim();
      
      // Day headers
      if (trimmed.match(/^(Day \d+|## Day \d+|\*\*Day \d+)/i)) {
        if (currentDay) days.push(currentDay);
        currentDay = {
          title: trimmed.replace(/^#+\s*|\*\*/g, ""),
          activities: []
        };
      }
      // Activities with bullets or times
      else if (currentDay && trimmed && (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.match(/^\d{1,2}:\d{2}/))) {
        const text = trimmed.replace(/^[-*]\s*/, "");
        
        // Determine activity type and icon
        let icon = "🎯";
        let type = "activity";
        
        if (text.toLowerCase().includes("breakfast") || text.toLowerCase().includes("lunch") || text.toLowerCase().includes("dinner")) {
          icon = "🍽️";
          type = "meal";
        } else if (text.toLowerCase().includes("tip") || text.toLowerCase().includes("pro tip") || text.includes("💡")) {
          icon = "💡";
          type = "tip";
        } else if (text.toLowerCase().includes("park") || text.toLowerCase().includes("ride") || text.toLowerCase().includes("attraction")) {
          icon = "🎢";
          type = "park";
        } else if (text.toLowerCase().includes("hotel") || text.toLowerCase().includes("check-in") || text.toLowerCase().includes("rest")) {
          icon = "🏨";
          type = "rest";
        } else if (text.toLowerCase().includes("show") || text.toLowerCase().includes("parade")) {
          icon = "🎭";
          type = "show";
        }
        
        // Extract time if present
        const timeMatch = text.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
        const time = timeMatch ? timeMatch[1] : undefined;
        const cleanText = timeMatch && time ? text.replace(timeMatch[0], "").trim() : text;
        
        currentDay.activities.push({ icon, time, text: cleanText, type });
      }
    });
    
    if (currentDay) days.push(currentDay);
    return days;
  };

  const days = parseItinerary(itinerary);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/katie-avatar.png" 
              alt="Katie" 
              className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-center">Your Custom Orlando Plan ✨</h1>
          <p className="opacity-90 text-center">
            Built by Katie for{" "}
            {answers?.email ? String(answers.email) : "your crew"}
          </p>
        </div>
      </div>

      {/* Itinerary Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Katie's intro message */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-yellow-400">
          <div className="flex items-start gap-4">
            <img src="/katie-avatar.png" alt="Katie" className="w-12 h-12 rounded-full flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium mb-2">Hey! Here&apos;s your personalized Orlando itinerary.</p>
              <p className="text-gray-600 text-sm">
                I&apos;ve organized everything by day with timing suggestions. Feel free to adjust based on your energy levels and preferences. Have an amazing trip! 🎢
              </p>
            </div>
          </div>
        </div>

        {/* Day-by-day cards */}
        {days.length > 0 ? (
          <div className="space-y-6">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Day header */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    📅 {day.title}
                  </h2>
                </div>
                
                {/* Activities */}
                <div className="p-6 space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className={`flex gap-4 p-4 rounded-xl transition-all ${
                        activity.type === "tip"
                          ? "bg-yellow-50 border-l-4 border-yellow-400"
                          : activity.type === "meal"
                          ? "bg-orange-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 text-3xl">
                        {activity.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        {activity.time && (
                          <div className="text-sm font-semibold text-teal-600 mb-1">
                            {activity.time}
                          </div>
                        )}
                        <p className="text-gray-800 leading-relaxed">
                          {activity.text}
                        </p>
                        {activity.type === "tip" && (
                          <div className="text-xs text-gray-500 mt-1 italic">
                            — Katie&apos;s tip
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Fallback: render as formatted text if parsing fails
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              {itinerary.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <br key={i} />;
                
                if (trimmed.startsWith("### ")) {
                  return <h3 key={i} className="text-xl font-bold text-teal-600 mt-6 mb-3">{trimmed.replace("### ", "")}</h3>;
                }
                if (trimmed.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b">{trimmed.replace("## ", "")}</h2>;
                }
                if (trimmed.startsWith("# ")) {
                  return <h1 key={i} className="text-3xl font-bold text-gray-900 mb-6">{trimmed.replace("# ", "")}</h1>;
                }
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                  return <li key={i} className="ml-4 text-gray-700">{trimmed.replace(/^[-*] /, "")}</li>;
                }
                
                return <p key={i} className="text-gray-700 my-3">{trimmed}</p>;
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 font-medium transition-all shadow-md"
          >
            🖨️ Save as PDF
          </button>
          <Link
            href="/plan"
            className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md"
          >
            🔄 Create Another Plan
          </Link>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Place to Stay?</h3>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            We partner with local vacation rental hosts in Kissimmee — just 15 minutes from the parks, 
            with pools, full kitchens, and way more space than a hotel room.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-full transition-all shadow-lg">
            View Recommended Rentals
          </button>
        </div>

        {/* Footer with disclaimer */}
        <footer className="mt-12 text-center max-w-3xl mx-auto pb-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-gray-600 text-sm mb-6">
            <p className="mb-2">
              <strong>AI Disclaimer:</strong> Katie&apos;s recommendations are AI-generated and may not reflect real-time changes. 
              Always verify park hours, reservations, and critical details with official sources before your trip.
            </p>
            <p className="text-xs text-gray-500">
              We are not affiliated with Disney, Universal, or other theme parks mentioned.
            </p>
          </div>
          
          <div className="flex justify-center gap-6 text-gray-500 text-sm">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:hello@orlando-planner.com" className="hover:text-gray-700 transition-colors">
              Contact
            </a>
          </div>
          
          <p className="text-gray-400 text-xs mt-4">
            © 2026 Katie Orlando Planner
          </p>
        </footer>
      </div>
    </main>
  );
}
