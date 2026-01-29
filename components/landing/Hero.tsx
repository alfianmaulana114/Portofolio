'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Terminal, Github, Linkedin, Mail, Cpu, ChevronRight } from 'lucide-react'
import { CodeCard } from '@/components/ui/CodeCard'
import { SpotlightCard } from '@/components/react-bits/SpotlightCard'
import DecryptedText from '@/components/react-bits/DecryptedText'

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        setIsLoaded(true)
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString([], { hour12: false }))
        }
        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-32 pb-16 dot-grid bg-background">
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-0" />

            <div className="container mx-auto max-w-[1100px] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10 px-6">

                {/* Left Column: Intro */}
                <div className={`flex flex-col gap-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono text-muted-foreground/60 tracking-wider">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-muted/30">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span>ONLINE</span>
                            </div>
                            <span className="opacity-30">/</span>
                            <span>DEV.WORKSPACE</span>
                            <span className="opacity-30">/</span>
                            <span>{currentTime}</span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[0.95] text-foreground">
                                <DecryptedText
                                    text="HELLO, I AM"
                                    speed={20}
                                    maxIterations={5}
                                    sequential={true}
                                />
                            </h2>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-primary">
                                <DecryptedText
                                    text="ALFIAN"
                                    speed={50}
                                    maxIterations={15}
                                    sequential={true}
                                />
                                <span className="inline-block text-foreground">.</span>
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-xl space-y-4">
                        <p className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed">
                            An <span className="text-foreground">IT Enthusiast</span> continuously exploring and creating innovative technological solutions. Focused on <span className="text-foreground">Software Development</span>, <span className="text-foreground">Cloud Computing</span>, and <span className="text-foreground">Project Management</span>.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Button asChild size="lg" className="h-12 px-8 font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-none border border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary),0.3)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                            <Link href="#projects">
                                <Terminal className="mr-2 h-4 w-4" />
                                ./view_projects
                            </Link>
                        </Button>

                        <Button asChild variant="ghost" size="lg" className="h-12 px-8 font-mono text-sm rounded-none border border-border hover:bg-muted transition-all">
                            <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">
                                <Linkedin className="mr-2 h-4 w-4" />
                                contact_me
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/60">
                            <span>social_links</span>
                            <div className="flex gap-4">
                                <a href="https://github.com/alfianmaulana114" target="_blank" className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-all">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a href="https://linkedin.com/in/alfianekamaulana" target="_blank" className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-all">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href="mailto:alfianmaulana114@gmail.com" className="p-2 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-all">
                                    <Mail className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                        <div className="h-px flex-1 bg-border/40" />
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40">
                            <Cpu className="h-3 w-3" />
                            <span>v2.0.26</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Code Card */}
                <div className={`flex justify-center items-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="relative w-full max-w-[420px]">
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

                        <SpotlightCard
                            className="w-full"
                            spotlightColor="rgba(97, 218, 251, 0.2)"
                            borderColor="rgba(97, 218, 251, 0.2)"
                            enableStars={false}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                        >
                            <CodeCard title="alfian.json" className="bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden ring-1 ring-white/10">
                                <div className="p-7 font-mono text-[13px] leading-relaxed">
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50">01</span>
                                            <span><span className="text-purple-400">"name"</span>: <span className="text-blue-400">"Alfian Eka Maulana"</span>,</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50">02</span>
                                            <span><span className="text-purple-400">"focus"</span>: [</span>
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50">03</span>
                                            <span className="text-blue-400">"Software Development"</span>,
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50">04</span>
                                            <span className="text-blue-400">"Cloud Computing"</span>,
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50">05</span>
                                            <span className="text-blue-400">"Project Management"</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50:">06</span>
                                            <span>],</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50:">07</span>
                                            <span><span className="text-purple-400">"stack"</span>: [</span>
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50:">08</span>
                                            <span className="text-blue-400">"React/Next.js"</span>,
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50:">09</span>
                                            <span className="text-blue-400">"Laravel"</span>,
                                        </div>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-secondary-foreground/50:">10</span>
                                            <span className="text-blue-400">"Google Cloud"</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50:">11</span>
                                            <span>],</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-secondary-foreground/50">12</span>
                                            <span><span className="text-purple-400">"status"</span>: <span className="text-green-400">"ready_to_work"</span></span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-muted-foreground/30 font-mono italic">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                                            <span>// ping: 14ms</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        </div>
                                    </div>
                                </div>
                            </CodeCard>
                        </SpotlightCard>
                    </div>
                </div>

            </div>
        </section>
    )
}