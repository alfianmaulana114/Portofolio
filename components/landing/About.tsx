import { GraduationCap, Code2, Cpu } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-8 md:py-14 mt-8 md:mt-14 bg-transparent relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-10 right-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none rotate-12 hidden md:block text-black">
        01010110
      </div>
      <div className="absolute bottom-10 left-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none -rotate-12 hidden md:block text-black">
        {"<Dev />"}
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
        {/* Section Header - File style */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Markdown
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-[10px] font-mono text-gray-500">UTF-8</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tighter uppercase text-black">
            TENTANG_ALFIAN.md
          </h2>
          <div className="h-1.5 w-16 bg-black"></div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Intro Block */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-12 h-1 bg-black hidden md:block group-hover:w-20 transition-all duration-500"></div>
            <div className="absolute -top-4 -left-4 w-1 h-12 bg-black hidden md:block group-hover:h-20 transition-all duration-500"></div>
            <div className="relative bg-white p-4 border-2 md:border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
              <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">
                ## Halo, Saya Alfian.
              </p>
              <p className="text-xs md:text-sm font-bold text-gray-800 leading-relaxed">
                Saya seorang{" "}
                <strong className="text-black">IT Enthusiast</strong> yang terus
                mengeksplorasi dan menciptakan solusi teknologi inovatif. Fokus
                utama saya adalah pengembangan skill di bidang{" "}
                <strong className="text-black">Software Development</strong>,{" "}
                <strong className="text-black">Cloud Computing</strong>, dan{" "}
                <strong className="text-black">Project Management</strong>.
              </p>
            </div>
          </div>

          {/* Two-column: Education + Technical Focus */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {/* Education Card */}
            <div className="relative group">
              <div className="absolute top-0 right-0 w-8 h-1 bg-black hidden md:block group-hover:w-12 transition-all duration-500"></div>
              <div className="relative bg-white border-2 md:border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-black shrink-0" />
                  <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
                    ### Pendidikan
                  </p>
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-800 leading-relaxed flex-1">
                  Saat ini menempuh pendidikan{" "}
                  <strong className="text-black">
                    S1 Sistem Informasi di Universitas Bina Sarana Informatika
                  </strong>
                  . Fokus pada analisis sistem, manajemen data, dan software
                  engineering. Pendidikan formal memberikan fondasi teori yang
                  solid, sementara project-project mandiri memberikan pengalaman
                  langsung dalam membangun sistem yang efisien.
                </p>
              </div>
            </div>

            {/* Technical Focus Card */}
            <div className="relative group">
              <div className="absolute top-0 right-0 w-8 h-1 bg-black hidden md:block group-hover:w-12 transition-all duration-500"></div>
              <div className="relative bg-white border-2 md:border-4 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="h-4 w-4 md:h-5 md:w-5 text-black shrink-0" />
                  <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
                    ### Fokus Teknis
                  </p>
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-800 leading-relaxed flex-1">
                  Fokus pada pengembangan produk digital yang modern, scalable,
                  dan user-centric — dari perancangan arsitektur hingga
                  deployment. Selalu mencari pendekatan terbaik untuk
                  menghadirkan solusi yang berdampak dan relevan dengan
                  kebutuhan.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-black/10">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Laravel",
                    "Google Cloud",
                    "Flutter",
                    "Python",
                    "Supabase",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2 py-0.5 bg-black text-white text-[8px] md:text-[9px] font-black uppercase tracking-tight"
                    >
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
              <span>sistem_siap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
