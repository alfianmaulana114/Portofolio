'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import sharp from 'sharp'
import { z } from 'zod'

// --- Security Schemas ---
const ExperienceSchema = z.object({
    title: z.string().min(1).max(200),
    company: z.string().min(1).max(200),
    description: z.string().max(2000),
    category: z.enum(['Magang', 'Organisasi', 'Kerja']),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
    is_current: z.boolean().default(false),
})

const CertificateSchema = z.object({
    title: z.string().min(1).max(200),
    issuer: z.string().min(1).max(200),
    issued_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    credential_url: z.string().url().optional().nullable().or(z.literal('')),
})

const ProjectSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000),
    role: z.string().max(200),
    project_url: z.string().url().optional().nullable().or(z.literal('')),
})

const SkillSchema = z.object({
    name: z.string().min(1).max(100),
    category: z.string().min(1).max(100),
    proficiency_level: z.string(),
})

// Security: Allowed image MIME types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Helper function to upload and compress images to WebP
async function uploadImage(file: File, bucket: string) {
    if (!file || file.size === 0) return null

    // Security: Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        console.error('Invalid file type:', file.type)
        return null
    }

    // Security: Validate file size
    if (file.size > MAX_FILE_SIZE) {
        console.error('File size exceeds limit:', file.size)
        return null
    }

    const supabase = await createClient()

    try {
        const buffer = Buffer.from(await file.arrayBuffer())

        // Security: Validate that buffer is actually an image by checking magic bytes
        const isValidImage = await sharp(buffer)
            .metadata()
            .then(() => true)
            .catch(() => false)

        if (!isValidImage) {
            console.error('Invalid image file')
            return null
        }

        // Kompres ke WebP menggunakan sharp
        const compressedBuffer = await sharp(buffer)
            .webp({ quality: 80 }) // Kualitas 80 sudah cukup bagus dan ringan
            .toBuffer()

        // Security: Generate secure random filename
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

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = ExperienceSchema.safeParse({
        title: formData.get('title'),
        company: formData.get('company'),
        description: formData.get('description'),
        category: formData.get('category'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date') || null,
        is_current: formData.get('is_current') === 'on',
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const imageFile = formData.get('image') as File
    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('experiences').insert({
        user_id: user.id,
        ...validation.data,
        image_url,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/experiences')
    revalidatePath('/')
    return { success: true }
}

export async function updateExperience(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = ExperienceSchema.safeParse({
        title: formData.get('title'),
        company: formData.get('company'),
        description: formData.get('description'),
        category: formData.get('category'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date') || null,
        is_current: formData.get('is_current') === 'on',
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const updateData: any = {
        ...validation.data
    }

    const imageFile = formData.get('image') as File
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
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/experiences')
    revalidatePath('/')
    return { success: true }
}

// --- Certificate Actions ---

export async function createCertificate(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = CertificateSchema.safeParse({
        title: formData.get('title'),
        issuer: formData.get('issuer'),
        issued_date: formData.get('issued_date'),
        credential_url: formData.get('credential_url') || null,
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const imageFile = formData.get('image') as File
    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('certificates').insert({
        user_id: user.id,
        ...validation.data,
        image_url,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/certificates')
    revalidatePath('/')
    return { success: true }
}

export async function updateCertificate(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = CertificateSchema.safeParse({
        title: formData.get('title'),
        issuer: formData.get('issuer'),
        issued_date: formData.get('issued_date'),
        credential_url: formData.get('credential_url') || null,
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const updateData: any = {
        ...validation.data
    }

    const imageFile = formData.get('image') as File
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
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/certificates')
    revalidatePath('/')
    return { success: true }
}

// --- Project Actions ---

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = ProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        role: formData.get('role'),
        project_url: formData.get('project_url') || null,
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const imageFile = formData.get('image') as File
    let image_url = null
    if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile, 'portfolio-images')
    }

    const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        ...validation.data,
        image_url,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/projects')
    revalidatePath('/')
    return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = ProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        role: formData.get('role'),
        project_url: formData.get('project_url') || null,
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const updateData: any = {
        ...validation.data
    }

    const imageFile = formData.get('image') as File
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
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/projects')
    revalidatePath('/')
    return { success: true }
}

// --- Skill Actions ---

export async function createSkill(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = SkillSchema.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        proficiency_level: formData.get('proficiency_level'),
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const { error } = await supabase.from('skills').insert({
        user_id: user.id,
        ...validation.data,
    })

    if (error) return { error: error.message }

    revalidatePath('/dashboard/skills')
    revalidatePath('/')
    return { success: true }
}

export async function updateSkill(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Validate using Zod
    const validation = SkillSchema.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        proficiency_level: formData.get('proficiency_level'),
    })

    if (!validation.success) {
        return { error: 'Invalid input data: ' + validation.error.message }
    }

    const { error } = await supabase
        .from('skills')
        .update(validation.data)
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/skills')
    revalidatePath('/')
    return { success: true }
}

export async function deleteSkill(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard/skills')
    revalidatePath('/')
    return { success: true }
}
