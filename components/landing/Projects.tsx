'use client'

import { Project as ProjectType } from '@/lib/types'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Folder, ExternalLink, Github, Code2, Calendar } from 'lucide-react'
import { CodeCard } from '@/components/ui/CodeCard'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Projects({ data }: { data: ProjectType[] | null }) {
    const [showAll, setShowAll] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

    const sortedData = useMemo(() => {
        if (!data) return []
        return [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }, [data])

    if (!data || data.length === 0) return null

    const visibleProjects = showAll ? sortedData : sortedData.slice(0, 6)

    return (
        <section id="projects" className="py-8 relative bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">

                <div className="flex items-center gap-2 mb-10 font-mono text-sm uppercase tracking-tight">
                    <Folder className="h-4 w-4 text-primary" />
                    <h2 className="font-bold">Latest Repositories</h2>
                    <div className="h-px bg-border flex-1 ml-4"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {visibleProjects.map((project) => (
                        <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                            <CodeCard hideHeader className="h-full flex flex-col border-border/80 bg-card hover:border-primary/40 transition-all shadow-sm">
                                {project.image_url && (
                                    <div className="relative w-full h-24 sm:h-36 border-b border-border overflow-hidden bg-muted/20">
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized
                                        />
                                    </div>
                                )}

                                <div className="p-3 sm:p-5 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                                        <h3 className="font-bold text-[10px] sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-muted-foreground text-[9px] sm:text-[11px] leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-1 sm:gap-2 font-mono text-[8px] sm:text-[9px] text-muted-foreground uppercase">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {project.role || "Dev"}
                                        </div>
                                    </div>
                                </div>
                            </CodeCard>
                        </div>
                    ))}
                </div>

                {sortedData.length > 6 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-2 border border-border rounded text-[10px] font-mono uppercase tracking-widest hover:bg-muted transition-colors"
                        >
                            {showAll ? './view_less' : './load_more'}
                        </button>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
                    {selectedProject && (
                        <div className="space-y-6">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold font-mono text-primary uppercase tracking-tight">
                                    {selectedProject.title}
                                </DialogTitle>
                                <DialogDescription className="font-mono text-xs text-muted-foreground pt-2">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        Created at {new Date(selectedProject.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                </DialogDescription>
                            </DialogHeader>

                            {selectedProject.image_url && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border shadow-md">
                                    <Image
                                        src={selectedProject.image_url}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                                    <h4 className="text-[10px] font-black font-mono uppercase tracking-[0.2em] mb-2 text-muted-foreground">About Project</h4>
                                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-muted/20 rounded border border-border/30">
                                        <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Stack/Role</p>
                                        <div className="flex items-center gap-2 text-xs font-mono font-bold">
                                            <Code2 className="h-3.5 w-3.5 text-primary" />
                                            {selectedProject.role || "Fullstack Dev"}
                                        </div>
                                    </div>
                                    {selectedProject.project_url && (
                                        <Button asChild className="h-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs">
                                            <a href={selectedProject.project_url} target="_blank" rel="noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" /> VISIT_REPO
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
