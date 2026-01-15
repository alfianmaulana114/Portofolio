import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section id="contact" className="py-16 bg-transparent">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto border-2 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gray-50">
          <h2 className="text-5xl font-black mb-6 tracking-tight text-black">SIAP KOLABORASI?</h2>
          <p className="text-gray-800 mb-10 max-w-lg mx-auto text-lg leading-relaxed font-medium">
            Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.
          </p>
          <Button asChild size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black h-16 px-12 rounded-full text-xl font-bold transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank">Hubungi Saya</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
