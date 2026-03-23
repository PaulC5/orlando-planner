import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  /** Max requests allowed in the window */
  limit: number;
  /** Window size in seconds */
  windowSeconds: number;
  /** Unique prefix for this limiter (e.g., "generate", "email") */
  prefix: string;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix timestamp when window resets
}

/**
 * Sliding-window rate limiter backed by Vercel KV.
 *
 * Each IP gets a counter key like "rl:generate:1.2.3.4" that auto-expires.
 * If KV is unavailable (e.g., local dev without a KV store), requests are
 * allowed through so development isn't blocked.
 */
export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const key = `rl:${config.prefix}:${ip}`;

  try {
    // Increment the counter; INCR creates the key if it doesn't exist
    const count = await kv.incr(key);

    // On first request in a window, set the expiry
    if (count === 1) {
      await kv.expire(key, config.windowSeconds);
    }

    // Get remaining TTL so we can report resetAt
    const ttl = await kv.ttl(key);
    const resetAt = Math.floor(Date.now() / 1000) + (ttl > 0 ? ttl : config.windowSeconds);

    if (count > config.limit) {
      return { allowed: false, remaining: 0, resetAt };
    }

    return {
      allowed: true,
      remaining: config.limit - count,
      resetAt,
    };
  } catch (error) {
    // If KV is down or not configured, allow the request through
    // (don't break the app over rate limiting)
    console.warn("Rate limit check failed (KV unavailable?):", error);
    return { allowed: true, remaining: config.limit, resetAt: 0 };
  }
}

/**
 * Helper: extract the real client IP, respecting common proxy headers.
 * Vercel sets x-forwarded-for automatically.
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be "client, proxy1, proxy2" — take the first
    return forwarded.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP.trim();
  return "unknown";
}

/**
 * Convenience: check rate limit and return a 429 response if exceeded.
 * Returns null if the request is allowed (caller should continue handling).
 */
export async function enforceRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  const result = await checkRateLimit(request, config);

  if (!result.allowed) {
    const retryAfter = result.resetAt - Math.floor(Date.now() / 1000);
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter > 0 ? retryAfter : 60),
          "X-RateLimit-Limit": String(config.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(result.resetAt),
        },
      }
    );
  }

  return null; // Allowed — continue
}
