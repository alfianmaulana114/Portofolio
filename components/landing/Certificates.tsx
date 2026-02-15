'use client'

import { Certificate as CertificateType } from '@/lib/types'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, Calendar, Cpu, Code2 } from 'lucide-react'

export default function Certificates({ data }: { data: CertificateType[] | null }) {
    const [showAll, setShowAll] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.issued_date).getTime() - new Date(a.issued_date).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleCertificates = showAll ? sortedData : sortedData.slice(0, 6)

    const handleToggle = () => {
        setShowAll(!showAll)
        if (!showAll) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }

    return (
        <section ref={sectionRef} id="certificates" className="py-6 bg-transparent relative overflow-hidden scroll-mt-20">
            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Cpu size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400">CREDENTIALS</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter uppercase italic">CERTIFICATES</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    {visibleCertificates.map((cert) => (
                        <div key={cert.id} className="relative group">
                            <div className="relative bg-white border-2 border-black rounded-none h-full flex flex-col transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                                {cert.image_url ? (
                                    <div className="w-full h-28 sm:h-36 md:h-44 relative border-b-2 border-black overflow-hidden bg-gray-100">
                                        <Image
                                            src={cert.image_url}
                                            alt={cert.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Code2 className="text-white h-6 w-6 md:h-8 md:w-8" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-28 sm:h-36 md:h-44 flex items-center justify-center bg-gray-50 border-b-2 border-black">
                                        <Award className="h-8 w-8 md:h-10 md:w-10 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-2 md:p-4 flex-1 flex flex-col justify-between gap-2 md:gap-3">
                                    <div className="space-y-1 md:space-y-2">
                                        <h3 className="text-[10px] md:text-sm font-black uppercase tracking-tight leading-tight line-clamp-2">
                                            {cert.title}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-full"></div>
                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[6px] md:text-[8px]">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-black border-dashed pt-2 md:pt-3 mt-auto gap-2">
                                        <div className="flex items-center gap-1 text-[6px] md:text-[8px] font-black uppercase text-gray-400" suppressHydrationWarning>
                                            <Calendar className="h-2 w-2 md:h-3 md:w-3" />
                                            {new Date(cert.issued_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                        </div>

                                        {cert.credential_url && (
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-black text-white font-black uppercase text-[6px] md:text-[8px] tracking-widest border border-black hover:bg-white hover:text-black transition-all"
                                            >
                                                VALIDATE <ExternalLink className="h-2 w-2" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="bg-black text-white px-8 py-3 font-black uppercase tracking-[0.2em] text-sm italic hover:bg-white hover:text-black border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-3px] translate-y-[-3px] active:translate-x-0 active:translate-y-0"
                        >
                            {showAll ? 'SHOW LESS' : 'VIEW ALL CERTIFICATES'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
