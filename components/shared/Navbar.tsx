'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from '@/components/ui/sheet'

const navItems = [
  { name: 'TENTANG', href: '#about' },
  { name: 'PENGALAMAN', href: '#pengalaman-profesional' },
  { name: 'PROYEK', href: '#projects' },
  { name: 'SERTIFIKAT', href: '#certificates' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white">
      <div className="container mx-auto h-full px-4 md:px-8 flex items-center justify-between max-w-[1200px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans text-2xl font-black tracking-tighter text-black hover:italic transition-all"
        >
          ALFIAN
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-black text-black border-b-2 border-transparent hover:border-black transition-all tracking-widest"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0 border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-gray-50 flex items-center justify-center">
                <Menu className="h-6 w-6 stroke-[3px]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white border-l-4 border-black p-8">
              <SheetTitle className="text-left font-black text-3xl mb-12 uppercase tracking-tighter italic border-b-4 border-black pb-4">NAVIGASI</SheetTitle>
              <div className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-black hover:italic hover:translate-x-2 transition-all tracking-tight uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
