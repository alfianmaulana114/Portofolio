'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCertificate } from '@/lib/data-actions'
import { Plus, Image as ImageIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function AddCertificateDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await createCertificate(formData)
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
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Tambah Sertifikat</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Masukkan detail sertifikat baru Anda di bawah ini.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="font-bold uppercase text-xs">Nama Sertifikat</Label>
                        <Input id="title" name="title" required placeholder="Contoh: AWS Certified Solutions Architect" className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="issuer" className="font-bold uppercase text-xs">Penerbit / Institusi</Label>
                        <Input id="issuer" name="issuer" required placeholder="Contoh: Amazon Web Services" className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="issued_date" className="font-bold uppercase text-xs">Tanggal Terbit</Label>
                        <Input id="issued_date" name="issued_date" type="date" required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="credential_url" className="font-bold uppercase text-xs">URL Kredensial (Opsional)</Label>
                        <Input id="credential_url" name="credential_url" type="url" placeholder="https://..." className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image" className="font-bold uppercase text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Foto Sertifikat (Opsional)
                        </Label>
                        <Input id="image" name="image" type="file" accept="image/*" className="border-2 border-black rounded-none cursor-pointer file:bg-black file:text-white file:border-none file:mr-4 file:px-4 file:font-bold" />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        {loading ? 'MENYIMPAN...' : 'SIMPAN SERTIFIKAT'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
