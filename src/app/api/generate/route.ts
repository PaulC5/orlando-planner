import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert Orlando family vacation planner with 10+ years of local experience. You own vacation rentals in Kissimmee and have helped hundreds of families plan their perfect Orlando trips.

You're warm, practical, and specific. You don't give generic advice — you give the kind of tips a trusted friend who lives there would share.

## Your Orlando Knowledge:

### Theme Parks
- Magic Kingdom: Best for first-timers, families with young kids. Busiest park. Go on Tuesday/Wednesday, NEVER Monday.
- EPCOT: Best for adults, foodies, older kids. World Showcase is a walk — pace yourself.
- Hollywood Studios: Best for Star Wars fans, Toy Story fans. Smallest park, can do in half day.
- Animal Kingdom: Best for animal lovers, Avatar fans. Opens early — rope drop Flight of Passage or it's 2+ hour wait.
- Universal Studios: Best for Harry Potter (Diagon Alley), movies, shows.
- Islands of Adventure: Best for thrill rides, Harry Potter (Hogsmeade), Marvel.

### Insider Tips
- Book Disney dining reservations 60 days out at 6am EST sharp.
- Genie+ is worth it for first-timers at Magic Kingdom. Skip it at Animal Kingdom.
- Stay in Kissimmee (not Disney property) if budget matters. 15-20 min to parks, half the price.
- Bring ponchos from Dollar Tree. Afternoon rain is guaranteed May-September.
- Take a mid-day break. Kids crash, adults recharge, evenings are better anyway.
- Disney Springs is a crowd favorite — no ticket needed, great food/shopping. Go in evening.

### Local Kissimmee Tips
- Walmart Supercenter (4444 W Vine St): Best one-stop for groceries + supplies
- ALDI nearby for budget groceries
- Old Town Entertainment District: Fun walkable area with shops/food, frequent events
- Kennedy Space Center: ~1 hour drive, great day trip, break from theme parks

### Budget Guidance
- Budget ($2-4k for family of 4): Off-site rental, quick service meals, pick 2-3 parks max
- Mid-range ($4-7k): Mix of dining, Genie+ for Magic Kingdom, 4-5 park days  
- Splurge ($7k+): On-site Disney/Universal, character meals, Lightning Lane everything

## Output Format:

Create a day-by-day itinerary with:
1. Trip Overview (dates/timing, group summary, strategy)
2. Day-by-day schedule (morning/afternoon/evening for each day)
3. Pro tips specific to THEIR situation
4. "Book These NOW" checklist with timing
5. Packing suggestions
6. Final personalized tips

Be specific, actionable, and encouraging. Use emojis sparingly for visual breaks.`;

export async function POST(request: NextRequest) {
  try {
    const answers = await request.json();

    // Build the user prompt from answers
    const userPrompt = buildUserPrompt(answers);

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return a demo itinerary if no API key
      return NextResponse.json({
        itinerary: getDemoItinerary(answers),
      });
    }

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Claude API error:", await response.text());
      return NextResponse.json({
        itinerary: getDemoItinerary(answers),
      });
    }

    const data = await response.json();
    const itinerary = data.content[0].text;

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}

function buildUserPrompt(answers: Record<string, unknown>): string {
  return `Please create a personalized Orlando vacation itinerary based on these details:

**Trip Experience:** ${answers.experience || "Not specified"}
**Trip Vibe:** ${answers.vibe || "Not specified"}
**Duration:** ${answers.days || "Not specified"}
**Timing:** ${answers.timing || "Not specified"}
**Group Size:** ${answers.groupSize || "Not specified"}
**Ages in Group:** ${Array.isArray(answers.ages) ? answers.ages.join(", ") : "Not specified"}
**Parks Interested In:** ${Array.isArray(answers.parks) ? answers.parks.join(", ") : "Not specified"}
**Crowd Tolerance:** ${answers.crowds || "Not specified"}
**Dining Style:** ${Array.isArray(answers.dining) ? answers.dining.join(", ") : "Not specified"}
**Accommodation Preference:** ${answers.accommodation || "Not specified"}
**Budget:** ${answers.budget || "Not specified"}

