import { Experience as ExperienceType } from '@/lib/types'
import Image from 'next/image'
import { Calendar, Building, Terminal, Layers, Globe } from 'lucide-react'

export default function Experience({ data, title = "PENGALAMAN" }: { data: ExperienceType[] | null, title?: string }) {
  if (!data || data.length === 0) return null;

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="py-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements simplified */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none hidden lg:block translate-x-1/2">
        <Layers size={200} />
      </div>

      <div className="container mx-auto max-w-[850px] px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-gray-400" />
            <span className="text-[10px] font-black tracking-[0.3em] text-gray-400">HISTORY.LOG</span>
          </div>
          <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase">{title}</h2>
          <div className="h-1.5 w-16 bg-black"></div>
        </div>

        <div className="relative space-y-8">
          {/* Thin Timeline Line */}
          <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-1 bg-black/10 -translate-x-1/2"></div>

          {data.map((item, index) => (
            <div key={item.id} className={`relative flex flex-col md:flex-row items-center justify-between gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

              {/* Timeline Point */}
              <div className="absolute left-[21px] md:left-1/2 top-8 -translate-x-1/2 flex items-center justify-center w-4 h-4 border-2 border-black bg-white z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-yellow-400 transition-colors duration-300"></div>

              {/* Card Side */}
              <div className="w-full md:w-[45%] ml-10 md:ml-0 group">
                <div className="relative bg-white border-2 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                  {/* Decorative Corner */}
                  <div className="absolute top-2 right-2 opacity-10">
                    <Globe size={24} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      {item.image_url && (
                        <div className="w-20 h-20 relative border-2 border-black shrink-0 bg-gray-50 overflow-hidden">
                          <Image src={item.image_url} alt={item.company} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="inline-block px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-[0.2em] mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-black uppercase leading-tight">{item.title}</h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mt-1">
                          <Building className="h-3 w-3" />
                          {item.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] font-black bg-gray-50 border border-black/10 px-3 py-1.5 w-fit rounded-full">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                      {' > '}
                      {item.is_current ? 'STILL RUNNING' : (item.end_date ? new Date(item.end_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'STILL RUNNING')}
                    </div>

                    <div className="text-[12px] text-gray-700 font-medium leading-relaxed border-t border-black/5 pt-3">
                      <div className="font-mono text-[9px] text-gray-400 mb-1 opacity-50">{"/* description */"}</div>
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacing Side */}
              <div className="hidden md:block md:w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
