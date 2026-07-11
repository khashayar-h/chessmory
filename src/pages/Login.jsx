import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Crown, Loader2 } from "lucide-react";
import FontImport from "../components/FontImport";
import { styles } from "../styles";
import { APP_NAME } from "../lib/brand";
import { useAuth } from "../lib/useAuth";

export default function Login() {
  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/app";

  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmNotice, setConfirmNotice] = useState(false);

  if (!loading && user) {
    return <Navigate to={next} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { session } = await signUp(email.trim(), password);
        if (!session) {
          setConfirmNotice(true);
        } else {
          navigate(next, { replace: true });
        }
      } else {
        await signIn(email.trim(), password);
        navigate(next, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.appShell}>
      <FontImport />
      <header style={styles.topBar}>
        <Link to="/" style={styles.brand}>
          <Crown size={18} color="#E8DCC0" />
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: 20 }}>{APP_NAME}</span>
        </Link>
      </header>
      <main style={{ flex: 1, overflowY: "auto" }}>
        <div style={styles.authWrap}>
          <div className="fade-in" style={styles.authCard}>
            <h1 style={styles.h1}>{mode === "signin" ? "Sign in" : "Create an account"}</h1>
            <p style={styles.muted}>
              {mode === "signin" ? "Log in to see your own decks." : "So you can log in from any device and see your decks."}
            </p>

            {confirmNotice ? (
              <p style={{ ...styles.muted, marginTop: 16 }}>
                Check your email to confirm your account, then sign in.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  autoComplete="email"
                />
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
                {error && <p style={styles.errorText}>{error}</p>}
                <button
                  className="btn-anim"
                  type="submit"
                  disabled={submitting}
                  style={{ ...styles.primaryBtn, width: "100%", justifyContent: "center", marginTop: 18, opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? <Loader2 className="animate-spin" size={15} /> : mode === "signin" ? "Sign in" : "Sign up"}
                </button>
              </form>
            )}

            <button
              className="btn-anim"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setConfirmNotice(false); }}
              style={{ ...styles.navLink, marginTop: 16, padding: 0 }}
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
