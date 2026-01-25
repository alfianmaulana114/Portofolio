'use client'

import { Experience as ExperienceType } from '@/lib/types'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { GitBranch, Calendar, Building, ChevronDown, ChevronUp } from 'lucide-react'

export default function Experience({ data, title = "Experience" }: { data: ExperienceType[] | null, title?: string }) {
    const [showAll, setShowAll] = useState(false)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleExperience = showAll ? sortedData : sortedData.slice(0, 6)

    return (
        <section id="experience" className="py-8 relative overflow-hidden bg-muted/5">
            <div className="container mx-auto max-w-[900px] px-4">

                <div className="flex items-center gap-3 mb-10">
                    <GitBranch className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-mono font-bold uppercase tracking-tight">
                        {title}
                        <span className="text-muted-foreground font-normal ml-3 text-xs lowercase">--git-log</span>
                    </h2>
                    <div className="h-px bg-border flex-1"></div>
                </div>

                <div className="relative pl-6 md:pl-12 border-l border-border ml-2">
                    {visibleExperience.map((item, index) => (
                        <div key={item.id} className="mb-10 relative group">
                            {/* Git Point */}
                            <div className="absolute -left-[29px] md:-left-[53px] top-1.5 w-4 h-4 rounded-full border-2 border-background bg-primary z-10 group-hover:scale-125 transition-transform" />

                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-card p-1 rounded border border-border">
                                            {item.image_url ? (
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.company}
                                                    width={24}
                                                    height={24}
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            ) : (
                                                <Building className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="font-mono text-[10px] text-muted-foreground">
                                        <span className="text-primary font-bold mr-2">@{item.company}</span>
                                        {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        {' - '}
                                        {item.is_current ? 'Present' : (item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present')}
                                    </div>
                                </div>

                                <div className="font-mono text-xs text-muted-foreground leading-relaxed pl-4 border-l border-border/50 py-1">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-[10px] font-mono font-bold text-muted-foreground hover:text-primary underline underline-offset-4 decoration-border transition-all"
                        >
                            {showAll ? 'Show less history' : 'View more history...'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
