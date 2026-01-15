import { createClient } from '@/lib/supabase/server'
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import TechStack from "@/components/landing/TechStack";
import Experience from "@/components/landing/Experience";
import Certificates from "@/components/landing/Certificates";
import Projects from "@/components/landing/Projects";
import Skills from "@/components/landing/Skills";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/shared/Footer";
import ParticlesBackground from '@/components/landing/ParticlesBackground';

export const revalidate = 0; // Ensure dynamic data fetching

export default async function Home() {
  const supabase = await createClient()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false })

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .order('issued_date', { ascending: false })

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })

  // New Grouping Logic
  const profesionalExp = experiences?.filter(e => e.category === 'Magang' || e.category === 'Kerja') || []
  const organisasiExp = experiences?.filter(e => e.category === 'Organisasi') || []

  return (
    <main className="min-h-screen bg-white relative selection:bg-black selection:text-white">
      <ParticlesBackground />
      <Navbar />

      {/* Scroll Progress Indicator for IT feel */}
      <div className="fixed top-0 left-0 h-1 bg-yellow-400 z-[100] transition-all duration-300 w-0" id="scroll-progress"></div>

      <div className="pt-0 relative">
        {/* Horizontal decorative lines for tech feel */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5"></div>
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-black/5"></div>
        <div className="absolute top-[40%] left-0 w-full h-[1px] bg-black/5"></div>
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-black/5"></div>
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-black/5"></div>

        <Hero />
        <About />
        <TechStack />

        {/* Render professional experiences */}
        {profesionalExp.length > 0 && (
          <Experience data={profesionalExp} title="PENGALAMAN PROFESIONAL" />
        )}

        {/* Render organization experiences */}
        {organisasiExp.length > 0 && (
          <Experience data={organisasiExp} title="PENGALAMAN ORGANISASI" />
        )}

        <Projects data={projects} />
        <Certificates data={certificates} />
        <Skills data={skills} />
        <CTA />
      </div>
      <Footer />

      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const windownTop = window.pageYOffset;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (windownTop / height) * 100;
            document.getElementById('scroll-progress').style.width = scrolled + '%';
          });
        `
      }} />
    </main>
  );
}
