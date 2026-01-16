'use client'
import { useState, use } from 'react'
import { useRouter, notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

export default function LoginPage({ params }: { params: Promise<{ loginUsername: string }> }) {
    const { loginUsername } = use(params)

    // Logic: Only match if URL starts with "login" (e.g. /loginalfian)
    if (!loginUsername.startsWith('login')) {
        return notFound()
    }

    // Extract the real username (e.g. "loginalfian" -> "alfian")
    const username = loginUsername.replace(/^login/, '')

    // If there's nothing after "login", it should probably be handled by the main /login page
    if (!username) {
        return notFound()
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPw, setConfirmPw] = useState('')
    const [isSignup, setIsSignup] = useState(false)
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
        } catch (error: any) {
            toast({ title: 'Error', description: 'Gagal masuk. Silakan cek email & password.', variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="p-8 w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">MASUK ADMIN</h1>
                <p className="text-gray-600 mb-6 font-bold uppercase tracking-widest text-[10px]">Akses Terbatas: {username}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="font-bold uppercase text-[10px]">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    <div>
                        <Label className="font-bold uppercase text-[10px]">Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-12 font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        disabled={loading}
                    >
                        {loading ? 'DITUNGGU...' : 'MASUK SEKARANG'}
                    </Button>
                </form>
            </Card>
        </div>
    )
}
