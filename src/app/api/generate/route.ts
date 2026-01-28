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

Be specific, actionable, and encouraging. Use emojis sparingly for visual breaks.

## Important Notes:
- Always end the itinerary with this disclaimer: "---\n\n*Prices and availability are approximate and subject to change. Always verify current rates when booking.*"
- If key information is missing (like dates, group size, or parks), make reasonable assumptions and note them rather than asking questions.`;

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
        max_tokens: 8192,
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
  const ages = Array.isArray(answers.ages) ? answers.ages : [];
  const vibe = String(answers.vibe || "Balanced");
  const timing = String(answers.timing || "");
  const budget = String(answers.budget || "");
  const crowds = String(answers.crowds || "");
  const dining = Array.isArray(answers.dining) ? answers.dining : [];
  const accommodation = String(answers.accommodation || "");
  
  // Determine group type
  const hasToddlers = ages.some(a => String(a).includes("Toddler"));
  const hasYoungKids = ages.some(a => String(a).includes("Young kids"));
  const hasTeens = ages.some(a => String(a).includes("Teen"));
  const adultsOnly = ages.length === 1 && (String(ages[0]).includes("Adults") || String(ages[0]).includes("18-64"));
  const hasSeniors = ages.some(a => String(a).includes("Senior"));
  
  // Determine if Disney or Universal focused
  const disneyParks = parks.filter(p => ["Magic Kingdom", "EPCOT", "Hollywood Studios", "Animal Kingdom"].includes(String(p)));
  const universalParks = parks.filter(p => ["Universal Studios", "Islands of Adventure"].includes(String(p)));
  const isUniversalFocused = universalParks.length > 0 && disneyParks.length === 0;
  const isDisneyFocused = disneyParks.length > 0 && universalParks.length === 0;
  
  // Vibe-based pacing
  const isRelaxed = vibe.includes("Relax");
  const isGoMode = vibe.includes("Go mode");
  
  // Build group description
  let groupDesc = "";
  if (adultsOnly) groupDesc = "As an adults-only trip";
  else if (hasToddlers) groupDesc = "With toddlers in your group";
  else if (hasYoungKids) groupDesc = "With young kids";
  else if (hasTeens) groupDesc = "With teenagers";
  else groupDesc = "For your group";
  
  // Seasonal tips
  let seasonalTip = "";
  if (timing.includes("Summer")) {
    seasonalTip = "⚠️ **Summer Heat Alert:** Expect 90°F+ and afternoon thunderstorms. Bring ponchos, stay hydrated, and embrace the mid-day break — the parks empty out during afternoon storms and refill at night.";
  } else if (timing.includes("Spring")) {
    seasonalTip = "🌸 **Spring Break Warning:** If visiting March-April, expect higher crowds. Weekdays are better. Weather is ideal — warm but not brutal.";
  } else if (timing.includes("Fall")) {
    seasonalTip = "🎃 **Fall = Festival Season:** EPCOT Food & Wine, Mickey's Not-So-Scary Halloween — book early if interested. September is the lowest crowd month of the year.";
  } else if (timing.includes("Winter")) {
    seasonalTip = "🎄 **Holiday Crowds:** Christmas week is the busiest of the year. Early December or January after the 2nd is much calmer. Weather is perfect.";
  }

  // Park day templates
  const parkDays: Record<string, string> = {
    "Magic Kingdom": `## Magic Kingdom Day ✨

**Morning (Arrive by 8:00am):**
${hasToddlers || hasYoungKids ? 
`- Head to Fantasyland first — it's where the little ones shine
- Peter Pan's Flight and Seven Dwarfs Mine Train have the longest lines, hit them early
- It's a Small World and Winnie the Pooh are lower wait and toddler favorites` :
adultsOnly ?
`- Rope drop Seven Dwarfs Mine Train or Space Mountain
- Work through Tomorrowland and Adventureland while crowds are light
- Big Thunder Mountain and Pirates of the Caribbean are classics worth hitting early` :
`- Rope drop strategy: Head straight to Seven Dwarfs Mine Train or Space Mountain
- Work your way through Fantasyland and Tomorrowland while lines are short`}

**Midday:**
- Mobile order lunch at Pecos Bill Tall Tale Inn (solid portions) or Columbia Harbour House (air conditioned, less crowded)
${isRelaxed ? `- Return to your accommodation for a 2-3 hour break — this is crucial with the Florida heat!` : 
isGoMode ? `- Power through with air-conditioned shows: Carousel of Progress, Hall of Presidents, or Enchanted Tiki Room` :
`- Consider a mid-day break, especially if anyone is flagging`}

