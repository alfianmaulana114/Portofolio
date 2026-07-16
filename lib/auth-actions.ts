'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Security: Validate email format
const LoginSchema = z.object({
    email: z.string().email('Invalid email format').max(255),
    password: z.string().min(1, 'Password is required').max(500),
})

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Security: Validate input
    const validation = LoginSchema.safeParse({ email, password })
    if (!validation.success) {
        return { error: 'Invalid input data' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: validation.data.email,
        password: validation.data.password,
    })

    if (error) {
        // Security: Don't expose detailed error messages to prevent user enumeration
        return { error: 'Invalid email or password' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Logout error:', error)
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}
