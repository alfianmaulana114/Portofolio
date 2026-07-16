'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateSkill } from '@/lib/data-actions'
import { Pencil } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skill } from '@/lib/types'

export function EditSkillDialog({ skill }: { skill: Skill }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await updateSkill(skill.id, formData)
        setLoading(false)
        if (result.success) {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-500 rounded-none transition-all">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Edit Keahlian</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Update tingkat kemahiran atau kategori skill Anda.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-skill-name" className="font-bold uppercase text-xs">Nama Skill</Label>
                        <Input id="edit-skill-name" name="name" defaultValue={skill.name} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-skill-category" className="font-bold uppercase text-xs">Kategori</Label>
                        <Select name="category" defaultValue={skill.category} required>
                            <SelectTrigger className="border-2 border-black rounded-none">
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Frontend">Frontend</SelectItem>
                                <SelectItem value="Backend">Backend</SelectItem>
                                <SelectItem value="Cloud">Cloud / DevOps</SelectItem>
                                <SelectItem value="Tools">Tools & Others</SelectItem>
                                <SelectItem value="Project Management">Project Management</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-proficiency" className="font-bold uppercase text-xs">Kemahiran</Label>
                        <Select name="proficiency_level" defaultValue={skill.proficiency_level || 'Intermediate'} required>
                            <SelectTrigger className="border-2 border-black rounded-none">
                                <SelectValue placeholder="Pilih Kemahiran" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" disabled={loading}>
                        {loading ? 'MENYIMPAN...' : 'UPDATE KEAHLIAN'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
