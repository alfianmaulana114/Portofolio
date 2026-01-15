import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createExperience, deleteExperience } from '@/lib/data-actions'
import { Trash2, Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default async function ExperiencesPage() {
    const supabase = await createClient()
    const { data: experiences } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Experiences</h2>
                    <p className="text-muted-foreground">
                        Manage your professional positions and work history.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-gray-800">
                            <Plus className="mr-2 h-4 w-4" /> Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Experience</DialogTitle>
                            <DialogDescription>
                                Add a new professional experience to your portfolio.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={createExperience} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Job Title</Label>
                                <Input id="title" name="title" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" name="company" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input id="start_date" name="start_date" type="date" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input id="end_date" name="end_date" type="date" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="is_current" name="is_current" />
                                <Label htmlFor="is_current">I currently work here</Label>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" />
                            </div>
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800">Save Experience</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {experiences?.map((experience) => (
                    <Card key={experience.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="text-xl">{experience.title}</CardTitle>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {experience.company}
                                </p>
                            </div>
                            <form action={deleteExperience.bind(null, experience.id)}>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                {new Date(experience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                {' - '}
                                {experience.is_current ? 'Present' : (experience.end_date ? new Date(experience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
                            </div>
                            <p className="whitespace-pre-wrap">{experience.description}</p>
                        </CardContent>
                    </Card>
                ))}
                {experiences?.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No experiences found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    )
}
