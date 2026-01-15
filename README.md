# Alfian's Web Portfolio 🚀

Selamat datang di repository portofolio pribadi saya. Proyek ini dibangun dengan fokus pada estetika **Retro Aesthetic / Neo-brutalism** yang modern, bersih, dan berani.

## 🎨 Design Aesthetic
Website ini mengusung tema **Retro-Modern** dengan ciri khas:
- **Hard Shadows**: Bayangan tajam dan tegas pada elemen kartu dan tombol.
- **Bold Borders**: Penggunaan garis tepi hitam tebal.
- **Dynamic Interactions**: Efek hover yang hidup, transformasi grayscale ke warna, dan animasi polkadot.
- **Micro-interactions**: Efek miring (*skew*) dan perbesaran (*scale*) saat interaksi pengguna.

## 🚀 Tech Stack
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Lucide React

## ✨ Fitur Utama
- **Landing Page Interaktif**:
    - **Hero Section**: Animasi foto grayscale-to-color dengan latar polkadot.
    - **Tentang Saya**: Penjelasan fokus bidang teknologi.
    - **Pengalaman Kerja**: Timeline interaktif dengan gaya retro.
    - **Sertifikasi**: Grid sertifikat dengan link kredensial.
    - **Keahlian**: Chip keahlian yang dikelompokkan berdasarkan kategori.
- **Dashboard Admin**: (Dalam pengembangan/terproteksi) Untuk mengelola data pengalaman, sertifikat, dan keahlian secara dinamis melalui integrasi Supabase.
- **Responsive Design**: Tampilan optimal di berbagai perangkat (Mobile, Tablet, Desktop).

## 🛠️ Instalasi & Pengembangan

1.  **Clone repository**:
    ```bash
    git clone [url-repository-anda]
    cd portofolio_alfian
    ```

2.  **Instal dependensi**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Buat file `.env.local` dan tambahkan kredensial Supabase Anda:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Jalankan server pengembangan**:
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Proyek
- `/app`: Folder utama untuk routing Next.js (App Router).
- `/components`: Komponen UI yang dapat digunakan kembali.
    - `/landing`: Komponen khusus untuk halaman utama.
    - `/shared`: Komponen umum seperti Navbar dan Footer.
- `/lib`: Utilitas, konfigurasi Supabase, dan definisi tipe data (TypeScript).
- `/public`: Aset statis seperti gambar dan ikon.

## 📝 Lisensi
Proyek ini dibuat untuk keperluan portofolio pribadi.

---
Membangun dengan ❤️ oleh **Alfian Maulana**
