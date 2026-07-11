import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { styles } from "../styles";

// A delete control that asks for a second tap instead of a jarring native
// confirm() dialog — first tap arms it, a second tap within ~2.5s deletes.
export default function ConfirmDelete({ onConfirm, size = 14, style }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 2500);
    return () => clearTimeout(t);
  }, [armed]);

  if (armed) {
    return (
      <button
        className="btn-anim confirm-shake"
        onClick={(e) => { e.stopPropagation(); setArmed(false); onConfirm(); }}
        style={{ ...styles.confirmBtn, ...style }}
      >
        Confirm?
      </button>
    );
  }
  return (
    <button
      className="btn-anim danger-btn"
      onClick={(e) => { e.stopPropagation(); setArmed(true); }}
      style={{ ...styles.dangerIconBtn, ...style }}
      aria-label="Delete"
    >
      <Trash2 size={size} />
    </button>
  );
}
