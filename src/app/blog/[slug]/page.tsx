import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

const siteUrl = "https://www.orlandounpacked.com";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    openGraph: {
      type: "article",
      locale: "en_US",
      url: postUrl,
      siteName: "Orlando Unpacked",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/katie-avatar.png",
              width: 400,
              height: 400,
              alt: "Katie — Your AI Orlando Travel Concierge",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.featuredImage ? [post.featuredImage] : ["/katie-avatar.png"],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const htmlContent = marked(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Orlando Unpacked",
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    image: post.featuredImage || "/katie-avatar.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-orange-500 font-semibold mb-8 hover:text-orange-600 transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative w-full h-96 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-lg overflow-hidden mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Article header */}
        <article>
          <header className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm font-semibold text-orange-600 bg-orange-50 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 border-t border-b border-gray-200 py-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 overflow-hidden">
                  <img
                    src="/katie-avatar.png"
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm">Orlando Unpacked</p>
                </div>
              </div>

              {/* Date and reading time */}
              <div className="flex items-center gap-4 text-sm">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent as string }}
              className="text-gray-700 leading-relaxed"
            />
          </div>
        </article>

        {/* CTA section */}
        <section className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-lg p-8 sm:p-12 text-white mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Ready to plan your trip?
              </h3>
              <p className="text-white/90 text-lg">
                Answer a few quick questions and Katie will build you a personalized day-by-day Orlando itinerary—completely free.
              </p>
            </div>
            <Link
              href="/plan"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all transform hover:scale-105 focus:scale-105 shadow-lg whitespace-nowrap"
            >
              Build My Itinerary
            </Link>
          </div>
        </section>

        {/* Related posts or next steps */}
        <section className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            More Orlando Tips
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our other guides for more strategies to plan your perfect Orlando vacation.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors"
          >
            Explore all blog posts →
          </Link>
        </section>
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
