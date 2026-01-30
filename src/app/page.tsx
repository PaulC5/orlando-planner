import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold z-50"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <div id="main-content" className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <div className="mb-6 flex justify-center">
            <img 
              src="/katie-avatar.png" 
              alt="Katie, your Orlando AI Concierge" 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hi! I&apos;m Katie,
            <br />
            <span className="text-yellow-300">Your Orlando AI Concierge</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            I&apos;ve planned 500+ Orlando vacations for families just like yours. 
            Tell me what you&apos;re looking for and I&apos;ll build you a personalized 
            itinerary—no stress, no endless Google tabs, just a plan that actually works.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-bold text-xl px-8 py-4 rounded-full transition-all transform hover:scale-105 focus:scale-105 shadow-lg"
          >
            Chat with Katie → It&apos;s Free
          </Link>
          <p className="mt-4 text-sm opacity-75">
            Takes 5 minutes. No signup. Just you, me, and a great vacation plan.
          </p>
        </div>

        {/* Features */}
        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Why families trust Katie</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
              <div className="text-4xl mb-4" role="img" aria-label="Castle">🏰</div>
              <h3 className="text-xl font-bold mb-2">Parks &amp; Crowds</h3>
              <p className="opacity-80">
                I know exactly which parks to hit on which days—and how to skip the worst lines. 
                Disney? Universal? LEGOLAND? I&apos;ve got you.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
              <div className="text-4xl mb-4" role="img" aria-label="Family">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2">Family-First Plans</h3>
              <p className="opacity-80">
                Got toddlers? Teenagers? Both? I&apos;ll plan around nap times, meltdowns, 
                and keeping everyone from murdering each other.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
              <div className="text-4xl mb-4" role="img" aria-label="Robot AI">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI That Actually Gets It</h3>
              <p className="opacity-80">
                I&apos;m trained on real vacation rental host data—the stuff TripAdvisor doesn&apos;t tell you. 
                Think of me as your friend who lives in Orlando and has seen it all.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section aria-label="Customer testimonials" className="text-center mt-20 text-white max-w-2xl mx-auto">
          <div className="text-5xl mb-4" role="img" aria-label="5 stars">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-lg opacity-90 italic">
            &quot;Katie saved our butts. We followed her plan and actually had FUN instead of 
            arguing in the Magic Kingdom parking lot at 2pm.&quot;
          </blockquote>
          <p className="mt-3 font-semibold">— Sarah M., family of 5 from Ohio</p>
        </section>

        {/* Footer disclaimer - kitschy + honest */}
        <footer className="text-center mt-16 text-white/60 text-sm max-w-xl mx-auto">
          <p>
            Katie is powered by AI and trained on Orlando vacation data. 
            She&apos;s not perfect, but she&apos;s pretty damn good. And free! <span role="img" aria-label="roller coaster">🎢</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
