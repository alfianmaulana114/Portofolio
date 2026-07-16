import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Award, Code, Activity, User, ShieldCheck } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { count: experienceCount } = await supabase
        .from('experiences')
        .select('*', { count: 'exact', head: true })

    const { count: certificateCount } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })

    const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })

    const { count: skillCount } = await supabase
        .from('skills')
        .select('*', { count: 'exact', head: true })

    const stats = [
        {
            title: 'PENGALAMAN',
            value: experienceCount || 0,
            icon: Briefcase,
        },
        {
            title: 'PROYEK',
            value: projectCount || 0,
            icon: ShieldCheck,
        },
        {
            title: 'SERTIFIKAT',
            value: certificateCount || 0,
            icon: Award,
        },
        {
            title: 'KEAHLIAN',
            value: skillCount || 0,
            icon: Code,
        }
    ]

    return (
        <div className="max-w-5xl mx-auto space-y-12 py-6">
            <div className="border-b-4 border-black pb-8">
                <div className="flex items-center gap-4 mb-2">
                    <Activity className="h-8 w-8" />
                    <h2 className="text-5xl font-black uppercase tracking-tighter">RINGKASAN</h2>
                </div>
                <p className="text-xl font-bold text-gray-500 uppercase">
                    Selamat datang kembali, Alfian. Berikut adalah status portofolio Anda saat ini.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.title} className="relative group">
                        <div className="absolute -inset-1 bg-black rounded-none blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
                        <Card className="relative border-4 border-black rounded-none h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 border-2 border-black rounded-none bg-white`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 font-sans">STATUS: AKTIF</span>
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-4xl font-black tracking-tighter leading-none">{stat.value}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.title}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 mt-8">
                <Card className="border-4 border-black rounded-none p-8 bg-gray-50 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-none border-4 border-black bg-white flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <User className="h-10 w-10" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black uppercase tracking-tight">Profil Admin</h4>
                        <p className="text-sm font-medium text-gray-600">Anda masuk sebagai pemilik tunggal sistem ini.</p>
                        <div className="mt-3 inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest font-sans">
                            AKSES PENUH
                        </div>
                    </div>
                </Card>

                <Card className="border-4 border-black rounded-none p-8 bg-white border-dashed flex flex-col justify-center text-center italic font-medium text-gray-400">
                    "Kualitas lebih penting daripada kuantitas. Satu home run jauh lebih baik daripada dua doubles."
                    <span className="mt-2 font-black uppercase tracking-widest not-italic text-black font-sans text-xs">— Steve Jobs</span>
                </Card>
            </div>
        </div>
    )
}
