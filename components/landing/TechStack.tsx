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
    Zap
} from 'lucide-react'

const techStack = [
    { name: 'Flutter', icon: Smartphone, color: 'group-hover:text-[#02569B] group-hover:drop-shadow-[0_0_8px_rgba(2,86,155,0.4)]', comment: 'Cross-platform SDK', category: 'MOBILE' },
    { name: 'Git', icon: Terminal, color: 'group-hover:text-[#F05032] group-hover:drop-shadow-[0_0_8px_rgba(240,80,50,0.4)]', comment: 'Branching/Merging', category: 'VCS' },
    { name: 'Github', icon: Github, color: 'group-hover:text-[#181717] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]', comment: 'Collaboration', category: 'REMOTE' },
    { name: 'Google Cloud', icon: Cloud, color: 'group-hover:text-[#4285F4] group-hover:drop-shadow-[0_0_8px_rgba(66,133,244,0.4)]', comment: 'Cloud Infrastructure', category: 'CLOUD' },
    { name: 'Javascript', icon: Code2, color: 'group-hover:text-[#F7DF1E] group-hover:drop-shadow-[0_0_8px_rgba(247,223,30,0.4)]', comment: 'ES6+ Logic', category: 'LANGUAGE' },
    { name: 'Laravel', icon: Flame, color: 'group-hover:text-[#FF2D20] group-hover:drop-shadow-[0_0_8px_rgba(255,45,32,0.4)]', comment: 'Full-stack Artisan', category: 'FRAMEWORK' },
    { name: 'MySQL', icon: Database, color: 'group-hover:text-[#4479A1] group-hover:drop-shadow-[0_0_8px_rgba(68,121,161,0.4)]', comment: 'RDBMS Queries', category: 'STORAGE' },
    { name: 'Next.js', icon: Globe, color: 'group-hover:text-[#000000] group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]', comment: 'App Router / SSR', category: 'WEB' },
    { name: 'Node JS', icon: Box, color: 'group-hover:text-[#339933] group-hover:drop-shadow-[0_0_8px_rgba(51,153,51,0.4)]', comment: 'V8 Engine Runtime', category: 'RUNTIME' },
    { name: 'PHP', icon: Code2, color: 'group-hover:text-[#777BB4] group-hover:drop-shadow-[0_0_8px_rgba(119,123,180,0.4)]', comment: 'Server side 8.x', category: 'LANGUAGE' },
    { name: 'Python', icon: Code2, color: 'group-hover:text-[#3776AB] group-hover:drop-shadow-[0_0_8px_rgba(55,118,171,0.4)]', comment: 'Backend Scripting', category: 'LANGUAGE' },
    { name: 'React', icon: Cpu, color: 'group-hover:text-[#61DAFB] group-hover:drop-shadow-[0_0_8px_rgba(97,218,251,0.4)]', comment: 'Component-based UI', category: 'LIBRARY' },
    { name: 'Supabase', icon: Database, color: 'group-hover:text-[#3ECF8E] group-hover:drop-shadow-[0_0_8px_rgba(62,207,142,0.4)]', comment: 'PostgreSQL BaaS', category: 'BACKEND' },
    { name: 'Typescript', icon: Code2, color: 'group-hover:text-[#3178C6] group-hover:drop-shadow-[0_0_8px_rgba(49,120,198,0.4)]', comment: 'Static Typing', category: 'LANGUAGE' },
    { name: 'Vite', icon: Flame, color: 'group-hover:text-[#646CFF] group-hover:drop-shadow-[0_0_8px_rgba(100,108,255,0.4)]', comment: 'Module Bundler', category: 'TOOL' }
].sort((a, b) => a.name.localeCompare(b.name))

export default function TechStack() {
    return (
        <section id="techstack" className="py-8 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="flex items-center gap-2 mb-3">
                        <Activity size={16} className="text-yellow-500 animate-pulse" />
                        <span className="text-[10px] md:text-[12px] font-black tracking-[0.5em]">SYSTEM_MODULES_01</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter uppercase italic">Tech Stack</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="group relative">
                            <div className="relative bg-white border border-black p-2 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-3 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none overflow-hidden">

                                <div className={`transition-all duration-500 transform group-hover:scale-110 ${tech.color}`}>
                                    <tech.icon className="h-6 w-6 md:h-10 md:w-10 stroke-[1.5px]" />
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[6px] md:text-[8px] font-black uppercase tracking-tighter truncate w-full">
                                        {tech.name}
                                    </span>
                                </div>

                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                                    <Zap size={8} className="text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
