'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Linkedin, Terminal, Database } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white px-4 md:px-8 pt-24 pb-12">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Subtle Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* Floating IT Elements */}
                <div className="absolute top-[15%] left-[5%] animate-bounce duration-[3000ms] opacity-20 hidden md:block text-black">
                    <div className="px-3 py-1 border-2 border-black font-black text-[10px] tracking-widest uppercase italic font-mono">{"SELECT * FROM api"}</div>
                </div>
                <div className="absolute top-[25%] right-[10%] animate-pulse opacity-20 hidden md:block text-black">
                    <Database className="h-10 w-10" />
                </div>
                <div className="absolute bottom-[20%] left-[10%] animate-bounce duration-[4000ms] opacity-20 hidden md:block text-black">
                    <Terminal className="h-8 w-8" />
                </div>
            </div>

            <div className="container mx-auto max-w-[1200px] grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 px-0">

                <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left items-center md:items-start animate-in slide-in-from-left duration-1000">
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-400 border-2 border-black w-fit shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[10px] font-black uppercase tracking-tighter">Status: Open to Work</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-black leading-[1.1] uppercase">
                        HALO, SAYA <br className="md:hidden" /> <span className="italic underline decoration-4 underline-offset-8">ALFIAN.</span>
                    </h1>

                    <p className="text-sm md:text-xl text-gray-800 max-w-lg leading-relaxed font-bold border-black md:border-l-4 border-l-0 md:pl-4 px-2 md:px-4">
                        Saya adalah seorang pembelajar yang antusias di dunia teknologi. Memiliki dedikasi penuh untuk mendalami Project Management, Cloud Computing, dan Web Development.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 md:pt-4 w-full">
                        <Button asChild className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-white text-black hover:bg-black hover:text-white border-2 border-black transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] w-full sm:w-auto">
                            <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">
                                <Linkedin className="mr-2 h-4 w-4 md:h-5 md:w-5" /> LinkedIn
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center items-center animate-in slide-in-from-right duration-1000 delay-200">
                    <div className="relative w-[260px] h-[260px] md:w-[480px] md:h-[480px] flex items-center justify-center">
                        {/* Polkadot Background */}
                        <div
                            className="absolute inset-0 z-0 opacity-10 md:opacity-20"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #000 2px, transparent 0)',
                                backgroundSize: '20px 20px md:24px 24px'
                            }}
                        ></div>

                        {/* Image Wrapper */}
                        <div className="relative z-10 w-full h-full group">
                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 border-black -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 border-black translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />

                            <Image
                                src="/images/home1.png"
                                alt="Alfian"
                                fill
                                quality={100}
                                unoptimized
                                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                priority
                            />

                            {/* Floating Tech Chips around Image */}
                            <div className="absolute -top-4 -right-2 bg-white border-2 border-black px-2 py-0.5 font-black text-[8px] md:text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                BACKEND_DEV
                            </div>
                            <div className="absolute -bottom-4 -left-2 bg-white border-2 border-black px-2 py-0.5 font-black text-[8px] md:text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                CLOUD_READY
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <Link href="#about" className="text-gray-400 hover:text-black transition-colors">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                </Link>
            </div>
        </section>
    )
}
