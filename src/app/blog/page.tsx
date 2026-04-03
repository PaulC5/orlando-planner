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

export default function BlogPage() {
  const posts = getSortedBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Orlando Unpacked
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-gray-700 font-medium hover:text-orange-500 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/plan"
              className="inline-block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:shadow-lg text-white font-bold px-4 py-2 rounded-lg transition-all"
            >
              Plan My Trip
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
              The Orlando Unpacked Blog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Orlando Tips &amp; Guides
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Insider strategies for your perfect Orlando trip — from first-timer basics to crowd-beating Disney tactics to Kissimmee rental secrets.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts yet.</p>
          </div>
        ) : (
          <>
            {/* Featured post — full-width card */}
            {featuredPost && (
              <div className="mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Featured</p>
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <article className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    {/* Image */}
                    <div className="relative h-56 md:h-full min-h-[220px] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 overflow-hidden">
                      {featuredPost.featuredImage && (
                        <img
                          src={featuredPost.featuredImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {/* Gradient overlay for text contrast on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 sm:p-10">
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2.5 py-1 text-xs font-bold text-orange-600 bg-orange-100 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {featuredPost.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>
                          {new Date(featuredPost.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-orange-500 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Remaining posts grid */}
            {remainingPosts.length > 0 && (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">More Guides</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                        {/* Image */}
                        <div className="relative h-44 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 overflow-hidden flex-shrink-0">
                          {post.featuredImage && (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col p-5">
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block px-2.5 py-0.5 text-xs font-bold text-orange-600 bg-orange-100 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug flex-1">
                            {post.title}
                          </h2>

                          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-orange-500 font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to stop reading and start planning?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Answer a few quick questions and Katie will build you a personalized day-by-day Orlando itinerary — completely free.
          </p>
          <Link
            href="/plan"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Build My Itinerary
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500 text-sm">
          <p>
            Built by Katie, your AI-powered Orlando vacation planner.{" "}
            <Link href="/privacy" className="text-orange-500 hover:text-orange-600">
              Privacy
            </Link>{" "}
            •{" "}
            <Link href="/terms" className="text-orange-500 hover:text-orange-600">
              Terms
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