Please create a detailed, day-by-day itinerary that's specifically tailored to this family's needs. Include specific restaurant recommendations, timing strategies, and insider tips that match their vibe and budget.`;
}

function getDemoItinerary(answers: Record<string, unknown>): string {
  const days = answers.days || "4-5 days";
  const parks = Array.isArray(answers.parks) ? answers.parks : ["Magic Kingdom", "EPCOT"];
  
  return `# Your Orlando Adventure Awaits! 🏰

## Trip Overview

Based on your preferences, I've crafted a ${days} itinerary focused on making magical memories without the stress. Here's your game plan:

**Your Parks:** ${parks.join(", ")}
**Strategy:** ${answers.vibe || "Balanced pace"} with built-in rest time
**Budget Approach:** ${answers.budget || "Smart spending with splurges where they count"}

---

## Day 1: Arrival & Disney Springs

**Afternoon:**
- Arrive and settle into your accommodation
- Quick grocery run to Walmart (4444 W Vine St, Kissimmee) — stock up on water bottles, snacks, and ponchos

**Evening:**
- Head to Disney Springs (no ticket required!)
- Walk around, grab dinner at one of the many restaurants
- Check out World of Disney store — great for getting the kids excited

💡 **Pro Tip:** Disney Springs parking is free. Go after 5pm to avoid the heat and enjoy the evening atmosphere.

---

## Day 2: Magic Kingdom ✨

**Morning (Arrive by 8:00am):**
- Rope drop strategy: Head straight to Seven Dwarfs Mine Train or Peter Pan's Flight
- Work your way through Fantasyland while lines are short
- Hit Space Mountain before 11am

**Midday:**
- Grab a mobile order lunch at Pecos Bill or Cosmic Ray's
- Return to hotel for 2-3 hour break (this is crucial!)

**Evening (Return around 4pm):**
- Enjoy shorter evening lines
- Watch Happily Ever After fireworks from Main Street (arrive 30 min early for a good spot)

💡 **Pro Tip:** Tuesday and Wednesday are the lightest crowd days at Magic Kingdom. Avoid Monday at all costs!

---

## Day 3: EPCOT 🌍

**Morning:**
- Start in World Celebration — ride Guardians of the Galaxy: Cosmic Rewind (use Lightning Lane if available)
- Explore Test Track and Mission: SPACE

**Afternoon:**
- Lunch in World Showcase — try the fish & chips in the UK pavilion or tacos in Mexico
- Leisurely walk around World Showcase (it's about 1.3 miles around)

**Evening:**
- Dinner reservation at one of the World Showcase restaurants
- Stay for the nighttime spectacular

💡 **Pro Tip:** EPCOT is great for adults but can tire out young kids with all the walking. Consider a stroller even for kids who don't normally use one.

---

## 🎯 Book These NOW!

[ ] Dining reservations — 60 days before at 6:00am EST
[ ] Park tickets — sooner = sometimes cheaper
[ ] Lightning Lane for top rides — day of, at 7:00am
[ ] Grocery delivery or plan your Walmart run for Day 1

---

## Packing Checklist

- Comfortable walking shoes (you'll walk 10-15 miles/day!)
- Ponchos (Dollar Tree ones work great)
- Portable phone chargers
- Refillable water bottles
- Sunscreen
- Small backpack for the parks

---

## Final Tips Just for You

1. **Don't try to do too much.** The biggest mistake families make is cramming in every park. You'll have more fun doing less and actually enjoying it.

2. **The mid-day break is non-negotiable.** Trust me on this. Go back to your hotel, swim, nap, recharge. Come back for the evening. Your family will thank you.

3. **Mobile order everything.** Standing in food lines for 45 minutes is a vacation killer. Use the Disney app to order ahead.

Have an amazing trip! 🎉
`;
}
