'use client'

import { Certificate as CertificateType } from '@/lib/types'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, ShieldCheck, Calendar, Building } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Certificates({ data }: { data: CertificateType[] | null }) {
    const [showAll, setShowAll] = useState(false)
    const [selectedCert, setSelectedCert] = useState<CertificateType | null>(null)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.issued_date).getTime() - new Date(a.issued_date).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleCertificates = showAll ? sortedData : sortedData.slice(0, 6)

    return (
        <section id="certificates" className="py-8 relative overflow-hidden bg-muted/5">
            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">

                <div className="flex items-center gap-2 mb-10 font-mono text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    <h2 className="font-bold">Certifications & Credentials</h2>
                    <div className="h-px bg-border flex-1 ml-4"></div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {visibleCertificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="group flex flex-col sm:flex-row items-center p-2 sm:p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-all shadow-sm cursor-pointer overflow-hidden h-full"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="shrink-0 relative w-8 h-8 sm:w-12 sm:h-12 rounded bg-muted flex items-center justify-center overflow-hidden border border-border/50 mb-2 sm:mb-0">
                                {cert.image_url ? (
                                    <Image
                                        src={cert.image_url}
                                        alt={cert.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        unoptimized
                                    />
                                ) : (
                                    <Award className="h-5 w-5 text-muted-foreground/30" />
                                )}
                            </div>

                            <div className="sm:ml-3 flex-1 min-w-0 w-full flex flex-col justify-center text-center sm:text-left">
                                <h3 className="font-bold text-[9px] sm:text-xs line-clamp-2 group-hover:text-primary transition-colors leading-tight mb-0.5">
                                    {cert.title}
                                </h3>
                                <div className="flex items-center justify-center sm:justify-start gap-1">
                                    <span className="text-[8px] sm:text-[10px] text-muted-foreground truncate max-w-full">{cert.issuer}</span>
                                    <ShieldCheck className="h-2 w-2 sm:h-3 sm:w-3 text-green-500/70 shrink-0" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="font-mono text-[10px] text-muted-foreground hover:text-primary underline underline-offset-4 decoration-border transition-all"
                        >
                            {showAll ? 'Show less' : 'View all credentials...'}
                        </button>
                    </div>
                )}
            </div>

            {/* Certificate Details Modal */}
            <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
                <DialogContent className="sm:max-w-[500px] bg-card border-border">
                    {selectedCert && (
                        <div className="space-y-6">
                            <DialogHeader>
                                <DialogTitle className="text-lg font-bold font-mono text-primary uppercase leading-tight">
                                    {selectedCert.title}
                                </DialogTitle>
                                <DialogDescription className="font-mono text-[10px] flex items-center gap-4 pt-2">
                                    <span className="flex items-center gap-1.5">
                                        <Building className="h-3 w-3" /> {selectedCert.issuer}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3" /> {new Date(selectedCert.issued_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </DialogDescription>
                            </DialogHeader>

                            {selectedCert.image_url && (
                                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border border-border shadow-inner bg-muted/10">
                                    <Image
                                        src={selectedCert.image_url}
                                        alt={selectedCert.title}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-3">


                                {selectedCert.credential_url && (
                                    <Button asChild className="w-full bg-primary text-primary-foreground font-mono text-xs">
                                        <a href={selectedCert.credential_url} target="_blank" rel="noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" /> OPEN_CREDENTIAL_LINK
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
