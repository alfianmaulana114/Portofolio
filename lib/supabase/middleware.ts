import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Security: Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing Supabase environment variables')
        return NextResponse.next()
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid calling getUser() on static assets or certain paths to prevent performance hits
    // However, our matcher already handles this.

    // Check auth status
    const { data: { user } } = await supabase.auth.getUser()

    const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard')
    const isLoginPath = request.nextUrl.pathname === '/loginalfian'

    if (isDashboardPath && !user) {
        return NextResponse.redirect(new URL('/loginalfian', request.url))
    }

    if (isLoginPath && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}