**Evening:**
${hasToddlers ? `- Evening is magic hour — cooler temps, lit-up castle, happier toddlers
- Watch the fireworks from Main Street (arrive 30 min early) or leave just before to beat the exodus` :
`- Enjoy shorter evening lines on popular rides
- Watch the fireworks from Main Street (arrive 30 min early for a good spot)`}

💡 **Pro Tip:** ${hasToddlers || hasYoungKids ? 
`Rent a stroller even if your kid doesn't usually use one. This park is 107 acres of walking.` :
`Tuesday and Wednesday are typically the lightest crowd days at Magic Kingdom. Avoid Monday — everyone arrives fresh from the weekend.`}`,

    "EPCOT": `## EPCOT Day 🌍

**Morning:**
- Start in World Celebration — Guardians of the Galaxy: Cosmic Rewind is the hot ticket (use Lightning Lane if ${crowds.includes("Very") ? "you've got it" : "available"})
${adultsOnly || hasTeens ? 
`- Test Track and Mission: SPACE are best done before noon
- Frozen Ever After in Norway opens with the World Showcase — rope drop it or skip it` :
`- Frozen Ever After is a must for kids — rope drop it or expect 60+ min waits
- Test Track has a fun design-your-car element kids enjoy`}

**Afternoon:**
- World Showcase opens at 11am — pace yourself, it's 1.3 miles around
${dining.some(d => String(d).includes("Fine dining")) ? 
`- Book a table service lunch — Mexico (San Angel Inn), France (Chefs de France), or Japan (Teppan Edo) are all excellent` :
`- Food stands around World Showcase are great for lunch — try the fish & chips in UK or tacos in Mexico`}
${adultsOnly ? `- Drinks around the world is a classic adult tradition — pace yourself, it's 11 countries` : ``}

**Evening:**
${hasYoungKids || hasToddlers ?
`- World Showcase can exhaust little legs — stroller strongly recommended
- The nighttime spectacular is worth staying for, but position near an exit if kids are fading` :
`- Stay for the nighttime spectacular — it's one of Disney's best
- Spaceship Earth at night with no line is a peaceful way to end the day`}

💡 **Pro Tip:** ${adultsOnly ? 
`EPCOT is the most adult-friendly Disney park. Lean into World Showcase dining and drinks — it's what the park does best.` :
hasToddlers ? 
`EPCOT has fewer toddler rides than Magic Kingdom. Manage expectations — the highlight is exploration and snacking, not attractions.` :
`EPCOT is a walking park. Comfortable shoes are non-negotiable.`}`,

    "Hollywood Studios": `## Hollywood Studios Day 🎬

**Morning (Arrive early!):**
${hasYoungKids || hasToddlers ?
`- Head straight to Toy Story Land — Slinky Dog Dash and Alien Swirling Saucers are kid favorites
- Avoid Tower of Terror and Rock 'n' Roller Coaster — they're intense for little ones` :
adultsOnly || hasTeens ?
`- Rope drop Rise of the Resistance (if not using Lightning Lane) — it's worth the hype
- Tower of Terror and Rock 'n' Roller Coaster are best before 11am` :
`- Rise of the Resistance is the marquee attraction — prioritize it via rope drop or Lightning Lane
- Millennium Falcon: Smugglers Run has shorter waits if you're not picky about being pilot`}

**Midday:**
- This is Disney's smallest park — ${isGoMode ? `you can hit everything in one day if you're strategic` : `a half-day park if you're selective`}
- Lunch at Docking Bay 7 (Star Wars themed) or Backlot Express (classic burgers)
${!isGoMode ? `- Muppet*Vision 3D and Indiana Jones Stunt Spectacular are great air-conditioned shows` : ``}

**Evening:**
- Fantasmic! is worth seeing if you haven't — it's a classic (check schedule)
${adultsOnly ? `- Oga's Cantina in Galaxy's Edge requires reservations — book 60 days out for the full Star Wars bar experience` : ``}

💡 **Pro Tip:** ${hasYoungKids ? 
`Toy Story Land has almost no shade. Morning or evening only in summer months.` :
`Hollywood Studios has improved dramatically with Galaxy's Edge. Don't skip it based on old reputation.`}`,

    "Animal Kingdom": `## Animal Kingdom Day 🦁

**Morning (Rope drop is CRITICAL):**
${hasToddlers || hasYoungKids ?
`- Kilimanjaro Safaris first thing — animals are most active in the morning, and kids love it
- Flight of Passage may be too intense for little ones, but Na'vi River Journey is perfect` :
`- Flight of Passage is the best ride at Disney World — rope drop it or expect 2+ hour waits
- Kilimanjaro Safaris is best done early when animals are active`}

