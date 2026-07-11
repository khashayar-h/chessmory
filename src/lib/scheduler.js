// ---------------------------------------------------------------------------
// Spaced-repetition scheduling (SM-2 derived, with short-term "Again" steps
// like Anki's learning queue instead of bumping straight to tomorrow).
// grade: 0 Again, 3 Hard, 4 Good, 5 Easy
// ---------------------------------------------------------------------------
const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function computeNext(card, grade) {
  let { repetition = 0, easeFactor = 2.5, interval = 0 } = card;
  let dueMs;

  if (grade === 0) {
    repetition = 0;
    interval = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    dueMs = 45 * 1000; // resurface in under a minute
  } else {
    repetition = repetition + 1;
    if (grade === 3) easeFactor = Math.max(1.3, easeFactor - 0.15);
    else if (grade === 5) easeFactor = easeFactor + 0.15;

    if (repetition === 1) {
      interval = grade === 3 ? 1 : grade === 5 ? 2 : 1;
    } else if (repetition === 2) {
      interval = grade === 3 ? 3 : grade === 5 ? 8 : 6;
    } else {
      const mult = grade === 3 ? Math.max(1.2, easeFactor - 0.3)
        : grade === 5 ? easeFactor * 1.3
        : easeFactor;
      interval = Math.max(1, Math.round(interval * mult));
    }
    dueMs = interval * DAY;
  }

  return { repetition, easeFactor, interval, dueMs, lastGrade: grade };
}

export function schedule(card, grade) {
  const { repetition, easeFactor, interval, dueMs, lastGrade } = computeNext(card, grade);
  const dueDate = new Date(Date.now() + dueMs).toISOString();
  return { ...card, repetition, easeFactor, interval, dueDate, lastGrade };
}

export function previewInterval(card, grade) {
  return computeNext(card, grade).dueMs;
}

export function formatInterval(ms) {
  if (ms < MIN) return "<1min";
  if (ms < HOUR) return `${Math.round(ms / MIN)}min`;
  if (ms < DAY) return `${Math.round(ms / HOUR)}h`;
  const days = Math.round(ms / DAY);
  if (days < 30) return `${days}d`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo`;
  return `${(days / 365).toFixed(1)}y`;
}

export const GRADE_LABELS = { 0: "Again", 3: "Hard", 4: "Good", 5: "Easy" };
