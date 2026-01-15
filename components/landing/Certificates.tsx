import { Certificate } from '@/lib/types'
import { ExternalLink, Award } from 'lucide-react'

export default function Certificates({ data }: { data: Certificate[] | null }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="certificates" className="py-24 bg-gray-50">
            <div className="container mx-auto max-w-[1000px] px-4 md:px-8">
                <h2 className="text-4xl font-black mb-12 text-center tracking-tight">SERTIFIKASI</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {data.map((cert) => (
                        <div key={cert.id} className="bg-white border-2 border-black text-card-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                            <div>
                                <div className="flex items-start justify-between">
                                    <Award className="h-8 w-8 text-black mb-4" />
                                    <span className="text-xs text-white font-bold bg-black px-2 py-1 border border-black">
                                        {new Date(cert.issued_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="font-black text-xl mb-2 line-clamp-2 uppercase">{cert.title}</h3>
                                <p className="text-gray-800 text-sm mb-4 font-bold">{cert.issuer}</p>
                            </div>

                            {cert.credential_url && (
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-sm font-black hover:underline mt-2 uppercase tracking-wide"
                                >
                                    Lihat Kredensial <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
