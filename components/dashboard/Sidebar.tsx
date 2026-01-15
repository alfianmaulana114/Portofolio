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
    User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth-actions'

const sidebarItems = [
    {
        title: 'Overview',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Experiences',
        href: '/dashboard/experiences',
        icon: Briefcase
    },
    {
        title: 'Certificates',
        href: '/dashboard/certificates',
        icon: Award
    },
    {
        title: 'Skills',
        href: '/dashboard/skills',
        icon: Code
    }
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span>Alfian's Portfolio</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-black text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t p-4">
                <form action={logout}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </form>
            </div>
        </div>
    )
}
