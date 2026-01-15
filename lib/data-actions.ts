'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// --- Experience Actions ---

export async function createExperience(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const description = formData.get('description') as string
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string
    const is_current = formData.get('is_current') === 'on'

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('experiences').insert({
        user_id: user.id,
        title,
        company,
        description,
        start_date,
        end_date: end_date || null,
        is_current,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/experiences')
    revalidatePath('/') // Update landing page too
    return { success: true }
}

export async function deleteExperience(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('experiences').delete().eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/experiences')
    revalidatePath('/')
    return { success: true }
}

// --- Certificate Actions ---

export async function createCertificate(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const issuer = formData.get('issuer') as string
    const issued_date = formData.get('issued_date') as string
    const credential_url = formData.get('credential_url') as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('certificates').insert({
        user_id: user.id,
        title,
        issuer,
        issued_date,
        credential_url: credential_url || null,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/certificates')
    revalidatePath('/')
    return { success: true }
}

export async function deleteCertificate(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('certificates').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/certificates')
    revalidatePath('/')
    return { success: true }
}

// --- Skill Actions ---

export async function createSkill(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const proficiency_level = formData.get('proficiency_level') as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('skills').insert({
        user_id: user.id,
        name,
        category,
        proficiency_level,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/skills')
    revalidatePath('/')
    return { success: true }
}

export async function deleteSkill(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/skills')
    revalidatePath('/')
    return { success: true }
}
