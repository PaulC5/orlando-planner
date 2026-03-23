# Orlando Unpacked — Claude Project Instructions

You are helping Paul build and grow **Orlando Unpacked** (orlandounpacked.com), an AI-powered Orlando vacation planner. The product's AI concierge is named **Katie**.

## What This Product Does

Users answer 11 quick questions about their trip (group size, ages, dates, budget, parks, vibe, etc.), and Katie generates a personalized day-by-day Orlando itinerary in about 5 minutes. Free tier gets 1 generation. Paid tier ("Katie Pro", $4.99) gets unlimited generations + itinerary refinement.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4 (mobile-first)
- **AI:** Anthropic Claude API (Sonnet 4) — ~$0.08/generation, ~$0.09/refinement
- **Email:** Resend (optional, lazy-loaded)
- **Hosting:** Vercel (auto-deploys from `main` branch on GitHub: PaulC5/orlando-planner)
- **Domain:** orlandounpacked.com
- **Local branch:** `master` — push to Vercel with `git push origin master:main`

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page — hero, how-it-works, meet Katie |
| `src/app/plan/page.tsx` | 11-question quiz flow with localStorage persistence |
| `src/app/results/page.tsx` | Itinerary display, optional email capture, refinement UI, upgrade prompt |
| `src/app/api/generate/route.ts` | Claude API call to generate itineraries (injects today's date). Falls back to demo mode without API key |
| `src/app/api/refine/route.ts` | Claude API call for itinerary refinement. Server-side paid gating (returns 403 if not paid) |
| `src/app/api/send-itinerary/route.ts` | Resend email delivery |
| `src/lib/usage.ts` | Client-side freemium tracking (localStorage). Tracks generations, refinements, isPaid flag |
| `src/app/layout.tsx` | Root layout with full SEO: Open Graph, Twitter Cards, JSON-LD (WebApplication + FAQPage) |
| `src/app/sitemap.ts` | Auto-generated sitemap.xml |
| `src/app/robots.ts` | Robots.txt (blocks /api/ and /results) |

## Architecture Notes

- **localStorage persistence**: Quiz progress (`currentStep` + `answers`) persists across page refreshes. Uses lazy state initialization with `typeof window === "undefined"` checks.
- **Freemium gating is dual-layer**: Client-side checks in `usage.ts` + server-side `paid` flag check in `/api/refine`. The `isPaid` flag in localStorage is a placeholder — needs real auth/Stripe.
- **Demo mode**: Both `/api/generate` and `/api/refine` fall back gracefully without `ANTHROPIC_API_KEY`.
- **Email is post-itinerary**: Users get their itinerary first, then optionally provide email. No email gate.
- **Resend client** is instantiated inside the API route (not module-level) to prevent build errors.

## Katie's Voice

All user-facing copy should sound like Katie:
- Warm, practical, slightly cheeky
- AI-forward (celebrates being AI, doesn't hide it)
- Local Orlando expert with insider tips
- Family-focused but adapts to group type
- Conversational, not formal ("First things first — is this your first rodeo in Orlando?" not "Please select your experience level")

## Design System

- Gradient branding: `from-orange-400 via-pink-500 to-purple-600`
- Primary CTA: `yellow-400` on gradient backgrounds
- Katie avatar: `/katie-avatar.png`
- Theme color: `#f97316` (orange)
- Mobile-first responsive design

## Accessibility Requirements

Maintain these patterns in all UI changes:
- Semantic HTML (`<section>`, `<nav>`, `<footer>`)
- ARIA labels on all interactive elements
- Live regions for dynamic content
- Visible focus indicators
- Progress bar with `role="progressbar"` and `aria-valuenow`

## What's Shipped

- Full quiz flow with localStorage persistence
- AI itinerary generation with real-time date injection
- Post-itinerary email capture (optional, not gated)
- Itinerary refinement endpoint + UI (paid-only)
- Freemium architecture (client + server gating, placeholder Stripe)
- Landing page with outcome-focused copy
- Full SEO setup (meta, OG, Twitter Cards, JSON-LD, sitemap, robots.txt)
- Deployed to Vercel

## What's Pending

1. **Stripe integration** — wire `activatePaid()` in `usage.ts` to a real Stripe Checkout callback
2. **Real auth** — replace localStorage `isPaid` with session/token-based verification
3. **Share-your-itinerary** — shareable link showing Day 1 + trip overview with CTA to build your own
4. **OG image** — design proper 1200x630 social sharing image (`katie-hero.png` is referenced but may not exist yet)
5. **Card contrast fix** — "What's In Your Itinerary" cards on landing page have hard-to-read text on translucent pink backgrounds
6. ~~**Distribution / content**~~ — blog infrastructure shipped (`/blog` route, 3 cornerstone posts, SEO metadata, JSON-LD, sitemap). See `MARKETING_MVP.md` for the distribution plan and `CONTENT_STRATEGY.md` for the full content roadmap.
7. **GEO optimization** — blog now exists; ready to start (see MARKETING_MVP.md Phase 2)
8. **Vercel project cleanup** — two projects exist (`orlando-planner` and `orlando-unpacked`); production domain may need reconnecting

## Dev Commands

```bash
npm run dev          # localhost:3000
npm run build        # production build
npm run lint         # ESLint
npx tsc --noEmit     # type-check (use this instead of build for quick checks — turbopack has a known issue)
```

## Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...   # Required for real itinerary generation
RESEND_API_KEY=re_...          # Optional, for email delivery
```

## Legal

All itineraries must end with: *Prices and availability are approximate and subject to change. Always verify current rates when booking.*

## Working With Paul

- Paul is the solo founder/builder. He prefers direct, practical advice.
- He likes working through tasks one at a time from a prioritized list.
- He's comfortable with code but appreciates when trade-offs and costs are explained plainly.
- He's thinking about this as a real product — monetization, distribution, and growth matter alongside code quality.
