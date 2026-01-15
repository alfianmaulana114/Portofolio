import { Project as ProjectType } from '@/lib/types'
import Image from 'next/image'
import { ExternalLink, Briefcase, Database, Server, Code, Zap } from 'lucide-react'

export default function Projects({ data }: { data: ProjectType[] | null }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="projects" className="py-6 bg-transparent relative overflow-hidden">
            {/* Background Decorative Elements simplified */}

            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Code size={16} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400">REPOSITORY</span>
                    </div>
                    <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase">PROYEK TERBARU</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((project) => (
                        <div key={project.id} className="relative group">
                            <div className="relative bg-white border-2 border-black rounded-none h-full flex flex-col transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">

                                {project.image_url ? (
                                    <div className="w-full h-40 relative border-b-2 border-black overflow-hidden bg-gray-100">
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute top-2 right-2 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Zap size={10} fill="currentColor" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-40 flex items-center justify-center bg-gray-50 border-b-2 border-black">
                                        <Briefcase className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-black uppercase tracking-tight leading-tight">
                                                {project.title}
                                            </h3>
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        </div>
                                        {project.role && (
                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[8px]">
                                                {project.role}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-600 font-medium leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-black border-dashed">
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white font-black uppercase text-[8px] tracking-widest border border-black hover:bg-white hover:text-black transition-all"
                                            >
                                                OPEN SOURCE <ExternalLink className="h-2 w-2" />
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
