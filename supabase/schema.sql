-- Enable required extensions (should already be enabled on new Supabase projects).
create extension if not exists "pgcrypto";

-- Bookmarks table: user-scoped, private by default via RLS.
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) >= 1 and char_length(title) <= 255),
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.bookmarks enable row level security;

-- RLS: users can read only their own bookmarks.
create policy "Users can view own bookmarks"
on public.bookmarks
for select
using (auth.uid() = user_id);

-- RLS: users can insert bookmarks only for themselves.
create policy "Users can insert own bookmarks"
on public.bookmarks
for insert
with check (auth.uid() = user_id);

-- RLS: users can delete only their own bookmarks.
create policy "Users can delete own bookmarks"
on public.bookmarks
for delete
using (auth.uid() = user_id);

-- Helpful index for per-user queries and ordering by most recent.
create index if not exists bookmarks_user_id_created_at_idx
  on public.bookmarks (user_id, created_at desc);

