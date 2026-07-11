import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { schedule } from "./scheduler";
import { makeShareSlug } from "./localStore";

function rowToDeck(row) {
  return {
    id: row.id,
    name: row.name,
    isPublic: row.is_public,
    shareSlug: row.share_slug,
    createdAt: row.created_at,
  };
}

function rowToCard(row) {
  return {
    id: row.id,
    deckId: row.deck_id,
    type: row.type,
    front: row.front,
    back: row.back,
    fen: row.fen,
    repetition: row.repetition,
    easeFactor: row.ease_factor,
    interval: row.interval,
    dueDate: row.due_date,
    lastGrade: row.last_grade,
    createdAt: row.created_at,
  };
}

// Supabase-backed store — same external shape as useLocalStore, so pages
// don't need to know which backend is active.
export function useSupabaseStore(userId) {
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  const reload = useCallback(async () => {
    if (!userId) {
      setDecks([]);
      setCards([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data: deckRows, error: deckErr } = await supabase
      .from("decks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (deckErr) {
      console.error("Failed to load decks", deckErr);
      setLoading(false);
      return;
    }
    const deckIds = deckRows.map((d) => d.id);
    let cardRows = [];
    if (deckIds.length > 0) {
      const { data, error: cardErr } = await supabase
        .from("cards")
        .select("*")
        .in("deck_id", deckIds);
      if (cardErr) console.error("Failed to load cards", cardErr);
      else cardRows = data;
    }
    setDecks(deckRows.map(rowToDeck));
    setCards(cardRows.map(rowToCard));
    setLoading(false);
  }, [userId]);

  useEffect(() => { reload(); }, [reload]);

  function dueCount(deckId) {
    const t = Date.now();
    return cards.filter((c) => c.deckId === deckId && new Date(c.dueDate).getTime() <= t).length;
  }
  function totalCount(deckId) {
    return cards.filter((c) => c.deckId === deckId).length;
  }

  async function addDeck(name) {
    const { data, error } = await supabase
      .from("decks")
      .insert({ user_id: userId, name, is_public: false, share_slug: makeShareSlug() })
      .select()
      .single();
    if (error) { console.error("Failed to create deck", error); return null; }
    const deck = rowToDeck(data);
    setDecks((d) => [...d, deck]);
    return deck;
  }

  async function deleteDeck(deckId) {
    setDecks((d) => d.filter((x) => x.id !== deckId));
    setCards((c) => c.filter((x) => x.deckId !== deckId));
    const { error } = await supabase.from("decks").delete().eq("id", deckId);
    if (error) console.error("Failed to delete deck", error);
  }

  async function setDeckPublic(deckId, isPublic) {
    setDecks((d) => d.map((x) => (x.id === deckId ? { ...x, isPublic } : x)));
    const { error } = await supabase.from("decks").update({ is_public: isPublic }).eq("id", deckId);
    if (error) console.error("Failed to update deck visibility", error);
  }

  async function addCard(card) {
    const row = {
      deck_id: card.deckId,
      type: card.type,
      front: card.front ?? null,
      back: card.back ?? null,
      fen: card.fen ?? null,
    };
    const { data, error } = await supabase.from("cards").insert(row).select().single();
    if (error) { console.error("Failed to create card", error); return null; }
    const newCard = rowToCard(data);
    setCards((c) => [...c, newCard]);
    return newCard;
  }

  async function updateCard(cardId, patch) {
    setCards((c) => c.map((x) => (x.id === cardId ? { ...x, ...patch } : x)));
    const row = {};
    if ("front" in patch) row.front = patch.front;
    if ("back" in patch) row.back = patch.back;
    if ("fen" in patch) row.fen = patch.fen;
    const { error } = await supabase.from("cards").update(row).eq("id", cardId);
    if (error) console.error("Failed to update card", error);
  }

  async function deleteCard(cardId) {
    setCards((c) => c.filter((x) => x.id !== cardId));
    const { error } = await supabase.from("cards").delete().eq("id", cardId);
    if (error) console.error("Failed to delete card", error);
  }

  async function gradeCard(cardId, grade) {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const updated = schedule(card, grade);
    setCards((c) => c.map((x) => (x.id === cardId ? updated : x)));
    const { error } = await supabase
      .from("cards")
      .update({
        repetition: updated.repetition,
        ease_factor: updated.easeFactor,
        interval: updated.interval,
        due_date: updated.dueDate,
        last_grade: updated.lastGrade,
      })
      .eq("id", cardId);
    if (error) console.error("Failed to grade card", error);
  }

  return {
    loading, decks, cards,
    dueCount, totalCount,
    addDeck, deleteDeck, setDeckPublic,
    addCard, updateCard, deleteCard, gradeCard,
  };
}

// Public, read-only lookup for /shared/:slug — works for anyone, signed in
// or not, via the "public read" RLS policy (no user_id filter here).
export function useSharedDeck(slug) {
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      const { data: deckRow } = await supabase
        .from("decks")
        .select("*")
        .eq("share_slug", slug)
        .eq("is_public", true)
        .maybeSingle();
      if (cancelled) return;
      if (!deckRow) {
        setDeck(null);
        setCards([]);
        setLoading(false);
        return;
      }
      const { data: cardRows } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckRow.id);
      if (cancelled) return;
      setDeck(rowToDeck(deckRow));
      setCards((cardRows || []).map(rowToCard));
      setLoading(false);
    }
    run();
    return () => { cancelled = true; };
  }, [slug]);

  return { loading, deck, cards };
}
