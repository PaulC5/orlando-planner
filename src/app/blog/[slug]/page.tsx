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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

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
        ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/katie-avatar.png", width: 400, height: 400, alt: "Katie — Your AI Orlando Travel Concierge" }],
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500 mb-4">
            404
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Post not found
          </h1>
          <p className="text-gray-500 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all"
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

      {/* Gradient hero header */}
      <div className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/[0.07]" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-white/[0.05] border border-white/20" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-orange-600/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All articles
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-8">
            {post.title}
          </h1>

          {/* Author + meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0">
                <img
                  src="/katie-avatar.png"
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">{post.author}</p>
                <p className="text-white/60 text-xs mt-0.5">Orlando Unpacked</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/20" />

            <div className="flex items-center gap-3 text-white/70 text-sm">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-white/30">•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <article>
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-a:text-orange-500 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-4 prose-blockquote:border-orange-400 prose-blockquote:text-gray-500
              prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:rounded prose-code:text-sm
            "
          >
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent as string }}
              className="text-gray-600 leading-relaxed"
            />
          </div>
        </article>

        {/* CTA */}
        <section className="mt-16 relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/[0.07]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-600/20" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Ready to plan your trip?
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Answer a few quick questions and Katie will build you a personalized
                day-by-day Orlando itinerary — completely free.
              </p>
            </div>
            <Link
              href="/plan"
              className="flex-shrink-0 inline-block bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-gray-900 font-extrabold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all shadow-xl whitespace-nowrap"
            >
              Build My Itinerary
            </Link>
          </div>
        </section>

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Explore all guides
          </Link>
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
