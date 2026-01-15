'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateCertificate } from '@/lib/data-actions'
import { Pencil, Image as ImageIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Certificate } from '@/lib/types'

export function EditCertificateDialog({ certificate }: { certificate: Certificate }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await updateCertificate(certificate.id, formData)
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
                    <DialogTitle className="font-black uppercase text-2xl tracking-tight">Edit Sertifikat</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Update detail sertifikat atau pencapaian Anda.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-cert-title" className="font-bold uppercase text-xs">Nama Sertifikat</Label>
                        <Input id="edit-cert-title" name="title" defaultValue={certificate.title} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-issuer" className="font-bold uppercase text-xs">Penerbit / Institusi</Label>
                        <Input id="edit-issuer" name="issuer" defaultValue={certificate.issuer} required className="border-2 border-black rounded-none" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-issued_date" className="font-bold uppercase text-xs">Tanggal Terbit</Label>
                        <Input
                            id="edit-issued_date"
                            name="issued_date"
                            type="date"
                            defaultValue={certificate.issued_date}
                            required
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-credential_url" className="font-bold uppercase text-xs">URL Kredensial (Opsional)</Label>
                        <Input
                            id="edit-credential_url"
                            name="credential_url"
                            defaultValue={certificate.credential_url || ''}
                            placeholder="https://..."
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-cert-image" className="font-bold uppercase text-xs flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" /> Foto Sertifikat (Opsional)
                        </Label>
                        <Input
                            id="edit-cert-image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="border-2 border-black rounded-none cursor-pointer file:bg-black file:text-white file:border-none file:mr-4 file:px-4 file:font-bold"
                        />
                        {certificate.image_url && (
                            <p className="text-xs font-bold text-gray-500">Sudah ada foto. Upload untuk mengganti.</p>
                        )}
                    </div>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" disabled={loading}>
                        {loading ? 'MENYIMPAN...' : 'UPDATE SERTIFIKAT'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
