/**
 * Client-side usage tracking for freemium gating.
 *
 * Free tier:  1 itinerary generation, 0 refinements
 * Paid tier:  unlimited generations + refinements
 *
 * For now "paid" is tracked via a simple localStorage flag.
 * Replace with real auth / payment verification later.
 */

const USAGE_KEY = "orlandoUsage";

interface UsageData {
  generations: number;
  refinements: number;
  isPaid: boolean;
  /** ISO timestamp of first generation — useful for trial windows later */
  firstGeneratedAt: string | null;
}

const DEFAULT_USAGE: UsageData = {
  generations: 0,
  refinements: 0,
  isPaid: false,
  firstGeneratedAt: null,
};

const FREE_LIMITS = {
  generations: 1,
  refinements: 0,
} as const;

function getUsage(): UsageData {
  if (typeof window === "undefined") return { ...DEFAULT_USAGE };
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (raw) return { ...DEFAULT_USAGE, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_USAGE };
}

function saveUsage(data: UsageData) {
  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(data));
  } catch {}
}

/** Record that a generation happened. */
export function recordGeneration() {
  const usage = getUsage();
  usage.generations += 1;
  if (!usage.firstGeneratedAt) {
    usage.firstGeneratedAt = new Date().toISOString();
  }
  saveUsage(usage);
}

/** Record that a refinement happened. */
export function recordRefinement() {
  const usage = getUsage();
  usage.refinements += 1;
  saveUsage(usage);
}

/** Can this user generate another itinerary? */
export function canGenerate(): boolean {
  const usage = getUsage();
  if (usage.isPaid) return true;
  return usage.generations < FREE_LIMITS.generations;
}

/** Can this user refine their itinerary? */
export function canRefine(): boolean {
  const usage = getUsage();
  if (usage.isPaid) return true;
  return usage.refinements < FREE_LIMITS.refinements;
}

/** Is this user on the paid tier? */
export function isPaidUser(): boolean {
  return getUsage().isPaid;
}

/** Get current usage snapshot (for UI display). */
export function getUsageSnapshot() {
  const usage = getUsage();
  return {
    ...usage,
    limits: FREE_LIMITS,
    generationsRemaining: usage.isPaid
      ? Infinity
      : Math.max(0, FREE_LIMITS.generations - usage.generations),
    refinementsRemaining: usage.isPaid
      ? Infinity
      : Math.max(0, FREE_LIMITS.refinements - usage.refinements),
  };
}

/**
 * Mark user as paid. In production, replace this with a real
 * payment verification callback (Stripe webhook, etc.).
 */
export function activatePaid() {
  const usage = getUsage();
  usage.isPaid = true;
  saveUsage(usage);
}
