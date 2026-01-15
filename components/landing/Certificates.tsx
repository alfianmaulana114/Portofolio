import { Certificate as CertificateType } from '@/lib/types'
import Image from 'next/image'
import { Award, ExternalLink, Calendar, ShieldCheck, Cpu, Code2 } from 'lucide-react'

export default function Certificates({ data }: { data: CertificateType[] | null }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="certificates" className="py-6 bg-transparent relative overflow-hidden">
            {/* Background Decorative Elements simplified */}

            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Cpu size={16} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400">CREDENTIALS</span>
                    </div>
                    <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase">SERTIFIKASI</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((cert) => (
                        <div key={cert.id} className="relative group">
                            <div className="relative bg-white border-2 border-black rounded-none h-full flex flex-col transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">

                                {cert.image_url ? (
                                    <div className="w-full h-44 relative border-b-2 border-black overflow-hidden bg-gray-100">
                                        <Image
                                            src={cert.image_url}
                                            alt={cert.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Code2 className="text-white h-8 w-8" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-44 flex items-center justify-center bg-gray-50 border-b-2 border-black">
                                        <Award className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-black uppercase tracking-tight leading-tight">
                                            {cert.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[8px]">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-black border-dashed pt-3 mt-auto">
                                        <div className="flex items-center gap-1 text-[8px] font-black uppercase text-gray-400">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(cert.issued_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                        </div>

                                        {cert.credential_url && (
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white font-black uppercase text-[8px] tracking-widest border border-black hover:bg-white hover:text-black transition-all"
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
            </div>
        </section>
    )
}
