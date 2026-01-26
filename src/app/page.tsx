import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plan Your Perfect
            <br />
            <span className="text-yellow-300">Orlando Vacation</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Answer a few questions. Get a personalized day-by-day itinerary 
            built by local experts who&apos;ve helped hundreds of families.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Start Planning → Free
          </Link>
          <p className="mt-4 text-sm opacity-75">
            Takes about 5 minutes. No signup required.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">🏰</div>
            <h3 className="text-xl font-bold mb-2">Disney &amp; Universal</h3>
            <p className="opacity-80">
              Know exactly which parks to visit on which days. Skip the crowds.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold mb-2">Built for Families</h3>
            <p className="opacity-80">
              Itineraries that account for nap times, meltdowns, and keeping everyone happy.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Local Knowledge</h3>
            <p className="opacity-80">
              Tips from vacation rental hosts who live here and know the real secrets.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-20 text-white">
          <p className="text-lg opacity-75">
            &quot;This saved us so much stress. We actually enjoyed our trip instead of arguing about what to do next.&quot;
          </p>
          <p className="mt-2 font-semibold">— Sarah M., family of 5 from Ohio</p>
        </div>
      </div>
    </main>
  );
}
