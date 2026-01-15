'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
            if (signInError) throw signInError

            toast({ title: 'Success', description: 'Selamat datang kembali, Alfian!' })
            router.push('/dashboard')
            router.refresh()
        } catch (error: any) {
            toast({ title: 'Error', description: 'Gagal masuk. Silakan cek email & password.', variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <Card className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                        ADMIN LOGIN
                    </h1>
                    <div className="h-2 w-20 bg-black mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="font-black uppercase text-sm tracking-widest">Email Address</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@alfian.com"
                            className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-black transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-black uppercase text-sm tracking-widest">Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-black transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-16 font-black text-xl uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50 mt-4"
                        disabled={loading}
                    >
                        {loading ? 'DITUNGGU...' : 'MASUK'}
                    </Button>
                </form>

                <div className="mt-10 pt-6 border-t-2 border-black text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Portofolio Alfian © 2026
                    </p>
                </div>
            </Card>
        </div>
    )
} 