**Midday:**
- This park runs hot — lots of walking, less shade than you'd expect
${isRelaxed ? 
`- Seriously consider leaving by 2pm. Morning safari + Avatar rides = a complete day. Come back another evening for dinner at Sanaa if interested.` :
`- Maharajah Jungle Trek and Gorilla Falls are walk-through exhibits worth exploring when you need a break`}
- ${hasYoungKids || hasToddlers ? `Finding Nemo: The Big Blue... And Beyond is a good air-conditioned rest` : `Dinosaur is an underrated thrill ride with minimal waits`}

**Evening:**
- If you stay for evening, watch the Tree of Life awakening projections — free and beautiful
${dining.some(d => String(d).includes("Fine dining")) ? `- Tiffins is Disney's most underrated fine dining restaurant — book it if you want something special` : ``}

💡 **Pro Tip:** ${hasToddlers ?
`Animal Kingdom is probably your lowest-priority Disney park with toddlers. Safari is great, but much of the park isn't toddler-friendly.` :
`This park is at its best at rope drop. Animals are out, crowds are low. By afternoon, many animals are hiding from heat.`}`,

    "Universal Studios": `## Universal Studios Day 🎬

**Morning:**
${hasYoungKids || hasToddlers ?
`- Head to Despicable Me Minion Mayhem and the new Minion Land area
- E.T. Adventure is a classic gentle ride
- Note: Many Universal rides have height requirements — check before promising anything` :
adultsOnly || hasTeens ?
`- Hagrid's Magical Creatures Motorbike Adventure opens in Islands of Adventure, but start here with Hollywood Rip Ride Rockit if you're a coaster fan
- Harry Potter and the Escape from Gringotts is the park's headline ride` :
`- Escape from Gringotts is the marquee ride — hit it first
- Transformers and Revenge of the Mummy are solid mid-morning choices`}

**Afternoon:**
- Diagon Alley is worth exploring even without riding — the theming is incredible
${adultsOnly ? `- Grab a Butterbeer (frozen is better than regular) and take your time in the Harry Potter area` : `- Butterbeer is a must-try — frozen version is the best`}
${isGoMode ? 
`- Express Pass is worth it here more than anywhere — Universal's lines move slower than Disney's` :
`- Shows like Universal's Horror Make-Up Show are good air-conditioned breaks`}

**Evening:**
- ${adultsOnly ? `CityWalk has better nightlife than Disney Springs — more bars, live music, Blue Man Group` : `CityWalk is fun for dinner — Toothsome Chocolate Emporium is a hit with families`}

💡 **Pro Tip:** ${crowds.includes("Very") ?
`Universal Express Pass is worth every penny. Unlike Disney's system, it's unlimited use and actually available for purchase.` :
`If staying at a Universal Premier hotel, Express Pass is included free — that's often a better deal than buying separately.`}`,

    "Islands of Adventure": `## Islands of Adventure Day 🏝️

**Morning:**
${hasYoungKids || hasToddlers ?
`- Seuss Landing is the toddler paradise of Universal — Cat in the Hat, One Fish Two Fish
- Camp Jurassic has great playgrounds for burning energy
- Warning: Most "big" rides here have 40"+ height requirements` :
adultsOnly || hasTeens ?
`- Hagrid's Magical Creatures Motorbike Adventure is the best ride at Universal — rope drop essential
- VelociCoaster is the most intense coaster in Florida — front row if you dare` :
`- Hagrid's is the must-do — arrive 30 min before park opening
- Jurassic World VelociCoaster for thrill seekers`}

**Afternoon:**
- Hogsmeade (Harry Potter) connects to Diagon Alley via the Hogwarts Express — ride it!
${hasYoungKids ? `- The Hogwarts Express itself is a ride — magical for Potter fans of any age` : ``}
- Lunch at Three Broomsticks is solid and atmospheric
${!hasToddlers ? `- Skull Island: Reign of Kong and Jurassic World ride are good afternoon options with moderate waits` : ``}

**Evening:**
- The Incredible Hulk Coaster at night with the lights is a vibe
- ${adultsOnly ? `Marvel area has better food than you'd expect — try Cafe 4 for something quick` : `Marvel Super Hero Island is great for superhero fans — Spider-Man ride still holds up`}

💡 **Pro Tip:** ${hasToddlers ?
`Islands of Adventure is the weakest Universal park for toddlers. Consider spending more time at Universal Studios unless you have older kids who want Hagrid's and VelociCoaster.` :
`This park has Universal's best rides AND best theming. If you only do one Universal day, make it this one.`}`,

    "SeaWorld": `## SeaWorld Day 🐬

