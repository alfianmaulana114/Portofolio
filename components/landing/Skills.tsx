import { Skill } from '@/lib/types'

export default function Skills({ data }: { data: Skill[] | null }) {
  if (!data || data.length === 0) return null;

  // Group by category
  const skillsByCategory = data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-6 bg-transparent">
      <div className="container mx-auto max-w-[1000px] px-4 md:px-8">
        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">KEMAMPUAN TEKNIS</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-bold border-b-2 border-black pb-2 inline-block">{category}</h3>
                <span className="text-[10px] font-mono text-gray-400 opacity-50">{"// log_category"}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-default font-bold text-sm"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
