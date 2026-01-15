'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Briefcase,
    Award,
    Code,
    LogOut,
    ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth-actions'

const sidebarItems = [
    {
        title: 'RINGKASAN',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'PENGALAMAN',
        href: '/dashboard/experiences',
        icon: Briefcase
    },
    {
        title: 'SERTIFIKAT',
        href: '/dashboard/certificates',
        icon: Award
    },
    {
        title: 'PROYEK',
        href: '/dashboard/projects',
        icon: ShieldCheck
    },
    {
        title: 'KEAHLIAN',
        href: '/dashboard/skills',
        icon: Code
    }
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-72 flex-col border-r-4 border-black bg-white">
            <div className="flex h-24 items-center border-b-4 border-black px-8 bg-white">
                <Link href="/" className="flex items-center gap-3 font-black text-2xl uppercase tracking-tighter hover:scale-105 transition-transform">
                    <div className="bg-black text-white p-1">
                        <ShieldCheck className="h-6 w-6 stroke-[3px]" />
                    </div>
                    <span>ADMIN</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-10">
                <nav className="space-y-4 px-6">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 text-sm font-black transition-all duration-200 border-2 uppercase tracking-widest",
                                    isActive
                                        ? "bg-black text-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                        : "text-black border-black/10 hover:border-black hover:bg-gray-50 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive ? "stroke-[3px]" : "stroke-[2px]")} />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t-4 border-black p-6 bg-gray-50">
                <form action={logout}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-4 h-14 px-5 text-red-600 hover:bg-red-50 hover:text-red-700 border-2 border-transparent hover:border-red-600 font-black uppercase tracking-widest transition-all"
                    >
                        <LogOut className="h-5 w-5 stroke-[3px]" />
                        KELUAR
                    </Button>
                </form>
            </div>
        </div>
    )
}
