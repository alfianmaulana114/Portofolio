'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessionReady, setSessionReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        let cancelled = false
        let subscription: any
        let timeout: NodeJS.Timeout

        async function initSession() {
            // 1. Periksa parameter query (untuk alur PKCE)
            const searchParams = new URLSearchParams(window.location.search)
            const queryError = searchParams.get('error') || searchParams.get('error_description')
            if (queryError) {
                setError(`Link tidak valid: ${queryError}. Silakan minta link reset password baru.`)
                return
            }

            const code = searchParams.get('code')
            if (code) {
                const { data, error } = await supabase.auth.exchangeCodeForSession(code)
                if (!error && data.session && !cancelled) {
                    cancelled = true
                    setSessionReady(true)
                    // Bersihkan parameter query dari URL
                    const newUrl = window.location.pathname + window.location.hash
                    window.history.replaceState({}, '', newUrl)
                    return
                } else if (error) {
                    setError(`Gagal memverifikasi token: ${error.message}. Silakan minta link reset password baru.`)
                    return
                }
            }

            // 2. Periksa hash URL (untuk alur implicit/hash legacy)
            const hash = window.location.hash

            if (hash && hash.includes('error=')) {
                const params = new URLSearchParams(hash.replace('#', ''))
                const errCode = params.get('error_code') || params.get('error')
                setError(`Link tidak valid (${errCode}). Silakan minta link reset password baru.`)
                return
            }

            if (hash && hash.includes('type=recovery')) {
                const params = new URLSearchParams(hash.replace('#', ''))
                const accessToken = params.get('access_token')
                const refreshToken = params.get('refresh_token')
                if (accessToken) {
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken || '',
                    })
                    if (!error && data.session && !cancelled) {
                        cancelled = true
                        setSessionReady(true)
                        window.location.hash = ''
                        return
                    }
                }
            }

            // 3. Periksa apakah sudah ada sesi aktif
            const { data: { session } } = await supabase.auth.getSession()
            if (session && !cancelled) {
                cancelled = true
                setSessionReady(true)
                return
            }

            const sub = supabase.auth.onAuthStateChange((event) => {
                if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
                    cancelled = true
                    setSessionReady(true)
                }
            })
            subscription = sub.data.subscription

            timeout = setTimeout(() => {
                if (!cancelled) {
                    setError('Token tidak valid atau sudah kedaluwarsa. Silakan minta link reset password baru.')
                }
            }, 5000)
        }

        initSession()

        return () => {
            cancelled = true
            subscription?.unsubscribe()
            clearTimeout(timeout)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast({ title: 'Error', description: 'Password tidak cocok.', variant: 'destructive' })
            return
        }

        if (password.length < 6) {
            toast({ title: 'Error', description: 'Password minimal 6 karakter.', variant: 'destructive' })
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error

            toast({ title: 'Success', description: 'Password berhasil diubah!' })
            router.push('/loginalfian')
        } catch (error: any) {
            toast({ title: 'Error', description: error.message || 'Gagal mengubah password.', variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    if (!sessionReady && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <Card className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none text-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">VERIFIKASI...</h1>
                    <div className="h-2 w-20 bg-black mx-auto"></div>
                    <p className="mt-6 text-sm font-medium">Memverifikasi token reset password...</p>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <Card className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none text-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">GAGAL</h1>
                    <div className="h-2 w-20 bg-black mx-auto"></div>
                    <p className="mt-6 text-sm font-medium text-red-600">{error}</p>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                        PASSWORD BARU
                    </h1>
                    <div className="h-2 w-20 bg-black mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="font-black uppercase text-sm tracking-widest">Password Baru</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Minimal 6 karakter"
                            className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-black transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="font-black uppercase text-sm tracking-widest">Konfirmasi Password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Ketik ulang password"
                            className="border-2 border-black rounded-none h-12 text-lg focus-visible:ring-0 focus-visible:border-black transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-16 font-black text-xl uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'MENYIMPAN...' : 'SIMPAN PASSWORD'}
                    </Button>
                </form>
            </Card>
        </div>
    )
}
