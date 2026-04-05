import type { Metadata } from "next";
import Link from "next/link";
import { getSortedBlogPosts } from "@/lib/blog";

const siteUrl = "https://www.orlandounpacked.com";

export const metadata: Metadata = {
  title: "Blog | Orlando Unpacked",
  description:
    "Expert tips, strategies, and insider knowledge for planning your perfect Orlando vacation. Read our guides on Disney World, theme parks, budgets, and local favorites.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/blog`,
    siteName: "Orlando Unpacked",
    title: "Blog | Orlando Unpacked",
    description:
      "Expert Orlando vacation planning tips, Disney strategies, budget guides, and insider knowledge.",
    images: [
      {
        url: "/katie-avatar.png",
        width: 400,
        height: 400,
        alt: "Katie — Your AI Orlando Travel Concierge",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Blog | Orlando Unpacked",
    description:
      "Expert tips for planning your Orlando vacation. Guides on Disney World, Universal, budgets, and local favorites.",
    images: ["/katie-avatar.png"],
  },
};

function calcReadingTime(content: string): number {
  return Math.ceil(content.trim().split(/\s+/).length / 200);
}

function formatDate(dateStr: string, short = false): string {
  return new Date(dateStr).toLocaleDateString("en-US", short
    ? { month: "short", day: "numeric", year: "numeric" }
    : { month: "long", day: "numeric", year: "numeric" }
  );
}

const CARD_COLORS = [
  "from-orange-400 via-pink-500 to-purple-600",
  "from-blue-500 via-indigo-500 to-purple-600",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-violet-500 via-purple-500 to-pink-500",
  "from-cyan-400 via-blue-500 to-indigo-600",
];

export default function BlogPage() {
  const posts = getSortedBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Orlando Unpacked
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-gray-700 font-medium hover:text-orange-500 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/plan"
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Plan My Trip
            </Link>
          </div>
        </nav>
      </header>

      {/* Editorial page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500 mb-4">
            The Orlando Unpacked Blog
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-none mb-5">
            Orlando Tips<br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              &amp; Guides
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-lg leading-relaxed">
            Insider strategies from 10+ years of hosting Orlando families — parks, budgets, and rental secrets.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured hero post */}
            {featuredPost && (
              <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                    Featured
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <article className="grid md:grid-cols-[2fr_3fr] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                    {/* Gradient panel */}
                    <div className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 min-h-[260px] md:min-h-[380px] overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/[0.08]" />
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 rounded-full bg-white/[0.06] border border-white/20" />
                      <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full bg-orange-600/25" />
                      {/* Reading time badge */}
                      <div className="absolute bottom-6 left-6">
                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-medium px-3.5 py-1.5 rounded-full">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {calcReadingTime(featuredPost.content)} min read
                        </div>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div className="bg-white flex flex-col justify-center p-8 lg:p-12 xl:p-14">
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {featuredPost.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4 group-hover:text-orange-500 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>

                      <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 line-clamp-3">
                        {featuredPost.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-purple-600 ring-2 ring-orange-100 flex-shrink-0">
                            <img
                              src="/katie-avatar.png"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-none">
                              {featuredPost.author}
                            </p>
                            <time
                              className="text-xs text-gray-400 mt-0.5 block"
                              dateTime={featuredPost.date}
                            >
                              {formatDate(featuredPost.date)}
                            </time>
                          </div>
                        </div>

                        <span className="flex items-center gap-1.5 text-sm font-bold text-orange-500 group-hover:gap-3 transition-all duration-300">
                          Read article
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </section>
            )}

            {/* More guides grid */}
            {remainingPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                    More Guides
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {remainingPosts.map((post, idx) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        {/* Color top panel */}
                        <div
                          className={`relative h-36 bg-gradient-to-br ${CARD_COLORS[idx % CARD_COLORS.length]} flex-shrink-0 overflow-hidden`}
                        >
                          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10" />
                          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-black/10" />
                          <div className="absolute bottom-3.5 left-4 text-white/80 text-xs font-medium flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {calcReadingTime(post.content)} min read
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col p-6">
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 text-[11px] font-semibold text-gray-500 bg-gray-100 rounded-full tracking-wide"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight leading-snug mb-2.5 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2 flex-1">
                            {post.title}
                          </h2>

                          <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2 mb-5">
                            {post.description}
                          </p>

                          <time className="text-xs text-gray-400 font-medium" dateTime={post.date}>
                            {formatDate(post.date, true)}
                          </time>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-24 relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-10 sm:p-16 text-center text-white">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/[0.07]" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-orange-600/20" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Ready to stop reading<br className="hidden sm:block" /> and start planning?
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Answer a few quick questions and Katie will build you a personalized day-by-day Orlando itinerary — completely free.
            </p>
            <Link
              href="/plan"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-lg px-10 py-4 rounded-full hover:scale-105 transition-all shadow-2xl"
            >
              Build My Itinerary
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-400 text-sm">
          <p>
            Built by Katie, your AI-powered Orlando vacation planner.{" "}
            <Link href="/privacy" className="text-orange-500 hover:text-orange-600 transition-colors">
              Privacy
            </Link>{" "}
            •{" "}
            <Link href="/terms" className="text-orange-500 hover:text-orange-600 transition-colors">
              Terms
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
