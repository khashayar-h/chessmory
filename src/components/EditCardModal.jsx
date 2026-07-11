import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, FlipHorizontal2 } from "lucide-react";
import ChessBoard, { isValidFEN } from "./ChessBoard";
import { styles } from "../styles";

export default function EditCardModal({ card, onSave, onClose }) {
  const [front, setFront] = useState(card.front || "");
  const [back, setBack] = useState(card.back || "");
  const [fen, setFen] = useState(card.fen || "");
  const [flipped, setFlipped] = useState(false);

  const fenValid = useMemo(() => (card.type === "chess" ? isValidFEN(fen) : true), [fen, card.type]);
  const canSave = card.type === "chess" ? fenValid && back.trim() : front.trim() && back.trim();

  function handleSave() {
    if (!canSave) return;
    if (card.type === "chess") onSave({ fen: fen.trim(), back: back.trim() });
    else onSave({ front: front.trim(), back: back.trim() });
  }

  return createPortal(
    <div className="backdrop-fade" style={styles.modalBackdrop} onClick={onClose}>
      <div className="pop-in" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={styles.h2}>Edit card</h2>
          <button className="btn-anim" onClick={onClose} style={{ ...styles.dangerIconBtn, color: "#9C9587" }} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {card.type === "chess" ? (
          <>
            <label style={styles.label}>FEN</label>
            <input
              value={fen}
              onChange={(e) => setFen(e.target.value)}
              style={{ ...styles.input, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}
            />
            <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
              <div style={{ width: "100%", maxWidth: 220 }}>
                <ChessBoard fen={fen} flipped={flipped} maxWidth={220} />
                <button className="btn-anim" onClick={() => setFlipped((f) => !f)} style={{ ...styles.ghostBtn, marginTop: 8 }}>
                  <FlipHorizontal2 size={14} /> Flip board
                </button>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={styles.label}>Best strategy (back of the card)</label>
                <textarea value={back} onChange={(e) => setBack(e.target.value)} rows={9} style={styles.textarea} />
              </div>
            </div>
          </>
        ) : (
          <>
            <label style={styles.label}>Front</label>
            <textarea value={front} onChange={(e) => setFront(e.target.value)} rows={2} style={styles.textarea} />
            <label style={styles.label}>Back</label>
            <textarea value={back} onChange={(e) => setBack(e.target.value)} rows={3} style={styles.textarea} />
          </>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button className="btn-anim" style={styles.ghostBtn} onClick={onClose}>Cancel</button>
          <button
            className="btn-anim"
            onClick={handleSave}
            disabled={!canSave}
            style={{ ...styles.primaryBtn, opacity: canSave ? 1 : 0.45 }}
          >
            <Check size={15} /> Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