**Morning:**
- Mako, Kraken, and Manta are world-class coasters — hit them early before lines build
${hasYoungKids || hasToddlers ? `- Sesame Street Land is SeaWorld's hidden gem for little ones — rides sized for them` : ``}

**Afternoon:**
- Animal encounters and shows are the heart of SeaWorld — check the schedule
${hasYoungKids ? `- Touch pools and smaller animal exhibits are great for curious kids` : ``}
- Journey to Atlantis will get you soaked — good for hot afternoons

**Evening:**
- Catch an evening show if available — fireworks vary by season
- Usually less crowded than Disney/Universal for evening dining

💡 **Pro Tip:** SeaWorld is often overlooked but offers great value — shorter lines, excellent coasters, and genuine animal experiences. It's a nice change of pace from the Disney/Universal intensity.`,

    "LEGOLAND": `## LEGOLAND Day 🧱

**This park is specifically designed for ages 2-12.**

**Morning:**
- Start with the rides that matter to your kids — LEGO Movie World and LEGO City are favorites
- The coasters are gentle enough for kids but fun enough to re-ride
- Water park is included and excellent — bring swimsuits

**Afternoon:**
- Miniland USA (LEGO recreations of cities) is surprisingly impressive
- Build & Test areas let kids free-build — good for a break from rides
- Shows are scattered throughout — good air conditioning breaks

**Evening:**
- Park typically closes earlier than Disney/Universal (check hours)
- Less crowded than the big parks — you can do everything in one day

💡 **Pro Tip:** ${hasToddlers || hasYoungKids ?
`LEGOLAND is the best bang-for-buck family park if your kids are 10 and under. They'll be the right height for everything, lines are short, and it's less exhausting than Disney.` :
`LEGOLAND loses its magic around age 12. Great park, but know your audience.`}`
  };

  // Build arrival day based on focus
  let arrivalDay = "";
  if (isUniversalFocused) {
    arrivalDay = `## Day 1: Arrival & CityWalk

**Afternoon:**
- Arrive and settle into your accommodation
- ${accommodation.includes("Universal") ? `Check out your hotel amenities — pool time!` : `Quick grocery run to Target or Publix — grab snacks, water, and essentials`}

**Evening:**
- Head to Universal CityWalk (no ticket required!)
- ${adultsOnly ? `Walk around, grab dinner, maybe catch some live music. Blue Man Group is here if you're interested.` : `Walk around, grab dinner at Toothsome Chocolate Emporium or NBC Sports Grill`}
- Get your bearings for tomorrow

💡 **Pro Tip:** CityWalk parking is free after 6pm. Good way to scout the Universal entrance and build excitement.`;
  } else {
    arrivalDay = `## Day 1: Arrival & Settling In

**Afternoon:**
- Arrive and settle into your accommodation
- ${accommodation.includes("Disney") ? `Explore your resort — Disney hotels have great theming and pools` : `Quick grocery run to Walmart (4444 W Vine St, Kissimmee) — stock up on water bottles, snacks, and ponchos`}

**Evening:**
- Head to Disney Springs (no ticket required!)
- Walk around, grab dinner at one of the many restaurants (Morimoto, The Boathouse, or Chicken Guy for quick bites)
- ${hasYoungKids || hasToddlers ? `Check out the World of Disney store — let kids pick one thing to bring to the parks` : `Good place to grab any last-minute gear or souvenirs without burning park time`}

💡 **Pro Tip:** Disney Springs parking is free. Go after 5pm to avoid heat and enjoy the evening atmosphere.`;
  }

  // Select park days based on user choices
  const selectedParkDays = parks
    .filter(p => parkDays[String(p)])
    .map(p => parkDays[String(p)])
    .slice(0, 5); // Cap at 5 park days

  // Build the full itinerary
  let dayNumber = 2;
  const parkDayContent = selectedParkDays.map(content => {
    const dayHeader = `---\n\n## Day ${dayNumber}:\n`;
    dayNumber++;
    return content;
  }).join("\n\n---\n\n");

  // Customize booking checklist
  const bookingChecklist = isUniversalFocused ? 
`## 🎯 Book These NOW!

[ ] Park tickets — multi-day tickets are significantly cheaper per day
[ ] Express Pass — ${crowds.includes("Very") ? `DO IT. Worth every penny at Universal.` : `Optional but recommended for first-timers`}
${adultsOnly ? `[ ] Oga's Cantina / Docking Bay 7 — if doing Disney too, book 60 days out` : ``}
[ ] ${accommodation.includes("Universal") ? `Confirm your hotel reservation and check for included Express Pass` : `Hotel/rental — closer to Universal saves morning time`}
[ ] Grocery delivery or plan a supply run for Day 1` :
`## 🎯 Book These NOW!

