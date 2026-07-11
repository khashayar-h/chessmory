import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, FlipHorizontal2, Lock } from "lucide-react";
import ChessBoard from "../components/ChessBoard";
import FontImport from "../components/FontImport";
import { styles } from "../styles";
import { useLocalStore } from "../lib/localStore";
import { useSharedDeck } from "../lib/supabaseStore";
import { supabaseEnabled } from "../lib/supabaseClient";
import { APP_NAME } from "../lib/brand";

// Read-only viewer for a deck shared via /shared/:slug — no grading, no
// account required. Works for any visitor: Supabase's "public read" RLS
// policy allows this query with no session at all.
export default function SharedDeck() {
  const { slug } = useParams();
  const localStore = useLocalStore();
  const remote = useSharedDeck(slug);

  const loading = supabaseEnabled ? remote.loading : localStore.loading;
  const deck = supabaseEnabled ? remote.deck : localStore.decks.find((d) => d.shareSlug === slug && d.isPublic);
  const cards = supabaseEnabled ? remote.cards : (deck ? localStore.cards.filter((c) => c.deckId === deck.id) : []);

  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];

  return (
    <div style={styles.appShell}>
      <FontImport />
      <header style={styles.topBar}>
        <Link to="/" style={styles.brand}>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 20 }}>{APP_NAME}</span>
        </Link>
      </header>
      <main style={{ ...styles.main, maxWidth: 560, margin: "0 auto", width: "100%" }}>
        {loading ? null : !deck ? (
          <div className="fade-in" style={{ ...styles.center, flexDirection: "column", gap: 12, marginTop: 60 }}>
            <Lock size={22} color="#9C9587" />
            <div style={{ fontFamily: "'Newsreader', serif", fontSize: 20 }}>This deck isn't shared</div>
            <p style={styles.muted}>The link is private, disabled, or doesn't exist.</p>
            <Link to="/" style={styles.ghostBtn}>Go to {APP_NAME}</Link>
          </div>
        ) : cards.length === 0 ? (
          <p style={styles.muted}>This deck has no cards yet.</p>
        ) : (
          <div className="fade-in">
            <h1 style={styles.h1}>{deck.name}</h1>
            <p style={styles.muted}>Shared deck · view-only · card {index + 1} of {cards.length}</p>

            <div style={styles.reviewCard}>
              {card.type === "chess" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                  <ChessBoard fen={card.fen} flipped={flipped} maxWidth={300} />
                  <button className="btn-anim" onClick={() => setFlipped((f) => !f)} style={{ ...styles.ghostBtn, marginTop: 10 }}>
                    <FlipHorizontal2 size={14} /> Flip board
                  </button>
                </div>
              ) : (
                <div style={styles.frontText}>{card.front}</div>
              )}
              {showBack && (
                <div className="pop-in" style={styles.backText}>
                  <div style={{ height: 1, background: "rgba(237,230,214,0.15)", margin: "18px 0" }} />
                  {card.back}
                </div>
              )}
            </div>

            {!showBack ? (
              <button className="btn-anim" style={{ ...styles.primaryBtn, width: "100%", marginTop: 16, justifyContent: "center" }} onClick={() => setShowBack(true)}>
                Show answer
              </button>
            ) : (
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button
                  className="btn-anim"
                  style={{ ...styles.ghostBtn, flex: 1, justifyContent: "center" }}
                  disabled={index === 0}
                  onClick={() => { setIndex((i) => Math.max(0, i - 1)); setShowBack(false); }}
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <button
                  className="btn-anim"
                  style={{ ...styles.primaryBtn, flex: 1, justifyContent: "center" }}
                  disabled={index === cards.length - 1}
                  onClick={() => { setIndex((i) => Math.min(cards.length - 1, i + 1)); setShowBack(false); }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
