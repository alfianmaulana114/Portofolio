import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteCertificate } from '@/lib/data-actions'
import { Trash2, ExternalLink, Calendar, Award } from 'lucide-react'
import { EditCertificateDialog } from '@/components/dashboard/EditCertificateDialog'
import { AddCertificateDialog } from '@/components/dashboard/AddCertificateDialog'
import Image from 'next/image'

export default async function CertificatesPage() {
    const supabase = await createClient()
    const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .order('issued_date', { ascending: false })

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
                <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter">SERTIFIKAT</h2>
                    <p className="text-lg font-bold text-gray-500 uppercase mt-2">
                        Pamerkan pencapaian dan keahlian tersertifikasi Anda.
                    </p>
                </div>

                <AddCertificateDialog />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {certificates?.map((cert) => (
                    <div key={cert.id} className="relative group">
                        <div className="absolute -inset-1 bg-black rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Card className="relative bg-white border-4 border-black rounded-none h-full transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                            <CardContent className="p-0">
                                {cert.image_url ? (
                                    <div className="w-full h-48 relative border-b-4 border-black overflow-hidden bg-gray-50">
                                        <Image
                                            src={cert.image_url}
                                            alt={cert.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gray-100 border-b-4 border-black flex items-center justify-center">
                                        <Award className="h-16 w-16 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-black uppercase leading-tight truncate">{cert.title}</h3>
                                            <p className="text-sm font-bold text-gray-500 uppercase mt-1">{cert.issuer}</p>
                                        </div>
                                        <div className="flex gap-1 ml-4 shrink-0">
                                            <EditCertificateDialog certificate={cert} />
                                            <form action={deleteCertificate.bind(null, cert.id)}>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-500 rounded-none transition-all">
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t-2 border-black border-dashed">
                                        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(cert.issued_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                        </div>

                                        {cert.credential_url && (
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                                            >
                                                LIHAT <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {certificates?.length === 0 && (
                <div className="text-center py-24 border-4 border-dashed border-gray-300 rounded-none col-span-full">
                    <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-xl font-black text-gray-400 uppercase tracking-widest">
                        Belum ada data sertifikat.
                    </p>
                </div>
            )}
        </div>
    )
}
