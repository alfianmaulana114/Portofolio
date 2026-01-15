import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSkill, deleteSkill } from '@/lib/data-actions'
import { Trash2, Plus, Zap, Code, ShieldCheck } from 'lucide-react'
import { EditSkillDialog } from '@/components/dashboard/EditSkillDialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default async function SkillsPage() {
    const supabase = await createClient()
    const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })

    // Group skills by category
    const skillsByCategory = skills?.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, any[]>)

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
                <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter">KEAHLIAN</h2>
                    <p className="text-lg font-bold text-gray-500 uppercase mt-2">
                        Kelola daftar teknologi dan tingkat kemahiran Anda.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-14 px-8 font-black text-lg uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                            <Plus className="mr-2 h-6 w-6 stroke-[3px]" /> TAMBAH BARU
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <DialogHeader>
                            <DialogTitle className="font-black uppercase text-2xl tracking-tight">Tambah Keahlian</DialogTitle>
                            <DialogDescription className="font-bold text-gray-500">
                                Apa senjata andalan Anda berikutnya?
                            </DialogDescription>
                        </DialogHeader>
                        <form action={createSkill} className="grid gap-6 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-bold uppercase text-xs">Nama Skill</Label>
                                <Input id="name" name="name" placeholder="Contoh: React, Python, UI Design" required className="border-2 border-black rounded-none" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="font-bold uppercase text-xs">Kategori</Label>
                                <Select name="category" required>
                                    <SelectTrigger className="border-2 border-black rounded-none">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Frontend">Frontend</SelectItem>
                                        <SelectItem value="Backend">Backend</SelectItem>
                                        <SelectItem value="Cloud">Cloud / DevOps</SelectItem>
                                        <SelectItem value="Tools">Tools & Others</SelectItem>
                                        <SelectItem value="Project Management">Project Management</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="proficiency_level" className="font-bold uppercase text-xs">Kemahiran</Label>
                                <Select name="proficiency_level" required defaultValue="Intermediate">
                                    <SelectTrigger className="border-2 border-black rounded-none">
                                        <SelectValue placeholder="Pilih Kemahiran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none h-12 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">SIMPAN KEAHLIAN</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-10">
                {skillsByCategory && Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-black uppercase tracking-widest bg-black text-white px-4 py-1">{category}</h3>
                            <div className="flex-1 h-1 bg-black"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categorySkills.map((skill) => (
                                <div key={skill.id} className="relative group">
                                    <Card className="bg-white border-2 border-black rounded-none h-full transition-all duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <Zap className="h-5 w-5 fill-yellow-400" />
                                                <div className="flex gap-1">
                                                    <EditSkillDialog skill={skill} />
                                                    <form action={deleteSkill.bind(null, skill.id)}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-none border-2 border-transparent hover:border-red-500 transition-all">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-black uppercase tracking-tight mb-1">{skill.name}</h4>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{skill.proficiency_level}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {skills?.length === 0 && (
                <div className="text-center py-24 border-4 border-dashed border-gray-300 rounded-none">
                    <Code className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-xl font-black text-gray-400 uppercase tracking-widest">
                        Belum ada data keahlian.
                    </p>
                </div>
            )}
        </div>
    )
}
