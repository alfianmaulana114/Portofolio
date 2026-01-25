'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function CTA() {
    return (
        <section id="contact" className="py-8 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 max-w-[900px]">

                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-widest border border-primary/20">
                            Let's Talk
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
                            Connect <br /> with me_
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-sm font-mono leading-relaxed">
                            I am always open to new projects, creative ideas, or career opportunities in the tech field. Feel free to reach out!
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs">
                                <Link href="mailto:alfianmaulana114@gmail.com">
                                    <Mail className="mr-2 h-4 w-4" /> send_mail()
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="font-mono text-xs border-primary/20 hover:bg-muted transition-all">
                                <Link href="https://linkedin.com/in/alfianekamaulana" target="_blank" className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4" /> linkedin
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-40 bg-border/50"></div>

                    <div className="flex-1">
                        <div className="bg-card border border-border p-6 rounded-xl font-mono text-xs shadow-sm relative group overflow-hidden">
                            {/* Decorative Background Icon */}
                            <Github className="absolute -bottom-10 -right-10 h-32 w-32 text-primary/5 group-hover:text-primary/10 transition-colors" />

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-muted-foreground/50 border-b border-border/40 pb-2">
                                    <span>connection.ts</span>
                                    <span>UTF-8</span>
                                </div>
                                <div className="space-y-1">
                                    <div><span className="text-purple-400">interface</span> <span className="text-blue-400">Collaboration</span> {'{'}</div>
                                    <div className="pl-4"><span className="text-purple-400">type</span>: <span className="text-orange-400">'freelance' | 'fulltime' | 'talk'</span>;</div>
                                    <div className="pl-4"><span className="text-purple-400">message</span>: <span className="text-blue-400">string</span>;</div>
                                    <div>{'}'}</div>
                                </div>
                                <div className="space-y-1 pt-2">
                                    <div><span className="text-purple-400">const</span> <span className="text-green-400">hireMe</span> = (props: Collaboration) =&gt; {'{'}</div>
                                    <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-blue-400">window</span>.location.href = <span className="text-orange-400">'mailto:alfianmaulana114@gmail.com'</span>;</div>
                                    <div>{'}'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
