import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Plus, BookOpen, Library, BarChart3, Link2, Check } from "lucide-react";
import ConfirmDelete from "../components/ConfirmDelete";
import { styles } from "../styles";

function ShareToggle({ deck, onSetPublic }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/shared/${deck.shareSlug}`;

  function copy() {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div style={styles.shareRow} onClick={(e) => e.stopPropagation()}>
      <button
        role="switch"
        aria-checked={deck.isPublic}
        onClick={() => onSetPublic(!deck.isPublic)}
        style={{ ...styles.switch, background: deck.isPublic ? "#3F6E52" : "rgba(237,230,214,0.2)" }}
      >
        <span style={{ ...styles.switchKnob, left: deck.isPublic ? 20 : 2 }} />
      </button>
      <span style={{ fontSize: 12, color: "#9C9587" }}>{deck.isPublic ? "Public" : "Private"}</span>
      {deck.isPublic && (
        <div style={styles.shareLinkBox}>
          <Link2 size={12} style={{ flexShrink: 0 }} />
          <span style={styles.shareLinkText}>{shareUrl}</span>
          <button className="btn-anim" onClick={copy} style={{ ...styles.ghostBtn, padding: "3px 8px", flexShrink: 0 }}>
            {copied ? <Check size={12} /> : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function DecksHome() {
  const { store } = useOutletContext();
  const { deckId } = useParams();
  const navigate = useNavigate();
  const list = deckId ? store.decks.filter((d) => d.id === deckId) : store.decks;
  const activeDeck = deckId ? store.decks.find((d) => d.id === deckId) : null;

  return (
    <div className="fade-in" style={{ maxWidth: 760, margin: "0 auto" }}>
      <h1 style={styles.h1}>{activeDeck ? activeDeck.name : "Your decks"}</h1>
      {store.decks.length === 0 && (
        <p style={styles.muted}>
          Create a deck in the sidebar, then add your first card — basic Q&amp;A or a chess
          position with a FEN string on the front.
        </p>
      )}
      <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
        {list.map((d) => {
          const due = store.dueCount(d.id);
          const total = store.totalCount(d.id);
          return (
            <div key={d.id} className="card-lift" style={styles.deckCard}>
              <ConfirmDelete
                onConfirm={() => store.deleteDeck(d.id)}
                style={styles.deckDeleteBtn}
              />
              <div style={{ paddingRight: 36, width: "100%" }}>
                <div style={{ fontFamily: "'Newsreader', serif", fontSize: 19 }}>{d.name}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C9587", marginTop: 2 }}>
                  {total} card{total !== 1 ? "s" : ""} · {due} due
                </div>
                <div style={{ marginTop: 10 }}>
                  <ShareToggle deck={d} onSetPublic={(v) => store.setDeckPublic(d.id, v)} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn-anim" style={styles.ghostBtn} onClick={() => navigate(`/app/deck/${d.id}/add`)}>
                  <Plus size={14} /> Card
                </button>
                <button className="btn-anim" style={styles.ghostBtn} onClick={() => navigate(`/app/deck/${d.id}/browse`)}>
                  <Library size={14} /> Browse
                </button>
                <button className="btn-anim" style={styles.ghostBtn} onClick={() => navigate(`/app/deck/${d.id}/stats`)}>
                  <BarChart3 size={14} /> Stats
                </button>
                <button
                  className="btn-anim"
                  style={{ ...styles.primaryBtn, opacity: due === 0 ? 0.5 : 1 }}
                  onClick={() => navigate(`/app/deck/${d.id}/review`)}
                >
                  <BookOpen size={14} /> Study{due > 0 ? ` (${due})` : ""}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
