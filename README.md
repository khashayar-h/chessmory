# Chessmory

Spaced-repetition flashcards for chess tactics, openings, and endgames. Cards can be a plain question/answer or a chess position (FEN) with the winning idea on the back.

Live source: https://github.com/khashayar-h/chessmory

## Features

- User accounts (email/password) — each person sees only their own decks
- Spaced-repetition scheduling (SM-2 derived) — Again / Hard / Good / Easy, each previewing when the card will resurface
- Chess positions rendered with [react-chessboard](https://github.com/Clariity/react-chessboard)
- Browse, edit, and delete cards per deck
- Per-deck statistics (cards by last grade)
- Public/private deck sharing via a read-only link — works across devices and accounts
- Client-side routing (landing page, app, shared-deck viewer) — no full page reloads
- Responsive, full-screen on mobile

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
```

### Setting up accounts (Supabase)

Accounts and sharing are backed by [Supabase](https://supabase.com). Without it configured, the app still runs against `localStorage` (no login, single browser only).

1. Create a free project at supabase.com.
2. In the SQL Editor, run `supabase/schema.sql` — creates the `decks`/`cards` tables with row-level security.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key (Project Settings → API).
4. Optional: under Authentication → Sign In / Providers → Email, toggle off "Confirm email" for frictionless local testing.

## Stack

React 18, Vite, react-router-dom, react-chessboard, Supabase (Auth + Postgres + RLS).
