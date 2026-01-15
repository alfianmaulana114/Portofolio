import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-mono text-xl font-bold tracking-tight text-black">
            Alfian
          </Link>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Alfian. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="https://www.linkedin.com/in/alfianekamaulana" target="_blank" className="text-sm font-bold text-black hover:underline transition-colors">
            LinkedIn
          </Link>
          <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black transition-colors">
            GitHub
          </Link>
          <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
