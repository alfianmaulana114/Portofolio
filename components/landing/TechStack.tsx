'use client'

import {
    Code2,
    Cloud,
    Globe,
    Database,
    Terminal,
    Github,
    Flame,
    Cpu,
    Smartphone,
    Box,
    Activity,
    CheckCircle2
} from 'lucide-react'

const techStack = [
    { name: 'flutter', icon: Smartphone, color: 'text-blue-500', category: 'mobile' },
    { name: 'git', icon: Terminal, color: 'text-orange-500', category: 'tool' },
    { name: 'github', icon: Github, color: 'text-foreground', category: 'vcs' },
    { name: 'gcp', icon: Cloud, color: 'text-blue-400', category: 'cloud' },
    { name: 'javascript', icon: Code2, color: 'text-yellow-400', category: 'lang' },
    { name: 'laravel', icon: Flame, color: 'text-red-500', category: 'framework' },
    { name: 'mysql', icon: Database, color: 'text-blue-600', category: 'db' },
    { name: 'next.js', icon: Globe, color: 'text-foreground', category: 'framework' },
    { name: 'node', icon: Box, color: 'text-green-600', category: 'runtime' },
    { name: 'php', icon: Code2, color: 'text-indigo-400', category: 'lang' },
    { name: 'python', icon: Code2, color: 'text-blue-500', category: 'lang' },
    { name: 'react', icon: Cpu, color: 'text-cyan-400', category: 'library' },
    { name: 'supabase', icon: Database, color: 'text-green-400', category: 'baas' },
    { name: 'typescript', icon: Code2, color: 'text-blue-600', category: 'lang' },
    { name: 'vite', icon: Flame, color: 'text-purple-500', category: 'tool' }
].sort((a, b) => a.name.localeCompare(b.name))

export default function TechStack() {
    return (
        <section id="techstack" className="py-8 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">

                <div className="flex items-center gap-2 mb-8 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    <Activity className="h-3 w-3 text-primary animate-pulse" />
                    <span>system_modules</span>
                    <div className="h-px bg-border flex-1 ml-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3 p-2.5 rounded border border-border bg-card/50 hover:bg-muted/50 transition-all group cursor-default">
                            <div className={`p-1.5 rounded bg-muted ${tech.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                                <tech.icon className={`h-4 w-4 ${tech.color}`} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-bold text-xs truncate group-hover:text-primary transition-colors">
                                    {tech.name}
                                </span>
                                <span className="text-[9px] text-muted-foreground font-mono uppercase opacity-60">
                                    {tech.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
