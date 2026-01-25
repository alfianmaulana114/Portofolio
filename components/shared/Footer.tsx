'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Instagram, ExternalLink } from 'lucide-react'

const footerLinks = [
    {
        title: 'GENERAL',
        links: [
            { name: 'Home', href: '/' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Experience', href: '#experience' },
        ]
    },
    {
        title: 'THE WEBSITE',
        links: [
            { name: 'Tech Stack', href: '#techstack' },
            { name: 'Certificates', href: '#certificates' },
            { name: 'GitHub Grid', href: '#github' },
        ]
    },
    {
        title: 'RESOURCES',
        links: [
            { name: 'GitHub', href: 'https://github.com/alfianmaulana114', isExternal: true },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/alfianekamaulana', isExternal: true },
            { name: 'Instagram', href: 'https://instagram.com/alfianekamaulana', isExternal: true },
            { name: 'Email', href: 'mailto:alfianmaulana114@gmail.com' },
        ]
    }
]

const socialIcons = [
    { icon: Mail, href: 'mailto:alfianmaulana114@gmail.com' },
    { icon: Linkedin, href: 'https://linkedin.com/in/alfianekamaulana' },
    { icon: Github, href: 'https://github.com/alfianmaulana114' },
    { icon: Instagram, href: 'https://instagram.com/alfianekamaulana' },
]

export default function Footer() {
    return (
        <footer className="bg-background pt-20 pb-10 border-t border-border/50 font-sans">
            <div className="container mx-auto px-4 max-w-[1000px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tight">Alfian Maulana</h3>
                            <p className="text-muted-foreground text-sm font-medium">IT Enthusiast & S1 Sistem Informasi</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {socialIcons.map((social, i) => (
                                <Link key={i} href={social.href} target="_blank" className="text-muted-foreground/60 hover:text-primary transition-all hover:-translate-y-1">
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h4 className="text-[10px] font-bold text-muted-foreground/50 tracking-[0.2em] uppercase">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            target={link.isExternal ? '_blank' : undefined}
                                            className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                                        >
                                            {link.name}
                                            {link.isExternal && <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-10 border-t border-border/40 text-center">
                    <p className="text-muted-foreground/50 text-xs font-medium">
                        Copyright © {new Date().getFullYear()} Alfian Maulana. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
