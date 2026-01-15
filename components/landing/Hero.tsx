'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white px-4 pt-20">
      <div className="container mx-auto max-w-[1200px] grid md:grid-cols-2 gap-12 items-center relative z-10">

        <div className="flex flex-col gap-6 text-left animate-in slide-in-from-left duration-1000">

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-black leading-[1.1]">
            HALO, SAYA ALFIAN.
          </h1>

          <p className="text-lg md:text-xl text-gray-800 max-w-lg leading-relaxed font-bold border-l-4 border-black pl-4">
            Saya adalah seorang pembelajar yang antusias di dunia teknologi. Meskipun masih dalam tahap awal karir, saya memiliki dedikasi penuh untuk mendalami Project Management, Cloud Computing, dan Web Development. Siap belajar, berkembang, dan memberikan kontribusi terbaik.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild className="h-14 px-8 text-lg bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
              <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-14 px-8 text-lg bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
              <Link href="#experience">
                Lihat Progress Saya <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center animate-in slide-in-from-right duration-1000 delay-200">
          <div className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] flex items-center justify-center">
            {/* Polkadot Background */}
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #000 2px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            ></div>

            {/* Image Wrapper without Card */}
            <div className="relative z-10 w-full h-full group cursor-pointer">
              {/* Darker Black Background/Shadow on Hover */}
              <div className="absolute inset-x-[-5%] inset-y-[-5%] bg-black/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-out -z-10" />

              <Image
                src="/images/home1.png"
                alt="Alfian"
                fill
                unoptimized
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:brightness-90 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#about" className="text-gray-400 hover:text-black transition-colors">
          <ArrowRight className="h-6 w-6 rotate-90" />
        </Link>
      </div>
    </section>
  )
}
