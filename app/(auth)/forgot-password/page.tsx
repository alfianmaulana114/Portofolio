'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const redirectTo = `${window.location.origin}/auth/update-password`

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo,
            })
            if (error) throw error

            setSent(true)
            toast({ title: 'Success', description: 'Link reset password telah dikirim ke email Anda.' })
        } catch (error: any) {
            console.error('Forgot password error:', error)
            toast({ title: 'Error', description: error.message || 'Gagal mengirim email reset password.', variant: 'destructive' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                    RESET PASSWORD
                </h1>
                <div className="h-2 w-20 bg-black mx-auto"></div>
            </div>

            {sent ? (
                <div className="text-center space-y-6">
                    <p className="text-base font-medium">
                        Cek email <span className="font-black">{email}</span> untuk link reset password.
                    </p>
                    <Link href="/loginalfian">
                        <Button
                            type="button"
                            className="bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-14 font-black text-lg uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                        >
                            Kembali ke Login
                        </Button>
                    </Link>
                </div>
            ) : (
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

                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-16 font-black text-xl uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'MENGIRIM...' : 'KIRIM LINK RESET'}
                    </Button>

                    <div className="text-center">
                        <Link
                            href="/loginalfian"
                            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                        >
                            Kembali ke Login
                        </Link>
                    </div>
                </form>
            )}
        </Card>
    )
}
