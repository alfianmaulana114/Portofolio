import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Security: Validate redirect URL to prevent open redirect attacks
function validateRedirectUrl(url: string, origin: string): string {
    try {
        const redirectUrl = new URL(url, origin)
        // Only allow redirects to same origin
        if (redirectUrl.origin !== new URL(origin).origin) {
            return '/dashboard'
        }
        // Only allow relative paths, not external URLs
        if (!redirectUrl.pathname.startsWith('/')) {
            return '/dashboard'
        }
        return redirectUrl.pathname
    } catch {
        return '/dashboard'
    }
}

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const nextParam = searchParams.get('next') ?? '/dashboard'
    
    // Security: Validate and sanitize redirect URL
    const next = validateRedirectUrl(nextParam, origin)

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                // Security: Validate forwarded host to prevent host header injection
                const allowedHosts = process.env.ALLOWED_HOSTS?.split(',') || []
                const isValidHost = allowedHosts.length === 0 || allowedHosts.includes(forwardedHost)
                if (isValidHost) {
                    return NextResponse.redirect(`https://${forwardedHost}${next}`)
                }
            }
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
