import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const localOnly = import.meta.env.VITE_LOCAL_ONLY === 'true';

export const isCloudEnabled = !localOnly && url && anonKey && !url.includes('your-project');

export const supabase = isCloudEnabled
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
