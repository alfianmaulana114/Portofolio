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
  { name: 'Tentang', href: '#about' },
  { name: 'Pengalaman', href: '#experience' },
  { name: 'Skill', href: '#skills' },
  { name: 'Kontak', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto h-full px-4 md:px-8 flex items-center justify-between max-w-[1200px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans text-xl font-black tracking-tighter text-black hover:scale-105 transition-transform"
        >
          ALFIAN.DEV
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black transition-all"
            >
              {item.name}
            </Link>
          ))}
          <Button
            asChild
            variant="default"
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-full h-10 px-6 text-sm font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Link href="/login/alfian">
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0 hover:bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetTitle className="text-left font-black text-2xl mb-8">MENU</SheetTitle>
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-black hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-gray-100">
                  <Button
                    asChild
                    className="w-full bg-black text-white hover:bg-gray-900 h-12 rounded-full text-lg font-bold"
                  >
                    <Link href="/login/alfian" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
