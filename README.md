# Chessmory

Spaced-repetition flashcards for chess tactics, openings, and endgames. Cards can be a plain question/answer or a chess position (FEN) with the winning idea on the back.

Live source: https://github.com/khashayar-h/chessmory

## Features

- Spaced-repetition scheduling (SM-2 derived) — Again / Hard / Good / Easy, each previewing when the card will resurface
- Chess positions rendered with [react-chessboard](https://github.com/Clariity/react-chessboard)
- Browse, edit, and delete cards per deck
- Per-deck statistics (cards by last grade)
- Public/private deck sharing via a read-only link
- Client-side routing (landing page, app, shared-deck viewer) — no full page reloads
- Responsive, full-screen on mobile

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
```

## Stack

React 18, Vite, react-router-dom, react-chessboard. Data currently persists to `localStorage`; a Supabase-backed accounts/sync layer is in progress.
