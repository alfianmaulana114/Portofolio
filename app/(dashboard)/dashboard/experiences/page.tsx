import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteExperience } from '@/lib/data-actions'
import { Trash2, Calendar, Building, Briefcase } from 'lucide-react'
import { EditExperienceDialog } from '@/components/dashboard/EditExperienceDialog'
import { AddExperienceDialog } from '@/components/dashboard/AddExperienceDialog'
import Image from 'next/image'

export default async function ExperiencesPage() {
    const supabase = await createClient()
    const { data: experiences } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
                <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter">PENGALAMAN</h2>
                    <p className="text-lg font-bold text-gray-500 uppercase mt-2">
                        Kelola riwayat magang, organisasi, dan kerja Anda.
                    </p>
                </div>

                <AddExperienceDialog />
            </div>

            <div className="grid gap-8">
                {experiences?.map((experience) => (
                    <div key={experience.id} className="relative group">
                        <div className="absolute -inset-1 bg-black rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Card className="relative bg-white border-4 border-black rounded-none transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {experience.image_url && (
                                        <div className="w-full md:w-48 h-48 relative border-2 border-black shrink-0 overflow-hidden bg-gray-50">
                                            <Image
                                                src={experience.image_url}
                                                alt={experience.company}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest">
                                                        {experience.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-3xl font-black uppercase leading-tight">{experience.title}</h3>
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm font-bold text-gray-500 uppercase">
                                                    <div className="flex items-center gap-1.5">
                                                        <Building className="h-4 w-4" />
                                                        {experience.company}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(experience.start_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                                        {' - '}
                                                        {experience.is_current ? 'SEKARANG' : (experience.end_date ? new Date(experience.end_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : 'SEKARANG')}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <EditExperienceDialog experience={experience} />
                                                <form action={deleteExperience.bind(null, experience.id)}>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-500 rounded-none transition-all">
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-6 border-l-4 border-black italic font-medium text-gray-700 leading-relaxed">
                                            {experience.description}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}

                {experiences?.length === 0 && (
                    <div className="text-center py-24 border-4 border-dashed border-gray-300 rounded-none">
                        <Briefcase className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-xl font-black text-gray-400 uppercase tracking-widest">
                            Belum ada data pengalaman.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
