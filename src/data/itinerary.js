/**
 * itinerary.js — five-session focused franchise staycation
 * --------------------------------------------------------
 * Tonight (Wed):  Mario + Zelda + KCD2 (3 hrs) — soft opener
 * Friday day:     Flight lineage → Ace Combat 1 (3 hrs)
 * Friday night:   Super Metroid deep dive (2 hrs)
 * Saturday:       Contra (NES + Hard Corps) (2 hrs)
 * Sunday night:   Mega Man 2 + Mega Man X (2 hrs)
 *
 * Each session anchors on one franchise/theme rather than sampling broadly.
 * Game IDs are stable. Renaming an ID orphans existing progress rows.
 */

export const ITINERARY = [
  // ============================== TONIGHT (WEDNESDAY) ==============================
  // Soft opener: modern bridge → Mario comfort → Zelda continuation
  { id: 'wed-1', day: 'Wednesday', block: 'Night Session', time: 'Hour 1 (60m)', minutes: 60,
    title: 'Kingdom Come: Deliverance 2', console: 'PS5',
    vibe: 'Modern bridge — your current playthrough.',
    fact: 'KCD2 launched February 2025. Warhorse Studios used real medieval Bohemia for the map — many locations like Trosky Castle still exist. The dialog system was rebuilt to support full voice acting in 8 languages.',
    tip: 'Save often (Saviour Schnapps if you have them). Stealth/lockpicking levels 5+ before story unlocks them. Hunting is a steady money source early on.' },
  { id: 'wed-2', day: 'Wednesday', block: 'Night Session', time: 'Hour 2 (30m)', minutes: 30,
    title: 'Super Mario Bros. 3', console: 'NES',
    vibe: 'Mario warm-up — use a warp whistle to skip ahead.',
    fact: 'Released in 1988 in Japan and 1990 in the US, SMB3 was so anticipated that the movie "The Wizard" (1989) functioned as a 90-min commercial for it.',
    tip: 'Warp whistle in World 1-3 (hidden room behind the white block) → World 4. Second whistle in fortress of World 1 → bigger skip. Tanooki suit shows up in World 3.' },
  { id: 'wed-3', day: 'Wednesday', block: 'Night Session', time: 'Hour 2 (30m)', minutes: 30,
    title: 'Super Mario World', console: 'SNES',
    vibe: 'Yoshi era — Donut Plains or Star Road exploration.',
    fact: 'Super Mario World was a SNES launch title (1990 JP, 1991 NA). Yoshi was originally planned for SMB3 but the NES couldn\'t handle the sprite — Miyamoto held the idea for the SNES.',
    tip: 'The Cape is broken — fly across whole levels with a running start. Donut Plains 1 has a secret exit to Star Road. Special World colors change Boos/Bullet Bills permanently.' },
  { id: 'wed-4', day: 'Wednesday', block: 'Night Session', time: 'Hour 3 (60m)', minutes: 60,
    title: 'Zelda: A Link to the Past', console: 'SNES',
    vibe: 'Continue your playthrough — clear a dungeon, push the story.',
    fact: 'ALttP\'s Dark World was inspired by The Wizard of Oz. The game\'s 1991 release was so important to Nintendo that they bundled it with the SNES in some regions.',
    tip: 'Dash with the Pegasus Boots through bushes for hidden items and rupees. Bombs reveal hidden cave entrances on cliff walls — try suspicious wall sections.' },

  // ============================== FRIDAY DAY ==============================
  // Flight historical lineage culminating in Ace Combat 1
  { id: 'fri-1', day: 'Friday', block: 'Afternoon Block', time: 'Slot 1 (25m)', minutes: 25,
    title: '1942', console: 'NES',
    vibe: 'Arcade-era top-down WWII shooter — the OG of the flight thread.',
    fact: '1942 was Capcom\'s second arcade game (1984), and it kicked off the long-running 19XX series that ran through 2001. The protagonist plane is the "Super Ace."',
    tip: 'Press B+direction to LOOP — temporary invincibility. Save loops for tight spots. Power-ups: red = bigger plane, yellow = side fighters.' },
  { id: 'fri-2', day: 'Friday', block: 'Afternoon Block', time: 'Slot 2 (25m)', minutes: 25,
    title: 'Top Gun', console: 'NES',
    vibe: 'Janky NES aviation — attempt the carrier landings.',
    fact: 'The carrier landing in Top Gun NES is so famously brutal that it became one of the earliest video game memes. The game was a launch tie-in for the 1986 movie.',
    tip: 'For carrier landing: glide slope and speed must BOTH be in the green. Pull up and throttle constantly — corrections compound.' },
  { id: 'fri-3', day: 'Friday', block: 'Afternoon Block', time: 'Slot 3 (30m)', minutes: 30,
    title: 'After Burner II', console: 'Genesis',
    vibe: 'Pure arcade flight chaos — Yu Suzuki / Sega energy.',
    fact: 'After Burner II was Yu Suzuki\'s response to Top Gun. The arcade cabinet had a hydraulic moving cockpit. Hideo Kojima cited it as a major influence on Metal Gear.',
    tip: 'Lock-on with vulcan first, then missile spam. The throttle (X/Y) is real — slow down through tight enemy waves, throttle up on bosses.' },
  { id: 'fri-4', day: 'Friday', block: 'Afternoon Block', time: 'Slot 4 (45m)', minutes: 45,
    title: 'F-15 Strike Eagle II', console: 'Genesis',
    vibe: 'Slower sim — the proto-Ace Combat lineage finale.',
    fact: 'Sid Meier (yes, that Sid Meier) created the original F-15 Strike Eagle in 1984. The series helped legitimize "sim" games on home consoles before Ace Combat refined the genre.',
    tip: 'Read the manual concepts: ECM jams enemy radar, chaff defeats radar missiles, flares defeat heat-seekers. Pick Libya scenario for the most accessible mission.' },
  { id: 'fri-5', day: 'Friday', block: 'Afternoon Block', time: 'Break (15m)', minutes: 15,
    title: '☕ Console Swap & Hydrate', console: 'Break',
    vibe: 'Move to PS1, hydrate, get into the right headspace for the destination.',
    fact: 'The PlayStation launched in Japan December 1994 — the same era as the Genesis flight games you just played. Ace Combat was a launch-window title.',
    tip: 'Quick stretch. Grab water. Maybe a snack. The next hour is the payoff.' },
  { id: 'fri-6', day: 'Friday', block: 'Afternoon Block', time: 'Slot 6 (60m)', minutes: 60,
    title: 'Ace Combat (PS1, NTSC-J)', console: 'PS1',
    vibe: 'The destination — 1995, the game the lineage was leading to.',
    fact: 'The original Ace Combat (Air Combat in the West) launched in 1995 on PS1. It was Namco\'s response to the flight sim genre — taking the seriousness of F-15 Strike Eagle and adding arcade accessibility. Your NTSC-J copy is the original Japanese release.',
    tip: 'The first mission is mostly tutorial. Mission 2-3 is where the dogfighting really opens up. Try the F-14 or F-15 — they\'re the most forgiving early planes.' },

  // ============================== FRIDAY NIGHT ==============================
  // Super Metroid — single uninterrupted session
  { id: 'fri-n1', day: 'Friday', block: 'Late Night Block', time: 'Full session (120m)', minutes: 120,
    title: 'Super Metroid', console: 'SNES',
    vibe: 'Single uninterrupted session — Brinstar through Norfair, find Varia Suit.',
    fact: 'Super Metroid\'s opening on Ceres Space Colony was directly homaged in Alien: Isolation. The game\'s map system was revolutionary — it was the first Metroid with one. The score by Kenji Yamamoto is widely considered one of the greatest in gaming.',
    tip: 'Wall jump: kick off a wall and tap toward it again right as you push off. Shinespark: run until Samus sparkles, then crouch to store, then jump+direction. When stuck, go where you haven\'t been.' },

  // ============================== SATURDAY ==============================
  // Contra franchise — generational pairing
  { id: 'sat-1', day: 'Saturday', block: 'Day Session', time: 'Slot 1 (45m)', minutes: 45,
    title: 'Contra', console: 'NES',
    vibe: 'NES origin — establish the formula. Konami Code essential.',
    fact: 'The Konami Code (↑↑↓↓←→←→BA) was originally created by developer Kazuhisa Hashimoto for testing — he found the game too hard to playtest without it. It shipped enabled and became one of the most famous cheat codes in history.',
    tip: 'Konami Code at title screen for 30 lives. Spread Gun (S) is the best weapon — protect it. The waterfall level is harder than the boss after it. Co-op with a 2nd controller if available.' },
  { id: 'sat-2', day: 'Saturday', block: 'Day Session', time: 'Slot 2 (75m)', minutes: 75,
    title: 'Contra: Hard Corps', console: 'Genesis',
    vibe: 'Genesis evolution — branching paths, multiple endings, full character run.',
    fact: 'Hard Corps has 4 playable characters with unique weapons and 5 different endings based on branching paths. The Japanese version gave you 3 hits per life — the Western release made it 1, making it one of the hardest 16-bit games ever shipped in the West.',
    tip: 'Sheen (the robot) has the most balanced weapons. Multiple endings — your choices in the second stage branch into completely different levels. Try a different character on a second run if time permits.' },

  // ============================== SUNDAY NIGHT ==============================
  // Mega Man franchise — generational pairing finale
  { id: 'sun-1', day: 'Sunday', block: 'Night Session', time: 'Slot 1 (60m)', minutes: 60,
    title: 'Mega Man 2', console: 'NES',
    vibe: 'NES peak — beat 3-4 Robot Masters, get Metal Blade, push toward Wily.',
    fact: 'Mega Man 2 was developed in the team\'s spare time after the original underperformed. It became the bestselling game in the classic series and is widely considered the franchise peak.',
    tip: 'Recommended order: Metal Man → Air Man → Crash Man → Wood Man. Metal Blade is famously broken — it works on almost every boss including Metal Man himself.' },
  { id: 'sun-2', day: 'Sunday', block: 'Night Session', time: 'Slot 2 (60m)', minutes: 60,
    title: 'Mega Man X', console: 'SNES',
    vibe: 'SNES reinvention — feel the generational leap. Highway intro + Chill Penguin + 1-2 more Mavericks.',
    fact: 'Mega Man X was conceived as the "more mature" Mega Man for SNES. The intro stage secretly teaches you wall-jump — the Sigma encounter is unwinnable to set up the tutorial. The dash mechanic introduced here would influence platformers for decades.',
    tip: 'Beat Chill Penguin FIRST — he drops the dash boots that transform the rest of the game. Every Maverick has a heart tank and sub-tank hidden in their stage. Wall-jump is mandatory; experiment in the intro stage.' },
];

/** Helper: get all unique days in itinerary order */
export const DAYS = [...new Set(ITINERARY.map(g => g.day))];

/** Helper: get distinct console list (for stats coloring) */
export const CONSOLES = [...new Set(ITINERARY.map(g => g.console))];
