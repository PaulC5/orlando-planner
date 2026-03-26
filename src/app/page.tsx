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
            alt="Katie, your Orlando AI Travel Concierge with Orlando theme parks in the background"
            className="w-full h-auto max-h-[600px] object-cover object-center"
          />

          {/* Desktop Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-end px-12">
            <div className="max-w-xl text-white text-right bg-gradient-to-l from-black/70 via-black/50 to-transparent p-8 rounded-lg">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                Your Orlando Trip,
                <br />
                <span className="text-yellow-300">Planned in 5 Minutes</span>
              </h1>
              <p className="text-lg lg:text-xl mb-6" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                Answer a few quick questions about your crew, your budget, and your vibe.
                Katie builds you a day-by-day itinerary with insider tips you won&apos;t find on Google.
              </p>
              <Link
                href="/plan"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-bold text-xl px-8 py-4 rounded-full transition-all transform hover:scale-105 focus:scale-105 shadow-lg"
              >
                Build My Free Itinerary
              </Link>
              <p className="mt-3 text-sm" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                No signup. No credit card. Just a plan that works.
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
              alt="Katie, your Orlando AI Travel Concierge"
              className="w-full h-auto"
            />

            {/* Text overlay at bottom of mobile hero */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/85 to-black/40 p-6 pb-8">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-3 drop-shadow-2xl">
                  Your Orlando Trip,
                  <br />
                  <span className="text-yellow-300">Planned in 5 Minutes</span>
                </h1>
                <p className="text-base mb-4 drop-shadow-xl">
                  Tell Katie about your crew and she&apos;ll build you a day-by-day itinerary with local insider tips.
                </p>
                <Link
                  href="/plan"
                  className="inline-block bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-300 text-gray-900 font-bold text-lg px-6 py-3 rounded-full shadow-lg"
                >
                  Build My Free Itinerary
                </Link>
                <p className="mt-2 text-sm drop-shadow-xl">
                  No signup. No credit card. Just a plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">

        {/* How It Works */}
        <section aria-labelledby="how-it-works-heading" className="mt-20 max-w-4xl mx-auto">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tell Katie About Your Trip</h3>
              <p className="text-white/80">
                Who&apos;s coming, how long you&apos;ve got, what parks you want, and how you feel about crowds. Takes about 2 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Katie Builds Your Plan</h3>
              <p className="text-white/80">
                She picks the right parks for the right days, maps out morning-to-evening schedules, and adds the tips only a local would know.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tweak It Until It&apos;s Perfect</h3>
              <p className="text-white/80">
                Want to swap a park day? Add a rest day? Just tell Katie and she&apos;ll update your plan on the spot.
              </p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section aria-labelledby="features-heading" className="mt-24 max-w-5xl mx-auto">
          <h2 id="features-heading" className="text-3xl font-bold text-white text-center mb-4">
            What&apos;s In Your Itinerary
          </h2>
          <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto text-lg">
            Not a vague list of &quot;top things to do.&quot; An actual plan built around your family, your dates, and your budget.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 text-white flex gap-4 border border-white/10">
              <div className="text-3xl flex-shrink-0" role="img" aria-label="Calendar">📅</div>
              <div>
                <h3 className="text-lg font-bold mb-1">Day-by-Day Schedule</h3>
                <p className="text-white/90 text-sm">
                  Morning, afternoon, and evening plans for every day of your trip. Not just &quot;go to Magic Kingdom&quot;&mdash;specific timing, ride order, and when to take breaks.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 text-white flex gap-4 border border-white/10">
              <div className="text-3xl flex-shrink-0" role="img" aria-label="Map pin">📍</div>
              <div>
                <h3 className="text-lg font-bold mb-1">Which Parks on Which Days</h3>
                <p className="text-white/90 text-sm">
                  Katie knows which days each park is least crowded. She&apos;ll sequence your parks so you dodge the worst lines.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 text-white flex gap-4 border border-white/10">
              <div className="text-3xl flex-shrink-0" role="img" aria-label="Fork and knife">🍽️</div>
              <div>
                <h3 className="text-lg font-bold mb-1">Restaurant Picks by Budget</h3>
                <p className="text-white/90 text-sm">
                  From quick-service spots the kids will love to character dining worth the splurge. Reservation timing included.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 text-white flex gap-4 border border-white/10">
              <div className="text-3xl flex-shrink-0" role="img" aria-label="Light bulb">💡</div>
              <div>
                <h3 className="text-lg font-bold mb-1">Local Insider Tips</h3>
                <p className="text-white/90 text-sm">
                  The stuff you only learn after living in Kissimmee for a decade&mdash;where to grocery shop, when to rope drop, and why mid-day breaks save trips.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Katie */}
        <section aria-labelledby="meet-katie-heading" className="mt-24 max-w-3xl mx-auto text-center">
          <img
            src="/katie-avatar.png"
            alt="Katie, your AI Orlando concierge"
            className="w-24 h-24 rounded-full shadow-lg mx-auto mb-6 border-4 border-white/30"
          />
          <h2 id="meet-katie-heading" className="text-3xl font-bold text-white mb-4">
            Meet Katie
          </h2>
          <p className="text-white/90 text-lg mb-3">
            Katie is an AI concierge trained on years of Orlando vacation rental hosting data.
            She&apos;s helped hundreds of families figure out the parks, the timing, the budget, and the stuff nobody tells you about until you&apos;re standing in a 90-minute line at noon.
          </p>
          <p className="text-white/70 text-base mb-8">
            She&apos;s not pretending to be human. She&apos;s just really good at this&mdash;and she works for free.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all transform hover:scale-105 focus:scale-105 shadow-lg"
          >
            Start Planning With Katie
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20 max-w-3xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur rounded-xl p-6 text-white/80 text-sm mb-6">
            <p className="mb-2">
              <strong>A quick note:</strong> Katie is powered by AI. She&apos;s trained on real Orlando data and she&apos;s pretty great,
              but park hours, prices, and ride closures change all the time. Always double-check the important stuff before you book.
            </p>
            <p className="text-xs opacity-75">
              Not affiliated with Disney, Universal, SeaWorld, or any other theme parks mentioned.
            </p>
          </div>

          <div className="flex justify-center gap-6 text-white/60 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:hello@orlando-planner.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-white/40 text-xs mt-4">
            &copy; 2026 Orlando Unpacked. Made with care for families headed to the Sunshine State.
          </p>
        </footer>
      </div>
    </main>
  );
}
