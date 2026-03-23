# Orlando Unpacked — Marketing & Distribution MVP

**Owner:** Paul (solo founder)
**Date:** March 22, 2026
**Goal:** Get to 500 organic visitors/month and 50 itinerary generations/month within 90 days, spending <$100/month.

---

## The Thesis

Families planning Orlando vacations search for advice 4-8 weeks before their trip. That search happens on Google, Reddit, Pinterest, and TikTok. We need to be there with content that's better than the SEO-farm garbage they're currently reading — and every piece of content funnels to `/plan`.

Katie's personality is the moat. Nobody else has an AI concierge with this much voice. The content doesn't need to be the most comprehensive — it needs to be the most *useful* and the most *shareable*.

---

## Phase 1: Foundation (Weeks 1-2) — DONE ✅

### Blog Infrastructure
The `/blog` route is live with:
- 3 cornerstone posts published (first-timers guide, Disney planning, budget guide)
- SEO metadata, JSON-LD BlogPosting schema, Open Graph on every post
- Sitemap auto-includes new posts
- Each post has Katie's avatar, reading time, and a gradient CTA to `/plan`
- Mobile-responsive, matches the site design system

### What's deployed:
| Post | Target Keywords | Funnel Role |
|------|----------------|-------------|
| First-Timer's Guide to Orlando | "first time Orlando", "Orlando theme parks guide" | Top of funnel — catches planners early |
| How to Plan a Disney World Trip | "plan Disney World trip", "Disney trip planner" | Mid funnel — high intent, converts to /plan |
| Orlando on a Budget | "Orlando on a budget", "cheap Orlando vacation" | Mid funnel — budget-conscious families → Katie Pro upsell |

---

## Phase 2: SEO + Reddit (Weeks 3-6)

This is the highest-leverage work. Blog SEO and Reddit are both free, high-intent, and testable fast.

### Blog: Publish 1 post/week

**Week 3:** "Universal vs Disney: Which Should Your Family Visit?"
- Keywords: "Universal vs Disney" (1.2K/mo search volume)
- This is the highest-volume keyword we can realistically rank for early

**Week 4:** "How Many Days Do You Need in Orlando?"
- Keywords: "how many days Orlando" + "Orlando vacation" (1.1K/mo combined)
- Natural Katie funnel: "Not sure? That's literally what I figure out for you"

**Week 5:** "The Best (and Worst) Days to Visit Each Orlando Park"
- Keywords: "best days Disney" (180/mo), evergreen, updated seasonally
- Shareable on Pinterest and Reddit

**Week 6:** "Skip These Rides (Even Locals Avoid Them)"
- Contrarian angle = social shares
- Low keyword volume but high engagement/backlink potential

**Writing process:** Use Claude to draft in Katie's voice → Paul edits for accuracy → publish. Each post takes ~1 hour total.

### Reddit: Participate, Don't Promote

**Target subreddits:**
- r/WaltDisneyWorld (800K+ members)
- r/UniversalOrlando (150K+)
- r/orlando (350K+)
- r/travel (9M+, occasional Orlando threads)
- r/Shoestring (budget travel)

**The play:** Spend 15-20 minutes/day answering Orlando planning questions. Be genuinely helpful. After 2-3 weeks of comment history, you can naturally mention "I built a free tool for this" when it's relevant. Don't link-drop — describe what Katie does and let people find it.

**What "good" looks like:** 3-5 helpful comments/week. One mention of orlandounpacked.com per week, max, and only when someone is literally asking for a planning tool.

**Signal to track:** Are people clicking through from Reddit? (Check referral traffic in Vercel Analytics.) If yes after 4 weeks, keep going. If no, shift time to Pinterest.

### Google Search Console Setup
- Verify orlandounpacked.com
- Submit sitemap
- Monitor which queries are getting impressions (this tells you what to write next)

---

## Phase 3: Social (Weeks 5-8) — Pick ONE Platform

Don't try to be everywhere. Pick the one platform that gets traction and double down.

### Test: Pinterest vs TikTok (2 weeks each)

**Pinterest (Weeks 5-6):**
- Create 15-20 pins from the existing 3 blog posts (each post → 5-6 pins)
- Pin format: Bold title text on colorful background, linking to blog post
- Tool: Canva free tier + native Pinterest scheduling
- Time: ~2 hours/week
- **Success metric:** 50+ outbound clicks to orlandounpacked.com in 2 weeks

**TikTok (Weeks 7-8):**
- Film 6-8 short videos (30-60 sec each) of Katie tips
- Format: Text overlay + voiceover OR screen recording of the tool in action
- Topics: "5 Disney mistakes", "Why you don't need 7 days in Orlando", "This free AI plans your trip"
- Link in bio → /plan
- Time: ~3 hours/week
- **Success metric:** 1 video with 10K+ views, or 50+ link clicks total

**Decision point (end of Week 8):** Which platform drove more traffic to the site? Go all-in on that one. Kill the other (for now).

### Social Post Templates (Katie's Voice)

**Template 1 — Contrarian Take:**
"Unpopular opinion: [contrarian Disney/Universal take]. Here's why → [2-3 reasons]. Katie knows this because she's helped 500+ families figure it out. Link in bio for your free itinerary."

**Template 2 — Quick Hack:**
"Orlando hack most families miss: [specific tip]. I've seen this save families [time/money amount]. More tips like this → orlandounpacked.com/blog"

**Template 3 — Before/After:**
"Planning an Orlando trip: what you think it takes (47 browser tabs, 3 Reddit threads, a spreadsheet) vs. what it actually takes (11 questions, 5 minutes, one AI named Katie)."

