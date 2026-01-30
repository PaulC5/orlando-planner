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
          <h1 className="text-4xl font-bold mb-2">Your Custom Orlando Plan</h1>
          <p className="opacity-90">
            Built by Katie for{" "}
            {answers?.email ? String(answers.email) : "your crew"} 🎢
          </p>
        </div>
      </div>

      {/* Itinerary Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Render markdown-ish content */}
          <div className="prose prose-lg max-w-none">
            {itinerary.split("\n").map((line, i) => {
              // Headers
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-bold text-blue-600 mt-8 mb-4">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-gray-800 mt-10 mb-4 pb-2 border-b">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("# ")) {
                return (
                  <h1 key={i} className="text-3xl font-bold text-gray-900 mb-6">
                    {line.replace("# ", "")}
                  </h1>
                );
              }
              // Bold lines (tips)
              if (line.startsWith("💡") || line.startsWith("🎯") || line.startsWith("⚠️")) {
                return (
                  <p key={i} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 text-gray-700">
                    {line}
                  </p>
                );
              }
              // List items
              if (line.startsWith("- ") || line.startsWith("* ")) {
                return (
                  <li key={i} className="ml-4 text-gray-700">
                    {line.replace(/^[-*] /, "")}
                  </li>
                );
              }
              // Checkboxes
              if (line.startsWith("[ ]") || line.startsWith("[x]")) {
                return (
                  <div key={i} className="flex items-center gap-2 my-2">
                    <input type="checkbox" className="w-5 h-5" readOnly />
                    <span className="text-gray-700">{line.replace(/^\[[ x]\] /, "")}</span>
                  </div>
                );
              }
              // Day headers
              if (line.startsWith("**Day ")) {
                return (
                  <h3 key={i} className="text-xl font-bold text-purple-600 mt-8 mb-4 flex items-center gap-2">
                    📅 {line.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              // Regular paragraphs
              if (line.trim()) {
                return (
                  <p key={i} className="text-gray-700 my-3 leading-relaxed">
                    {line}
                  </p>
                );
              }
              return <br key={i} />;
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Place to Stay?</h3>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            We partner with local vacation rental hosts in Kissimmee — just 15 minutes from the parks, 
            with pools, full kitchens, and way more space than a hotel room.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-full transition-all">
            View Recommended Rentals
          </button>
        </div>

        {/* Share / Save */}
        <div className="mt-8 flex gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50"
          >
            🖨️ Print / Save PDF
          </button>
          <Link
            href="/plan"
            className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50"
          >
            🔄 Start Over
          </Link>
        </div>
      </div>
    </main>
  );
}
