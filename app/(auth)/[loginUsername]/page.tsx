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
            if (isSignup) {
                if (password !== confirmPw) {
                    toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' })
                    return
                }

                const { data: authData, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username: username,
                        }
                    }
                })
                if (signUpError) throw signUpError
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
                if (signInError) throw signInError
            }

            toast({ title: 'Success', description: isSignup ? 'Account created' : 'Logged in' })
            router.push('/dashboard')
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="p-8 w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">
                    {isSignup ? 'DAFTAR AKUN' : 'MASUK'}
                </h1>
                <p className="text-gray-600 mb-6 font-bold">PENGGUNA: {username}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="font-bold">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    <div>
                        <Label className="font-bold">Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 border-black rounded-none"
                        />
                    </div>
                    {isSignup && (
                        <div>
                            <Label className="font-bold">Konfirmasi Password</Label>
                            <Input
                                type="password"
                                value={confirmPw}
                                onChange={(e) => setConfirmPw(e.target.value)}
                                required
                                className="border-2 border-black rounded-none"
                            />
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-12 font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        disabled={loading}
                    >
                        {loading ? 'SABAR YA...' : isSignup ? 'BUAT AKUN' : 'MASUK SEKARANG'}
                    </Button>
                </form>

                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-sm font-bold text-black mt-6 hover:underline uppercase block text-center w-full"
                >
                    {isSignup ? 'Sudah punya akun? Login' : 'Butuh akun? Daftar di sini'}
                </button>
            </Card>
        </div>
    )
} 
