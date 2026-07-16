import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteProject } from '@/lib/data-actions'
import { Trash2, ExternalLink, Briefcase } from 'lucide-react'
import { EditProjectDialog } from '@/components/dashboard/EditProjectDialog'
import { AddProjectDialog } from '@/components/dashboard/AddProjectDialog'
import Image from 'next/image'

export default async function ProjectsPage() {
    const supabase = await createClient()
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
                <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter">PROYEK</h2>
                    <p className="text-lg font-bold text-gray-500 uppercase mt-2">
                        Kelola daftar proyek yang pernah Anda kerjakan.
                    </p>
                </div>

                <AddProjectDialog />
            </div>

            <div className="grid gap-8">
                {projects?.map((project) => (
                    <div key={project.id} className="relative group">
                        <div className="absolute -inset-1 bg-black rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Card className="relative bg-white border-4 border-black rounded-none transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {project.image_url && (
                                        <div className="w-full md:w-48 h-48 relative border-2 border-black shrink-0 overflow-hidden bg-gray-50">
                                            <Image
                                                src={project.image_url}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-3xl font-black uppercase leading-tight">{project.title}</h3>
                                                <div className="flex items-center gap-2 mt-2 text-sm font-bold text-gray-500 uppercase">
                                                    <Briefcase className="h-4 w-4" />
                                                    {project.role}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <EditProjectDialog project={project} />
                                                <form action={async () => { await deleteProject(project.id) }}>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-500 rounded-none transition-all">
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {project.description}
                                        </p>

                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                            >
                                                LIHAT LIVE <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {projects?.length === 0 && (
                <div className="text-center py-24 border-4 border-dashed border-gray-300 rounded-none">
                    <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-xl font-black text-gray-400 uppercase tracking-widest">
                        Belum ada data proyek.
                    </p>
                </div>
            )}
        </div>
    )
}
