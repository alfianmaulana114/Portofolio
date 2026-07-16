'use client'

import { Experience as ExperienceType } from '@/lib/types'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Calendar, Building, Terminal, Layers, ChevronDown } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export default function Experience({ data, title = "PENGALAMAN" }: { data: ExperienceType[] | null, title?: string }) {
    const [showAll, setShowAll] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleExperience = showAll ? sortedData : sortedData.slice(0, 6)

    const handleToggle = () => {
        setShowAll(!showAll)
        if (!showAll) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }

    return (
        <section ref={sectionRef} id={title.toLowerCase().replace(/\s+/g, '-')} className="py-5 bg-transparent relative overflow-hidden scroll-mt-20">
            <div className="container mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal size={10} className="text-gray-400" />
                        <span className="text-[9px] font-black tracking-[0.3em] text-gray-400">--git-log</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black">{title}</h2>
                    <div className="mt-2 h-px w-12 bg-black/10"></div>
                </div>

                <div className="relative space-y-3 md:space-y-6">
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-black/10 -translate-x-1/2"></div>

                    {visibleExperience.map((item, index) => (
                        <div key={item.id} className={`relative flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            <div className="absolute left-[15px] md:left-1/2 top-5 md:top-6 -translate-x-1/2 flex items-center justify-center w-2.5 h-2.5 border-2 border-black bg-white z-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>

                            <div className="w-full md:w-[45%] pl-8 md:pl-0 group">
                                <div className="relative bg-white border-2 border-black p-2 md:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
                                    <div className="flex flex-col gap-1.5 md:gap-3">
                                        <div className="flex items-start gap-2 md:gap-3">
                                            {item.image_url && (
                                                <div className="w-10 h-10 md:w-14 md:h-14 relative border-2 border-black shrink-0 bg-gray-50 overflow-hidden">
                                                    <Image src={item.image_url} alt={item.company} fill className="object-cover" unoptimized />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <span className="inline-block px-1 py-0.5 bg-black text-white text-[6px] md:text-[7px] font-black uppercase tracking-[0.2em] mb-0.5">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-xs md:text-sm font-black uppercase leading-tight truncate">{item.title}</h3>
                                                <div className="flex items-center gap-1 text-[7px] md:text-[9px] font-bold text-gray-400 uppercase mt-0.5">
                                                    <Building className="h-2 w-2 md:h-2.5 md:w-2.5" />
                                                    {item.company}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[7px] md:text-[8px] font-black bg-gray-50 border border-black/10 px-2 py-0.5 w-fit rounded-full" suppressHydrationWarning>
                                            <Calendar className="h-2 w-2 md:h-2.5 md:w-2.5" />
                                            {new Date(item.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                            {' > '}
                                            {item.is_current ? 'SEKARANG' : (item.end_date ? new Date(item.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'SEKARANG')}
                                        </div>

                                        <div className="border-t border-black/5 pt-1.5">
                                            {item.description && (() => {
                                                const words = item.description.split(/\s+/)
                                                const isLong = words.length > 35
                                                const truncated = words.slice(0, 35).join(' ') + '...'
                                                return (
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] md:text-[11px] text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                                                            {truncated}
                                                        </p>
                                                        {isLong && (
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                     <button className="flex items-center gap-0.5 text-[7px] md:text-[9px] font-black uppercase text-black hover:underline mt-0.5">
                                                                         BACA LENGKAP <ChevronDown size={10} />
                                                                    </button>
                                                                </DialogTrigger>
                                                                <DialogContent className="bg-white border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:max-w-lg max-h-[80vh] overflow-y-auto p-0">
                                                                     {item.image_url && (
                                                                         <div className="w-full h-40 md:h-52 relative border-b-2 border-black bg-gray-100">
                                                                             <Image src={item.image_url} alt={item.title} fill className="object-cover" unoptimized />
                                                                         </div>
                                                                     )}
                                                                     <div className="p-3 md:p-5">
                                                                         <DialogHeader>
                                                                             <DialogTitle className="font-black uppercase tracking-tight text-base">
                                                                                 {item.title}
                                                                             </DialogTitle>
                                                                             <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase">
                                                                                 <Building className="h-2.5 w-2.5" />
                                                                                 {item.company}
                                                                             </div>
                                                                         </DialogHeader>
                                                                         <div className="text-[11px] md:text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-wrap border-t border-black/10 pt-2 mt-2">
                                                                             {item.description}
                                                                         </div>
                                                                     </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        )}
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block md:w-[45%]"></div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="bg-black text-white px-6 py-2.5 font-black uppercase tracking-[0.2em] text-xs italic hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                        >
                            {showAll ? 'TAMPILKAN LEBIH SEDIKIT' : `LIHAT SEMUA ${title}`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
