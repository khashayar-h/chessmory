// ---------------------------------------------------------------------------
// Style tokens: ink #1B1B1F, panel #242429, paper #EDE6D6, walnut #6B4226,
// bone #E8DCC0, felt #3F6E52, brick #A13D2B, teal #2E6E76, gold #8A6A2E
// ---------------------------------------------------------------------------
export const styles = {
  appShell: {
    height: "100dvh", display: "flex", flexDirection: "column",
    background: "#1B1B1F", color: "#EDE6D6",
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  center: { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" },
  topBar: {
    display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
    borderBottom: "1px solid rgba(237,230,214,0.1)", flexShrink: 0,
    paddingTop: "max(14px, env(safe-area-inset-top))",
  },
  brand: {
    display: "flex", alignItems: "center", gap: 8, background: "none", border: "none",
    color: "#EDE6D6", cursor: "pointer", padding: 0, textDecoration: "none",
  },
  brandTag: { fontSize: 12, color: "#6E6A5F", fontStyle: "italic", fontFamily: "'Newsreader', serif" },
  menuBtn: {
    background: "none", border: "none", cursor: "pointer", padding: 6,
    display: "flex", alignItems: "center", flexShrink: 0,
  },
  topBarSpacer: { flex: 1 },
  navLink: {
    display: "inline-flex", alignItems: "center", gap: 6, background: "transparent",
    color: "#9C9587", border: "none", cursor: "pointer", fontSize: 13,
    fontFamily: "inherit", padding: "6px 8px", borderRadius: 6, textDecoration: "none",
  },
  body: { display: "flex", flex: 1, minHeight: 0, position: "relative" },
  sidebar: {
    width: 220, flexShrink: 0, borderRight: "1px solid rgba(237,230,214,0.1)",
    padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto",
    background: "#1B1B1F",
  },
  sidebarDrawer: {
    position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, width: "78%",
    maxWidth: 280, boxShadow: "6px 0 24px rgba(0,0,0,0.4)",
    transition: "transform 0.22s ease", borderRight: "1px solid rgba(237,230,214,0.15)",
    paddingTop: "max(16px, env(safe-area-inset-top))",
  },
  closeDrawerBtn: {
    background: "none", border: "none", color: "#9C9587", cursor: "pointer", padding: 4,
    display: "flex", alignItems: "center",
  },
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40,
  },
  sidebarLabel: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#6E6A5F" },
  deckRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 10px", borderRadius: 6, border: "1px solid transparent",
    background: "transparent", color: "#EDE6D6", cursor: "pointer",
    fontFamily: "inherit", fontSize: 14, textAlign: "left",
  },
  dueBadge: {
    background: "#A13D2B", color: "#F7F3EA", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
    borderRadius: 10, padding: "1px 7px", flexShrink: 0,
  },
  newDeckRow: { display: "flex", gap: 6, marginTop: "auto" },
  main: { flex: 1, padding: "28px 24px", overflowY: "auto", minWidth: 0 },
  mainMobile: { padding: "18px 14px", paddingBottom: "max(18px, env(safe-area-inset-bottom))" },
  h1: { fontFamily: "'Newsreader', serif", fontWeight: 500, fontSize: 26, margin: "0 0 4px" },
  h2: { fontFamily: "'Newsreader', serif", fontWeight: 500, fontSize: 19, margin: "0 0 10px" },
  muted: { color: "#9C9587", fontSize: 14, lineHeight: 1.6 },
  label: { display: "block", fontSize: 12, color: "#9C9587", margin: "14px 0 6px", letterSpacing: 0.3 },
  input: {
    width: "100%", boxSizing: "border-box", background: "#242429", color: "#EDE6D6",
    border: "1px solid rgba(237,230,214,0.15)", borderRadius: 6, padding: "9px 10px",
    fontFamily: "inherit", fontSize: 14, outline: "none",
  },
  textarea: {
    width: "100%", boxSizing: "border-box", background: "#242429", color: "#EDE6D6",
    border: "1px solid rgba(237,230,214,0.15)", borderRadius: 6, padding: "9px 10px",
    fontFamily: "inherit", fontSize: 14, outline: "none", resize: "vertical",
  },
  iconBtn: {
    background: "#3F6E52", color: "#F7F3EA", border: "none", borderRadius: 6,
    width: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
    flexShrink: 0,
  },
  ghostBtn: {
    display: "inline-flex", alignItems: "center", gap: 6, background: "transparent",
    color: "#EDE6D6", border: "1px solid rgba(237,230,214,0.2)", borderRadius: 6,
    padding: "7px 12px", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
    textDecoration: "none",
  },
  primaryBtn: {
    display: "inline-flex", alignItems: "center", gap: 6, background: "#3F6E52",
    color: "#F7F3EA", border: "none", borderRadius: 6, padding: "8px 14px",
    fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
    textDecoration: "none",
  },
  dangerIconBtn: {
    background: "transparent", color: "#6E6A5F", border: "1px solid transparent",
    borderRadius: 6, width: 32, height: 32, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", flexShrink: 0,
  },
  backLink: {
    display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none",
    color: "#9C9587", cursor: "pointer", fontSize: 13, padding: 0, marginBottom: 14, fontFamily: "inherit",
  },
  deckCard: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "#242429", border: "1px solid rgba(237,230,214,0.08)",
    borderRadius: 8, padding: "14px 16px", flexWrap: "wrap", gap: 10,
    position: "relative",
  },
  deckDeleteBtn: {
    position: "absolute", top: 10, right: 10,
    background: "transparent", border: "1px solid transparent", color: "#6E6A5F",
  },
  confirmBtn: {
    background: "#A13D2B", color: "#F7F3EA", border: "none", borderRadius: 6,
    padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit", letterSpacing: 0.3, whiteSpace: "nowrap",
  },
  toggleBtn: {
    flex: 1, padding: "8px 0", borderRadius: 6, borderWidth: 1, borderStyle: "solid",
    borderColor: "rgba(237,230,214,0.15)",
    background: "transparent", color: "#9C9587", cursor: "pointer", fontFamily: "inherit", fontSize: 13,
  },
  toggleBtnActive: { background: "rgba(63,110,82,0.2)", borderColor: "#3F6E52", color: "#EDE6D6" },
  browseRow: {
    display: "flex", gap: 10, alignItems: "flex-start", background: "#242429",
    border: "1px solid rgba(237,230,214,0.08)", borderRadius: 8, padding: "10px 12px",
  },
  browseDeleteBtn: { flexShrink: 0, marginTop: 2 },
  browseEditBtn: { flexShrink: 0, marginTop: 2 },
  reviewCard: {
    background: "#242429", border: "1px solid rgba(237,230,214,0.1)", borderRadius: 10,
    padding: 24, marginTop: 16, minHeight: 200, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
  },
  frontText: { fontFamily: "'Newsreader', serif", fontSize: 22, textAlign: "center", lineHeight: 1.5 },
  backText: { fontSize: 15, lineHeight: 1.7, color: "#E8DCC0", width: "100%" },
  gradeBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    border: "none", borderRadius: 6, padding: "9px 0", color: "#F7F3EA",
    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
  },
  gradeBtnInterval: { fontSize: 10, opacity: 0.85, fontFamily: "'IBM Plex Mono', monospace" },

  // Modal (edit card)
  modalBackdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 60,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
  },
  modalContent: {
    background: "#242429", border: "1px solid rgba(237,230,214,0.12)", borderRadius: 10,
    padding: 20, width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto",
  },

  // Sharing
  shareRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  switch: {
    position: "relative", width: 40, height: 22, borderRadius: 11, border: "none",
    cursor: "pointer", flexShrink: 0, transition: "background 0.15s ease",
  },
  switchKnob: {
    position: "absolute", top: 2, width: 18, height: 18, borderRadius: "50%",
    background: "#F7F3EA", transition: "left 0.15s ease",
  },
  shareLinkBox: {
    display: "flex", alignItems: "center", gap: 8, background: "#1B1B1F",
    border: "1px solid rgba(237,230,214,0.15)", borderRadius: 6, padding: "6px 8px",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C9587",
    flex: 1, minWidth: 0,
  },
  shareLinkText: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 },

  // Stats
  statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginTop: 16 },
  statTile: {
    background: "#242429", border: "1px solid rgba(237,230,214,0.08)", borderRadius: 8,
    padding: "14px 16px",
  },
  statTileValue: { fontFamily: "'Newsreader', serif", fontSize: 28 },
  statTileLabel: { fontSize: 12, color: "#9C9587", marginTop: 2 },

  // Auth
  authWrap: { maxWidth: 380, margin: "48px auto", padding: "0 16px" },
  authCard: {
    background: "#242429", border: "1px solid rgba(237,230,214,0.1)", borderRadius: 10,
    padding: 24,
  },
  errorText: { color: "#C77B63", fontSize: 13, marginTop: 8 },

  // Landing page
  landingWrap: { maxWidth: 880, margin: "0 auto", padding: "64px 20px 40px" },
  landingHero: { textAlign: "center", padding: "40px 0 20px" },
  landingTitle: { fontFamily: "'Newsreader', serif", fontWeight: 500, fontSize: "clamp(32px, 6vw, 52px)", margin: "0 0 14px" },
  landingSub: { color: "#9C9587", fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 28px" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 40 },
  featureCard: {
    background: "#242429", border: "1px solid rgba(237,230,214,0.08)", borderRadius: 10,
    padding: 20,
  },
  footer: {
    borderTop: "1px solid rgba(237,230,214,0.1)", marginTop: 56, padding: "20px 0",
    textAlign: "center", color: "#6E6A5F", fontSize: 13,
  },
};
