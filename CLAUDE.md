# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Katie" - an AI-powered Orlando vacation planner that creates personalized itineraries for families. The app uses a conversational, personality-driven approach with Katie as an AI concierge character based on 10+ years of vacation rental hosting experience.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Anthropic Claude API (Sonnet 4), Resend (email delivery)

**Deployment:** Vercel

## Development Commands

```bash
# Development server (runs on localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Variables

Required environment variables (create `.env.local`):

```
ANTHROPIC_API_KEY=sk-ant-...        # For AI itinerary generation (falls back to demo if missing)
RESEND_API_KEY=re_...               # For email delivery (optional, see SETUP_EMAIL.md)
```

## Architecture

### User Flow

1. **Landing page** (`/`) - Introduces Katie, explains the service, CTA to start planning
2. **Question flow** (`/plan`) - 12-question conversational survey collecting trip preferences
3. **Results page** (`/results`) - Generates itinerary via Claude API, displays results, sends email

### Key Components

**Pages:**
- `src/app/page.tsx` - Landing page with Katie's personality and value props
- `src/app/plan/page.tsx` - Client-side question flow with state management
- `src/app/results/page.tsx` - Itinerary generation and display
- `src/app/privacy/page.tsx` & `src/app/terms/page.tsx` - Legal pages

**API Routes:**
- `/api/generate` - POST endpoint that calls Claude API to generate itineraries
  - Uses extensive system prompt with Orlando insider knowledge (parks, timing, budget guidance)
  - Falls back to comprehensive demo itinerary if `ANTHROPIC_API_KEY` not set
  - Demo logic includes conditional rendering based on group composition, vibe, and park selection
- `/api/send-itinerary` - POST endpoint for email delivery via Resend
  - Formats markdown itinerary into HTML email template
  - Includes Katie branding and responsive design
  - Gracefully degrades if `RESEND_API_KEY` not configured

### Data Flow

1. User answers questions in `/plan` (stored in component state)
2. On submit, answers + email saved to `localStorage` and user redirected to `/results`
3. `/results` reads from `localStorage`, calls `/api/generate` to create itinerary
4. Itinerary displayed to user, then `/api/send-itinerary` called to email results
5. Email service is optional - app works without `RESEND_API_KEY`

### Katie's Voice

The entire app uses Katie's personality:
- Warm, practical, slightly cheeky
- AI-forward (celebrates being AI, doesn't hide it)
- Local expert with insider tips
- Family-focused but adapts to group type (adults-only, toddlers, teens, etc.)

Questions use conversational language ("First things first—is this your first rodeo in Orlando?") rather than formal survey-speak.

## Important Patterns

### Accessibility

This app prioritizes accessibility (see ACCESSIBILITY.md):
- Semantic HTML with proper landmarks (`<section>`, `<nav>`, `<footer>`)
- ARIA labels on all interactive elements
- Live regions for dynamic content announcements
- Keyboard navigation support with visible focus indicators
- Progress bar with `role="progressbar"` and `aria-valuenow`
- Email input properly labeled with `htmlFor` and `aria-describedby`

When modifying UI, maintain these a11y patterns.

### Resend Email Integration

Email delivery is lazy-loaded to prevent build-time errors:
- The Resend client is instantiated inside the API route, not at module level
- Check for `process.env.RESEND_API_KEY` before initializing
- Return graceful fallback if not configured (app still works)

See SETUP_EMAIL.md for email configuration details.

### Itinerary Generation

The `/api/generate/route.ts` contains two critical pieces:

1. **System Prompt** - Extensive Orlando expert knowledge including:
   - Park-specific strategies (best days, rope drop tips, crowds)
   - Budget tiers with specific guidance
   - Local Kissimmee tips (grocery stores, Kennedy Space Center)
   - Dining and accommodation recommendations

2. **Demo Itinerary Generator** - Fallback function with sophisticated logic:
   - Detects group composition (toddlers, teens, adults-only, seniors)
   - Customizes park day templates based on ages and vibe
   - Adjusts pacing (relaxed vs go-mode)
   - Provides seasonal tips based on timing
   - Builds day-by-day itinerary with personalized advice

When modifying generation logic, ensure both API and demo paths stay in sync.

### Design System

- Gradient branding: `from-orange-400 via-pink-500 to-purple-600`
- Primary CTA color: `yellow-400` (good contrast on gradients)
- Katie avatar: `/katie-avatar.png` (used in UI and emails)
- Responsive design: Mobile-first with breakpoints

## Path Aliases

TypeScript path alias configured: `@/*` maps to `./src/*`

## Git Commits

Recent commits follow a conventional style focusing on user-facing changes and fixes. Reference commit history for tone when creating commit messages.

## Legal & Disclaimers

All itineraries must end with the disclaimer:
```
*Prices and availability are approximate and subject to change. Always verify current rates when booking.*
```

Privacy and Terms pages exist at `/privacy` and `/terms` - keep these updated if data handling changes.
