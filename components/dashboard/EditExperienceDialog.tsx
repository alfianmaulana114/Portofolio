'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateExperience } from '@/lib/data-actions'
import { Pencil, Image as ImageIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Experience } from '@/lib/types'

export function EditExperienceDialog({ experience }: { experience: Experience }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await updateExperience(experience.id, formData)
        setLoading(false)
        if (result.success) {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Edit Pengalaman</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Update detail pengalaman profesional Anda.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-category" className="font-bold uppercase text-xs">Kategori</Label>
                        <Select name="category" defaultValue={experience.category} required>
                            <SelectTrigger className="border-2 border-black rounded-none">
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Magang">Pengalaman Magang</SelectItem>
                                <SelectItem value="Organisasi">Pengalaman Organisasi</SelectItem>
                                <SelectItem value="Kerja">Pengalaman Kerja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-title" className="font-bold uppercase text-xs">Jabatan / Role</Label>
                        <Input id="edit-title" name="title" defaultValue={experience.title} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-company" className="font-bold uppercase text-xs">Perusahaan / Organisasi</Label>
                        <Input id="edit-company" name="company" defaultValue={experience.company} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-start_date" className="font-bold uppercase text-xs">Tanggal Mulai</Label>
                            <Input
                                id="edit-start_date"
                                name="start_date"
                                type="date"
                                defaultValue={experience.start_date}
                                required
                                className="border-2 border-black rounded-none"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-end_date" className="font-bold uppercase text-xs">Tanggal Selesai</Label>
                            <Input
                                id="edit-end_date"
                                name="end_date"
                                type="date"
                                defaultValue={experience.end_date || ''}
                                className="border-2 border-black rounded-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="edit-is_current"
                            name="is_current"
                            defaultChecked={experience.is_current}
                        />
                        <Label htmlFor="edit-is_current" className="font-bold">Masih Bekerja Di Sini</Label>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-description" className="font-bold uppercase text-xs">Deskripsi</Label>
                        <Textarea
                            id="edit-description"
                            name="description"
                            defaultValue={experience.description || ''}
                            className="border-2 border-black rounded-none min-h-[100px]"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-image" className="font-bold uppercase text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Foto Pengalaman (Opsional)
                        </Label>
                        <Input
                            id="edit-image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="border-2 border-black rounded-none cursor-pointer file:bg-black file:text-white file:border-none file:mr-4 file:px-4 file:font-bold"
                        />
                        {experience.image_url && (
                            <p className="text-xs font-bold text-gray-500">Sudah ada foto. Upload untuk mengganti.</p>
                        )}
                    </div>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" disabled={loading}>
                        {loading ? 'MENYIMPAN...' : 'UPDATE PENGALAMAN'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
