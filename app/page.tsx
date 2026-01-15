import { createClient } from '@/lib/supabase/server'
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Experience from "@/components/landing/Experience";
import Certificates from "@/components/landing/Certificates";
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

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })

  return (
    <main className="min-h-screen bg-white relative">
      <ParticlesBackground />
      <Navbar />
      <div className="pt-0"> {/* Removed padding-top as Hero handles it */}
        <Hero />
        <About />
        <Experience data={experiences} />
        <Certificates data={certificates} />
        <Skills data={skills} />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
