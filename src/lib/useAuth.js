/**
 * useAuth.js — minimal auth hook
 * --------------------------------
 * Strategy:
 *   1. If Supabase is configured: use it
 *   2. On mount: check for existing session
 *   3. If none: sign in anonymously (zero friction for solo use)
 *   4. Magic-link upgrade is available via signInWithEmail() if user wants
 *      to access from another device
 *
 * If Supabase is NOT configured, returns a fake "local" user so the rest of
 * the app works against localStorage.
 */

import { useEffect, useState } from 'react';
import { supabase, isCloudEnabled } from './supabase.js';

const LOCAL_USER = { id: 'local', email: 'local@device', isLocal: true };

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isCloudEnabled) {
      setUser(LOCAL_USER);
      setLoading(false);
      return;
    }

    let mounted = true;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        if (mounted) {
          setUser(session.user);
          setLoading(false);
        }
        return;
      }

      // No session — sign in anonymously so storage works immediately
      const { data, error } = await supabase.auth.signInAnonymously();
      if (mounted) {
        if (error) {
          console.error('[auth] anonymous sign-in failed', error);
          setUser(LOCAL_USER); // graceful degradation
        } else {
          setUser(data.user);
        }
        setLoading(false);
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user || LOCAL_USER);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  /** Upgrade an anonymous session to a real account via magic link */
  const signInWithEmail = async (email) => {
    if (!isCloudEnabled) return { error: new Error('Cloud not configured') };
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    if (!isCloudEnabled) return;
    await supabase.auth.signOut();
  };

  return { user, loading, signInWithEmail, signOut };
}
