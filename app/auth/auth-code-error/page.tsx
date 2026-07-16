import Link from 'next/link'

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="p-10 w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                    GAGAL
                </h1>
                <div className="h-2 w-20 bg-black mx-auto mb-6"></div>
                <p className="text-sm font-medium text-red-600 mb-8">
                    Autentikasi gagal. Link mungkin sudah kedaluwarsa atau tidak valid.
                </p>
                <Link
                    href="/loginalfian"
                    className="inline-block bg-black text-white hover:bg-white hover:text-black border-4 border-black rounded-none h-14 font-black text-lg uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] px-8 leading-[3.5rem]"
                >
                    Kembali ke Login
                </Link>
            </div>
        </div>
    )
}
