export default function About() {
    return (
        <section id="about" className="py-12 md:py-20 mt-12 md:mt-20 bg-transparent relative overflow-hidden">
            {/* Decorative Binary Background Fragment */}
            <div className="absolute top-10 right-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none rotate-12 hidden md:block text-black">
                01010110
            </div>
            <div className="absolute bottom-10 left-[-20px] font-black text-[40px] md:text-[60px] opacity-[0.03] select-none -rotate-12 hidden md:block text-black">
                {"<Dev />"}
            </div>

            <div className="container mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
                <div className="flex flex-col items-center mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter uppercase text-black">TENTANG SAYA</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="relative group">
                    {/* Technical Accent Lines */}
                    <div className="absolute -top-4 -left-4 w-12 h-1 px-1 bg-black hidden md:block group-hover:w-20 transition-all duration-500"></div>
                    <div className="absolute -top-4 -left-4 w-1 h-12 py-1 bg-black hidden md:block group-hover:h-20 transition-all duration-500"></div>

                    <div className="relative bg-white p-5 md:p-8 border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                        <p className="text-sm md:text-lg font-bold text-gray-800 leading-relaxed text-center md:text-left">
                            Saya seorang mahasiswa aktif program studi S1 Sistem Informasi di Universitas Bina Sarana Informatika.
                            Merupakan individu yang proaktif dengan kemampuan interpersonal yang baik, dan aktif terlibat dalam organisasi
                            kemahasiswaan UKM Jurnalistik Universitas Bina Sarana Informatika. Memiliki pengalaman magang dibagian
                            arsip dan dokumentasi di Museum Nasional Indonesia. Memiliki keterampilan dan minat belajar terutama
                            dalam bidang project management, cloud computing, software development dan sangat terbuka
                            untuk mengeksplorasi kesempatan lainnya.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
