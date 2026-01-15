'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import sharp from 'sharp'

// Helper function to upload and compress images to WebP
async function uploadImage(file: File, bucket: string) {
    if (!file || file.size === 0) return null

    const supabase = await createClient()

    try {
        const buffer = Buffer.from(await file.arrayBuffer())

        // Kompres ke WebP menggunakan sharp
        const compressedBuffer = await sharp(buffer)
            .webp({ quality: 80 }) // Kualitas 80 sudah cukup bagus dan ringan
            .toBuffer()

        // Nama file selalu .webp
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.webp`
        const filePath = `${fileName}`

        const { error: uploadError, data: uploadData } = await supabase.storage
            .from(bucket)
            .upload(filePath, compressedBuffer, {
                contentType: 'image/webp',
                cacheControl: '3600',
                upsert: false
            })

        if (uploadError) {
            console.error('FULL UPLOAD ERROR:', JSON.stringify(uploadError, null, 2))
            return null
        }

        console.log('UPLOAD SUCCESSFUL:', uploadData)

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath)

        console.log('GENERATED PUBLIC URL:', publicUrl)
        return publicUrl
    } catch (error) {
        console.error('DETAILED IMAGE PROCESSING ERROR:', error)
        return null
    }
}

// --- Experience Actions ---

export async function createExperience(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string
    const is_current = formData.get('is_current') === 'on'
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('experiences').insert({
        user_id: user.id,
        title,
        company,
        description,
        category,
        image_url,
        start_date,
        end_date: end_date || null,
        is_current,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/experiences')
    revalidatePath('/')
    return { success: true }
}

export async function updateExperience(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const company = formData.get('company') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const start_date = formData.get('start_date') as string
    const end_date = formData.get('end_date') as string
    const is_current = formData.get('is_current') === 'on'
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const updateData: any = {
        title,
        company,
        description,
        category,
        start_date,
        end_date: end_date || null,
        is_current,
    }

    if (imageFile && imageFile.size > 0) {
        const image_url = await uploadImage(imageFile, 'portfolio-images')
        if (image_url) updateData.image_url = image_url
    }

    const { error } = await supabase
        .from('experiences')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/experiences')
    revalidatePath('/')
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
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('certificates').insert({
        user_id: user.id,
        title,
        issuer,
        issued_date,
        credential_url: credential_url || null,
        image_url,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/certificates')
    revalidatePath('/')
    return { success: true }
}

export async function updateCertificate(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const issuer = formData.get('issuer') as string
    const issued_date = formData.get('issued_date') as string
    const credential_url = formData.get('credential_url') as string
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const updateData: any = {
        title,
        issuer,
        issued_date,
        credential_url: credential_url || null,
    }

    if (imageFile && imageFile.size > 0) {
        const image_url = await uploadImage(imageFile, 'portfolio-images')
        if (image_url) updateData.image_url = image_url
    }

    const { error } = await supabase
        .from('certificates')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)

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

// --- Project Actions ---

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const role = formData.get('role') as string
    const project_url = formData.get('project_url') as string
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        title,
        description,
        role,
        project_url: project_url || null,
        image_url,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/projects')
    revalidatePath('/')
    return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const role = formData.get('role') as string
    const project_url = formData.get('project_url') as string
    const imageFile = formData.get('image') as File

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const updateData: any = {
        title,
        description,
        role,
        project_url: project_url || null,
    }

    if (imageFile && imageFile.size > 0) {
        const image_url = await uploadImage(imageFile, 'portfolio-images')
        if (image_url) updateData.image_url = image_url
    }

    const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/projects')
    revalidatePath('/')
    return { success: true }
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/dashboard/projects')
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

export async function updateSkill(id: string, formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const proficiency_level = formData.get('proficiency_level') as string

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('skills')
        .update({ name, category, proficiency_level })
        .eq('id', id)
        .eq('user_id', user.id)

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
