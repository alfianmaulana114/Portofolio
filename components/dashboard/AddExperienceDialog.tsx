'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createExperience } from '@/lib/data-actions'
import { Plus, Image as ImageIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function AddExperienceDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await createExperience(formData)
        setLoading(false)
        if (result.success) {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-14 px-8 font-black text-lg uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                    <Plus className="mr-2 h-6 w-6 stroke-[3px]" /> TAMBAH BARU
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <DialogHeader>
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Tambah Pengalaman</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Masukkan detail pengalaman baru Anda di bawah ini.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category" className="font-bold uppercase text-xs">Kategori</Label>
                        <Select name="category" required>
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
                        <Label htmlFor="title" className="font-bold uppercase text-xs">Jabatan / Role</Label>
                        <Input id="title" name="title" required placeholder="Contoh: Frontend Developer" className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="company" className="font-bold uppercase text-xs">Perusahaan / Organisasi</Label>
                        <Input id="company" name="company" required placeholder="Contoh: PT. Teknologi Maju" className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start_date" className="font-bold uppercase text-xs">Tanggal Mulai</Label>
                            <Input id="start_date" name="start_date" type="date" required className="border-2 border-black rounded-none" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end_date" className="font-bold uppercase text-xs">Tanggal Selesai</Label>
                            <Input id="end_date" name="end_date" type="date" className="border-2 border-black rounded-none" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="is_current" name="is_current" />
                        <Label htmlFor="is_current" className="font-bold">Masih Bekerja Di Sini</Label>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="font-bold uppercase text-xs">Deskripsi</Label>
                        <Textarea id="description" name="description" placeholder="Ceritakan apa saja yang Anda lakukan..." className="border-2 border-black rounded-none min-h-[100px]" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image" className="font-bold uppercase text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Foto Pengalaman (Opsional)
                        </Label>
                        <Input id="image" name="image" type="file" accept="image/*" className="border-2 border-black rounded-none cursor-pointer file:bg-black file:text-white file:border-none file:mr-4 file:px-4 file:font-bold" />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        {loading ? 'MENYIMPAN...' : 'SIMPAN PENGALAMAN'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
