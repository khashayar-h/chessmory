export default function FontImport() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      html, body, #root { height: 100%; }
      body { margin: 0; }

      .btn-anim { transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease; }
      .btn-anim:hover { filter: brightness(1.12); transform: translateY(-1px); }
      .btn-anim:active { transform: translateY(0) scale(0.95); filter: brightness(0.97); }

      .card-lift { transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease; }
      .card-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.35); border-color: rgba(237,230,214,0.18); }

      .deck-row-anim { transition: background 0.15s ease, transform 0.1s ease; }
      .deck-row-anim:active { transform: scale(0.98); }

      .fade-in { animation: fadeIn 0.28s ease both; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

      .backdrop-fade { animation: backdropFade 0.2s ease both; }
      @keyframes backdropFade { from { opacity: 0; } to { opacity: 1; } }

      .pop-in { animation: popIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

      .confirm-shake { animation: shake 0.32s ease both; }
      @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-3px); }
        40%, 60% { transform: translateX(3px); }
      }

      .flip-stage { perspective: 1400px; }
      .flip-spin { animation: flipCard 0.42s cubic-bezier(0.4, 0.1, 0.2, 1) both; }
      @keyframes flipCard {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(92deg); }
        100% { transform: rotateY(0deg); }
      }

      .due-pulse { animation: duePulse 2s ease-in-out infinite; }
      @keyframes duePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

      .grade-btn:hover { filter: brightness(1.15); transform: translateY(-2px); }
      .grade-btn:active { transform: translateY(0) scale(0.95); }

      .danger-btn:hover { color: #C77B63 !important; border-color: rgba(161,61,43,0.4) !important; background: rgba(161,61,43,0.12) !important; }

      textarea:focus, input:focus, select:focus { border-color: #3F6E52 !important; box-shadow: 0 0 0 3px rgba(63,110,82,0.25); }
    `}</style>
  );
}
