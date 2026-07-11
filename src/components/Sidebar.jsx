import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { styles } from "../styles";

export default function Sidebar({ decks, dueCount, onAddDeck, isMobile, isOpen, onClose }) {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [newDeckName, setNewDeckName] = useState("");

  async function handleAdd() {
    const name = newDeckName.trim();
    if (!name) return;
    const deck = await onAddDeck(name);
    setNewDeckName("");
    if (deck) navigate(`/app/deck/${deck.id}`);
    if (isMobile) onClose();
  }

  function select(id) {
    navigate(`/app/deck/${id}`);
    if (isMobile) onClose();
  }

  const content = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={styles.sidebarLabel}>Decks</div>
        {isMobile && (
          <button onClick={onClose} style={styles.closeDrawerBtn} aria-label="Close menu">
            <X size={16} />
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {decks.length === 0 && (
          <div style={{ color: "#6E6A5F", fontSize: 13, padding: "8px 4px" }}>
            No decks yet.
          </div>
        )}
        {decks.map((d) => {
          const due = dueCount(d.id);
          return (
            <button
              key={d.id}
              className="deck-row-anim"
              onClick={() => select(d.id)}
              style={{
                ...styles.deckRow,
                background: deckId === d.id ? "rgba(63,110,82,0.18)" : "transparent",
                borderColor: deckId === d.id ? "#3F6E52" : "transparent",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {d.name}
              </span>
              {due > 0 && <span className="due-pulse" style={styles.dueBadge}>{due}</span>}
            </button>
          );
        })}
      </div>
      <div style={styles.newDeckRow}>
        <input
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="New deck name"
          style={styles.input}
        />
        <button className="btn-anim" onClick={handleAdd} style={styles.iconBtn} aria-label="Add deck">
          <Plus size={16} />
        </button>
      </div>
    </>
  );

  if (!isMobile) {
    return <aside style={styles.sidebar}>{content}</aside>;
  }

  return (
    <>
      {isOpen && <div className="backdrop-fade" style={styles.backdrop} onClick={onClose} />}
      <aside
        style={{
          ...styles.sidebar,
          ...styles.sidebarDrawer,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {content}
      </aside>
    </>
  );
}
