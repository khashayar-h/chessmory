import { Link } from "react-router-dom";
import { Menu, Crown } from "lucide-react";
import { styles } from "../styles";
import { APP_NAME, APP_TAGLINE } from "../lib/brand";

export default function TopBar({ isMobile, onMenuClick }) {
  return (
    <header style={styles.topBar}>
      {isMobile && (
        <button onClick={onMenuClick} style={styles.menuBtn} aria-label="Toggle decks menu">
          <Menu size={20} color="#E8DCC0" />
        </button>
      )}
      <Link to="/" style={styles.brand}>
        <Crown size={18} color="#E8DCC0" />
        <span style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 20 }}>
          {APP_NAME}
        </span>
      </Link>
      {!isMobile && <span style={styles.brandTag}>{APP_TAGLINE}</span>}
    </header>
  );
}
