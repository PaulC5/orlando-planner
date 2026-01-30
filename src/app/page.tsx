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

      {/* Hero Section - Desktop with overlay, Mobile portrait hero */}
      <div id="main-content">
        {/* Desktop Hero Image - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden">
          <img 
            src="/katie-hero.png" 
            alt="Katie, your Orlando AI Concierge with Orlando theme parks in the background" 
            className="w-full h-auto max-h-[600px] object-cover object-center"
          />
          
          {/* Desktop Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-end px-12">
            <div className="max-w-xl text-white text-right bg-gradient-to-l from-black/50 to-transparent p-8 rounded-lg">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 drop-shadow-lg">
                Hi! I&apos;m Katie,
                <br />
                <span className="text-yellow-300">Your Orlando AI Concierge</span>
              </h1>
              <p className="text-lg lg:text-xl mb-6 opacity-95 drop-shadow-md">
                I&apos;ve planned 500+ Orlando vacations for families just like yours. 
                Let me build you a personalized itinerary—no stress, no endless Google tabs.
              </p>
              <Link
                href="/plan"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-bold text-xl px-8 py-4 rounded-full transition-all transform hover:scale-105 focus:scale-105 shadow-lg"
              >
                Chat with Katie → It&apos;s Free
              </Link>
              <p className="mt-3 text-sm opacity-90 drop-shadow">
                Takes 5 minutes. No signup required.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Hero Section - only visible on mobile */}
        <div className="md:hidden">
          {/* Mobile Portrait Hero Image */}
          <div className="relative">
            <img 
              src="/katie-hero-mobile.png" 
              alt="Katie, your Orlando AI Concierge" 
              className="w-full h-auto"
            />
            
            {/* Text overlay at bottom of mobile hero - stronger background for readability */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-black/40 p-6 pb-8">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-3 drop-shadow-2xl">
                  Hi! I&apos;m Katie,
                  <br />
                  <span className="text-yellow-300">Your Orlando AI Concierge</span>
                </h1>
                <p className="text-base mb-4 drop-shadow-xl">
                  I&apos;ve planned 500+ Orlando vacations. Let me build you a personalized itinerary.
                </p>
                <Link
                  href="/plan"
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-300 text-gray-900 font-bold text-lg px-6 py-3 rounded-full shadow-lg"
                >
                  Chat with Katie → It&apos;s Free
                </Link>
                <p className="mt-2 text-sm drop-shadow-xl">
                  Takes 5 minutes. No signup required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">

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
