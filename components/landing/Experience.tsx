'use client'

import { Experience as ExperienceType } from '@/lib/types'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Calendar, Building, Terminal, Layers, ChevronDown, ChevronUp } from 'lucide-react'

function ExpandableDescription({ text }: { text: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const words = text.split(/\s+/)
    const canExpand = words.length > 35
    const truncatedText = words.slice(0, 35).join(' ') + (canExpand ? '...' : '')

    return (
        <div className="space-y-1">
            <p className="text-[10px] md:text-[12px] text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                {isExpanded ? text : truncatedText}
            </p>
            {canExpand && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-0.5 text-[8px] md:text-[10px] font-black uppercase text-black hover:underline mt-1"
                >
                    {isExpanded ? (
                        <>LIHAT SEDIKIT <ChevronUp size={12} /></>
                    ) : (
                        <>LIHAT SELENGKAPNYA <ChevronDown size={12} /></>
                    )}
                </button>
            )}
        </div>
    )
}

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
        <section ref={sectionRef} id={title.toLowerCase().replace(/\s+/g, '-')} className="py-6 bg-transparent relative overflow-hidden scroll-mt-20">
            <div className="absolute top-0 right-0 opacity-[0.02] text-black pointer-events-none hidden lg:block translate-x-1/2">
                <Layers size={150} />
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal size={12} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-gray-400">HISTORY.LOG</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter uppercase italic">{title}</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="relative space-y-4 md:space-y-8">
                    <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-black/10 -translate-x-1/2"></div>

                    {visibleExperience.map((item, index) => (
                        <div key={item.id} className={`relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            <div className="absolute left-[15px] md:left-1/2 top-6 md:top-8 -translate-x-1/2 flex items-center justify-center w-3 h-3 border-2 border-black bg-white z-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>

                            <div className="w-full md:w-[45%] pl-8 md:pl-0 group">
                                <div className="relative bg-white border-2 border-black p-3 md:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300">
                                    <div className="flex flex-col gap-2 md:gap-4">
                                        <div className="flex items-start gap-3 md:gap-4">
                                            {item.image_url && (
                                                <div className="w-12 h-12 md:w-16 md:h-16 relative border-2 border-black shrink-0 bg-gray-50 overflow-hidden">
                                                    <Image src={item.image_url} alt={item.company} fill className="object-cover" unoptimized />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <span className="inline-block px-1.5 py-0.5 bg-black text-white text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] mb-1">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-sm md:text-base font-black uppercase leading-tight line-clamp-1">{item.title}</h3>
                                                <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mt-0.5">
                                                    <Building className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                                    {item.company}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[7px] md:text-[9px] font-black bg-gray-50 border border-black/10 px-2 py-1 w-fit rounded-full" suppressHydrationWarning>
                                            <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                            {new Date(item.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                            {' > '}
                                            {item.is_current ? 'PRESENT' : (item.end_date ? new Date(item.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'PRESENT')}
                                        </div>

                                        <div className="border-t border-black/5 pt-2">
                                            {item.description && <ExpandableDescription text={item.description} />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block md:w-[45%]"></div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="bg-black text-white px-8 py-3 font-black uppercase tracking-[0.2em] text-sm italic hover:bg-white hover:text-black border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-3px] translate-y-[-3px] active:translate-x-0 active:translate-y-0"
                        >
                            {showAll ? 'LIHAT SEDIKIT' : `LIHAT SEMUA ${title}`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
