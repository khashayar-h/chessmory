import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { ChevronLeft, FlipHorizontal2 } from "lucide-react";
import ChessBoard from "../components/ChessBoard";
import { previewInterval, formatInterval } from "../lib/scheduler";
import { styles } from "../styles";

const GRADE_COLORS = { 0: "#7A3B33", 3: "#8A6A2E", 4: "#3F6E52", 5: "#2E6E76" };
const GRADE_TEXT = { 0: "Again", 3: "Hard", 4: "Good", 5: "Easy" };

export default function Review() {
  const { store } = useOutletContext();
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = store.decks.find((d) => d.id === deckId);
  const allCards = store.cards.filter((c) => c.deckId === deckId);

  const dueNow = useMemo(
    () => allCards.filter((c) => new Date(c.dueDate).getTime() <= Date.now()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deckId]
  );
  const [studyAll, setStudyAll] = useState(false);
  const [queue, setQueue] = useState(dueNow);
  const [revealState, setRevealState] = useState("front"); // front | flipping | back
  const [flipped, setFlipped] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);
  const showBack = revealState === "back";

  useEffect(() => {
    setQueue(studyAll ? allCards : dueNow);
    setRevealState("front");
    setStudiedCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyAll, deckId]);

  const card = queue[0];

  // Keep the in-flight queue's card data fresh (e.g. after an edit).
  const liveCard = card ? allCards.find((c) => c.id === card.id) || card : null;

  if (allCards.length === 0) {
    return (
      <div style={styles.center}>
        <p style={styles.muted}>This deck has no cards yet.</p>
        <button className="btn-anim" style={styles.ghostBtn} onClick={() => navigate(`/app/deck/${deckId}`)}>
          <ChevronLeft size={14} /> Back
        </button>
      </div>
    );
  }

  if (!liveCard) {
    return (
      <div className="fade-in" style={{ ...styles.center, flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: "'Newsreader', serif", fontSize: 22 }}>Nothing due right now</div>
        <p style={styles.muted}>Every card in "{deck?.name}" is scheduled for later.</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-anim" style={styles.ghostBtn} onClick={() => navigate(`/app/deck/${deckId}`)}>
            <ChevronLeft size={14} /> Back to decks
          </button>
          {!studyAll && (
            <button className="btn-anim" style={styles.primaryBtn} onClick={() => setStudyAll(true)}>Study anyway</button>
          )}
        </div>
      </div>
    );
  }

  function reveal() {
    setRevealState("flipping");
    setTimeout(() => setRevealState("back"), 210);
  }

  function grade(g) {
    store.gradeCard(liveCard.id, g);
    setStudiedCount((n) => n + 1);
    setQueue((q) => {
      const rest = q.slice(1);
      if (g === 0) {
        // Resurface "Again" cards soon, but not immediately next —
        // slot it a few cards later in this session's queue.
        const insertAt = Math.min(rest.length, 3);
        return [...rest.slice(0, insertAt), liveCard, ...rest.slice(insertAt)];
      }
      return rest;
    });
    setRevealState("front");
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <button className="btn-anim" style={styles.backLink} onClick={() => navigate(`/app/deck/${deckId}`)}>
        <ChevronLeft size={14} /> Back
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={styles.h1}>{deck?.name}</h1>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C9587" }}>
          {studiedCount + 1} / {studiedCount + queue.length}
        </span>
      </div>

      <div key={liveCard.id} className="fade-in flip-stage">
        <div
          className={revealState === "flipping" ? "flip-spin" : ""}
          style={styles.reviewCard}
        >
          {liveCard.type === "chess" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <ChessBoard fen={liveCard.fen} flipped={flipped} maxWidth={300} />
              <button className="btn-anim" onClick={() => setFlipped((f) => !f)} style={{ ...styles.ghostBtn, marginTop: 10 }}>
                <FlipHorizontal2 size={14} /> Flip board
              </button>
            </div>
          ) : (
            <div style={styles.frontText}>{liveCard.front}</div>
          )}

          {showBack && (
            <div className="pop-in" style={styles.backText}>
              <div style={{ height: 1, background: "rgba(237,230,214,0.15)", margin: "18px 0" }} />
              {liveCard.back}
            </div>
          )}
        </div>
      </div>

      {!showBack ? (
        <button className="btn-anim" style={{ ...styles.primaryBtn, width: "100%", marginTop: 16, justifyContent: "center" }} onClick={reveal}>
          Show answer
        </button>
      ) : (
        <div className="pop-in" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16 }}>
          {[0, 3, 4, 5].map((g) => (
            <button
              key={g}
              className="grade-btn"
              style={{ ...styles.gradeBtn, background: GRADE_COLORS[g] }}
              onClick={() => grade(g)}
            >
              <span>{GRADE_TEXT[g]}</span>
              <span style={styles.gradeBtnInterval}>({formatInterval(previewInterval(liveCard, g))})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
