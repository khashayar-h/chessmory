-- Chessmory schema. Run once in the Supabase SQL Editor
-- (Project → SQL Editor → New query → paste → Run).

create extension if not exists pgcrypto;

create table if not exists decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  is_public boolean not null default false,
  share_slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references decks(id) on delete cascade,
  type text not null check (type in ('basic', 'chess')),
  front text,
  back text,
  fen text,
  repetition int not null default 0,
  ease_factor double precision not null default 2.5,
  interval int not null default 0,
  due_date timestamptz not null default now(),
  last_grade int,
  created_at timestamptz not null default now()
);

create index if not exists cards_deck_id_idx on cards (deck_id);
create index if not exists decks_user_id_idx on decks (user_id);
create index if not exists decks_share_slug_idx on decks (share_slug);

alter table decks enable row level security;
alter table cards enable row level security;

-- Owners can do everything to their own decks.
create policy "decks_owner_all" on decks
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Anyone (including anonymous visitors) can read a deck flagged public.
create policy "decks_public_read" on decks
  for select
  using (is_public = true);

-- Owners can do everything to cards in their own decks.
create policy "cards_owner_all" on cards
  for all
  using (exists (
    select 1 from decks d where d.id = cards.deck_id and d.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from decks d where d.id = cards.deck_id and d.user_id = auth.uid()
  ));

-- Anyone can read cards belonging to a public deck.
create policy "cards_public_read" on cards
  for select
  using (exists (
    select 1 from decks d where d.id = cards.deck_id and d.is_public = true
  ));
