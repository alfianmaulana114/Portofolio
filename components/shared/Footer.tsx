import Link from 'next/link'
import { Instagram, Linkedin, Mail, Github } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-transparent py-12 px-4 md:px-8">
            <div className="container mx-auto max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                    <Link href="/" className="font-sans text-2xl font-black tracking-tighter text-black hover:italic transition-all">
                        ALFIAN
                    </Link>
                    <p className="text-sm text-gray-500 font-medium">
                        © {new Date().getFullYear()} Alfian Maulana. All rights reserved.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-6">
                    <Link
                        href="https://www.linkedin.com/in/alfianekamaulana"
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-black text-black border-b-2 border-transparent hover:border-black transition-all uppercase tracking-widest"
                    >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                    </Link>
                    <Link
                        href="https://github.com/alfianmaulana114"
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-black text-black border-b-2 border-transparent hover:border-black transition-all uppercase tracking-widest"
                    >
                        <Github className="h-4 w-4" /> GitHub
                    </Link>
                    <Link
                        href="https://instagram.com/alfianmaulana114"
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-black text-black border-b-2 border-transparent hover:border-black transition-all uppercase tracking-widest"
                    >
                        <Instagram className="h-4 w-4" /> Instagram
                    </Link>
                    <Link
                        href="mailto:alfianmaulana114@gmail.com"
                        className="flex items-center gap-2 text-sm font-black text-black border-b-2 border-transparent hover:border-black transition-all uppercase tracking-widest"
                    >
                        <Mail className="h-4 w-4" /> Email
                    </Link>
                </div>
            </div>
        </footer>
    )
}
