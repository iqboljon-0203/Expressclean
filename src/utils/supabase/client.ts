import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Missing credentials') }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => ({ select: () => Promise.resolve({ data: null, error: null }) })
    } as any;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
