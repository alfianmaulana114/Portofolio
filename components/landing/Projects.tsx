'use client'

import { Project as ProjectType } from '@/lib/types'
import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Briefcase, Code, Zap, ChevronDown } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

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
        <section ref={sectionRef} id="projects" className="py-8 bg-transparent relative overflow-hidden scroll-mt-20">
            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Code size={12} className="text-gray-400" />
                        <span className="text-[9px] font-black tracking-[0.2em] text-gray-400">REPOSITORI</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tighter uppercase italic">PROYEK</h2>
                    <div className="h-1 w-12 bg-black"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {visibleProjects.map((project) => (
                        <div key={project.id} className="relative group">
                            <div className="relative bg-white border-2 border-black rounded-none h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {project.image_url ? (
                                    <div className="w-full h-24 sm:h-28 md:h-36 relative border-b-2 border-black overflow-hidden bg-gray-100">
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black text-white p-0.5 md:p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Zap size={6} fill="white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-24 sm:h-28 md:h-36 flex items-center justify-center bg-gray-50 border-b-2 border-black">
                                        <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-1.5 md:p-3 flex-1 flex flex-col justify-between gap-1.5 md:gap-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <h3 className="text-[9px] md:text-xs font-black uppercase tracking-tight leading-tight line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                                        </div>
                                        {project.role && (
                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[6px] md:text-[7px]">
                                                {project.role}
                                            </p>
                                        )}
                                        {project.description && (() => {
                                            const words = project.description.split(/\s+/)
                                            const isLong = words.length > 20
                                            const truncated = words.slice(0, 20).join(' ') + '...'
                                            return (
                                                <div className="space-y-1">
                                                    <p className="text-[8px] md:text-[10px] text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
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
                                                                {project.image_url && (
                                                                    <div className="w-full h-40 md:h-52 relative border-b-2 border-black bg-gray-100">
                                                                        <Image src={project.image_url} alt={project.title} fill className="object-cover" unoptimized />
                                                                    </div>
                                                                )}
                                                                <div className="p-3 md:p-5">
                                                                    <DialogHeader>
                                                                        <DialogTitle className="font-black uppercase tracking-tight text-base">
                                                                            {project.title}
                                                                        </DialogTitle>
                                                                        {project.role && (
                                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                                                {project.role}
                                                                            </p>
                                                                        )}
                                                                    </DialogHeader>
                                                                    <div className="text-[11px] md:text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-wrap border-t border-black/10 pt-2 mt-2">
                                                                        {project.description}
                                                                    </div>
                                                                    <div className="flex gap-2 mt-2">
                                                                        {project.project_url && (
                                                                            <a
                                                                                href={project.project_url}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white font-black uppercase text-[8px] tracking-widest border border-black hover:bg-white hover:text-black transition-all w-fit"
                                                                            >
                                                                                SUMBER <ExternalLink className="h-2.5 w-2.5" />
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}
                                                </div>
                                            )
                                        })()}
                                    </div>

                                    <div className="mt-auto pt-1.5 border-t border-black border-dashed">
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black text-white font-black uppercase text-[6px] md:text-[7px] tracking-widest border border-black hover:bg-white hover:text-black transition-all"
                                            >
                                                SUMBER <ExternalLink className="h-1.5 w-1.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="bg-black text-white px-6 py-2.5 font-black uppercase tracking-[0.2em] text-xs italic hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                        >
                            {showAll ? 'TAMPILKAN LEBIH SEDIKIT' : 'LIHAT SEMUA PROYEK'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