---

## Phase 4: Partnerships (Weeks 8-12)

Only start this after you have blog content and traffic to point to. Partners want to see that you're real.

### Tier 1: Easy Wins (Week 8-9)
**Facebook Group moderators** in Disney/Orlando planning groups (there are dozens with 10K-50K members):
- DM the mod: "Hey, I built a free AI Orlando trip planner. Would it be cool to share it with the group? Happy to do an AMA or answer planning questions."
- Offer: Katie does a monthly Q&A thread in the group
- Cost: Free. Just time.
- **Target:** Get into 3-5 groups

### Tier 2: Content Swaps (Weeks 9-11)
**Orlando travel bloggers** (mid-tier, 10K-100K audience):
- Offer: Write a guest post for their blog ("5 Things Your AI Trip Planner Knows That You Don't") with a link back to orlandounpacked.com
- In return: Feature them in a blog post or Katie's itinerary recommendations
- **Target:** Land 2-3 guest posts with backlinks

**Outreach email template:**
> Subject: Free guest post for [Blog Name] — Orlando planning angle
>
> Hey [Name],
>
> I built a free AI trip planner for Orlando vacations (orlandounpacked.com) and I'd love to write a guest post for [Blog Name]. I'm thinking something like "5 Things Families Get Wrong About Orlando Planning" — practical, actionable, your readers would eat it up.
>
> No strings attached. I just want the backlink and the chance to get in front of your audience. Happy to customize the topic to whatever fits your editorial calendar.
>
> Here's the site if you want to poke around: orlandounpacked.com
>
> Cheers,
> Paul

### Tier 3: Bigger Bets (Weeks 11-12, only if earlier tiers work)
- **Vacation rental hosts in Kissimmee:** Offer to let hosts embed Katie or link to it as a "planning tool for guests." This is a natural fit — hosts want guests who show up with a plan.
- **Micro-influencers (10K-50K followers):** Offer free Katie Pro + affiliate link (10% of Katie Pro purchases they drive). Only worth doing once Stripe is live.

---

## What to Track (and Where)

| Metric | Tool | 90-Day Target |
|--------|------|---------------|
| Organic search traffic | Google Search Console (free) | 500 visitors/month |
| Blog post impressions | Google Search Console | 10K impressions/month |
| Itinerary generations | Vercel KV or simple counter | 50/month |
| Referral traffic by source | Vercel Analytics (free) | Know which channel works |
| Reddit referrals | Vercel Analytics | 50 clicks/month |
| Social referrals (Pinterest or TikTok) | Vercel Analytics | 100 clicks/month |
| Email signups | Count via Resend | 100 emails collected |
| Katie Pro conversions | Stripe dashboard (once live) | 10 purchases ($50 MRR) |

**Weekly check-in (15 min):** Open Google Search Console + Vercel Analytics. What's growing? What's flat? Adjust next week's content accordingly.

---

## Budget

| Item | Cost | Required? |
|------|------|-----------|
| Canva Pro (social graphics) | $13/mo | Optional (free tier works) |
| Buffer (social scheduling) | Free tier | Yes |
| Google Search Console | Free | Yes |
| Vercel Analytics | Free | Yes |
| Domain (already have) | ~$12/year | Already paid |
| Guest post sponsored placement | $0-200 | Optional |
| **Total** | **$0-25/month** | |

---

## Decision Points (When to Pivot)

**Week 6 checkpoint:**
- Blog getting indexed? (Check Search Console) → If not, fix technical SEO
- Reddit comments getting engagement? → If not, shift to forum-style engagement (TripAdvisor, Disney forums)
- Generating any itineraries from organic traffic? → If not, check blog CTAs and /plan conversion

**Week 10 checkpoint:**
- Which social platform drove more traffic? → Double down on the winner
- Are partnerships converting? → If Facebook groups work, do more. If guest posts work, do more.
- Is anyone actually paying for Katie Pro? → If not, revisit pricing/positioning before investing more in distribution

**Week 12 checkpoint:**
- Are we at 500 visitors/month? → If yes, start Phase 5 (GEO optimization, more content, paid experiments)
- If no, the content isn't resonating. Interview 5 people who used Katie — ask what they searched for, where they hang out online, what would have gotten their attention.

---

## What This Plan Intentionally Skips (For Now)

- **Paid ads** — Not until organic signals tell us which keywords/audiences convert. Don't burn money guessing.
- **YouTube** — High production cost, slow growth for a solo founder. Repurpose TikToks as Shorts instead if TikTok wins.
- **Email newsletters** — Build the list first (via itinerary email capture). Start a newsletter only after 500+ subscribers.
- **Facebook/Instagram organic** — Oversaturated, algorithm-hostile for new pages. Pinterest and TikTok have better organic reach right now.
- **Affiliate program** — Needs Stripe integration first. Defer to Phase 5.
- **PR / press** — Not until there's a story to tell (e.g., "10,000 families planned their Orlando trip with AI"). Premature press is wasted press.

---

## Next Steps (This Week)

1. ~~Set up /blog infrastructure~~ ✅
2. ~~Publish 3 cornerstone posts~~ ✅
3. Deploy to Vercel (push current branch)
4. Set up Google Search Console + submit sitemap
5. Start commenting on r/WaltDisneyWorld and r/UniversalOrlando (no links yet — just be helpful)
6. Write Week 3 blog post: "Universal vs Disney"
7. Create first batch of Pinterest pins from the 3 published posts
