import { Link, useNavigate } from "react-router-dom";
import { Menu, Crown, LogOut } from "lucide-react";
import { styles } from "../styles";
import { APP_NAME, APP_TAGLINE } from "../lib/brand";

export default function TopBar({ isMobile, onMenuClick, user, onSignOut }) {
  const navigate = useNavigate();

  async function handleSignOut() {
    await onSignOut();
    navigate("/");
  }

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
      <div style={styles.topBarSpacer} />
      {user && (
        <>
          {!isMobile && <span style={{ fontSize: 12, color: "#6E6A5F" }}>{user.email}</span>}
          <button className="btn-anim" onClick={handleSignOut} style={styles.navLink} aria-label="Sign out">
            <LogOut size={14} /> {!isMobile && "Sign out"}
          </button>
        </>
      )}
    </header>
  );
}
