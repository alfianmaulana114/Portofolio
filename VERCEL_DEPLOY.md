# Panduan Deploy ke Vercel

## Environment Variables yang Diperlukan

Pastikan Anda mengatur environment variables berikut di Vercel Dashboard:

### Required (Wajib):
- `NEXT_PUBLIC_SUPABASE_URL` - URL project Supabase Anda
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key dari Supabase

### Optional (Opsional):
- `GITHUB_TOKEN` - Token GitHub untuk meningkatkan rate limit API (opsional)
- `ALLOWED_HOSTS` - Daftar host yang diizinkan untuk validasi (opsional, format: `domain.com,www.domain.com`)

## Cara Setup di Vercel:

1. Buka project di Vercel Dashboard
2. Pergi ke **Settings** > **Environment Variables**
3. Tambahkan semua environment variables di atas
4. Pastikan environment variables tersedia untuk:
   - **Production**
   - **Preview** (opsional)
   - **Development** (opsional)
5. Redeploy project

## Troubleshooting:

### Build Error: "Missing Supabase environment variables"
- Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah di-set di Vercel
- Pastikan environment variables tersedia untuk environment yang digunakan (Production/Preview)

### Runtime Error: Supabase connection failed
- Periksa apakah URL dan key sudah benar
- Pastikan Supabase project masih aktif
- Periksa network restrictions di Supabase dashboard

### Image tidak muncul
- Pastikan `NEXT_PUBLIC_SUPABASE_URL` sudah benar
- Periksa konfigurasi storage bucket di Supabase
- Pastikan images sudah di-upload ke Supabase storage
