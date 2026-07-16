import { supabase } from './supabase' 

export async function signOut() { 
  return await supabase.auth.signOut() 
} 
