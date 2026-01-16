import { createServerClient } from '@supabase/ssr' 
import { cookies } from 'next/headers' 
import { NextRequest, NextResponse } from 'next/server' 

export async function GET(request: NextRequest) { 
  const { searchParams } = new URL(request.url) 
  const code = searchParams.get('code') 

  if (code) { 
    const cookieStore = await cookies() 
    const supabase = createServerClient( 
      process.env.NEXT_PUBLIC_SUPABASE_URL!, 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
      { 
        cookies: { 
          getAll() { return cookieStore.getAll() }, 
          setAll(cookiesToSet) { 
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options) 
            ) 
          }, 
        }, 
      } 
    ) 
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    // Security: Handle errors properly
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }
  } else {
    // Security: No code provided, redirect to error page
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }

  return NextResponse.redirect(new URL('/dashboard', request.url)) 
} 
