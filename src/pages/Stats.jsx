import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { styles } from "../styles";

const BUCKETS = [
  { key: "new", label: "New", color: "#9085e9", test: (c) => c.lastGrade == null },
  { key: "again", label: "Again", color: "#e66767", test: (c) => c.lastGrade === 0 },
  { key: "hard", label: "Hard", color: "#c98500", test: (c) => c.lastGrade === 3 },
  { key: "good", label: "Good", color: "#008300", test: (c) => c.lastGrade === 4 },
  { key: "easy", label: "Easy", color: "#3987e5", test: (c) => c.lastGrade === 5 },
];

function BarRow({ label, color, count, max }) {
  const pct = max === 0 ? 0 : Math.max((count / max) * 100, count > 0 ? 4 : 0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 64, flexShrink: 0, fontSize: 13, color: "#EDE6D6", textAlign: "right" }}>{label}</div>
      <div style={{ flex: 1, background: "rgba(237,230,214,0.06)", borderRadius: 4, height: 24, position: "relative" }}>
        <div
          style={{
            width: `${pct}%`, height: 24, background: color, borderRadius: 4,
            transition: "width 0.4s ease", minWidth: count > 0 ? 4 : 0,
          }}
        />
      </div>
      <div style={{ width: 32, flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#9C9587" }}>
        {count}
      </div>
    </div>
  );
}

export default function Stats() {
  const { store } = useOutletContext();
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = store.decks.find((d) => d.id === deckId);
  const cards = store.cards.filter((c) => c.deckId === deckId);

  const counts = BUCKETS.map((b) => ({ ...b, count: cards.filter(b.test).length }));
  const max = Math.max(1, ...counts.map((b) => b.count));
  const dueNow = cards.filter((c) => new Date(c.dueDate).getTime() <= Date.now()).length;

  return (
    <div className="fade-in" style={{ maxWidth: 620, margin: "0 auto" }}>
      <button className="btn-anim" style={styles.backLink} onClick={() => navigate(`/app/deck/${deckId}`)}>
        <ChevronLeft size={14} /> Back
      </button>
      <h1 style={styles.h1}>{deck?.name} — statistics</h1>

      <div style={styles.statGrid}>
        <div style={styles.statTile}>
          <div style={styles.statTileValue}>{cards.length}</div>
          <div style={styles.statTileLabel}>Total cards</div>
        </div>
        <div style={styles.statTile}>
          <div style={styles.statTileValue}>{dueNow}</div>
          <div style={styles.statTileLabel}>Due now</div>
        </div>
        <div style={styles.statTile}>
          <div style={styles.statTileValue}>{counts.find((b) => b.key === "new").count}</div>
          <div style={styles.statTileLabel}>Never studied</div>
        </div>
      </div>

      {cards.length === 0 ? (
        <p style={{ ...styles.muted, marginTop: 20 }}>Add some cards to see stats here.</p>
      ) : (
        <>
          <h2 style={{ ...styles.h2, marginTop: 28 }}>Cards by last answer</h2>
          <p style={{ ...styles.muted, marginTop: -4 }}>
            Where each card currently sits based on how you last graded it.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {counts.map((b) => (
              <BarRow key={b.key} label={b.label} color={b.color} count={b.count} max={max} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
