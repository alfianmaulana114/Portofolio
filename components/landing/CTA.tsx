import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function CTA() {
    return (
        <section id="contact" className="py-12 md:py-16 bg-transparent">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <div className="max-w-[1200px] mx-auto border-2 border-black p-6 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-gray-50">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight text-black uppercase">SIAP KOLABORASI?</h2>
                    <p className="text-sm md:text-lg text-gray-800 mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed font-medium px-4">
                        Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda. Hubungi saya langsung via email atau LinkedIn.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button asChild className="bg-black text-white hover:bg-white hover:text-black border-2 border-black h-12 md:h-16 px-8 md:px-12 rounded-none text-base md:text-xl font-bold transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] w-full sm:w-auto">
                            <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">LinkedIn</Link>
                        </Button>
                        <Button asChild variant="outline" className="bg-white text-black hover:bg-black hover:text-white border-2 border-black h-12 md:h-16 px-8 md:px-12 rounded-none text-base md:text-xl font-bold transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] w-full sm:w-auto">
                            <Link href="mailto:alfianmaulana114@gmail.com">
                                <Mail className="mr-2 h-5 w-5" /> Email Me
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
