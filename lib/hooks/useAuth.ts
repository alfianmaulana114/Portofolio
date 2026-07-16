'use client' 

import { useEffect, useState } from 'react' 
import { supabase } from '@/lib/supabase' 
import type { AuthUser } from '@/lib/types' 

export function useAuth() { 
  const [user, setUser] = useState<AuthUser | null>(null) 
  const [loading, setLoading] = useState(true) 

  useEffect(() => { 
    supabase.auth.getSession().then(({ data: { session } }) => { 
      setUser(session?.user as AuthUser | null) 
      setLoading(false) 
    }) 

    const { data: { subscription } } = supabase.auth.onAuthStateChange( 
      (_event, session) => { 
        setUser(session?.user as AuthUser | null) 
      } 
    ) 

    return () => subscription?.unsubscribe() 
  }, []) 

  return { user, loading } 
} 
