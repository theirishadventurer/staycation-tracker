-- =============================================================================
-- Staycation Tracker — Initial Schema
-- =============================================================================
-- Single user-scoped table for tracking progress through the itinerary.
-- The itinerary itself is static (lives in the frontend) — only progress
-- data needs to persist. RLS ensures users only see their own data.
-- =============================================================================

-- Progress table: one row per (user, game) combination
create table if not exists public.progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  game_id         text not null,                              -- e.g. "thu-1", "fri-n3"
  completed       boolean not null default false,
  notes           text default '',
  rating          smallint check (rating between 0 and 5) default 0,
  time_played_sec integer default 0,                          -- accumulated time across sessions
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, game_id)
);

-- Index for the most common query: load all progress for a user
create index if not exists progress_user_id_idx on public.progress(user_id);

-- =============================================================================
-- Row Level Security
-- =============================================================================

alter table public.progress enable row level security;

-- Users can read their own rows
create policy "Users read own progress"
  on public.progress for select
  using (auth.uid() = user_id);

-- Users can insert rows for themselves
create policy "Users insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

-- Users can update their own rows
create policy "Users update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own rows (in case you ever want to reset)
create policy "Users delete own progress"
  on public.progress for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- Auto-update updated_at trigger
-- =============================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger progress_updated_at
  before update on public.progress
  for each row
  execute function public.handle_updated_at();
