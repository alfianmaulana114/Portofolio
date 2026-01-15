import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSkill, deleteSkill } from '@/lib/data-actions'
import { Trash2, Plus } from 'lucide-react'
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
    }, {} as Record<string, typeof skills>)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
                    <p className="text-muted-foreground">
                        Manage your technical skills and proficiency levels.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-gray-800">
                            <Plus className="mr-2 h-4 w-4" /> Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Skill</DialogTitle>
                            <DialogDescription>
                                Add a new skill to your portfolio.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={createSkill} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Skill Name</Label>
                                <Input id="name" name="name" placeholder="e.g. React, Python" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
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
                                <Label htmlFor="proficiency_level">Proficiency</Label>
                                <Select name="proficiency_level" required defaultValue="Intermediate">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select proficiency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800">Save Skill</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                {skillsByCategory && Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-xl font-semibold border-b pb-2">{category}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categorySkills.map((skill) => (
                                <Card key={skill.id} className="relative group">
                                    <form action={deleteSkill.bind(null, skill.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </form>
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base text-center">{skill.name}</CardTitle>
                                        <p className="text-xs text-center text-muted-foreground">{skill.proficiency_level}</p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
                {skills?.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No skills found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    )
}
