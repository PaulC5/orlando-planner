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

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80"
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

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Orlando Vacation Tips & Guides
          </h1>
          <p className="text-xl text-gray-600">
            Expert strategies for planning your perfect Orlando trip. From first-timer guides to budget hacks to Disney insider tips.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative w-full h-48 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description/Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {post.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>By {post.author}</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Read more link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-orange-500 font-semibold mt-4 hover:text-orange-600 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600">
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
