import { Link } from "react-router-dom";
import { Crown, Github, BookOpen, Share2, BarChart3, Layers } from "lucide-react";
import FontImport from "../components/FontImport";
import ChessBoard from "../components/ChessBoard";
import { styles } from "../styles";
import { APP_NAME, APP_TAGLINE, GITHUB_URL } from "../lib/brand";
import { useAuth } from "../lib/useAuth";
import { supabaseEnabled } from "../lib/supabaseClient";

const FEATURES = [
  { icon: Layers, title: "Spaced repetition", body: "Cards resurface right when you're about to forget them — Again, Hard, Good, or Easy, each with its own schedule." },
  { icon: BookOpen, title: "Chess positions or plain Q&A", body: "Drop in a FEN string for a tactic or endgame, or write a normal flashcard — both live in the same deck." },
  { icon: Share2, title: "Share a deck by link", body: "Flip a deck to public and send the link — anyone can study it, no account required." },
  { icon: BarChart3, title: "Track your progress", body: "See how many cards in each deck are new, or landing in Again, Hard, Good, or Easy." },
];

export default function Landing() {
  const { user } = useAuth();
  const loggedIn = !supabaseEnabled || Boolean(user);
  const ctaTo = loggedIn ? "/app" : "/login";
  const ctaLabel = loggedIn ? "Open app" : "Sign in";

  return (
    <div style={styles.appShell}>
      <FontImport />
      <header style={styles.topBar}>
        <div style={styles.brand}>
          <Crown size={18} color="#E8DCC0" />
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 20 }}>{APP_NAME}</span>
        </div>
        <div style={styles.topBarSpacer} />
        {GITHUB_URL && (
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={styles.navLink}>
            <Github size={15} /> Source
          </a>
        )}
        <Link to={ctaTo} style={{ ...styles.primaryBtn, marginLeft: 8 }}>{ctaLabel}</Link>
      </header>

      <main style={{ flex: 1, overflowY: "auto" }}>
        <div className="fade-in" style={styles.landingWrap}>
          <div style={styles.landingHero}>
            <h1 style={styles.landingTitle}>{APP_NAME}</h1>
            <p style={styles.landingSub}>{APP_TAGLINE} — flashcards built for tactics, openings, and endgames, backed by a spaced-repetition scheduler.</p>
            <Link to={ctaTo} style={{ ...styles.primaryBtn, fontSize: 15, padding: "10px 20px" }}>
              {loggedIn ? "Open the app" : "Sign in to start"}
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0 8px" }}>
            <ChessBoard fen="r1bqk2r/ppp2ppp/2n2n2/2bpp3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 1" maxWidth={320} />
          </div>

          <div style={styles.featureGrid}>
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-lift" style={styles.featureCard}>
                <Icon size={18} color="#E8DCC0" />
                <h2 style={{ ...styles.h2, marginTop: 10 }}>{title}</h2>
                <p style={styles.muted}>{body}</p>
              </div>
            ))}
          </div>

          <footer style={styles.footer}>
            {GITHUB_URL ? (
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ color: "#9C9587" }}>
                View source on GitHub
              </a>
            ) : (
              <span>{APP_NAME}</span>
            )}
          </footer>
        </div>
      </main>
    </div>
  );
}
