import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { styles } from "../styles";
import { useAuth } from "../lib/useAuth";
import { supabaseEnabled } from "../lib/supabaseClient";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (!supabaseEnabled) return children;

  if (loading) {
    return (
      <div style={styles.appShell}>
        <div style={{ ...styles.center, height: "100%" }}>
          <Loader2 className="animate-spin" color="#9C9587" size={22} />
        </div>
      </div>
    );
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return children;
}
