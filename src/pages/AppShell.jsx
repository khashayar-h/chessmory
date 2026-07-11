import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { styles } from "../styles";
import { useLocalStore } from "../lib/localStore";

export default function AppShell() {
  const store = useLocalStore();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener("change", update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", update) : mq.removeListener(update);
    };
  }, []);

  if (store.loading) {
    return (
      <div style={styles.appShell}>
        <div style={{ ...styles.center, height: "100%" }}>
          <Loader2 className="animate-spin" color="#9C9587" size={22} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appShell}>
      <TopBar isMobile={isMobile} onMenuClick={() => setSidebarOpen((o) => !o)} />
      <div style={styles.body}>
        <Sidebar
          decks={store.decks}
          dueCount={store.dueCount}
          onAddDeck={store.addDeck}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main style={{ ...styles.main, ...(isMobile ? styles.mainMobile : {}) }}>
          <Outlet context={{ store, isMobile }} />
        </main>
      </div>
    </div>
  );
}
