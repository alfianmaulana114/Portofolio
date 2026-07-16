import { createClient } from '@/lib/supabase/server'
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import TechStack from "@/components/landing/TechStack";
import Experience from "@/components/landing/Experience";
import Certificates from "@/components/landing/Certificates";
import Projects from "@/components/landing/Projects";
import GithubActivity from "@/components/landing/GithubActivity";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/shared/Footer";
import ParticlesBackground from '@/components/landing/ParticlesBackgroundWrapper';
import ScrollProgress from '@/components/shared/ScrollProgress';

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


  // Grouping Logic
  const profesionalExp = experiences?.filter(e => e.category === 'Magang' || e.category === 'Kerja') || []
  const organisasiExp = experiences?.filter(e => e.category === 'Organisasi') || []

  return (
    <main className="min-h-screen bg-white relative selection:bg-black selection:text-white">
      <ParticlesBackground />
      <Navbar />

      <div className="pt-0 relative">
        <Hero />
        <About />
        <TechStack />

        {/* Render professional experiences */}
        {profesionalExp.length > 0 && (
          <Experience data={profesionalExp} title="PENGALAMAN KERJA" />
        )}

        {/* Render organization experiences */}
        {organisasiExp.length > 0 && (
          <Experience data={organisasiExp} title="PENGALAMAN ORGANISASI" />
        )}

        <Projects data={projects} />
        <Certificates data={certificates} />
        <GithubActivity />
        <CTA />
      </div>
      <Footer />

    </main>
  );
}