[ ] Disney Park Pass reservations — required in addition to tickets
[ ] Dining reservations — 60 days before at 6:00am EST (set an alarm!)
${dining.some(d => String(d).includes("Character")) ? `[ ] Character dining is booking up — Be Our Guest, Cinderella's Royal Table, Chef Mickey's go fast` : ``}
[ ] Lightning Lane for top rides — available day-of at 7:00am
[ ] Grocery delivery or plan your Walmart run for Day 1`;

  // Packing list customized for the trip
  const packingList = `## Packing Checklist

- Comfortable walking shoes (you'll walk 10-15 miles/day — break them in before!)
- ${timing.includes("Summer") ? `Light, moisture-wicking clothing — cotton gets heavy with sweat` : `Layers — mornings can be cool, afternoons warm`}
- ${timing.includes("Summer") || timing.includes("Spring") ? `Ponchos from Dollar Tree — afternoon rain is guaranteed` : `Packable rain jacket — Florida weather is unpredictable`}
- Portable phone chargers (${adultsOnly ? `the apps drain battery fast` : `you'll be taking a lot of photos`})
- Refillable water bottles (free water at all parks — ask at any quick service)
- Sunscreen (reapply every 2 hours, seriously)
${hasToddlers ? `- Stroller or rent one at the parks ($15-18/day)
- Ziploc bags for wet clothes and protecting phones on water rides
- Change of clothes in a park bag` : ``}
${hasYoungKids ? `- Autograph book if doing character meets
- Glow sticks for nighttime (kids love them, cheaper than park ones)` : ``}
${adultsOnly ? `- Nice outfit if you booked fine dining — some restaurants have dress codes` : ``}
- Small backpack for the parks`;

  // Personalized closing tips
  let closingTips = `## Final Tips Just for You

1. **${isGoMode ? `Pace yourself even in go-mode.` : isRelaxed ? `You've got the right idea.` : `Find your rhythm.`}** ${isGoMode ? 
`Adrenaline carries you the first two days, then you crash. Build in one lighter day mid-trip.` : 
isRelaxed ?
`The mid-day break isn't lazy — it's strategic. Parks are better in evening anyway.` :
`The biggest mistake is trying to do everything. Pick your must-dos and let the rest happen organically.`}

2. **${hasToddlers ? `Expect meltdowns and plan for them.` : hasYoungKids ? `Manage expectations early.` : adultsOnly ? `Embrace the freedom.` : `Stay flexible.`}** ${hasToddlers ?
`It's not if, it's when. Have a quiet spot in mind at each park, and know that leaving early is always okay.` :
hasYoungKids ?
`Not every ride will be available for their height. Focus on what they CAN do, not what they can't.` :
adultsOnly ?
`No one else's schedule matters. Sleep in if you want. Stay out late. Skip the kiddie stuff guilt-free.` :
`Your best memories will probably be unplanned moments. Leave room for them.`}

3. **${budget.includes("Under") || budget.includes("2,000") ? `Stretch your budget smart.` : budget.includes("7,000") ? `Splurge where it counts.` : `Balance treat-yourself with smart spending.`}** ${budget.includes("Under") || budget.includes("2,000") ?
`Bring refillable water bottles, pack snacks, eat one meal at the parks and one back at your rental. The experience doesn't have to break the bank.` :
budget.includes("7,000") ?
`Lightning Lane / Express Pass, one signature dining experience, and a nice resort make the trip. Don't waste money on stuff you won't remember.` :
`The best memories usually aren't the most expensive ones. Splurge on one special meal, prioritize skip-the-line for your must-do rides.`}`;

  // Assemble the full itinerary
  return `# Your Orlando Adventure Awaits! ${isUniversalFocused ? `🎢` : `🏰`}

## Trip Overview

${groupDesc}, I've crafted a ${days} itinerary tailored to your style. Here's your game plan:

**Your Parks:** ${parks.join(", ")}
**Your Vibe:** ${vibe}
**Budget Approach:** ${budget || "Smart spending with splurges where they count"}
**Group:** ${ages.join(", ") || "Not specified"}

${seasonalTip}

---

${arrivalDay}

---

${parkDayContent}

---

${bookingChecklist}

---

${packingList}

---

${closingTips}

---

Have an amazing trip! 🎉
`;
}
