# Staycation.exe — Retro Gaming Tracker

A lightweight web app to track progress through a multi-day retro gaming
staycation. CRT-styled, mobile-first, single user.

**Features**
- Day-by-day schedule view with completion checkboxes
- Per-game timer with target (auto-set from itinerary)
- "Did you know" historical facts + pro tips for each game
- Field notes with autosave
- 5-star rating per game
- Stats dashboard: console breakdown, top rated, notes wall
- Works offline (localStorage); upgrades to Supabase for cross-device sync

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure (optional — works without it in local-only mode)
cp .env.example .env
# Edit .env with your Supabase URL + anon key, OR set VITE_LOCAL_ONLY=true

# 3. Run
npm run dev
```

Open http://localhost:5173. Done.

## Setting up Supabase

### Hosted (recommended)

1. Sign up at https://supabase.com — free tier is plenty.
2. New project. Copy the URL and `anon` key from **Settings → API**.
3. Paste into `.env`:
   ```env
   VITE_SUPABASE_URL=https://abcdefgh.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. **Authentication → Providers → enable "Anonymous Sign-Ins"** (toggle).
5. **SQL Editor → New query → paste `supabase/migrations/20250505000000_init_progress.sql` → Run.**
6. `npm run dev` and you're synced.

### Local (Docker required)

```bash
brew install supabase/tap/supabase    # macOS
supabase start
supabase db reset                      # applies migrations
```

Copy the printed local URL + anon key into `.env`.

## Project Layout

```
src/
├── App.jsx                 ← Main shell (tabs, state, routing)
├── main.jsx                ← React entry
├── index.css               ← Tailwind + CRT styles
├── data/
│   └── itinerary.js        ← All games and metadata (edit to customize)
├── lib/
│   ├── supabase.js         ← Supabase client
│   ├── useAuth.js          ← Auth hook (anonymous by default)
│   ├── storage.js          ← Unified Supabase/localStorage interface
│   └── utils.js            ← Helpers
└── components/
    ├── ScheduleView.jsx
    ├── GameDetail.jsx
    └── StatsView.jsx

supabase/
├── config.toml             ← Local dev config
└── migrations/
    └── 20250505000000_init_progress.sql
```

## Customizing

**Add a game**: edit `src/data/itinerary.js`. Each entry needs a unique `id`,
`day`, `block`, `time`, `minutes`, `title`, `console`, `vibe`, `fact`, `tip`.

**Add a new day** (e.g. Mario Day): just add entries with the new day name.
The day filter auto-populates.

**Change the look**: the CRT aesthetic is in `src/index.css`. The scanlines
and glow are CSS-only — easy to tone down or remove entirely.

## Deployment

Build is static. Any static host works:

```bash
npm run build           # outputs to dist/
```

- **Vercel / Netlify**: connect the repo, set env vars, deploy.
- **Cloudflare Pages**: same.
- **Railway**: add as a static service or use `npx serve dist`.

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your host's env vars.

## Tech Stack

- **Vite** — build tool
- **React 18** — UI
- **Tailwind CSS** — styling utility
- **Supabase** — auth + Postgres
- **lucide-react** — icons

No backend code beyond the Supabase migration. Everything else is client-side.

## License

Personal project — do whatever you want with it.
