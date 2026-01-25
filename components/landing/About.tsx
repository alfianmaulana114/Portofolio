'use client'

import { FileText, Code2, Rocket, Brain, GraduationCap } from 'lucide-react'

export default function About() {
    return (
        <section id="about" className="py-8 relative overflow-hidden bg-muted/5">
            <div className="container mx-auto max-w-[1000px] px-4">

                {/* Section Title as Directory Path */}
                <div className="flex items-center gap-2 mb-8 font-mono text-[10px] text-muted-foreground opacity-70 uppercase tracking-widest">
                    <span className="text-primary">~/alfian</span>
                    <span>/</span>
                    <span className="text-foreground">readme.md</span>
                </div>

                {/* README Card */}
                <div className="border border-border rounded-lg bg-card shadow-lg overflow-hidden border-primary/10">

                    {/* Header */}
                    <div className="bg-muted/50 border-b border-border p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-mono text-sm font-bold">ABOUT_ALFIAN.md</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground opacity-50">
                            <span>Markdown</span>
                            <span>UTF-8</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <article className="font-sans text-base md:text-lg selection:bg-primary/20">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                <span className="text-primary text-xl">#</span> Hello, I'm Alfian.
                            </h2>

                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p>
                                    I am an <strong className="text-foreground font-black">IT Enthusiast</strong> continuously exploring and creating innovative technological solutions. My dedication is focused on developing expertise in <span className="text-primary font-bold">Software Development</span>, <span className="text-primary font-bold">Cloud Computing</span>, and <span className="text-primary font-bold">Project Management</span>.
                                </p>

                                <p>
                                    Currently, I am pursuing a <strong className="text-foreground">Bachelor's Degree in Information Systems at Bina Sarana Informatika University</strong>. This formal education provides me with a strong theoretical foundation, while my independent projects offer practical experience in building efficient systems.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 pt-6">
                                    <div className="bg-background/50 p-6 rounded-xl border border-border group hover:border-primary/30 transition-all shadow-sm">
                                        <GraduationCap className="h-6 w-6 text-primary mb-3" />
                                        <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-tight">Education</h3>
                                        <p className="text-xs leading-relaxed">
                                            Currently pursuing a <span className="text-foreground font-bold italic">Bachelor of Information Systems</span> at <strong className="text-primary">Bina Sarana Informatika University</strong>. Focused on system analysis, data management, and software engineering.
                                        </p>
                                    </div>

                                    <div className="bg-background/50 p-6 rounded-xl border border-border group hover:border-primary/30 transition-all shadow-sm">
                                        <Code2 className="h-6 w-6 text-primary mb-3" />
                                        <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-tight">Technical Focus</h3>
                                        <p className="text-xs leading-relaxed">
                                            Highly interested in building modern, responsive, and scalable web applications using <span className="text-foreground font-bold">TypeScript</span>, <span className="text-foreground font-bold">React/Next.js</span>, and <span className="text-foreground font-bold">Laravel</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
