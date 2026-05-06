# Staycation Tracker — Claude Code Context

## What this is

A lightweight retro gaming progress tracker. Single-user (per device or per
Supabase account). Tracks 20 games across a 2-day staycation with timers,
notes, ratings, and stats.

Built with: **Vite + React 18 + Tailwind + Supabase** (with a localStorage
fallback when Supabase isn't configured).

## Architecture at a glance

```
src/
  data/itinerary.js          ← static game list. Edit here to add/remove games.
  lib/supabase.js            ← Supabase client (or null if unconfigured)
  lib/useAuth.js             ← anonymous-by-default auth, magic-link upgradeable
  lib/storage.js             ← unified read/write API. Picks cloud or local at runtime.
  lib/utils.js               ← console color map, time formatter
  components/
    ScheduleView.jsx         ← day-filtered list, blocks, completion toggles
    GameDetail.jsx           ← timer ring, fact, tip, notes, rating
    StatsView.jsx            ← progress bars, top-rated, notes wall
  App.jsx                    ← wiring + tabs
  main.jsx, index.css        ← entry + CRT-style global CSS

supabase/
  config.toml                ← local dev config (port 54321 etc.)
  migrations/
    20250505000000_init_progress.sql   ← single table + RLS policies
```

## Data flow

1. `useAuth()` resolves a user (anonymous by default if Supabase is configured;
   fake `local` user otherwise).
2. `createStorage(user.id)` returns either a Supabase-backed store or a
   localStorage-backed store, with the same interface: `load()` and
   `upsert(gameId, patch, current)`.
3. `App.jsx` keeps `progress` in React state and persists every mutation via
   the storage instance. Optimistic update — UI doesn't wait for the network.

## Running locally

```bash
npm install                    # install deps
cp .env.example .env           # then edit .env with your Supabase keys
npm run dev                    # http://localhost:5173
```

If you don't want Supabase yet, set `VITE_LOCAL_ONLY=true` in `.env` and the
app uses localStorage. Everything else works the same.

## Setting up Supabase

### Option A — Hosted (easiest, recommended for production)

1. Create a project at https://supabase.com
2. Project Settings → API → copy the URL and anon key into `.env`:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```
3. Authentication → Providers → enable "Anonymous Sign-Ins"
4. SQL Editor → paste the contents of
   `supabase/migrations/20250505000000_init_progress.sql` → run.
5. `npm run dev` — you're online.

### Option B — Local Supabase (full stack on your machine)

Requires Docker and the Supabase CLI (`brew install supabase/tap/supabase`).

```bash
supabase start                 # boots Postgres + GoTrue + Studio locally
supabase db reset              # applies migrations
```

Local URLs print to terminal — paste the `API URL` and `anon key` into `.env`.

## Common Claude Code tasks

- **Add a new game**: append an entry to `src/data/itinerary.js`. Use a unique
  `id`. No DB migration needed.
- **Add a new day**: same as above; the day filter auto-populates from `DAYS`.
- **Add a "Mario Day" set**: append entries with `day: 'Mario Day'`. Done.
- **Reset all progress**: in Supabase SQL editor: `delete from progress where user_id = auth.uid();`
- **Sync to a new device**: trigger magic-link sign-in (call `signInWithEmail`
  in the auth hook from a UI button — not yet exposed in the UI).
- **Change the timer behavior**: see `src/components/GameDetail.jsx`. Timer
  state is local for smoothness; persisted to `time_played_sec` on
  pause/reset.

## Schema notes

```sql
progress (
  id              uuid PK
  user_id         uuid → auth.users(id)
  game_id         text                    -- matches itinerary.js id
  completed       boolean
  notes           text
  rating          smallint (0-5)
  time_played_sec integer
  created_at      timestamptz
  updated_at      timestamptz             -- auto-updated by trigger
  UNIQUE (user_id, game_id)
)
```

RLS is on. Users can only read/write their own rows.

## Deployment targets

- **Vercel / Netlify**: works out of the box. Set the two `VITE_*` env vars in
  the dashboard, point at this repo, build command `npm run build`,
  output dir `dist`.
- **Railway**: same pattern. Add env vars, set the start command to a static
  serve of `dist/` (e.g. `npx serve dist`).
- **Cloudflare Pages**: same as Vercel.

The only backend is Supabase — the frontend is a fully static SPA after build.

## Conventions

- All money/time math should round on the way out (no float artifacts in the UI).
- Console colors are centralized in `src/lib/utils.js`. Add new consoles there.
- The CRT styling is in `src/index.css` — scanlines and vignette are
  `position: fixed` overlays on the root.
- `neon-btn` class on buttons gives consistent hover/active feedback.
- `scan-card` class on cards gives the panel + glow border treatment.

## What I would NOT change without thinking

- The `storage.js` interface (load/upsert) — it's the seam between UI and
  persistence and lets you swap backends.
- The optimistic-update pattern in `App.jsx` — required to feel snappy on
  mobile cellular.
- Game IDs in `itinerary.js` — they're the join key with Supabase. Renaming
  one orphans existing progress rows.
