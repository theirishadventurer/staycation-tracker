/**
 * itinerary.js — three-day staycation plan (life-paced edition)
 * --------------------------------------------------------------
 * Thursday: SNES + Genesis (NES locked out until ~5-6 PM cable arrives)
 *           Split day: 10 AM start, 12-2 PM life break, 2-5 PM resume
 * Friday:   NES discovery afternoon + JRPG/platformer night
 * Saturday: Full flight block (Ace Combat warm-up)
 *
 * Game IDs are stable. Renaming an ID orphans existing progress rows in
 * Supabase. Adding new entries is safe.
 */

export const ITINERARY = [
  // ============================== THURSDAY DAY ==============================
  // Morning (10 AM – 12 PM) — SNES Opener after gardening + coffee + shower
  { id: 'thu-1', day: 'Thursday', block: 'Day Session', time: '10:00–10:45', minutes: 45,
    title: 'Super Mario World', console: 'SNES',
    vibe: 'Day opener — Yoshi\'s debut. Donut Plains → Vanilla Dome.',
    fact: 'Super Mario World was a SNES launch title (1990 JP, 1991 NA). Yoshi was originally planned for SMB3 but the NES couldn\'t handle the sprite — Miyamoto held the idea for the SNES.',
    tip: 'The Cape is broken — fly across whole levels with a running start. Fire/Wing/Bubble Yoshis come from special shells. Star Road shortcuts Worlds 5 onward.' },
  { id: 'thu-2', day: 'Thursday', block: 'Day Session', time: '10:45–11:30', minutes: 45,
    title: 'TMNT IV: Turtles in Time', console: 'SNES',
    vibe: 'Arcade brawler — fully beatable in one sit.',
    fact: 'Originally a 1991 arcade game. The SNES port added exclusive levels (Sewer Surfin\', Neon Night-Riders) and is widely considered better than the arcade.',
    tip: 'Throw enemies AT the screen for big damage — works on bosses too. Donatello has the longest reach. Special move: A+B together.' },
  { id: 'thu-3', day: 'Thursday', block: 'Day Session', time: '11:30–12:00', minutes: 30,
    title: 'Donkey Kong Country (Pt. 1)', console: 'SNES',
    vibe: '16-bit platforming showcase. First half of Kongo Jungle.',
    fact: 'DKC used pre-rendered 3D graphics on a 2D system — Rare\'s Silicon Graphics workstations cost $100K each and made the SNES look generations ahead of its time.',
    tip: 'Roll-jump (roll off ledge, jump mid-roll) reaches secret areas. Diddy is faster, DK is stronger. Bonus barrels hide behind suspicious walls.' },

  // Life break: 12-2 PM (run, shower, store)

  // Afternoon (2 PM – 5 PM) — SNES + Genesis Mix
  { id: 'thu-4', day: 'Thursday', block: 'Day Session', time: '2:00–2:30', minutes: 30,
    title: 'Donkey Kong Country (Pt. 2)', console: 'SNES',
    vibe: 'Continue — finish Kongo Jungle, push into Monkey Mines.',
    fact: 'David Wise composed DKC\'s soundtrack in 8 weeks using a custom sample synthesis tool. "Aquatic Ambiance" is regularly cited in best-soundtrack-ever lists.',
    tip: 'Mine Cart Carnage is the first big setpiece. Look for the warp barrel hidden in it — skips you ahead. KONG letters in every level for extra lives.' },
  { id: 'thu-5', day: 'Thursday', block: 'Day Session', time: '2:30–3:15', minutes: 45,
    title: 'Star Fox', console: 'SNES',
    vibe: 'Polygonal SNES landmark. Full run.',
    fact: 'Star Fox used the Super FX chip — the first dedicated 3D rendering chip in a console cartridge. The chip was developed in secret under the codename "MARIO."',
    tip: 'Pick a path: Easy (Corneria → Asteroid → Sector X), Medium, or Hard (Black Hole shortcut). Do a barrel roll (L+L or R+R) to deflect lasers.' },
  { id: 'thu-6', day: 'Thursday', block: 'Day Session', time: '3:15–4:00', minutes: 45,
    title: 'Sonic the Hedgehog 2', console: 'Genesis',
    vibe: 'Pure Genesis speed. Emerald → Aquatic Ruin.',
    fact: 'Sonic 2 introduced the spin dash, Tails, and was developed by an American/Japanese team. Yuji Naka relocated to California for development at Sega Technical Institute.',
    tip: 'Hold Down + jump to spin dash. With 50+ rings, jump in a Star Post for a Special Stage and a Chaos Emerald. All 7 emeralds = Super Sonic.' },
  { id: 'thu-7', day: 'Thursday', block: 'Day Session', time: '4:00–4:45', minutes: 45,
    title: 'Contra: Hard Corps', console: 'Genesis',
    vibe: 'Loud Sega energy. Pick Sheen for an easier run.',
    fact: 'Hard Corps has 4 playable characters with unique weapons and 5 different endings based on branching paths. The Japanese version gave you 3 hits per life — the Western release made it 1.',
    tip: 'Sheen (the robot) has the most balanced weapons. Multiple endings — your choices in the second stage branch into completely different levels.' },

  // Night (9:30 PM – 12:00 AM) — SNES atmosphere with MMX as opener
  { id: 'thu-n1', day: 'Thursday', block: 'Night Session', time: '9:30–10:15', minutes: 45,
    title: 'Mega Man X', console: 'SNES',
    vibe: 'Night opener — Highway intro + Chill Penguin for dash boots.',
    fact: 'Mega Man X was conceived as the "more mature" Mega Man for SNES. The intro stage secretly teaches you wall-jump — the Sigma encounter is unwinnable to set up the tutorial.',
    tip: 'Beat Chill Penguin FIRST — he drops the dash boots that transform the rest of the game. Every Maverick has a heart tank and sub-tank hidden in their stage.' },
  { id: 'thu-n2', day: 'Thursday', block: 'Night Session', time: '10:15–11:15', minutes: 60,
    title: 'Super Metroid', console: 'SNES',
    vibe: 'Dark, atmospheric — perfect late-night.',
    fact: 'Super Metroid\'s opening on Ceres Space Colony was directly homaged in Alien: Isolation. The game\'s map system was revolutionary — it was the first Metroid with one.',
    tip: 'Wall jump: kick off a wall and tap toward it again right as you push off. Shinespark: run until Samus sparkles, then crouch to store, then jump+direction.' },
  { id: 'thu-n3', day: 'Thursday', block: 'Night Session', time: '11:15–12:00', minutes: 45,
    title: 'Zelda: A Link to the Past', console: 'SNES',
    vibe: 'Continue your recent playthrough — atmospheric closer.',
    fact: 'ALttP\'s Dark World was inspired by The Wizard of Oz. The game\'s 1991 release was so important to Nintendo that they bundled it with the SNES in some regions.',
    tip: 'Dash with the Pegasus Boots through bushes for hidden items and rupees. Bombs reveal hidden cave entrances on cliff walls — try suspicious wall sections.' },

  // ============================== FRIDAY ==============================
  // Afternoon — NES Discovery (the main event, finally)
  { id: 'fri-1', day: 'Friday', block: 'Afternoon Block', time: 'Slot 1 (30m)', minutes: 30,
    title: 'Super Mario Bros. 3', console: 'NES',
    vibe: 'NES discovery opener — classic Nintendo joy.',
    fact: 'Released in 1988 in Japan and 1990 in the US, SMB3 was so anticipated that the movie "The Wizard" (1989) functioned as a 90-min commercial for it.',
    tip: 'White block trick: duck on a white block for 5 seconds to fall through it. Hidden warp whistles in Worlds 1 and 2 skip ahead.' },
  { id: 'fri-2', day: 'Friday', block: 'Afternoon Block', time: 'Slot 2 (40m)', minutes: 40,
    title: 'Mega Man 2', console: 'NES',
    vibe: 'Peak NES platforming. 2-3 Robot Masters.',
    fact: 'Mega Man 2 was developed in the team\'s spare time after the original underperformed. It became the bestselling game in the classic series.',
    tip: 'Recommended order: Metal Man → Air Man → Crash Man. Metal Blade is famously broken — it works on almost every boss including Metal Man himself.' },
  { id: 'fri-3', day: 'Friday', block: 'Afternoon Block', time: 'Slot 3 (30m)', minutes: 30,
    title: "Mike Tyson's Punch-Out!!", console: 'NES',
    vibe: 'Reflexes & pattern recognition.',
    fact: 'Tyson licensed his likeness for $50,000 over 3 years. After the deal expired in 1990, Nintendo replaced him with "Mr. Dream."',
    tip: 'Glass Joe goes down to body shots. Bald Bull: gut-punch him during the Bull Charge for a 1-hit KO. King Hippo: hit him in the mouth, then the bandage on his belly.' },
  { id: 'fri-4', day: 'Friday', block: 'Afternoon Block', time: 'Slot 4 (35m)', minutes: 35,
    title: 'Contra', console: 'NES',
    vibe: 'Arcade chaos — use Konami Code for 30 lives.',
    fact: 'The Konami Code (↑↑↓↓←→←→BA) was originally created by developer Kazuhisa Hashimoto for testing — he found the game too hard to playtest without it.',
    tip: 'Spread Gun (S) is the best weapon. Konami Code on title screen for 30 lives. The waterfall level is harder than the boss after it.' },
  { id: 'fri-5', day: 'Friday', block: 'Afternoon Block', time: 'Slot 5 (35m)', minutes: 35,
    title: 'Metroid', console: 'NES',
    vibe: 'NES exploration / history lesson.',
    fact: 'The reveal that Samus is a woman — shown in the ending if you beat the game fast enough — was groundbreaking for 1986. The game has no map; you were expected to draw your own on graph paper.',
    tip: 'Password "JUSTIN BAILEY" starts you with most upgrades. Otherwise, the morph ball is the first thing to find.' },

  // Friday Night — JRPG → break → platformer comparison
  { id: 'fri-n1', day: 'Friday', block: 'Late Night Block', time: 'Slot 1 (50m)', minutes: 50,
    title: 'Final Fantasy II', console: 'SNES',
    vibe: 'Sample Cecil\'s intro arc. Mist Cave is the first big story beat.',
    fact: 'This is actually Final Fantasy IV in Japan — Square skipped FF II and III for US release until decades later. Cecil\'s Dark Knight to Paladin transformation is a foundational JRPG moment.',
    tip: 'Save points are sparse early. The Mist Cave intro is the first major story beat. Don\'t worry about grinding — story progression carries you.' },
  { id: 'fri-n2', day: 'Friday', block: 'Late Night Block', time: 'Slot 2 (30m)', minutes: 30,
    title: 'Tecmo Super Bowl', console: 'NES',
    vibe: 'Mid-block punch — pick a stacked team, one quick game.',
    fact: 'Bo Jackson on the Raiders is statistically broken — his 99 speed and 99 max speed make him uncatchable. The game has full NFLPA licensing, which expired and was never renewed.',
    tip: 'Hold the snap with QB to manually scramble. On defense, "diving" tackle (B button) is the difference between a stop and a TD allowed.' },
  { id: 'fri-n3', day: 'Friday', block: 'Late Night Block', time: 'Slot 3 (20m)', minutes: 20,
    title: 'Donkey Kong Country', console: 'SNES',
    vibe: 'Quick revisit — push into Monkey Mines.',
    fact: 'David Wise composed DKC\'s soundtrack in 8 weeks using a custom sample synthesis tool. "Aquatic Ambiance" is regularly cited in best-soundtrack-ever lists.',
    tip: 'Pick up your Thursday save. Look for the warp barrel hidden in Mine Cart Carnage — it skips you ahead. KONG letters in every level for extra lives.' },
  { id: 'fri-n4', day: 'Friday', block: 'Late Night Block', time: 'Slot 4 (20m)', minutes: 20,
    title: 'Donkey Kong Country 2', console: 'SNES',
    vibe: 'First taste — Pirate Panic, hear Stickerbrush Symphony.',
    fact: 'DKC2 is widely considered superior to DKC1. "Stickerbrush Symphony" is one of the most beloved video game tracks of all time — David Wise wrote it specifically to be hypnotic.',
    tip: 'Diddy is faster + cartwheel attack; Dixie can helicopter-glide. Use Dixie for vertical levels. Bramble levels hide bonus rooms behind specific bramble entrances.' },

  // ============================== SATURDAY NIGHT ==============================
  // Full flight block — Ace Combat warm-up
  { id: 'sat-n1', day: 'Saturday', block: 'Late Night Block', time: 'Slot 1 (25m)', minutes: 25,
    title: '1942', console: 'NES',
    vibe: 'Arcade-era top-down WWII shooter — the OG of the flight thread.',
    fact: '1942 was Capcom\'s second arcade game (1984), and it kicked off the long-running 19XX series that ran through 2001. The protagonist plane is the "Super Ace."',
    tip: 'Press B+direction to LOOP — temporary invincibility. Save loops for tight spots. Power-ups: red = bigger plane, yellow = side fighters.' },
  { id: 'sat-n2', day: 'Saturday', block: 'Late Night Block', time: 'Slot 2 (25m)', minutes: 25,
    title: 'Top Gun', console: 'NES',
    vibe: 'Janky NES aviation — attempt the carrier landings.',
    fact: 'The carrier landing in Top Gun NES is so famously brutal that it became one of the earliest video game memes. The game was a launch tie-in for the 1986 movie.',
    tip: 'For carrier landing: glide slope and speed must BOTH be in the green. Pull up and throttle constantly — corrections compound.' },
  { id: 'sat-n3', day: 'Saturday', block: 'Late Night Block', time: 'Slot 3 (25m)', minutes: 25,
    title: 'After Burner II', console: 'Genesis',
    vibe: 'Pure arcade flight chaos — Yu Suzuki / Sega energy.',
    fact: 'After Burner II was Yu Suzuki\'s response to Top Gun. The arcade cabinet had a hydraulic moving cockpit. Hideo Kojima cited it as a major influence on Metal Gear.',
    tip: 'Lock-on with vulcan first, then missile spam. The throttle (X/Y) is real — slow down through tight enemy waves, throttle up on bosses.' },
  { id: 'sat-n4', day: 'Saturday', block: 'Late Night Block', time: 'Slot 4 (45m)', minutes: 45,
    title: 'F-15 Strike Eagle II', console: 'Genesis',
    vibe: 'Slower sim — the proto-Ace Combat lineage finale.',
    fact: 'Sid Meier (yes, that Sid Meier) created the original F-15 Strike Eagle in 1984. The series helped legitimize "sim" games on home consoles before Ace Combat refined the genre.',
    tip: 'Read the manual concepts: ECM jams enemy radar, chaff defeats radar missiles, flares defeat heat-seekers. Pick Libya scenario for the most accessible mission.' },
];

/** Helper: get all unique days in itinerary order */
export const DAYS = [...new Set(ITINERARY.map(g => g.day))];

/** Helper: get distinct console list (for stats coloring) */
export const CONSOLES = [...new Set(ITINERARY.map(g => g.console))];
