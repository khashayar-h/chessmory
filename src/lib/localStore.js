import { useEffect, useState } from "react";
import { schedule } from "./scheduler";

const STORAGE_KEY = "chessmory-data";

export const uid = () => Math.random().toString(36).slice(2, 10);
export const now = () => new Date().toISOString();
export const makeShareSlug = () => Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 6);

async function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // no data yet, or storage unavailable
  }
  return { decks: [], cards: [] };
}

async function persistData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed", e);
  }
}

// Local-only persistence, keyed to this browser. This is the offline
// fallback used until the Supabase-backed store (real accounts + real
// cross-device sharing) is wired in; the shape mirrors what that store
// will expose so pages don't need to change when it lands.
export function useLocalStore() {
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadData().then((d) => {
      setDecks(d.decks || []);
      setCards(d.cards || []);
      setLoading(false);
    });
  }, []);

  async function commit(nextDecks, nextCards) {
    setDecks(nextDecks);
    setCards(nextCards);
    await persistData({ decks: nextDecks, cards: nextCards });
  }

  function dueCount(deckId) {
    const t = Date.now();
    return cards.filter((c) => c.deckId === deckId && new Date(c.dueDate).getTime() <= t).length;
  }
  function totalCount(deckId) {
    return cards.filter((c) => c.deckId === deckId).length;
  }

  function addDeck(name) {
    const deck = { id: uid(), name, createdAt: now(), isPublic: false, shareSlug: makeShareSlug() };
    commit([...decks, deck], cards);
    return deck;
  }

  function deleteDeck(deckId) {
    commit(decks.filter((d) => d.id !== deckId), cards.filter((c) => c.deckId !== deckId));
  }

  function setDeckPublic(deckId, isPublic) {
    commit(decks.map((d) => (d.id === deckId ? { ...d, isPublic } : d)), cards);
  }

  function addCard(card) {
    const full = {
      id: uid(),
      repetition: 0,
      easeFactor: 2.5,
      interval: 0,
      dueDate: now(),
      lastGrade: null,
      createdAt: now(),
      ...card,
    };
    commit(decks, [...cards, full]);
  }

  function updateCard(cardId, patch) {
    commit(decks, cards.map((c) => (c.id === cardId ? { ...c, ...patch } : c)));
  }

  function deleteCard(cardId) {
    commit(decks, cards.filter((c) => c.id !== cardId));
  }

  function gradeCard(cardId, grade) {
    commit(decks, cards.map((c) => (c.id === cardId ? schedule(c, grade) : c)));
  }

  return {
    loading, decks, cards,
    dueCount, totalCount,
    addDeck, deleteDeck, setDeckPublic,
    addCard, updateCard, deleteCard, gradeCard,
  };
}
