import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCertificate, deleteCertificate } from '@/lib/data-actions'
import { Trash2, Plus, ExternalLink } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default async function CertificatesPage() {
    const supabase = await createClient()
    const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .order('issued_date', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Certificates</h2>
                    <p className="text-muted-foreground">
                        Showcase your certifications and awards.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-gray-800">
                            <Plus className="mr-2 h-4 w-4" /> Add Certificate
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Certificate</DialogTitle>
                            <DialogDescription>
                                Add a new certificate to your portfolio.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={createCertificate} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Certificate Name</Label>
                                <Input id="title" name="title" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="issuer">Issuing Organization</Label>
                                <Input id="issuer" name="issuer" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="issued_date">Issue Date</Label>
                                <Input id="issued_date" name="issued_date" type="date" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="credential_url">Credential URL (Optional)</Label>
                                <Input id="credential_url" name="credential_url" type="url" placeholder="https://..." />
                            </div>
                            <Button type="submit" className="bg-black text-white hover:bg-gray-800">Save Certificate</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {certificates?.map((cert) => (
                    <Card key={cert.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {cert.issuer}
                                </p>
                            </div>
                            <form action={deleteCertificate.bind(null, cert.id)}>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                Issued: {new Date(cert.issued_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                            {cert.credential_url && (
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center text-sm text-blue-600 hover:underline"
                                >
                                    View Credential <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
