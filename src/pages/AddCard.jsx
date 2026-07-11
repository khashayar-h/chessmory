import { useMemo, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { ChevronLeft, Check, FlipHorizontal2 } from "lucide-react";
import ChessBoard, { START_FEN, isValidFEN } from "../components/ChessBoard";
import { styles } from "../styles";

export default function AddCard() {
  const { store } = useOutletContext();
  const { deckId: routeDeckId } = useParams();
  const navigate = useNavigate();
  const decks = store.decks;

  const [deckId, setDeckId] = useState(routeDeckId || decks[0]?.id || "");
  const [type, setType] = useState("basic");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [fen, setFen] = useState(START_FEN);
  const [strategy, setStrategy] = useState("");
  const [flipped, setFlipped] = useState(false);

  const fenValid = useMemo(() => isValidFEN(fen), [fen]);
  const canSave = deckId && (type === "basic" ? front.trim() && back.trim() : fenValid && strategy.trim());

  function handleSave() {
    if (!canSave) return;
    if (type === "basic") {
      store.addCard({ deckId, type: "basic", front: front.trim(), back: back.trim() });
    } else {
      store.addCard({ deckId, type: "chess", fen: fen.trim(), back: strategy.trim() });
    }
    navigate(`/app/deck/${deckId}`);
  }

  function goBack() {
    navigate(routeDeckId ? `/app/deck/${routeDeckId}` : "/app");
  }

  if (decks.length === 0) {
    return (
      <div style={{ maxWidth: 520 }}>
        <p style={styles.muted}>Create a deck first — use the sidebar.</p>
        <button style={styles.ghostBtn} onClick={goBack}><ChevronLeft size={14} /> Back</button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 620, margin: "0 auto" }}>
      <button className="btn-anim" style={styles.backLink} onClick={goBack}><ChevronLeft size={14} /> Back</button>
      <h1 style={styles.h1}>Add a card</h1>

      <label style={styles.label}>Deck</label>
      <select value={deckId} onChange={(e) => setDeckId(e.target.value)} style={styles.input}>
        {decks.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <label style={styles.label}>Card type</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
        <button
          className="btn-anim"
          onClick={() => setType("basic")}
          style={{ ...styles.toggleBtn, ...(type === "basic" ? styles.toggleBtnActive : {}) }}
        >
          Basic
        </button>
        <button
          className="btn-anim"
          onClick={() => setType("chess")}
          style={{ ...styles.toggleBtn, ...(type === "chess" ? styles.toggleBtnActive : {}) }}
        >
          Chess position
        </button>
      </div>

      {type === "basic" ? (
        <div className="fade-in">
          <label style={styles.label}>Front</label>
          <textarea value={front} onChange={(e) => setFront(e.target.value)} rows={2} style={styles.textarea} />
          <label style={styles.label}>Back</label>
          <textarea value={back} onChange={(e) => setBack(e.target.value)} rows={3} style={styles.textarea} />
        </div>
      ) : (
        <div className="fade-in">
          <label style={styles.label}>FEN (board position for the front of the card)</label>
          <input
            value={fen}
            onChange={(e) => setFen(e.target.value)}
            style={{ ...styles.input, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}
            placeholder={START_FEN}
          />
          <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
            <div style={{ width: "100%", maxWidth: 260 }}>
              <ChessBoard fen={fen} flipped={flipped} maxWidth={260} />
              <button
                className="btn-anim"
                onClick={() => setFlipped((f) => !f)}
                style={{ ...styles.ghostBtn, marginTop: 8 }}
              >
                <FlipHorizontal2 size={14} /> Flip board
              </button>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={styles.label}>Best strategy (back of the card)</label>
              <textarea
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                rows={9}
                placeholder="e.g. 1. Nxe5! wins a pawn — the knight is only defended by the queen, and ...Nxe5 2. Qh5 forks f7 and the knight."
                style={styles.textarea}
              />
            </div>
          </div>
        </div>
      )}

      <button
        className="btn-anim"
        onClick={handleSave}
        disabled={!canSave}
        style={{ ...styles.primaryBtn, marginTop: 18, opacity: canSave ? 1 : 0.45 }}
      >
        <Check size={15} /> Save card
      </button>
    </div>
  );
}
