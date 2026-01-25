'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Terminal, Moon, Sun, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { name: '_about', href: '#about' },
  { name: '_experience', href: '#experience' },
  { name: '_projects', href: '#projects' },
  { name: '_contact', href: '#contact' },
]

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const isDark = resolvedTheme === 'dark'

    if (!document.startViewTransition) {
      setTheme(isDark ? 'light' : 'dark')
      return
    }

    // Add animation direction class
    document.documentElement.classList.add(isDark ? 'theme-to-light' : 'theme-to-dark')

    const transition = document.startViewTransition(() => {
      setTheme(isDark ? 'light' : 'dark')
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-to-light', 'theme-to-dark')
    })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto h-full px-4 md:px-8 flex items-center max-w-[1000px]">
        {/* Left: Logo Area */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setActiveItem('')}
          >
            <div className="bg-primary/10 p-1.5 rounded-md group-hover:bg-primary/20 transition-colors">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="font-mono font-bold text-sm tracking-tight block">
              Alfian Eka Maulana
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 relative",
                activeItem === item.name
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions Area */}
        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-border/50 bg-muted/30 hover:bg-muted transition-colors"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-orange-500" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-0 hover:bg-primary/10 transition-colors">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] max-w-[300px] border-l border-border bg-background p-6">
                <SheetTitle className="text-left font-mono text-sm font-bold text-primary mb-8 border-b border-border pb-4">
                  MENU_NAVIGATION
                </SheetTitle>
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-3 rounded-md border border-border/50 bg-muted/20 text-xs font-mono text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <span>{item.name}</span>
                      <Terminal className="h-3 w-3 text-primary opacity-50" />
                    </Link>
                  ))}
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
