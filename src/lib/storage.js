/**
 * storage.js — unified storage layer
 * ------------------------------------
 * Provides one API for progress persistence regardless of backend:
 *   - If Supabase is configured + user is signed in: writes to `progress` table
 *   - Otherwise: falls back to localStorage (offline / pre-auth use)
 *
 * Shape of progress in memory (and on the wire):
 *   {
 *     [game_id]: { completed, notes, rating, time_played_sec }
 *   }
 *
 * Export a single `createStorage(userId)` factory that returns:
 *   - load()                   -> Promise<progress map>
 *   - upsert(gameId, patch)    -> Promise<void>
 */

import { supabase, isCloudEnabled } from './supabase.js';

const LS_KEY = 'staycation:progress:v1';

// ---------- localStorage backend ----------
const localBackend = {
  async load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },
  async upsert(gameId, patch, current) {
    const next = {
      ...current,
      [gameId]: { ...(current[gameId] || {}), ...patch },
    };
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    return next;
  },
};

// ---------- Supabase backend ----------
const cloudBackend = (userId) => ({
  async load() {
    const { data, error } = await supabase
      .from('progress')
      .select('game_id, completed, notes, rating, time_played_sec')
      .eq('user_id', userId);

    if (error) {
      console.error('[storage] load failed', error);
      return {};
    }

    const map = {};
    for (const row of data) {
      map[row.game_id] = {
        completed: row.completed,
        notes: row.notes || '',
        rating: row.rating || 0,
        time_played_sec: row.time_played_sec || 0,
      };
    }
    return map;
  },

  async upsert(gameId, patch, current) {
    const merged = { ...(current[gameId] || {}), ...patch };

    const { error } = await supabase
      .from('progress')
      .upsert(
        {
          user_id: userId,
          game_id: gameId,
          completed: merged.completed ?? false,
          notes: merged.notes ?? '',
          rating: merged.rating ?? 0,
          time_played_sec: merged.time_played_sec ?? 0,
        },
        { onConflict: 'user_id,game_id' }
      );

    if (error) {
      console.error('[storage] upsert failed', error);
      // Fall back: still update local copy so UI doesn't lie
    }

    return { ...current, [gameId]: merged };
  },
});

// ---------- Factory ----------
export function createStorage(userId) {
  if (isCloudEnabled && userId) return cloudBackend(userId);
  return localBackend;
}

export { isCloudEnabled };
