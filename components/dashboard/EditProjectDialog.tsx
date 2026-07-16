'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProject } from '@/lib/data-actions'
import { Pencil, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Project } from '@/lib/types'

export function EditProjectDialog({ project }: { project: Project }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await updateProject(project.id, formData)
        setLoading(false)
        if (result.success) {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-500 rounded-none transition-all h-8 w-8">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Edit Proyek</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Update detail proyek yang pernah Anda kerjakan.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-project-title" className="font-bold uppercase text-xs">Judul Proyek</Label>
                        <Input id="edit-project-title" name="title" defaultValue={project.title} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-project-role" className="font-bold uppercase text-xs">Role / Peran (Sebagai Apa)</Label>
                        <Input id="edit-project-role" name="role" defaultValue={project.role || ''} placeholder="Contoh: Lead Developer, UI Designer" className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-project-url" className="font-bold uppercase text-xs flex items-center gap-2">
                            <LinkIcon className="h-3 w-3" /> Link Proyek (Opsional)
                        </Label>
                        <Input id="edit-project-url" name="project_url" defaultValue={project.project_url || ''} placeholder="https://..." className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-project-description" className="font-bold uppercase text-xs">Deskripsi</Label>
                        <Textarea id="edit-project-description" name="description" defaultValue={project.description || ''} className="border-2 border-black rounded-none min-h-[100px]" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-project-image" className="font-bold uppercase text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Foto Proyek (Opsional)
                        </Label>
                        <Input id="edit-project-image" name="image" type="file" accept="image/*" className="border-2 border-black rounded-none cursor-pointer file:bg-black file:text-white file:border-none file:mr-4 file:px-4 file:font-bold" />
                        {project.image_url && (
                            <p className="text-[10px] font-bold text-gray-500">Sudah ada foto. Upload untuk mengganti.</p>
                        )}
                    </div>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" disabled={loading}>
                        {loading ? 'MENYIMPAN...' : 'UPDATE PROYEK'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
