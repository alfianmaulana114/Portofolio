import { GraduationCap, Code2, Cpu } from 'lucide-react'

export default function About() {
    return (
        <section id="about" className="py-12 md:py-20 mt-12 md:mt-20 bg-transparent relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-10 right-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none rotate-12 hidden md:block text-black">
                01010110
            </div>
            <div className="absolute bottom-10 left-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none -rotate-12 hidden md:block text-black">
                {"<Dev />"}
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
                {/* Section Header - File style */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Markdown</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-[10px] font-mono text-gray-500">UTF-8</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter uppercase text-black">ABOUT_ALFIAN.md</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {/* Intro Block */}
                    <div className="relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-1 bg-black hidden md:block group-hover:w-20 transition-all duration-500"></div>
                        <div className="absolute -top-4 -left-4 w-1 h-12 bg-black hidden md:block group-hover:h-20 transition-all duration-500"></div>
                        <div className="relative bg-white p-5 md:p-6 border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 mb-3">## Hello, I&apos;m Alfian.</p>
                            <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed">
                                I am an <strong className="text-black">IT Enthusiast</strong> continuously exploring and creating innovative technological solutions. My dedication is focused on developing expertise in <strong className="text-black">Software Development</strong>, <strong className="text-black">Cloud Computing</strong>, and <strong className="text-black">Project Management</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Two-column: Education + Technical Focus */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {/* Education Card */}
                        <div className="relative group">
                            <div className="absolute top-0 right-0 w-8 h-1 bg-black hidden md:block group-hover:w-12 transition-all duration-500"></div>
                            <div className="relative bg-white border-2 md:border-4 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-black shrink-0" />
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">### Education</p>
                                </div>
                                <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed flex-1">
                                    Currently pursuing a <strong className="text-black">Bachelor of Information Systems at Bina Sarana Informatika University</strong>. Focused on system analysis, data management, and software engineering. This formal education provides a strong theoretical foundation, while independent projects offer practical experience in building efficient systems.
                                </p>
                            </div>
                        </div>

                        {/* Technical Focus Card */}
                        <div className="relative group">
                            <div className="absolute top-0 right-0 w-8 h-1 bg-black hidden md:block group-hover:w-12 transition-all duration-500"></div>
                            <div className="relative bg-white border-2 md:border-4 border-black p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code2 className="h-4 w-4 md:h-5 md:w-5 text-black shrink-0" />
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">### Technical Focus</p>
                                </div>
                                <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed flex-1">
                                    Highly interested in building modern, responsive, and scalable web applications using <strong className="text-black">TypeScript</strong>, <strong className="text-black">React/Next.js</strong>, and <strong className="text-black">Laravel</strong>.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-black/10">
                                    {['TypeScript', 'React', 'Next.js', 'Laravel', 'Google Cloud'].map((tech) => (
                                        <span key={tech} className="inline-block px-2 py-0.5 bg-black text-white text-[8px] md:text-[9px] font-black uppercase tracking-tight">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent - system_modules style */}
                    <div className="flex justify-center pt-2">
                        <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-mono text-gray-400">
                            <Cpu className="h-3 w-3" />
                            <span>system_modules loaded</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
