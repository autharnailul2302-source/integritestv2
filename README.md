# INTEGRITEST

Aplikasi ujian online berbasis web dengan Firebase Firestore — sistem manajemen ujian (CBT) untuk sekolah.

## Struktur File

```
integritest/
├── app.html                  # Halaman utama (siswa + admin)
├── superadmin.html           # Dashboard superadmin
│
├── app-logic.js              # Logika utama: soal, ujian, analitik, PDF, Excel
├── firebase-init.js          # Firebase config + init (ES Module)
├── siswa-logic.js            # Manajemen siswa, notifikasi WA, kartu peserta
├── utils.js                  # Badge sekolah, QR scanner, token refresh
├── styles.css                # Semua CSS: dark mode, animasi, responsive
│
├── superadmin-firebase.js    # Firebase superadmin (ES Module)
├── superadmin-nav.js         # Navigasi & routing superadmin
├── superadmin-logic.js       # Modal detail sekolah & logika superadmin
└── superadmin-styles.css     # CSS superadmin
```

## Fitur

- **Multi-tenant** — satu deployment untuk banyak sekolah via `?s=<school_id>`
- **Login siswa** — autentikasi via nama + nomor peserta + token ujian
- **Ujian online** — pilihan ganda, jawaban ganda, benar/salah, esai, menjodohkan
- **Anti-cheat engine** — deteksi tab switching, fullscreen, idle, watermark nama
- **Integrites AI** — koreksi esai otomatis berbasis AI
- **QR scanner** — siswa scan token QR dari pengawas
- **Dashboard admin** — monitoring real-time, laporan PDF/Excel, analitik per kelas
- **Dark mode** — dukungan penuh light/dark mode
- **HP Kentang Mode** — deteksi device low-end, nonaktifkan animasi berat
- **Superadmin** — monitoring semua sekolah, manajemen akun admin

## Cara Deploy di GitHub Pages

1. Upload semua file ke repository GitHub
2. Aktifkan **GitHub Pages** di Settings → Pages → pilih branch `main`
3. Akses via: `https://<username>.github.io/<repo>/app.html?s=<school_id>`

> **Penting:** Karena menggunakan ES Modules (`firebase-init.js`, `superadmin-firebase.js`),
> file harus diakses via HTTP/HTTPS — **tidak bisa dibuka langsung sebagai file lokal** (`file://`).
> GitHub Pages sudah menangani ini secara otomatis.

## Teknologi

| Library | Versi | Fungsi |
|---|---|---|
| Firebase | 11.6.1 | Database & Auth |
| Tailwind CSS | CDN | Styling |
| Lucide Icons | latest | Ikon UI |
| SheetJS | 0.18.5 | Export/import Excel |
| Mammoth.js | 1.6.0 | Import Word (soal) |
| QRCode.js | 1.0.0 | Generate QR token |
| jsQR | 1.4.0 | Scan QR via kamera |

## Performa Sebelum vs Sesudah Split

| File | Sebelum | Sesudah |
|---|---|---|
| `app.html` | 1.576 KB (monolith) | 549 KB |
| `superadmin.html` | 142 KB (monolith) | 55 KB |
| JS total | inline (tidak ter-cache) | ~1 MB (ter-cache browser) |

Setelah split, JS files di-cache browser — reload halaman berikutnya **jauh lebih cepat** karena
`app-logic.js` (708 KB) tidak perlu diunduh ulang selama tidak ada perubahan.
