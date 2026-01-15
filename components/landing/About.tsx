export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto max-w-[1000px] px-4 md:px-8">
        <h2 className="text-4xl font-black mb-12 text-center tracking-tight">TENTANG SAYA</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300">
            <h3 className="text-xl font-black mb-4 uppercase">Project Management</h3>
            <p className="text-gray-800 leading-relaxed font-medium">
              Berpengalaman dalam memimpin tim agile dan mengirimkan proyek kompleks tepat waktu.
              Fokus pada komunikasi yang jelas, optimalisasi sumber daya, dan perencanaan strategis.
            </p>
          </div>

          <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300">
            <h3 className="text-xl font-black mb-4 uppercase">Cloud Computing</h3>
            <p className="text-gray-800 leading-relaxed font-medium">
              Antusias terhadap infrastruktur yang scalable. Mahir dalam AWS/GCP, Docker, dan Kubernetes.
              Membangun lingkungan cloud yang aman dan efisien adalah keahlian saya.
            </p>
          </div>

          <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300">
            <h3 className="text-xl font-black mb-4 uppercase">Development</h3>
            <p className="text-gray-800 leading-relaxed font-medium">
              Full-stack developer yang mencintai clean code.
              Spesialisasi di modern web stack (Next.js, TypeScript, Supabase) dan membangun API yang tangguh.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
