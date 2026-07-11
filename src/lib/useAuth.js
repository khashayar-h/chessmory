import { useEffect, useState } from "react";
import { supabase, supabaseEnabled } from "./supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(supabaseEnabled);

  useEffect(() => {
    if (!supabaseEnabled) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signUp(email, password) {
    if (!supabaseEnabled) throw new Error("Accounts aren't configured for this deployment.");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    if (!supabaseEnabled) throw new Error("Accounts aren't configured for this deployment.");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    if (!supabaseEnabled) return;
    await supabase.auth.signOut();
  }

  return { user, loading, signUp, signIn, signOut };
}
