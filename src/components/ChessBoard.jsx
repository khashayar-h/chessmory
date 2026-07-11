import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

export const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function isValidFEN(fen) {
  const placement = (fen || "").trim().split(/\s+/)[0] || "";
  const rows = placement.split("/");
  if (rows.length !== 8) return false;
  return rows.every((row) => {
    let squares = 0;
    for (const ch of row) {
      if (/[1-8]/.test(ch)) squares += Number(ch);
      else if (/[prnbqkPRNBQK]/.test(ch)) squares += 1;
      else return false;
    }
    return squares === 8;
  });
}

// react-chessboard needs an explicit pixel width, so we measure the
// container and keep the board perfectly square at any screen size.
function useContainerWidth(maxWidth) {
  const ref = useRef(null);
  const [width, setWidth] = useState(maxWidth);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.min(maxWidth, el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxWidth]);

  return [ref, width];
}

export default function ChessBoard({ fen, flipped, maxWidth = 360 }) {
  const [containerRef, width] = useContainerWidth(maxWidth);
  const valid = isValidFEN(fen);

  if (!valid) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100%", maxWidth, aspectRatio: "1/1", background: "#2A2A30",
          border: "1px solid rgba(237,230,214,0.15)", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#C77B63", fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12, textAlign: "center", padding: 16,
        }}
      >
        Invalid FEN
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth }}>
      <Chessboard
        position={fen.trim()}
        boardWidth={width}
        boardOrientation={flipped ? "black" : "white"}
        arePiecesDraggable={false}
        showBoardNotation
        customBoardStyle={{
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#6B4226" }}
        customLightSquareStyle={{ backgroundColor: "#E8DCC0" }}
        customNotationStyle={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9C9587" }}
        animationDuration={0}
      />
    </div>
  );
}
