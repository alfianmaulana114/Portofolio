import { Experience as ExperienceType } from '@/lib/types'

export default function Experience({ data }: { data: ExperienceType[] | null }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="container mx-auto max-w-[1000px] px-4 md:px-8">
        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">PENGALAMAN KERJA</h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-black">
          {data.map((item, index) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

              {/* Icon / Dot */}
              <div className="flex items-center justify-center w-10 h-10 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-lg text-black uppercase">{item.title}</h3>
                  <span className="text-xs font-bold px-3 py-1 bg-black text-white border-2 border-black whitespace-nowrap">
                    {new Date(item.start_date).getFullYear()} - {item.is_current ? 'Sekarang' : (item.end_date ? new Date(item.end_date).getFullYear() : 'Sekarang')}
                  </span>
                </div>
                <div className="text-black font-bold mb-3 uppercase tracking-wide border-b-2 border-black pb-1 inline-block">{item.company}</div>
                <p className="text-gray-800 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
