# Lapak Roda — PWA Jual Beli Motor

React + Vite + Tailwind CSS + vite-plugin-pwa + lucide-react. Deploy: Vercel.

## Halaman
- Katalog: cari, filter tipe, urutkan, detail motor, hubungi penjual via WhatsApp
- Favorit: daftar motor yang disimpan
- Jual Motor: CRUD iklan (tambah, ubah, hapus, foto opsional)
- Profil: nama, NIM, kelompok (edit di `src/data/profile.js`)

## Menjalankan
```bash
npm install
npm run dev
```

## Cek PWA (wajib mode produksi)
```bash
npm run build
npm run preview
```
Buka di Chrome → DevTools → Application → Service Workers / Manifest.
Uji offline: centang "Offline", lalu muat ulang halaman.

## Deploy ke Vercel
```bash
git init && git add . && git commit -m "Lapak Roda PWA"
git branch -M main
git remote add origin <link-repo-github>
git push -u origin main
```
Lalu di Vercel: Add New → Project → pilih repo → Deploy (preset Vite terdeteksi otomatis).
