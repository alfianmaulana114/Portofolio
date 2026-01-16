'use client'

import { Project as ProjectType } from '@/lib/types'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Briefcase, Code, Zap, ChevronDown, ChevronUp } from 'lucide-react'

function ExpandableDescription({ text }: { text: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const words = text.split(/\s+/)
    const canExpand = words.length > 20
    const truncatedText = words.slice(0, 20).join(' ') + (canExpand ? '...' : '')

    return (
        <div className="space-y-1">
            <p className="text-[9px] md:text-[10px] text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
                {isExpanded ? text : truncatedText}
            </p>
            {canExpand && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-0.5 text-[8px] md:text-[9px] font-black uppercase text-black hover:underline"
                >
                    {isExpanded ? (
                        <>LIHAT SEDIKIT <ChevronUp size={10} /></>
                    ) : (
                        <>LIHAT SELENGKAPNYA <ChevronDown size={10} /></>
                    )}
                </button>
            )}
        </div>
    )
}

export default function Projects({ data }: { data: ProjectType[] | null }) {
    const [showAll, setShowAll] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleProjects = showAll ? sortedData : sortedData.slice(0, 6)

    const handleToggle = () => {
        setShowAll(!showAll)
        if (!showAll) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
        }
    }

    return (
        <section ref={sectionRef} id="projects" className="py-12 bg-transparent relative overflow-hidden scroll-mt-20">
            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Code size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400">REPOSITORY</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter uppercase italic">PROJEK TERBARU</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    {visibleProjects.map((project) => (
                        <div key={project.id} className="relative group">
                            <div className="relative bg-white border-2 border-black rounded-none h-full flex flex-col transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                                {project.image_url ? (
                                    <div className="w-full h-28 sm:h-36 md:h-40 relative border-b-2 border-black overflow-hidden bg-gray-100">
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black text-white p-0.5 md:p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Zap size={8} fill="white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-28 sm:h-36 md:h-40 flex items-center justify-center bg-gray-50 border-b-2 border-black">
                                        <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-2 md:p-4 flex-1 flex flex-col justify-between gap-2 md:gap-3">
                                    <div className="space-y-1 md:space-y-2">
                                        <div className="flex items-center justify-between gap-1">
                                            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-tight leading-tight line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                                        </div>
                                        {project.role && (
                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[6px] md:text-[8px]">
                                                {project.role}
                                            </p>
                                        )}
                                        {project.description && <ExpandableDescription text={project.description} />}
                                    </div>

                                    <div className="mt-auto pt-2 md:pt-3 border-t border-black border-dashed">
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-1.5 md:px-3 py-0.5 md:py-1 bg-black text-white font-black uppercase text-[6px] md:text-[8px] tracking-widest border border-black hover:bg-white hover:text-black transition-all"
                                            >
                                                SOURCE <ExternalLink className="h-2 w-2" />
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
                            {showAll ? 'LIHAT SEDIKIT' : 'LIHAT SEMUA PROYEK'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
