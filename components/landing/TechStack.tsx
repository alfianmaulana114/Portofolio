import {
    Layers,
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
    Server,
    Search,
    Network,
    Zap,
    Activity,
    Lock,
    Command
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
            {/* Background Decorative Elements removed for tighter layout */}

            <div className="container mx-auto px-4 md:px-8 max-w-[1100px] relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                    <div className="flex items-center gap-3 mb-4">
                        <Activity size={18} className="text-yellow-500 animate-pulse" />
                        <span className="text-[12px] font-black tracking-[0.5em] text-black">SYSTEM_MODULES_01</span>
                        <div className="h-[1px] w-20 bg-black/10"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">TECH STACK</h2>
                    <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-loose max-w-md">
                        {"// core_backend_infrastructure_v2.0"} <br />
                        {"// all_systems_operational"}
                    </p>
                    <div className="mt-8 h-2 w-24 bg-black"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="group relative">
                            {/* Outer Glow Effect on Hover */}
                            <div className={`absolute -inset-0.5 opacity-0 group-hover:opacity-20 transition duration-500 blur-xl ${tech.name === 'Laravel' ? 'bg-red-500' : 'bg-black'}`}></div>

                            <div className="relative bg-white border-2 border-black p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none hover:bg-white overflow-hidden">

                                {/* Technical scanline effect on hover */}
                                <div className="absolute inset-x-0 h-[2px] bg-black opacity-[0.05] top-0 group-hover:top-full transition-all duration-[1500ms] linear repeat-infinite"></div>

                                <div className="absolute top-2 left-2 flex gap-1">
                                    <div className="w-1 h-1 bg-black/10"></div>
                                    <div className="w-4 h-[1px] bg-black/5 mt-[2px]"></div>
                                </div>

                                <div className={`transition-all duration-500 transform group-hover:scale-110 ${tech.color}`}>
                                    <tech.icon className="h-12 w-12 stroke-[1.25px]" />
                                </div>

                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="text-[8px] font-mono text-gray-300 uppercase tracking-tighter mb-1">
                                        {`REQ_${tech.category}`}
                                    </span>
                                    <span className="text-sm font-black uppercase tracking-tight group-hover:italic transition-all">
                                        {tech.name}
                                    </span>
                                    <div className="w-0 group-hover:w-full h-[3px] bg-black transition-all duration-300 mt-1"></div>
                                </div>

                                {/* Floating Code Comment - Always present but animated */}
                                <div className="absolute -bottom-10 group-hover:bottom-2 transition-all duration-500">
                                    <span className="text-[7px] font-mono font-bold text-gray-400">
                                        {`/* ${tech.comment} */`}
                                    </span>
                                </div>

                                {/* Status Icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Visual Bottom Bar */}
                <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-20 select-none">
                    <div className="flex items-center gap-2">
                        <Database size={14} /> <span className="text-[10px] font-mono">DB_CLUSTER: OK</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Server size={14} /> <span className="text-[10px] font-mono">SRV_SYNC: 99.9%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Network size={14} /> <span className="text-[10px] font-mono">NET_BANDWIDTH: OPTIMAL</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
