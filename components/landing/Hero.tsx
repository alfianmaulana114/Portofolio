'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Terminal, Github, Linkedin, Mail } from 'lucide-react'
import { CodeCard } from '@/components/ui/CodeCard'

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden pt-24 pb-8">
            <div className="container mx-auto max-w-[1000px] grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10 px-4">

                {/* Left Column: Intro - Order 1 on Mobile */}
                <div className="flex flex-col gap-5 order-1">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]">
                        HELLO, I AM <br /> <span className="text-primary">ALFIAN.</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-lg font-mono leading-relaxed">
                        An <span className="text-foreground font-bold">IT Enthusiast</span> dedicated to exploring and creating innovative technological solutions. Focused on developing expertise in <span className="text-foreground font-bold">Software Development</span>, <span className="text-foreground font-bold">Cloud Computing</span>, and <span className="text-foreground font-bold">Project Management</span>.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-2">
                        <Button asChild className="font-mono text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md border border-transparent shadow-sm transition-all hover:-translate-y-0.5">
                            <Link href="#projects">
                                <Terminal className="mr-2 h-3.5 w-3.5" />
                                ./view_projects
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="font-mono text-xs rounded-md border-border hover:bg-muted transition-all hover:-translate-y-0.5">
                            <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">
                                <Linkedin className="mr-2 h-3.5 w-3.5" />
                                contact_me
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-5 mt-4 border-t border-border/30 pt-4">
                        <a href="https://github.com/alfianmaulana114" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="https://linkedin.com/in/alfianekamaulana" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="mailto:alfianmaulana114@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Right Column: Code Card - Order 2 on Mobile */}
                <div className="flex justify-center items-center order-2 animate-in fade-in zoom-in duration-700">
                    <div className="relative w-full max-w-[380px]">
                        <CodeCard title="alfian.json" className="bg-card/90 backdrop-blur-md border-primary/20 shadow-xl">
                            <div className="p-6 font-mono text-xs leading-relaxed">
                                <div className="space-y-1.5">
                                    <div>
                                        <span className="text-purple-400">"name"</span>: <span className="text-blue-400">"Alfian"</span>,
                                    </div>
                                    <div>
                                        <span className="text-purple-400">"focus"</span>: [
                                        <div className="pl-4">
                                            <span className="text-blue-400">"Software Development"</span>,
                                            <br />
                                            <span className="text-blue-400">"Cloud Computing"</span>,
                                            <br />
                                            <span className="text-blue-400">"Project Management"</span>
                                        </div>
                                        ],
                                    </div>
                                    <div>
                                        <span className="text-purple-400">"stack"</span>: [
                                        <div className="pl-4">
                                            <span className="text-blue-400">"React/Next.js"</span>,
                                            <br />
                                            <span className="text-blue-400">"Laravel"</span>,
                                            <br />
                                            <span className="text-blue-400">"Node.js"</span>,
                                            <br />
                                            <span className="text-blue-400">"Google Cloud"</span>
                                        </div>
                                        ],
                                    </div>
                                    <div>
                                        <span className="text-purple-400">"status"</span>: <span className="text-green-400">"ready_to_work"</span>
                                    </div>
                                </div>
                                <div className="mt-5 pt-3 border-t border-border/30 flex justify-between items-center text-[10px] text-muted-foreground/40 italic">
                                    <span>// ping: 14ms</span>
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        </CodeCard>
                    </div>
                </div>

            </div>
        </section>
    )
}
