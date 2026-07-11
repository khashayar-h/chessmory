import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { ChevronLeft, Pencil } from "lucide-react";
import ConfirmDelete from "../components/ConfirmDelete";
import ChessBoard from "../components/ChessBoard";
import EditCardModal from "../components/EditCardModal";
import { styles } from "../styles";

export default function Browse() {
  const { store } = useOutletContext();
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = store.decks.find((d) => d.id === deckId);
  const cards = store.cards.filter((c) => c.deckId === deckId);

  const [openId, setOpenId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: "0 auto" }}>
      <button className="btn-anim" style={styles.backLink} onClick={() => navigate(`/app/deck/${deckId}`)}>
        <ChevronLeft size={14} /> Back
      </button>
      <h1 style={styles.h1}>{deck?.name} — {cards.length} card{cards.length !== 1 ? "s" : ""}</h1>
      {cards.length === 0 && <p style={styles.muted}>No cards yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
        {cards.map((c) => (
          <div key={c.id} className="card-lift" style={styles.browseRow}>
            <button
              onClick={() => setOpenId(openId === c.id ? null : c.id)}
              style={{ background: "none", border: "none", color: "inherit", textAlign: "left", flex: 1, cursor: "pointer", fontFamily: "inherit", paddingRight: 8 }}
            >
              <div style={{ fontSize: 13, color: "#9C9587", fontFamily: "'IBM Plex Mono', monospace" }}>
                {c.type === "chess" ? "chess" : "basic"} · due {new Date(c.dueDate).toLocaleDateString()}
              </div>
              <div style={{ marginTop: 2 }}>
                {c.type === "chess" ? c.fen : c.front}
              </div>
              {openId === c.id && (
                <div className="pop-in" style={{ marginTop: 10 }}>
                  {c.type === "chess" ? (
                    <div style={{ width: "100%", maxWidth: 200 }}>
                      <ChessBoard fen={c.fen} maxWidth={200} />
                    </div>
                  ) : null}
                  <div style={{ marginTop: 8, color: "#E8DCC0" }}>{c.back}</div>
                </div>
              )}
            </button>
            <div style={{ display: "flex", gap: 4, flexShrink: 0, marginTop: 2 }}>
              <button
                className="btn-anim"
                onClick={(e) => { e.stopPropagation(); setEditingCard(c); }}
                style={styles.dangerIconBtn}
                aria-label="Edit card"
              >
                <Pencil size={14} />
              </button>
              <ConfirmDelete onConfirm={() => store.deleteCard(c.id)} style={styles.browseDeleteBtn} />
            </div>
          </div>
        ))}
      </div>

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onSave={(patch) => { store.updateCard(editingCard.id, patch); setEditingCard(null); }}
        />
      )}
    </div>
  );
}
