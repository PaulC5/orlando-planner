import { NextRequest, NextResponse } from "next/server";

/**
 * Global middleware that runs before API routes.
 * Handles origin validation and basic bot filtering for POST endpoints.
 */
export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // GET requests are less dangerous — let them through
  if (request.method === "GET") {
    return NextResponse.next();
  }

  // --- Origin / Referer check ---
  // Blocks cross-origin POST requests from random scripts/sites.
  // Only enforced in production (so local dev isn't annoying).
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (process.env.NODE_ENV === "production") {
    const allowedHosts = getAllowedHosts();

    const originOk = origin && allowedHosts.some((h) => origin.includes(h));
    const refererOk = referer && allowedHosts.some((h) => referer.includes(h));

    if (!originOk && !refererOk) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }
  }

  // --- Basic bot filtering ---
  // Block requests with no User-Agent (almost always scripts)
  const ua = request.headers.get("user-agent") || "";
  if (!ua || ua.length < 10) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // Block well-known bot User-Agent strings
  const botPatterns = /curl|wget|python-requests|httpie|postman|insomnia|bot|crawl|spider|scrape/i;
  if (botPatterns.test(ua)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

function getAllowedHosts(): string[] {
  const hosts = [
    "orlandounpacked.com",
    "orlando-planner",     // covers *.vercel.app preview deployments
  ];

  // Allow custom domain if configured
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const url = new URL(siteUrl);
      hosts.push(url.hostname);
    } catch {
      // Invalid URL, skip
    }
  }

  return hosts;
}

export const config = {
  matcher: "/api/:path*",
};
