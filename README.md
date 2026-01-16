# Alfian's Web Portfolio 🚀
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alfianekamaulana)
[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com/alfianekamaulana)
[![Language](https://img.shields.io/badge/Language-Indonesian-blue?style=for-the-badge)](https://github.com/alfianekamaulana)

Selamat datang di repository portofolio pribadi saya. Proyek ini dibangun dengan fokus pada estetika **Retro Aesthetic / Neo-brutalism** yang modern, bersih, dan berani.

## 📊 GitHub Stats
<p align="left">
<img src="https://github-readme-stats.vercel.app/api?username=alfianekamaulana&show_icons=true&theme=radical" alt="Alfian's GitHub Stats" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=alfianekamaulana&layout=compact&theme=radical" alt="Top Languages" />
</p>

## 🎨 Design Aesthetic
Website ini mengusung tema **Retro-Modern** dengan ciri khas:
- **Hard Shadows**: Bayangan tajam dan tegas pada elemen kartu dan tombol.
- **Bold Borders**: Penggunaan garis tepi hitam tebal.
- **Dynamic Interactions**: Efek hover yang hidup, transformasi grayscale ke warna, dan animasi polkadot.
- **Micro-interactions**: Efek miring (*skew*) dan perbesaran (*scale*) saat interaksi pengguna.

## �️ Tech Stack

### Framework & Core
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

### UI & Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwinds-css&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### Backend & Database
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## 💡 Core Skills & Interests
![Project Management](https://img.shields.io/badge/Project_Management-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Cloud Computing](https://img.shields.io/badge/Cloud_Computing-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Full Stack Development](https://img.shields.io/badge/Full_Stack_Development-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![UI/UX Design](https://img.shields.io/badge/UI/UX_Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

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
    GITHUB_TOKEN=your_github_token_here (optional, untuk rate limit yang lebih tinggi)
    ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com (optional, untuk production)
    ```
    
    **Catatan Keamanan**:
    - Jangan commit file `.env.local` ke repository
    - Gunakan environment variables di Vercel untuk production
    - `GITHUB_TOKEN` opsional, digunakan untuk meningkatkan rate limit API GitHub
    - `ALLOWED_HOSTS` opsional, digunakan untuk validasi host header di production

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
