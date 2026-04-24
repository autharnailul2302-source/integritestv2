<script>
        // ── LUCIDE DEBOUNCE untuk HP Kentang ──────────────────
        // Pada perf-mode, kumpulkan panggilan createIcons dan jalankan sekali per frame
        (function() {
            let _lucideTimer = null;
            window._createIconsSafe = function() {
                if (typeof lucide === 'undefined') return;
                // Selalu debounce (HP kentang safe - max 1 call per 100ms)
                clearTimeout(_lucideTimer);
                _lucideTimer = setTimeout(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, window._perfMode ? 200 : 80);
            };
        })();

        // --- DATA SOAL STATIC (FALLBACK & SEED) ---
        window.questionBank = {
            A: [
                { id: 1, text: "Rizki adalah siswa kelas XI TKJ di SMKN 1 Brondong. Gurunya memberi tugas membuat project jaringan komputer, namun Rizki selalu gagal dalam konfigurasi router. Ia merasa dirinya tidak berbakat di bidang networking dan menyerah. \"Saya memang tidak punya bakat jadi teknisi jaringan,\" katanya. Berdasarkan cerita di atas, pola pikir yang dimiliki Rizki adalah...", options: ["Growth mindset karena mau mencoba mengerjakan tugas", "Fixed mindset karena menganggap kemampuannya sudah terbatas dan tidak bisa berkembang", "Pola pikir inovatif dalam networking", "Pola pikir kreatif dalam pemrograman", "Pola pikir pantang menyerah"], correct: 1 },
                { id: 2, text: "Fahrul, lulusan TKJ SMKN 1 Brondong, membuka usaha service komputer. Ia melihat banyak warga kesulitan akses internet. Fahrul berinovasi menawarkan jasa instalasi jaringan RT/RW Net dengan harga terjangkau. Usahanya berkembang pesat. Karakter wirausaha yang paling menonjol ditunjukkan Fahrul adalah...", options: ["Jujur dalam memberikan pelayanan", "Inovatif dan kreatif melihat peluang bisnis", "Berani mengambil risiko saja", "Rasa ingin tahu terhadap teknologi saja", "Pantang menyerah dalam bekerja"], correct: 1 },
                { id: 3, text: "Devi, siswi kelas XII TKJ SMKN 1 Brondong, membuat website untuk UMKM lokal. Awalnya sepi dan teman-temannya pesimis. Devi tidak menyerah, belajar SEO dan digital marketing, hingga kini websitenya ramai. Sikap Devi menunjukkan ia memiliki...", options: ["Fixed mindset karena awalnya gagal", "Growth mindset karena terus belajar dan tidak menyerah mengembangkan kemampuannya", "Sikap mudah terpengaruh pendapat orang", "Kemampuan yang terbatas dalam web development", "Bakat alami dalam bisnis digital"], correct: 1 },
                { id: 4, text: "Pak Hendra, guru produktif TKJ di SMKN 1 Brondong, selalu mendorong siswa memiliki rasa ingin tahu tinggi terhadap teknologi baru (Cloud, IoT, Cybersecurity). Rasa ingin tahu yang tinggi penting bagi wirausaha karena...", options: ["Membuat seseorang selalu ikut campur urusan bisnis orang lain", "Membantu menemukan peluang bisnis baru dan solusi inovatif di bidang teknologi", "Membuat seseorang tidak fokus pada satu bidang usaha", "Agar bisa mengetahui rahasia kompetitor secara ilegal", "Supaya terlihat pintar di depan pelanggan"], correct: 1 },
                { id: 5, text: "Andi membuka jasa instalasi CCTV di Brondong. Ia mengklaim \"Menggunakan kamera CCTV berteknologi AI dari Jepang\" padahal menggunakan kamera lokal biasa. Pelanggan kecewa. Karakter wirausaha yang TIDAK dimiliki Andi adalah...", options: ["Inovatif dalam pemasaran", "Berani mengambil risiko bisnis", "Jujur dalam berbisnis", "Rasa ingin tahu terhadap produk", "Kreatif dalam promosi"], correct: 2 },
                { id: 6, text: "Siswa TKJ SMKN 1 Brondong sedang belajar tentang kreativitas. Kreativitas dalam kewirausahaan dapat didefinisikan sebagai...", options: ["Kemampuan meniru bisnis kompetitor dengan sempurna", "Bakat alami yang hanya dimiliki orang-orang tertentu sejak lahir", "Kemampuan menghasilkan ide-ide baru dan solusi unik untuk memecahkan masalah", "Keterampilan menjual produk teknologi dengan harga setinggi-tingginya", "Kemampuan menghasilkan uang sebanyak-banyaknya tanpa peduli cara"], correct: 2 },
                { id: 7, text: "Siti, lulusan TKJ SMKN 1 Brondong, ingin membuka warnet gaming. Ia sudah buat proposal dan hitung modal Rp 50 juta. Namun karena takut gagal dan merugi, ia membatalkan rencananya dan memilih jadi karyawan. Karakter wirausaha yang belum dimiliki Siti adalah...", options: ["Jujur dalam perencanaan", "Inovatif membuat proposal", "Berani mengambil risiko dalam berbisnis", "Rasa ingin tahu terhadap peluang", "Kreatif dalam perencanaan bisnis"], correct: 2 },
                { id: 8, text: "Dalam pembelajaran PKK di kelas TKJ SMKN 1 Brondong, guru menjelaskan perbedaan pola pikir. Perbedaan utama antara growth mindset dan fixed mindset dalam kewirausahaan adalah...", options: ["Growth mindset percaya kemampuan bisa berkembang dengan usaha, fixed mindset percaya kemampuan sudah tetap sejak lahir", "Growth mindset hanya untuk orang kaya, fixed mindset untuk orang miskin", "Growth mindset tidak pernah mengalami kegagalan, fixed mindset selalu gagal", "Growth mindset tidak perlu belajar lagi, fixed mindset harus terus belajar", "Keduanya sama saja tidak ada bedanya dalam berwirausaha"], correct: 0 },
                { id: 9, text: "Bayu, alumni TKJ SMKN 1 Brondong, 3 kali gagal bisnis (aksesoris, jasa setting, pulsa). Ia tidak menyerah, belajar dari kesalahan, dan mencoba lagi konsep baru hingga sukses di jasa website. Karakter wirausaha yang paling menonjol dari Bayu adalah...", options: ["Jujur kepada pelanggan", "Pantang menyerah dan terus berusaha", "Rasa ingin tahu tentang teknologi", "Inovatif membuat produk baru", "Berani mengambil risiko besar"], correct: 1 },
                { id: 10, text: "Di laboratorium TKJ SMKN 1 Brondong, siswa diajarkan menerapkan kreativitas. Kreativitas dalam kehidupan sehari-hari khususnya bidang TKJ dapat diterapkan dengan cara...", options: ["Hanya mengikuti tutorial yang ada di internet tanpa modifikasi", "Selalu menunggu guru memberikan solusi untuk setiap masalah", "Mencari solusi unik dan berbeda untuk masalah teknis yang dihadapi", "Menghindari hal-hal baru yang belum pernah dipelajari di sekolah", "Hanya fokus mengerjakan tugas rutin yang sudah diajarkan"], correct: 2 },
                { id: 11, text: "Rina, siswi kelas XI TKJ, mengikuti pelatihan 5 hari dengan materi berbeda tiap hari. Jika ia harus memilih kombinasi 3 karakter paling tepat untuk membuka usaha service komputer baru, kombinasi mana yang paling diperlukan?", options: ["Rasa ingin tahu, Berani mengambil risiko, Jujur", "Pantang menyerah, Inovatif, Jujur", "Berani mengambil risiko, Pantang menyerah, Inovatif", "Rasa ingin tahu, Inovatif, Pantang menyerah", "Semua karakter sama pentingnya (5 karakter)"], correct: 2 },
                { id: 12, text: "Pak Hendra memberikan 4 pernyataan tentang mindset. (1) Tidak berbakat, (2) Kegagalan adalah belajar, (3) Kemampuan sudah maksimal, (4) Dengan latihan bisa lebih baik. Berapa jumlah pernyataan yang menunjukkan growth mindset?", options: ["1 pernyataan", "2 pernyataan", "3 pernyataan", "4 pernyataan", "Tidak ada yang menunjukkan growth mindset"], correct: 1 },
                { id: 13, text: "Dimas ikut lomba LKS. Tahun 1: Gagal penyisihan. Tahun 2: Semifinal. Tahun 3: Juara 2 Provinsi. Ini menunjukkan konsep mindset apa dan berapa tingkat peningkatan prestasinya (jumlah tahap)?", options: ["Fixed mindset, peningkatan 1 tahap", "Growth mindset, peningkatan 2 tahap", "Growth mindset, peningkatan 3 tahap", "Fixed mindset, peningkatan 3 tahap", "Growth mindset, tidak ada peningkatan"], correct: 1 },
                { id: 14, text: "Siswa kelas X TKJ membuat project kreatif barang bekas. Hasil: 6 sangat inovatif, 12 cukup kreatif, 8 biasa, 4 tidak mengumpulkan. Berapa persen siswa yang menunjukkan kreativitas tinggi (sangat inovatif dan cukup kreatif)?", options: ["40%", "50%", "60%", "70%", "80%"], correct: 2 },
                { id: 15, text: "Fahrul merencanakan target pelanggan: Bulan 1-2 (10 pelanggan), Bulan 3-4 (5 pelanggan), Bulan 5-6 (8 pelanggan). Karakter apa yang ditunjukkan dan berapa total target 6 bulan?", options: ["Berani mengambil risiko, 20 pelanggan", "Rasa ingin tahu, 23 pelanggan", "Inovatif dan terencana, 23 pelanggan", "Pantang menyerah, 25 pelanggan", "Jujur, 30 pelanggan"], correct: 2 },
                { id: 16, text: "Siti menghadapi 5 kegagalan dalam mengembangkan aplikasi, namun terus belajar. Pada percobaan ke-6, aplikasinya berhasil. Sikap ini menunjukkan karakter apa dan berapa kali total ia mencoba?", options: ["Jujur, 5 kali", "Inovatif, 5 kali", "Pantang menyerah, 6 kali", "Berani mengambil risiko, 6 kali", "Rasa ingin tahu, 7 kali"], correct: 2 },
                { id: 17, text: "Skor kreativitas: Meniru=1, Modifikasi=2, Inovasi=3. Reza membuat 4 ide: 1 meniru, 2 modifikasi, 1 inovasi. Berapa total skor kreativitas Reza?", options: ["6", "7", "8", "9", "10"], correct: 2 },
                { id: 18, text: "Bayu ingin mengembangkan 5 karakter wirausaha. Ada 2 karakter dasar (rasa ingin tahu & berani ambil risiko) yang harus dikuasai pertama. Jika tiap karakter butuh 2 bulan, berapa bulan untuk menguasai 2 karakter dasar tersebut?", options: ["2 bulan", "4 bulan", "6 bulan", "8 bulan", "10 bulan"], correct: 1 },
                { id: 19, text: "Dari 24 siswa, 18 memilih bangkit dan coba lagi (growth mindset), 6 memilih menyerah (fixed mindset). Berapa persentase siswa yang menunjukkan growth mindset?", options: ["25%", "50%", "65%", "75%", "80%"], correct: 3 },
                { id: 20, text: "Andi memilih ide bisnis: Riset 5 ide -> Pilih 3 -> Uji coba 2 -> Luncurkan 1. Berapa total ide yang diriset dan berapa yang diluncurkan?", options: ["Riset 5 ide, luncurkan 3 ide", "Riset 5 ide, luncurkan 2 ide", "Riset 5 ide, luncurkan 1 ide", "Riset 3 ide, luncurkan 1 ide", "Riset 3 ide, luncurkan 2 ide"], correct: 2 }
            ],
            B: [
                { id: 1, text: "Ahmad, siswa kelas XII TKJ SMKN 1 Brondong, mendapat nilai jelek saat ujian praktik instalasi server. Ia berkata kepada temannya, \"Saya memang bodoh, tidak akan pernah bisa menguasai materi server. Lebih baik saya fokus ke hal lain saja.\" Ahmad pun tidak mau belajar lagi tentang server. Pola pikir yang ditunjukkan Ahmad adalah...", options: ["Growth mindset karena mau mencari fokus baru", "Growth mindset karena realistis dengan kemampuan", "Fixed mindset karena percaya kemampuannya tidak bisa berkembang", "Pola pikir inovatif dalam belajar", "Pola pikir kreatif dalam menyelesaikan masalah"], correct: 2 },
                { id: 2, text: "Ibu Zahra, alumni TKJ SMKN 1 Brondong, membuka usaha fotocopy dan print di dekat sekolah. Ia melihat banyak siswa yang kesulitan mengedit dokumen. Ibu Zahra kemudian menambah layanan jasa pengetikan, editing dokumen, dan desain grafis sederhana. Kini usahanya menjadi one-stop service untuk kebutuhan siswa dan tidak hanya bergantung pada fotocopy saja. Karakter wirausaha yang paling dominan ditunjukkan Ibu Zahra adalah...", options: ["Jujur dalam memberikan layanan terbaik", "Pantang menyerah menghadapi persaingan", "Kreatif dan inovatif mengembangkan layanan bisnis", "Berani mengambil risiko membuka usaha", "Rasa ingin tahu tentang kebutuhan pasar"], correct: 2 },
                { id: 3, text: "Yoga, siswa kelas XI TKJ, membuat aplikasi mobile untuk mencatat tugas sekolah. Aplikasi pertamanya crash terus dan tidak ada yang mau pakai. Teman-temannya bilang \"kamu tidak cocok jadi programmer.\" Namun Yoga tidak putus asa. Ia bertanya ke kakak kelasnya, menonton tutorial YouTube, belajar dari forum online, dan terus memperbaiki coding-nya. Setelah 3 bulan, aplikasinya berhasil dan digunakan 100 siswa TKJ. Sikap Yoga menunjukkan ia memiliki...", options: ["Fixed mindset karena awalnya gagal membuat aplikasi", "Bakat alami sebagai programmer sejak lahir", "Growth mindset karena percaya kemampuan bisa berkembang dengan belajar", "Sikap mudah terpengaruh pendapat negatif orang lain", "Kemampuan yang terbatas dalam programming"], correct: 2 },
                { id: 4, text: "Pak Arif, guru produktif TKJ di SMKN 1 Brondong, selalu mengajarkan pentingnya karakter \"berani mengambil risiko\" bagi wirausahawan muda. Yang dimaksud dengan \"berani mengambil risiko\" dalam kewirausahaan adalah...", options: ["Nekat melakukan bisnis tanpa perhitungan yang matang", "Meminjam uang sebanyak-banyaknya untuk modal usaha", "Berani memulai usaha baru meski ada kemungkinan gagal, dengan perhitungan dan persiapan yang baik", "Meniru bisnis orang lain agar tidak rugi", "Hanya memulai bisnis yang sudah pasti untung 100%"], correct: 2 },
                { id: 5, text: "Budi membuka jasa pembuatan website untuk UMKM. Dalam promosi, ia klaim \"website akan selesai dalam 3 hari\" padahal kenyataannya butuh waktu 2 minggu. Banyak klien yang kecewa karena janji tidak ditepati, meskipun hasil websitenya bagus. Reputasi usaha Budi mulai menurun. Karakter wirausaha yang TIDAK dimiliki Budi adalah...", options: ["Inovatif membuat website berkualitas", "Kreatif dalam desain website", "Jujur dalam berbisnis dan menepati janji", "Berani mengambil risiko bisnis", "Memiliki keterampilan teknis yang baik"], correct: 2 },
                { id: 6, text: "Dalam pembelajaran kewirausahaan, guru menjelaskan bahwa kreativitas bukan hanya tentang seni atau desain, tetapi juga tentang cara berpikir dalam memecahkan masalah bisnis. Penerapan kreativitas dalam bisnis teknologi dapat berupa...", options: ["Selalu menggunakan cara yang sudah terbukti berhasil tanpa perubahan", "Menunggu orang lain membuat inovasi baru lalu menirunya", "Menciptakan solusi baru atau cara berbeda untuk memecahkan masalah pelanggan", "Fokus hanya pada satu produk tanpa variasi", "Mengikuti semua tren tanpa analisis kebutuhan pasar"], correct: 2 },
                { id: 7, text: "Lia ingin membuka toko komputer online. Ia sudah riset pasar, punya supplier terpercaya, dan modal cukup. Namun ia khawatir \"bagaimana kalau tidak laku?\" dan \"bagaimana kalau rugi?\". Karena terlalu takut, akhirnya Lia membatalkan niatnya dan memilih menjadi karyawan di toko komputer orang lain dengan gaji pas-pasan. Karakter wirausaha yang belum dimiliki Lia adalah...", options: ["Kreatif dalam merencanakan bisnis", "Jujur dalam menjalankan usaha", "Rasa ingin tahu tentang peluang bisnis", "Berani mengambil risiko dalam berwirausaha", "Inovatif dalam mencari supplier"], correct: 3 },
                { id: 8, text: "Di kelas PKK, guru menjelaskan perbedaan cara berpikir antara growth mindset dan fixed mindset saat menghadapi kegagalan dalam bisnis. Perbedaan respons terhadap kegagalan antara growth mindset dan fixed mindset adalah...", options: ["Growth mindset melihat kegagalan sebagai pembelajaran, fixed mindset melihat kegagalan sebagai bukti ketidakmampuan", "Growth mindset tidak pernah gagal, fixed mindset selalu gagal", "Growth mindset untuk orang pintar, fixed mindset untuk orang bodoh", "Keduanya sama-sama takut gagal dalam bisnis", "Growth mindset langsung menyerah, fixed mindset terus mencoba"], correct: 0 },
                { id: 9, text: "Hasan, alumni TKJ SMKN 1 Brondong, sudah 4 kali mencoba berbagai bisnis teknologi namun gagal: warnet tutup, jual aksesoris komputer sepi, jasa instalasi jaringan tidak berkembang, dan rental PS bangkrut. Namun ia tidak menyerah. Di percobaan kelima, ia membuka kursus komputer untuk anak-anak dan berhasil dengan 30 siswa tetap. Hasan berkata, \"Setiap kegagalan mengajarkan saya sesuatu yang berharga.\" Karakter wirausaha yang paling menonjol dari Hasan adalah...", options: ["Jujur kepada diri sendiri", "Inovatif menciptakan produk baru", "Pantang menyerah dan terus berusaha", "Berani mengambil risiko besar", "Rasa ingin tahu yang tinggi"], correct: 2 },
                { id: 10, text: "Siswa TKJ SMKN 1 Brondong belajar bahwa kreativitas adalah keterampilan yang bisa dilatih dan dikembangkan dalam kehidupan sehari-hari. Cara melatih kreativitas dalam kehidupan sehari-hari sebagai siswa TKJ adalah...", options: ["Selalu mengerjakan tugas dengan cara yang sama seperti contoh guru", "Menghindari hal-hal baru karena takut salah", "Mencoba berbagai cara berbeda untuk menyelesaikan masalah teknis", "Hanya fokus pada teori tanpa praktik", "Meniru pekerjaan teman tanpa modifikasi"], correct: 2 },
                { id: 11, text: "Kelas XII TKJ SMKN 1 Brondong mengadakan workshop kewirausahaan selama 6 hari. Materi yang diajarkan adalah: Hari 1: Pentingnya kreativitas (2 jam), Hari 2: Growth mindset vs Fixed mindset (3 jam), Hari 3: Karakter jujur dan berani mengambil risiko (2 jam), Hari 4: Karakter inovatif dan pantang menyerah (3 jam), Hari 5: Karakter rasa ingin tahu (2 jam), Hari 6: Praktik membuat business plan (4 jam). Berapa total jam pembelajaran tentang karakter wirausaha (hari 3, 4, dan 5)?", options: ["5 jam", "6 jam", "7 jam", "8 jam", "9 jam"], correct: 2 },
                { id: 12, text: "Dalam diskusi kelompok, guru memberikan 6 pernyataan dan meminta siswa mengidentifikasi mana yang termasuk growth mindset: 1. \"Saya belum bisa, tapi saya akan terus belajar\", 2. \"Ini terlalu sulit untuk saya\", 3. \"Kesalahan membantu saya belajar\", 4. \"Saya tidak berbakat di bidang ini\", 5. \"Usaha saya akan membuat saya lebih baik\", 6. \"Kemampuan saya sudah mentok\". Berapa jumlah pernyataan yang menunjukkan growth mindset?", options: ["1 pernyataan", "2 pernyataan", "3 pernyataan", "4 pernyataan", "5 pernyataan"], correct: 2 },
                { id: 13, text: "Fitri mengikuti kompetisi web design tingkat nasional selama 4 tahun berturut-turut dengan hasil: Tahun 1: Tidak lolos seleksi awal (skor 0), Tahun 2: Lolos seleksi, masuk 20 besar (skor 2), Tahun 3: Masuk 10 besar (skor 3), Tahun 4: Juara 3 nasional (skor 4). Jika kita beri nilai untuk setiap pencapaian (tidak lolos = 0, lolos = 1, 20 besar = 2, 10 besar = 3, juara 3 = 4), berapa total nilai pencapaian Fitri dalam 4 tahun?", options: ["7", "8", "9", "10", "11"], correct: 2 },
                { id: 14, text: "Guru PKK memberikan tugas membuat inovasi produk teknologi. Dari 40 siswa TKJ, hasil kreativitas mereka dinilai: 8 siswa sangat inovatif, 16 siswa cukup kreatif, 10 siswa kurang kreatif, 6 siswa tidak mengumpulkan. Berapa persen siswa yang menunjukkan kreativitas baik (sangat inovatif + cukup kreatif)?", options: ["40%", "50%", "60%", "70%", "80%"], correct: 2 },
                { id: 15, text: "Andi merencanakan strategi bisnis instalasi WiFi dengan target bertahap: Fase 1 (bulan 1-3): Fokus ke 15 rumah warga di dekat sekolah, Fase 2 (bulan 4-6): Tambah 10 warung dan toko kecil, Fase 3 (bulan 7-9): Tambah 12 kantor dan klinik. Karakter apa yang ditunjukkan dengan perencanaan bertahap ini, dan berapa total target pelanggan dalam 9 bulan?", options: ["Pantang menyerah, 30 pelanggan", "Jujur, 35 pelanggan", "Inovatif dan terencana, 37 pelanggan", "Berani mengambil risiko, 40 pelanggan", "Rasa ingin tahu, 45 pelanggan"], correct: 2 },
                { id: 16, text: "Dini mencoba membuat game edukasi untuk anak SD. Ia mengalami kegagalan dan terus belajar: Percobaan 1-3: Gagal (game tidak menarik), Percobaan 4-6: Gagal (terlalu sulit untuk anak), Percobaan 7-8: Gagal (terlalu mudah, anak bosan), Percobaan 9: Berhasil (balance antara fun dan edukatif). Sikap Dini menunjukkan karakter apa, dan berapa total percobaan yang ia lakukan?", options: ["Jujur, 7 kali", "Inovatif, 8 kali", "Berani mengambil risiko, 8 kali", "Pantang menyerah, 9 kali", "Rasa ingin tahu, 10 kali"], correct: 3 },
                { id: 17, text: "Dalam penilaian project kewirausahaan, guru memberikan bobot untuk 5 karakter wirausaha: Jujur (bobot 3), Berani mengambil risiko (bobot 4), Pantang menyerah (bobot 5), Inovatif (bobot 5), Rasa ingin tahu (bobot 3). Toni dalam project-nya menunjukkan 3 karakter: jujur, pantang menyerah, dan inovatif. Berapa total skor Toni?", options: ["10", "11", "12", "13", "15"], correct: 3 },
                { id: 18, text: "Program pengembangan mindset wirausaha di SMKN 1 Brondong berlangsung 12 bulan. Fokus pembelajaran setiap kuartal: Kuartal 1 (3 bulan): Membangun growth mindset, Kuartal 2 (3 bulan): Melatih kreativitas dan inovasi, Kuartal 3 (3 bulan): Mengembangkan karakter wirausaha, Kuartal 4 (3 bulan): Praktik membuat dan menjalankan bisnis. Jika seorang siswa ingin fokus mempelajari tentang growth mindset dan kreativitas, berapa bulan waktu yang dialokasikan untuk kedua topik tersebut?", options: ["3 bulan", "4 bulan", "5 bulan", "6 bulan", "9 bulan"], correct: 3 },
                { id: 19, text: "Dalam survei tentang pola pikir di kelas XII TKJ (36 siswa), hasilnya: 27 siswa setuju bahwa \"kemampuan bisa berkembang dengan usaha keras\", 9 siswa percaya bahwa \"kemampuan sudah ditentukan sejak lahir\". Berapa persentase siswa yang memiliki growth mindset?", options: ["25%", "50%", "65%", "75%", "85%"], correct: 3 },
                { id: 20, text: "Riko melatih kreativitasnya dengan mengembangkan ide bisnis teknologi secara bertahap: Tahap 1: Brainstorming 8 ide bisnis, Tahap 2: Seleksi menjadi 5 ide potensial, Tahap 3: Riset mendalam untuk 3 ide terbaik, Tahap 4: Prototype untuk 2 ide teratas, Tahap 5: Launching 1 ide terbaik. Dari proses kreatif Riko, berapa total ide yang ia kumpulkan di awal, dan berapa ide yang akhirnya dijalankan?", options: ["Kumpulkan 5 ide, jalankan 1 ide", "Kumpulkan 6 ide, jalankan 2 ide", "Kumpulkan 8 ide, jalankan 1 ide", "Kumpulkan 8 ide, jalankan 2 ide", "Kumpulkan 10 ide, jalankan 1 ide"], correct: 2 }
            ],
            C: [
                { id: 1, text: "Sebuah server sekolah mengalami kelambatan luar biasa. Tim IT menemukan log yang menunjukkan jutaan request dari ribuan alamat IP berbeda dalam waktu bersamaan, menyebabkan CPU server mencapai 100%. Serangan ini dikategorikan sebagai...", options: ["Phishing", "Man in the Middle", "DDoS (Distributed Denial of Service)", "SQL Injection", "Ransomware"], correct: 2 },
                { id: 2, text: "Admin jaringan sedang mengkonfigurasi Firewall untuk Web Server. Ia ingin memastikan server bisa diakses publik untuk website, tetapi tidak ingin orang asing bisa mengakses remote SSH. Konfigurasi aturan firewall mana yang paling efektif dan aman?", options: ["Allow All Traffic", "Block All Traffic", "Allow Port 80 & 443 Only, Block Others", "Allow Port 21 (FTP) & 22 (SSH) Only", "Allow ICMP Ping Only"], correct: 2 },
                { id: 3, text: "Dalam Vulnerability Assessment, ditemukan bahwa server menggunakan versi Apache yang sudah usang (outdated) dan memiliki celah keamanan CVE-2023-XXXX. Risiko terbesar jika hal ini dibiarkan adalah...", options: ["Internet menjadi lambat", "Kerusakan hardware server", "Penyerang bisa mengeksploitasi celah (Exploit) untuk mengambil alih sistem", "Server akan mati otomatis karena lisensi habis", "Tidak ada risiko karena server masih berjalan normal"], correct: 2 },
                { id: 4, text: "Seorang teknisi diminta mengamankan jaringan Wi-Fi sekolah. Pilihan enkripsi mana yang paling direkomendasikan saat ini untuk memberikan keamanan maksimal terhadap serangan brute force?", options: ["WEP (Wired Equivalent Privacy)", "WPA3-AES (Wi-Fi Protected Access 3)", "WPA (Wi-Fi Protected Access)", "TKIP (Temporal Key Integrity Protocol)", "Open System (Tanpa Password)"], correct: 1 },
                { id: 5, text: "Guru menerima email yang terlihat resmi dari 'Kepala Sekolah' meminta transfer pulsa segera dengan bahasa yang sedikit kaku dan mendesak. Setelah dicek, alamat email pengirim ternyata 'kepalasekolah123@gmail.com', bukan email resmi sekolah. Teknik serangan ini disebut...", options: ["Spamming", "Phishing / Social Engineering", "Virus", "Worm", "Adware"], correct: 1 },
                { id: 6, text: "Banyak siswa menggunakan password '123456' atau 'password' untuk akun e-learning mereka. Kebijakan keamanan (Password Policy) terbaik untuk mengatasi masalah ini adalah...", options: ["Membiarkan saja agar siswa tidak lupa", "Mewajibkan kombinasi huruf, angka, simbol, dan menerapkan MFA (Multi-Factor Authentication)", "Mewajibkan ganti password setiap hari", "Menulis password di kertas dan ditempel di monitor", "Meminta siswa saling bertukar password agar bisa saling mengingatkan"], correct: 1 },
                { id: 7, text: "Sebuah komputer di lab komputer tiba-tiba menampilkan layar merah dengan pesan 'File Anda telah dienkripsi. Bayar $500 dalam Bitcoin untuk mendapatkan kuncinya'. Serangan malware jenis ini disebut...", options: ["Spyware", "Adware", "Trojan", "Ransomware", "Rootkit"], correct: 3 },
                { id: 8, text: "Untuk mengantisipasi bencana alam atau serangan siber yang merusak data server utama, strategi backup data yang paling direkomendasikan menurut standar industri adalah...", options: ["Simpan backup di folder C: komputer yang sama", "Copy file ke satu Flashdisk dan dibawa pulang", "Strategi 3-2-1 (3 salinan data, 2 media berbeda, 1 disimpan di lokasi berbeda/cloud)", "Upload ke Google Drive saja tanpa backup lokal", "Print semua dokumen penting sebagai arsip"], correct: 2 },
                { id: 9, text: "Jaringan Wi-Fi tamu (Guest) di sekolah seringkali menyebabkan jaringan utama (Admin/Guru) menjadi lambat dan berisiko terkena virus dari perangkat tamu. Solusi jaringan terbaik untuk masalah ini adalah...", options: ["Mematikan Wi-Fi tamu selamanya", "Membeli router yang lebih mahal", "Menerapkan VLAN (Virtual Local Area Network) untuk memisahkan segmentasi jaringan", "Meminta tamu tidak menggunakan internet", "Menggunakan Hub agar semua terhubung jadi satu"], correct: 2 },
                { id: 10, text: "Jika terjadi insiden peretasan pada server sekolah, langkah pertama yang harus dilakukan menurut prosedur Incident Response adalah...", options: ["Format ulang semua komputer segera", "Panik dan mematikan listrik gedung", "Containment (Isolasi sistem yang terdampak agar serangan tidak menyebar)", "Membayar uang tebusan kepada peretas", "Membiarkan saja sampai peretas bosan"], correct: 2 },
                { id: 11, text: "Sebuah password hash sederhana membutuhkan waktu 54.000 detik untuk dipecahkan menggunakan teknik Brute Force dengan hardware standar. Berapa jam waktu yang dibutuhkan penyerang untuk menembus password tersebut?", options: ["10 Jam", "15 Jam", "20 Jam", "24 Jam", "12 Jam"], correct: 1 },
                { id: 12, text: "Sistem firewall baru berhasil memblokir serangan siber secara signifikan. Dari rata-rata 1.000 percobaan serangan per hari, setelah firewall dipasang, hanya tersisa 127 serangan yang lolos atau terdeteksi sebagai anomali. Berapa persen tingkat keberhasilan pengurangan (reduction) serangan tersebut?", options: ["80%", "85%", "87.3%", "90%", "75.5%"], correct: 2 },
                { id: 13, text: "Traffic normal sebuah jaringan kantor adalah 110 Mbps. Tiba-tiba terjadi serangan DDoS sehingga total traffic melonjak menjadi 500 Mbps. Berapa besar traffic anomali (serangan) yang membanjiri jaringan tersebut?", options: ["390 Mbps", "400 Mbps", "500 Mbps", "610 Mbps", "110 Mbps"], correct: 0 },
                { id: 14, text: "Sebuah server log keamanan menghasilkan data log sebesar 100 MB per hari. Jika kebijakan retensi data mengharuskan log disimpan selama 30 hari, berapa kapasitas penyimpanan minimal yang dibutuhkan?", options: ["1 GB", "2 GB", "3 GB", "30 GB", "100 GB"], correct: 2 },
                { id: 15, text: "Sebuah file rahasia berukuran 1.024 MB dicuri (exfiltration) oleh peretas melalui jaringan dengan kecepatan upload 8 Mbps (Megabit per second). Berapa detik waktu yang dibutuhkan peretas untuk mengambil file tersebut? (Ingat: 1 Byte = 8 bit)", options: ["128 detik", "512 detik", "1024 detik", "100 detik", "60 detik"], correct: 2 },
                { id: 16, text: "Dalam audit keamanan, ditemukan 5 celah keamanan (vulnerability) dengan skor risiko: 8, 9, 4, 2, dan 7. Jika perusahaan menetapkan bahwa hanya celah dengan skor di atas 6 yang wajib ditambal segera (High Risk), berapa jumlah celah yang harus segera diperbaiki?", options: ["1 Celah", "2 Celah", "3 Celah", "4 Celah", "5 Celah"], correct: 2 },
                { id: 17, text: "Perusahaan menginvestasikan Rp 100 Juta untuk sistem keamanan baru. Sistem ini berhasil mencegah kerugian akibat serangan siber senilai Rp 450 Juta. Berapa nilai penghematan bersih (Net Savings) yang didapatkan perusahaan?", options: ["Rp 100 Juta", "Rp 250 Juta", "Rp 350 Juta", "Rp 450 Juta", "Rp 550 Juta"], correct: 2 },
                { id: 18, text: "Seorang admin membagi jaringan menggunakan subnet mask /27 (255.255.255.224). Berapa jumlah host (IP Address) yang valid dan bisa digunakan untuk perangkat dalam satu subnet tersebut?", options: ["254 Host", "126 Host", "30 Host", "62 Host", "14 Host"], correct: 2 },
                { id: 19, text: "Analisis risiko menggunakan rumus: Risk = Impact x Probability. Jika dampak (Impact) kebocoran data bernilai 5 (Sangat Tinggi) dan kemungkinan (Probability) terjadinya bernilai 4 (Tinggi), berapa skor risiko keamanan tersebut?", options: ["9", "1", "20", "54", "10"], correct: 2 },
                { id: 20, text: "Akibat serangan Ransomware, sebuah e-commerce mati total (downtime) selama 24 jam. Jika rata-rata pendapatan per jam adalah Rp 10 Juta, berapa total kerugian finansial langsung akibat serangan tersebut?", options: ["Rp 100 Juta", "Rp 120 Juta", "Rp 200 Juta", "Rp 240 Juta", "Rp 10 Juta"], correct: 3 }
            ]
        };

        // --- STATE ---
        let currentStudent = {};
        let examTimer = null;
        let timeLeft = 3600; 
        let violations = 0;
        let violationLogs = []; 
        let userAnswers = {};
        let dashboardData = [];
        let currentFilteredData = [];
        let currentQuestionList = [];
        let currentQuestionIndex = 0;
        let isWarningActive = false; 
        
        // --- NEW: STATE UNTUK MENCEGAH FALSE POSITIVE SAAT ROTASI ---
        let isRotating = false;

        // --- LAYER 6: DETEKSI DIAM TERLALU LAMA ---
        let _lastActivityTime = Date.now();
        let _idleTimer = null;
        const _IDLE_THRESHOLD_MS = 5 * 60 * 1000; // 5 menit tanpa aktivitas apapun
        const _IDLE_CHECK_INTERVAL_MS = 30 * 1000; // cek setiap 30 detik

        // ==================== MANAJEMEN RUANG UJIAN ====================
        window.ruangList = [];


        // ════════════════════════════════════════════════════════════
        // JADWAL UJIAN OTOMATIS
        // ════════════════════════════════════════════════════════════
        window.allJadwalDB = [];
        window._jadwalSchedulerTimer = null;

        // Listen jadwal dari Firestore
        window.appearanceDefaults = {
            judulUjian : 'INTEGRITEST',
            subJudul   : 'Digitalyzing Integrity, Empowering Honestly',
            motivasi   : 'Kerjakan dengan jujur dan penuh semangat. Hasil terbaik lahir dari usaha yang sungguh-sungguh. Percayalah pada kemampuanmu — sukses menantimu!',
            logoUrl    : 'images/integritest.png'
        };

        // Terapkan pengaturan tampilan ke semua elemen UI
        window.applyAppearanceSettings = function(s) {
            if (!s) return;
            const judul   = (s.judulUjian || '').trim();
            const sub     = (s.subJudul   || '').trim();
            const mot     = (s.motivasi   || '').trim();
            const logo    = (s.logoUrl    || '').trim();
            const mode    = s.nomorIdMode || 'nisn'; // 'nisn' | 'kartu'

            // Halaman Login header (nama ujian custom)
            const loginH1  = document.getElementById('login-header-judul');
            const loginSub = document.getElementById('login-header-sub');
            const loginExamWrap = document.getElementById('login-exam-name-wrap');
            if (loginH1 && judul) { loginH1.textContent = judul; }
            if (loginSub && sub)  { loginSub.textContent = sub; }
            // Tampilkan blok nama ujian hanya kalau ada isinya
            if (loginExamWrap) {
                if (judul || sub) { loginExamWrap.classList.remove('hidden'); loginExamWrap.style.display = 'flex'; }
                else              { loginExamWrap.classList.add('hidden'); loginExamWrap.style.display = ''; }
            }

            // Logo di login
            const loginLogo = document.querySelector('#section-login img[alt="Logo TKJ"]');
            if (loginLogo && logo) loginLogo.src = logo;

            // Halaman Welcome header
            const welcomeTitle = document.querySelector('#section-welcome h2');
            // Tampilkan judulUjian di welcome (bukan hardcode 'Halo! 👋')
            const welcomeJudulEl = document.getElementById('welcome-judul-ujian');
            const welcomeSubEl   = document.getElementById('welcome-sub-judul');
            const welcomeJudulWrap = document.getElementById('welcome-judul-ujian-wrap');
            if (welcomeJudulEl && judul) {
                welcomeJudulEl.textContent = judul;
                if (welcomeJudulWrap) welcomeJudulWrap.style.display = '';
            }
            if (welcomeSubEl && sub) welcomeSubEl.textContent = sub;

            // Teks motivasi di welcome
            const motEl = document.getElementById('welcome-motivasi-text');
            if (motEl && mot) motEl.innerHTML = mot;

            // ── Ubah label & placeholder kolom ID siswa di form login ──
            window._nomorIdMode = mode;
            try { localStorage.setItem('integritest_nomor_id_mode', mode); } catch(e) {}
            const labelEl = document.getElementById('label-nomor-id');
            const inputEl = document.getElementById('student-nisn');
            const welcomeNisnLabel = document.getElementById('welcome-nisn-label');
            const dashHeaderEl = document.getElementById('th-nisn');
            if (mode === 'kartu') {
                if (labelEl)  labelEl.textContent = 'No. Kartu Ujian';
                if (inputEl)  { inputEl.placeholder = 'Ketik No. Kartu Ujian...'; inputEl.setAttribute('type', 'text'); }
                if (welcomeNisnLabel) welcomeNisnLabel.textContent = 'NO. KARTU';
                if (dashHeaderEl) dashHeaderEl.textContent = 'No. Kartu';
            } else {
                if (labelEl)  labelEl.textContent = 'NISN';
                if (inputEl)  { inputEl.placeholder = 'Ketik NISN...'; inputEl.setAttribute('type', 'number'); }
                if (welcomeNisnLabel) welcomeNisnLabel.textContent = 'NISN';
                if (dashHeaderEl) dashHeaderEl.textContent = 'NISN';
            }

            // Sinkron dropdown setting
            const modeSelect = document.getElementById('setting-nomor-id-mode');
            if (modeSelect && document.activeElement !== modeSelect) modeSelect.value = mode;

            // Update info ujian di header pengawas (jika sedang login sebagai pengawas)
            const _pjEl  = document.getElementById('pengawas-exam-judul');
            const _psEl  = document.getElementById('pengawas-exam-sub');
            const _piWrap = document.getElementById('pengawas-exam-info');
            if (_pjEl) _pjEl.textContent = judul;
            if (_psEl) _psEl.textContent = sub;
            if (_piWrap) {
                if (judul || sub) _piWrap.classList.remove('hidden');
                else _piWrap.classList.add('hidden');
            }

            // Update judul + nama SMK di header dashboard saat login Admin
            const _adJudulEl  = document.getElementById('admin-exam-judul');
            const _adSubEl    = document.getElementById('admin-exam-sub');
            const _adInfoWrap = document.getElementById('admin-exam-info');
            if (_adJudulEl) _adJudulEl.textContent = judul;
            if (_adSubEl)   _adSubEl.textContent   = sub;
            // Tampilkan hanya jika sedang login sebagai admin (bukan pengawas) dan ada isinya
            if (_adInfoWrap) {
                const isAdmin = document.getElementById('pengawas-exam-info')?.classList.contains('hidden') ?? true;
                if ((judul || sub) && isAdmin) { _adInfoWrap.classList.remove('hidden'); _adInfoWrap.style.display = 'flex'; }
                else { _adInfoWrap.classList.add('hidden'); _adInfoWrap.style.display = ''; }
            }
        };

        // Isi form panel tampilan dari pengaturan tersimpan
        window.loadTampilanFields = function() {
            const s = window._savedAppearance || {};
            const setVal = (id, v) => { const el = document.getElementById(id); if(el && v !== undefined) el.value = v; };
            setVal('setting-judul-ujian', s.judulUjian);
            setVal('setting-sub-judul',   s.subJudul);
            setVal('setting-motivasi',    s.motivasi);
            setVal('setting-logo-url',    s.logoUrl);
            setVal('setting-nomor-id-mode', s.nomorIdMode || 'nisn');
            if (window.loadAdminCredentialFields) window.loadAdminCredentialFields();
            if (window.loadGuestAdmins) window.loadGuestAdmins();
        };

        // Live preview saat mengetik


        // ==================== END SETTING TAMPILAN ====================

        // Sinkronisasi currentSesiId/Name dari jadwal aktif
        window._syncSesiFromJadwal = function() {
            const jadwalAktifList = (window.allJadwalDB || []).filter(j => j.isActive === true);
            const jadwalAktif = jadwalAktifList[0] || null;
            if (jadwalAktif) {
                window.currentSesiId   = jadwalAktif.id;
                window.currentSesiName = jadwalAktif.nama;
            } else {
                const sorted = (window.allJadwalDB || []).slice().sort((a,b) => (b.createdAt||0)-(a.createdAt||0));
                if (sorted.length > 0) {
                    window.currentSesiId   = sorted[0].id;
                    window.currentSesiName = sorted[0].nama;
                } else {
                    window.currentSesiId   = 'default';
                    window.currentSesiName = 'Sesi Default';
                }
            }
            const badge = document.getElementById('active-sesi-badge');
            const label = document.getElementById('active-sesi-label');
            if (badge && label) {
                if (jadwalAktif) {
                    const nama = jadwalAktifList.length > 1 ? jadwalAktifList.map(j => j.nama).join(', ') : jadwalAktif.nama;
                    badge.classList.remove('hidden'); badge.classList.add('flex');
                    label.textContent = nama;
                } else { badge.classList.add('hidden'); }
            }
            if (window.updateSesiFilter) window.updateSesiFilter();
        };

        // Update dropdown filter jadwal di monitoring
        window.updateSesiFilter = function() {
            const sel = document.getElementById('filter-sesi');
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = '<option value="active">Jadwal Aktif</option><option value="all">Semua Jadwal (History)</option>';
            (window.allJadwalDB || []).slice()
                .sort((a,b) => a.tanggal !== b.tanggal ? (b.tanggal > a.tanggal ? 1 : -1) : (b.jamMulai > a.jamMulai ? 1 : -1))
                .forEach(j => {
                    const opt = document.createElement('option');
                    opt.value = j.id;
                    opt.textContent = (j.nama || j.id) + (j.isActive ? ' ⚡' : '') + (j.tanggal ? ' · ' + j.tanggal : '');
                    sel.appendChild(opt);
                });
            if (current && sel.querySelector('option[value="' + current + '"]')) sel.value = current;
        };

        // listenForActiveSesi: wrapper kompatibilitas — mendelegasikan ke _syncSesiFromJadwal
        // (sesi kini ditentukan otomatis dari jadwal aktif, bukan listener terpisah)
        window.listenForActiveSesi = function() {
            if (window._syncSesiFromJadwal) window._syncSesiFromJadwal();
        };

        window.listenForJadwal = function() {
            if (!window.db || !window.isFirebaseReady) return;
            if (window._unsub_listenForJadwal) return; // ★ guard: sudah listening, skip
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian'));
            window._unsub_listenForJadwal = onSnapshot(q, (snapshot) => {
                window.allJadwalDB = [];
                snapshot.forEach(d => window.allJadwalDB.push({ id: d.id, ...d.data() }));
                // Sort: tanggal asc, jamMulai asc
                window.allJadwalDB.sort((a,b) => {
                    if (a.tanggal !== b.tanggal) return a.tanggal > b.tanggal ? 1 : -1;
                    return a.jamMulai > b.jamMulai ? 1 : -1;
                });
                window.renderJadwalList();
                window.updateJadwalTanggalFilter();
                // Update tampilan token di panel pengawas setiap kali status jadwal berubah
                if (window.updatePengawasTokenDisplay) window.updatePengawasTokenDisplay();
                // Sync currentSesiId dari jadwal aktif
                if (window._syncSesiFromJadwal) window._syncSesiFromJadwal();
            });
        };

        // Tambah jadwal baru
        window.tambahJadwal = async function() {
            if (!window.isFirebaseReady) return alert('Mode Offline — tidak bisa menyimpan jadwal.');
            const nama     = document.getElementById('jdwl-nama').value.trim();
            const tanggal  = document.getElementById('jdwl-tanggal').value;
            const mulai    = document.getElementById('jdwl-mulai').value;
            const selesai  = document.getElementById('jdwl-selesai').value;
            const paket    = document.getElementById('jdwl-paket').value.trim();
            const paketId  = document.getElementById('jdwl-paket-id').value.trim();
            const token    = document.getElementById('jdwl-token').value.trim();
            const durasi   = document.getElementById('jdwl-durasi').value;
            const kelasStr = document.getElementById('jdwl-kelas').value.trim();
            // Array kelas dari paket
            let kelasArr = [];
            try { kelasArr = JSON.parse(document.getElementById('jdwl-kelas-arr').value || '[]'); } catch(e) {}

            if (!paket)   return alert('Pilih paket soal terlebih dahulu!');
            if (!nama)    return alert('Nama sesi tidak boleh kosong!');
            if (!tanggal) return alert('Tanggal harus dipilih!');
            if (!mulai)   return alert('Jam mulai harus diisi!');
            if (!selesai) return alert('Jam selesai harus diisi!');
            if (mulai >= selesai) return alert('Jam selesai harus lebih besar dari jam mulai!');

            try {
                await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian'), {
                    nama, tanggal, jamMulai: mulai, jamSelesai: selesai,
                    paket, paketId: paketId || '',
                    kelas: kelasStr, kelasArr: kelasArr,   // simpan keduanya
                    tokenCustom: token || '',
                    durasiCustom: durasi ? parseInt(durasi) : 0,
                    isActive: false, sudahDijalankan: false,
                    createdAt: Date.now()
                });
                // Reset form
                document.getElementById('jdwl-paket').value = '';
                document.getElementById('jdwl-paket-id').value = '';
                document.getElementById('jdwl-kelas').value = '';
                document.getElementById('jdwl-kelas-arr').value = '';
                document.getElementById('jdwl-nama').value = '';
                document.getElementById('jdwl-token').value = '';
                document.getElementById('jdwl-durasi').value = '';
                const ki = document.getElementById('jdwl-kelas-info');
                if (ki) ki.innerHTML = 'Pilih paket soal terlebih dahulu...';
                const hint = document.getElementById('jdwl-token-hint');
                if (hint) hint.textContent = '(otomatis dari paket)';
                alert(`✅ Jadwal "${nama}" berhasil disimpan!\n\nOtomatis aktif: ${tanggal} pukul ${mulai}\nOtomatis mati: pukul ${selesai}`);
            } catch(e) { alert('Gagal menyimpan: ' + e.message); }
        };

        // ══════════════════════════════════════════════════════════
        // KOREKSI SOAL ESAI
        // ══════════════════════════════════════════════════════════
        let _keCurrentResultId = null;
        let _keEssayData = {}; // { qId: {...} }
        let _keScoreMC = 0;
        let _keNilaiMaks = 100;

        window.openKoreksiEssay = function(resultId) {
            const item = dashboardData.find(x => x.id === resultId);
            if (!item) return alert('Data tidak ditemukan.');
            if (!item.essayAnswers || Object.keys(item.essayAnswers).length === 0) return alert('Tidak ada soal esai pada data ini.');

            _keCurrentResultId = resultId;
            _keEssayData = JSON.parse(JSON.stringify(item.essayAnswers)); // deep copy
            _keScoreMC = item.scoreNonEssay || item.score || 0;
            const paket = (window.allPaketDB || []).find(p => p.id === item.paketId);
            _keNilaiMaks = (paket && paket.nilaiMaksimal > 0) ? paket.nilaiMaksimal : 100;

            document.getElementById('ke-student-name').textContent = item.studentName || '—';
            document.getElementById('ke-score-mc').textContent = _keScoreMC;
            window._keUpdateScoreSummary();
            window._keRenderQuestions();

            document.getElementById('modal-koreksi-essay').classList.remove('hidden');
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeKoreksiEssay = function() {
            document.getElementById('modal-koreksi-essay').classList.add('hidden');
        };

        window._keUpdateScoreSummary = function() {
            let essayTotal = 0;
            Object.values(_keEssayData).forEach(e => {
                const skor = e.skorGuru !== null && e.skorGuru !== undefined ? e.skorGuru : (e.skorAI !== null ? e.skorAI : 0);
                essayTotal += Number(skor) || 0;
            });

            // Hitung total skor esai dalam skala poin
            const totalRawEssay = essayTotal;
            // Total skor gabungan (MC + esai proporsional)
            const totalEssaySkorMaks = Object.values(_keEssayData).reduce((s, e) => s + (e.skorMaks || 10), 0);
            const qTotal = (window.allQuestionsDB || []).filter(q => q.paketId === (_keCurrentResultId && (dashboardData.find(x=>x.id===_keCurrentResultId)||{}).paketId)).length;
            // Tampilkan skor esai raw
            document.getElementById('ke-score-essay').textContent = totalRawEssay.toFixed(1);
            // Hitung total final (proporsional dari nilaiMaksimal)
            // Ini simplified: MC skor sudah dalam skala final, tambah esai proporsional
            const essayRatio = totalEssaySkorMaks > 0 ? (totalRawEssay / totalEssaySkorMaks) : 0;
            const essayContrib = Math.round(essayRatio * _keNilaiMaks * (Object.keys(_keEssayData).length / Math.max(1, qTotal || Object.keys(_keEssayData).length)));
            const total = Math.min(_keNilaiMaks, _keScoreMC + essayContrib);
            document.getElementById('ke-score-total').textContent = total;
        };

        window._keRenderQuestions = function() {
            const container = document.getElementById('ke-questions-list');
            let html = '';
            let qNum = 1;
            Object.entries(_keEssayData).forEach(([qId, e]) => {
                const skorFinal = e.skorGuru !== null && e.skorGuru !== undefined ? e.skorGuru : (e.skorAI !== null ? e.skorAI : '');
                const statusColor = e.status === 'dikoreksi' ? 'border-green-300 bg-green-50' : e.status === 'ai_done' ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-white';

                html += `
                <div class="rounded-xl border-2 ${statusColor} overflow-hidden" id="ke-card-${qId}">
                    <div class="px-4 py-3 border-b bg-gray-50 flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <span class="bg-purple-600 text-white text-xs font-black px-2 py-0.5 rounded-full">Esai ${qNum}</span>
                            <span class="text-xs font-semibold text-gray-600">Skor maks: ${e.skorMaks || 10}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            ${e.status === 'dikoreksi' ? '<span class="text-xs text-green-600 font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Selesai</span>' : e.status === 'ai_done' ? '<span class="text-xs text-purple-600 font-bold flex items-center gap-1"><i data-lucide="sparkles" class="w-3.5 h-3.5"></i> AI Selesai</span>' : '<span class="text-xs text-amber-600 font-bold flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> Pending</span>'}
                            <button onclick="window.koreksiAISatu('${qId}')" class="text-purple-600 hover:bg-purple-100 px-2 py-1 rounded-lg text-xs font-bold border border-purple-200 flex items-center gap-1 transition-all" id="ke-ai-btn-${qId}">
                                <i data-lucide="sparkles" class="w-3 h-3"></i> AI
                            </button>
                        </div>
                    </div>
                    <div class="p-4 space-y-3">
                        <div>
                            <p class="text-xs font-bold text-gray-500 uppercase mb-1.5">Soal</p>
                            <p class="text-sm text-gray-800 leading-relaxed">${e.qText || '—'}</p>
                        </div>
                        <div class="bg-blue-50 rounded-xl p-3 border border-blue-100">
                            <p class="text-xs font-bold text-blue-600 uppercase mb-1.5">Kunci / Rubrik Guru</p>
                            <p class="text-sm text-blue-900 leading-relaxed whitespace-pre-line">${e.rubrik || '—'}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-3 border">
                            <p class="text-xs font-bold text-gray-500 uppercase mb-1.5">Jawaban Siswa</p>
                            <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-line">${e.jawabanSiswa || '<em class="text-gray-400">Tidak dijawab</em>'}</p>
                        </div>
                        ${e.komentarAI ? `<div class="bg-purple-50 rounded-xl p-3 border border-purple-100">
                            <p class="text-xs font-bold text-purple-600 uppercase mb-1.5 flex items-center gap-1"><i data-lucide="sparkles" class="w-3 h-3"></i> Analisis AI</p>
                            <p class="text-sm text-purple-900 leading-relaxed">${e.komentarAI}</p>
                        </div>` : ''}
                        <div class="flex items-center gap-3 pt-1 flex-wrap">
                            <label class="text-xs font-bold text-gray-600">Skor AI:</label>
                            <span class="text-sm font-bold text-purple-600 w-10">${e.skorAI !== null && e.skorAI !== undefined ? e.skorAI : '—'}</span>
                            <label class="text-xs font-bold text-gray-600">Override Guru:</label>
                            <input type="number" min="0" max="${e.skorMaks || 10}" step="0.5" value="${e.skorGuru !== null && e.skorGuru !== undefined ? e.skorGuru : ''}"
                                class="w-20 px-2 py-1.5 border-2 border-gray-200 focus:border-green-400 rounded-lg text-sm font-bold text-green-700 outline-none"
                                placeholder="0–${e.skorMaks || 10}"
                                oninput="window._keUpdateGuru('${qId}', this.value)"
                                id="ke-guru-input-${qId}">
                            <span class="text-xs text-gray-400">/ ${e.skorMaks || 10}</span>
                            <span class="ml-auto text-sm font-black ${skorFinal !== '' && Number(skorFinal) >= (e.skorMaks||10)*0.6 ? 'text-green-600' : 'text-amber-600'}">
                                Final: <span id="ke-final-${qId}">${skorFinal !== '' ? Number(skorFinal).toFixed(1) : '—'}</span>
                            </span>
                        </div>
                    </div>
                </div>`;
                qNum++;
            });
            container.innerHTML = html || '<p class="text-center text-gray-400 py-8">Tidak ada soal esai.</p>';
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window._keUpdateGuru = function(qId, val) {
            const numVal = val === '' ? null : parseFloat(val);
            if (_keEssayData[qId]) {
                _keEssayData[qId].skorGuru = numVal;
                _keEssayData[qId].status = 'dikoreksi';
                const finalEl = document.getElementById('ke-final-' + qId);
                if (finalEl) finalEl.textContent = numVal !== null ? Number(numVal).toFixed(1) : '—';
            }
            window._keUpdateScoreSummary();
        };

        // ── INTEGRITES AI ENGINE ─────────────────────────────────────────────
        // Mesin koreksi esai mandiri tanpa API eksternal.
        // Algoritma: keyword matching (bobot 70%) + panjang jawaban (bobot 30%)
        // Threshold skor penuh: 60% kata kunci rubrik ditemukan di jawaban siswa.
        window._integritesAI = function(rubrik, jawabanSiswa, skorMaks) {
            skorMaks = parseFloat(skorMaks) || 10;

            const jawaban = (jawabanSiswa || '').trim();
            if (!jawaban || jawaban === '(tidak dijawab)') {
                return { skor: 0, komentar: 'Siswa tidak memberikan jawaban.' };
            }

            function tokenize(text) {
                return text
                    .toLowerCase()
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, ' ')
                    .split(/\s+/)
                    .filter(w => w.length > 2);
            }

            const STOPWORDS = new Set([
                'dan','atau','yang','di','ke','dari','untuk','dengan','ini','itu',
                'adalah','ada','pada','oleh','dalam','juga','sudah','belum','akan',
                'bisa','dapat','harus','perlu','saat','jika','maka','agar','karena',
                'namun','tetapi','tapi','sehingga','setelah','sebelum','ketika',
                'bahwa','seperti','antara','bagi','secara','lebih','sangat','yaitu',
                'tersebut','mereka','kami','kita','saya','kamu','dia','nya','pun',
                'hal','cara','jenis','setiap','semua','salah','satu','dua','tiga'
            ]);

            function extractKeywords(text) {
                return tokenize(text).filter(w => !STOPWORDS.has(w));
            }

            const rubrikTokens  = extractKeywords(rubrik);
            const jawabanTokens = extractKeywords(jawaban);
            const jawabanSet    = new Set(jawabanTokens);

            if (rubrikTokens.length === 0) {
                const panjangSkor = Math.min(1, jawaban.length / 200);
                const skor = parseFloat((panjangSkor * skorMaks).toFixed(1));
                return { skor, komentar: 'Rubrik tidak memiliki kata kunci spesifik. Skor diberikan berdasarkan kelengkapan jawaban.' };
            }

            let matched = 0;
            const matchedWords = [];
            const missedWords  = [];

            rubrikTokens.forEach(kw => {
                const exactMatch   = jawabanSet.has(kw);
                const partialMatch = !exactMatch && jawabanTokens.some(jw =>
                    jw.includes(kw) || kw.includes(jw)
                );
                if (exactMatch || partialMatch) {
                    matched++;
                    matchedWords.push(kw);
                } else {
                    missedWords.push(kw);
                }
            });

            const matchRatio  = matched / rubrikTokens.length;
            const THRESHOLD   = 0.6;
            const keywordScore = Math.min(1, matchRatio / THRESHOLD);
            const idealLen    = Math.max(100, rubrik.length * 1.2);
            const lengthScore = Math.min(1, jawaban.length / idealLen);
            const combined    = (keywordScore * 0.70) + (lengthScore * 0.30);
            const skor        = parseFloat((combined * skorMaks).toFixed(1));

            const persen = Math.round(matchRatio * 100);
            let komentar = '';

            if (matchRatio >= 0.8) {
                komentar = `Jawaban sangat baik! ${persen}% kata kunci rubrik ditemukan (${matchedWords.slice(0,4).join(', ')}${matchedWords.length > 4 ? ', ...' : ''}).`;
            } else if (matchRatio >= 0.6) {
                komentar = `Jawaban cukup baik. ${persen}% kata kunci rubrik terpenuhi.`;
                if (missedWords.length > 0) komentar += ` Kurang: ${missedWords.slice(0,3).join(', ')}.`;
            } else if (matchRatio >= 0.3) {
                komentar = `Jawaban kurang lengkap. Hanya ${persen}% kata kunci terpenuhi.`;
                if (missedWords.length > 0) komentar += ` Kata kunci yang terlewat: ${missedWords.slice(0,4).join(', ')}.`;
            } else {
                komentar = `Jawaban belum menjawab inti soal. Hanya ${persen}% kata kunci rubrik ditemukan.`;
                if (missedWords.length > 0) komentar += ` Perlu membahas: ${missedWords.slice(0,4).join(', ')}.`;
            }

            if (lengthScore < 0.4) komentar += ' Jawaban terlalu singkat.';
            else if (lengthScore >= 1.0) komentar += ' Jawaban cukup panjang dan detail.';

            return { skor, komentar };
        };
        // ── END INTEGRITES AI ENGINE ─────────────────────────────────────────

        window.koreksiAISatu = async function(qId) {
            const e = _keEssayData[qId];
            if (!e) return;
            const btn = document.getElementById('ke-ai-btn-' + qId);
            if (btn) { btn.disabled = true; btn.innerHTML = '<svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Menilai...'; }

            try {
                const result = window._integritesAI(
                    e.rubrik       || '',
                    e.jawabanSiswa || '',
                    e.skorMaks     || 10
                );
                _keEssayData[qId].skorAI    = result.skor;
                _keEssayData[qId].komentarAI = result.komentar;
                _keEssayData[qId].status     = 'ai_done';
            } catch(err) {
                _keEssayData[qId].komentarAI = 'Gagal koreksi: ' + (err.message || 'error');
                _keEssayData[qId].skorAI = 0;
                _keEssayData[qId].status = 'ai_done';
            }

            window._keRenderQuestions();
            window._keUpdateScoreSummary();
        };

        window.koreksiAISemua = async function() {
            const btn = document.getElementById('ke-btn-ai');
            if (btn) { btn.disabled = true; btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Memproses...'; }
            for (const qId of Object.keys(_keEssayData)) {
                await window.koreksiAISatu(qId);
            }
            if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> Koreksi Semua dengan AI'; if (typeof lucide !== 'undefined') window._createIconsSafe(); }
        };

        window.simpanKoreksiEssay = async function() {
            if (!_keCurrentResultId || !window.isFirebaseReady) return alert('Tidak bisa menyimpan.');

            // Hitung total skor esai
            let essayTotalSkor = 0;
            let totalEssaySkorMaks = 0;
            Object.values(_keEssayData).forEach(e => {
                const skor = e.skorGuru !== null && e.skorGuru !== undefined ? e.skorGuru : (e.skorAI !== null && e.skorAI !== undefined ? e.skorAI : 0);
                essayTotalSkor += Number(skor) || 0;
                totalEssaySkorMaks += Number(e.skorMaks) || 10;
            });

            const item = dashboardData.find(x => x.id === _keCurrentResultId);
            const paket = (window.allPaketDB || []).find(p => p.id === (item || {}).paketId);
            const nilaiMaks = (paket && paket.nilaiMaksimal > 0) ? paket.nilaiMaksimal : 100;
            const totalQ = (window.allQuestionsDB || []).filter(q => q.paketId === (item || {}).paketId).length || 1;
            const essayQ = Object.keys(_keEssayData).length;

            // Proporsi esai dari total soal
            const essayRatio = totalEssaySkorMaks > 0 ? (essayTotalSkor / totalEssaySkorMaks) : 0;
            const essayContrib = Math.round(essayRatio * nilaiMaks * (essayQ / totalQ));
            const finalScore = Math.min(nilaiMaks, (_keScoreMC || 0) + essayContrib);

            try {
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', _keCurrentResultId), {
                    essayAnswers: _keEssayData,
                    essayPending: false,
                    essayTotalSkor: essayTotalSkor,
                    score: finalScore,
                    status: 'SELESAI',
                    updatedAt: Date.now()
                });
                window.closeKoreksiEssay();
                alert(`✅ Koreksi esai disimpan!\n\nSkor pilihan: ${_keScoreMC}\nSkor esai: ${essayTotalSkor.toFixed(1)}\nNilai akhir: ${finalScore}`);
            } catch(e) { alert('Gagal menyimpan: ' + e.message); }
        };
        // ── END KOREKSI ESAI ────────────────────────────────────


        window.editJadwal = function(id) {
            const j = window.allJadwalDB.find(x => x.id === id);
            if (!j) return alert('Jadwal tidak ditemukan.');

            document.getElementById('edit-jdwl-id').value = id;
            document.getElementById('edit-jdwl-nama').value = j.nama || '';
            document.getElementById('edit-jdwl-tanggal').value = j.tanggal || '';
            document.getElementById('edit-jdwl-mulai').value = j.jamMulai || '';
            document.getElementById('edit-jdwl-selesai').value = j.jamSelesai || '';
            document.getElementById('edit-jdwl-token').value = j.tokenCustom || '';
            document.getElementById('edit-jdwl-durasi').value = j.durasiCustom || '';
            document.getElementById('edit-jdwl-kelas').value = j.kelas || '';
            document.getElementById('edit-jdwl-kelas-arr').value = JSON.stringify(j.kelasArr || []);

            // Populate paket dropdown
            const sel = document.getElementById('edit-jdwl-paket');
            sel.innerHTML = '<option value="">— Pilih Paket Soal —</option>';
            (window.allPaketDB || []).forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.nama || '';
                opt.dataset.id = p.id;
                opt.dataset.token = p.token || '';
                opt.dataset.durasi = p.durasi || '';
                opt.dataset.kelas = JSON.stringify(p.kelas || []);
                opt.textContent = p.nama + (p.jenis && p.jenis !== 'nonpaket' ? ` (Paket ${p.jenis})` : '');
                if (p.id === j.paketId || p.nama === j.paket) opt.selected = true;
                sel.appendChild(opt);
            });
            document.getElementById('edit-jdwl-paket-id').value = j.paketId || '';

            // Populate kelas info from saved data
            const kelasArrJ = j.kelasArr && j.kelasArr.length ? j.kelasArr : (j.kelas ? [j.kelas] : []);
            const ki = document.getElementById('edit-jdwl-kelas-info');
            if (kelasArrJ.length) {
                ki.innerHTML = kelasArrJ.map(k => `<span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold text-xs">${k}</span>`).join('');
            } else {
                ki.innerHTML = '<span class="text-gray-400 italic text-xs">Tidak ada kelas</span>';
            }

            document.getElementById('modal-edit-jadwal').classList.remove('hidden');
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeEditJadwal = function() {
            document.getElementById('modal-edit-jadwal').classList.add('hidden');
        };

        window.onEditJadwalPaketChange = function() {
            const sel = document.getElementById('edit-jdwl-paket');
            const opt = sel.options[sel.selectedIndex];
            if (!opt || !opt.value) return;

            const paketId = opt.dataset.id || '';
            const token   = opt.dataset.token || '';
            const durasi  = opt.dataset.durasi || '';
            let kelasArr  = [];
            try { kelasArr = JSON.parse(opt.dataset.kelas || '[]'); } catch(e) {}

            document.getElementById('edit-jdwl-paket-id').value = paketId;
            document.getElementById('edit-jdwl-token').value = token;
            document.getElementById('edit-jdwl-durasi').value = durasi;
            document.getElementById('edit-jdwl-kelas').value = kelasArr.join(', ');
            document.getElementById('edit-jdwl-kelas-arr').value = JSON.stringify(kelasArr);

            const ki = document.getElementById('edit-jdwl-kelas-info');
            if (kelasArr.length) {
                ki.innerHTML = kelasArr.map(k => `<span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold text-xs">${k}</span>`).join('');
                ki.className = 'w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm bg-gray-50 min-h-[38px] flex items-center flex-wrap gap-1';
            } else {
                ki.innerHTML = '<span class="text-gray-400 italic text-xs">Tidak ada kelas terdaftar di paket ini</span>';
            }

            // Auto-fill nama sesi jika masih default
            const namaEl = document.getElementById('edit-jdwl-nama');
            if (!namaEl.value || namaEl.value.startsWith('Sesi')) {
                const paketNama = opt.value;
                namaEl.value = `Sesi ${paketNama}`;
            }
        };

        window.simpanEditJadwal = async function() {
            if (!window.isFirebaseReady) return alert('Mode Offline — tidak bisa menyimpan.');
            const id      = document.getElementById('edit-jdwl-id').value;
            const nama    = document.getElementById('edit-jdwl-nama').value.trim();
            const tanggal = document.getElementById('edit-jdwl-tanggal').value;
            const mulai   = document.getElementById('edit-jdwl-mulai').value;
            const selesai = document.getElementById('edit-jdwl-selesai').value;
            const paket   = document.getElementById('edit-jdwl-paket').value.trim();
            const paketId = document.getElementById('edit-jdwl-paket-id').value.trim();
            const token   = document.getElementById('edit-jdwl-token').value.trim();
            const durasi  = document.getElementById('edit-jdwl-durasi').value;
            const kelasStr = document.getElementById('edit-jdwl-kelas').value.trim();
            let kelasArr = [];
            try { kelasArr = JSON.parse(document.getElementById('edit-jdwl-kelas-arr').value || '[]'); } catch(e) {}

            if (!paket)   return alert('Pilih paket soal!');
            if (!nama)    return alert('Nama sesi tidak boleh kosong!');
            if (!tanggal) return alert('Tanggal harus dipilih!');
            if (!mulai)   return alert('Jam mulai harus diisi!');
            if (!selesai) return alert('Jam selesai harus diisi!');
            if (mulai >= selesai) return alert('Jam selesai harus lebih besar dari jam mulai!');

            try {
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian', id), {
                    nama, tanggal, jamMulai: mulai, jamSelesai: selesai,
                    paket, paketId: paketId || '',
                    kelas: kelasStr, kelasArr: kelasArr,
                    tokenCustom: token || '',
                    durasiCustom: durasi ? parseInt(durasi) : 0,
                    updatedAt: Date.now()
                });
                window.closeEditJadwal();
            } catch(e) { alert('Gagal menyimpan: ' + e.message); }
        };

        // Hapus jadwal
        window.hapusJadwal = async function(id, nama) {
            if (!confirm(`Hapus jadwal "${nama}"?\n\nJika jadwal sedang aktif, sesi akan tetap aktif sampai Anda menonaktifkan secara manual.`)) return;
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian', id));
            } catch(e) { alert('Gagal hapus: ' + e.message); }
        };

        // Toggle aktif/nonaktif manual
        window.toggleJadwalManual = async function(id, currentState, nama) {
            if (!window.isFirebaseReady) return alert('Mode Offline.');
            const action = currentState ? 'Nonaktifkan' : 'Aktifkan';
            if (!confirm(`${action} jadwal "${nama}" secara manual?`)) return;
            try {
                if (!currentState) {
                    // Aktifkan: nonaktifkan semua sesi ujian dulu, lalu aktifkan jadwal ini
                    const j = window.allJadwalDB.find(x => x.id === id);
                    if (j) await window._aktifkanJadwal(j, true);
                } else {
                    await window._nonaktifkanJadwal(id);
                }
            } catch(e) { alert('Gagal: ' + e.message); }
        };

        // Internal: aktifkan sesi berdasarkan jadwal
        window._aktifkanJadwal = async function(jadwal, manual = false) {
            if (!window.isFirebaseReady || !window.db) return;
            try {
                // Buat sesi baru khusus untuk jadwal ini (TIDAK nonaktifkan sesi lain)
                // Sehingga banyak jadwal bisa aktif bersamaan di jam yang sama (beda kelas/mapel)
                const docRef = await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'sesi_ujian'), {
                    nama: jadwal.nama,
                    keterangan: [jadwal.paket, (jadwal.kelasArr && jadwal.kelasArr.length ? jadwal.kelasArr.join(', ') : jadwal.kelas)].filter(Boolean).join(' · '),
                    jadwalId: jadwal.id,   // referensi ke jadwal
                    paketId:  jadwal.paketId || '',
                    isActive: true,
                    createdAt: Date.now()
                });

                // Update token custom jika ada (per-jadwal, tidak global)
                // Token disimpan di jadwal itu sendiri, bukan overwrite global

                // Update durasi jika ada custom durasi
                if (jadwal.durasiCustom && jadwal.durasiCustom > 0) {
                    window.currentExamDuration = jadwal.durasiCustom;
                }

                // Tandai jadwal sudah dijalankan & aktif
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian', jadwal.id), {
                    isActive: true, sudahDijalankan: true, sesiRefId: docRef.id
                });

                console.log(`[Jadwal] ✅ Sesi "${jadwal.nama}" diaktifkan ${manual ? 'manual' : 'otomatis'}`);
            } catch(e) { console.error('[Jadwal] Gagal aktifkan:', e); }
        };

        // Internal: nonaktifkan sesi milik jadwal ini saja
        window._nonaktifkanJadwal = async function(jadwalId) {
            if (!window.isFirebaseReady || !window.db) return;
            try {
                const jadwal = (window.allJadwalDB || []).find(j => j.id === jadwalId);
                // Hanya nonaktifkan sesi yang terkait jadwal ini (via jadwalId atau sesiRefId)
                // Sesi ujian tidak lagi dikelola manual - jadwal langsung jadi acuan
                // Update jadwal
                if (jadwal) {
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'jadwal_ujian', jadwalId), {
                        isActive: false
                    });
                }
                console.log(`[Jadwal] 🔴 Jadwal "${jadwal ? jadwal.nama : jadwalId}" dinonaktifkan`);
            } catch(e) { console.error('[Jadwal] Gagal nonaktifkan:', e); }
        };

        // ── SCHEDULER — dicek tiap menit ──
        window.startJadwalScheduler = function() {
            if (window._jadwalSchedulerTimer) clearInterval(window._jadwalSchedulerTimer);
            const check = () => {
                if (!window.isAdmin || !window.isAdmin()) return; // hanya admin yang menjalankan scheduler
                if (!window.allJadwalDB || !window.isFirebaseReady) return;

                const now = new Date();
                const todayStr = now.toISOString().slice(0,10); // YYYY-MM-DD
                const timeStr  = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0'); // HH:MM

                window.allJadwalDB.forEach(async j => {
                    if (j.tanggal !== todayStr) return; // bukan hari ini

                    const tepat_mulai = (timeStr === j.jamMulai);
                    const sudah_lewat_selesai = (timeStr > j.jamSelesai);
                    const sedang_berjalan = (timeStr >= j.jamMulai && timeStr <= j.jamSelesai);

                    // Aktifkan tepat pada jam mulai
                    if (tepat_mulai && !j.isActive) {
                        await window._aktifkanJadwal(j);
                        return;
                    }

                    // Nonaktifkan saat melewati jam selesai
                    if (sudah_lewat_selesai && j.isActive) {
                        await window._nonaktifkanJadwal(j.id);
                        return;
                    }
                });
            };
            check(); // cek langsung saat mulai
            window._jadwalSchedulerTimer = setInterval(check, 60000); // cek tiap menit
            console.log('[Jadwal] Scheduler dimulai, cek tiap menit.');
        };

        // ════════════════════════════════════════════════════════════
        // AUTO-FINISH CHECKER — Otomatis selesaikan ujian siswa yang
        // browsernya ditutup atau waktu habis tanpa kembali ke aplikasi.
        // Berjalan setiap 1 menit di semua user yang terhubung.
        // ════════════════════════════════════════════════════════════
        window.startAutoFinishChecker = function() {
            if (window._autoFinishTimer) clearInterval(window._autoFinishTimer);

            const BUFFER_MS          = 5 * 60 * 1000;  // 5 menit toleransi setelah waktu resmi habis
            const HEARTBEAT_STALE_MS = 3 * 60 * 1000;  // 3 menit tanpa heartbeat = browser sudah tutup

            const check = async () => {
                if (!window.isFirebaseReady || !window.db) return;
                try {
                    const snap = await window.getDocs(
                        window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                    );
                    const now = Date.now();
                    const promises = [];
                    snap.forEach(ds => {
                        const d = ds.data();
                        const isOngoing = d.status === 'SEDANG MENGERJAKAN' || (d.status || '').includes('MELANJUTKAN');
                        if (!isOngoing) return;

                        const startMs    = d.startTime || d.timestamp;
                        if (!startMs) return;

                        const durasiMnt  = d.examDurationMinutes || window.currentExamDuration || 60;
                        const deadlineMs = startMs + (durasiMnt * 60 * 1000);
                        const isTimeUp   = now > (deadlineMs + BUFFER_MS);

                        const lastHB     = d.lastHeartbeat || startMs;
                        const isStale    = (now - lastHB) > HEARTBEAT_STALE_MS;

                        if (isTimeUp && isStale) {
                            console.log('[AutoFinish] Timeout:', d.studentName, '— otomatis diselesaikan');
                            const lastScore = (d.score !== '-' && d.score != null) ? d.score : 0;
                            promises.push(
                                window.updateDoc(
                                    window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', ds.id),
                                    {
                                        status:        'SELESAI (Waktu Habis - Otomatis)',
                                        endTime:       deadlineMs,
                                        score:         lastScore,
                                        scoreNonEssay: lastScore,
                                        forceFinishSignal: false,
                                        note: (d.note || '') + '\n[' + new Date().toLocaleString('id-ID') + '] Otomatis diselesaikan sistem: waktu habis dan browser tidak aktif.'
                                    }
                                ).catch(e => console.warn('[AutoFinish] Gagal update', d.studentName, e))
                            );
                        }
                    });
                    if (promises.length > 0) await Promise.all(promises);
                } catch(e) { console.warn('[AutoFinish] Error:', e); }
            };

            check();
            window._autoFinishTimer = setInterval(check, 60000);
            console.log('[AutoFinish] Checker aktif — cek tiap 1 menit.');
        };

        // Render list jadwal
        window.renderJadwalList = function() {
            const container = document.getElementById('jadwal-list-container');
            if (!container) return;

            const filterEl = document.getElementById('jdwl-filter-tanggal');
            const filterVal = filterEl ? filterEl.value : 'all';

            let list = [...window.allJadwalDB].sort((a,b) => (a.tanggal||'').localeCompare(b.tanggal||'') || (a.jamMulai||'').localeCompare(b.jamMulai||''));
            if (filterVal && filterVal !== 'all') {
                list = list.filter(j => j.tanggal === filterVal);
            }

            const pwJadwal = document.getElementById('pager-jadwal-wrap');
            if (list.length === 0) {
                container.innerHTML = '<p class="text-sm text-gray-400 text-center py-8 bg-gray-50 rounded-xl border border-dashed">Belum ada jadwal. Tambah jadwal di atas.</p>';
                if (pwJadwal) pwJadwal.innerHTML = '';
                return;
            }

            // ★ PAGING
            const pgJadwal = window._pg.jadwal;
            const totalJadwal = list.length;
            list = pgSlice(list, pgJadwal);

            // Group by tanggal
            const groups = {};
            list.forEach(j => {
                if (!groups[j.tanggal]) groups[j.tanggal] = [];
                groups[j.tanggal].push(j);
            });

            const now = new Date();
            const todayStr = now.toISOString().slice(0,10);
            const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

            container.innerHTML = Object.entries(groups).map(([tgl, jadwals]) => {
                const d = new Date(tgl + 'T00:00:00');
                const hariNama = d.toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
                const isToday = tgl === todayStr;

                const rows = jadwals.map(j => {
                    const sudahLewat = tgl < todayStr || (isToday && timeStr > j.jamSelesai);
                    const sedangAktif = j.isActive || (isToday && timeStr >= j.jamMulai && timeStr <= j.jamSelesai);
                    const belumMulai = !sudahLewat && !sedangAktif;

                    let statusBadge = '';
                    if (j.isActive || sedangAktif) {
                        statusBadge = '<span class="shrink-0 bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide animate-pulse">⚡ Aktif</span>';
                    } else if (sudahLewat) {
                        statusBadge = '<span class="shrink-0 bg-gray-300 text-gray-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">✓ Selesai</span>';
                    } else {
                        statusBadge = '<span class="shrink-0 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">⏳ Menunggu</span>';
                    }

                    // Kelas dari array (lebih akurat) atau fallback ke string
                    const kelasArrJ = j.kelasArr && j.kelasArr.length ? j.kelasArr : (j.kelas ? [j.kelas] : []);
                    const kelasBadges = kelasArrJ.length
                        ? kelasArrJ.map(k => `<span class="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-[10px] font-bold">${k}</span>`).join(' ')
                        : '<span class="text-[10px] text-gray-400">Semua kelas</span>';
                    const paketInfo = j.paket ? `<span class="text-xs font-medium text-gray-600">${j.paket}</span>` : '';
                    const tokenInfo = j.tokenCustom ? `<span class="text-xs text-indigo-600 font-mono">Token: ${j.tokenCustom}</span>` : '';
                    const durasiInfo = j.durasiCustom ? `<span class="text-xs text-gray-400">${j.durasiCustom} mnt</span>` : '';

                    return `
                    <div class="flex items-center gap-3 p-4 rounded-xl border ${j.isActive ? 'bg-green-50 border-green-300' : sudahLewat ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-gray-200'}">
                        <div class="flex flex-col items-center justify-center bg-violet-100 text-violet-700 rounded-xl p-2.5 text-xs font-black shrink-0 w-16 text-center leading-tight">
                            <span>${j.jamMulai}</span>
                            <span class="text-gray-400 font-normal">↓</span>
                            <span>${j.jamSelesai}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-sm text-gray-800">${_e(j.nama)}</span>
                                ${statusBadge}
                            </div>
                            <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                                ${paketInfo || kelasBadges ? `<div class="flex items-center gap-1.5 flex-wrap mt-0.5">${paketInfo}${paketInfo && kelasBadges ? '<span class="text-gray-300">·</span>' : ''}${kelasBadges}</div>` : ''}
                                ${tokenInfo}
                                ${durasiInfo}
                            </div>
                        </div>
                        <div class="flex gap-1.5 shrink-0">
                            ${!sudahLewat ? `<button onclick="window.toggleJadwalManual('${j.id}',${!!j.isActive},'${j.nama.replace(/'/g,"\\'")}') " title="${j.isActive ? 'Nonaktifkan' : 'Aktifkan'} manual" class="text-xs font-bold ${j.isActive ? 'text-red-600 hover:bg-red-50 border-red-200' : 'text-green-600 hover:bg-green-50 border-green-200'} border px-3 py-1.5 rounded-lg transition-colors">${j.isActive ? '⏹ Stop' : '▶ Mulai'}</button>` : ''}
                            <button onclick="window.editJadwal('${j.id}')" title="Edit jadwal" class="text-violet-500 hover:bg-violet-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-violet-200"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                            <button onclick="window.hapusJadwal('${j.id}','${j.nama.replace(/'/g,"\\'")}') " title="Hapus jadwal" class="text-red-400 hover:bg-red-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-red-200"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>`;
                }).join('');

                return `
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="font-bold text-sm ${isToday ? 'text-violet-700' : 'text-gray-600'}">${hariNama}</span>
                        ${isToday ? '<span class="text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-full font-bold">HARI INI</span>' : ''}
                    </div>
                    <div class="space-y-2 ml-1 pl-3 border-l-2 ${isToday ? 'border-violet-300' : 'border-gray-200'}">
                        ${rows}
                    </div>
                </div>`;
            }).join('');

            if (pwJadwal) pwJadwal.innerHTML = renderPagerHTML('jadwal', totalJadwal, pgJadwal.page, pgJadwal.perPage);
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // Update filter tanggal dropdown
        window.updateJadwalTanggalFilter = function() {
            const sel = document.getElementById('jdwl-filter-tanggal');
            if (!sel) return;
            const cur = sel.value;
            sel.innerHTML = '<option value="all">Semua Tanggal</option>';
            const datesSet = new Set(window.allJadwalDB.map(j => j.tanggal));
            [...datesSet].sort().forEach(tgl => {
                const opt = document.createElement('option');
                opt.value = tgl;
                const d = new Date(tgl + 'T00:00:00');
                opt.textContent = d.toLocaleDateString('id-ID', { weekday:'short', day:'numeric', month:'short' });
                sel.appendChild(opt);
            });
            if (cur) sel.value = cur;
        };

        // ── Populate dropdown paket dari database (kelas tidak perlu dropdown lagi) ──
        window.populateJadwalDropdowns = function() {
            const selPaket = document.getElementById('jdwl-paket');
            if (selPaket) {
                const cur = selPaket.value;
                selPaket.innerHTML = '<option value="">— Pilih Paket Soal —</option>';
                (window.allPaketDB || []).forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p.nama;
                    opt.dataset.paketId  = p.id;
                    opt.dataset.token    = p.token || window.currentExamToken || '';
                    opt.dataset.durasi   = p.durasi || p.duration || '';
                    // Simpan kelas sebagai JSON string di dataset
                    opt.dataset.kelasArr = JSON.stringify(p.kelas || []);
                    opt.dataset.mapel    = p.mapel || '';
                    const kelasTxt = (p.kelas && p.kelas.length) ? ` [${p.kelas.join(', ')}]` : '';
                    opt.textContent = p.nama + (p.jenis && p.jenis !== 'nonpaket' ? ` (Paket ${p.jenis})` : '') + kelasTxt;
                    selPaket.appendChild(opt);
                });
                if (cur) selPaket.value = cur;
            }
        };

        // Tidak lagi dibutuhkan, tapi dijaga agar tidak error jika dipanggil
        window.onJadwalKelasChange = function() {};

        // Saat paket dipilih → isi kelas, token, durasi, nama sesi otomatis
        window.onJadwalPaketChange = function() {
            const selPaket  = document.getElementById('jdwl-paket');
            const selOpt    = selPaket ? selPaket.options[selPaket.selectedIndex] : null;
            const tokenEl   = document.getElementById('jdwl-token');
            const durasiEl  = document.getElementById('jdwl-durasi');
            const paketIdEl = document.getElementById('jdwl-paket-id');
            const kelasEl   = document.getElementById('jdwl-kelas');
            const kelasArrEl= document.getElementById('jdwl-kelas-arr');
            const kelasInfo = document.getElementById('jdwl-kelas-info');

            if (selOpt && selOpt.value) {
                const token    = selOpt.dataset.token    || window.currentExamToken || '';
                const durasi   = selOpt.dataset.durasi   || '';
                const pid      = selOpt.dataset.paketId  || '';
                const kelasArr = JSON.parse(selOpt.dataset.kelasArr || '[]');

                if (tokenEl)    { tokenEl.value  = token; }
                if (durasiEl)   { durasiEl.value = durasi; }
                if (paketIdEl)  { paketIdEl.value = pid; }
                if (kelasEl)    { kelasEl.value   = kelasArr.join(', '); }
                if (kelasArrEl) { kelasArrEl.value = JSON.stringify(kelasArr); }

                // Tampilkan kelas sebagai badge-badge
                if (kelasInfo) {
                    if (kelasArr.length > 0) {
                        kelasInfo.innerHTML = kelasArr.map(k =>
                            `<span class="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-lg text-xs font-bold">${k}</span>`
                        ).join('');
                        kelasInfo.classList.remove('text-gray-400','italic');
                    } else {
                        kelasInfo.innerHTML = '<span class="text-gray-400 italic text-xs">Semua kelas (tidak dibatasi di paket ini)</span>';
                        kelasInfo.classList.add('text-gray-400','italic');
                    }
                }

                const hint = document.getElementById('jdwl-token-hint');
                if (hint) hint.textContent = token ? `(Token: ${token})` : '(otomatis dari paket)';
            } else {
                // Reset semua
                if (tokenEl)    { tokenEl.value  = ''; }
                if (durasiEl)   { durasiEl.value = ''; }
                if (paketIdEl)  { paketIdEl.value = ''; }
                if (kelasEl)    { kelasEl.value   = ''; }
                if (kelasArrEl) { kelasArrEl.value = ''; }
                if (kelasInfo)  { kelasInfo.innerHTML = 'Pilih paket soal terlebih dahulu...'; kelasInfo.classList.add('text-gray-400','italic'); }
                const hint = document.getElementById('jdwl-token-hint');
                if (hint) hint.textContent = '(otomatis dari paket)';
            }
            window._autoGenerateNamaSesi();
        };

        // Auto-generate nama sesi dari paket + kelas + urutan hari ini
        window._autoGenerateNamaSesi = function() {
            const paketEl  = document.getElementById('jdwl-paket');
            const paket    = paketEl ? paketEl.value : '';
            const tgl      = document.getElementById('jdwl-tanggal') ? document.getElementById('jdwl-tanggal').value : '';
            if (!paket) return;
            const countSameTgl = tgl ? (window.allJadwalDB || []).filter(j => j.tanggal === tgl).length : 0;
            const sesiKe = countSameTgl + 1;
            // Ambil kelas dari hidden field
            const kelasArr = JSON.parse((document.getElementById('jdwl-kelas-arr') || {value:'[]'}).value || '[]');
            const kelasTxt = kelasArr.length ? kelasArr.join(' & ') : '';
            const parts = [`Sesi ${sesiKe}`, paket];
            if (kelasTxt) parts.push(kelasTxt);
            const namaEl = document.getElementById('jdwl-nama');
            if (namaEl) namaEl.value = parts.join(' - ');
        };

        // Set default tanggal & populate dropdown paket
        window.initJadwalForm = function() {
            const tglInput = document.getElementById('jdwl-tanggal');
            if (tglInput) {
                if (!tglInput.value) tglInput.value = new Date().toISOString().slice(0,10);
                // Pastikan event listener tidak double
                tglInput.onchange = window._autoGenerateNamaSesi;
            }
            window.populateJadwalDropdowns();
        };
        // ════════════════════════════════════════════════════════════
        // END JADWAL UJIAN OTOMATIS
        // ════════════════════════════════════════════════════════════


        // ADMIN CREDENTIALS MANAGEMENT (Firebase-based)
        // ═══════════════════════════════════════════════════════

        // Seed credentials default ke Firebase (pertama kali)
        window.ensureAdminCredentials = async function() {
            if (!window.isFirebaseReady || !window.db) return;
            try {
                const snap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials'));
                if (snap.empty) {
                    await setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials', 'main_admin'), {
                        username: 'authar', password: 'Sedayu@123',
                        displayName: 'Admin Utama', createdAt: Date.now()
                    });
                }
            } catch(e) { console.warn('ensureAdminCredentials:', e); }
        };

        // Simpan perubahan username & password admin
        window.saveAdminCredentials = async function() {
            if (!window.isFirebaseReady || !window.db) {
                alert('Fitur ini memerlukan koneksi internet (Firebase).');
                return;
            }
            const newUser    = (document.getElementById('setting-admin-user')?.value || '').trim();
            const newDisplay = (document.getElementById('setting-admin-display')?.value || '').trim();
            const oldPass    = document.getElementById('setting-admin-old-pass')?.value || '';
            const newPass    = document.getElementById('setting-admin-new-pass')?.value || '';
            const confPass   = document.getElementById('setting-admin-conf-pass')?.value || '';

            if (!newUser || newUser.length < 4) { alert('Username minimal 4 karakter!'); return; }
            if (!oldPass) { alert('Masukkan password lama untuk konfirmasi identitas!'); return; }

            // Verifikasi password lama
            let docId = null;
            try {
                const snap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials'));
                snap.forEach(ds => { if (ds.data().password === oldPass) docId = ds.id; });
            } catch(e) { alert('Gagal memverifikasi: ' + e.message); return; }

            if (!docId) { alert('\u274C Password lama salah! Perubahan dibatalkan.'); return; }

            // Validasi password baru (opsional — hanya jika diisi)
            let finalPass = oldPass;
            if (newPass) {
                if (newPass.length < 6) { alert('Password baru minimal 6 karakter!'); return; }
                if (newPass !== confPass) { alert('Konfirmasi password baru tidak cocok!'); return; }
                finalPass = newPass;
            }

            try {
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials', docId), {
                    username: newUser, password: finalPass,
                    displayName: newDisplay || newUser, updatedAt: Date.now()
                });
                ['setting-admin-old-pass','setting-admin-new-pass','setting-admin-conf-pass'].forEach(id => {
                    const el = document.getElementById(id); if (el) el.value = '';
                });
                alert('\u2705 Kredensial admin berhasil diperbarui!\n\nUsername: ' + newUser + '\nPassword: ' + (newPass ? '(diperbarui)' : '(tidak berubah)') + '\n\nGunakan data baru saat login berikutnya.');
            } catch(e) { alert('Gagal menyimpan: ' + e.message); }
        };

        // Load data kredensial ke form saat panel dibuka
        window.loadAdminCredentialFields = async function() {
            if (!window.isFirebaseReady || !window.db) return;
            try {
                const snap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials'));
                snap.forEach(ds => {
                    const d = ds.data();
                    const el1 = document.getElementById('setting-admin-user');
                    const el2 = document.getElementById('setting-admin-display');
                    if (el1) el1.value = d.username || '';
                    if (el2) el2.value = d.displayName || '';
                });
            } catch(e) { console.warn('loadAdminCredentialFields:', e); }
        };

                window.listenForRuang = function() {
            if (!window.db || !window.isFirebaseReady) return;
            if (window._unsub_listenForRuang) return; // ★ guard: sudah listening, skip
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'ruang_ujian'));
            window._unsub_listenForRuang = onSnapshot(q, (snapshot) => {
                window.ruangList = [];
                snapshot.forEach((d) => {
                    window.ruangList.push({ id: d.id, ...d.data() });
                });
                window.ruangList.sort((a,b) => (a.nama||'').localeCompare(b.nama||''));
                window.renderRuangList();
                window.updateRuangDropdowns();
            });
        };

        window.renderRuangList = function() {
            const tbody = document.getElementById('ruang-table-body');
            if (!tbody) return;
            const pw = document.getElementById('pager-ruang-wrap');
            const total = window.ruangList.length;
            if (total === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="px-6 py-10 text-center text-gray-400">Belum ada ruang ujian. Tambah ruang baru.</td></tr>';
                if (pw) pw.innerHTML = '';
                return;
            }
            const pgR = window._pg.ruang;
            const pageItems = pgSlice(window.ruangList, pgR);
            const sliceStart = pgR.perPage === 0 ? 0 : (pgR.page - 1) * pgR.perPage;
            tbody.innerHTML = pageItems.map((r, i) => {
                const globalIdx = sliceStart + i;
                return `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm text-gray-500">${globalIdx + 1}</td>
                    <td class="px-6 py-4 font-semibold text-gray-800">
                        <span class="inline-flex items-center gap-2">
                            <span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-xs font-black">${globalIdx + 1}</span>
                            ${_e(r.nama)}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <code class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono font-bold">${r.password || '—'}</code>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">${_e(r.keterangan) || '-'}</td>
                    <td class="px-6 py-4 text-center">
                        <div class="flex gap-2 justify-center">
                            <button onclick="window.openRuangModal('${r.id}')" class="text-amber-600 hover:bg-amber-50 p-2 rounded-lg" title="Edit"><i data-lucide="pencil" class="w-4 h-4"></i></button>
                            <button onclick="window.deleteRuang('${r.id}','${_e(r.nama)}')" class="text-red-500 hover:bg-red-50 p-2 rounded-lg" title="Hapus"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </td>
                </tr>`;
            }).join('');
            if (pw) pw.innerHTML = renderPagerHTML('ruang', total, pgR.page, pgR.perPage);
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.updateRuangDropdowns = function() {
            const filterRuang = document.getElementById('filter-ruang');
            if (filterRuang && !filterRuang.disabled) {
                const current = filterRuang.value;
                filterRuang.innerHTML = '<option value="all">Semua Ruang</option>';
                window.ruangList.forEach(r => {
                    const opt = document.createElement('option');
                    opt.value = r.nama;
                    opt.textContent = r.nama;
                    filterRuang.appendChild(opt);
                });
                if (current) filterRuang.value = current;
            }
            window.updateStudentRoomDropdown();
            window.updatePengawasRoomDropdown();
            // Refresh dropdown analitik agar ikut terupdate dari data master ruang
            if (window.renderIntegrityDashboard && document.getElementById('panel-analitik') && !document.getElementById('panel-analitik').classList.contains('hidden-section')) {
                window.renderIntegrityDashboard();
            }
        };

        window.updateStudentRoomDropdown = function() {
            const sel = document.getElementById('student-room');
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = '<option value="">-- Pilih Ruang Ujian --</option>';
            window.ruangList.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.nama;
                opt.textContent = r.nama;
                sel.appendChild(opt);
            });
            if (current) sel.value = current;
        };

        window.openRuangModal = function(id = null) {
            const modal = document.getElementById('modal-ruang');
            document.getElementById('ruang-id').value = '';
            document.getElementById('ruang-nama').value = '';
            document.getElementById('ruang-password').value = '';
            document.getElementById('ruang-keterangan').value = '';
            if (id) {
                const r = window.ruangList.find(x => x.id === id);
                if (r) {
                    document.getElementById('ruang-id').value = r.id;
                    document.getElementById('ruang-nama').value = r.nama || '';
                    document.getElementById('ruang-password').value = r.password || '';
                    document.getElementById('ruang-keterangan').value = r.keterangan || '';
                }
            }
            modal.classList.remove('hidden');
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeRuangModal = function() {
            document.getElementById('modal-ruang').classList.add('hidden');
        };

        window.saveRuang = async function(e) {
            e.preventDefault();
            if (!window.isFirebaseReady) return alert("Mode Offline: Tidak bisa menyimpan.");
            const id   = document.getElementById('ruang-id').value;
            const nama = document.getElementById('ruang-nama').value.trim();
            const pass = document.getElementById('ruang-password').value.trim().toUpperCase();
            const ket  = document.getElementById('ruang-keterangan').value.trim();
            if (!nama) return alert("Nama ruang tidak boleh kosong!");
            if (!pass) return alert("Password pengawas tidak boleh kosong!");
            const data = { nama, password: pass, keterangan: ket, updatedAt: Date.now() };
            try {
                if (id) {
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'ruang_ujian', id), data);
                } else {
                    data.createdAt = Date.now();
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'ruang_ujian'), data);
                }
                window.closeRuangModal();
            } catch(err) { alert("Gagal menyimpan: " + err.message); }
        };

        window.deleteRuang = async function(id, nama) {
            if (!confirm(`Hapus ruang "${nama}"?\n\nData siswa di ruang ini tidak akan terhapus.`)) return;
            if (!window.isFirebaseReady) return alert("Mode Offline.");
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'ruang_ujian', id));
            } catch(err) { alert("Gagal hapus: " + err.message); }
        };
        // ==================== END MANAJEMEN RUANG ====================

        window.switchLoginTab = function(type) {
            const btnStudent = document.getElementById('tab-student');
            const btnTeacher = document.getElementById('tab-teacher');
            const formStudent = document.getElementById('form-student');
            const formTeacher = document.getElementById('form-teacher');

            if (type === 'student') {
                btnStudent.className = "flex-1 py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600 bg-white transition-all hover:bg-blue-50/50";
                btnTeacher.className = "flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 border-b-2 border-transparent transition-all hover:bg-gray-50/50";
                formStudent.classList.remove('hidden-section');
                formTeacher.classList.add('hidden-section');
            } else {
                btnStudent.className = "flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 border-b-2 border-transparent transition-all hover:bg-gray-50/50";
                btnTeacher.className = "flex-1 py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600 bg-white transition-all hover:bg-blue-50/50";
                formStudent.classList.add('hidden-section');
                formTeacher.classList.remove('hidden-section');
                // ★ Default ke Pengawas saat tab Guru dibuka
                if (window.switchTeacherSubTab) window.switchTeacherSubTab('pengawas');
            }
        };

        window.selectPacket = function(pkt) {
            // Reset styles for packet selection logic manually to match new design
            document.querySelectorAll('.pkt-btn').forEach(btn => {
                // Default unselected state
                btn.className = "pkt-btn relative w-full p-2.5 rounded-xl border transition-all duration-200 text-left bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500 group";
                // Inner reset
                const title = btn.querySelector('.font-bold');
                if(title) title.className = "font-bold text-xs group-hover:text-gray-700";
                
                // Remove icon if present
                const iconDiv = btn.querySelector('.h-6');
                if(iconDiv) iconDiv.remove();
                
                // Adjust layout if it was the large A button
                if(btn.id === 'pkt-A') {
                     btn.className = "pkt-btn relative w-full p-3 rounded-xl border transition-all duration-200 text-left bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500 group";
                     btn.innerHTML = `
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-bold text-xs group-hover:text-gray-700">STS PKWU - Paket A</div>
                                <div class="text-[10px] uppercase mt-0.5">Kelas XI TKJ 1</div>
                            </div>
                        </div>`;
                }
            });

            // Set Selected State
            const selectedBtn = document.getElementById('pkt-' + pkt);
            if(selectedBtn) {
                 if(pkt === 'A') {
                    selectedBtn.className = "pkt-btn relative w-full p-3 rounded-xl border-2 transition-all duration-200 text-left bg-blue-50 border-blue-600 ring-2 ring-blue-200/50 shadow-sm group";
                    selectedBtn.innerHTML = `
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-bold text-blue-700 text-sm">STS PKWU - Paket A</div>
                                <div class="text-[10px] font-semibold text-blue-500 uppercase mt-0.5">Kelas XI TKJ 1</div>
                            </div>
                            <div class="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm"><i data-lucide="check" class="w-3 h-3"></i></div>
                        </div>`;
                 } else {
                    selectedBtn.className = "pkt-btn relative w-full p-2.5 rounded-xl border-2 transition-all duration-200 text-left bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-200/50 shadow-sm group";
                    const title = selectedBtn.querySelector('.font-bold');
                    if(title) title.className = "font-bold text-xs text-blue-700";
                 }
                 
                document.getElementById('selected-packet').value = pkt;
                if(typeof lucide !== 'undefined') window._createIconsSafe();
            }
        };

        // --- DASHBOARD UI LOGIC ---
        window.switchDashTab = function(tab) {
            // ── Role Guard: pengawas hanya boleh akses tab yang diizinkan ──
            const PENGAWAS_TABS = ['nilai', 'analitik', 'kendala', 'banding'];
            if (window.currentPengawasRuang && !PENGAWAS_TABS.includes(tab)) {
                console.warn(`[GUARD] Pengawas tidak diizinkan akses tab: ${tab}`);
                return;
            }
            // ── Role Guard: guru mapel hanya boleh akses tab soal ──
            const GURU_TABS = ['soal'];
            if (window.currentGuruData && !GURU_TABS.includes(tab)) {
                console.warn(`[GUARD] Guru tidak diizinkan akses tab: ${tab}`);
                return;
            }

            // ★ Simpan tab aktif ke sessionStorage agar tetap saat refresh
            try { sessionStorage.setItem('integritest_active_tab', tab); } catch(e) {}

            // ── Desktop tab styles ──
            const activeClass   = "flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm transition-all";
            const inactiveClass = "flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-gray-500 hover:bg-gray-100 font-bold text-sm transition-all";
            // ── Scroll tab aktif ke viewport ──
            setTimeout(() => {
                const activeEl = document.getElementById('tab-dash-' + tab);
                if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }, 50);

            // ── Mobile tab styles ──
            const mobActive   = "min-w-[56px] flex-1 flex flex-col items-center justify-center gap-0.5 rounded-xl mx-0.5 my-1.5 transition-all duration-200 bg-blue-50 text-blue-600";
            const mobInactive = "min-w-[56px] flex-1 flex flex-col items-center justify-center gap-0.5 rounded-xl mx-0.5 my-1.5 transition-all duration-200 text-gray-400";

            const tabs   = ['welcome','nilai','kelasruang','soal','siswa','analitik','jadwal','tampilan','akun-guru','loganomal','databackup','kendala','banding','laporan-superadmin'];
            const panels = { welcome:'panel-welcome', nilai:'panel-nilai', soal:'panel-soal', kelasruang:'panel-kelasruang', siswa:'panel-siswa', analitik:'panel-analitik', jadwal:'panel-jadwal', tampilan:'panel-tampilan', 'akun-guru':'panel-akun-guru', loganomal:'panel-loganomal', databackup:'panel-databackup', kendala:'panel-kendala', banding:'panel-banding', 'laporan-superadmin':'panel-laporan-superadmin' };
            const btnIds = { welcome:'tab-dash-welcome', nilai:'tab-dash-nilai', soal:'tab-dash-soal', kelasruang:'tab-dash-kelasruang', siswa:'tab-dash-siswa', analitik:'tab-dash-analitik', jadwal:'tab-dash-jadwal', tampilan:'tab-dash-tampilan', 'akun-guru':'tab-dash-akun-guru', loganomal:'tab-dash-loganomal', databackup:'tab-dash-databackup', kendala:'tab-dash-kendala', banding:'tab-dash-banding', 'laporan-superadmin':'tab-dash-laporan-superadmin' };
            const mobIds = { welcome:'mob-tab-welcome', nilai:'mob-tab-nilai', soal:'mob-tab-soal', kelasruang:'mob-tab-kelasruang', siswa:'mob-tab-siswa', analitik:'mob-tab-analitik', jadwal:'mob-tab-jadwal', tampilan:'mob-tab-tampilan', 'akun-guru':'mob-tab-akun-guru', loganomal:'mob-tab-loganomal', databackup:'mob-tab-databackup', kendala:'mob-tab-kendala', banding:'mob-tab-banding', 'laporan-superadmin':'mob-tab-laporan-superadmin' };

            tabs.forEach(t => {
                // Desktop tab
                const btn = document.getElementById(btnIds[t]);
                const pnl = document.getElementById(panels[t]);
                if (btn) {
                    const isAdminOnly = btn.classList.contains('admin-only-tab');
                    const isHidden    = btn.classList.contains('hidden');
                    btn.className = (t === tab ? activeClass : inactiveClass)
                        + (isAdminOnly ? ' admin-only-tab' : '')
                        + (isHidden    ? ' hidden'         : '');
                }
                // Mobile bottom nav tab
                const mobBtn = document.getElementById(mobIds[t]);
                if (mobBtn) {
                    const isAdminOnly = mobBtn.classList.contains('admin-only-tab');
                    const isHidden    = mobBtn.classList.contains('hidden');
                    mobBtn.className = (t === tab ? mobActive : mobInactive)
                        + (isAdminOnly ? ' admin-only-tab' : '')
                        + (isHidden    ? ' hidden'         : '');
                }
                if (pnl) { if (t === tab) pnl.classList.remove('hidden-section'); else pnl.classList.add('hidden-section'); }
            });

            if (tab === 'analitik') { setTimeout(() => window.renderIntegrityDashboard(), 300); }
            if (tab === 'soal') {
                window.backToPaketList(); window.renderPaketGrid();
                // Jika guru, terapkan filter paket setelah grid render
                if (window.currentGuruData) setTimeout(() => window._applyGuruPaketFilter(), 200);
            }
            if (tab === 'kelasruang') { window.renderKelasList(); window.switchKelasRuangTab('kelas'); }
            if (tab === 'siswa') { window.renderSiswaTable(); window.switchSiswaSubTab('data'); }
            if (tab === 'tampilan') {
                window.loadTampilanFields();
                // Refresh checkbox paket untuk form buat guru
                if (window.refreshGuruPaketChecks) window.refreshGuruPaketChecks();
                // Muat daftar guru jika belum
                if (window.loadGuruMapelList) window.loadGuruMapelList();
            }
            if (tab === 'kendala') {
                const isPengawas = !!(window.currentPengawasRuang);
                const vPengawas  = document.getElementById('kendala-view-pengawas');
                const vAdmin     = document.getElementById('kendala-view-admin');
                if (isPengawas) {
                    if (vPengawas) vPengawas.classList.remove('hidden');
                    if (vAdmin)    vAdmin.classList.add('hidden');
                    const info = document.getElementById('kendala-pengawas-ruang-info');
                    if (info) info.textContent = 'Ruang: ' + (window.currentPengawasRuang.nama || '-') + ' — Laporan langsung diterima Admin.';
                    if (window.loadPengawasKendalaHistoryPanel) window.loadPengawasKendalaHistoryPanel();
                } else {
                    if (vAdmin)    vAdmin.classList.remove('hidden');
                    if (vPengawas) vPengawas.classList.add('hidden');
                    if (window.loadKendalaList) window.loadKendalaList();
                }
            }
            // Kartu Admin Tamu & Guru Mapel hanya tampil di tab Setting (tampilan), dan hanya untuk admin penuh
            const kartuTamu = document.getElementById('kartu-admin-tamu');
            if (kartuTamu) kartuTamu.style.display = (tab === 'tampilan' && window.isAdmin && window.isAdmin()) ? '' : 'none';
            const kartuGuru = document.getElementById('kartu-guru-mapel');
            if (kartuGuru) kartuGuru.style.display = (tab === 'tampilan' && window.isAdmin && window.isAdmin()) ? '' : 'none';
            if (tab === 'jadwal') { window.renderJadwalList(); window.initJadwalForm(); }
            if (tab === 'akun-guru') {
                // Sinkronisasi daftar paket dan guru ke panel akun-guru
                if (window.refreshGuruPaketChecks2) window.refreshGuruPaketChecks2();
                if (window.loadGuruMapelList2) window.loadGuruMapelList2();
            }
            if (tab === 'loganomal') { setTimeout(() => window.renderLogAnomal(), 300); }
            if (tab === 'databackup') { window.loadDataBackupPanel(); }
            if (tab === 'banding') {
                const isPengawas = !!(window.currentPengawasRuang);
                const vPengawas  = document.getElementById('banding-view-pengawas');
                const vAdmin     = document.getElementById('banding-view-admin');
                if (isPengawas) {
                    if (vPengawas) vPengawas.classList.remove('hidden');
                    if (vAdmin)    vAdmin.classList.add('hidden');
                    const info = document.getElementById('banding-pengawas-ruang-info');
                    if (info) info.textContent = 'Ruang: ' + (window.currentPengawasRuang.nama || '-');
                    if (window.loadPengawasAppealList) window.loadPengawasAppealList();
                } else {
                    if (vAdmin)    vAdmin.classList.remove('hidden');
                    if (vPengawas) vPengawas.classList.add('hidden');
                    // Sync toggle-appeal-banding dengan toggle-appeal asli
                    const toggleBanding = document.getElementById('toggle-appeal-banding');
                    const toggleOrig    = document.getElementById('toggle-appeal');
                    if (toggleBanding && toggleOrig) toggleBanding.checked = toggleOrig.checked;
                    const statusEl = document.getElementById('appeal-setting-status-banding');
                    if (statusEl) statusEl.innerHTML = window.appealEnabled
                        ? '<span class="text-green-600 font-bold">✅ Aktif — Siswa dapat mengajukan banding</span>'
                        : '<span class="text-red-500 font-bold">❌ Nonaktif — Fitur banding disembunyikan</span>';
                    if (window.loadBandingAdminList) window.loadBandingAdminList();
                }
            }
            if (tab === 'laporan-superadmin') {
                window.loadRiwayatLaporan();
                window.initLaporanSuperadmin();
            }
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ── LAPORAN KE SUPERADMIN ──
        window.initLaporanSuperadmin = function() {
            // Karakter counter
            const desc = document.getElementById('lsk-deskripsi');
            const counter = document.getElementById('lsk-char-count');
            if (desc && counter) {
                desc.oninput = () => { counter.textContent = desc.value.length; };
            }
            // Urgensi radio UI update
            document.querySelectorAll('input[name="lsk-urgensi"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    document.querySelectorAll('.lsk-urgensi-btn').forEach(btn => {
                        const val = btn.getAttribute('data-val');
                        const selected = val === radio.value && radio.checked;
                        if (val === 'rendah') { btn.style.cssText = selected ? 'border-color:#16a34a;background:#f0fdf4;color:#15803d;' : ''; }
                        else if (val === 'sedang') { btn.style.cssText = selected ? 'border-color:#d97706;background:#fffbeb;color:#b45309;' : ''; }
                        else if (val === 'tinggi') { btn.style.cssText = selected ? 'border-color:#dc2626;background:#fef2f2;color:#b91c1c;' : ''; }
                    });
                });
                // Trigger untuk set awal
                if (radio.checked) radio.dispatchEvent(new Event('change'));
            });
        };

        window.kirimLaporanKendala = async function() {
            const judul = (document.getElementById('lsk-judul')?.value || '').trim();
            const kategori = document.getElementById('lsk-kategori')?.value || '';
            const deskripsi = (document.getElementById('lsk-deskripsi')?.value || '').trim();
            const kontak = (document.getElementById('lsk-kontak')?.value || '').trim();
            const urgensi = document.querySelector('input[name="lsk-urgensi"]:checked')?.value || 'rendah';
            const errEl = document.getElementById('lsk-err');
            const btnEl = document.getElementById('btn-kirim-lsk');

            const showLskErr = (msg) => { errEl.textContent = msg; errEl.classList.remove('hidden'); };
            errEl.classList.add('hidden');

            if (!judul) return showLskErr('⚠️ Judul kendala wajib diisi.');
            if (!kategori) return showLskErr('⚠️ Pilih kategori terlebih dahulu.');
            if (!deskripsi || deskripsi.length < 20) return showLskErr('⚠️ Deskripsi minimal 20 karakter agar laporan bisa ditindaklanjuti.');
            if (!window.isFirebaseReady) return showLskErr('⚠️ Koneksi ke server belum siap. Coba beberapa saat lagi.');

            btnEl.disabled = true;
            btnEl.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Mengirim...';

            // Ambil info sekolah dari data yang ada
            const namaSekolah = window._savedAppearance?.judulUjian || document.title || 'Sekolah';
            const appId = window.appId || 'unknown';

            try {
                // Kirim ke superadmin/data/laporan_kendala
                await window.addDoc(window.collection(window.db, 'superadmin', 'data', 'laporan_kendala'), {
                    judul,
                    kategori,
                    deskripsi,
                    urgensi,
                    kontakPengirim: kontak,
                    namaSekolah,
                    appId,
                    status: 'baru',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });

                // Reset form
                document.getElementById('lsk-judul').value = '';
                document.getElementById('lsk-kategori').value = '';
                document.getElementById('lsk-deskripsi').value = '';
                document.getElementById('lsk-kontak').value = '';
                document.getElementById('lsk-char-count').textContent = '0';
                document.querySelector('input[name="lsk-urgensi"][value="rendah"]').checked = true;
                document.querySelector('input[name="lsk-urgensi"][value="rendah"]').dispatchEvent(new Event('change'));

                // Tampilkan sukses
                errEl.textContent = '✅ Laporan berhasil dikirim! Superadmin akan segera meninjau dan merespons.';
                errEl.className = 'text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5';
                errEl.classList.remove('hidden');
                setTimeout(() => errEl.classList.add('hidden'), 5000);

                window.loadRiwayatLaporan();
            } catch(e) {
                showLskErr('❌ Gagal mengirim: ' + e.message);
            }
            btnEl.disabled = false;
            btnEl.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Kirim Laporan';
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.loadRiwayatLaporan = async function() {
            const container = document.getElementById('lsk-riwayat-container');
            if (!container) return;
            const appId = window.appId || 'unknown';

            if (!window.isFirebaseReady) {
                container.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">Koneksi belum siap</div>`;
                return;
            }
            container.innerHTML = `<div class="flex flex-col items-center justify-center gap-2 py-10 text-gray-400">
                <p class="text-sm">Memuat riwayat...</p></div>`;
            try {
                // Pastikan parent docs ada
                await window.setDoc(window.doc(window.db,'superadmin','data'),{_init:true},{merge:true});
                const sn = await window.getDocs(window.collection(window.db,'superadmin','data','laporan_kendala'));
                let list = [];
                sn.forEach(d => { const data = d.data(); if(data.appId === appId) list.push({id:d.id,...data}); });
                list.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));

                if (!list.length) {
                    container.innerHTML = `<div class="flex flex-col items-center justify-center gap-2 py-10 text-gray-400">
                        <p class="text-sm font-semibold">Belum ada laporan</p>
                        <p class="text-xs">Laporan yang dikirim akan muncul di sini</p></div>`;
                    return;
                }

                const statusBadge = (s) => {
                    if (s==='selesai') return `<span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">✅ Selesai</span>`;
                    if (s==='diproses') return `<span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">🟡 Diproses</span>`;
                    return `<span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">🔴 Baru</span>`;
                };

                container.innerHTML = list.map(k => `
                    <div class="px-4 py-3 hover:bg-gray-50 transition">
                        <div class="flex items-start justify-between gap-2 mb-1">
                            <p class="text-sm font-bold text-gray-800 leading-snug flex-1">${escapeHtml(k.judul||'—')}</p>
                            ${statusBadge(k.status||'baru')}
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] text-gray-400">${k.kategori||'—'}</span>
                            <span class="text-gray-300">·</span>
                            <span class="text-[11px] text-gray-400">${k.createdAt?new Date(k.createdAt).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}):'—'}</span>
                        </div>
                        ${k.responSuperadmin ? `<div class="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-800 leading-relaxed">
                            <span class="font-bold">💬 Respons Superadmin:</span> ${escapeHtml(k.responSuperadmin)}</div>` : ''}
                    </div>`).join('');
            } catch(e) {
                container.innerHTML = `<div class="text-center py-8 text-red-400 text-xs">Gagal memuat: ${escapeHtml(e.message)}</div>`;
            }
        };

        // Toggle import section di dalam panel soal
        // Sub-tab internal Kelas / Ruang dalam satu panel
        window.switchKelasRuangTab = function(sub) {
            const activeClass   = 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm transition-all';
            const inactiveClass = 'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-gray-500 hover:bg-gray-100 font-bold text-sm transition-all';
            const btnKelas = document.getElementById('subtab-kelas');
            const btnRuang = document.getElementById('subtab-ruang');
            const secKelas = document.getElementById('section-kelas-inner');
            const secRuang = document.getElementById('section-ruang-inner');
            if (btnKelas) btnKelas.className = sub === 'kelas' ? activeClass : inactiveClass;
            if (btnRuang) btnRuang.className = sub === 'ruang' ? activeClass : inactiveClass;
            if (secKelas) secKelas.classList.toggle('hidden', sub !== 'kelas');
            if (secRuang) secRuang.classList.toggle('hidden', sub !== 'ruang');
            if (sub === 'kelas') window.renderKelasList();
            if (sub === 'ruang') window.renderRuangList();
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.toggleImportSection = function() {
            const sec = document.getElementById('section-import-inline');
            if (!sec) return;
            const isHidden = sec.classList.contains('hidden');
            sec.classList.toggle('hidden', !isHidden);
            if (isHidden) {
                setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ==================== PAKET SOAL MANAGEMENT ====================
        window.allPaketDB = [];
        window.activePaketId = null;

        window.listenForPaket = function() {
            if (!window.db || !window.isFirebaseReady) return;
            if (window._unsub_listenForPaket) return; // ★ guard: sudah listening, skip
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal'));
            window._unsub_listenForPaket = onSnapshot(q, (snapshot) => {
                window.allPaketDB = [];
                snapshot.forEach((d) => window.allPaketDB.push({ id: d.id, ...d.data() }));
                window.allPaketDB.sort((a,b) => (a.createdAt||0) - (b.createdAt||0));
                window.renderPaketGrid();
                window.updatePaketFilter();
                if (window.activePaketId) window.refreshActivePaketInfo();
                // Update token pengawas setiap kali data paket berubah (real-time)
                if (window.isPengawas && window.isPengawas() && window.updatePengawasTokenDisplay) {
                    window.updatePengawasTokenDisplay();
                }
                // Refresh jadwal dropdown paket jika panel jadwal sedang terbuka
                if (window.populateJadwalDropdowns) window.populateJadwalDropdowns();
            });
        };

        // ── Update dropdown filter paket soal di monitoring ──
        window.updatePaketFilter = function() {
            const sel = document.getElementById('filter-session');
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = '<option value="all">Semua Paket</option>';
            (window.allPaketDB || []).forEach(p => {
                const opt = document.createElement('option');
                // packetType di exam_results memakai field 'jenis' (A/B/C) dari paket
                opt.value = p.jenis && p.jenis !== 'nonpaket' ? p.jenis : p.nama;
                opt.textContent = p.nama + (p.jenis && p.jenis !== 'nonpaket' ? ` (Paket ${p.jenis})` : '');
                sel.appendChild(opt);
            });
            if (current) sel.value = current;
        };

        const PAKET_COLORS = [
            'bg-blue-500','bg-indigo-500','bg-purple-500','bg-pink-500',
            'bg-rose-500','bg-orange-500','bg-amber-500','bg-teal-500',
            'bg-cyan-500','bg-emerald-500','bg-green-500','bg-lime-500'
        ];

        window.renderPaketGrid = function() {
            const grid = document.getElementById('paket-grid');
            if (!grid) return;
            const total = window.allPaketDB.length;
            const info = document.getElementById('paket-count-info');
            if (info) info.textContent = `${total} paket tersedia`;

            if (total === 0) {
                grid.innerHTML = `
                    <div class="col-span-full bg-white rounded-2xl border-2 border-dashed border-gray-200 p-14 text-center">
                        <div class="inline-flex p-4 bg-indigo-50 rounded-2xl mb-4"><i data-lucide="layers" class="w-10 h-10 text-indigo-400"></i></div>
                        <h3 class="text-lg font-bold text-gray-700 mb-2">Belum Ada Paket Soal</h3>
                        <p class="text-gray-400 text-sm mb-5 max-w-xs mx-auto">Buat paket soal pertama Anda. Paket adalah wadah yang berisi kumpulan soal ujian.</p>
                        <button onclick="window.openPaketModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 mx-auto shadow-md">
                            <i data-lucide="plus" class="w-4 h-4"></i> Buat Paket Pertama
                        </button>
                    </div>`;
                const pw = document.getElementById('pager-paket-wrap');
                if (pw) pw.innerHTML = '';
                if(typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // Pagination
            const pgP = window._pg.paket;
            const pageItems = pgSlice(window.allPaketDB, pgP);
            const sliceStart = pgP.perPage === 0 ? 0 : (pgP.page - 1) * pgP.perPage;

            grid.innerHTML = pageItems.map((p, i) => {
                const globalIdx = sliceStart + i;
                const color  = PAKET_COLORS[globalIdx % PAKET_COLORS.length];
                const isAktif = p.aktif !== false;
                const soalCount = window.allQuestionsDB.filter(q => q.paketId === p.id).length;
                const kelasTags = (p.kelas && p.kelas.length > 0)
                    ? p.kelas.slice(0,3).map(k => `<span class="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-xs font-medium">${k}</span>`).join('')
                      + (p.kelas.length > 3 ? `<span class="text-xs text-gray-400">+${p.kelas.length-3}</span>` : '')
                    : `<span class="text-xs text-gray-400">Semua Kelas</span>`;
                const jenisLabel = p.jenis === 'nonpaket' || !p.jenis ? 'Non Paket' : `Paket ${p.jenis}`;

                return `
                <div class="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow group" data-paket-id="${p.id}">
                    <div class="${color} px-5 pt-5 pb-4 text-white relative">
                        <div class="flex justify-between items-start">
                            <div class="bg-white/20 w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black">
                                ${_e(p.nama.charAt(0).toUpperCase())}
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="${isAktif ? 'bg-white/30 text-white' : 'bg-black/20 text-white/70'} text-xs font-bold px-2.5 py-1 rounded-full">
                                    ${isAktif ? '● Aktif' : '○ Nonaktif'}
                                </span>
                                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onclick="event.stopPropagation(); window.openPaketModal('${p.id}')" class="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg" title="Edit"><i data-lucide="settings" class="w-3.5 h-3.5"></i></button>
                                    <button onclick="event.stopPropagation(); window.deletePaket('${p.id}','${p.nama.replace(/'/g,"\\'")}') " class="bg-white/20 hover:bg-red-400/60 p-1.5 rounded-lg" title="Hapus"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                                </div>
                            </div>
                        </div>
                        <h4 class="text-base font-bold mt-3 leading-tight">${_e(p.nama)}</h4>
                        <p class="text-white/80 text-xs mt-0.5">${p.mapel || '—'}</p>
                    </div>
                    <div class="px-5 py-4">
                        <div class="flex flex-wrap gap-1.5 mb-3">${kelasTags}</div>
                        <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span class="bg-gray-100 px-2.5 py-1 rounded-lg font-semibold">${jenisLabel}</span>
                            <span class="flex items-center gap-1"><i data-lucide="key" class="w-3 h-3 text-yellow-500"></i> ${p.token || '—'}</span>
                        </div>
                        <div class="flex items-center justify-between border-t pt-3">
                            <span class="text-sm font-semibold text-gray-700">${soalCount} Soal</span>
                            <button onclick="window.openPaketSoal('${p.id}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                                <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Kelola Soal
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            const pw = document.getElementById('pager-paket-wrap');
            if (pw) pw.innerHTML = renderPagerHTML('paket', total, pgP.page, pgP.perPage);

            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.openPaketSoal = function(paketId) {
            window.activePaketId = paketId;
            const paket = (window.allPaketDB || []).find(p => p.id === paketId);
            if (!paket) return;

            // Reset soal page to 1 when switching paket
            if (window._pg && window._pg.soal) window._pg.soal.page = 1;

            // Switch view
            document.getElementById('view-paket-list').classList.add('hidden');
            document.getElementById('view-soal-in-paket').classList.remove('hidden');

            // Update breadcrumb & info card
            window.refreshActivePaketInfo();
            window.filterQuestionBank();
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.refreshActivePaketInfo = function() {
            const paket = (window.allPaketDB || []).find(p => p.id === window.activePaketId);
            if (!paket) return;
            const COLORS = PAKET_COLORS;
            const idx = window.allPaketDB.indexOf(paket);
            const color = COLORS[idx % COLORS.length];
            const isAktif = paket.aktif !== false;

            document.getElementById('breadcrumb-paket-nama').textContent = paket.nama;
            document.getElementById('active-paket-nama').textContent = paket.nama;
            document.getElementById('active-paket-mapel').textContent = paket.mapel || '';
            document.getElementById('active-paket-token').textContent = paket.token || '—';

            const iconEl = document.getElementById('active-paket-icon');
            iconEl.className = `w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${color}`;
            iconEl.textContent = paket.nama.charAt(0).toUpperCase();

            const statusBadge = document.getElementById('active-paket-status-badge');
            statusBadge.className = `px-2.5 py-1 rounded-full text-xs font-bold ${isAktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`;
            statusBadge.textContent = isAktif ? '● Aktif' : '○ Nonaktif';

            const kelasTags = document.getElementById('active-paket-kelas-tags');
            kelasTags.innerHTML = (paket.kelas && paket.kelas.length > 0)
                ? paket.kelas.map(k => `<span class="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">${k}</span>`).join('')
                : `<span class="text-xs text-gray-400">Semua Kelas</span>`;
        };

        window.backToPaketList = function() {
            window.activePaketId = null;
            const v1 = document.getElementById('view-paket-list');
            const v2 = document.getElementById('view-soal-in-paket');
            if (v1) v1.classList.remove('hidden');
            if (v2) v2.classList.add('hidden');
        };

        // -- Modal Paket --
        window.openPaketModal = function(id = null) {
            const modal = document.getElementById('modal-paket');
            document.getElementById('form-paket').reset();
            document.getElementById('paket-id').value = '';
            document.getElementById('paket-aktif').checked = true;
            document.getElementById('paket-aktif-label').textContent = 'Aktif';
            document.getElementById('paket-aktif-label').className = 'text-sm font-bold text-green-600';
            window.rebuildPaketKelasChecks([]);
            // Reset jenis radio
            document.querySelectorAll('[name="paket-jenis"]').forEach(r => {
                r.checked = r.value === 'nonpaket';
                const span = r.nextElementSibling;
                if(span) span.className = `paket-jenis-btn px-4 py-2 rounded-xl border-2 text-sm font-bold ${r.checked ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-500'}`;
            });
            document.getElementById('modal-paket-title').textContent = id ? 'Edit Paket Soal' : 'Buat Paket Soal Baru';

            if (id) {
                const p = (window.allPaketDB || []).find(x => x.id === id);
                if (p) {
                    document.getElementById('paket-id').value = p.id;
                    document.getElementById('paket-nama').value = p.nama || '';
                    document.getElementById('paket-mapel').value = p.mapel || '';
                    document.getElementById('paket-token').value = p.token || '';
                    document.getElementById('paket-jumlah-soal').value = p.jumlahSoal || '';
                    document.getElementById('paket-nilai-maks').value = (p.nilaiMaksimal && p.nilaiMaksimal !== 100) ? p.nilaiMaksimal : '';
                    const isAktif = p.aktif !== false;
                    document.getElementById('paket-aktif').checked = isAktif;
                    document.getElementById('paket-aktif-label').textContent = isAktif ? 'Aktif' : 'Nonaktif';
                    document.getElementById('paket-aktif-label').className = `text-sm font-bold ${isAktif ? 'text-green-600' : 'text-gray-400'}`;
                    window.rebuildPaketKelasChecks(p.kelas || []);
                    // Set jenis
                    const jenis = p.jenis || 'nonpaket';
                    document.querySelectorAll('[name="paket-jenis"]').forEach(r => {
                        r.checked = r.value === jenis;
                        const span = r.nextElementSibling;
                        if(span) span.className = `paket-jenis-btn px-4 py-2 rounded-xl border-2 text-sm font-bold ${r.checked ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-500'}`;
                    });
                }
            }

            // Jenis radio click handler
            document.querySelectorAll('[name="paket-jenis"]').forEach(r => {
                r.onclick = function() {
                    document.querySelectorAll('[name="paket-jenis"]').forEach(x => {
                        const span = x.nextElementSibling;
                        if(span) span.className = `paket-jenis-btn px-4 py-2 rounded-xl border-2 text-sm font-bold ${x.checked ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-500'}`;
                    });
                };
            });
            // aktif toggle label
            document.getElementById('paket-aktif').onchange = function() {
                const lbl = document.getElementById('paket-aktif-label');
                lbl.textContent = this.checked ? 'Aktif' : 'Nonaktif';
                lbl.className = `text-sm font-bold ${this.checked ? 'text-green-600' : 'text-gray-400'}`;
            };

            modal.classList.remove('hidden');
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closePaketModal = function() { document.getElementById('modal-paket').classList.add('hidden'); };

        window.rebuildPaketKelasChecks = function(checkedArr = []) {
            const container = document.getElementById('paket-kelas-checks');
            if (!container) return;
            if (window.kelasList.length === 0) {
                container.innerHTML = '<span class="text-xs text-gray-400 italic">Tambahkan kelas di tab Manajemen Kelas terlebih dahulu.</span>';
                return;
            }
            container.innerHTML = window.kelasList.map(k => `
                <label class="flex items-center gap-1.5 cursor-pointer bg-white border-2 hover:border-indigo-400 px-3 py-1.5 rounded-xl transition-colors ${checkedArr.includes(k.nama) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}">
                    <input type="checkbox" value="${_e(k.nama)}" class="w-3.5 h-3.5 accent-indigo-600" ${checkedArr.includes(k.nama) ? 'checked' : ''} onchange="this.closest('label').className=this.closest('label').className.replace(this.checked?'border-gray-200':'border-indigo-500 bg-indigo-50',this.checked?'border-indigo-500 bg-indigo-50':'border-gray-200')">
                    <span class="text-sm font-semibold text-gray-700">${_e(k.nama)}</span>
                </label>
            `).join('');
        };

        window.savePaket = async function(e) {
            e.preventDefault();
            if (!window.isFirebaseReady) return alert("Mode Offline: Tidak bisa menyimpan.");
            const id = document.getElementById('paket-id').value;
            // Guard: guru tidak boleh buat paket baru, hanya edit paket yang di-assign
            if (window.currentGuruData) {
                if (!id) return alert('⛔ Guru Mapel tidak diizinkan membuat paket baru.\nHubungi Admin untuk menambah paket.');
                if (!window.currentGuruData.paketIds.includes(id)) return alert('⛔ Anda tidak memiliki akses ke paket ini.');
            }
            const nama  = document.getElementById('paket-nama').value.trim();
            const mapel = document.getElementById('paket-mapel').value.trim();
            const token = document.getElementById('paket-token').value.trim().toUpperCase();
            const aktif = document.getElementById('paket-aktif').checked;
            const jenis = document.querySelector('[name="paket-jenis"]:checked')?.value || 'nonpaket';
            const kelas = Array.from(document.querySelectorAll('#paket-kelas-checks input:checked')).map(c => c.value);
            const jumlahSoalRaw = document.getElementById('paket-jumlah-soal').value.trim();
            const jumlahSoal = jumlahSoalRaw ? parseInt(jumlahSoalRaw) : 0;
            const nilaiMaksRaw = document.getElementById('paket-nilai-maks').value.trim();
            const nilaiMaksimal = nilaiMaksRaw ? parseInt(nilaiMaksRaw) : 100;

            if (!nama) return alert("Nama paket tidak boleh kosong!");
            if (!token) return alert("Token paket tidak boleh kosong!");

            const data = { nama, mapel, token, aktif, jenis, kelas, jumlahSoal, nilaiMaksimal, updatedAt: Date.now() };
            try {
                if (id) {
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal', id), data);
                } else {
                    data.createdAt = Date.now();
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal'), data);
                }
                window.closePaketModal();
            } catch(err) { alert("Gagal menyimpan: " + err.message); }
        };

        window.deletePaket = async function(id, nama) {
            if (window.currentGuruData) return alert('⛔ Guru Mapel tidak diizinkan menghapus paket.');
            if (!confirm(`Hapus paket "${nama}"?\n\nSemua soal dalam paket ini TIDAK akan ikut terhapus, tetapi akan kehilangan referensi paket.`)) return;
            if (!window.isFirebaseReady) return alert("Mode Offline.");
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal', id));
                if (window.activePaketId === id) window.backToPaketList();
            } catch(err) { alert("Gagal hapus: " + err.message); }
        };
        // ==================== END PAKET MANAGEMENT ====================

        // ==================== MANAJEMEN KELAS ====================
        window.kelasList = [];

        window.listenForKelas = function() {
            if (!window.db || !window.isFirebaseReady) return;
            if (window._unsub_listenForKelas) return; // ★ guard: sudah listening, skip
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kelas'));
            window._unsub_listenForKelas = onSnapshot(q, (snapshot) => {
                window.kelasList = [];
                snapshot.forEach((d) => {
                    window.kelasList.push({ id: d.id, ...d.data() });
                });
                window.kelasList.sort((a,b) => (a.nama||'').localeCompare(b.nama||''));
                window.renderKelasList();
                window.updateKelasFilter();
                window.updateStudentKelasDropdown();
                // Refresh jadwal dropdown kelas jika panel jadwal sedang terbuka
                if (window.populateJadwalDropdowns) window.populateJadwalDropdowns();
            });
        };

        window.updateKelasFilter = function() {
            // Update monitoring nilai filter
            const sel = document.getElementById('filter-class');
            if (sel) {
                const current = sel.value;
                sel.innerHTML = '<option value="all">Semua Kelas</option>';
                window.kelasList.forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k.nama;
                    opt.textContent = k.nama;
                    sel.appendChild(opt);
                });
                sel.value = current;
            }
            // Update bank soal filter kelas
            const selBank = document.getElementById('filter-bank-kelas');
            if (selBank) {
                const currentBank = selBank.value;
                selBank.innerHTML = '<option value="all">Semua Kelas</option>';
                window.kelasList.forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k.nama;
                    opt.textContent = k.nama;
                    selBank.appendChild(opt);
                });
                selBank.value = currentBank;
            }
            // Update modal kelas checkboxes
            window.rebuildKelasChecks();
            window.rebuildPaketKelasChecks();
            // Refresh dropdown analitik agar ikut terupdate dari data master kelas
            if (window.renderIntegrityDashboard && document.getElementById('panel-analitik') && !document.getElementById('panel-analitik').classList.contains('hidden-section')) {
                window.renderIntegrityDashboard();
            }
        };

        window.rebuildKelasChecks = function(checkedArr = []) {
            const container = document.getElementById('q-kelas-checks');
            if (!container) return;
            if (window.kelasList.length === 0) {
                container.innerHTML = '<span class="text-xs text-gray-400 italic">Belum ada kelas. Tambahkan di tab Manajemen Kelas.</span>';
                return;
            }
            container.innerHTML = window.kelasList.map(k => `
                <label class="flex items-center gap-1.5 cursor-pointer bg-white border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-lg transition-colors">
                    <input type="checkbox" value="${_e(k.nama)}" class="w-3.5 h-3.5 accent-indigo-600" ${checkedArr.includes(k.nama) ? 'checked' : ''}>
                    <span class="text-sm font-medium text-gray-700">${_e(k.nama)}</span>
                </label>
            `).join('');
        };

        window.updateStudentKelasDropdown = function() {
            const sel = document.getElementById('student-class');
            if (!sel || window.kelasList.length === 0) return;
            const current = sel.value;
            sel.innerHTML = '<option value="">Pilih Kelas</option>';
            window.kelasList.forEach(k => {
                const opt = document.createElement('option');
                opt.value = k.nama;
                opt.textContent = k.nama;
                sel.appendChild(opt);
            });
            if (current) sel.value = current;
        };

        window.renderKelasList = function() {
            const tbody = document.getElementById('kelas-table-body');
            if (!tbody) return;
            const pw = document.getElementById('pager-kelas-wrap');
            const total = window.kelasList.length;
            if (total === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-10 text-center text-gray-400">Belum ada kelas. Tambah kelas baru.</td></tr>';
                if (pw) pw.innerHTML = '';
                return;
            }
            const pgK = window._pg.kelas;
            const pageItems = pgSlice(window.kelasList, pgK);
            const sliceStart = pgK.perPage === 0 ? 0 : (pgK.page - 1) * pgK.perPage;
            tbody.innerHTML = pageItems.map((k, i) => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm text-gray-500">${sliceStart + i + 1}</td>
                    <td class="px-6 py-4 font-semibold text-gray-800">${_e(k.nama)}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${_e(k.keterangan) || '-'}</td>
                    <td class="px-6 py-4 text-center">
                        <div class="flex gap-2 justify-center">
                            <button onclick="window.openKelasModal('${k.id}')" class="text-blue-600 hover:bg-blue-50 p-2 rounded-lg" title="Edit"><i data-lucide="pencil" class="w-4 h-4"></i></button>
                            <button onclick="window.deleteKelas('${k.id}','${_e(k.nama)}')" class="text-red-500 hover:bg-red-50 p-2 rounded-lg" title="Hapus"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </td>
                </tr>
            `).join('');
            if (pw) pw.innerHTML = renderPagerHTML('kelas', total, pgK.page, pgK.perPage);
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.openKelasModal = function(id = null) {
            const modal = document.getElementById('modal-kelas');
            const titleEl = document.getElementById('modal-kelas-title');
            document.getElementById('kelas-id').value = '';
            document.getElementById('kelas-nama').value = '';
            document.getElementById('kelas-keterangan').value = '';

            if (id) {
                const k = window.kelasList.find(x => x.id === id);
                if (k) {
                    titleEl.textContent = 'Edit Kelas';
                    document.getElementById('kelas-id').value = k.id;
                    document.getElementById('kelas-nama').value = k.nama;
                    document.getElementById('kelas-keterangan').value = k.keterangan || '';
                }
            } else {
                titleEl.textContent = 'Tambah Kelas Baru';
            }
            modal.classList.remove('hidden');
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeKelasModal = function() {
            document.getElementById('modal-kelas').classList.add('hidden');
        };

        window.saveKelas = async function(e) {
            e.preventDefault();
            if (!window.isFirebaseReady) return alert("Mode Offline: Tidak bisa menyimpan ke database.");
            const id = document.getElementById('kelas-id').value;
            const nama = document.getElementById('kelas-nama').value.trim();
            const keterangan = document.getElementById('kelas-keterangan').value.trim();
            if (!nama) return alert("Nama kelas tidak boleh kosong!");

            const data = { nama, keterangan, updatedAt: Date.now() };
            try {
                if (id) {
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'kelas', id), data);
                } else {
                    data.createdAt = Date.now();
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kelas'), data);
                }
                window.closeKelasModal();
            } catch(err) {
                alert("Gagal menyimpan: " + err.message);
            }
        };

        window.deleteKelas = async function(id, nama) {
            if (!confirm(`Hapus kelas "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
            if (!window.isFirebaseReady) return alert("Mode Offline.");
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'kelas', id));
            } catch(err) {
                alert("Gagal hapus: " + err.message);
            }
        };
        // ==================== END MANAJEMEN KELAS ====================

        // ★ FITUR #2: UNLOCK DEVICE MANUAL ★
        window.unlockDeviceManual = async function() {
            const input     = (document.getElementById('unlock-device-input')?.value || '').trim();
            const resultEl  = document.getElementById('unlock-device-result');
            const btnUnlock = document.querySelector('button[onclick="window.unlockDeviceManual()"]');

            const show = (msg, isOk, isWarn) => {
                if (!resultEl) return;
                const cls = isOk ? 'bg-green-100 text-green-700' : isWarn ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600';
                resultEl.className = `mt-2 text-xs font-semibold px-3 py-2 rounded-lg ${cls}`;
                resultEl.innerHTML = msg;
                resultEl.classList.remove('hidden');
            };

            // ── VALIDASI 1: Tidak boleh kosong ──
            if (!input) {
                show('❌ Input kosong. Masukkan NISN, Nomor Peserta, atau Device ID siswa.', false);
                return;
            }

            // ── VALIDASI 2: Tidak boleh ada spasi ──
            if (/\s/.test(input)) {
                show('❌ Input tidak boleh mengandung spasi. Periksa kembali input Anda.', false);
                return;
            }

            // ── VALIDASI 3: Deteksi tipe input ──
            const isNisn      = /^\d{8,12}$/.test(input);           // NISN: 8–12 digit angka murni
            const isNoPeserta = /^[A-Za-z0-9]+-\d+$/i.test(input);  // Nomor peserta: format A-001, B-023, dll
            const isDeviceId  = input.length >= 8;                   // Device ID: minimal 8 karakter

            if (!isNisn && !isNoPeserta && !isDeviceId) {
                show('❌ Format tidak valid.<br>• NISN: 8–12 digit angka (contoh: 1234567890)<br>• Nomor Peserta: format huruf-angka (contoh: A-001)<br>• Device ID: minimal 8 karakter', false);
                return;
            }

            // ── Label tipe untuk pesan ──
            const tipeLabel = isNisn ? 'NISN' : isNoPeserta ? 'Nomor Peserta' : 'Device ID';

            if (!window.isFirebaseReady || !window.db) {
                show('❌ Firebase tidak terhubung. Coba refresh halaman.', false);
                return;
            }

            // ── Cari data dulu, konfirmasi sebelum eksekusi ──
            if (btnUnlock) { btnUnlock.disabled = true; btnUnlock.textContent = 'Mencari...'; }
            show(`🔍 Mencari data siswa berdasarkan ${tipeLabel}...`, false, true);

            try {
                // Cari preview data siswa sebelum unlock
                const resSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                const matches = [];
                resSnap.forEach(ds => {
                    const d = ds.data();
                    // Match NISN atau noPeserta (keduanya tersimpan di studentNisn)
                    const matchNisn   = d.studentNisn && d.studentNisn.toString().trim().toUpperCase() === input.toUpperCase();
                    const matchDevice = d.deviceFingerprint && d.deviceFingerprint === input;
                    if (matchNisn || matchDevice) {
                        matches.push({
                            id: ds.id,
                            nama: d.studentName || '—',
                            nisn: d.studentNisn || '—',
                            kelas: d.className  || '—',
                            status: d.status    || '—',
                            deviceLocked: d.deviceLocked || false
                        });
                    }
                });

                // Cari juga di device_locks
                const lockSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'device_locks'));
                let lockCount = 0;
                lockSnap.forEach(ds => {
                    const d = ds.data();
                    const matchDevice = ds.id === input || (d.deviceId && d.deviceId === input);
                    const matchNisn   = d.studentNisn && d.studentNisn.toString().trim().toUpperCase() === input.toUpperCase();
                    if (matchDevice || matchNisn) lockCount++;
                });

                if (btnUnlock) { btnUnlock.disabled = false; btnUnlock.textContent = 'Unlock'; }

                // Tidak ada data ditemukan
                if (matches.length === 0 && lockCount === 0) {
                    show(`⚠️ Tidak ditemukan siswa dengan <strong>${tipeLabel}: "${_e(input)}"</strong>.<br>
                        Pastikan input benar. Tips:<br>
                        • NISN: cek di data siswa, harus 8–12 digit angka<br>
                        • Nomor Peserta: cek di kartu peserta (contoh: A-001)<br>
                        • Device ID: tersedia di detail monitoring siswa`, false, true);
                    return;
                }

                // Tampilkan preview & minta konfirmasi
                const previewHtml = matches.length > 0
                    ? matches.map(m => `<div class="mt-1 px-2 py-1.5 bg-white rounded border border-amber-200 text-[10px]">
                        👤 <strong>${_e(m.nama)}</strong> — ${_e(m.kelas)} — ${tipeLabel}: ${_e(m.nisn)} — Status: ${_e(m.status)}
                        ${m.deviceLocked ? ' <span class="text-red-500 font-bold">[TERKUNCI]</span>' : ''}
                      </div>`).join('')
                    : '';

                const totalEntri = matches.length + lockCount;
                show(`🔍 Ditemukan <strong>${totalEntri} entri</strong> untuk ${tipeLabel} <strong>"${_e(input)}"</strong>:${previewHtml}
                    <div class="mt-2 flex gap-2">
                        <button onclick="window._doUnlockConfirmed('${_e(input)}')"
                            class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            ✅ Ya, Unlock Sekarang
                        </button>
                        <button onclick="document.getElementById('unlock-device-result').classList.add('hidden'); document.getElementById('unlock-device-input').value='';"
                            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                            Batal
                        </button>
                    </div>`, false, true);

            } catch(err) {
                if (btnUnlock) { btnUnlock.disabled = false; btnUnlock.textContent = 'Unlock'; }
                show('❌ Gagal mencari data: ' + _e(err.message), false);
            }
        };

        // ── Eksekusi unlock setelah konfirmasi ──
        window._doUnlockConfirmed = async function(input) {
            const resultEl = document.getElementById('unlock-device-result');
            const show = (msg, isOk) => {
                if (!resultEl) return;
                resultEl.className = `mt-2 text-xs font-semibold px-3 py-2 rounded-lg ${isOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`;
                resultEl.innerHTML = msg;
                resultEl.classList.remove('hidden');
            };

            const adminNama = window.currentAdminUser || window.currentStaffName || 'Admin';
            const nowStr    = new Date().toLocaleString('id-ID');

            try {
                const delPromises = [];
                let found = 0;

                // Hapus device_locks
                const lockSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'device_locks'));
                lockSnap.forEach(ds => {
                    const d = ds.data();
                    const matchDevice = ds.id === input || (d.deviceId && d.deviceId === input);
                    const matchNisn   = d.studentNisn && d.studentNisn.toString().trim().toUpperCase() === input.toUpperCase();
                    if (matchDevice || matchNisn) {
                        delPromises.push(deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'device_locks', ds.id)));
                        found++;
                    }
                });

                // Update exam_results — hapus deviceLocked + tambah log audit
                const resSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                resSnap.forEach(ds => {
                    const d = ds.data();
                    const matchNisn   = d.studentNisn && d.studentNisn.toString().trim().toUpperCase() === input.toUpperCase();
                    const matchDevice = d.deviceFingerprint && d.deviceFingerprint === input;
                    if (matchNisn || matchDevice) {
                        delPromises.push(updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', ds.id), {
                            deviceLocked: false,
                            deviceUnlockedAt: Date.now(),
                            deviceUnlockedBy: adminNama,
                            note: ((d.note || '') + `\n[${nowStr}] Device di-unlock oleh ${adminNama} (input: ${input}).`).trim()
                        }));
                        found++;
                    }
                });

                if (found === 0) {
                    show('⚠️ Tidak ada data yang perlu di-unlock.', false);
                    return;
                }

                await Promise.all(delPromises);
                show(`✅ Berhasil unlock <strong>${found} entri</strong> untuk <strong>"${_e(input)}"</strong>.<br>
                    Dicatat atas nama: <strong>${_e(adminNama)}</strong> — ${nowStr}.<br>
                    Siswa sudah dapat login kembali.`, true);
                document.getElementById('unlock-device-input').value = '';

            } catch(err) {
                show('❌ Gagal unlock: ' + _e(err.message), false);
            }
        };
        
        // --- CHEAT ALERT LOGIC ---
        window.triggerCheatAlert = function(data) {
            if (document.getElementById('section-dashboard').classList.contains('hidden-section')) return;

            const modal = document.getElementById('modal-cheat-alert');
            const nameEl = document.getElementById('cheat-student-name');
            const msgEl = document.getElementById('cheat-message');
            const statusEl = document.getElementById('cheat-status');
            const countEl = document.getElementById('cheat-count');

            nameEl.innerText = data.studentName + " (" + data.className + ")";
            statusEl.innerText = data.status;
            countEl.innerText = data.violations + "x";

            if (data.status.includes('DISKUALIFIKASI')) {
                 msgEl.innerText = "SISWA INI TELAH DIDISKUALIFIKASI OLEH SISTEM!";
            } else {
                 msgEl.innerText = "Terdeteksi melakukan kecurangan (Pindah Tab/Split Screen)!";
            }

            modal.classList.remove('hidden');
            
            try {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.volume = 0.5;
                audio.play().catch(() => {}); 
            } catch(e) {}
        };

        window.closeCheatAlert = function() {
            document.getElementById('modal-cheat-alert').classList.add('hidden');
        };
        
        window.showViolationDetails = (id) => {
            const item = dashboardData.find(x => x.id === id);
            if (!item) return;

            document.getElementById('violation-student-name').innerText = item.studentName;
            const list = document.getElementById('violation-list');
            list.innerHTML = '';

            if (!item.violationLogs || item.violationLogs.length === 0) {
                list.innerHTML = '<p class="text-xs text-gray-400 italic text-center py-4">Tidak ada log detail tercatat.<br> (Sistem versi lama atau deteksi manual).</p>';
            } else {
                item.violationLogs.forEach((log) => {
                    const time = new Date(log.time).toLocaleTimeString('id-ID');
                    list.innerHTML += `
                        <div class="text-xs border-b last:border-0 pb-2 mb-2 bg-white p-2 rounded shadow-sm">
                            <span class="font-bold text-red-600 bg-red-50 px-1 rounded border border-red-100 mr-1">[${time}]</span> 
                            <span class="text-gray-700 font-medium">${log.message}</span>
                        </div>
                    `;
                });
            }
            document.getElementById('modal-violation-details').classList.remove('hidden');
        };

        window.filterQuestionBank = function() {
            const filterStatus = (document.getElementById('filter-bank-status') || {}).value || 'all';
            const searchVal    = ((document.getElementById('search-bank-soal') || {}).value || '').toLowerCase();
            const container    = document.getElementById('bank-soal-list');
            if (!container) return;

            // Filter by active paket
            let filtered = window.allQuestionsDB.filter(q => {
                if (window.activePaketId && q.paketId !== window.activePaketId) return false;
                if (filterStatus === 'aktif'    && q.aktif === false) return false;
                if (filterStatus === 'nonaktif' && q.aktif !== false) return false;
                if (searchVal && !(q.text||'').toLowerCase().includes(searchVal)) return false;
                return true;
            });
            filtered.sort((a,b) => (a.createdAt || 0) - (b.createdAt || 0));

            // Stats
            const total    = filtered.length;
            const aktifCnt = filtered.filter(q => q.aktif !== false).length;
            const nonAktif = total - aktifCnt;
            const s = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
            s('stat-total', `Total: ${total}`);
            s('stat-aktif', `Aktif: ${aktifCnt}`);
            s('stat-nonaktif', `Nonaktif: ${nonAktif}`);

            const pw = document.getElementById('pager-soal-wrap');

            if (filtered.length === 0) {
                const paket = (window.allPaketDB || []).find(p => p.id === window.activePaketId);
                container.innerHTML = `
                    <div class="bg-white rounded-xl border shadow-sm p-12 text-center">
                        <div class="inline-flex p-4 bg-blue-50 rounded-2xl mb-4"><i data-lucide="file-plus" class="w-10 h-10 text-blue-400"></i></div>
                        <h3 class="text-lg font-bold text-gray-700 mb-2">Belum Ada Soal</h3>
                        <p class="text-gray-400 text-sm mb-5">Paket <strong>${paket ? _e(paket.nama) : ''}</strong> belum memiliki soal.<br>Tambahkan soal manual atau import dari Excel/Word.</p>
                        <div class="flex gap-3 justify-center flex-wrap">
                            <button onclick="window.openQuestionModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md">
                                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Soal Manual
                            </button>
                            <button onclick="window.switchDashTab('import')" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md">
                                <i data-lucide="upload" class="w-4 h-4"></i> Import dari Excel/Word
                            </button>
                        </div>
                    </div>`;
                if (pw) pw.innerHTML = '';
                if(typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // Pagination
            const pgS = window._pg.soal;
            const pageItems = pgSlice(filtered, pgS);
            const sliceStart = pgS.perPage === 0 ? 0 : (pgS.page - 1) * pgS.perPage;

            const labels = ['A','B','C','D','E'];
            container.innerHTML = pageItems.map((q, idx) => {
                const globalIdx = sliceStart + idx;
                const isAktif   = q.aktif !== false;
                const isMultiple = q.tipe === 'multiple';
                const isTrueFalse = q.tipe === 'truefalse';
                const isEssayQ = q.tipe === 'essay';
                const isMenjodohkanQ = q.tipe === 'menjodohkan';
                const optionsHtml = isMenjodohkanQ
                    ? `<div class="bg-teal-50 border border-teal-200 rounded-xl p-3 space-y-2">
                        <p class="text-xs font-bold text-teal-700 mb-2 flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 3v18M18 3v18M6 12h12"/></svg> Pasangan Menjodohkan (${(q.pasangan||[]).length} pasang)</p>
                        ${(q.pasangan||[]).map((p,i) => `<div class="flex items-center gap-2 text-sm"><span class="w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center shrink-0">${i+1}</span><span class="flex-1 bg-teal-100 px-2 py-1 rounded text-teal-800">${p.kiri}</span><span class="text-teal-400 font-bold">↔</span><span class="flex-1 bg-orange-100 px-2 py-1 rounded text-orange-800">${p.kanan}</span></div>`).join('')}
                       </div>`
                    : isEssayQ
                    ? `<div class="bg-purple-50 border border-purple-200 rounded-xl p-3">
                            <p class="text-xs font-bold text-purple-700 mb-1.5 flex items-center gap-1"><i data-lucide="pencil-line" class="w-3.5 h-3.5"></i> Rubrik / Kunci Jawaban</p>
                            <p class="text-sm text-purple-900 whitespace-pre-line leading-relaxed">${q.essayRubrik || '—'}</p>
                            <div class="flex items-center gap-2 mt-2 flex-wrap">
                                <p class="text-xs text-purple-500 font-medium">Skor maks: ${q.essaySkorMaks || 10} poin</p>
                                <span class="text-xs ${(q.essayKoreksiMode||'ai')==='ai' ? 'bg-purple-600 text-white' : 'bg-amber-100 text-amber-700'} px-2 py-0.5 rounded-full font-bold">${(q.essayKoreksiMode||'ai')==='ai' ? '⚡ AI Otomatis' : '👨‍🏫 Manual Guru'}</span>
                            </div>
                       </div>`
                    : isTrueFalse
                    ? `<div class="flex gap-2">
                            <div class="flex items-center gap-2 px-4 py-2 rounded-lg ${q.correct === true || q.correct === 'true' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'}">
                                <span class="w-6 h-6 rounded-full ${q.correct === true || q.correct === 'true' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'} text-xs font-bold flex items-center justify-center">✓</span>
                                <span class="text-sm font-semibold ${q.correct === true || q.correct === 'true' ? 'text-green-700' : 'text-gray-500'}">BENAR ${q.correct === true || q.correct === 'true' ? '<span class="text-xs text-green-500">✓ Kunci</span>' : ''}</span>
                            </div>
                            <div class="flex items-center gap-2 px-4 py-2 rounded-lg ${q.correct === false || q.correct === 'false' ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-100'}">
                                <span class="w-6 h-6 rounded-full ${q.correct === false || q.correct === 'false' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'} text-xs font-bold flex items-center justify-center">✗</span>
                                <span class="text-sm font-semibold ${q.correct === false || q.correct === 'false' ? 'text-red-700' : 'text-gray-500'}">SALAH ${q.correct === false || q.correct === 'false' ? '<span class="text-xs text-red-500">✓ Kunci</span>' : ''}</span>
                            </div>
                       </div>`
                    : (q.options || []).map((opt, i) => {
                    const isCorrect = isMultiple
                        ? (Array.isArray(q.correct) && q.correct.includes(i))
                        : i === (Array.isArray(q.correct) ? q.correct[0] : q.correct);
                    return `<div class="flex items-start gap-2 py-1.5 px-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'}">
                        <span class="shrink-0 w-6 h-6 rounded-${isMultiple ? 'md' : 'full'} ${isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} text-xs font-bold flex items-center justify-center">${labels[i]||i}</span>
                        <span class="text-sm ${isCorrect ? 'text-green-800 font-semibold' : 'text-gray-700'} flex-1">${opt || '<em class="text-gray-400 text-xs">Gambar</em>'}</span>
                        ${isCorrect ? '<span class="text-xs font-bold text-green-600 shrink-0">✓ Kunci</span>' : ''}
                    </div>`;
                }).join('');
                const imgHtml = q.image ? `<div class="mt-3"><img src="${q.image}" class="max-h-32 rounded-xl border object-contain bg-gray-50 p-1"></div>` : '';

                // Build kunci label for card header
                const kunciLabel = isMenjodohkanQ
                    ? `<i>${(q.pasangan||[]).length} pasang</i>`
                    : isEssayQ
                        ? `<i>Esai (skor maks: ${q.essaySkorMaks || 10}) · ${(q.essayKoreksiMode||'ai') === 'ai' ? '⚡ AI Otomatis' : '👨‍🏫 Manual Guru'}</i>`
                        : isTrueFalse
                            ? (q.correct === true || q.correct === 'true' ? '✓ Benar' : '✗ Salah')
                            : isMultiple && Array.isArray(q.correct)
                                ? q.correct.map(i => labels[i]||i).join(', ')
                                : labels[Array.isArray(q.correct) ? q.correct[0] : q.correct] || q.correct;

                const tipeBadge = isMenjodohkanQ
                    ? `<span class="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-bold">Jodoh</span>`
                    : isEssayQ
                        ? `<span class="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">Esai</span>${(q.essayKoreksiMode||'ai')==='ai' ? '<span class="text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold ml-0.5">⚡ AI</span>' : '<span class="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold ml-0.5">👨‍🏫 Manual</span>'}`
                        : isTrueFalse
                            ? `<span class="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">B/S</span>`
                            : isMultiple
                                ? `<span class="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Ganda</span>`
                                : '';

                // ★ Badge KD/TP
                const kdBadge = q.kdTag
                    ? q.kdTag.split(',').map(k => k.trim()).filter(Boolean)
                        .map(k => `<span class="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">${_e(k)}</span>`).join(' ')
                    : '';

                return `
                <div class="bg-white rounded-2xl border shadow-sm overflow-hidden ${!isAktif ? 'opacity-60' : ''}" id="soal-card-${q.id}">
                    <div class="flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors" onclick="window.toggleSoalCard('${q.id}')">
                        <span class="text-xs font-bold text-gray-300 w-7 shrink-0 text-center">${globalIdx+1}</span>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <p class="text-sm font-semibold text-gray-800 truncate">${_e(q.text) || '<em class="text-gray-400 font-normal">Soal Gambar</em>'}</p>
                                ${tipeBadge}
                                ${kdBadge}
                            </div>
                            <p class="text-xs text-gray-400 mt-0.5">${(q.options||[]).length} pilihan • Kunci: ${kunciLabel}</p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <label class="flex items-center gap-1.5 cursor-pointer" onclick="event.stopPropagation()">
                                <div class="relative">
                                    <input type="checkbox" class="sr-only peer" ${isAktif ? 'checked' : ''} onchange="window.toggleAktifSoal('${q.id}', this.checked)">
                                    <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                                    <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                                </div>
                                <span class="text-xs font-semibold ${isAktif ? 'text-green-600' : 'text-gray-400'}">${isAktif ? 'Aktif' : 'Nonaktif'}</span>
                            </label>
                            <button onclick="event.stopPropagation(); window.openQuestionModal('${q.id}')" class="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Edit"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                            <button onclick="event.stopPropagation(); window.deleteQuestion('${q.id}')" class="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100" title="Hapus"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            <i data-lucide="chevron-down" class="w-4 h-4 text-gray-300 soal-chevron transition-transform shrink-0"></i>
                        </div>
                    </div>
                    <div class="soal-detail hidden border-t bg-slate-50 px-6 py-4">
                        <div class="mb-3">
                            <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Pertanyaan</p>
                            <p class="text-sm text-gray-800 leading-relaxed">${_e(q.text) || '<em class="text-gray-400">Tidak ada teks</em>'}</p>
                            ${imgHtml}
                        </div>
                        <div>
                            <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Pilihan Jawaban ${isMenjodohkanQ ? '<span class="text-teal-600">(Pasangan Menjodohkan)</span>' : isMultiple ? '<span class="text-emerald-600">(Jawaban Ganda — ✓ = Kunci)</span>' : isTrueFalse ? '<span class="text-amber-600">(Benar/Salah)</span>' : ''}</p>
                            <div class="space-y-1.5">${optionsHtml}</div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            if (pw) pw.innerHTML = renderPagerHTML('soal', total, pgS.page, pgS.perPage);
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.toggleSoalCard = function(id) {
            const card = document.getElementById(`soal-card-${id}`);
            if (!card) return;
            const detail  = card.querySelector('.soal-detail');
            const chevron = card.querySelector('.soal-chevron');
            const isOpen  = !detail.classList.contains('hidden');
            detail.classList.toggle('hidden', isOpen);
            if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
        };

        window.toggleAktifSoal = async function(id, aktif) {
            if (!window.isFirebaseReady) return alert("Mode Offline.");
            try {
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'questions', id), { aktif, updatedAt: Date.now() });
            } catch(e) { alert("Gagal update: " + e.message); }
        };

        // --- STUDENT LOGIN (UPDATED WITH OFFLINE SUPPORT) ---
        // ──────────────────────────────────────────────────────
        // HANDLE STUDENT LOGIN  (alur baru: Login → Welcome → Ujian)
        // ──────────────────────────────────────────────────────
        window.handleStudentLogin = async function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('btn-student-submit');
            try {
                const name        = document.getElementById('student-name').value.trim();
                const studentNisn = document.getElementById('student-nisn').value.trim();
                const cls         = document.getElementById('student-class').value;
                const room        = document.getElementById('student-room').value;
                const tokenInput  = document.getElementById('student-token').value.trim().toUpperCase();

                // ── MODE KARTU PESERTA: Validasi No. Peserta → auto-fill data siswa ──
                const loginMode = localStorage.getItem('integritest_nomor_id_mode') || 'nisn';
                if (loginMode === 'kartu') {
                    // studentNisn field berisi noPeserta
                    const noPeserta = studentNisn.toUpperCase().trim();
                    if (!noPeserta) { alert('Masukkan Nomor Peserta!'); return; }
                    // Cari dari allSiswaDB berdasarkan noPeserta
                    const swData = (window.allSiswaDB || []).find(s => (s.noPeserta||'').toUpperCase() === noPeserta);
                    if (!swData) {
                        alert('\u26a0\ufe0f Nomor Peserta tidak ditemukan di database!\nPastikan nomor peserta yang Anda masukkan benar.');
                        return;
                    }
                    // Kalau siswa belum isi nama/kelas manual, auto-fill
                    if (!name) {
                        alert('Silakan isi nama lengkap sesuai kartu peserta.');
                        return;
                    }
                    // Override cls & room dari data kartu peserta jika belum dipilih
                    if (!cls && swData.kelas) {
                        const selKelas = document.getElementById('student-class');
                        if (selKelas) {
                            selKelas.value = swData.kelas;
                            cls = swData.kelas;
                        }
                    }
                    if (!room && swData.ruangKartu) {
                        const selRoom = document.getElementById('student-room');
                        if (selRoom) {
                            selRoom.value = swData.ruangKartu;
                            room = swData.ruangKartu;
                        }
                    }
                    // Ambil cls/room dari data kartu jika masih kosong
                    if (!cls) cls = swData.kelas || '-';
                    if (!room) room = swData.ruangKartu || '-';
                }

                if (!name || !studentNisn || !cls || !room || !tokenInput) {
                    alert("Mohon lengkapi semua kolom: Nama, NISN/No. Peserta, Kelas, Ruang Ujian, dan Token!");
                    return;
                }

                // ── 1. FULLSCREEN segera saat tombol ditekan ──
                try {
                    const el = document.documentElement;
                    if (el.requestFullscreen) await el.requestFullscreen().catch(() => {});
                    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                    else if (el.msRequestFullscreen) el.msRequestFullscreen();
                } catch(fsErr) { console.log("FS:", fsErr); }

                // ── 2. Cari paket yang cocok dengan token + kelas siswa ──
                const paketCocok = (window.allPaketDB || []).filter(p => {
                    if (p.aktif === false) return false;
                    if (!p.token || p.token.toUpperCase() !== tokenInput) return false;
                    // jika paket punya filter kelas, siswa harus masuk salah satunya
                    if (p.kelas && p.kelas.length > 0) {
                        return p.kelas.some(k => k.toLowerCase() === cls.toLowerCase());
                    }
                    return true; // paket terbuka untuk semua kelas
                });

                // ── 3. Fallback: token cocok dengan global token ujian ──
                if (paketCocok.length === 0 && tokenInput !== window.currentExamToken) {
                    alert("TOKEN SALAH atau tidak ada ujian tersedia untuk kelas " + cls + ".\nMinta token yang benar kepada pengawas.");
                    return;
                }

                // ── 4. Cek incognito ──
                const isPrivate = await detectPrivateMode();
                if (isPrivate) {
                    const lanjut = confirm(
                        "⚠️ PERINGATAN: BROWSER PRIVATE/INCOGNITO TERDETEKSI\n\n" +
                        "Mode ini DILARANG karena dapat melewati sistem keamanan.\n\n" +
                        "Tekan OK untuk tetap lanjut (TERDATA pelanggaran),\n" +
                        "atau Batal → tutup dan buka browser normal."
                    );
                    if (!lanjut) return;
                    violationLogs.push({ time: Date.now(), message: "Login via mode Private/Incognito" });
                }

                // ── 5. Cek local session cooldown ──
                const localSession = localStorage.getItem('ukktkj_session_done');
                if (localSession) {
                    try {
                        const sd = JSON.parse(localSession);
                        const diffMinutes = (Date.now() - new Date(sd.date).getTime()) / 60000;
                        if (diffMinutes < window.deviceCooldownHours) {   // deviceCooldownHours sekarang = menit
                            const remaining = Math.ceil(window.deviceCooldownHours - diffMinutes);
                            alert(`⛔ PERANGKAT TERKUNCI\n\nBaru digunakan: "${sd.name}" (NISN: ${sd.nisn || '-'}).\nSisa cooldown: ${remaining} menit lagi.`);
                            return;
                        } else { localStorage.removeItem('ukktkj_session_done'); }
                    } catch(_) { localStorage.removeItem('ukktkj_session_done'); }
                }

                if (submitBtn) { submitBtn.disabled = true; submitBtn.querySelector('span').textContent = "Memeriksa..."; }

                // ── 6. Cek duplikat / device block di Firebase ──
                let isDuplicateName = false, isDeviceBlocked = false, blockedByWho = "";
                if (window.isFirebaseReady && window.db) {
                    try {
                        const fp = (window.getDeviceFingerprint || getDeviceFingerprint)();
                        const qSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                        const now = Date.now();
                        qSnap.forEach(ds => {
                            const d = ds.data();
                            if ((now - d.timestamp) / 60000 > window.deviceCooldownHours) return; // deviceCooldownHours = menit
                            const nisnMatch = d.studentNisn && studentNisn && d.studentNisn.toString().trim() === studentNisn.toString().trim();
                            const nameFb   = !d.studentNisn && d.studentName.toLowerCase() === name.toLowerCase() && d.className === cls;
                            if (nisnMatch || nameFb) {
                                if (d.status.includes('SELESAI') || d.status.includes('DISKUALIFIKASI')) isDuplicateName = true;
                            }
                            if (d.deviceFingerprint === fp && (d.status.includes('SELESAI') || d.status.includes('DISKUALIFIKASI'))) {
                                const beda = d.studentNisn && studentNisn ? d.studentNisn.toString() !== studentNisn.toString() : d.studentName.toLowerCase() !== name.toLowerCase();
                                if (beda) { isDeviceBlocked = true; blockedByWho = d.studentName + (d.studentNisn ? ' (NISN: '+d.studentNisn+')' : ''); }
                            }
                        });
                    } catch(dbErr) { console.warn("DB check offline:", dbErr); }
                }

                if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span').textContent = "MASUK"; }

                if (isDuplicateName) {
                    alert(`⛔ AKSES DITOLAK\n\n"${name}" sudah menyelesaikan atau didiskualifikasi.\nLogin ulang tidak diizinkan.`);
                    return;
                }
                if (isDeviceBlocked) {
                    alert(`⛔ PERANGKAT DIBLOKIR\n\nBaru dipakai oleh: "${blockedByWho}".\nGunakan perangkat sendiri. Terkunci ${window.deviceCooldownHours} menit.`);
                    return;
                }

                // ── 7. Simpan data login ke global untuk dipakai saat klik paket ──
                window._loginData = { name, studentNisn, cls, room, tokenInput, paketCocok };

                // ★ Simpan UID siswa ke Firestore dengan role=siswa
                try {
                    const uid = window.auth && window.auth.currentUser && window.auth.currentUser.uid;
                    if (uid && window.db) {
                        setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'authorized_uids', uid), {
                            role: 'siswa',
                            nama: name,
                            nisn: studentNisn,
                            kelas: cls,
                            ruang: room,
                            loginAt: Date.now()
                        });
                        window.currentUID = uid;
                    }
                } catch(uidErr) { console.warn('[Auth] UID save:', uidErr); }

                // ── 8. Tampilkan halaman SELAMAT DATANG ──
                document.getElementById('welcome-name').textContent  = name;
                document.getElementById('welcome-nisn').textContent  = studentNisn;
                document.getElementById('welcome-kelas').textContent = cls;
                window.renderWelcomePaketList(paketCocok, cls, tokenInput);

                document.getElementById('section-login').classList.add('hidden-section');
                document.getElementById('section-welcome').classList.remove('hidden-section');
                if (typeof lucide !== 'undefined') window._createIconsSafe();

            } catch(err) {
                console.error(err);
                alert("Gagal login: " + err.message);
                if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span').textContent = "MASUK"; }
            }
        };

        // ──────────────────────────────────────────────────────
        // Render daftar paket di halaman selamat datang
        // ──────────────────────────────────────────────────────
        window.renderWelcomePaketList = function(paketCocok, cls, tokenInput) {
            const container = document.getElementById('welcome-paket-list');
            if (!container) return;

            // Fallback jika tidak ada paket di Firebase tapi token global cocok
            if (paketCocok.length === 0 && tokenInput === window.currentExamToken) {
                const aktifPaket = (window.allPaketDB || []).filter(p =>
                    p.aktif !== false && (!p.token || p.token.toUpperCase() === tokenInput)
                );
                paketCocok = aktifPaket;
            }

            if (paketCocok.length === 0) {
                container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-6 px-4 text-center">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style="background:#fef9c3;">
                        <i data-lucide="calendar-x" class="w-7 h-7" style="color:#ca8a04;"></i>
                    </div>
                    <p class="text-gray-800 font-black text-sm mb-1">Belum Ada Jadwal atau Paket Ujian</p>
                    <p class="text-gray-500 text-xs leading-relaxed mb-4">
                        Saat ini belum ada ujian yang tersedia untuk kelasmu.<br>
                        Silakan <span class="font-bold text-blue-600">tanyakan kepada Pengawas</span> mengenai jadwal dan paket ujian yang akan digunakan.
                    </p>
                    <div class="w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
                        <i data-lucide="info" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"></i>
                        <p class="text-xs text-amber-800 text-left leading-relaxed font-medium">
                            Pastikan pengawas telah mengaktifkan paket ujian dan menetapkan jadwal sesuai kelas kamu sebelum memulai ujian.
                        </p>
                    </div>
                </div>`;
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // ★ AUTO-RANDOM: Jika ada lebih dari 1 paket yang cocok,
            // sistem langsung memilih paket secara acak — siswa tidak perlu memilih sendiri.
            // Ini memastikan distribusi paket merata dan mengurangi potensi contekan antar siswa.
            if (paketCocok.length > 1) {
                const randomIdx = Math.floor(Math.random() * paketCocok.length);
                const paketTerpilih = paketCocok[randomIdx];
                const jenisLabel = (paketTerpilih.jenis && paketTerpilih.jenis !== 'nonpaket') ? `Paket ${paketTerpilih.jenis}` : 'Ujian';

                container.innerHTML = `
                <div class="flex flex-col items-center py-5 px-4 text-center">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style="background:#dbeafe;">
                        <i data-lucide="shuffle" class="w-7 h-7" style="color:#1d4ed8;"></i>
                    </div>
                    <p class="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Sistem Memilihkan Paket Untukmu</p>
                    <p class="text-gray-800 font-black text-base leading-tight mb-0.5">${_e(paketTerpilih.nama)}</p>
                    <p class="text-xs text-indigo-600 font-semibold mb-4">${paketTerpilih.mapel ? paketTerpilih.mapel + ' · ' : ''}${jenisLabel}</p>
                    <button onclick="window.startExamFromWelcome('${paketTerpilih.id}')"
                        class="w-full py-3.5 rounded-xl font-black text-white text-sm transition-all active:scale-[0.98]"
                        style="background:linear-gradient(135deg,#1d4ed8,#6366f1);">
                        <i data-lucide="play-circle" class="w-4 h-4 inline mr-1.5 -mt-0.5"></i>
                        Mulai Ujian
                    </button>
                    <p class="text-[10px] text-gray-400 mt-2.5">Paket ditentukan otomatis oleh sistem secara acak untuk menjaga integritas ujian.</p>
                </div>`;
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // Hanya 1 paket → tampilkan tombol seperti biasa
            const cardAccents = [
                { icon:'#1d4ed8', badge:'#dbeafe', text:'#1e40af' },
                { icon:'#4338ca', badge:'#e0e7ff', text:'#3730a3' },
                { icon:'#0369a1', badge:'#e0f2fe', text:'#075985' },
                { icon:'#1e3a8a', badge:'#bfdbfe', text:'#1e40af' },
            ];
            container.innerHTML = paketCocok.map((p, i) => {
                const ac = cardAccents[i % cardAccents.length];
                const jenisLabel = (p.jenis && p.jenis !== 'nonpaket') ? `Paket ${p.jenis}` : 'Ujian';
                return `
                <button onclick="window.startExamFromWelcome('${p.id}')"
                    class="w-full text-left rounded-xl border border-blue-100 bg-white transition-all duration-150 active:scale-[0.98] hover:border-blue-300 hover:shadow-md"
                    style="box-shadow:0 1px 4px rgba(59,130,246,0.08);">
                    <div class="flex items-center gap-3 px-4 py-3.5">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:${ac.badge};">
                            <i data-lucide="book-open" class="w-5 h-5" style="color:${ac.icon}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-black text-sm text-gray-800 leading-tight truncate">${_e(p.nama)}</p>
                            <p class="text-xs mt-0.5 font-medium" style="color:${ac.text}">${p.mapel ? p.mapel + ' · ' : ''}${jenisLabel}</p>
                        </div>
                        <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style="background:#dbeafe;">
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-blue-500"></i>
                        </div>
                    </div>
                </button>`;
            }).join('');
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };;

        // ──────────────────────────────────────────────────────
        // Mulai ujian setelah klik paket di halaman welcome
        // ──────────────────────────────────────────────────────
        window.startExamFromWelcome = async function(paketId) {
            try {
                const { name, studentNisn, cls, room, tokenInput } = window._loginData || {};
                if (!name) { alert("Sesi habis. Silakan login ulang."); return; }

                // Cari paket
                const paket = (window.allPaketDB || []).find(p => p.id === paketId);
                const pkt   = paket ? (paket.jenis && paket.jenis !== 'nonpaket' ? paket.jenis : 'A') : 'A';

                // Load soal berdasarkan paketId dari Firestore (TIDAK ada fallback ke hardcode)
                let dbQuestions = window.allQuestionsDB.filter(q => q.paketId === paketId && q.aktif !== false);

                // Jika soal paket tidak ditemukan di DB, tampilkan error — jangan fallback ke paket lain
                if (dbQuestions.length === 0) {
                    alert("Belum ada soal untuk paket ini. Hubungi pengawas!");
                    return;
                }

                // Acak dulu, lalu potong sesuai jumlahSoal yang diset di paket
                shuffleArray(dbQuestions);
                const jumlahSoal = paket && paket.jumlahSoal && paket.jumlahSoal > 0 ? paket.jumlahSoal : dbQuestions.length;
                dbQuestions = dbQuestions.slice(0, jumlahSoal);

                // ★ ACAK OPSI JAWABAN per soal (pilihan ganda & multiple)
                // Setiap siswa mendapat urutan opsi yang berbeda, sehingga jawaban
                // A/B/C/D tidak sama antar siswa meskipun paket soalnya sama.
                // Mapping disimpan di q._optionMap (array index asli → index baru)
                // agar penilaian tetap benar saat saveAnswer dipanggil.
                dbQuestions = dbQuestions.map(q => {
                    const tipe = q.tipe || 'single';
                    // Hanya acak opsi untuk tipe pilihan ganda (single & multiple)
                    // Biarkan essay, truefalse, menjodohkan tetap seperti aslinya
                    if ((tipe === 'single' || tipe === 'multiple') && Array.isArray(q.options) && q.options.length > 1) {
                        // Buat array index asli: [0, 1, 2, 3, ...]
                        const origIndices = q.options.map((_, i) => i);
                        // Acak index
                        for (let i = origIndices.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [origIndices[i], origIndices[j]] = [origIndices[j], origIndices[i]];
                        }
                        // Susun ulang opsi & gambar opsi berdasarkan index acak
                        const newOptions = origIndices.map(i => q.options[i]);
                        const newOptImgs = q.optionImages ? origIndices.map(i => q.optionImages[i] || '') : null;

                        // Buat peta: index baru → index asli (untuk penilaian)
                        // _optionMap[newIdx] = origIdx
                        const optionMap = origIndices; // origIndices[newIdx] = origIdx

                        // Petakan kunci jawaban ke posisi baru
                        let newCorrect;
                        if (tipe === 'multiple' && Array.isArray(q.correct)) {
                            // correct adalah array index asli → cari posisi baru mereka
                            newCorrect = q.correct.map(origC => origIndices.indexOf(origC));
                        } else if (typeof q.correct === 'number') {
                            newCorrect = origIndices.indexOf(q.correct);
                        } else {
                            newCorrect = q.correct; // fallback
                        }

                        return { ...q, options: newOptions, optionImages: newOptImgs, correct: newCorrect, _optionMap: optionMap };
                    }
                    return q;
                });

                currentStudent = { name, nisn: studentNisn, cls, pkt, room, paketId, paketNama: paket ? paket.nama : '' };
                document.getElementById('header-name').innerText   = name;
                document.getElementById('header-detail').innerText = `${cls} · ${paket ? paket.nama : 'Paket '+pkt}`;

                currentQuestionList = [...dbQuestions];
                // Soal sudah diacak urutan & opsinya (shuffleArray + acak opsi per soal)
                violationLogs = [];
                violations    = 0;
                // ★ Reset guard flag agar finishExam & DQ modal bisa berjalan normal
                window._examFinished = false;
                window._dqShown = false;

                // Simpan ke Firestore LANGSUNG dulu — agar monitoring menampilkan siswa segera.
                // Cek dokumen lama (resume) dilakukan setelah save, di background.
                let existingActiveDocId = null;
                if (window.isFirebaseReady && window.db) {
                    // Langsung buat dokumen baru — siswa langsung muncul di monitoring
                    const startData = {
                        timestamp: Date.now(), studentName: name, studentNisn,
                        className: cls, ruangUjian: room || '-', packetType: pkt, paketId,
                        sesiId:   window.currentSesiId   || 'default',
                        sesiName: window.currentSesiName || 'Sesi Default',
                        jadwalId: (window.allJadwalDB || []).find(j => j.isActive && j.paketId === paketId)?.id || window.currentSesiId || 'default',
                        score: '-', status: "SEDANG MENGERJAKAN",
                        violations: 0, violationLogs: [],
                        deviceFingerprint: (window.getDeviceFingerprint || getDeviceFingerprint)(),
                        startTime: Date.now(),
                        examDurationMinutes: window.currentExamDuration || 60,
                        lastHeartbeat: Date.now()
                    };
                    window.examStartTime = startData.timestamp;
                    await window.saveExamStart(startData);

                    // Background: cek apakah ada dokumen lama milik siswa ini (re-login/resume)
                    // Jika ada, hapus dokumen baru yang baru dibuat dan pakai yang lama
                    setTimeout(async () => {
                        try {
                            const sesiNow = window.currentSesiId || 'default';
                            const qSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                            let oldDocId = null;
                            qSnap.forEach(ds => {
                                if (ds.id === window.currentExamDocId) return; // skip dokumen baru
                                const d = ds.data();
                                const nisnOk  = studentNisn && d.studentNisn &&
                                                d.studentNisn.toString().trim() === studentNisn.toString().trim();
                                const paketOk = d.paketId === paketId;
                                const sesiOk  = (d.sesiId || 'default') === sesiNow;
                                const masihAktif = !d.status.includes('SELESAI') && !d.status.includes('DISKUALIFIKASI');
                                if (nisnOk && paketOk && sesiOk && masihAktif && !oldDocId) {
                                    oldDocId = ds.id;
                                }
                            });
                            if (oldDocId) {
                                // Ada dokumen lama — hapus dokumen baru, pakai yang lama (resume)
                                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', window.currentExamDocId));
                                window.currentExamDocId = oldDocId;
                                try { sessionStorage.setItem('ukktkj_current_exam_doc_id', oldDocId); } catch(e) {}
                                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', oldDocId), {
                                    status: "MELANJUTKAN (Re-Login)", packetType: pkt, paketId,
                                    ruangUjian: room || '-',
                                    deviceFingerprint: (window.getDeviceFingerprint || getDeviceFingerprint)()
                                });
                            }
                        } catch(e) { console.warn('[Resume check]', e); }
                    }, 2000);

                } else {
                    // Offline — tetap lanjut ujian tanpa simpan ke Firebase
                    window.examStartTime = Date.now();
                }

                currentQuestionIndex = 0;
                renderQuestion();
                renderSidebarButtons();

                document.getElementById('section-welcome').classList.add('hidden-section');
                document.getElementById('section-exam').classList.remove('hidden-section');

                // ── Paksa fullscreen saat ujian dimulai ──
                try {
                    const el = document.documentElement;
                    if (el.requestFullscreen) await el.requestFullscreen().catch(() => {});
                    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                    else if (el.msRequestFullscreen) el.msRequestFullscreen();
                } catch(fsErr) { console.log("[FS] startExam:", fsErr); }

                window.renderWatermark(name);
                startExamLogic();

            } catch(err) {
                console.error(err);
                alert("Gagal memulai ujian: " + err.message);
            }
        };

        window.switchTeacherSubTab = function(tab) {
            const adminForm    = document.getElementById('form-admin-login');
            const pengawasForm = document.getElementById('form-pengawas-login');
            const guruForm     = document.getElementById('form-guru-login');
            const btnAdmin     = document.getElementById('subtab-admin');
            const btnPengawas  = document.getElementById('subtab-pengawas');
            const btnGuru      = document.getElementById('subtab-guru');

            const ACTIVE   = 'flex-1 py-2 text-xs font-bold rounded-lg bg-white text-gray-800 shadow-sm flex items-center justify-center gap-1.5';
            const INACTIVE = 'flex-1 py-2 text-xs font-bold rounded-lg text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1.5';

            // Hide all forms first
            [adminForm, pengawasForm, guruForm].forEach(f => f && f.classList.add('hidden-section'));
            [btnAdmin, btnPengawas, btnGuru].forEach(b => b && (b.className = INACTIVE));

            if (tab === 'admin') {
                adminForm.classList.remove('hidden-section');
                btnAdmin.className = ACTIVE;
            } else if (tab === 'guru') {
                guruForm.classList.remove('hidden-section');
                btnGuru.className = ACTIVE;
            } else {
                pengawasForm.classList.remove('hidden-section');
                btnPengawas.className = ACTIVE;
                window.updatePengawasRoomDropdown();
            }
        };

        window.updatePengawasRoomDropdown = function() {
            const sel = document.getElementById('pengawas-room-select');
            if (!sel) return;
            sel.innerHTML = '<option value="">-- Pilih Ruang --</option>';
            (window.ruangList || []).forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = r.nama;
                sel.appendChild(opt);
            });
        };

        window.handleAdminLogin = async function(e) {
            e.preventDefault();
            const u = document.getElementById('admin-user').value.trim();
            const p = document.getElementById('admin-pass').value;
            const btn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('button');

            if (!u || !p) { alert("Username dan password tidak boleh kosong!"); return; }
            if (btn) { btn.disabled = true; btn.textContent = "Memeriksa..."; }

            try {
                let loginOk = false;
                let adminDisplayName = u;

                // ── Cek credentials ke Firebase ──
                if (window.isFirebaseReady && window.db) {
                    try {
                        // Cek admin utama dulu
                        const snap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials'));
                        snap.forEach(ds => {
                            const d = ds.data();
                            // Bandingkan username (case-insensitive) dan password (case-sensitive)
                            if (d.username && d.username.toLowerCase() === u.toLowerCase() && d.password === p) {
                                loginOk = true;
                                adminDisplayName = d.displayName || u;
                            }
                        });

                        // Cek admin tamu jika belum berhasil
                        if (!loginOk) {
                            const gSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'guest_admins'));
                            gSnap.forEach(ds => {
                                const d = ds.data();
                                if (d.username && d.username.toLowerCase() === u.toLowerCase() && d.password === p) {
                                    loginOk = true;
                                    adminDisplayName = d.displayName || u;
                                    window._loginAsGuest = true;
                                }
                            });
                        }
                    } catch(dbErr) {
                        console.warn("Firebase credentials check error:", dbErr);
                        // Fallback ke hardcoded jika Firebase error
                        if (u.toLowerCase() === 'authar' && p === 'Sedayu@123') {
                            loginOk = true; adminDisplayName = 'Admin';
                        }
                    }
                } else {
                    // Mode offline: fallback ke default (pertama kali setup)
                    if (u.toLowerCase() === 'authar' && p === 'Sedayu@123') {
                        loginOk = true; adminDisplayName = 'Admin';
                    }
                }

                if (!loginOk) {
                    alert("❌ Username atau Password Admin Salah!\n\nPeriksa kembali username dan password Anda.");
                    return;
                }

                // ── Login berhasil ──
                const isGuest = window._loginAsGuest === true;
                window._loginAsGuest = false;
                window.currentUserRole = isGuest ? 'admin_guest' : 'admin';
                window.currentPengawasRuang = null;

                // ★ Simpan session ke sessionStorage agar bertahan saat refresh
                sessionStorage.setItem('integritest_staff_session', JSON.stringify({
                    role: window.currentUserRole,
                    displayName: adminDisplayName,
                    savedAt: Date.now()
                }));

                // ★ Simpan UID + role ke Firestore agar Firestore Rules bisa verifikasi
                try {
                    const uid = window.auth && window.auth.currentUser && window.auth.currentUser.uid;
                    if (uid && window.db) {
                        await setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'authorized_uids', uid), {
                            role: 'admin',
                            username: u,
                            loginAt: Date.now()
                        });
                        window.currentUID = uid;
                    }
                } catch(uidErr) { console.warn('[Auth] UID save gagal:', uidErr); }
                if(window.setupRealtimeListener) window.setupRealtimeListener();
                if(window.listenForKelas) window.listenForKelas();
                if(window.listenForPaket) window.listenForPaket();
                if(window.listenForRuang) window.listenForRuang();
                if(window.listenForActiveSesi) window.listenForActiveSesi();

                document.getElementById('dash-header-title').textContent = 'Panel Admin / Koordinator';
                document.getElementById('dash-header-subtitle').textContent = `Akses Penuh — Login sebagai: ${adminDisplayName}`;
                document.getElementById('dash-header-icon').className = 'bg-indigo-600 p-2 rounded-lg';
                document.getElementById('pengawas-room-badge').classList.add('hidden');
                document.getElementById('pengawas-exam-info').classList.add('hidden');
                // Tampilkan info judul ujian di header admin (jika sudah diset)
                const _adminInfoWrap = document.getElementById('admin-exam-info');
                const _savedAppAdmin = window._savedAppearance || {};
                if (_adminInfoWrap) {
                    const _aj = document.getElementById('admin-exam-judul');
                    const _as = document.getElementById('admin-exam-sub');
                    if (_aj) _aj.textContent = (_savedAppAdmin.judulUjian || '').trim();
                    if (_as) _as.textContent = (_savedAppAdmin.subJudul   || '').trim();
                    if (_savedAppAdmin.judulUjian || _savedAppAdmin.subJudul) { _adminInfoWrap.classList.remove('hidden'); _adminInfoWrap.style.display = 'flex'; }
                    else { _adminInfoWrap.classList.add('hidden'); _adminInfoWrap.style.display = ''; }
                }
                // Sembunyikan card token (khusus pengawas, bukan admin)
                const _tkCardAdmin = document.getElementById('pengawas-token-card');
                if (_tkCardAdmin) _tkCardAdmin.classList.add('hidden');

                document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.remove('hidden'));
                // Sesuaikan lebar bottom nav mobile saat admin (semua tab tampil)
                const mobileNav = document.getElementById('mobile-bottom-nav');
                if (mobileNav) mobileNav.style.display = '';

                document.getElementById('section-login').classList.add('hidden-section');
                document.getElementById('section-dashboard').classList.remove('hidden-section');
                // Delay kecil agar DOM selesai render (terutama di HP)
                // ★ Restore ke tab terakhir yang aktif sebelum refresh
                const _lastTab = (() => {
                    try { return sessionStorage.getItem('integritest_active_tab') || 'welcome'; } catch(e) { return 'welcome'; }
                })();
                const _adminTabs = ['welcome','nilai','kelasruang','soal','siswa','analitik','jadwal','tampilan','loganomal','databackup','kendala'];
                const _tabToRestore = _adminTabs.includes(_lastTab) ? _lastTab : 'welcome';
                requestAnimationFrame(() => { window.switchDashTab(_tabToRestore); });

                const teacherInput = document.getElementById('teacher-token-input');
                if(teacherInput) teacherInput.value = window.currentExamToken;
                if(typeof lucide !== 'undefined') window._createIconsSafe();

                // Pastikan dropdown analitik terisi setelah semua listener siap
                // Delay cukup panjang agar Firestore sempat mengembalikan data
                setTimeout(() => {
                    if (window.renderIntegrityDashboard) window.renderIntegrityDashboard();
                    if (isGuest) window._activateGuestMode(adminDisplayName);
                    if (isGuest) window.loadGuestAdmins(); // muat list di panel tampilan
                }, 1500);

                // ★ ONBOARDING: Tampilkan tour otomatis jika admin pertama kali login
                setTimeout(() => {
                    try {
                        const tourDone = localStorage.getItem('integritest_tour_done');
                        if (!tourDone && window.obTour) {
                            window.obTour.start();
                        }
                    } catch(e) {}
                }, 2200);

            } finally {
                if (btn) { btn.disabled = false; btn.textContent = "Masuk"; }
            }
        };

        // ══════════════════════════════════════════════════════════════════
        // ★ INTEGRITEST ONBOARDING TOUR ENGINE
        // ══════════════════════════════════════════════════════════════════
        window.obTour = (function() {
            // ── Definisi langkah-langkah tour ──
            const STEPS = [
                {
                    id: 'welcome',
                    tab: 'welcome',
                    targetId: 'tab-dash-welcome',
                    icon: '👋',
                    label: 'Selamat Datang',
                    title: 'Selamat datang di INTEGRITEST!',
                    desc: 'Ini adalah Panel Admin — tempat kamu mengelola seluruh ujian, soal, siswa, dan hasil analitik. Kita akan tur lengkap untuk kenali semua fitur yang tersedia.',
                    tip: '💡 Tutorial ini bisa diulang kapan saja via tombol "Mulai Panduan Interaktif" di halaman Beranda.',
                    pos: 'bottom',
                },
                {
                    id: 'nilai',
                    tab: 'nilai',
                    targetId: 'tab-dash-nilai',
                    icon: '📊',
                    label: 'Monitoring Real-time',
                    title: 'Monitoring Nilai Langsung',
                    desc: 'Tab ini menampilkan semua siswa yang sedang mengerjakan ujian secara real-time. Kamu bisa lihat progress pengerjaan, status selesai/aktif, dan langsung diskualifikasi jika diperlukan.',
                    tip: '💡 Tidak perlu refresh — data update otomatis setiap ada siswa submit.',
                    pos: 'bottom',
                },
                {
                    id: 'analitik',
                    tab: 'analitik',
                    targetId: 'tab-dash-analitik',
                    icon: '🔍',
                    label: 'Analitik Integritas',
                    title: 'Analitik & Skor Integritas',
                    desc: 'Setelah ujian, lihat scatter plot nilai vs integritas, bandingkan tren antar jadwal dan kelas, serta cetak laporan PDF individual per siswa lengkap dengan log pelanggaran.',
                    tip: '💡 Skor Integritas dihitung otomatis dari jumlah pelanggaran (pindah tab, keluar layar, dll).',
                    pos: 'bottom',
                },
                {
                    id: 'kelasruang',
                    tab: 'kelasruang',
                    targetId: 'tab-dash-kelasruang',
                    icon: '🏫',
                    label: 'Kelas & Ruang',
                    title: 'Kelola Kelas & Ruang Ujian',
                    desc: 'Buat kelas peserta dan ruang ujian, lalu tugaskan pengawas ke tiap ruang. Pengawas akan memantau dan mengelola siswa di ruangnya masing-masing saat ujian berlangsung.',
                    tip: '💡 Pengawas login dengan akun terpisah dan hanya bisa lihat siswa di ruangnya sendiri.',
                    pos: 'bottom',
                },
                {
                    id: 'soal',
                    tab: 'soal',
                    targetId: 'tab-dash-soal',
                    icon: '📝',
                    label: 'Bank Soal',
                    title: 'Kelola Soal & Paket Ujian',
                    desc: 'Tambah soal secara manual, atau upload massal via Excel/Word. Buat beberapa Paket (A/B/C) untuk mengurangi kecurangan — setiap kelas bisa mendapat soal berbeda.',
                    tip: '💡 Template Excel tersedia di tombol "Download Template" pada tab Upload.',
                    pos: 'bottom',
                },
                {
                    id: 'siswa',
                    tab: 'siswa',
                    targetId: 'tab-dash-siswa',
                    icon: '🎓',
                    label: 'Data Siswa',
                    title: 'Manajemen Data Siswa',
                    desc: 'Import daftar siswa via Excel, atur kelas dan ruang ujian. Sistem akan otomatis mencocokkan siswa dengan paket soal sesuai kelasnya saat mereka login ujian.',
                    tip: '💡 Fitur Kartu Peserta bisa dicetak langsung dari sini — lengkap dengan QR token.',
                    pos: 'bottom',
                },
                {
                    id: 'jadwal',
                    tab: 'jadwal',
                    targetId: 'tab-dash-jadwal',
                    icon: '🗓️',
                    label: 'Penjadwalan',
                    title: 'Jadwal Ujian Otomatis',
                    desc: 'Buat sesi ujian dengan tanggal & jam mulai/selesai. Token akan aktif dan nonaktif otomatis sesuai jadwal — tanpa perlu admin online terus sepanjang ujian berlangsung.',
                    tip: '💡 Bisa buat banyak jadwal bersamaan, misalnya STS dan UAS di hari berbeda.',
                    pos: 'bottom',
                },
                {
                    id: 'tampilan',
                    tab: 'tampilan',
                    targetId: 'tab-dash-tampilan',
                    icon: '⚙️',
                    label: 'Setting',
                    title: 'Pengaturan & Tampilan',
                    desc: 'Atur judul ujian, logo sekolah, durasi, KKM, mode nomor ID siswa, dan banyak lagi. Bisa juga buat akun Admin Tamu dan Guru Mapel dengan hak akses terbatas.',
                    tip: '💡 Semua perubahan langsung terlihat oleh siswa tanpa perlu deploy ulang.',
                    pos: 'bottom',
                },
                {
                    id: 'akun-guru',
                    tab: 'akun-guru',
                    targetId: 'tab-dash-akun-guru',
                    icon: '👨‍🏫',
                    label: 'Akun Guru',
                    title: 'Manajemen Akun Guru',
                    desc: 'Buat dan kelola akun Guru Mapel dengan hak akses terbatas. Guru bisa login untuk melihat nilai, cetak laporan, dan mengelola soal mapelnya sendiri tanpa bisa mengubah konfigurasi sistem.',
                    tip: '💡 Guru Mapel hanya bisa melihat data kelas dan jadwal yang ditugaskan kepadanya.',
                    pos: 'bottom',
                },
                {
                    id: 'loganomal',
                    tab: 'loganomal',
                    targetId: 'tab-dash-loganomal',
                    icon: '🚨',
                    label: 'Log Anomali',
                    title: 'Log Anomali & Pelanggaran',
                    desc: 'Rekam jejak lengkap semua pelanggaran siswa: ganti tab, keluar fullscreen, copy-paste, kamera terdeteksi, dll. Bisa filter per siswa, ruang, dan jenis pelanggaran.',
                    tip: '💡 Data log ini juga masuk ke laporan PDF integritas individual siswa.',
                    pos: 'bottom',
                },
                {
                    id: 'databackup',
                    tab: 'databackup',
                    targetId: 'tab-dash-databackup',
                    icon: '💾',
                    label: 'Data & Backup',
                    title: 'Data & Cadangan Database',
                    desc: 'Export seluruh data ujian ke CSV atau Excel, backup soal dan siswa, serta reset data untuk ujian berikutnya. Pastikan selalu backup sebelum reset agar tidak kehilangan data.',
                    tip: '💡 Gunakan menu ini setelah setiap sesi ujian selesai untuk arsip yang rapi.',
                    pos: 'bottom',
                },
                {
                    id: 'kendala',
                    tab: 'kendala',
                    targetId: 'tab-dash-kendala',
                    icon: '⚠️',
                    label: 'Kendala Pengawas',
                    title: 'Laporan Kendala Pengawas',
                    desc: 'Pengawas bisa melaporkan kendala yang terjadi di ruangnya secara langsung (siswa bermasalah, gangguan teknis, dll). Kamu bisa memantau dan merespons semua laporan dari sini.',
                    tip: '💡 Laporan yang belum ditangani akan muncul dengan badge merah di tab ini.',
                    pos: 'bottom',
                },
                {
                    id: 'banding',
                    tab: 'banding',
                    targetId: 'tab-dash-banding',
                    icon: '⚖️',
                    label: 'Banding Siswa',
                    title: 'Kelola Banding Siswa',
                    desc: 'Siswa yang merasa terdiskualifikasi secara tidak adil bisa mengajukan banding. Kamu bisa meninjau alasan banding, memutuskan ampuni atau tolak, dan memberikan catatan resmi.',
                    tip: '💡 Fitur banding bisa diaktifkan/nonaktifkan sewaktu-waktu dari tab ini.',
                    pos: 'bottom',
                },
                {
                    id: 'laporan-superadmin',
                    tab: 'laporan-superadmin',
                    targetId: 'tab-dash-laporan-superadmin',
                    icon: '📡',
                    label: 'Laporan ke Superadmin',
                    title: 'Laporan Bug & Kendala ke Superadmin',
                    desc: 'Temukan bug atau kendala teknis di INTEGRITEST? Laporkan langsung dari sini. Superadmin akan menerima laporan, memprosesnya, dan membalas dengan status penanganan.',
                    tip: '💡 Untuk masalah sangat mendesak, kamu juga bisa email langsung ke adminintegritest@gmail.com.',
                    pos: 'bottom',
                    isLast: true,
                },
            ];

            let currentStep = 0;
            let isActive    = false;
            let _scrollLock = null;

            // ── DOM refs ──
            function _el(id) { return document.getElementById(id); }

            // ── Hitung posisi elemen relatif ke viewport ──
            function _getRect(el) {
                const r = el.getBoundingClientRect();
                return { top: r.top, left: r.left, width: r.width, height: r.height };
            }

            // ── Posisikan spotlight di atas elemen ──
            function _placeSpotlight(el) {
                const r   = _getRect(el);
                const PAD = 8;
                const sp  = _el('ob-spotlight');
                const pu  = _el('ob-pulse');
                sp.style.cssText = `display:block;top:${r.top - PAD}px;left:${r.left - PAD}px;width:${r.width + PAD*2}px;height:${r.height + PAD*2}px;`;
                // Pulse dot at center-top of element
                pu.style.cssText = `display:block;top:${r.top - 20}px;left:${r.left + r.width/2 - 20}px;`;
            }

            // ── Posisikan card relatif ke spotlight ──
            function _placeCard(el, pos) {
                const r      = _getRect(el);
                const card   = _el('ob-card');
                const cW     = Math.min(360, window.innerWidth - 24);
                const cH     = card.offsetHeight || 240;
                const vW     = window.innerWidth;
                const vH     = window.innerHeight;
                const PAD    = 12;
                let top, left;

                // Default: bawah elemen
                top  = r.top + r.height + PAD + 8;
                left = r.left + r.width/2 - cW/2;

                // Clamp horizontal — pastikan card tidak terpotong kiri/kanan
                left = Math.max(12, Math.min(left, vW - cW - 12));
                // Jika card keluar bawah viewport → taruh di atas
                if (top + cH > vH - 20) { top = r.top - cH - PAD - 8; }
                // Jika masih negatif (elemen terlalu atas) → taruh di tengah layar
                if (top < 60) { top = Math.max(60, vH/2 - cH/2); }

                card.style.top  = top  + 'px';
                card.style.left = left + 'px';
                card.style.width = cW + 'px';
            }

            // ── Render langkah ──
            function _render(idx) {
                const step   = STEPS[idx];
                const total  = STEPS.length;

                // Switch tab dulu (membuat elemen target tersedia di DOM)
                if (step.tab) {
                    window.switchDashTab(step.tab);
                }

                // Delay sedikit agar tab render selesai
                setTimeout(() => {
                    const targetEl = step.targetId ? _el(step.targetId) : null;
                    if (targetEl) {
                        // Scroll elemen ke viewport
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        setTimeout(() => {
                            _placeSpotlight(targetEl);
                            _placeCard(targetEl, step.pos || 'bottom');
                        }, 250);
                    } else {
                        // Fallback: spotlight di tengah
                        const sp = _el('ob-spotlight');
                        sp.style.cssText = 'display:none;';
                        _el('ob-pulse').style.display = 'none';
                        const card = _el('ob-card');
                        card.style.top  = '50%';
                        card.style.left = '50%';
                        card.style.transform = 'translate(-50%,-50%)';
                    }

                    // Isi konten card
                    _el('ob-step-label').textContent   = step.label;
                    _el('ob-step-counter').textContent = `${idx+1} / ${total}`;
                    _el('ob-card-icon').textContent    = step.icon;
                    _el('ob-card-title').textContent   = step.title;
                    _el('ob-card-desc').textContent    = step.desc;

                    const tipEl = _el('ob-card-tip');
                    if (step.tip) {
                        tipEl.textContent = step.tip;
                        tipEl.style.display = 'block';
                    } else {
                        tipEl.style.display = 'none';
                    }

                    // Tombol
                    const btnNext = _el('ob-btn-next');
                    const btnPrev = _el('ob-btn-prev');
                    btnNext.textContent = step.isLast ? '🎉 Selesai!' : 'Lanjut →';
                    btnNext.style.background = step.isLast
                        ? 'linear-gradient(135deg,#059669,#10b981)'
                        : 'linear-gradient(135deg,#4f46e5,#7c3aed)';
                    btnPrev.style.display = idx === 0 ? 'none' : '';

                    // Dots
                    const dotsEl = _el('ob-dots');
                    dotsEl.innerHTML = STEPS.map((_, i) =>
                        `<div class="ob-dot${i === idx ? ' active' : ''}"></div>`
                    ).join('');

                    // Reset transform jika sebelumnya fallback
                    if (targetEl) { _el('ob-card').style.transform = ''; }

                }, 180);
            }

            // ── API Publik ──
            return {
                start() {
                    if (isActive) return;
                    isActive     = true;
                    currentStep  = 0;

                    // Tampilkan overlay
                    const backdrop = _el('ob-backdrop');
                    backdrop.style.display = 'block';
                    backdrop.style.opacity = '1';
                    _el('ob-card').style.display     = 'block';
                    _el('ob-skip-btn').style.display = 'block';

                    // Nonaktifkan pointer event di backdrop (biarkan interaksi di card)
                    backdrop.style.pointerEvents = 'none';

                    _render(0);
                },

                next() {
                    if (!isActive) return;
                    if (currentStep >= STEPS.length - 1) {
                        this.end(true);
                        return;
                    }
                    currentStep++;
                    _render(currentStep);
                },

                prev() {
                    if (!isActive || currentStep === 0) return;
                    currentStep--;
                    _render(currentStep);
                },

                end(completed) {
                    if (!isActive) return;
                    isActive = false;

                    // Sembunyikan semua elemen tour
                    ['ob-backdrop','ob-spotlight','ob-pulse','ob-card','ob-skip-btn'].forEach(id => {
                        const el = _el(id);
                        if (el) { el.style.display = 'none'; el.style.opacity = ''; }
                    });

                    // Kembali ke tab welcome
                    window.switchDashTab('welcome');

                    // Tandai tour sudah selesai
                    if (completed) {
                        try { localStorage.setItem('integritest_tour_done', '1'); } catch(e) {}
                        // Tampilkan toast
                        _showToast('🎉 Panduan selesai! Kamu siap menggunakan INTEGRITEST.', '#059669');
                    }
                },

                reset() {
                    try { localStorage.removeItem('integritest_tour_done'); } catch(e) {}
                    this.end(false);
                    setTimeout(() => this.start(), 300);
                }
            };

            function _showToast(msg, bg) {
                const t = document.createElement('div');
                t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.25);white-space:nowrap;transition:opacity 0.5s;`;
                t.textContent = msg;
                document.body.appendChild(t);
                setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 500); }, 3000);
            }
        })();

        window.handlePengawasLogin = function(e) {
            e.preventDefault();
            const ruangId = document.getElementById('pengawas-room-select').value;
            const passInput = document.getElementById('pengawas-pass').value.trim().toUpperCase();

            if (!ruangId) { alert("Silakan pilih ruang ujian terlebih dahulu!"); return; }

            const ruang = (window.ruangList || []).find(r => r.id === ruangId);
            if (!ruang) { alert("Ruang tidak ditemukan. Hubungi Admin."); return; }

            if (!ruang.password || passInput !== ruang.password.trim().toUpperCase()) {
                alert("❌ Password Ruang Salah!\n\nPastikan kamu memasukkan password yang benar untuk " + ruang.nama);
                return;
            }

            // Login berhasil sebagai pengawas
            window.currentUserRole = 'pengawas';
            window.currentPengawasRuang = ruang;

            // ★ Simpan session ke sessionStorage agar bertahan saat refresh
            sessionStorage.setItem('integritest_staff_session', JSON.stringify({
                role: 'pengawas',
                ruang: ruang,
                savedAt: Date.now()
            }));

            // ★ Simpan UID + role pengawas ke Firestore
            try {
                const uid = window.auth && window.auth.currentUser && window.auth.currentUser.uid;
                if (uid && window.db) {
                    setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'authorized_uids', uid), {
                        role: 'pengawas',
                        ruangId: ruang.id,
                        ruangNama: ruang.nama,
                        loginAt: Date.now()
                    });
                    window.currentUID = uid;
                }
            } catch(uidErr) { console.warn('[Auth] UID save:', uidErr); }

            if(window.setupRealtimeListener) window.setupRealtimeListener();
            if(window.listenForKelas) window.listenForKelas();
            if(window.listenForPaket) window.listenForPaket();

            // Update header untuk pengawas
            document.getElementById('dash-header-title').textContent = 'Monitoring Ruang';
            document.getElementById('dash-header-subtitle').textContent = `Pengawas ${ruang.nama}`;
            document.getElementById('dash-header-icon').className = 'bg-amber-500 p-2 rounded-lg';
            // Sembunyikan info ujian admin header
            const _adminInfoHide = document.getElementById('admin-exam-info');
            if (_adminInfoHide) { _adminInfoHide.classList.add('hidden'); _adminInfoHide.style.display = ''; }
            // Tampilkan info ujian di kanan header
            const _app = window._savedAppearance || {};
            const _judulEl = document.getElementById('pengawas-exam-judul');
            const _subEl   = document.getElementById('pengawas-exam-sub');
            const _infoWrap = document.getElementById('pengawas-exam-info');
            if (_judulEl) _judulEl.textContent = _app.judulUjian || '';
            if (_subEl)   _subEl.textContent   = _app.subJudul   || '';
            if (_infoWrap && (_app.judulUjian || _app.subJudul)) _infoWrap.classList.remove('hidden');
            const badge = document.getElementById('pengawas-room-badge');
            badge.classList.remove('hidden');
            badge.classList.add('flex');
            document.getElementById('pengawas-room-label').textContent = ruang.nama;

            // Tampilkan card token di dashboard pengawas
            const tokenCard = document.getElementById('pengawas-token-card');
            if (tokenCard) { tokenCard.classList.remove('hidden'); }
            if (window.updatePengawasTokenDisplay) window.updatePengawasTokenDisplay();

            // Sembunyikan tab & elemen yang hanya untuk admin — HARUS sebelum switchDashTab
            document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.add('hidden'));
            // Mobile bottom nav: sesuaikan lebar karena hanya 2 tab yang tampil untuk pengawas
            document.querySelectorAll('.admin-only-el').forEach(el => el.classList.add('hidden'));

            // Tampilkan widget kendala kecil & notif banding — akan ter-show via JS setelah data dimuat
            // (widget banding besar dipindah ke tab Banding)

            // Buka dashboard dan paksa tab Monitoring Nilai aktif
            document.getElementById('section-login').classList.add('hidden-section');
            document.getElementById('section-dashboard').classList.remove('hidden-section');
            window.switchDashTab('nilai');

            // Load data banding & kendala setelah Firebase siap
            setTimeout(() => {
                if (window.loadPengawasAppealList) window.loadPengawasAppealList();
                if (window._showPengawasKendalaWidget) window._showPengawasKendalaWidget();
                // Auto-refresh setiap 30 detik
                if (window._pengawasAppealInterval) clearInterval(window._pengawasAppealInterval);
                window._pengawasAppealInterval = setInterval(() => {
                    if (window.currentPengawasRuang && window.loadPengawasAppealList) window.loadPengawasAppealList();
                }, 30000);
            }, 2000);

            // Load data untuk pengawas
            if(window.listenForActiveSesi) window.listenForActiveSesi();
            if(window.setupRealtimeListener) window.setupRealtimeListener();
            if(window.listenForKelas) window.listenForKelas();
            if(window.listenForPaket) window.listenForPaket();

            // Set filter ruang otomatis ke ruang pengawas
            const filterRuang = document.getElementById('filter-ruang');
            if (filterRuang) {
                setTimeout(() => {
                    filterRuang.value = ruang.nama;
                    if (!filterRuang.value) filterRuang.value = ruangId;
                    window.filterDashboard();
                }, 900);
            }
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.handleTeacherLogin = function(e) {
            // Wrapper lama, sekarang diarahkan ke admin login
            e.preventDefault();
            window.handleAdminLogin(e);
        };

        window.changeQuestion = function(delta) {
            const newIndex = currentQuestionIndex + delta;
            if (newIndex >= 0 && newIndex < currentQuestionList.length) {
                currentQuestionIndex = newIndex;
                renderQuestion();
            }
        };

        window.toggleSidebar = function() {
            const sidebar = document.getElementById('exam-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar.classList.contains('sidebar-closed')) {
                sidebar.classList.remove('sidebar-closed');
                sidebar.classList.add('sidebar-open');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.remove('sidebar-open');
                sidebar.classList.add('sidebar-closed');
                overlay.classList.add('hidden');
            }
        };

        // --- CONFIRM FINISH EXAM WITH ANTI-SUBMIT CHECK ---
        window.confirmFinishExam = function() {
            // NEW: Anti-Submit Check — gunakan modal internal, BUKAN alert() agar tidak trigger anti-cheat
            if (window.currentMinExamDuration > 0 && window.examStartTime) {
                const elapsedMs = Date.now() - window.examStartTime;
                const elapsedMin = elapsedMs / 60000;
                
                if (elapsedMin < window.currentMinExamDuration) {
                    const remaining = Math.ceil(window.currentMinExamDuration - elapsedMin);
                    // Tampilkan modal internal (bukan alert browser) agar tidak memicu anti-cheat
                    window._suppressCheat = true;
                    document.getElementById('early-submit-msg').innerText = 
                        `Anda baru bisa mengumpulkan jawaban setelah ${window.currentMinExamDuration} menit pertama berlalu.\nSilakan periksa kembali jawaban Anda.`;
                    document.getElementById('early-submit-remaining').innerText = 
                        `⏳ Sisa waktu tunggu: ${remaining} menit lagi`;
                    document.getElementById('modal-early-submit').classList.remove('hidden');
                    if(typeof lucide !== 'undefined') window._createIconsSafe();
                    return;
                }
            }

            const answeredCount = Object.keys(userAnswers).filter(k => {
                const v = userAnswers[k];
                const q = (currentQuestionList || []).find(x => x.id === k);
                if (q && q.tipe === 'essay') return v && v.text && v.text.trim().length > 0;
                if (q && q.tipe === 'menjodohkan') return v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0;
                return !(Array.isArray(v) && v.length === 0);
            }).length;
            const total = currentQuestionList.length;
            
            let msg = "Apakah Anda yakin ingin menyelesaikan ujian?";
            if (answeredCount < total) {
                msg = `PERHATIAN: Masih ada ${total - answeredCount} soal yang belum dijawab! Yakin mau selesai?`;
            }
            
            document.getElementById('modal-desc').innerText = msg;
            
            // Set suppress agar blur saat modal terbuka tidak dianggap curang
            window._suppressCheat = true;
            const modal = document.getElementById('modal-confirm');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        };

        window.closeModal = function() {
            window._suppressCheat = false;
            const modal = document.getElementById('modal-confirm');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        };

        window.finalFinish = function() {
            window._suppressCheat = false;
            const modal = document.getElementById('modal-confirm');
            modal.classList.remove('show');
            // Tunggu animasi modal selesai baru panggil finishExam
            setTimeout(() => {
                modal.classList.add('hidden');
                finishExam();
            }, 250);
        };

        window.logout = function() {
            sessionStorage.removeItem('integritest_staff_session');
            // Hapus tab tersimpan saat logout agar mulai fresh
            try { sessionStorage.removeItem('integritest_active_tab'); } catch(e) {}
            window.currentGuruData = null;
            location.reload();
        };
        // Alias — dipakai tombol "Keluar" di banner guru/pengawas
        window.logoutStaff = window.logout;

        // ══════════════════════════════════════════════════════════════
        // ★ DARK MODE — Toggle & Persist
        // ══════════════════════════════════════════════════════════════
        (function initDarkMode() {
            // Cek preferensi tersimpan, fallback ke system preference
            let savedPref;
            try { savedPref = localStorage.getItem('integritest_dark_mode'); } catch(e) {}
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = savedPref !== null ? savedPref === '1' : prefersDark;
            if (isDark) document.documentElement.classList.add('dark');
            window._darkMode = isDark;
        })();

        window.toggleDarkMode = function() {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            window._darkMode = isDark;
            try { localStorage.setItem('integritest_dark_mode', isDark ? '1' : '0'); } catch(e) {}
            _updateDarkModeBtn(isDark);
            // Re-render lucide icons karena beberapa icon baru mungkin muncul
            if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
        };

        function _updateDarkModeBtn(isDark) {
            const label  = document.getElementById('dm-label');
            const icon   = document.getElementById('dm-icon');
            if (label) label.textContent = isDark ? 'Terang' : 'Gelap';
            if (icon)  { icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon'); }
            if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
        }

        // Sinkronisasi tombol saat dashboard ditampilkan
        document.addEventListener('DOMContentLoaded', function() {
            _updateDarkModeBtn(document.documentElement.classList.contains('dark'));
        });



        // ══════════════════════════════════════════════════════════════
        // ★ SISTEM ADMIN TAMU (Guest Admin) — View Only
        // ══════════════════════════════════════════════════════════════
        const GUEST_COLL = () => collection(window.db, 'artifacts', window.appId, 'public', 'data', 'guest_admins');

        window.isGuestAdmin = () => window.currentUserRole === 'admin_guest';

        // Aktifkan mode tamu: tampilkan banner & kunci semua tombol aksi
        window._activateGuestMode = function(displayName) {
            // Banner
            const banner = document.getElementById('guest-admin-banner');
            if (banner) { banner.classList.remove('hidden'); banner.style.display = 'flex'; }
            const badge = document.getElementById('guest-admin-badge');
            if (badge) { badge.classList.remove('hidden'); badge.style.display = 'flex'; }

            // Header
            document.getElementById('dash-header-title').textContent = 'Panel Admin — Mode Tamu';
            document.getElementById('dash-header-subtitle').textContent = `View Only — Login sebagai: ${displayName}`;
            document.getElementById('dash-header-icon').className = 'bg-amber-500 p-2 rounded-lg';

            // Kunci semua tombol aksi (bukan tombol navigasi/filter/tab)
            // Dijalankan setelah DOM siap
            setTimeout(() => {
                const LOCK_PATTERNS = [
                    'Simpan','Perbarui','Tambah','Hapus','Import','Export','Buat','Reset',
                    'Aktifkan','Nonaktifkan','Mulai','Selesai','Kirim','Buka','Tutup','Salin',
                    'saveAdminCredentials','saveDiscussionSettings','toggleDiscussionManually',
                    'createGuestAdmin','deleteGuestAdmin','saveAppearanceOnly','saveExamSettings',
                    'saveKelas','deleteKelas','saveRuang','deleteRuang','importSiswa','deleteSiswa',
                    'savePaket','deletePaket','saveJadwal','deleteJadwal','kirimNotifikasi',
                    'resetDevice','confirmDQ','undoDQ'
                ];
                document.querySelectorAll('button, input[type="submit"]').forEach(btn => {
                    const txt = (btn.textContent || btn.value || btn.getAttribute('onclick') || '').trim();
                    const isNav = btn.closest('nav') || btn.id?.startsWith('tab-') || btn.id?.startsWith('mob-tab-') || btn.classList.contains('tab-btn');
                    const isLogout = btn.getAttribute('onclick')?.includes('logout');
                    const isMatch = LOCK_PATTERNS.some(p => txt.includes(p) || (btn.getAttribute('onclick') || '').includes(p));
                    if (!isNav && !isLogout && isMatch) {
                        btn.disabled = true;
                        btn.style.opacity = '0.4';
                        btn.style.cursor = 'not-allowed';
                        btn.title = '⛔ Fitur ini dikunci pada Mode Admin Tamu';
                        btn.setAttribute('data-guest-locked', '1');
                    }
                });
                // Kunci semua input/textarea agar tidak bisa diketik
                document.querySelectorAll('input:not([type="search"]):not([type="text"][id*="filter"]):not([id*="search"]), textarea, select').forEach(el => {
                    const isFilter = el.id?.includes('filter') || el.id?.includes('search') || el.id?.includes('cari');
                    if (!isFilter && !el.closest('nav')) {
                        el.setAttribute('data-orig-readonly', el.readOnly ? '1' : '0');
                        el.readOnly = true;
                        el.style.background = '#f3f4f6';
                        el.title = '⛔ Tidak bisa diedit pada Mode Admin Tamu';
                    }
                });
                if (typeof lucide !== 'undefined') window._createIconsSafe();
            }, 800);
        };

        // Buat akun admin tamu baru
        window.createGuestAdmin = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Perlu koneksi Firebase.'); return; }
            const u = (document.getElementById('guest-admin-user')?.value || '').trim();
            const p = (document.getElementById('guest-admin-pass')?.value || '').trim();
            const d = (document.getElementById('guest-admin-display')?.value || '').trim();
            if (!u || u.length < 3) { alert('Username minimal 3 karakter!'); return; }
            if (!p || p.length < 6) { alert('Password minimal 6 karakter!'); return; }
            // Cek konflik dengan admin utama
            try {
                const mainSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'admin_credentials'));
                let conflict = false;
                mainSnap.forEach(ds => { if ((ds.data().username||'').toLowerCase() === u.toLowerCase()) conflict = true; });
                if (conflict) { alert('❌ Username sudah dipakai oleh admin utama!'); return; }
            } catch(e) {}
            try {
                await setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'guest_admins', u.toLowerCase()), {
                    username: u, password: p, displayName: d || u,
                    createdAt: Date.now(), createdBy: window.currentUserRole
                });
                document.getElementById('guest-admin-user').value = '';
                document.getElementById('guest-admin-pass').value = '';
                document.getElementById('guest-admin-display').value = '';
                alert('✅ Akun admin tamu "' + u + '" berhasil dibuat!\n\nUsername: ' + u + '\nPassword: ' + p + '\n\nBerikan info ini ke juri.');
                window.loadGuestAdmins();
            } catch(e) { alert('Gagal membuat akun: ' + e.message); }
        };

        // Hapus akun admin tamu
        window.deleteGuestAdmin = async function(docId, uname) {
            if (!confirm('Hapus akun admin tamu "' + uname + '"?\nAkun ini tidak akan bisa login lagi.')) return;
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'guest_admins', docId));
                alert('✅ Akun tamu "' + uname + '" dihapus.');
                window.loadGuestAdmins();
            } catch(e) { alert('Gagal hapus: ' + e.message); }
        };

        // Muat daftar akun tamu ke UI
        window.loadGuestAdmins = async function() {
            const listEl = document.getElementById('guest-admin-list');
            if (!listEl) return;
            if (!window.isFirebaseReady || !window.db) {
                listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">Perlu koneksi Firebase.</p>';
                return;
            }
            listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">Memuat...</p>';
            try {
                const snap = await getDocs(GUEST_COLL());
                if (snap.empty) {
                    listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-3">Belum ada akun tamu. Buat sekarang untuk keperluan demo / juri.</p>';
                    return;
                }
                listEl.innerHTML = '';
                snap.forEach(ds => {
                    const d = ds.data();
                    const tgl = d.createdAt ? new Date(d.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '-';
                    listEl.innerHTML += `
                        <div class="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 gap-3">
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="bg-amber-200 rounded-full p-1.5 shrink-0"><i data-lucide="user" class="w-3.5 h-3.5 text-amber-700"></i></div>
                                <div class="min-w-0">
                                    <p class="font-bold text-gray-800 text-sm truncate">${d.displayName || d.username}</p>
                                    <p class="text-xs text-gray-500 font-mono">user: <b>${d.username}</b> &nbsp;|&nbsp; pass: <b>${d.password}</b></p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-[10px] text-gray-400 hidden md:block">${tgl}</span>
                                <button onclick="window.deleteGuestAdmin('${ds.id}','${d.username}')"
                                    class="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition active:scale-95">
                                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Hapus
                                </button>
                            </div>
                        </div>`;
                });
                if (typeof lucide !== 'undefined') window._createIconsSafe();
            } catch(e) {
                listEl.innerHTML = '<p class="text-xs text-red-400 text-center py-2">Gagal memuat: ' + e.message + '</p>';
            }
        };

        // ══════════════════════════════════════════════════════════════
        // ★ SISTEM GURU MAPEL — Role terbatas: hanya kelola soal paketnya
        // ══════════════════════════════════════════════════════════════
        const GURU_COLL = () => collection(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel');

        // Login guru mapel
        window.handleGuruLogin = async function(e) {
            e.preventDefault();
            if (!window.isFirebaseReady || !window.db) { alert('Koneksi Firebase belum siap.'); return; }
            const u   = document.getElementById('guru-user').value.trim();
            const p   = document.getElementById('guru-pass').value;
            const btn = e.target.querySelector('button[type="submit"]');
            if (!u || !p) { alert('Username dan password tidak boleh kosong!'); return; }
            if (btn) { btn.disabled = true; btn.textContent = 'Memeriksa...'; }
            try {
                const snap = await getDocs(GURU_COLL());
                let guruData = null;
                snap.forEach(ds => {
                    const d = ds.data();
                    if ((d.username||'').toLowerCase() === u.toLowerCase() && d.password === p) {
                        guruData = { id: ds.id, ...d };
                    }
                });
                if (!guruData) {
                    alert('❌ Username atau password salah.\n\nHubungi Admin jika belum memiliki akun.');
                    return;
                }

                // Login berhasil sebagai guru
                window.currentUserRole = 'guru';
                window.currentPengawasRuang = null;
                window.currentGuruData = {
                    id:          guruData.id,
                    username:    guruData.username,
                    displayName: guruData.displayName || guruData.username,
                    mapel:       guruData.mapel || '',
                    paketIds:    guruData.paketIds || []
                };

                // Simpan session
                sessionStorage.setItem('integritest_staff_session', JSON.stringify({
                    role:       'guru',
                    guruData:   window.currentGuruData,
                    savedAt:    Date.now()
                }));

                // Mulai listener yang diperlukan (paket & soal saja)
                if (window.listenForPaket) window.listenForPaket();

                // Masuk dashboard
                window._activateGuruMode(window.currentGuruData);

            } catch(err) {
                alert('Gagal login: ' + err.message);
            } finally {
                if (btn) { btn.disabled = false; btn.textContent = 'Masuk sebagai Guru Mapel'; }
            }
        };

        // Aktifkan UI mode guru
        window._activateGuruMode = function(guruData) {
            // Setup header
            const headerTitle    = document.getElementById('dash-header-title');
            const headerSubtitle = document.getElementById('dash-header-subtitle');
            const headerIcon     = document.getElementById('dash-header-icon');
            if (headerTitle)    headerTitle.textContent    = `Panel Guru — ${guruData.mapel || 'Mata Pelajaran'}`;
            if (headerSubtitle) headerSubtitle.textContent = `Login sebagai: ${guruData.displayName}`;
            if (headerIcon)     headerIcon.className       = 'bg-emerald-600 p-2 rounded-lg';

            // Sembunyikan semua badge pengawas/admin
            ['pengawas-room-badge','pengawas-exam-info','pengawas-token-card','admin-exam-info']
                .forEach(id => { const el = document.getElementById(id); if (el) { el.classList.add('hidden'); el.style.display=''; } });

            // Tampilkan banner info guru
            let banner = document.getElementById('guru-mode-banner');
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'guru-mode-banner';
                banner.className = 'hidden';
                const db = document.getElementById('section-dashboard');
                if (db) db.prepend(banner);
            }
            banner.className = 'flex items-center gap-3 bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold';
            banner.innerHTML = `
                <i data-lucide="book-open" class="w-4 h-4 shrink-0"></i>
                <span>Mode Guru Mapel — <strong>${guruData.displayName}</strong> &nbsp;·&nbsp; ${guruData.mapel || 'Mapel'} &nbsp;·&nbsp; Akses terbatas: hanya kelola soal paket yang di-assign</span>
                <button onclick="window.logoutStaff()" class="ml-auto flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition">
                    <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Keluar
                </button>`;

            // Sembunyikan semua admin-only-tab, tampilkan HANYA tab Soal
            document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.add('hidden'));

            // Cari tombol tab Soal dan tampilkan saja
            const tabSoal    = document.getElementById('tab-dash-soal');
            const mobTabSoal = document.getElementById('mob-tab-soal');
            if (tabSoal)    tabSoal.classList.remove('hidden');
            if (mobTabSoal) mobTabSoal.classList.remove('hidden');

            // Sembunyikan bottom nav kecuali tombol soal
            const mobileNav = document.getElementById('mobile-bottom-nav');
            if (mobileNav) {
                mobileNav.querySelectorAll('button').forEach(b => {
                    const isLogout = (b.getAttribute('onclick')||'').includes('logout');
                    const isSoal   = b.id === 'mob-tab-soal';
                    if (!isSoal && !isLogout) b.style.display = 'none';
                });
            }

            // Masuk dashboard & langsung ke tab Soal
            document.getElementById('section-login').classList.add('hidden-section');
            document.getElementById('section-dashboard').classList.remove('hidden-section');

            if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
            setTimeout(() => { window.switchDashTab('soal'); }, 100);
        };

        // Render paket cards yang sudah difilter untuk guru
        window._applyGuruPaketFilter = function() {
            if (!window.currentGuruData) return; // bukan guru, skip
            const allowed = window.currentGuruData.paketIds || [];
            // Sembunyikan tombol buat paket baru & import soal dari template
            ['btn-tambah-paket','btn-download-template-excel','btn-download-template-word']
                .forEach(id => { const el = document.getElementById(id); if (el) el.style.display='none'; });
            // Filter card paket yang tampil
            document.querySelectorAll('#paket-grid-container > div').forEach(card => {
                const pid = card.dataset.paketId;
                if (pid && !allowed.includes(pid)) card.style.display = 'none';
            });
        };

        // Buat akun guru baru (dipanggil admin)
        window.createGuruMapel = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Perlu koneksi Firebase.'); return; }
            const u        = (document.getElementById('guru-mapel-user')?.value    || '').trim();
            const p        = (document.getElementById('guru-mapel-pass')?.value    || '').trim();
            const disp     = (document.getElementById('guru-mapel-display')?.value || '').trim();
            const mapel    = (document.getElementById('guru-mapel-mapel')?.value   || '').trim();
            const checks   = document.querySelectorAll('#guru-mapel-paket-checks input[type=checkbox]:checked');
            const paketIds = Array.from(checks).map(c => c.value);

            if (!u || u.length < 3)  { alert('Username minimal 3 karakter!'); return; }
            if (!p || p.length < 6)  { alert('Password minimal 6 karakter!'); return; }
            if (!mapel)              { alert('Mata pelajaran harus diisi!'); return; }
            if (paketIds.length===0) { alert('Centang minimal 1 paket soal yang diizinkan!'); return; }

            // Cek konflik username
            try {
                const existing = await getDocs(GURU_COLL());
                let conflict = false;
                existing.forEach(ds => { if ((ds.data().username||'').toLowerCase() === u.toLowerCase()) conflict = true; });
                if (conflict) { alert('❌ Username sudah dipakai oleh guru lain!'); return; }
            } catch(e) {}

            try {
                await setDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel', u.toLowerCase()), {
                    username: u, password: p,
                    displayName: disp || u,
                    mapel, paketIds,
                    createdAt: Date.now(), createdBy: window.currentUserRole
                });
                ['guru-mapel-user','guru-mapel-pass','guru-mapel-display','guru-mapel-mapel'].forEach(id => {
                    const el = document.getElementById(id); if (el) el.value = '';
                });
                document.querySelectorAll('#guru-mapel-paket-checks input[type=checkbox]').forEach(c => c.checked = false);
                alert(`✅ Akun guru "${disp||u}" berhasil dibuat!\n\nUsername: ${u}\nPassword: ${p}\nMapel: ${mapel}\nPaket: ${paketIds.length} paket`);
                window.loadGuruMapelList();
                if (window.loadGuruMapelList2) setTimeout(() => window.loadGuruMapelList2(), 400);
            } catch(e) { alert('Gagal membuat akun guru: ' + e.message); }
        };

        // Hapus akun guru
        window.deleteGuruMapel = async function(docId, uname) {
            if (!confirm(`Hapus akun guru "${uname}"?\nGuru ini tidak akan bisa login lagi.`)) return;
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel', docId));
                alert(`✅ Akun guru "${uname}" dihapus.`);
                window.loadGuruMapelList();
                if (window.loadGuruMapelList2) setTimeout(() => window.loadGuruMapelList2(), 400);
            } catch(e) { alert('Gagal hapus: ' + e.message); }
        };

        // Muat daftar akun guru ke UI
        window.loadGuruMapelList = async function() {
            const listEl = document.getElementById('guru-mapel-list');
            if (!listEl) return;
            if (!window.isFirebaseReady || !window.db) {
                listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">Perlu koneksi Firebase.</p>';
                return;
            }
            listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">Memuat...</p>';
            try {
                const snap = await getDocs(GURU_COLL());
                if (snap.empty) {
                    listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-3">Belum ada akun guru. Buat akun di atas.</p>';
                    return;
                }
                listEl.innerHTML = '';
                snap.forEach(ds => {
                    const d   = ds.data();
                    const tgl = d.createdAt ? new Date(d.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '-';
                    const paketNames = (d.paketIds || []).map(pid => {
                        const pk = (window.allPaketDB || []).find(p => p.id === pid);
                        return pk ? `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">${pk.nama}</span>` : '';
                    }).filter(Boolean).join(' ');
                    listEl.innerHTML += `
                        <div class="flex items-start justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 gap-3">
                            <div class="flex items-start gap-3 min-w-0">
                                <div class="bg-emerald-200 rounded-full p-1.5 shrink-0 mt-0.5"><i data-lucide="book-open" class="w-3.5 h-3.5 text-emerald-700"></i></div>
                                <div class="min-w-0">
                                    <p class="font-bold text-gray-800 text-sm">${_e(d.displayName || d.username)}</p>
                                    <p class="text-xs text-gray-500 font-mono mb-1">user: <b>${_e(d.username)}</b> &nbsp;|&nbsp; pass: <b>${_e(d.password)}</b> &nbsp;|&nbsp; ${_e(d.mapel||'')}</p>
                                    <div class="flex flex-wrap gap-1">${paketNames || '<span class="text-[10px] text-gray-400">Belum ada paket</span>'}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-[10px] text-gray-400 hidden md:block">${tgl}</span>
                                <button onclick="window.deleteGuruMapel('${ds.id}','${_e(d.username)}')"
                                    class="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition active:scale-95">
                                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Hapus
                                </button>
                            </div>
                        </div>`;
                });
                if (typeof lucide !== 'undefined') window._createIconsSafe();
            } catch(e) {
                listEl.innerHTML = `<p class="text-xs text-red-400 text-center py-2">Gagal memuat: ${e.message}</p>`;
            }
        };

        // Populate checkbox paket di form buat guru
        window.refreshGuruPaketChecks = function() {
            const container = document.getElementById('guru-mapel-paket-checks');
            if (!container) return;
            const pakets = window.allPaketDB || [];
            if (pakets.length === 0) {
                container.innerHTML = '<p class="text-xs text-gray-400">Belum ada paket soal. Buat paket dulu.</p>';
                return;
            }
            container.innerHTML = pakets.map(p => `
                <label class="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-400 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-medium text-gray-700 transition">
                    <input type="checkbox" value="${p.id}" class="accent-emerald-600">
                    ${_e(p.nama)} <span class="text-gray-400 font-normal">${p.mapel ? '· ' + p.mapel : ''}</span>
                </label>`).join('');
        };

        // ─── Panel Akun Guru: refresh daftar paket di form panel baru ───
        window.refreshGuruPaketChecks2 = function() {
            const container = document.getElementById('guru-mapel-paket-checks2');
            if (!container) return;
            const pakets = window.allPaketDB || [];
            if (pakets.length === 0) {
                container.innerHTML = '<p class="text-xs text-gray-400 italic self-center">⚠️ Belum ada paket soal. Buat paket dulu di <strong>Tab Soal → + Paket Baru</strong>, lalu kembali ke sini.</p>';
                return;
            }
            container.innerHTML = pakets.map(p => `
                <label class="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-400 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-medium text-gray-700 transition has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                    <input type="checkbox" value="${_e(p.id)}" class="accent-emerald-600">
                    <span class="font-semibold">${_e(p.nama)}</span>
                    ${p.mapel ? `<span class="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold">${_e(p.mapel)}</span>` : ''}
                </label>`).join('');
        };

        // ─── Panel Akun Guru: muat daftar guru ke panel baru (mandiri, fitur lengkap) ───
        window.loadGuruMapelList2 = async function() {
            const listEl = document.getElementById('guru-mapel-list2');
            if (!listEl) return;
            if (!window.isFirebaseReady || !window.db) {
                listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2">Perlu koneksi Firebase.</p>';
                return;
            }
            listEl.innerHTML = '<p class="text-xs text-gray-400 text-center py-2 animate-pulse">⏳ Memuat daftar akun guru...</p>';
            try {
                const { getDocs: _gd, collection: _col, doc: _doc, setDoc: _sd, deleteDoc: _dd } =
                    await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
                const snap = await _gd(_col(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel'));
                if (snap.empty) {
                    listEl.innerHTML = '<div class="text-center py-6"><div class="text-3xl mb-2">👨‍🏫</div><p class="text-sm text-gray-400 font-medium">Belum ada akun guru.</p><p class="text-xs text-gray-400 mt-1">Isi form di atas untuk membuat akun guru pertama.</p></div>';
                    return;
                }
                listEl.innerHTML = '';
                snap.forEach(ds => {
                    const d   = ds.data();
                    const tgl = d.createdAt ? new Date(d.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : '-';
                    const paketNames = (d.paketIds || []).map(pid => {
                        const pk = (window.allPaketDB || []).find(p => p.id === pid);
                        return pk ? `<span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">${_e(pk.nama)}${pk.mapel ? ' <span class="text-emerald-500 font-normal">· '+_e(pk.mapel)+'</span>' : ''}</span>` : '';
                    }).filter(Boolean).join(' ');

                    const card = document.createElement('div');
                    card.className = 'bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm';
                    card.innerHTML = `
                        <!-- Header kartu guru -->
                        <div class="flex items-center justify-between px-4 py-3 bg-emerald-50 border-b border-emerald-100">
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                                    ${_e((d.displayName || d.username || '?')[0].toUpperCase())}
                                </div>
                                <div class="min-w-0">
                                    <p class="font-black text-gray-800 text-sm truncate">${_e(d.displayName || d.username)}</p>
                                    <p class="text-xs text-emerald-600 font-semibold">${_e(d.mapel || 'Mapel belum diisi')}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-[10px] text-gray-400 hidden md:block">Dibuat: ${tgl}</span>
                                <button onclick="window._editGuruPaket2('${_e(ds.id)}','${_e(d.username)}')"
                                    class="flex items-center gap-1 px-2.5 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-bold transition active:scale-95">
                                    <i data-lucide="pencil" class="w-3 h-3"></i> Edit Paket
                                </button>
                                <button onclick="window.deleteGuruMapel('${_e(ds.id)}','${_e(d.username)}')"
                                    class="flex items-center gap-1 px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition active:scale-95">
                                    <i data-lucide="trash-2" class="w-3 h-3"></i> Hapus
                                </button>
                            </div>
                        </div>
                        <!-- Body kartu guru -->
                        <div class="px-4 py-3 space-y-2">
                            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                                <span class="flex items-center gap-1 text-gray-600"><i data-lucide="at-sign" class="w-3 h-3 text-gray-400"></i> <strong>Username:</strong> <code class="bg-gray-100 px-1.5 rounded font-mono text-gray-800">${_e(d.username)}</code></span>
                                <span class="flex items-center gap-1 text-gray-600"><i data-lucide="key" class="w-3 h-3 text-gray-400"></i> <strong>Password:</strong> <code class="bg-gray-100 px-1.5 rounded font-mono text-gray-800">${_e(d.password)}</code></span>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Paket yang Diizinkan (${(d.paketIds||[]).length} paket)</p>
                                <div class="flex flex-wrap gap-1.5" id="paket-tags-${_e(ds.id)}">
                                    ${paketNames || '<span class="text-[11px] text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">⚠️ Belum ada paket yang di-assign</span>'}
                                </div>
                            </div>
                        </div>`;
                    listEl.appendChild(card);
                });
                if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
                // Juga update list asli (sinkron)
                if (window.loadGuruMapelList) window.loadGuruMapelList();
            } catch(e) {
                listEl.innerHTML = `<p class="text-xs text-red-400 text-center py-2">Gagal memuat: ${e.message}</p>`;
            }
        };

        // ─── Edit paket yang di-assign ke guru (modal inline di panel Akun Guru) ───
        window._editGuruPaket2 = async function(docId, username) {
            const pakets = window.allPaketDB || [];
            if (pakets.length === 0) { alert('Belum ada paket soal. Buat paket dulu di Tab Soal.'); return; }

            // Ambil data guru saat ini
            let currentPaketIds = [];
            try {
                const { getDocs: _gd, collection: _col } =
                    await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
                const snap = await _gd(_col(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel'));
                snap.forEach(ds => { if (ds.id === docId) currentPaketIds = ds.data().paketIds || []; });
            } catch(e) {}

            // Buat modal edit paket
            let existingModal = document.getElementById('modal-edit-guru-paket');
            if (existingModal) existingModal.remove();

            const modal = document.createElement('div');
            modal.id = 'modal-edit-guru-paket';
            modal.className = 'fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between">
                        <div>
                            <h3 class="text-white font-black text-base">Edit Paket — ${_e(username)}</h3>
                            <p class="text-blue-200 text-xs mt-0.5">Centang paket yang boleh diakses guru ini</p>
                        </div>
                        <button onclick="document.getElementById('modal-edit-guru-paket').remove()" class="text-white/70 hover:text-white p-1">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-wrap gap-2 mb-5" id="edit-guru-paket-checks">
                            ${pakets.map(p => `
                                <label class="flex items-center gap-1.5 bg-gray-50 border-2 ${currentPaketIds.includes(p.id)?'border-blue-500 bg-blue-50':'border-gray-200'} hover:border-blue-400 px-3 py-2 rounded-xl cursor-pointer text-xs font-medium text-gray-700 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                    <input type="checkbox" value="${_e(p.id)}" ${currentPaketIds.includes(p.id)?'checked':''} class="accent-blue-600 w-4 h-4">
                                    <span class="font-semibold">${_e(p.nama)}</span>
                                    ${p.mapel ? `<span class="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">${_e(p.mapel)}</span>` : ''}
                                </label>`).join('')}
                        </div>
                        <div class="flex gap-3">
                            <button onclick="window._saveGuruPaketEdit('${_e(docId)}','${_e(username)}')"
                                class="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition active:scale-95">
                                <i data-lucide="save" class="w-4 h-4"></i> Simpan Perubahan
                            </button>
                            <button onclick="document.getElementById('modal-edit-guru-paket').remove()"
                                class="px-5 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
        };

        window._saveGuruPaketEdit = async function(docId, username) {
            const checks = document.querySelectorAll('#edit-guru-paket-checks input[type=checkbox]:checked');
            const newPaketIds = Array.from(checks).map(c => c.value);
            if (newPaketIds.length === 0) { alert('Centang minimal 1 paket!'); return; }
            try {
                const { doc: _doc, updateDoc: _upd } =
                    await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
                await _upd(_doc(window.db, 'artifacts', window.appId, 'public', 'data', 'guru_mapel', docId), {
                    paketIds: newPaketIds, updatedAt: Date.now()
                });
                document.getElementById('modal-edit-guru-paket')?.remove();
                alert(`✅ Paket akun guru "${username}" berhasil diperbarui!\n${newPaketIds.length} paket diizinkan.`);
                window.loadGuruMapelList2();
            } catch(e) { alert('Gagal simpan: ' + e.message); }
        };

        // ─── Panel Akun Guru: buat akun dari form panel baru ───
        window.createGuruMapelFromPanel = async function() {
            // Ambil nilai dari form panel baru (id2)
            const user    = (document.getElementById('guru-mapel-user2')?.value    || '').trim();
            const pass    = (document.getElementById('guru-mapel-pass2')?.value    || '').trim();
            const display = (document.getElementById('guru-mapel-display2')?.value || '').trim();
            const mapel   = (document.getElementById('guru-mapel-mapel2')?.value   || '').trim();
            const checks  = document.querySelectorAll('#guru-mapel-paket-checks2 input[type=checkbox]:checked');
            const paketIds = Array.from(checks).map(c => c.value);

            // Sync nilai ke form asli agar window.createGuruMapel() bisa pakai
            const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
            setVal('guru-mapel-user', user);
            setVal('guru-mapel-pass', pass);
            setVal('guru-mapel-display', display);
            setVal('guru-mapel-mapel', mapel);

            // Sync checkbox ke form asli
            const origChecks = document.querySelectorAll('#guru-mapel-paket-checks input[type=checkbox]');
            origChecks.forEach(c => { c.checked = paketIds.includes(c.value); });

            if (!window.createGuruMapel) return alert('Fungsi createGuruMapel belum siap. Coba refresh halaman.');
            await window.createGuruMapel();

            // Bersihkan form panel baru setelah berhasil
            setVal('guru-mapel-user2', '');
            setVal('guru-mapel-pass2', '');
            setVal('guru-mapel-display2', '');
            setVal('guru-mapel-mapel2', '');
            document.querySelectorAll('#guru-mapel-paket-checks2 input[type=checkbox]').forEach(c => c.checked = false);

            // Refresh daftar di panel baru
            setTimeout(() => { if (window.loadGuruMapelList2) window.loadGuruMapelList2(); }, 800);
        };


        // ★ RESTORE SESSION setelah refresh halaman
        // Membaca sessionStorage dan mengembalikan state login admin/pengawas
        // tanpa perlu login ulang, selama tab browser masih terbuka.
        window.restoreStaffSession = function() {
            const raw = sessionStorage.getItem('integritest_staff_session');
            if (!raw) return; // tidak ada sesi tersimpan, tampilkan login normal

            let session;
            try { session = JSON.parse(raw); } catch(e) { sessionStorage.removeItem('integritest_staff_session'); return; }

            // Tolak session lebih dari 12 jam (keamanan)
            if (!session.savedAt || (Date.now() - session.savedAt) > 12 * 60 * 60 * 1000) {
                sessionStorage.removeItem('integritest_staff_session');
                return;
            }

            if (session.role === 'admin') {
                // ── Restore admin session ──
                window.currentUserRole = 'admin';
                window.currentPengawasRuang = null;

                if(window.setupRealtimeListener) window.setupRealtimeListener();
                if(window.listenForKelas) window.listenForKelas();
                if(window.listenForPaket) window.listenForPaket();
                if(window.listenForRuang) window.listenForRuang();
                if(window.listenForActiveSesi) window.listenForActiveSesi();

                const adminDisplayName = session.displayName || 'Admin';
                document.getElementById('dash-header-title').textContent = 'Panel Admin / Koordinator';
                document.getElementById('dash-header-subtitle').textContent = `Akses Penuh — Login sebagai: ${adminDisplayName}`;
                document.getElementById('dash-header-icon').className = 'bg-indigo-600 p-2 rounded-lg';
                document.getElementById('pengawas-room-badge').classList.add('hidden');
                document.getElementById('pengawas-exam-info').classList.add('hidden');
                // Tampilkan info judul ujian di header admin (jika sudah diset)
                const _adminInfoWrapR = document.getElementById('admin-exam-info');
                const _savedAppRestore = window._savedAppearance || {};
                if (_adminInfoWrapR) {
                    const _ajR = document.getElementById('admin-exam-judul');
                    const _asR = document.getElementById('admin-exam-sub');
                    if (_ajR) _ajR.textContent = (_savedAppRestore.judulUjian || '').trim();
                    if (_asR) _asR.textContent = (_savedAppRestore.subJudul   || '').trim();
                    if (_savedAppRestore.judulUjian || _savedAppRestore.subJudul) { _adminInfoWrapR.classList.remove('hidden'); _adminInfoWrapR.style.display = 'flex'; }
                    else { _adminInfoWrapR.classList.add('hidden'); _adminInfoWrapR.style.display = ''; }
                }
                // Sembunyikan card token (khusus pengawas)
                const _tkCardRestore = document.getElementById('pengawas-token-card');
                if (_tkCardRestore) _tkCardRestore.classList.add('hidden');
                document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.remove('hidden'));
                const mobileNav = document.getElementById('mobile-bottom-nav');
                if (mobileNav) mobileNav.style.display = '';

                document.getElementById('section-login').classList.add('hidden-section');
                document.getElementById('section-dashboard').classList.remove('hidden-section');
                // ★ Restore ke tab terakhir aktif sebelum refresh
                const _lastTabR = (() => { try { return sessionStorage.getItem('integritest_active_tab') || 'welcome'; } catch(e) { return 'welcome'; } })();
                const _validTabs = ['welcome','nilai','kelasruang','soal','siswa','analitik','jadwal','tampilan','akun-guru','loganomal','databackup','kendala'];
                const _tabToRestoreR = _validTabs.includes(_lastTabR) ? _lastTabR : 'welcome';
                requestAnimationFrame(() => { window.switchDashTab(_tabToRestoreR); });

                const teacherInput = document.getElementById('teacher-token-input');
                if (teacherInput) teacherInput.value = window.currentExamToken;
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                setTimeout(() => {
                    if (window.renderIntegrityDashboard) window.renderIntegrityDashboard();
                }, 800);

                console.log('[Session] Admin session restored, tab:', _tabToRestoreR);

            } else if (session.role === 'admin_guest') {
                // ── Restore admin tamu session ──
                window.currentUserRole = 'admin_guest';
                window.currentPengawasRuang = null;
                const adminDisplayName = session.displayName || 'Admin Tamu';

                if(window.setupRealtimeListener) window.setupRealtimeListener();
                if(window.listenForKelas) window.listenForKelas();
                if(window.listenForPaket) window.listenForPaket();
                if(window.listenForRuang) window.listenForRuang();
                if(window.listenForActiveSesi) window.listenForActiveSesi();

                document.getElementById('pengawas-room-badge').classList.add('hidden');
                document.getElementById('pengawas-exam-info').classList.add('hidden');
                const _tkCardGuest = document.getElementById('pengawas-token-card');
                if (_tkCardGuest) _tkCardGuest.classList.add('hidden');
                document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.remove('hidden'));
                const mobileNavG = document.getElementById('mobile-bottom-nav');
                if (mobileNavG) mobileNavG.style.display = '';

                document.getElementById('section-login').classList.add('hidden-section');
                document.getElementById('section-dashboard').classList.remove('hidden-section');
                const _lastTabG = (() => { try { return sessionStorage.getItem('integritest_active_tab') || 'nilai'; } catch(e) { return 'nilai'; } })();
                const _validTabsG = ['welcome','nilai','kelasruang','soal','siswa','analitik','jadwal','tampilan','loganomal','databackup','kendala'];
                requestAnimationFrame(() => { window.switchDashTab(_validTabsG.includes(_lastTabG) ? _lastTabG : 'nilai'); });

                if (typeof lucide !== 'undefined') window._createIconsSafe();
                setTimeout(() => {
                    if (window.renderIntegrityDashboard) window.renderIntegrityDashboard();
                    window._activateGuestMode(adminDisplayName);
                }, 1000);

                console.log('[Session] Admin Tamu session restored');

            } else if (session.role === 'pengawas' && session.ruang) {
                // ── Restore pengawas session ──
                const ruang = session.ruang;

                // Verifikasi ruang masih ada di ruangList (bisa berubah kalau admin hapus)
                // Kalau ruangList belum dimuat, pakai data dari session langsung
                window.currentUserRole = 'pengawas';
                window.currentPengawasRuang = ruang;

                if(window.setupRealtimeListener) window.setupRealtimeListener();
                if(window.listenForKelas) window.listenForKelas();
                if(window.listenForPaket) window.listenForPaket();
                if(window.listenForRuang) window.listenForRuang();
                if(window.listenForActiveSesi) window.listenForActiveSesi();

                document.getElementById('dash-header-title').textContent = 'Monitoring Ruang';
                document.getElementById('dash-header-subtitle').textContent = `Pengawas ${ruang.nama}`;
                document.getElementById('dash-header-icon').className = 'bg-amber-500 p-2 rounded-lg';
                // Tampilkan info ujian di kanan header
                const _app2 = window._savedAppearance || {};
                const _judulEl2  = document.getElementById('pengawas-exam-judul');
                const _subEl2    = document.getElementById('pengawas-exam-sub');
                const _infoWrap2 = document.getElementById('pengawas-exam-info');
                if (_judulEl2)  _judulEl2.textContent  = _app2.judulUjian || '';
                if (_subEl2)    _subEl2.textContent    = _app2.subJudul   || '';
                if (_infoWrap2 && (_app2.judulUjian || _app2.subJudul)) _infoWrap2.classList.remove('hidden');
                const badge = document.getElementById('pengawas-room-badge');
                badge.classList.remove('hidden');
                badge.classList.add('flex');
                document.getElementById('pengawas-room-label').textContent = ruang.nama;

                // Tampilkan card token di dashboard pengawas (restore session)
                const tokenCardRestore = document.getElementById('pengawas-token-card');
                if (tokenCardRestore) { tokenCardRestore.classList.remove('hidden'); }
                if (window.updatePengawasTokenDisplay) window.updatePengawasTokenDisplay();

                document.querySelectorAll('.admin-only-tab').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('.admin-only-el').forEach(el => el.classList.add('hidden'));

                document.getElementById('section-login').classList.add('hidden-section');
                document.getElementById('section-dashboard').classList.remove('hidden-section');
                const _lastTabP = (() => { try { return sessionStorage.getItem('integritest_active_tab') || 'nilai'; } catch(e) { return 'nilai'; } })();
                const _validTabsP = ['nilai', 'analitik', 'kendala'];
                window.switchDashTab(_validTabsP.includes(_lastTabP) ? _lastTabP : 'nilai');

                const filterRuangEl = document.getElementById('filter-ruang');
                if (filterRuangEl) { filterRuangEl.value = ruang.nama; filterRuangEl.disabled = true; }

                // Tampilkan panduan & widget banding LANGSUNG saat restore session
                const unlockGuideR = document.getElementById('pengawas-unlock-guide');
                if (unlockGuideR) unlockGuideR.classList.remove('hidden');
                const appealWidgetR = document.getElementById('pengawas-appeal-widget');
                if (appealWidgetR) appealWidgetR.classList.remove('hidden');

                // Load data setelah Firebase siap
                setTimeout(() => {
                    if (window.loadPengawasAppealList) window.loadPengawasAppealList();
                    if (window._showPengawasKendalaWidget) window._showPengawasKendalaWidget();
                }, 1500);

                if (typeof lucide !== 'undefined') window._createIconsSafe();
                console.log('[Session] Pengawas session restored:', ruang.nama);
            } else if (session.role === 'guru' && session.guruData) {
                // ── Restore guru mapel session ──
                window.currentUserRole    = 'guru';
                window.currentPengawasRuang = null;
                window.currentGuruData    = session.guruData;
                if (window.listenForPaket) window.listenForPaket();
                // Aktifkan UI mode guru setelah DOM siap
                setTimeout(() => {
                    if (window._activateGuruMode) window._activateGuruMode(session.guruData);
                }, 200);
                console.log('[Session] Guru session restored:', session.guruData.displayName);
            }
        };
        
        // ====================================================
        // PAGINATION ENGINE — shared across all sections
        // ====================================================
        window._pg = {
            monitoring: { page: 1, perPage: 10 },
            paket:      { page: 1, perPage: 9  },
            soal:       { page: 1, perPage: 10 },
            kelas:      { page: 1, perPage: 10 },
            ruang:      { page: 1, perPage: 10 },
            analitik:   { page: 1, perPage: 10 },
            siswa:      { page: 1, perPage: 10 },
            kartu:      { page: 1, perPage: 10 },
            jadwal:     { page: 1, perPage: 10 },
        };

        // Render a pager control into a wrapper element
        function renderPagerHTML(section, total, page, perPage) {
            // Handle perPage = 0 / 'all'
            const showAll    = perPage === 0 || perPage === 'all';
            const perPageNum = showAll ? total : Number(perPage);
            const totalPages = showAll ? 1 : Math.max(1, Math.ceil(total / perPageNum));
            page = Math.max(1, Math.min(page, totalPages));
            if (total === 0) return '';

            const start = showAll ? 1 : (page - 1) * perPageNum + 1;
            const end   = showAll ? total : Math.min(page * perPageNum, total);

            const mkBtn = (label, p, disabled, active) =>
                `<button onclick="window.goPage('${section}',${p})"
                    class="min-w-[32px] h-8 px-2 text-xs font-bold rounded-lg border transition-all
                    ${active   ? 'bg-blue-600 text-white border-blue-600 shadow-sm' :
                      disabled ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-default pointer-events-none' :
                                 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:border-blue-400'}"
                    ${disabled ? 'disabled' : ''}>${label}</button>`;

            let pages = '';
            if (!showAll) {
                for (let p = 1; p <= totalPages; p++) {
                    const near = p >= page - 2 && p <= page + 2;
                    const edge = p === 1 || p === totalPages;
                    if (edge || near) {
                        pages += mkBtn(p, p, false, p === page);
                    } else if (p === page - 3 || p === page + 3) {
                        pages += `<span class="text-gray-400 text-xs px-1">…</span>`;
                    }
                }
            }

            // Per-page selector options: 10, 20, 50, 0=Semua
            const ppOptions = [10, 20, 50, 0].map(v => {
                const label    = v === 0 ? 'Semua' : v;
                const selected = (showAll && v === 0) || (!showAll && perPageNum === v) ? 'selected' : '';
                return `<option value="${v}" ${selected}>${label}</option>`;
            }).join('');

            return `<div class="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-gray-50 border-t rounded-b-xl text-sm">
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">
                        Data <span class="font-bold text-gray-700">${start}–${end}</span> dari <span class="font-bold text-gray-700">${total}</span>
                    </span>
                    <select onchange="window.goPerPage('${section}', this.value)"
                        class="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 font-semibold outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                        ${ppOptions}
                    </select>
                </div>
                <div class="flex items-center gap-1">
                    ${showAll ? '' : mkBtn('‹ Prev', page-1, page<=1, false)}
                    ${pages}
                    ${showAll ? '' : mkBtn('Next ›', page+1, page>=totalPages, false)}
                </div>
            </div>`;
        }

        // Called by pager buttons
        window.goPage = function(section, p) {
            if (!window._pg[section]) return;
            window._pg[section].page = p;
            const map = {
                monitoring: () => filterDashboardInternal(),
                paket:      () => window.renderPaketGrid(),
                soal:       () => window.filterQuestionBank(),
                kelas:      () => window.renderKelasList(),
                ruang:      () => window.renderRuangList(),
                analitik:   () => window.renderIntegrityDashboard(),
                siswa:      () => window.renderSiswaTable(),
                kartu:      () => window.renderKartuTable(),
                jadwal:     () => window.renderJadwalList(),
            };
            if (map[section]) map[section]();
        };

        // Called by per-page selector — ubah jumlah baris per halaman
        window.goPerPage = function(section, val) {
            if (!window._pg[section]) return;
            const n = parseInt(val);
            window._pg[section].perPage = isNaN(n) || n === 0 ? 0 : n;
            window._pg[section].page    = 1;
            window.goPage(section, 1);
        };

        // Helper: slice array sesuai _pg, handle perPage=0 (Semua)
        function pgSlice(arr, pg) {
            if (!pg || pg.perPage === 0) return arr;
            const perPage = pg.perPage || 15;
            const total   = arr.length;
            pg.page = Math.max(1, Math.min(pg.page, Math.ceil(total / perPage) || 1));
            const start = (pg.page - 1) * perPage;
            return arr.slice(start, start + perPage);
        }
        // ====================================================

        window.filterDashboard = function() {
            filterDashboardInternal();
        };

        window.exportToCSV = function() {
            exportToCSVInternal();
        };
        window.exportToExcel = function() {
            exportToExcelInternal();
        };

        // ── STATISTIK KELAS MODAL ──────────────────────────────
        window.showKelasStatistikModal = function() {
            const modal = document.getElementById('modal-kelas-statistik');
            if (!modal) return;
            modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') window._createIconsSafe();

            const data = (window.currentFilteredData || window._allDashboardData || [])
                .filter(r => r.status !== 'SEDANG MENGERJAKAN' && !r.status.includes('MELANJUTKAN'));

            const content = document.getElementById('kelas-statistik-content');
            if (!content) return;

            if (data.length === 0) {
                content.innerHTML = `<div class="text-center py-12 text-gray-400">
                    <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 text-gray-300"></i>
                    <p class="font-semibold">Belum ada data yang selesai ujian</p>
                    <p class="text-xs mt-1">Statistik akan muncul setelah siswa menyelesaikan ujian.</p>
                </div>`;
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // Group by kelas
            const byKelas = {};
            data.forEach(r => {
                const cls = r.className || 'Tidak Diketahui';
                if (!byKelas[cls]) byKelas[cls] = [];
                byKelas[cls].push(r);
            });

            // Hitung statistik keseluruhan
            const allScores = data.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
            const grandAvg = allScores.length ? (allScores.reduce((a,b)=>a+b,0)/allScores.length).toFixed(1) : '-';
            const grandLulus = allScores.filter(s => s >= window.currentKKM).length;
            const grandPct = allScores.length ? Math.round((grandLulus/allScores.length)*100) : 0;
            const grandDQ = data.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;

            // Build HTML
            let html = `
                <!-- Summary cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                        <div class="text-2xl font-black text-blue-700">${data.length}</div>
                        <div class="text-xs text-blue-500 font-semibold mt-1">Total Selesai</div>
                    </div>
                    <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                        <div class="text-2xl font-black text-emerald-700">${grandAvg}</div>
                        <div class="text-xs text-emerald-500 font-semibold mt-1">Rata-rata Nilai</div>
                    </div>
                    <div class="bg-violet-50 border border-violet-100 rounded-xl p-4 text-center">
                        <div class="text-2xl font-black text-violet-700">${grandPct}%</div>
                        <div class="text-xs text-violet-500 font-semibold mt-1">Tingkat Lulus</div>
                    </div>
                    <div class="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                        <div class="text-2xl font-black text-red-600">${grandDQ}</div>
                        <div class="text-xs text-red-400 font-semibold mt-1">Diskualifikasi</div>
                    </div>
                </div>

                <!-- Per kelas -->
                <h4 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <i data-lucide="layers" class="w-4 h-4 text-violet-500"></i> Detail Per Kelas
                </h4>
                <div class="space-y-3">
            `;

            Object.entries(byKelas).sort().forEach(([kelas, rows]) => {
                const scores = rows.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
                const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : '-';
                const max = scores.length ? Math.max(...scores) : '-';
                const min = scores.length ? Math.min(...scores) : '-';
                const lulus = scores.filter(s => s >= window.currentKKM).length;
                const tLulus = scores.filter(s => s < window.currentKKM).length;
                const pct = scores.length ? Math.round((lulus/scores.length)*100) : 0;
                const dq  = rows.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
                const pctColor = pct >= window.currentKKM ? 'text-emerald-600 bg-emerald-50' : pct >= 50 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
                const avgColor = parseFloat(avg) >= window.currentKKM ? 'text-emerald-700' : parseFloat(avg) >= 60 ? 'text-amber-600' : 'text-red-600';
                const barW = Math.max(4, pct);

                html += `
                <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div class="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                        <div class="flex items-center gap-2">
                            <i data-lucide="users" class="w-4 h-4 text-indigo-500"></i>
                            <span class="font-bold text-gray-800 text-sm">${kelas}</span>
                            <span class="text-xs text-gray-400 font-medium">${rows.length} peserta</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-black px-3 py-1 rounded-full ${pctColor}">${pct}% Lulus</span>
                            <button onclick="window.generateClassReport('${kelas.replace(/'/g,"\\'")}')" title="Cetak PDF Rekap ${kelas}" class="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-colors active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                PDF Rekap
                            </button>
                        </div>
                    </div>
                    <div class="px-5 py-3">
                        <!-- Progress bar lulus -->
                        <div class="flex items-center gap-2 mb-3">
                            <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div class="h-2 rounded-full ${pct>=75?'bg-emerald-500':pct>=50?'bg-amber-400':'bg-red-400'} transition-all duration-500" style="width:${barW}%"></div>
                            </div>
                            <span class="text-xs text-gray-500 font-medium w-8">${pct}%</span>
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                            <div class="bg-gray-50 rounded-lg p-2">
                                <div class="font-black ${avgColor} text-lg">${avg}</div>
                                <div class="text-gray-400 mt-0.5">Rata-rata</div>
                            </div>
                            <div class="bg-emerald-50 rounded-lg p-2">
                                <div class="font-black text-emerald-700 text-lg">${max}</div>
                                <div class="text-emerald-400 mt-0.5">Tertinggi</div>
                            </div>
                            <div class="bg-red-50 rounded-lg p-2">
                                <div class="font-black text-red-600 text-lg">${min}</div>
                                <div class="text-red-300 mt-0.5">Terendah</div>
                            </div>
                            <div class="bg-blue-50 rounded-lg p-2">
                                <div class="font-black text-blue-700 text-lg">${lulus}</div>
                                <div class="text-blue-400 mt-0.5">Lulus</div>
                            </div>
                            <div class="bg-orange-50 rounded-lg p-2">
                                <div class="font-black text-orange-600 text-lg">${tLulus}</div>
                                <div class="text-orange-400 mt-0.5">Tidak Lulus</div>
                            </div>
                            <div class="bg-red-50 rounded-lg p-2">
                                <div class="font-black text-red-700 text-lg">${dq}</div>
                                <div class="text-red-400 mt-0.5">DQ</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            html += `</div>`;
            content.innerHTML = html;
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeKelasStatistikModal = function() {
            const modal = document.getElementById('modal-kelas-statistik');
            if (modal) modal.classList.add('hidden');
        };

        // ★ UPDATE DISCUSSION STATUS AFTER EXAM (NEW) ★
        window.updateDiscussionStatus = function() {
            const btn = document.getElementById('btn-review');
            const statusDiv = document.getElementById('discussion-status');

            // Jika dinonaktifkan atau 'never' — sembunyikan tombol sepenuhnya
            if (!window.showDiscussionAfterExam || window.discussionVisibility === 'never') {
                btn.style.display = 'none';
                statusDiv.classList.add('hidden');
                return;
            }

            // Mode manual — sembunyikan tombol sambil menunggu admin buka
            if (window.discussionVisibility === 'manual') {
                if (!window.manualDiscussionOpen) {
                    btn.style.display = 'none';
                    statusDiv.classList.remove('hidden');
                    statusDiv.innerHTML = '⏳ Pembahasan belum dibuka. Tunggu pengumuman dari admin.';
                    return;
                } else {
                    btn.style.display = '';
                    btn.disabled = false;
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    statusDiv.classList.add('hidden');
                    return;
                }
            }

            // Mode 'after-exam' / 'after-deadline' — tampilkan tombol
            btn.style.display = '';
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            statusDiv.classList.add('hidden');
        };

        // ★ FITUR #10: Real-time listener discussion_settings untuk siswa di halaman hasil ★
        // Dipanggil sekali saat hasil ujian ditampilkan — unsubscribe otomatis saat keluar
        window._unsub_discussionListener = null;
        window._prevManualOpen = null; // null = belum pernah terima snapshot

        // Helper: putar nada notif via Web Audio API (tidak perlu file audio)
        window._playDiscussionSound = function(type) {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                if (type === 'open') {
                    // Nada riang naik: C5 → E5 → G5
                    [[523,0],[659,0.12],[784,0.24]].forEach(([freq, delay]) => {
                        const o2 = ctx.createOscillator();
                        const g2 = ctx.createGain();
                        o2.connect(g2); g2.connect(ctx.destination);
                        o2.frequency.value = freq;
                        o2.type = 'sine';
                        g2.gain.setValueAtTime(0, ctx.currentTime + delay);
                        g2.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.02);
                        g2.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.18);
                        o2.start(ctx.currentTime + delay);
                        o2.stop(ctx.currentTime + delay + 0.2);
                    });
                } else {
                    // Nada turun: G4 → E4
                    [[392,0],[330,0.15]].forEach(([freq, delay]) => {
                        const o2 = ctx.createOscillator();
                        const g2 = ctx.createGain();
                        o2.connect(g2); g2.connect(ctx.destination);
                        o2.frequency.value = freq;
                        o2.type = 'sine';
                        g2.gain.setValueAtTime(0, ctx.currentTime + delay);
                        g2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + delay + 0.02);
                        g2.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.15);
                        o2.start(ctx.currentTime + delay);
                        o2.stop(ctx.currentTime + delay + 0.18);
                    });
                }
            } catch(e) { /* Web Audio tidak tersedia, skip */ }
        };

        // Helper: scroll ke tombol pembahasan
        window._scrollToDiscussionBtn = function() {
            const btn = document.getElementById('btn-review');
            if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        // Helper: tampilkan notifikasi dengan progress bar countdown
        window._showDiscussionNotif = function(type) {
            const wrapper   = document.getElementById('discussion-realtime-notif');
            const openPanel = document.getElementById('disc-notif-open');
            const closePanel= document.getElementById('disc-notif-close');
            const progress  = document.getElementById('disc-notif-progress');
            if (!wrapper) return;

            // Tampilkan panel yang sesuai
            if (openPanel)  openPanel.classList.toggle('hidden', type !== 'open');
            if (closePanel) closePanel.classList.toggle('hidden', type !== 'close');
            wrapper.classList.remove('hidden');

            // Animasi masuk
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(-12px)';
            wrapper.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    wrapper.style.opacity = '1';
                    wrapper.style.transform = 'translateY(0)';
                });
            });

            // Progress bar countdown (hanya saat 'open')
            if (type === 'open' && progress) {
                progress.style.transition = 'none';
                progress.style.width = '100%';
                const DURATION = 12000; // 12 detik
                setTimeout(() => {
                    progress.style.transition = 'width ' + DURATION + 'ms linear';
                    progress.style.width = '0%';
                }, 50);
                // Auto-hide setelah countdown
                clearTimeout(window._discNotifTimer);
                window._discNotifTimer = setTimeout(() => {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(-12px)';
                    setTimeout(() => wrapper.classList.add('hidden'), 350);
                }, DURATION + 400);
            } else if (type === 'close') {
                // Notif tutup hilang lebih cepat
                clearTimeout(window._discNotifTimer);
                window._discNotifTimer = setTimeout(() => {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(-12px)';
                    setTimeout(() => wrapper.classList.add('hidden'), 350);
                }, 5000);
            }

            // Putar suara notifikasi
            window._playDiscussionSound(type);

            // Refresh lucide icons di dalam notif
            if (window._createIconsSafe) window._createIconsSafe();
        };

        window.startDiscussionListener = function() {
            // Jangan dobel-subscribe
            if (window._unsub_discussionListener) return;
            if (!window.isFirebaseReady || !window.db) return;

            try {
                window._unsub_discussionListener = onSnapshot(
                    doc(window.db, 'artifacts', window.appId, 'public', 'data', 'discussion_settings', 'global'),
                    (snap) => {
                        if (!snap.exists()) return;
                        const d = snap.data();

                        // Simpan state sebelumnya untuk deteksi transisi
                        const prevOpen = window._prevManualOpen;

                        // Update global vars
                        if ('discussionEnabled'    in d) window.showDiscussionAfterExam = d.discussionEnabled !== false;
                        if ('discussionVisibility' in d) window.discussionVisibility    = d.discussionVisibility || 'after-exam';
                        if ('manualDiscussionOpen' in d) window.manualDiscussionOpen    = d.manualDiscussionOpen === true;

                        const currOpen = window.manualDiscussionOpen;
                        const isManual = window.discussionVisibility === 'manual';

                        // Re-render tombol & status di halaman hasil
                        if (typeof window.updateDiscussionStatus === 'function') {
                            window.updateDiscussionStatus();
                        }

                        // ── Deteksi TRANSISI STATE (bukan hanya nilai saat ini) ──
                        // _prevManualOpen === null → snapshot pertama saat halaman load, jangan notif
                        if (prevOpen !== null && isManual) {
                            if (!prevOpen && currOpen) {
                                // Tutup → Buka: tampilkan notifikasi "dibuka"
                                window._showDiscussionNotif('open');
                                // Auto-scroll ke tombol pembahasan setelah animasi selesai
                                setTimeout(() => window._scrollToDiscussionBtn(), 500);
                            } else if (prevOpen && !currOpen) {
                                // Buka → Tutup: tampilkan notifikasi "ditutup"
                                window._showDiscussionNotif('close');
                            }
                        }

                        // Simpan state saat ini untuk snapshot berikutnya
                        window._prevManualOpen = currOpen;

                        console.log('[DiscussionListener] Settings diperbarui real-time:', d.discussionVisibility, '| manualOpen:', d.manualDiscussionOpen, '| transisi:', prevOpen, '→', currOpen);
                    },
                    (err) => {
                        console.warn('[DiscussionListener] Error listener:', err.message);
                    }
                );
                console.log('[DiscussionListener] Listener aktif di halaman hasil siswa.');
            } catch(e) {
                console.warn('[DiscussionListener] Gagal start:', e.message);
            }
        };

        window.stopDiscussionListener = function() {
            if (window._unsub_discussionListener) {
                window._unsub_discussionListener();
                window._unsub_discussionListener = null;
                console.log('[DiscussionListener] Listener dihentikan.');
            }
        };

        window.toggleReview = function() {
            // ★ CEK IZIN PEMBAHASAN ★
            if (!window.isDiscussionAllowed()) {
                alert('⛔ Pembahasan belum tersedia. Admin akan membuka pembahasan pada waktu yang ditentukan.');
                return;
            }

            const reviewContainer = document.getElementById('review-container');
            const btn = document.getElementById('btn-review');
            
            if(reviewContainer.classList.contains('hidden')) {
                reviewContainer.classList.remove('hidden');
                btn.innerHTML = `<i data-lucide="eye-off" class="w-5 h-5"></i> Tutup Pembahasan`;
                setTimeout(() => {
                    reviewContainer.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                reviewContainer.classList.add('hidden');
                btn.innerHTML = `<i data-lucide="book-open" class="w-5 h-5"></i> Lihat Pembahasan`;
                document.getElementById('section-result').scrollTo({ top: 0, behavior: 'smooth' });
            }
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        function renderQuestion() {
            if(!currentQuestionList || !currentQuestionList[currentQuestionIndex]) return;
            const q = currentQuestionList[currentQuestionIndex];
            const container = document.getElementById('question-area');
            const total = currentQuestionList.length;
            const labels = ['A','B','C','D','E'];
            const isMultiple = q.tipe === 'multiple';
            const isTrueFalse = q.tipe === 'truefalse';
            const isEssay = q.tipe === 'essay';
            const isMenjodohkan = q.tipe === 'menjodohkan';

            let optionsHTML = '';

            if (isMenjodohkan && Array.isArray(q.pasangan)) {
                const pairs = q.pasangan;
                const userMatch = userAnswers[q.id] || {}; // { leftIdx: rightIdx, ... }
                // Acak kolom kanan hanya sekali per soal (pakai ID soal sebagai seed)
                const rightItems = pairs.map((p, i) => ({ val: p.kanan, origIdx: i }));
                // Deterministic shuffle berdasarkan q.id
                let seed = 0; for (let c of (q.id||'')) seed = (seed*31 + c.charCodeAt(0)) & 0xffffffff;
                rightItems.sort((a,b) => {
                    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
                    return seed % 2 === 0 ? 1 : -1;
                });
                // Simpan urutan acak agar konsisten
                if (!q._shuffledRight) q._shuffledRight = rightItems;
                const shuffled = q._shuffledRight;
                optionsHTML = `
                <div class="mt-2 space-y-1">
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <div class="text-xs font-bold text-teal-700 text-center bg-teal-50 rounded-lg py-1.5 border border-teal-200">Kolom Kiri</div>
                        <div class="text-xs font-bold text-orange-600 text-center bg-orange-50 rounded-lg py-1.5 border border-orange-200">Kolom Kanan (Pilih pasangan)</div>
                    </div>
                    ${pairs.map((p, li) => {
                        const selectedRight = userMatch[li] !== undefined ? userMatch[li] : '';
                        return `<div class="grid grid-cols-2 gap-3 items-center">
                            <div class="px-4 py-3 bg-teal-50 border-2 border-teal-200 rounded-xl text-sm font-semibold text-teal-800 min-h-[48px] flex items-center">
                                <span class="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center mr-2 shrink-0">${li+1}</span>
                                ${p.kiri}
                            </div>
                            <select onchange="saveMenjodohkanAnswer('${q.id}',${li},this.value)"
                                class="w-full px-3 py-2.5 border-2 ${selectedRight !== '' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'} rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-400 transition-colors cursor-pointer">
                                <option value="">— Pilih pasangan —</option>
                                ${shuffled.map(ri => `<option value="${ri.origIdx}" ${selectedRight == ri.origIdx ? 'selected' : ''}>${ri.val}</option>`).join('')}
                            </select>
                        </div>`;
                    }).join('')}
                </div>`;
            } else if (isEssay) {
                const userText = (userAnswers[q.id] && userAnswers[q.id].text) ? userAnswers[q.id].text : '';
                optionsHTML = `
                    <div class="mt-2">
                        <label class="block text-xs font-bold text-purple-600 mb-2 flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                            Tulis Jawaban Kamu
                        </label>
                        <textarea
                            id="essay-input-${q.id}"
                            rows="6"
                            class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-sm resize-none bg-white transition-colors"
                            placeholder="Tulis jawaban uraianmu di sini..."
                            oninput="saveEssayAnswer('${q.id}', this.value)"
                        >${userText}</textarea>
                        <div class="flex items-center justify-between mt-1">
                            <p class="text-xs text-purple-500">Jawab selengkap mungkin sesuai pemahaman kamu.</p>
                            <p class="text-xs text-gray-400" id="essay-charcount-${q.id}">${userText.length} karakter</p>
                        </div>
                    </div>
                `;
            } else if (isTrueFalse) {
                // Render dua tombol besar: BENAR dan SALAH
                const userAns = userAnswers[q.id]; // true, false, or undefined
                const benarSel = userAns === true;
                const salahSel = userAns === false;

                const benarClass = benarSel
                    ? "flex-1 flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-green-500 bg-green-50 ring-2 ring-green-400 cursor-pointer transition-all"
                    : "flex-1 flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 cursor-pointer transition-all";
                const salahClass = salahSel
                    ? "flex-1 flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-red-500 bg-red-50 ring-2 ring-red-400 cursor-pointer transition-all"
                    : "flex-1 flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-gray-200 bg-white hover:bg-red-50 hover:border-red-300 cursor-pointer transition-all";

                optionsHTML = `
                    <div class="flex gap-4 mt-2">
                        <div class="${benarClass}" onclick="saveAnswer('${q.id}', true, false, false, this)">
                            <div class="w-14 h-14 rounded-full flex items-center justify-center ${benarSel ? 'bg-green-500' : 'bg-gray-100'}">
                                <svg class="w-8 h-8 ${benarSel ? 'text-white' : 'text-gray-400'}" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <span class="font-black text-xl ${benarSel ? 'text-green-700' : 'text-gray-500'}">BENAR</span>
                        </div>
                        <div class="${salahClass}" onclick="saveAnswer('${q.id}', false, false, false, this)">
                            <div class="w-14 h-14 rounded-full flex items-center justify-center ${salahSel ? 'bg-red-500' : 'bg-gray-100'}">
                                <svg class="w-8 h-8 ${salahSel ? 'text-white' : 'text-gray-400'}" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                            </div>
                            <span class="font-black text-xl ${salahSel ? 'text-red-700' : 'text-gray-500'}">SALAH</span>
                        </div>
                    </div>
                `;
            } else {
                // For multiple choice, userAnswers[q.id] is an array; for single it's an index
                q.options.forEach((opt, optIdx) => {
                    let isSelected;
                    if (isMultiple) {
                        const ans = userAnswers[q.id];
                        isSelected = Array.isArray(ans) && ans.includes(optIdx);
                    } else {
                        isSelected = userAnswers[q.id] === optIdx;
                    }

                    const activeClass = isSelected
                        ? (isMultiple ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400" : "border-blue-500 bg-blue-50 ring-2 ring-blue-400")
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300";

                    const indicatorClass = isSelected
                        ? (isMultiple
                            ? "w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow"
                            : "w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow")
                        : (isMultiple
                            ? "w-7 h-7 rounded-lg border-2 border-gray-300 flex items-center justify-center shrink-0 text-gray-400 font-bold text-sm"
                            : "w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 text-gray-400 font-bold text-sm");

                    const checkIcon = isSelected && isMultiple ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>` : labels[optIdx];

                    const optImg = (q.optionImages && q.optionImages[optIdx]) ? q.optionImages[optIdx] : '';
                    const imgHtml = optImg
                        ? `<img src="${optImg}" alt="Gambar pilihan ${labels[optIdx]}" class="mt-2 max-h-28 rounded-lg border object-contain bg-white w-full" onerror="this.style.display='none'">`
                        : '';

                    const innerLayout = optImg
                        ? `<div class="flex flex-col w-full">
                                <div class="flex items-center gap-3">
                                    <div class="${indicatorClass}">${checkIcon}</div>
                                    ${opt ? `<span class="text-gray-700 text-sm md:text-base font-medium">${opt}</span>` : ''}
                                </div>
                                ${imgHtml}
                           </div>`
                        : `<div class="${indicatorClass}">${checkIcon}</div>
                           <span class="text-gray-700 text-base md:text-lg ml-3">${opt}</span>`;

                    optionsHTML += `
                        <label class="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${activeClass}" onclick="saveAnswer('${q.id}', ${optIdx}, ${isMultiple}, false, this)">
                            ${innerLayout}
                        </label>
                    `;
                });
            }

            // Badge tipe soal
            const tipeBadge = isEssay
                ? `<span class="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold ml-2"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg> Esai</span>`
                : isTrueFalse
                    ? `<span class="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold ml-2"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> Benar / Salah</span>`
                    : isMenjodohkan
                        ? `<span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-2.5 py-1 rounded-lg text-xs font-bold ml-2"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 3v18M18 3v18M6 12h12"/></svg> Menjodohkan</span>`
                        : isMultiple
                            ? `<span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold ml-2"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Jawaban Ganda</span>`
                            : '';

            // Gambar soal
            const qImgHtml = q.image
                ? `<div class="my-4 flex justify-center">
                       <img src="${q.image}" alt="Gambar soal" class="max-h-64 rounded-xl border border-gray-200 shadow-sm object-contain bg-white cursor-zoom-in" onclick="window.openImgZoom(this.src)" onerror="this.parentElement.remove()">
                       <p class="text-xs text-gray-400 text-center mt-1">Klik gambar untuk perbesar</p>
                   </div>`
                : '';

            const questionText = q.text
                ? `<p class="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">${_e(q.text)}</p>`
                : '';

            const hintBox = isMultiple
                ? `<div class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-3">
                        <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p class="text-xs text-emerald-700 font-semibold">Pilih semua jawaban yang benar (bisa lebih dari satu)</p>
                   </div>`
                : isTrueFalse
                    ? `<div class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-3">
                            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <p class="text-xs text-amber-700 font-semibold">Apakah pernyataan di atas BENAR atau SALAH?</p>
                       </div>`
                    : isEssay
                        ? `<div class="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2 mb-3">
                                <svg class="w-4 h-4 text-purple-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <p class="text-xs text-purple-700 font-semibold">Soal uraian — tulis jawaban selengkap mungkin. ${(q.essayKoreksiMode||'ai')==='ai' ? '⚡ Nilai akan muncul otomatis setelah submit.' : '⏳ Nilai akan diisi guru setelah ujian.'}</p>
                           </div>`
                        : isMenjodohkan
                            ? `<div class="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2 mb-3">
                                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    <p class="text-xs text-teal-700 font-semibold">Pasangkan setiap item di kolom kiri dengan jawaban yang tepat di kolom kanan.</p>
                               </div>`
                            : '';

            const html = `
                <div class="bg-white rounded-xl shadow-sm border p-6 md:p-8 animate-fade-in">
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-start border-b pb-4 mb-2">
                            <div class="flex items-center flex-wrap gap-1">
                                <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded text-sm font-bold">Soal No. ${currentQuestionIndex + 1}</span>
                                ${tipeBadge}
                            </div>
                            <span class="text-xs text-gray-400">Dari ${total} soal</span>
                        </div>
                        ${questionText}
                        ${qImgHtml}
                        ${hintBox}
                        <div class="space-y-1 option-group" id="opts-${q.id}">
                            ${optionsHTML}
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = html;
            updateNavButtons();
            renderSidebarButtons();
        }

        // Zoom gambar soal
        window.openImgZoom = function(src) {
            let overlay = document.getElementById('img-zoom-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'img-zoom-overlay';
                overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out';
                overlay.onclick = () => overlay.remove();
                overlay.innerHTML = `<img src="" class="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl object-contain" id="img-zoom-img">`;
                document.body.appendChild(overlay);
            }
            document.getElementById('img-zoom-img').src = src;
            overlay.classList.remove('hidden');
        };

        function updateNavButtons() {
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            const btnFinish = document.getElementById('btn-finish-main');

            if(btnPrev) btnPrev.disabled = currentQuestionIndex === 0;
            
            if (currentQuestionIndex === currentQuestionList.length - 1) {
                if(btnNext) btnNext.classList.add('hidden');
                if(btnFinish) btnFinish.classList.remove('hidden');
            } else {
                if(btnNext) btnNext.classList.remove('hidden');
                if(btnFinish) btnFinish.classList.add('hidden');
            }
        }

        function jumpToQuestion(idx) {
            currentQuestionIndex = idx;
            renderQuestion();
            if (window.innerWidth < 768) {
                window.toggleSidebar();
            }
        }

        window.saveEssayAnswer = function(qId, text) {
            if (!userAnswers[qId]) userAnswers[qId] = {};
            userAnswers[qId].text = text;
            const cc = document.getElementById('essay-charcount-' + qId);
            if (cc) cc.textContent = text.length + ' karakter';
            renderSidebarButtons();
        };

        window.saveMenjodohkanAnswer = function(qId, leftIdx, rightVal) {
            if (!userAnswers[qId] || typeof userAnswers[qId] !== 'object' || Array.isArray(userAnswers[qId])) {
                userAnswers[qId] = {};
            }
            if (rightVal === '') {
                delete userAnswers[qId][leftIdx];
            } else {
                userAnswers[qId][leftIdx] = parseInt(rightVal);
            }
            renderSidebarButtons();
        };

        window.saveAnswer = function(qId, optIdx, isMultiple, isTrueFalse, element) {
            if (isTrueFalse !== undefined && isTrueFalse === false && typeof optIdx === 'boolean') {
                // truefalse: optIdx is actually the boolean value (true/false)
                userAnswers[qId] = optIdx;
            } else if (isMultiple) {
                // Toggle: add or remove from array
                if (!Array.isArray(userAnswers[qId])) userAnswers[qId] = [];
                const arr = userAnswers[qId];
                const pos = arr.indexOf(optIdx);
                if (pos === -1) arr.push(optIdx);
                else arr.splice(pos, 1);
                // If empty array, remove key so sidebar shows unanswered
                if (arr.length === 0) delete userAnswers[qId];
                else userAnswers[qId] = arr;
            } else {
                userAnswers[qId] = optIdx;
            }
            renderQuestion();
        };

        function renderSidebarButtons() {
            const grid = document.getElementById('question-grid');
            if(!grid) return;
            grid.innerHTML = '';
            
            currentQuestionList.forEach((q, idx) => {
                const ans = userAnswers[q.id];
                const isEssayQ = q.tipe === 'essay';
                const isMenjodohkanQ = q.tipe === 'menjodohkan';
                const isAnswered = isEssayQ
                    ? (ans && ans.text && ans.text.trim().length > 0)
                    : isMenjodohkanQ
                        ? (ans && typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length === (q.pasangan||[]).length)
                        : ans !== undefined && !(Array.isArray(ans) && ans.length === 0);
                const isActive = idx === currentQuestionIndex;
                
                let btnClass = "h-10 w-full rounded font-bold text-sm flex items-center justify-center transition-colors ";
                
                if (isActive) {
                    btnClass += "border-2 border-blue-600 bg-white text-blue-600";
                } else if (isAnswered) {
                    btnClass += "bg-green-500 text-white hover:bg-green-600";
                } else {
                    btnClass += "bg-slate-200 text-slate-600 hover:bg-slate-300";
                }

                const btn = document.createElement('button');
                btn.className = btnClass;
                btn.innerText = idx + 1;
                btn.onclick = () => jumpToQuestion(idx);
                grid.appendChild(btn);
            });
        }

        function startExamLogic() {
            timeLeft = (window.currentExamDuration || 60) * 60;
            
            // ── Polling counter untuk cek sinyal paksa-selesai dari admin (setiap 30 detik) ──
            let _pollTick = 0;
            examTimer = setInterval(() => {
                timeLeft--;
                const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                const s = (timeLeft % 60).toString().padStart(2, '0');
                const timerDisplay = document.getElementById('timer-display');
                if(timerDisplay) timerDisplay.innerText = `${m}:${s}`;
                
                if (timeLeft < 300) { 
                    const timerBox = document.getElementById('timer-box');
                    if(timerBox) timerBox.className = "flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg bg-red-100 text-red-600";
                }

                if (timeLeft <= 0) {
                    finishExam();
                    return;
                }

                // ── Cek sinyal paksa-selesai dari admin setiap 30 detik ──
                _pollTick++;
                if (_pollTick % 30 === 0 && window.isFirebaseReady && window.db && window.currentExamDocId && !window._examFinished) {
                    try {
                        window.getDocs(window.query(
                            window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                        )).then(snap => {
                            snap.forEach(ds => {
                                if (ds.id === window.currentExamDocId && ds.data().forceFinishSignal === true && !window._examFinished) {
                                    console.log('[IntegriTest] Sinyal paksa-selesai diterima dari admin — menyelesaikan ujian otomatis...');
                                    finishExam(false); // false = hitung nilai normal dari jawaban siswa
                                }
                            });
                        }).catch(() => {});
                    } catch(e) {}

                    // ★ HEARTBEAT: Tandai browser siswa masih terbuka + simpan sisa waktu
                    // Auto-finish checker memakai data ini untuk tahu siswa masih aktif atau sudah tutup browser.
                    if (window.currentExamDocId) {
                        try {
                            updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', window.currentExamDocId), {
                                lastHeartbeat: Date.now(),
                                timeLeftSeconds: timeLeft
                            }).catch(() => {});
                        } catch(e) {}
                    }
                }
            }, 1000);

            // --- LISTENERS ---
            document.addEventListener("visibilitychange", handleVisibility);
            window.addEventListener("blur", handleBlur); 
            
            // --- NEW: TOLERANSI ROTASI LAYAR ---
            // Saat HP diputar (resize), matikan deteksi blur sebentar
            window.addEventListener("resize", handleResizeToleransi);

            // --- LAYER 6: DETEKSI DIAM TERLALU LAMA ---
            // Reset timer setiap kali ada aktivitas pengguna
            function _resetIdleTimer() { _lastActivityTime = Date.now(); }
            ['mousemove','mousedown','keydown','touchstart','touchmove','click','scroll'].forEach(function(evt) {
                document.addEventListener(evt, _resetIdleTimer, { passive: true });
            });
            window._idleActivityReset = _resetIdleTimer; // simpan referensi untuk cleanup

            _idleTimer = setInterval(function() {
                if (window._examFinished) return;
                if (isWarningActive) return;
                if (Date.now() - _lastActivityTime >= _IDLE_THRESHOLD_MS) {
                    _lastActivityTime = Date.now(); // reset agar tidak trigger berulang
                    registerViolation("Terdeteksi tidak ada aktivitas selama lebih dari 5 menit (diam terlalu lama \u2014 indikasi baca catatan fisik).");
                }
            }, _IDLE_CHECK_INTERVAL_MS);

            // ── FULLSCREEN CHANGE: paksa kembali fullscreen jika siswa keluar (Esc) ──
            function handleFullscreenChange() {
                const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
                if (!isFs && !isWarningActive) {
                    // Tampilkan peringatan terlebih dahulu, lalu saat klik "lanjut" fullscreen diminta lagi
                    registerViolation("Anda keluar dari layar penuh (Fullscreen)!");
                }
            }
            // Simpan ke window agar bisa di-remove dari finishExam (beda scope)
            window._handleFullscreenChange = handleFullscreenChange;
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.addEventListener("msfullscreenchange", handleFullscreenChange);
            
            document.addEventListener("contextmenu", e => e.preventDefault());

            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
            window.onbeforeunload = function() {
                return "PERINGATAN: Ujian sedang berlangsung.";
            };
        }

        // --- NEW: FUNGSI HANDLER ROTASI ---
        function handleResizeToleransi() {
            isRotating = true;
            // Beri waktu 1.5 detik toleransi setelah layar diputar
            setTimeout(() => {
                isRotating = false;
            }, 1500);
        }

        function handleVisibility() {
            // Visibility change (pindah tab total/minimize) tetap dianggap curang
            // meski sedang rotasi, karena pindah tab != rotasi
            // Tapi JANGAN anggap curang jika modal submit sedang terbuka
            if (window._suppressCheat) return;
            if (document.hidden) {
                registerViolation("Anda meninggalkan tab ujian!");
            }
        }

        function handleBlur() {
            // JIKA SEDANG ROTASI (isRotating = true), JANGAN ANGGAP CURANG
            if (isRotating) return;
            // JIKA MODAL SUBMIT SEDANG TERBUKA, JANGAN ANGGAP CURANG
            if (window._suppressCheat) return;

            if (!document.hidden) {
                registerViolation("Terdeteksi interaksi di luar layar ujian (Aplikasi Mengambang/Notifikasi)!");
            }
        }
        
        // ════════════════════════════════════════════════════
        // ANTI-CHEAT ENGINE — VERSI LENGKAP
        // ════════════════════════════════════════════════════

        // ── ALARM AUDIO 3 LAPIS ──────────────────────────────
        let _audioCtx = null;
        function playAlarm() {
            // Layer 1: Audio URL eksternal
            try {
                const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                a.volume = 1.0;
                a.play().catch(() => {});
            } catch(e) {}

            // Layer 2: Web Audio API — sirine buatan sendiri (tidak bisa diblokir)
            try {
                if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const ctx = _audioCtx;
                const playTone = (freq, t0, dur) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(freq, t0);
                    osc.frequency.linearRampToValueAtTime(freq * 1.6, t0 + dur * 0.5);
                    osc.frequency.linearRampToValueAtTime(freq, t0 + dur);
                    gain.gain.setValueAtTime(0.45, t0);
                    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
                    osc.start(t0); osc.stop(t0 + dur);
                };
                const now = ctx.currentTime;
                playTone(880, now,       0.28);
                playTone(660, now + 0.30, 0.28);
                playTone(880, now + 0.60, 0.28);
                playTone(440, now + 0.90, 0.50);
            } catch(e) {}

            // Layer 3: Getaran HP Android (Vibrate API)
            try {
                if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 600]);
            } catch(e) {}
        }

        // ── FLASH LAYAR MERAH ─────────────────────────────────
        function flashScreen() {
            const flash = document.getElementById('warning-flash');
            if (!flash) return;
            let n = 0;
            const iv = setInterval(() => {
                flash.style.opacity = n % 2 === 0 ? '0.45' : '0';
                if (++n >= 8) { clearInterval(iv); flash.style.opacity = '0'; }
            }, 500);
        }

        // ── WATERMARK NAMA SISWA ──────────────────────────────
        window.renderWatermark = function(name) {
            const overlay = document.getElementById('watermark-overlay');
            const canvas  = document.getElementById('watermark-canvas');
            if (!overlay || !canvas) return;
            overlay.classList.remove('hidden');

            // HP Kentang: gunakan resolusi canvas lebih kecil (scale 0.5)
            const scale = window._perfMode ? 0.5 : 1;
            const W = Math.round(window.innerWidth  * scale);
            const H = Math.round(window.innerHeight * scale);
            canvas.width  = W;
            canvas.height = H;
            canvas.style.width  = '100%';
            canvas.style.height = '100%';

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#1e3a5f';
            ctx.font = `bold ${Math.round(18 * scale)}px Arial`;
            ctx.textAlign = 'center';
            const text = `${name} • INTEGRITEST • SMKN 1 BRONDONG`;
            ctx.save();
            ctx.translate(W / 2, H / 2);
            ctx.rotate(-28 * Math.PI / 180);
            const stepY = Math.round(200 * scale);
            const stepX = Math.round(380 * scale);
            for (let y = -H * 1.5; y < H * 1.5; y += stepY) {
                for (let x = -W * 1.5; x < W * 1.5; x += stepX) {
                    ctx.fillText(text, x, y);
                }
            }
            ctx.restore();
        };
        window.clearWatermark = function() {
            const o = document.getElementById('watermark-overlay');
            if (o) o.classList.add('hidden');
        };
        // Redraw saat resize / rotasi layar — THROTTLE 500ms untuk HP kentang
        let _wmResizeTimer = null;
        window.addEventListener('resize', () => {
            const nm = document.getElementById('header-name');
            if (!nm || !nm.innerText || nm.innerText === 'Nama Siswa') return;
            clearTimeout(_wmResizeTimer);
            _wmResizeTimer = setTimeout(() => window.renderWatermark(nm.innerText), 500);
        });

        // ── DETEKSI PRIVATE / INCOGNITO MODE ─────────────────
        async function detectPrivateMode() {
            return new Promise(resolve => {
                try {
                    const req = indexedDB.open('__priv_chk__');
                    req.onerror = () => resolve(true); // private mode = IndexedDB error
                    req.onsuccess = (e) => {
                        e.target.result.close();
                        indexedDB.deleteDatabase('__priv_chk__');
                        if (navigator.storage && navigator.storage.estimate) {
                            navigator.storage.estimate().then(est => {
                                // Private mode biasanya quota < 120 MB
                                resolve(est.quota !== undefined && est.quota < 120 * 1024 * 1024);
                            }).catch(() => resolve(false));
                        } else { resolve(false); }
                    };
                } catch(e) { resolve(false); }
            });
        }

        // ── MODAL PERINGATAN FULLSCREEN ───────────────────────
        let _warnCdInterval = null;
        window.showWarningModal = function(vNum, message, isDQ) {
            const modal = document.getElementById('modal-warning-student');
            if (!modal) return;
            const studentNm = (document.getElementById('header-name') || {}).innerText || '';
            document.getElementById('ws-name').textContent = studentNm;
            document.getElementById('ws-vcount').textContent = vNum;

            // Judul & warna badge sesuai level
            if (isDQ) {
                document.getElementById('ws-title').textContent = 'DISKUALIFIKASI!';
                document.getElementById('ws-consequence').textContent = '💀 Ujian dihentikan. Nilai dikirim dengan status DISKUALIFIKASI.';
                document.getElementById('ws-consequence').style.color = '#fca5a5';
            } else {
                document.getElementById('ws-title').textContent = 'TERDETEKSI CURANG!';
                if (vNum === 2) {
                    document.getElementById('ws-consequence').textContent = '🚨 PERINGATAN TERAKHIR! Satu lagi = DISKUALIFIKASI OTOMATIS!';
                    document.getElementById('ws-consequence').style.color = '#fbbf24';
                } else {
                    document.getElementById('ws-consequence').textContent = '⚡ Pelanggaran ke-3 = DISKUALIFIKASI OTOMATIS!';
                    document.getElementById('ws-consequence').style.color = '#fca5a5';
                }
            }

            // Pesan detail sesuai jenis pelanggaran
            const detailMap = {
                'Anda meninggalkan tab ujian!':
                    '📵 Kamu terdeteksi berpindah tab atau meminimalkan browser!\nIni melanggar aturan ujian yang berlaku.',
                'Terdeteksi interaksi di luar layar ujian (Aplikasi Mengambang/Notifikasi)!':
                    '📱 Terdeteksi ada interaksi di luar layar ujian!\nPastikan tidak ada aplikasi lain yang aktif di atas browser.'
            };
            document.getElementById('ws-detail').textContent = detailMap[message] || message;

            // Nasihat dinamis berdasarkan jumlah pelanggaran
            const nasihatList = [
                'Ini adalah peringatan pertama. Ujian yang jujur mencerminkan karakter aslimu. Kamu pasti bisa tanpa kecurangan!',
                'Sudah dua kali terdeteksi. Ingat, setiap pelanggaran tercatat permanen. Lebih baik nilai rendah dengan jujur daripada curang dan menanggung malu.',
                'Ini peringatan terakhir! Satu pelanggaran lagi dan kamu akan DIDISKUALIFIKASI. Berhentilah sekarang, mulailah dengan hati yang bersih.'
            ];
            const nasihatEl = document.getElementById('ws-nasihat');
            if (nasihatEl) nasihatEl.textContent = nasihatList[Math.min(violations - 1, 2)];

            modal.classList.remove('hidden');
            flashScreen();

            // Countdown 5 detik — tombol baru aktif setelah hitungan selesai
            let secs = 5;
            const cdEl  = document.getElementById('ws-cd');
            const cdWr  = document.getElementById('ws-cd-wrapper');
            const btn   = document.getElementById('ws-close-btn');
            cdWr.classList.remove('hidden');
            btn.disabled = true;
            btn.className = 'w-full max-w-sm py-4 rounded-2xl font-black text-lg uppercase tracking-widest bg-gray-700 text-gray-500 cursor-not-allowed transition-all duration-500';
            cdEl.textContent = secs;

            if (_warnCdInterval) clearInterval(_warnCdInterval);
            _warnCdInterval = setInterval(() => {
                secs--;
                cdEl.textContent = secs;
                if (secs <= 0) {
                    clearInterval(_warnCdInterval);
                    btn.disabled = false;
                    btn.className = 'w-full max-w-sm py-4 rounded-2xl font-black text-lg uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-xl shadow-red-500/50 active:scale-95 transition-all duration-300';
                    cdWr.classList.add('hidden');
                    
                    // AUTO TRANSITION: Jika ini DQ (violations = 3), otomatis tutup modal warning dan tampilkan modal DQ
                    if (isDQ) {
                        window._dqAutoTransitionTimer = setTimeout(() => {
                            modal.classList.add('hidden');
                            isWarningActive = false;
                            _showDQModal();
                        }, 1000); // Delay 1 detik agar user sempat lihat tombol aktif
                    }
                }
            }, 1000);
        };

        window.closeWarningModal = function() {
            const modal = document.getElementById('modal-warning-student');
            if (modal) modal.classList.add('hidden');
            document.getElementById('ws-cd-wrapper').classList.remove('hidden');
            isWarningActive = false;
            // Cancel auto-transition timer jika ada (cegah double-call _showDQModal)
            if (window._dqAutoTransitionTimer) {
                clearTimeout(window._dqAutoTransitionTimer);
                window._dqAutoTransitionTimer = null;
            }
            // Selalu paksa kembali ke fullscreen saat siswa klik lanjut
            try {
                const el = document.documentElement;
                if (el.requestFullscreen) el.requestFullscreen().catch(()=>{});
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
            } catch(e) {}
            if (violations >= 3) _showDQModal();
        };

        function _showDQModal() {
            // ★ GUARD: Pastikan DQ modal hanya ditampilkan sekali
            if (window._dqShown) return;
            window._dqShown = true;

            const modal = document.getElementById('modal-dq-final');
            if (!modal) { 
                console.error('Modal DQ tidak ditemukan, langsung ke result');
                finishExam(true); 
                return; 
            }
            
            // Tampilkan modal
            modal.classList.remove('hidden');
            
            // Set nama siswa
            const nm = (document.getElementById('header-name') || {}).innerText || '';
            const dqNameEl = document.getElementById('dq-name');
            if (dqNameEl) dqNameEl.textContent = nm;
            
            // Countdown dari 5 detik
            let secs = 5;
            const cdEl = document.getElementById('dq-cd');
            if (!cdEl) {
                console.error('Element countdown tidak ditemukan');
                finishExam(true);
                return;
            }
            
            cdEl.textContent = secs;
            console.log('Memulai countdown DQ dari', secs);
            
            const iv = setInterval(() => {
                secs--;
                console.log('Countdown DQ:', secs);
                if (cdEl) cdEl.textContent = secs;
                
                if (secs <= 0) { 
                    clearInterval(iv);
                    console.log('Countdown selesai, pindah ke result');
                    finishExam(true); 
                }
            }, 1000);
        }

        // ── REGISTER VIOLATION (engine utama) ─────────────────
        function registerViolation(message) {
            if (isWarningActive) return;
            if (violations >= 3) return;

            isWarningActive = true;
            violations++;
            playAlarm();

            // ── Klasifikasi jenis pelanggaran untuk bobot skor integritas ──
            let violationType = 'medium';
            if (/meninggalkan tab/i.test(message))                      violationType = 'high';    // -25
            else if (/incognito|private/i.test(message))                violationType = 'high';    // -25
            else if (/mengambang|notifikasi|di luar layar/i.test(message)) violationType = 'medium'; // -15
            else if (/fullscreen|layar penuh/i.test(message))           violationType = 'low';     // -10

            violationLogs.push({ time: Date.now(), message, type: violationType });

            if (window.isFirebaseReady && window.currentExamDocId && window.db) {
                const statusUpdate = violations >= 3 ? "PERLU VERIFIKASI GURU" : "SEDANG MENGERJAKAN";
                updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', window.currentExamDocId), {
                    violations, violationLogs, status: statusUpdate
                }).catch(console.error);
            }

            // Tampilkan modal fullscreen (bukan alert biasa)
            setTimeout(() => {
                window.showWarningModal(violations, message, violations >= 3);
            }, 150);
        }

        async function finishExam(forced = false) {
            // ★ GUARD: Pastikan finishExam hanya berjalan sekali
            if (window._examFinished) return;
            window._examFinished = true;

            clearInterval(examTimer);
            
            // ★ HAPUS listener fullscreenchange SEBELUM apapun agar tidak memicu registerViolation
            try {
                const fsHandler = window._handleFullscreenChange || function(){};
                document.removeEventListener("fullscreenchange", fsHandler);
                document.removeEventListener("webkitfullscreenchange", fsHandler);
                document.removeEventListener("msfullscreenchange", fsHandler);
                window._handleFullscreenChange = null;
            } catch(e) {}

            // Hapus semua listener anti-cheat lainnya
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("resize", handleResizeToleransi);
            // --- LAYER 6 CLEANUP: hentikan idle timer ---
            if (_idleTimer) { clearInterval(_idleTimer); _idleTimer = null; }
            if (window._idleActivityReset) {
                ['mousemove','mousedown','keydown','touchstart','touchmove','click','scroll'].forEach(function(evt) {
                    document.removeEventListener(evt, window._idleActivityReset);
                });
                window._idleActivityReset = null;
            }
            window.onpopstate = null;
            window.onbeforeunload = null;

            // Matikan watermark & tutup modal anti-cheat siswa
            window.clearWatermark();
            const mw = document.getElementById('modal-warning-student');
            if (mw) mw.classList.add('hidden');

            // ★ JANGAN keluar dari fullscreen — biarkan halaman hasil tetap fullscreen
            // agar tidak ada celah curang setelah ujian. Fullscreen baru keluar saat klik "Kembali ke Login".
            // Jika belum fullscreen karena alasan tertentu, paksa masuk fullscreen lagi
            try {
                const el = document.documentElement;
                const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
                if (!isFs) {
                    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
                    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                }
            } catch(e) {}

            // ── Hitung skor (safe: jaga dari array kosong) ──
            const qList = currentQuestionList || [];
            let correctCount = 0;
            let nonEssayCount = 0;
            let hasEssay = false;
            const essayAnswersMap = {}; // { qId: { text, rubrik, skorMaks } }

            for (const q of qList) {
                if (q.tipe === 'essay') {
                    hasEssay = true;
                    const userText = (userAnswers[q.id] && userAnswers[q.id].text) ? userAnswers[q.id].text.trim() : '';
                    // ★ Cek mode koreksi soal ini: 'ai' atau 'manual'
                    const koreksiMode = q.essayKoreksiMode || 'ai';
                    let skorAI = null, komentarAI = '', statusEssay = 'pending';
                    if (koreksiMode === 'ai') {
                        // ★ FITUR #3: AI scoring dengan fallback + indikator jika gagal
                        try {
                            const aiTimeout = new Promise((_, rej) => setTimeout(() => rej(new Error('AI timeout')), 8000));
                            const aiRun     = new Promise((res, rej) => {
                                try {
                                    const r = window._integritesAI(q.essayRubrik || '', userText, q.essaySkorMaks || 10);
                                    res(r);
                                } catch(e) { rej(e); }
                            });
                            const aiResult = await Promise.race([aiRun, aiTimeout]);
                            skorAI      = aiResult.skor;
                            komentarAI  = aiResult.komentar;
                            statusEssay = 'ai_done';
                        } catch(e) {
                            // Fallback: tandai sebagai 'ai_failed' → guru perlu koreksi manual
                            console.warn('[Essay AI] Gagal menilai, fallback ke pending guru:', e.message);
                            skorAI      = null;
                            komentarAI  = '⚠️ AI gagal menilai (' + e.message + '). Harap dikoreksi manual oleh guru.';
                            statusEssay = 'ai_failed';
                            hasManualEssay = true; // ★ Tandai agar muncul di antrian koreksi guru
                        }
                    }
                    essayAnswersMap[q.id] = {
                        qText: q.text || '',
                        rubrik: q.essayRubrik || '',
                        skorMaks: q.essaySkorMaks || 10,
                        jawabanSiswa: userText,
                        skorAI: skorAI,
                        skorGuru: null,
                        komentarAI: komentarAI,
                        status: statusEssay,
                        koreksiMode: koreksiMode
                    };
                    continue; // essay tidak dihitung dalam skor otomatis PG
                }
                nonEssayCount++;
                // ★ MENJODOHKAN: tiap pasangan benar = poin parsial
                if (q.tipe === 'menjodohkan' && Array.isArray(q.pasangan)) {
                    const userMatch = userAnswers[q.id] || {};
                    const totalPairs = q.pasangan.length;
                    let benarPairs = 0;
                    q.pasangan.forEach((_, idx) => {
                        if (userMatch[idx] === idx) benarPairs++;
                    });
                    // Hitung sebagai pecahan dari 1 soal penuh
                    correctCount += totalPairs > 0 ? benarPairs / totalPairs : 0;
                    continue;
                }
                if (typeof q.correct === 'undefined') continue;
                const isMultiple = q.tipe === 'multiple';
                const isTrueFalse = q.tipe === 'truefalse';
                if (isTrueFalse) {
                    const correctBool = q.correct === true || q.correct === 'true';
                    if (userAnswers[q.id] === correctBool) correctCount++;
                } else if (isMultiple && Array.isArray(q.correct)) {
                    const userAns = Array.isArray(userAnswers[q.id]) ? [...userAnswers[q.id]].sort() : [];
                    const corrArr = [...q.correct].sort();
                    if (userAns.length === corrArr.length && userAns.every((v, i) => v === corrArr[i])) correctCount++;
                } else {
                    const correctIdx = Array.isArray(q.correct) ? q.correct[0] : q.correct;
                    if (userAnswers[q.id] === correctIdx) correctCount++;
                }
            }
            // Gunakan nilaiMaksimal dari paket (default 100 jika tidak diset)
            const _paketData = (window.allPaketDB || []).find(p => p.id === (currentStudent || {}).paketId);
            const nilaiMaksimal = (_paketData && _paketData.nilaiMaksimal && _paketData.nilaiMaksimal > 0) ? _paketData.nilaiMaksimal : 100;

            // ── ★ Hitung skor per KD untuk asesmen diagnostik ──
            const _kdMap = {};
            for (const q of qList) {
                if (!q.kdTag || q.tipe === 'essay') continue;
                const tags = q.kdTag.split(',').map(k => k.trim()).filter(Boolean);
                let isCorrectKD = false;
                if (q.tipe === 'truefalse') {
                    isCorrectKD = userAnswers[q.id] === (q.correct === true || q.correct === 'true');
                } else if (q.tipe === 'multiple' && Array.isArray(q.correct)) {
                    const ua = Array.isArray(userAnswers[q.id]) ? [...userAnswers[q.id]].sort() : [];
                    const ca = [...q.correct].sort();
                    isCorrectKD = ua.length === ca.length && ua.every((v, i) => v === ca[i]);
                } else if (q.tipe === 'menjodohkan' && Array.isArray(q.pasangan)) {
                    const userMatch = userAnswers[q.id] || {};
                    const totalP = q.pasangan.length;
                    let benarP = 0;
                    q.pasangan.forEach((_, idx) => { if (userMatch[idx] === idx) benarP++; });
                    isCorrectKD = totalP > 0 && benarP === totalP;
                } else {
                    const correctIdx = Array.isArray(q.correct) ? q.correct[0] : q.correct;
                    isCorrectKD = userAnswers[q.id] === correctIdx;
                }
                for (const tag of tags) {
                    if (!_kdMap[tag]) _kdMap[tag] = { benar: 0, total: 0 };
                    _kdMap[tag].total++;
                    if (isCorrectKD) _kdMap[tag].benar++;
                }
            }
            const kdReport = Object.entries(_kdMap).map(([kd, v]) => ({
                kd, benar: v.benar, total: v.total,
                persen: Math.round((v.benar / v.total) * 100)
            }));

            // ★ Hitung kontribusi esai mode AI langsung
            let essayAIContrib = 0;
            let hasManualEssay = false;
            if (Object.keys(essayAnswersMap).length > 0) {
                let essayAITotalSkor = 0, essayAITotalMaks = 0;
                Object.values(essayAnswersMap).forEach(e => {
                    if (e.koreksiMode === 'ai' && e.skorAI !== null) {
                        essayAITotalSkor += Number(e.skorAI) || 0;
                        essayAITotalMaks += Number(e.skorMaks) || 10;
                    } else if (e.koreksiMode === 'manual') {
                        hasManualEssay = true;
                    }
                });
                if (essayAITotalMaks > 0) {
                    const essayQCount = Object.keys(essayAnswersMap).length;
                    const aiRatio = essayAITotalSkor / essayAITotalMaks;
                    essayAIContrib = Math.round(aiRatio * nilaiMaksimal * (essayQCount / qList.length));
                }
            }

            // Skor PG + kontribusi esai AI (esai manual masih pending)
            const scoreBase = nonEssayCount > 0 ? Math.round((correctCount / qList.length) * nilaiMaksimal) : 0;
            const score = Math.min(nilaiMaksimal, scoreBase + essayAIContrib);

            const _cs = currentStudent || {};
            const resultData = {
                timestamp:    Date.now(),
                studentName:  _cs.name      || '-',
                studentNisn:  _cs.nisn      || '-',
                className:    _cs.cls       || '-',
                packetType:   _cs.pkt       || '-',
                paketId:      _cs.paketId   || '',
                paketNama:    _cs.paketNama || '',
                ruangUjian:   _cs.room      || '-',
                sesiId:       window.currentSesiId   || 'default',
                sesiName:     window.currentSesiName || '',
                score:        score,
                scoreNonEssay: score,
                status:       forced ? "PERLU VERIFIKASI GURU" : (hasManualEssay && hasEssay ? "SELESAI (Esai Pending)" : "SELESAI"),
                appealStatus: "none",
                appealNote:   "",
                guruNote:     "",
                guruReviewer: "",
                reviewedAt:   null,
                violations:   forced ? 3 : violations,
                violationLogs: violationLogs,
                hasEssay:     hasEssay,
                essayPending: hasManualEssay && hasEssay && !forced,
                essayAnswers: hasEssay ? essayAnswersMap : {},
                qCount:       qList.length,
                correctCount: correctCount,
                forceFinishSignal: false,   // clear sinyal setelah diproses oleh browser siswa
                kdReport:     kdReport      // ★ Asesmen diagnostik per KD/TP
            };

            // ── KEAMANAN: Buat integrity seal pada data hasil ujian ──
            // Hash FNV-1a dari kombinasi skor + NISN + timestamp + qCount + correctCount + violations
            // Admin dapat mendeteksi manipulasi data via verifySeal() di panel monitoring
            (function sealResultData() {
                try {
                    const payload = [
                        resultData.score,
                        resultData.studentNisn,
                        resultData.timestamp,
                        resultData.qCount,
                        resultData.correctCount,
                        resultData.violations
                    ].join('|');
                    let hash = 0x811c9dc5; // FNV-1a offset basis
                    for (let i = 0; i < payload.length; i++) {
                        hash ^= payload.charCodeAt(i);
                        hash = (hash * 0x01000193) >>> 0; // FNV prime, keep 32-bit unsigned
                    }
                    resultData._seal = hash.toString(16).toUpperCase().padStart(8, '0');
                    resultData._sealVersion = 1;
                } catch(e) {}
            })();

            if(window.saveExamResult) window.saveExamResult(resultData);
            setTimeout(() => {
                if (window._patchResultPage) window._patchResultPage(forced ? 3 : violations, forced);
            }, 300);
            if (window._integrityAutoRefresh) window._integrityAutoRefresh();

            try { localStorage.setItem('ukktkj_session_done', JSON.stringify({
                name: (currentStudent || {}).name,
                date: new Date().toISOString()
            })); } catch(e) {}

            // ★ Hapus UID siswa dari authorized_uids setelah ujian selesai
            try {
                const uid = window.currentUID || (window.auth && window.auth.currentUser && window.auth.currentUser.uid);
                if (uid && window.db) {
                    deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'authorized_uids', uid))
                        .catch(() => {});
                }
            } catch(e) {}

            // ── PINDAH HALAMAN DULU — sebelum DOM manipulation apapun ──
            const dqModal = document.getElementById('modal-dq-final');
            if (dqModal) dqModal.classList.add('hidden');
            
            const examSection = document.getElementById('section-exam');
            const resultSection = document.getElementById('section-result');
            
            examSection.classList.add('hidden-section');
            resultSection.classList.remove('hidden-section');
            
            // Pastikan halaman scroll ke atas dan fokus ke section result
            window.scrollTo(0, 0);
            resultSection.scrollIntoView({ behavior: 'instant', block: 'start' });

            // ★ FITUR #10: Aktifkan listener real-time discussion settings saat halaman hasil muncul
            if (typeof window.startDiscussionListener === 'function') {
                window.startDiscussionListener();
            }

            // ── Isi UI halaman hasil (semua null-safe) ──
            const resultIcon     = document.getElementById('result-icon-container');
            const resultTitle    = document.getElementById('result-title');
            const resultMsg      = document.getElementById('result-message');
            const scoreEl        = document.getElementById('final-score-display');
            const motivationalEl = document.getElementById('motivational-message');
            const btnReview      = document.getElementById('btn-review');

            if (scoreEl) scoreEl.innerText = hasManualEssay ? '?' : score;
            // Tampilkan detail: benar/total soal dan nilai per soal
            const detailEl = document.getElementById('final-score-detail');
            if (detailEl) {
                if (hasEssay) {
                    const essayCount = Object.keys(essayAnswersMap).length;
                    const allAI = !hasManualEssay;
                    if (allAI) {
                        detailEl.innerHTML = `Benar <strong>${correctCount}</strong> dari <strong>${nonEssayCount}</strong> soal pilihan &nbsp;·&nbsp; <span class="text-purple-600 font-bold">⚡ ${essayCount} soal esai dinilai AI otomatis</span>`;
                    } else {
                        detailEl.innerHTML = `Benar <strong>${correctCount}</strong> dari <strong>${nonEssayCount}</strong> soal pilihan &nbsp;·&nbsp; <span class="text-amber-600 font-bold">⏳ ${essayCount} soal esai menunggu koreksi guru</span>`;
                    }
                } else {
                    const nilaiPerSoal = qList.length > 0 ? (nilaiMaksimal / qList.length).toFixed(2).replace(/\.?0+$/, '') : 0;
                    detailEl.innerHTML = `Benar <strong>${correctCount}</strong> dari <strong>${qList.length}</strong> soal &nbsp;·&nbsp; Nilai maks: <strong>${nilaiMaksimal}</strong> &nbsp;·&nbsp; Per soal: <strong>${nilaiPerSoal} poin</strong>`;
                }
            }

            if (forced) {
                try { playAlarm(); } catch(e) {}
                if (resultIcon) {
                    resultIcon.className = "w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse";
                    resultIcon.innerHTML = `<i data-lucide="alert-octagon" class="w-10 h-10"></i>`;
                }
                if (resultTitle) {
                    resultTitle.innerText = "ANDA DIDISKUALIFIKASI";
                    resultTitle.className = "text-2xl font-bold text-red-600 mb-2";
                }
                if (resultMsg) {
                    resultMsg.innerText = "Setiap kecurangan akan terdeteksi. Kejujuran adalah yang terpenting.";
                    resultMsg.className = "text-red-500 mb-6 font-bold text-lg";
                }
                if (scoreEl) scoreEl.className = "text-5xl font-extrabold text-red-600";
                if (motivationalEl) {
                    motivationalEl.innerHTML = "Sistem mencatat 3x pelanggaran. Kejujuran adalah hal terpenting dalam ujian ini.";
                    motivationalEl.className = "mb-6 px-4 py-3 rounded-lg font-bold text-sm md:text-base border-l-4 bg-red-100 text-red-800 border-red-500";
                }
                if (btnReview) btnReview.style.display = 'none';

            } else {
                resultIcon.className = "w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6";
                resultIcon.innerHTML = `<i data-lucide="check-circle" class="w-10 h-10"></i>`;
                
                resultTitle.innerText = "Ujian Selesai!";
                resultTitle.className = "text-2xl font-bold text-gray-800 mb-2";
                
                resultMsg.innerText = "Jawaban telah terkirim ke server.";
                resultMsg.className = "text-gray-500 mb-6";
                
                if (score < nilaiMaksimal * 0.5) {
                    scoreEl.className = "text-5xl font-extrabold text-red-600";
                    motivationalEl.innerHTML = `📢 "Waduh, Monitor Ketua! Sinyal otak sepertinya lagi RTO nih. Jangan panik, remidi adalah jalan ninjaku! Semangat belajar lagi ya! 🚀"`;
                    motivationalEl.className = "mb-6 px-4 py-3 rounded-lg font-bold text-sm md:text-base border-l-4 bg-red-100 text-red-800 border-red-500";
                } else if (score < nilaiMaksimal * 0.8) {
                    scoreEl.className = "text-5xl font-extrabold text-yellow-600";
                    motivationalEl.innerHTML = `🔥 "Lumayan! Dikit lagi jadi sepuh TKJ. Tingkatin lagi belajarnya biar nggak cuma jadi user, tapi jadi admin masa depan!"`;
                    motivationalEl.className = "mb-6 px-4 py-3 rounded-lg font-bold text-sm md:text-base border-l-4 bg-yellow-100 text-yellow-800 border-yellow-500";
                } else {
                    scoreEl.className = "text-5xl font-extrabold text-green-600";
                    motivationalEl.innerHTML = `👑 "Menyala Abangku! 🔥 Nilai di atas rata-rata. Pertahankan prestasimu, masa depan cerah menanti! Server aman, hati tenang."`;
                    motivationalEl.className = "mb-6 px-4 py-3 rounded-lg font-bold text-sm md:text-base border-l-4 bg-green-100 text-green-800 border-green-500";
                }

                // ★ Tampilkan profil KD diagnostik untuk siswa
                const kdProfileDiv = document.getElementById('kd-profile-student');
                const kdRowsDiv    = document.getElementById('kd-profile-rows');
                if (kdProfileDiv && kdRowsDiv && kdReport && kdReport.length > 0) {
                    kdProfileDiv.classList.remove('hidden');
                    kdRowsDiv.innerHTML = kdReport
                        .sort((a, b) => a.persen - b.persen)
                        .map(r => {
                            const color = r.persen >= 75 ? '#10b981' : r.persen >= 50 ? '#f59e0b' : '#ef4444';
                            const icon  = r.persen >= 75 ? '✅' : r.persen >= 50 ? '⚠️' : '❌';
                            return `<div class="px-4 py-2.5 flex items-center gap-3">
                                <span class="text-base">${icon}</span>
                                <span class="flex-1 text-sm font-bold text-gray-700">${_e(r.kd)}</span>
                                <div class="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div class="h-full rounded-full" style="width:${r.persen}%;background:${color}"></div>
                                </div>
                                <span class="text-xs font-black w-10 text-right" style="color:${color}">${r.persen}%</span>
                            </div>`;
                        }).join('');
                    if (typeof lucide !== 'undefined') window._createIconsSafe();
                }

                const reviewListEl = document.getElementById('review-list');
                reviewListEl.innerHTML = '';
                const labels = ['A','B','C','D','E'];
                
                currentQuestionList.forEach((q, idx) => {
                    if (!q || !q.options && q.tipe !== 'truefalse') return;
                    const isMultiple = q.tipe === 'multiple';
                    const isTrueFalse = q.tipe === 'truefalse';
                    const userAnsRaw = userAnswers[q.id];
                    const isSkipped = userAnsRaw === undefined || (Array.isArray(userAnsRaw) && userAnsRaw.length === 0);

                    let isCorrect;
                    if (isTrueFalse) {
                        const correctBool = q.correct === true || q.correct === 'true';
                        isCorrect = !isSkipped && userAnsRaw === correctBool;
                    } else if (isMultiple && Array.isArray(q.correct)) {
                        const userArr = Array.isArray(userAnsRaw) ? [...userAnsRaw].sort() : [];
                        const corrArr = [...q.correct].sort();
                        isCorrect = !isSkipped && userArr.length === corrArr.length && userArr.every((v, i) => v === corrArr[i]);
                    } else {
                        const correctIdx = Array.isArray(q.correct) ? q.correct[0] : q.correct;
                        isCorrect = userAnsRaw === correctIdx;
                    }
                    
                    let statusClass = isCorrect ? "bg-green-50 border-green-200" : (isSkipped ? "bg-gray-50 border-gray-200" : "bg-red-50 border-red-200");
                    let icon = isCorrect
                        ? `<i data-lucide="check" class="text-green-600 w-5 h-5"></i>`
                        : (isSkipped ? `<i data-lucide="minus" class="text-gray-400 w-5 h-5"></i>` : `<i data-lucide="x" class="text-red-600 w-5 h-5"></i>`);

                    // User answer text
                    let userAnsText;
                    if (isSkipped) {
                        userAnsText = "<span class='text-gray-500 italic'>Tidak dijawab</span>";
                    } else if (isTrueFalse) {
                        userAnsText = userAnsRaw === true ? '✓ BENAR' : '✗ SALAH';
                    } else if (isMultiple && Array.isArray(userAnsRaw)) {
                        userAnsText = userAnsRaw.sort().map(i => `<span class="font-bold">${labels[i] || i}</span>: ${q.options[i] || ''}` ).join(', ');
                    } else {
                        userAnsText = q.options[userAnsRaw] || "Opsi Tidak Valid";
                    }

                    // Correct answer text
                    let correctAnsText;
                    if (isTrueFalse) {
                        const correctBool = q.correct === true || q.correct === 'true';
                        correctAnsText = correctBool ? '✓ BENAR' : '✗ SALAH';
                    } else if (isMultiple && Array.isArray(q.correct)) {
                        correctAnsText = q.correct.map(i => `<span class="font-bold">${labels[i] || i}</span>: ${q.options[i] || ''}`).join(', ');
                    } else {
                        const ci = Array.isArray(q.correct) ? q.correct[0] : q.correct;
                        correctAnsText = q.options[ci] || "Kunci Jawaban Tidak Valid";
                    }

                    const tipeBadge = isTrueFalse
                        ? `<span class="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold ml-1">B/S</span>`
                        : isMultiple
                            ? `<span class="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold ml-1">Ganda</span>`
                            : '';

                    const reviewItem = `
                        <div class="p-4 rounded-lg border ${statusClass}">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 min-w-[20px]">${icon}</div>
                                <div class="w-full">
                                    <p class="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                                        <span class="text-gray-500 mr-1">${idx + 1}.</span> ${_e(q.text) || '(Soal bergambar)'}${tipeBadge}
                                    </p>
                                    <div class="mt-3 text-sm space-y-1">
                                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                            <span class="font-bold text-gray-600 w-24 shrink-0">Jawabanmu:</span>
                                            <span class="${isCorrect ? 'text-green-700 font-medium' : (isSkipped ? 'text-gray-500' : 'text-red-600 font-medium')}">${userAnsText}</span>
                                        </div>
                                        ${!isCorrect ? `
                                        <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                            <span class="font-bold text-gray-600 w-24 shrink-0">Kunci:</span>
                                            <span class="text-green-700 font-bold">${correctAnsText}</span>
                                        </div>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    reviewListEl.innerHTML += reviewItem;
                });
                
                btnReview.style.display = 'flex'; 
            }
            
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        }

        // ★ FITUR #7: Quick Filter Status ★
        window._statusFilter = 'all';

        // Semua class warna yang mungkin aktif di tombol filter
        const _QF_ALL_ACTIVE_CLASSES = [
            'border-blue-500','bg-blue-500','text-white',
            'border-emerald-400','bg-emerald-50','text-emerald-700',
            'border-indigo-400','bg-indigo-50','text-indigo-700',
            'border-purple-400','bg-purple-50','text-purple-700',
            'border-red-400','bg-red-50','text-red-700',
            'border-amber-400','bg-amber-50','text-amber-700',
        ];
        const _QF_INACTIVE = ['border-gray-200','bg-white','text-gray-600'];
        const _QF_COLOR_MAP = {
            all:     ['border-blue-500','bg-blue-500','text-white'],
            ongoing: ['border-emerald-400','bg-emerald-50','text-emerald-700'],
            done:    ['border-indigo-400','bg-indigo-50','text-indigo-700'],
            pending: ['border-purple-400','bg-purple-50','text-purple-700'],
            dq:      ['border-red-400','bg-red-50','text-red-700'],
            verify:  ['border-amber-400','bg-amber-50','text-amber-700'],
        };

        window.setStatusFilter = function(val) {
            window._statusFilter = val;
            // Reset semua tombol ke non-aktif
            document.querySelectorAll('.qf-btn').forEach(btn => {
                btn.classList.remove(..._QF_ALL_ACTIVE_CLASSES);
                btn.classList.add(..._QF_INACTIVE);
            });
            // Aktifkan tombol yang dipilih
            const activeBtn = document.getElementById('qf-' + val);
            if (activeBtn && _QF_COLOR_MAP[val]) {
                activeBtn.classList.remove(..._QF_INACTIVE);
                activeBtn.classList.add(..._QF_COLOR_MAP[val]);
            }
            if (window._pg) window._pg.monitoring.page = 1;
            filterDashboardInternal();
        };

        window.updateDashboardTable = function(data) {
            dashboardData = data;
            // Simpan semua data tanpa filter agar PDF rekap kelas selalu lengkap
            window._allDashboardData = data;
            filterDashboardInternal();
        };

        function filterDashboardInternal() {
            const filterPkt  = document.getElementById('filter-session').value;
            const filterCls  = document.getElementById('filter-class').value;
            const filterDate = document.getElementById('filter-date').value;
            const filterRuangEl = document.getElementById('filter-ruang');
            const filterSesiEl  = document.getElementById('filter-sesi');
            let filterRuang  = filterRuangEl ? filterRuangEl.value : 'all';
            let filterSesi   = filterSesiEl  ? filterSesiEl.value  : 'active';

            // Jika login sebagai pengawas, paksa filter ke ruang mereka
            if (window.currentPengawasRuang) {
                filterRuang = (window.currentPengawasRuang.nama || '').trim();
                if (filterRuangEl) {
                    filterRuangEl.value = filterRuang;
                    filterRuangEl.disabled = true;
                }
                // Pengawas juga hanya lihat sesi aktif (tidak bisa lihat history)
                filterSesi = 'active';
                if (filterSesiEl) { filterSesiEl.value = 'active'; filterSesiEl.disabled = true; }
            } else {
                if (filterRuangEl) filterRuangEl.disabled = false;
                if (filterSesiEl)  filterSesiEl.disabled  = false;
            }

            const tbody = document.getElementById('dashboard-table-body');
            tbody.innerHTML = '';

            // ── DEDUPLICATION: 1 siswa per paket per sesi = 1 entri ──
            // Key: NISN + paketId + sesiId — agar siswa beda mapel/sesi tidak saling menimpa
            const dedupMap = new Map();
            dashboardData.forEach(item => {
                const nisn   = (item.studentNisn || '').toString().trim();
                const nisnKey = (nisn && nisn !== '0' && nisn !== '-') ? `nisn_${nisn}` : `name_${(item.studentName||'').toLowerCase().trim()}__${(item.className||'').trim()}`;
                const key = `${nisnKey}__pkt_${item.paketId||''}__sesi_${item.sesiId||'default'}`;
                
                if (!dedupMap.has(key)) {
                    dedupMap.set(key, item);
                } else {
                    const existing = dedupMap.get(key);
                    const existFinished = existing.status.includes('SELESAI') || existing.status.includes('DISKUALIFIKASI');
                    const newFinished   = item.status.includes('SELESAI') || item.status.includes('DISKUALIFIKASI');
                    // Prioritas: SELESAI/DQ > SEDANG MENGERJAKAN; jika sama, ambil terbaru
                    if (!existFinished && newFinished) {
                        dedupMap.set(key, item);
                    } else if (existFinished === newFinished && item.timestamp > existing.timestamp) {
                        dedupMap.set(key, item);
                    }
                }
            });
            const dedupedData = Array.from(dedupMap.values());

            window.currentFilteredData = dedupedData.filter(item => {
                // Siswa SEDANG MENGERJAKAN / MELANJUTKAN → selalu tampil, bypass semua filter
                const isLive = item.status === 'SEDANG MENGERJAKAN' || item.status.includes('MELANJUTKAN');
                if (isLive) return true;

                // ── Filter Sesi (hanya untuk data yang sudah selesai) ──
                let matchSesi = true;
                if (filterSesi === 'active') {
                    const jadwalAktifIds = (window.allJadwalDB || [])
                        .filter(j => j.isActive === true)
                        .map(j => j.id);
                    const today = new Date().toISOString().slice(0,10);
                    const itemDate = item.timestamp ? new Date(item.timestamp).toISOString().slice(0,10) : '';
                    const isToday = itemDate === today;
                    if (jadwalAktifIds.length > 0) {
                        matchSesi = jadwalAktifIds.includes(item.sesiId) || isToday;
                    } else {
                        matchSesi = isToday || item.sesiId === (window.currentSesiId || 'default') || !item.sesiId || item.sesiId === 'default';
                    }
                } else if (filterSesi !== 'all') {
                    matchSesi = item.sesiId === filterSesi;
                }

                const matchPkt   = filterPkt === 'all' || item.packetType === filterPkt;
                const matchCls   = filterCls === 'all' || item.className === filterCls;
                const matchRuang = filterRuang === 'all' || (item.ruangUjian || '-').trim().toLowerCase() === filterRuang.trim().toLowerCase();
                let matchDate = true;
                if (filterDate && !isLive) { // tanggal tidak memblokir siswa live
                    const itemDate = new Date(item.timestamp);
                    const y = itemDate.getFullYear();
                    const m = String(itemDate.getMonth() + 1).padStart(2, '0');
                    const d = String(itemDate.getDate()).padStart(2, '0');
                    const itemDateStr = `${y}-${m}-${d}`;
                    matchDate = itemDateStr === filterDate;
                }
                // ★ FITUR #7: Filter berdasarkan status cepat
                const sf = window._statusFilter || 'all';
                let matchStatus = true;
                if (sf !== 'all') {
                    const st = (item.status || '').toUpperCase();
                    if (sf === 'ongoing') matchStatus = st === 'SEDANG MENGERJAKAN' || st.includes('MELANJUTKAN');
                    else if (sf === 'done') matchStatus = st.includes('SELESAI') && item.essayPending !== true;
                    else if (sf === 'pending') matchStatus = item.essayPending === true;
                    else if (sf === 'dq') matchStatus = st.includes('DISKUALIFIKASI');
                    else if (sf === 'verify') matchStatus = st.includes('VERIFIKASI') || st.includes('PERLU');
                }
                return matchSesi && matchPkt && matchCls && matchRuang && matchDate && matchStatus;
            });

            // ── Update Stat Cards ──
            updateStatCards(window.currentFilteredData);

            if (window.currentFilteredData.length === 0) {
                tbody.innerHTML = `<tr><td colspan="10" class="px-6 py-12 text-center text-gray-400">
                    <div class="flex flex-col items-center gap-2">
                        <i data-lucide="inbox" class="w-10 h-10 text-gray-300"></i>
                        <p class="font-semibold">Belum ada peserta</p>
                        <p class="text-xs text-gray-300">${filterSesi === 'active' ? 'Belum ada siswa login di sesi aktif ini.' : 'Tidak ada data yang cocok dengan filter.'}</p>
                    </div>
                </td></tr>`;
                const pw = document.getElementById('pager-monitoring-wrap');
                if (pw) pw.innerHTML = '';
                if(typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // ── PAGINATION ──
            const pgM = window._pg.monitoring;
            const totalM = window.currentFilteredData.length;
            const pageData = pgSlice(window.currentFilteredData, pgM);

            pageData.forEach(item => {
                const date = new Date(item.timestamp).toLocaleTimeString('id-ID');

                const isCheating = item.status.includes('DISKUALIFIKASI');
                const isDoing = item.status === 'SEDANG MENGERJAKAN' || item.status.includes('MELANJUTKAN');
                const isNeedVerif = item.status === 'PERLU VERIFIKASI GURU';

                let statusColor = isCheating ? 'text-red-600 font-extrabold flex items-center gap-1' : 'text-green-600 font-bold';
                let rowClass = isCheating ? 'bg-red-50 border-red-200' : 'hover:bg-slate-50 border-b';
                let statusIcon = isCheating ? `<i data-lucide="alert-circle" class="w-4 h-4"></i>` : '';

                if (isDoing) {
                    statusColor = 'text-blue-600 font-bold flex items-center gap-1';
                    rowClass = 'bg-blue-50/50 border-blue-100 hover:bg-blue-50 border-b animate-pulse';
                    statusIcon = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>`;
                }
                if (isNeedVerif) {
                    statusColor = 'text-indigo-600 font-bold flex items-center gap-1';
                    rowClass = 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50 border-b';
                    statusIcon = `<i data-lucide="clipboard-pen" class="w-4 h-4"></i>`;
                }

                const violationDisplay = item.violations > 0
                    ? `<button onclick="window.showViolationDetails('${item.id}')" class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 mx-auto transition-colors shadow-sm">
                         ${item.violations}x <i data-lucide="info" class="w-3 h-3"></i>
                       </button>`
                    : '-';

                const pktColor = item.packetType === 'A' ? 'bg-blue-100 text-blue-700' : item.packetType === 'B' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700';
                const ruangLabel = item.ruangUjian || '-';
                const ruangColor = ruangLabel !== '-' ? 'bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold' : 'text-gray-400 text-xs';
                const sesiInfo = filterSesi === 'all' && item.sesiName
                    ? `<div class="text-[10px] text-indigo-500 font-semibold mt-0.5">${item.sesiName}</div>` : '';

                const row = `
                    <tr class="${rowClass} transition-colors">
                        <td class="px-6 py-4">
                            <div class="font-semibold text-gray-900">${_e(item.studentName)}</div>
                            ${sesiInfo}
                        </td>
                        <td class="px-6 py-4 text-gray-500 text-sm">${_e(item.studentNisn) || '-'}</td>
                        <td class="px-6 py-4 text-gray-600 text-sm">${item.className || '-'}</td>
                        <td class="px-6 py-4"><span class="${ruangColor}">${ruangLabel}</span></td>
                        <td class="px-6 py-4"><span class="px-2 py-1 rounded text-xs font-bold ${pktColor}">${item.paketNama || ('Paket ' + item.packetType)}</span></td>
                        <td class="px-6 py-4 text-center text-lg font-bold ${typeof item.score==='number'?(item.score>=80?'text-emerald-600':item.score>=60?'text-amber-500':'text-red-500'):'text-gray-400'}">
                            <div class="inline-flex flex-col items-center gap-0.5">
                                ${item.essayPending ? `<span class="text-base">${typeof item.score==='number'?item.score:'-'}</span><span class="text-[9px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-bold leading-none">+esai⏳</span>` : (typeof item.score==='number'?item.score:'-')}
                                ${typeof window.getSealBadge === 'function' ? window.getSealBadge(item) : ''}
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="${statusColor}">${statusIcon} ${item.status}</span>
                            ${(()=>{
                                if (!isDoing || !item.lastHeartbeat) return isDoing ? '<div class="text-[10px] text-gray-400 mt-0.5">⏳ menunggu heartbeat...</div>' : '';
                                const hbAge = Math.floor((Date.now() - item.lastHeartbeat) / 1000);
                                const hbMnt = Math.floor(hbAge / 60);
                                const hbSec = hbAge % 60;
                                const stale = hbAge > 180;
                                const label = hbMnt > 0 ? hbMnt + ' mnt ' + hbSec + ' dtk lalu' : hbSec + ' dtk lalu';
                                const color = stale ? 'text-red-500' : 'text-green-600';
                                const icon  = stale ? '🔴' : '🟢';
                                return '<div class="' + color + ' text-[10px] font-semibold mt-0.5">' + icon + ' aktif ' + label + '</div>';
                            })()}
                        </td>
                        <td class="px-6 py-4 text-center text-xs font-mono font-bold" id="sisa-waktu-${item.id}">
                            ${(()=>{
                                if (!isDoing) return '<span class="text-gray-300">—</span>';
                                // Hitung sisa waktu dari startTime + durasi
                                const started = item.examStartTime || item.timestamp;
                                const durasi  = (window.currentExamDuration || 60) * 60 * 1000;
                                const deadline = started + durasi;
                                const sisa    = deadline - Date.now();
                                if (sisa <= 0) return '<span class="text-red-500">Habis</span>';
                                const mm = Math.floor(sisa / 60000);
                                const ss = Math.floor((sisa % 60000) / 1000);
                                const color = mm < 5 ? 'text-red-600' : mm < 15 ? 'text-amber-500' : 'text-emerald-600';
                                return '<span class="' + color + '">' + String(mm).padStart(2,'0') + ':' + String(ss).padStart(2,'0') + '</span>';
                            })()}
                        </td>
                        <td class="px-6 py-4 text-center">${violationDisplay}</td>
                        <td class="px-6 py-4 text-center">
                            ${(()=>{
                                const sc = typeof calcIntegrityScore === 'function' ? calcIntegrityScore(item) : null;
                                if (sc === null) return '<span class="text-gray-300 text-xs">—</span>';
                                const color = sc===100?'text-emerald-600 bg-emerald-50':sc>=70?'text-amber-600 bg-amber-50':'text-red-600 bg-red-50';
                                return `<span class="px-2 py-1 rounded font-black text-sm ${color}">${sc}</span>`;
                            })()}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <div class="flex gap-1 justify-center">
                                ${isDoing ? `<button onclick="window.forceFinishStudent('${item.id}')" class="text-orange-600 hover:bg-orange-50 px-2 py-1.5 rounded transition-colors border border-orange-200 hover:border-orange-400 text-xs font-bold" title="Paksa Selesaikan Ujian Siswa Ini"><i data-lucide="flag" class="w-4 h-4 inline"></i> Selesaikan</button>` : ''}
                                ${(!isDoing && item.status === 'PERLU VERIFIKASI GURU' && (item.score === null || item.score === undefined)) ? `<button onclick="window.isiNilaiManual('${item.id}', '${_e(item.studentName)}')" class="text-indigo-600 hover:bg-indigo-50 px-2 py-1.5 rounded transition-colors border border-indigo-200 hover:border-indigo-400 text-xs font-bold" title="Isi Nilai Manual"><i data-lucide="edit-3" class="w-4 h-4 inline"></i> Isi Nilai</button>` : ''}
                                ${item.essayPending ? `<button onclick="window.openKoreksiEssay('${item.id}')" class="text-purple-600 hover:bg-purple-50 p-1.5 rounded transition-colors border border-purple-200 hover:border-purple-400" title="Koreksi Soal Esai"><i data-lucide="pencil-line" class="w-4 h-4"></i></button>` : (item.hasEssay && !item.essayPending ? `<button onclick="window.openKoreksiEssay('${item.id}')" class="text-gray-400 hover:bg-gray-50 p-1.5 rounded transition-colors" title="Lihat Koreksi Esai"><i data-lucide="check-circle" class="w-4 h-4"></i></button>` : '')}
                                <button onclick="window.openNoteModal('${item.id}')" class="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors" title="Tambah Catatan Pengawas">
                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                </button>
                                <button onclick="window.exportSinglePDF('${item.id}')" class="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded transition-colors" title="Export PDF Integritas">
                                    <i data-lucide="file-text" class="w-4 h-4"></i>
                                </button>
                                <button onclick="window.deleteExamResult('${item.id}')" class="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors" title="Hapus Data">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                                ${(!isDoing && item.score !== undefined && item.score !== null) ? `<button onclick="window.kirimNotifikasiSatu('${item.id}')" class="text-green-600 hover:bg-green-50 p-1.5 rounded transition-colors border border-green-200 hover:border-green-400" title="Kirim Hasil ke WA Ortu"><i data-lucide="send" class="w-4 h-4"></i></button>` : ''}
                            </div>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            // Render pager
            const pw = document.getElementById('pager-monitoring-wrap');
            if (pw) pw.innerHTML = renderPagerHTML('monitoring', window.currentFilteredData.length, pgM.page, pgM.perPage);

            if(typeof lucide !== 'undefined') window._createIconsSafe();
        }

        // ★ FITUR #8: Auto-refresh sisa waktu di tabel monitoring (tiap detik)
        (function startWaktuTicker() {
            setInterval(() => {
                const tbody = document.getElementById('dashboard-table-body');
                if (!tbody) return;
                // Cari semua sel sisa waktu untuk siswa yang sedang mengerjakan
                (window.currentFilteredData || []).forEach(item => {
                    const isDoing = item.status === 'SEDANG MENGERJAKAN' || item.status.includes('MELANJUTKAN');
                    if (!isDoing) return;
                    const cell = document.getElementById('sisa-waktu-' + item.id);
                    if (!cell) return;
                    const started  = item.examStartTime || item.timestamp;
                    const durasi   = (window.currentExamDuration || 60) * 60 * 1000;
                    const deadline = started + durasi;
                    const sisa     = deadline - Date.now();
                    if (sisa <= 0) { cell.innerHTML = '<span class="text-red-500 font-bold">Habis</span>'; return; }
                    const mm = Math.floor(sisa / 60000);
                    const ss = Math.floor((sisa % 60000) / 1000);
                    const color = mm < 5 ? 'text-red-600' : mm < 15 ? 'text-amber-500' : 'text-emerald-600';
                    cell.innerHTML = '<span class="' + color + '">' + String(mm).padStart(2,'0') + ':' + String(ss).padStart(2,'0') + '</span>';
                });
            }, 1000);
        })();

        function updateStatCards(data) {
            const total    = data.length;
            const selesai  = data.filter(d => d.status === 'SELESAI').length;
            const ongoing  = data.filter(d => d.status === 'SEDANG MENGERJAKAN' || d.status.includes('MELANJUTKAN')).length;
            const dq       = data.filter(d => d.status.includes('DISKUALIFIKASI')).length;
            const withViol = data.filter(d => (d.violations||0) > 0 && !d.status.includes('DISKUALIFIKASI')).length;
            const scores   = data.map(d => typeof d.score === 'number' ? d.score : parseFloat(d.score)).filter(s => !isNaN(s) && s >= 0);
            const avg      = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
            const lulus    = scores.filter(s => s >= window.currentKKM).length;

            const pct = (n) => total > 0 ? Math.round(n/total*100) : 0;
            const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
            const setBar = (id, pctVal) => { const el = document.getElementById(id); if(el) el.style.width = pctVal + '%'; };

            set('sc-total', total);
            set('sc-selesai', selesai);    set('sc-selesai-pct', pct(selesai)+'%');    setBar('sc-bar-selesai', pct(selesai));
            set('sc-ongoing', ongoing);    set('sc-ongoing-pct', pct(ongoing)+'%');    setBar('sc-bar-ongoing', pct(ongoing));
            set('sc-dq', dq);              set('sc-dq-pct', pct(dq)+'%');              setBar('sc-bar-dq', pct(dq));
            set('sc-violations', withViol);set('sc-violations-pct', pct(withViol)+'%');setBar('sc-bar-violations', pct(withViol));
            set('sc-avg', avg !== null ? avg : '—');
            set('sc-lulus', lulus);        set('sc-lulus-pct', scores.length > 0 ? Math.round(lulus/scores.length*100)+'%' : '0%');
            // ★ BARU: refresh analitik otomatis
            if (window._integrityAutoRefresh) window._integrityAutoRefresh(data);
            // ★ BARU: render grafik distribusi nilai per kelas
            // Gunakan SEMUA data history (bukan hanya sesi aktif) agar semua jadwal/mapel tampil
            renderNilaiChart(window._allDashboardData || data);
        }

        // ============================================================
        // ★ GRAFIK DISTRIBUSI NILAI PER KELAS (Pure Canvas, no library)
        // ============================================================
        function renderNilaiChart(data) {
            const wrapper = document.getElementById('chart-nilai-wrapper');
            const canvas  = document.getElementById('chart-nilai-canvas');
            const tableEl = document.getElementById('chart-nilai-table');
            if (!wrapper || !canvas || !tableEl) return;

            // Ambil hanya siswa yang sudah SELESAI dan punya nilai
            const selesai = data.filter(d =>
                (d.status === 'SELESAI' || d.status.includes('DISKUALIFIKASI')) &&
                typeof d.score === 'number' && !isNaN(d.score)
            );
            if (selesai.length === 0) { wrapper.style.display = 'none'; return; }

            // Kelompokkan per kelas
            const kelasMap = {};
            selesai.forEach(d => {
                const k = (d.className || 'Tidak Diketahui').trim();
                if (!kelasMap[k]) kelasMap[k] = [];
                kelasMap[k].push(d.score);
            });

            const kelasList = Object.keys(kelasMap).sort();
            const avgArr    = kelasList.map(k => {
                const s = kelasMap[k];
                return Math.round(s.reduce((a,b)=>a+b,0) / s.length);
            });

            // Tampilkan wrapper
            wrapper.style.display = '';

            // -- Render Canvas Bar Chart --
            const dpr  = window.devicePixelRatio || 1;
            // Batasi lebar bar: min 40px, max 80px, agar tidak melar saat kelas sedikit
            const BAR_W = Math.max(40, Math.min(80, Math.floor((window.innerWidth - 80) / Math.max(kelasList.length, 5))));
            const PADDING = { top: 24, right: 16, bottom: 52, left: 40 };
            // Batasi chartW agar tidak membentang lebar saat hanya ada 1-2 kelas
            const _minChartW = kelasList.length <= 4
                ? kelasList.length * (BAR_W + 40) + PADDING.left + PADDING.right + 40
                : kelasList.length * (BAR_W + 14) + PADDING.left + PADDING.right;
            const chartW = Math.max(200, Math.min(_minChartW, 700));
            const chartH = 180;

            canvas.style.width  = chartW + 'px';
            canvas.style.height = chartH + 'px';
            canvas.width  = chartW * dpr;
            canvas.height = chartH * dpr;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, chartW, chartH);

            const maxVal = 100;
            const plotH  = chartH - PADDING.top - PADDING.bottom;
            const plotW  = chartW - PADDING.left - PADDING.right;

            // Grid lines
            ctx.strokeStyle = '#f1f5f9';
            ctx.lineWidth   = 1;
            [0, 25, 50, 75, 100].forEach(v => {
                const y = PADDING.top + plotH - (v / maxVal * plotH);
                ctx.beginPath(); ctx.moveTo(PADDING.left, y); ctx.lineTo(PADDING.left + plotW, y); ctx.stroke();
                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px system-ui,sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(v, PADDING.left - 5, y + 3.5);
            });

            // KKM line (dynamic)
            const yKkm = PADDING.top + plotH - (window.currentKKM / maxVal * plotH);
            ctx.save();
            ctx.setLineDash([4, 3]);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(PADDING.left, yKkm); ctx.lineTo(PADDING.left + plotW, yKkm); ctx.stroke();
            ctx.restore();
            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 9px system-ui,sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('KKM ' + window.currentKKM, PADDING.left + 3, yKkm - 3);

            // Bars
            const step = plotW / kelasList.length;
            kelasList.forEach((kelas, i) => {
                const avg = avgArr[i];
                const barH = (avg / maxVal) * plotH;
                const x  = PADDING.left + i * step + step * 0.15;
                const bw = step * 0.70;
                const y  = PADDING.top + plotH - barH;

                // Color based on avg
                let color     = avg >= 80 ? '#34d399' : avg >= 60 ? '#fbbf24' : '#f87171';
                let colorDark = avg >= 80 ? '#059669' : avg >= 60 ? '#d97706' : '#dc2626';

                // Gradient
                const grad = ctx.createLinearGradient(0, y, 0, y + barH);
                grad.addColorStop(0, color);
                grad.addColorStop(1, colorDark);
                ctx.fillStyle = grad;
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, y, bw, barH, [4,4,0,0]);
                } else {
                    ctx.rect(x, y, bw, barH);
                }
                ctx.fill();

                // Value label on bar
                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 11px system-ui,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(avg, x + bw/2, y - 5);

                // Kelas label below (rotated)
                ctx.fillStyle = '#475569';
                ctx.font = '10px system-ui,sans-serif';
                const labelY = PADDING.top + plotH + 14;
                const shortLabel = kelas.length > 8 ? kelas.slice(0,8)+'...' : kelas;
                ctx.save();
                ctx.translate(x + bw/2, labelY);
                ctx.rotate(-0.45);
                ctx.textAlign = 'right';
                ctx.fillText(shortLabel, 0, 0);
                ctx.restore();
            });

            // -- Render tabel ringkas per kelas --
            tableEl.innerHTML = kelasList.map((k, i) => {
                const scores = kelasMap[k];
                const avg    = avgArr[i];
                const lulus  = scores.filter(s => s >= window.currentKKM).length;
                const color  = avg >= 80
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : avg >= 60
                        ? 'border-amber-300 bg-amber-50 text-amber-700'
                        : 'border-red-300 bg-red-50 text-red-700';
                return '<div class="rounded-lg border ' + color + ' p-2.5 text-center">'
                    + '<p class="text-[11px] font-bold truncate" title="' + k + '">' + k + '</p>'
                    + '<p class="text-xl font-black mt-0.5">' + avg + '</p>'
                    + '<p class="text-[10px] opacity-75 mt-0.5">' + lulus + '/' + scores.length + ' lulus</p>'
                    + '</div>';
            }).join('');

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        }

        // ============================================================
        // ★ FITUR BARU: SKOR INTEGRITAS + ANALITIK DASHBOARD
        // ============================================================

        // ============================================================
        // FORMULA SKOR INTEGRITAS (PROGRESIF BERBOBOT)
        // ============================================================
        // SKOR INTEGRITAS — Sistem Bobot Per Jenis Pelanggaran (v4)
        //
        // Bobot pengurangan per pelanggaran:
        //   high   (pindah tab, incognito)          : -25 poin
        //   medium (aplikasi mengambang, notifikasi) : -15 poin
        //   low    (keluar fullscreen)               : -10 poin
        //   unknown (tidak ada type, data lama)      : -20 poin (fallback)
        //
        // Aturan DQ tetap: 3 pelanggaran → DISKUALIFIKASI → skor 0
        // Skor minimum non-DQ: max(5, hasil_hitung) agar selalu ada perbedaan
        // ============================================================
        const VIOLATION_WEIGHTS = { high: 25, medium: 15, low: 10, unknown: 20 };

        function calcIntegrityScore(item) {
            if (!item || item.status === 'SEDANG MENGERJAKAN') return null;
            if (item.status.includes('DISKUALIFIKASI')) return 0;
            const viol = item.violations || 0;
            if (viol >= 3) return 0;
            if (viol === 0) return 100;

            // Hitung pengurangan berbasis bobot dari violationLogs
            const logs = item.violationLogs || [];
            let totalDeduction = 0;

            if (logs.length > 0) {
                // Gunakan bobot per log entry
                logs.forEach(log => {
                    const w = VIOLATION_WEIGHTS[log.type || 'unknown'] || VIOLATION_WEIGHTS.unknown;
                    totalDeduction += w;
                });
            } else {
                // Fallback untuk data lama yang tidak punya type
                totalDeduction = viol * VIOLATION_WEIGHTS.unknown;
            }

            // Skor non-DQ minimal 5 agar beda dari DQ (skor 0)
            return Math.max(5, 100 - totalDeduction);
        }

        // ── KEAMANAN: Verifikasi integrity seal data ujian ──
        // Mendeteksi apakah nilai/data ujian pernah dimanipulasi via DevTools setelah pengiriman
        window.verifySeal = function(item) {
            if (!item._seal || !item._sealVersion) return 'no-seal'; // data lama sebelum fitur ini
            try {
                // Verifikasi PENUH — qCount & correctCount kini disimpan di Firestore
                const hasFullFields = (item.qCount != null && item.correctCount != null);
                const payload = [
                    item.score,
                    item.studentNisn,
                    item.timestamp,
                    hasFullFields ? item.qCount      : '',
                    hasFullFields ? item.correctCount : '',
                    item.violations != null ? item.violations : ''
                ].join('|');
                // FNV-1a (sama persis dengan saat seal dibuat)
                let hash = 0x811c9dc5;
                for (let i = 0; i < payload.length; i++) {
                    hash ^= payload.charCodeAt(i);
                    hash = (hash * 0x01000193) >>> 0;
                }
                const computed = hash.toString(16).toUpperCase().padStart(8, '0');
                if (computed === item._seal) return 'ok';         // ✅ cocok
                if (!hasFullFields)          return 'partial';    // field lama tidak lengkap
                return 'tampered';                                 // ⚠️ tidak cocok
            } catch(e) { return 'error'; }
        };

        // Badge seal untuk tabel monitoring
        window.getSealBadge = function(item) {
            if (!item._seal) return '<span title="Data lama — sebelum fitur seal diterapkan" class="text-gray-300 text-xs">–</span>';
            const status = window.verifySeal(item);
            if (status === 'ok')       return '<span title="Integrity seal valid ✅" class="text-emerald-500 text-xs font-bold">🔒</span>';
            if (status === 'tampered') return '<span title="⚠️ PERINGATAN: Seal tidak cocok — data kemungkinan dimanipulasi!" class="text-red-500 text-xs font-bold animate-pulse">⚠️</span>';
            if (status === 'partial')  return '<span title="Seal ada (verifikasi parsial — data dari versi lama)" class="text-amber-400 text-xs font-bold">🔒</span>';
            return '<span title="Data memiliki integrity seal" class="text-emerald-500 text-xs font-bold">🔒</span>';
        };

        // Predikat berbasis skor integritas berbobot
        // Skor 100          = Teladan (0 pelanggaran)
        // Skor 80–99        = Baik (1× ringan)
        // Skor 60–79        = Cukup (1× sedang/berat)
        // Skor 1–59         = Perlu Evaluasi (kombinasi berat)
        // Skor 0            = Diskualifikasi
        function getIntegrityCategory(score) {
            if (score === null) return { label: '—', predikat: '—', bg: 'bg-gray-100', text: 'text-gray-500', headerColor: '#475569' };
            if (score === 100)  return { label: '🏆 Sangat Terpuji', predikat: '🎖️ TELADAN', bg: 'bg-emerald-100', text: 'text-emerald-700', headerColor: '#065f46' };
            if (score >= 80)   return { label: '✅ Baik (Terpuji)', predikat: '✅ BAIK', bg: 'bg-green-100', text: 'text-green-700', headerColor: '#166534' };
            if (score >= 60)   return { label: '⚠️ Cukup (Butuh Pembinaan)', predikat: '⚠️ CUKUP', bg: 'bg-amber-100', text: 'text-amber-700', headerColor: '#92400e' };
            if (score > 0)     return { label: '⛔ Perlu Evaluasi', predikat: '⛔ EVALUASI', bg: 'bg-red-100', text: 'text-red-700', headerColor: '#991b1b' };
            return { label: '❌ Diskualifikasi', predikat: '❌ DISKUALIFIKASI', bg: 'bg-rose-100', text: 'text-rose-700', headerColor: '#881337' };
        }

        // Catatan otomatis per-siswa berdasarkan jumlah pelanggaran
        function getAutoNote(viol, isDQ) {
            if (isDQ || viol >= 3) return {
                kategori: 'Critical / Disqualified',
                note: 'Sesi ujian dihentikan secara otomatis oleh sistem karena pengabaian standar integritas digital secara berulang (3 kali peringatan). Laporan ini diterbitkan sebagai data objektif bagi guru pembimbing untuk melakukan pendekatan persuasif dan evaluasi mendalam terhadap perilaku akademik peserta didik.'
            };
            if (viol === 0) return {
                kategori: 'Excellent Integrity',
                note: 'Peserta didik menunjukkan dedikasi luar biasa terhadap nilai kejujuran digital. Konsistensi dalam menjaga fokus tanpa anomali sistem merupakan cerminan karakter unggul yang siap menghadapi tantangan akademik masa depan. Pertahankan standar integritas ini sebagai modal utama kesuksesan.'
            };
            if (viol === 1) return {
                kategori: 'Minor Alert',
                note: 'Secara umum, peserta didik mengikuti prosedur ujian dengan baik. Terdapat satu catatan aktivitas di luar jendela utama yang langsung direspon dengan perbaikan sikap. Diharapkan adanya peningkatan disiplin dan fokus digital agar proses evaluasi berjalan lebih optimal di sesi berikutnya.'
            };
            return {
                kategori: 'Needs Improvement',
                note: 'Sistem mendeteksi beberapa kali upaya pengalihan layar yang mengganggu standarisasi integritas ujian. Meskipun sesi berhasil diselesaikan, laporan ini merekomendasikan adanya dialog pembinaan karakter untuk memperkuat pemahaman peserta didik mengenai pentingnya kejujuran di lingkungan digital.'
            };
        }

        // Kesimpulan sistem otomatis
        function getSystemConclusion(score, isDQ) {
            if (isDQ || score === 0) return 'Sistem mendeteksi adanya anomali aktivitas yang memerlukan tindak lanjut persuasif. Laporan ini dapat digunakan sebagai dasar dialog pembinaan antara guru dan peserta didik untuk memahami kendala yang dihadapi.';
            if (score === 100) return 'Peserta didik menunjukkan konsistensi luar biasa dalam menjunjung tinggi nilai kejujuran digital. Perilaku ini mencerminkan kesiapan karakter dalam menghadapi tantangan akademik yang lebih tinggi.';
            if (score >= 80) return 'Peserta didik mengikuti prosedur ujian dengan baik dengan sedikit catatan. Secara umum integritas terjaga, namun diharapkan adanya peningkatan disiplin pada sesi berikutnya.';
            if (score >= 60) return 'Secara umum peserta didik mengikuti prosedur dengan baik, namun terdapat catatan aktivitas di luar jendela ujian. Disarankan untuk dilakukan penguatan fokus dan disiplin digital pada sesi berikutnya.';
            return 'Sistem mendeteksi adanya anomali aktivitas yang memerlukan tindak lanjut persuasif. Laporan ini dapat digunakan sebagai dasar dialog pembinaan antara guru dan peserta didik untuk memahami kendala yang dihadapi.';
        }

        // QR verifikasi visual (pattern ASCII berbasis hash ID siswa)
        function makeQRPlaceholder(seed) {
            const h = [...String(seed)].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
            const hex = Math.abs(h).toString(16).toUpperCase().padStart(8, '0');
            return `<div style="display:inline-block;border:2px solid #2563eb;padding:4px 5px;font-family:monospace;font-size:6.5px;line-height:1.4;color:#2563eb;background:white;border-radius:4px">
                <div>█▀▀█ ${hex.slice(0,2)} ▀</div>
                <div>█ ▄ █ ${hex.slice(2,4)}</div>
                <div>█▄▄█ ${hex.slice(4,6)} ▄</div>
                <div>▄ ${hex.slice(6)} ▄▄</div>
                <div style="font-size:5.5px;text-align:center;margin-top:2px;letter-spacing:0.5px;color:#1d4ed8;font-weight:700">VERIFIED ✓</div>
            </div>`;
        }

        // ── DESIGN TOKENS (seragam dengan web: blue-600/indigo-700/slate-900) ──
        const PDF_COLORS = {
            primary:    '#2563eb',   // blue-600  — accent utama web
            primaryDark:'#1d4ed8',   // blue-700
            indigo:     '#4f46e5',   // indigo-600
            indigoDark: '#3730a3',   // indigo-800
            dark:       '#0f172a',   // slate-900
            darkMid:    '#1e293b',   // slate-800
            mid:        '#334155',   // slate-700
            muted:      '#64748b',   // slate-500
            subtle:     '#94a3b8',   // slate-400
            border:     '#e2e8f0',   // slate-200
            surface:    '#f8fafc',   // slate-50
            white:      '#ffffff',
            // Status colors
            green:      '#16a34a',   // green-600
            greenBg:    '#f0fdf4',
            greenBorder:'#bbf7d0',
            amber:      '#d97706',   // amber-600
            amberBg:    '#fffbeb',
            amberBorder:'#fde68a',
            red:        '#dc2626',   // red-600
            redBg:      '#fef2f2',
            redBorder:  '#fecaca',
        };

        // Warna badge per status integritas
        function getStatusPalette(score, isDQ) {
            if (isDQ || score === 0)  return { accent: PDF_COLORS.red,   bg: PDF_COLORS.redBg,   border: PDF_COLORS.redBorder,   stripe: '#fee2e2' };
            if (score === 100)        return { accent: PDF_COLORS.green,  bg: PDF_COLORS.greenBg, border: PDF_COLORS.greenBorder, stripe: '#dcfce7' };
            if (score >= 80)          return { accent: PDF_COLORS.green,  bg: PDF_COLORS.greenBg, border: PDF_COLORS.greenBorder, stripe: '#dcfce7' };
            if (score >= 60)          return { accent: PDF_COLORS.amber,  bg: PDF_COLORS.amberBg, border: PDF_COLORS.amberBorder, stripe: '#fef9c3' };
            return                           { accent: PDF_COLORS.red,   bg: PDF_COLORS.redBg,   border: PDF_COLORS.redBorder,   stripe: '#fee2e2' };
        }

        // Bangun halaman PDF per siswa — redesign modern
        function buildStudentCard(d, idx, schoolName, judulUjianCard) {
            const isDQ = (d.status || '').includes('DISKUALIFIKASI');
            const intScore = calcIntegrityScore(d);
            const cat = getIntegrityCategory(intScore);
            const autoNote = getAutoNote(d.violations || 0, isDQ);
            const conclusion = getSystemConclusion(intScore, isDQ);
            const now = new Date().toLocaleString('id-ID');
            const ujianTime = d.timestamp ? new Date(d.timestamp).toLocaleString('id-ID') : '-';
            const pal = getStatusPalette(intScore, isDQ);
            const kkm = window.currentKKM || 75;
            const nilaiAkademik = d.score ?? null;
            const isLulus = !isDQ && nilaiAkademik !== null && nilaiAkademik >= kkm;
            const statusLabel = isDQ ? 'DISKUALIFIKASI' : nilaiAkademik === null ? 'BELUM DINILAI' : (isLulus ? 'LULUS' : 'TIDAK LULUS');
            const statusColor = isDQ ? PDF_COLORS.red : nilaiAkademik === null ? PDF_COLORS.muted : (isLulus ? PDF_COLORS.green : PDF_COLORS.amber);

            // Hitung durasi ujian
            const _start = d.startTime || d.timestamp;
            const _end   = d.endTime;
            let durasiStr = '-';
            if (_start && _end) {
                const diffMs  = _end - _start;
                const diffMin = Math.floor(diffMs / 60000);
                const diffSec = Math.floor((diffMs % 60000) / 1000);
                durasiStr = diffMin > 0 ? `${diffMin} mnt ${diffSec} dtk` : `${diffSec} dtk`;
            }
            const startStr = _start ? new Date(_start).toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'}) : '-';
            const endStr   = _end   ? new Date(_end).toLocaleTimeString('id-ID',   {hour:'2-digit',minute:'2-digit'}) : '-';

            // Rekomendasi tindak lanjut per predikat (untuk juri & guru BK)
            function getTindakLanjut(score, isDQ, viol) {
                if (isDQ || score === 0) return {
                    steps: [
                        'Lakukan dialog empati 1-on-1 antara guru BK dan siswa untuk memahami faktor penyebab.',
                        'Lampirkan laporan ini sebagai dokumen pendukung konseling karakter.',
                        'Pertimbangkan ujian susulan dengan pengawasan lebih ketat.',
                        'Catat insiden dalam rapor karakter digital siswa untuk pemantauan jangka panjang.',
                    ],
                    color: PDF_COLORS.red, label: 'Perlu Intervensi Segera'
                };
                if (score === 100) return {
                    steps: [
                        'Berikan apresiasi lisan/tertulis sebagai motivasi positif kepada siswa.',
                        'Jadikan siswa ini sebagai model karakter integritas bagi kelas.',
                        'Rekomendasikan ke program siswa berprestasi karakter sekolah.',
                    ],
                    color: PDF_COLORS.green, label: 'Apresiasi & Pengembangan'
                };
                if (score >= 80) return {
                    steps: [
                        'Berikan penguatan positif atas kepatuhan yang sudah ditunjukkan.',
                        'Diskusikan insiden yang terjadi secara reflektif, bukan punitif.',
                        'Ingatkan kembali prosedur ujian sebelum sesi berikutnya.',
                    ],
                    color: PDF_COLORS.green, label: 'Penguatan Ringan'
                };
                if (score >= 60) return {
                    steps: [
                        'Lakukan sesi refleksi singkat tentang arti kejujuran digital.',
                        'Tinjau ulang log insiden bersama siswa agar memahami konsekuensi.',
                        'Pantau perilaku pada sesi ujian berikutnya secara lebih cermat.',
                        'Informasikan orang tua jika ada pola pengulangan pelanggaran.',
                    ],
                    color: PDF_COLORS.amber, label: 'Pembinaan Terstruktur'
                };
                return {
                    steps: [
                        'Segera jadwalkan pertemuan wali kelas, guru BK, dan orang tua.',
                        'Lakukan asesmen motivasi belajar untuk memahami akar masalah.',
                        'Pertimbangkan modifikasi format ujian (lisan/proyek) sebagai alternatif.',
                        'Dokumentasikan dalam catatan kasus untuk monitoring berkelanjutan.',
                    ],
                    color: PDF_COLORS.red, label: 'Evaluasi Menyeluruh'
                };
            }
            const tindakLanjut = getTindakLanjut(intScore, isDQ, d.violations || 0);

            // Kelas: fallback chain
            const kelasDisplay = d.className || d.studentKelas || '-';

            // Divider pill untuk section header
            const sectionHead = (icon, label) =>
                `<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
                    <div style="width:3px;height:14px;border-radius:2px;background:${PDF_COLORS.primary}"></div>
                    <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:${PDF_COLORS.muted}">${icon} ${label}</div>
                </div>`;

            // Log insiden
            const logs = d.violationLogs || [];
            const logHTML = logs.length === 0
                ? `<tr><td colspan="2" style="padding:10px 14px;font-style:italic;color:${PDF_COLORS.subtle};font-size:11px;text-align:center">
                        Tidak ada insiden tercatat — sesi ujian berjalan bersih ✓
                   </td></tr>`
                : logs.map((l, li) => {
                    const t = l.time ? new Date(l.time).toLocaleTimeString('id-ID') : '-';
                    return `<tr style="background:${li%2===0?PDF_COLORS.surface:PDF_COLORS.white}">
                        <td style="padding:7px 12px;font-size:10.5px;font-weight:700;color:${PDF_COLORS.primary};white-space:nowrap;width:115px;border-right:1px solid ${PDF_COLORS.border}">${t}</td>
                        <td style="padding:7px 12px;font-size:10.5px;color:${PDF_COLORS.mid}">
                            ${l.message || 'Aktivitas mencurigakan terdeteksi'}
                            &nbsp;<span style="background:${PDF_COLORS.primary};color:white;font-size:8.5px;font-weight:700;padding:2px 7px;border-radius:20px">Teguran ${li+1}</span>
                        </td>
                    </tr>`;
                  }).join('');

            // Catatan pengawas
            const customNote = d._customNote || '';
            const noteBody = customNote
                ? `<p style="font-size:12px;color:${PDF_COLORS.mid};line-height:1.7;margin:0 0 8px 0">${autoNote.note}</p>
                   <p style="font-size:12px;color:${PDF_COLORS.darkMid};line-height:1.7;margin:0"><strong>Catatan Pengawas:</strong> ${customNote}</p>`
                : `<p style="font-size:12px;color:${PDF_COLORS.mid};line-height:1.7;margin:0 0 12px 0">${autoNote.note}</p>
                   <div style="border:1.5px dashed ${PDF_COLORS.border};border-radius:8px;padding:10px 14px;background:${PDF_COLORS.surface};min-height:44px">
                     <div style="font-size:8.5px;color:${PDF_COLORS.subtle};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Catatan Pengawas (isi manual sebelum dicetak)</div>
                     <div style="border-bottom:1px solid ${PDF_COLORS.border};margin-bottom:7px"></div>
                     <div style="border-bottom:1px solid ${PDF_COLORS.border}"></div>
                   </div>`;

            // Mini score bar
            const barWidth = Math.max(intScore, 3);
            const barColor = pal.accent;

            return `<div style="font-family:'Segoe UI',system-ui,Arial,sans-serif;max-width:720px;margin:0 auto;page-break-after:always;padding-bottom:8px;background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08)">

                <!-- ══ HEADER ══ -->
                <div style="background:linear-gradient(135deg,${PDF_COLORS.primaryDark} 0%,${PDF_COLORS.indigoDark} 50%,${PDF_COLORS.dark} 100%);padding:22px 28px;display:flex;justify-content:space-between;align-items:flex-start;position:relative;overflow:hidden">
                    <!-- Subtle grid overlay -->
                    <div style="position:absolute;inset:0;opacity:0.05;background-image:linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px);background-size:20px 20px"></div>
                    <div style="position:relative">
                        <div style="font-size:8.5px;letter-spacing:3px;opacity:0.5;text-transform:uppercase;margin-bottom:6px;color:white">Laporan Karakter Akademik Digital</div>
                        <div style="font-size:20px;font-weight:900;letter-spacing:-0.5px;color:white;line-height:1.1">${judulUjianCard || 'Ujian Digital'}</div>
                        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:4px;font-weight:500">${schoolName}</div>
                        <!-- Status pill -->
                        <div style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;background:${pal.accent};color:white;font-size:9px;font-weight:800;padding:4px 10px;border-radius:20px;letter-spacing:0.5px">
                            ${isDQ ? '✕ DISKUALIFIKASI' : intScore===100 ? '✓ INTEGRITAS SEMPURNA' : intScore>=70 ? '⚠ PERLU PEMBINAAN' : '✕ PERLU EVALUASI'}
                        </div>
                    </div>
                    <div style="position:relative;text-align:right;flex-shrink:0">
                        <div style="font-size:8px;color:rgba(255,255,255,0.45);margin-bottom:6px">Diterbitkan: ${now}</div>
                        ${makeQRPlaceholder(d.studentNisn || d.studentName || idx)}
                        <div style="font-size:7px;color:rgba(255,255,255,0.35);margin-top:4px">IntegrityTest Engine v4</div>
                    </div>
                </div>

                <!-- ══ IDENTITAS SISWA ══ -->
                <div style="background:${PDF_COLORS.surface};border-bottom:1px solid ${PDF_COLORS.border};padding:16px 28px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr 1fr;gap:12px;align-items:start">
                    <div style="grid-column:span 2">
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Nama Peserta Didik</div>
                        <div style="font-size:17px;font-weight:800;color:${PDF_COLORS.dark}">${_e(d.studentName) || '-'}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">NISN</div>
                        <div style="font-size:12px;font-weight:700;color:${PDF_COLORS.mid};font-family:monospace">${_e(d.studentNisn) || '-'}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Kelas</div>
                        <div style="font-size:12px;font-weight:700;color:${PDF_COLORS.mid}">${kelasDisplay}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Ruang Ujian</div>
                        <div style="font-size:12px;font-weight:700;color:${PDF_COLORS.mid}">${d.ruangUjian || '-'}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Paket Soal</div>
                        <div style="font-size:12px;font-weight:700;color:${PDF_COLORS.mid}">Paket ${d.packetType || d.packet || '-'}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Waktu Ujian</div>
                        <div style="font-size:11px;font-weight:600;color:${PDF_COLORS.muted}">${startStr} → ${endStr}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Durasi</div>
                        <div style="font-size:11px;font-weight:700;color:${PDF_COLORS.mid}">${durasiStr}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">KKM</div>
                        <div style="font-size:12px;font-weight:700;color:${PDF_COLORS.mid}">${kkm}</div>
                    </div>
                    <div>
                        <div style="font-size:8.5px;color:${PDF_COLORS.subtle};font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Tanggal</div>
                        <div style="font-size:11px;font-weight:600;color:${PDF_COLORS.muted}">${_start ? new Date(_start).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}) : ujianTime}</div>
                    </div>
                </div>

                <!-- ══ SCORE CARDS ══ -->
                <div style="padding:18px 28px;background:white;border-bottom:1px solid ${PDF_COLORS.border}">
                    ${sectionHead('▦', 'Ringkasan Hasil Ujian')}
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px">

                        <!-- Nilai Akademik -->
                        <div style="border:1.5px solid ${nilaiAkademik !== null && isLulus ? PDF_COLORS.greenBorder : PDF_COLORS.border};border-radius:12px;padding:14px;text-align:center;background:${nilaiAkademik !== null && isLulus ? PDF_COLORS.greenBg : PDF_COLORS.surface}">
                            <div style="font-size:8.5px;color:${PDF_COLORS.primary};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Nilai Akademik</div>
                            <div style="font-size:32px;font-weight:900;color:${nilaiAkademik !== null && isLulus ? PDF_COLORS.green : (nilaiAkademik !== null ? PDF_COLORS.amber : PDF_COLORS.muted)};line-height:1">${nilaiAkademik ?? '—'}</div>
                            <div style="font-size:9px;color:${PDF_COLORS.subtle};margin-top:4px">KKM: <strong>${kkm}</strong></div>
                            <!-- KKM bar: nilai vs KKM -->
                            <div style="margin-top:8px;position:relative;height:6px;background:#e2e8f0;border-radius:3px;overflow:visible">
                                <!-- KKM marker -->
                                <div style="position:absolute;left:${kkm}%;top:-3px;width:2px;height:12px;background:#94a3b8;border-radius:1px;z-index:2"></div>
                                <!-- nilai bar -->
                                <div style="height:100%;width:${Math.max(nilaiAkademik||0,2)}%;background:${nilaiAkademik !== null && isLulus ? PDF_COLORS.green : PDF_COLORS.amber};border-radius:3px;position:relative;z-index:1"></div>
                            </div>
                            <div style="font-size:8px;color:${statusColor};font-weight:800;margin-top:6px">${statusLabel}</div>
                        </div>

                        <!-- Indeks Integritas -->
                        <div style="border:1.5px solid ${pal.border};border-radius:12px;padding:14px;text-align:center;background:${pal.bg}">
                            <div style="font-size:8.5px;color:${pal.accent};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Indeks Integritas</div>
                            <div style="font-size:32px;font-weight:900;color:${pal.accent};line-height:1">${intScore}</div>
                            <div style="font-size:9px;color:${pal.accent};opacity:0.7;margin-top:4px">${intScore}%</div>
                            <div style="margin-top:8px;height:3px;background:${pal.border};border-radius:2px;overflow:hidden">
                                <div style="height:100%;width:${barWidth}%;background:${barColor};border-radius:2px"></div>
                            </div>
                        </div>

                        <!-- Pelanggaran -->
                        <div style="border:1.5px solid ${PDF_COLORS.border};border-radius:12px;padding:14px;text-align:center;background:${PDF_COLORS.surface}">
                            <div style="font-size:8.5px;color:${PDF_COLORS.muted};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Pelanggaran</div>
                            <div style="font-size:32px;font-weight:900;color:${d.violations > 0 ? PDF_COLORS.red : PDF_COLORS.green};line-height:1">${d.violations||0}</div>
                            <div style="font-size:9px;color:${PDF_COLORS.subtle};margin-top:4px">${isDQ ? 'DQ (≥3×)' : d.violations === 0 ? 'Bersih ✓' : `Peringatan ke-${d.violations}`}</div>
                            <!-- strike dots -->
                            <div style="display:flex;justify-content:center;gap:4px;margin-top:8px">
                                ${[1,2,3].map(n => `<div style="width:10px;height:10px;border-radius:50%;background:${(d.violations||0)>=n ? PDF_COLORS.red : PDF_COLORS.border}"></div>`).join('')}
                            </div>
                        </div>

                        <!-- Predikat -->
                        <div style="border:1.5px solid ${pal.border};border-radius:12px;padding:14px;text-align:center;background:${pal.accent};color:white">
                            <div style="font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;opacity:0.75">Predikat</div>
                            <div style="font-size:13px;font-weight:900;line-height:1.3;margin-top:8px">${cat.predikat}</div>
                            <div style="font-size:8.5px;margin-top:8px;opacity:0.7">${autoNote.kategori}</div>
                        </div>

                    </div>
                </div>

                <!-- ══ LOG INSIDEN ══ -->
                <div style="padding:18px 28px;background:white;border-bottom:1px solid ${PDF_COLORS.border}">
                    ${sectionHead('◎', 'Log Insiden & Aktivitas Sistem')}
                    <div style="border:1px solid ${PDF_COLORS.border};border-radius:10px;overflow:hidden">
                        <table style="width:100%;border-collapse:collapse">
                            <thead>
                                <tr style="background:${PDF_COLORS.primaryDark}">
                                    <th style="padding:8px 12px;text-align:left;font-size:9px;color:rgba(255,255,255,0.8);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:120px">Waktu Kejadian</th>
                                    <th style="padding:8px 12px;text-align:left;font-size:9px;color:rgba(255,255,255,0.8);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Deskripsi Aktivitas Terdeteksi</th>
                                </tr>
                            </thead>
                            <tbody>${logHTML}</tbody>
                        </table>
                    </div>
                </div>

                <!-- ══ CATATAN PENGAWAS ══ -->
                <div style="padding:18px 28px;background:white;border-bottom:1px solid ${PDF_COLORS.border}">
                    ${sectionHead('✎', 'Catatan Otomatis & Pengawas')}
                    <div style="border-left:3px solid ${PDF_COLORS.primary};padding:12px 16px;background:${PDF_COLORS.surface};border-radius:0 10px 10px 0">
                        ${noteBody}
                    </div>
                </div>

                <!-- ══ KESIMPULAN SISTEM ══ -->
                <div style="padding:16px 28px;background:${pal.bg};border-bottom:1px solid ${pal.border}">
                    ${sectionHead('⬡', 'Kesimpulan Sistem (Auto-Generated)')}
                    <div style="font-size:11.5px;color:${PDF_COLORS.mid};line-height:1.8;font-style:italic;border-left:3px solid ${pal.accent};padding-left:14px">"${conclusion}"</div>
                </div>

                <!-- ══ REKOMENDASI TINDAK LANJUT ══ -->
                <div style="padding:18px 28px;background:white;border-bottom:1px solid ${PDF_COLORS.border}">
                    ${sectionHead('➤', 'Rekomendasi Tindak Lanjut untuk Guru / Wali Kelas')}
                    <div style="background:${tindakLanjut.color}12;border:1.5px solid ${tindakLanjut.color}40;border-radius:10px;overflow:hidden">
                        <div style="background:${tindakLanjut.color};padding:8px 14px;display:flex;align-items:center;gap:8px">
                            <span style="font-size:9px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:1px">${tindakLanjut.label}</span>
                        </div>
                        <div style="padding:12px 14px">
                            ${tindakLanjut.steps.map((step, si) => `
                            <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 0;${si < tindakLanjut.steps.length - 1 ? 'border-bottom:1px dashed ' + PDF_COLORS.border + ';' : ''}">
                                <div style="width:20px;height:20px;border-radius:50%;background:${tindakLanjut.color};color:white;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${si+1}</div>
                                <p style="font-size:11.5px;color:${PDF_COLORS.mid};line-height:1.6;margin:0">${step}</p>
                            </div>`).join('')}
                        </div>
                    </div>
                    <p style="font-size:9px;color:${PDF_COLORS.subtle};margin-top:8px;font-style:italic">* Rekomendasi dihasilkan otomatis oleh INTEGRITEST berdasarkan data perilaku digital siswa. Pertimbangan kontekstual dari guru tetap diperlukan.</p>
                </div>

                <!-- ══ FOOTER ══ -->
                <div style="background:${PDF_COLORS.dark};padding:14px 28px;display:flex;justify-content:space-between;align-items:center;gap:16px">
                    <div style="font-size:9.5px;color:rgba(255,255,255,0.3);font-style:italic;line-height:1.65;flex:1;max-width:500px">
                        "Hasil ujian adalah potret kompetensi kognitif, namun integritas adalah cermin kualitas diri. Laporan ini diterbitkan bukan untuk menghukum, melainkan untuk mendukung tumbuh kembang karakter yang autentik."
                    </div>
                    <div style="text-align:right;flex-shrink:0;border-left:1px solid rgba(255,255,255,0.08);padding-left:16px">
                        <div style="font-size:10px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:0.5px">INTEGRITEST</div>
                        <div style="font-size:8px;color:rgba(255,255,255,0.25);margin-top:2px">Dok. #${String(idx+1).padStart(4,'0')}-${(d.studentNisn||'0000').toString().slice(-4)}</div>
                        <div style="font-size:8px;color:${PDF_COLORS.primary};margin-top:3px;font-weight:600">✓ Verified &amp; Auto-Generated</div>
                    </div>
                </div>

                <div style="height:32px"></div>
            </div>`;
        }

        window.renderIntegrityDashboard = function() {
            const isAdmin = !window.currentPengawasRuang;
            const rawData = dashboardData || [];
            let finished = rawData.filter(d => d.status !== 'SEDANG MENGERJAKAN');

            // ══ STEP 1: Filter pengawas DULU sebelum apapun ══
            // Pengawas hanya boleh lihat data ruangnya sendiri + sesi aktif
            if (!isAdmin && window.currentPengawasRuang) {
                const pgNama = (window.currentPengawasRuang.nama || '').trim().toLowerCase();
                const pgId   = (window.currentPengawasRuang.id   || '').trim().toLowerCase();
                finished = finished.filter(d => {
                    const dr = (d.ruangUjian || '').trim().toLowerCase();
                    return dr === pgNama || dr === pgId;
                });
                // Default: hanya tampilkan data jadwal aktif (bisa di-override filter dropdown)
                const fSesiDropdown = document.getElementById('analitik-filter-sesi')?.value || 'all';
                const jadwalAktifIds3 = (window.allJadwalDB || []).filter(j => j.isActive).map(j => j.id);
                if (fSesiDropdown === 'all' && jadwalAktifIds3.length > 0) {
                    finished = finished.filter(d => jadwalAktifIds3.includes(d.sesiId));
                }
            }

            // ══ STEP 2: Ambil nilai filter yang dipilih user ══
            const sesiSel   = document.getElementById('analitik-filter-sesi');
            const ruangSel  = document.getElementById('analitik-filter-ruang');
            const kelasSel  = document.getElementById('analitik-filter-kelas');
            const ruangWrap = document.getElementById('analitik-filter-ruang-wrap');
            const fPredikat = document.getElementById('analitik-filter-predikat')?.value || 'all';
            const fSesi     = sesiSel?.value  || 'all';
            const fRuang    = isAdmin ? (ruangSel?.value || 'all') : 'locked'; // pengawas: tidak pakai filter ruang manual
            const fKelas    = kelasSel?.value || 'all';

            // ══ STEP 3: Terapkan filter admin (sesi/ruang/kelas) ══
            if (fSesi  !== 'all') finished = finished.filter(d => (d.sesiId || 'default') === fSesi);
            if (isAdmin && fRuang !== 'all') finished = finished.filter(d => (d.ruangUjian || '') === fRuang);
            if (fKelas !== 'all') finished = finished.filter(d => (d.className || '') === fKelas);

            // ══ STEP 4: Populate dropdown dari data yang sudah ter-filter ruang ══
            // (sehingga pilihan dropdown relevan dengan scope user)
            const baseForDropdown = (() => {
                // Untuk dropdown: pakai data yang sudah filter ruang/pengawas tapi BELUM filter sesi/kelas
                let base = rawData.filter(d => d.status !== 'SEDANG MENGERJAKAN');
                if (!isAdmin && window.currentPengawasRuang) {
                    const _pgNama = (window.currentPengawasRuang.nama || '').trim().toLowerCase();
                    const _pgId   = (window.currentPengawasRuang.id   || '').trim().toLowerCase();
                    base = base.filter(d => { const dr=(d.ruangUjian||'').trim().toLowerCase(); return dr===_pgNama||dr===_pgId; });
                }
                return base;
            })();

            // Sembunyikan filter ruang untuk pengawas
            if (ruangWrap) ruangWrap.style.display = isAdmin ? '' : 'none';

            // ══ POPULATE DROPDOWN: Gabungkan data master + data ujian ══
            // Dropdown diisi dari jadwal & data master

            // Isi dropdown jadwal — dari allJadwalDB
            if (sesiSel) {
                const curSesi = sesiSel.value;
                sesiSel.innerHTML = '<option value="all">Semua Jadwal</option>';
                const sortedJ = (window.allJadwalDB || []).slice().sort((a,b) => {
                    if (a.tanggal !== b.tanggal) return b.tanggal > a.tanggal ? 1 : -1;
                    return b.jamMulai > a.jamMulai ? 1 : -1;
                });
                sortedJ.forEach(j => {
                    const opt = document.createElement('option');
                    opt.value = j.id;
                    const aktif = j.isActive ? ' ⚡' : '';
                    opt.textContent = (j.nama || j.id) + aktif + (j.tanggal ? ' · ' + j.tanggal : '');
                    sesiSel.appendChild(opt);
                });
                if (curSesi && sesiSel.querySelector('option[value="' + curSesi + '"]')) sesiSel.value = curSesi;
            }

            // Isi dropdown ruang (admin only) — dari ruangList (master) + data ujian
            if (ruangSel && isAdmin) {
                const curRuang = ruangSel.value;
                // Nama ruang dari database master
                const ruangNamaFromMaster = (window.ruangList || []).map(r => r.nama).filter(Boolean);
                // Nama ruang dari data ujian yang sudah ada (untuk antisipasi data lama)
                const ruangNamaFromData = baseForDropdown.map(d => d.ruangUjian).filter(Boolean);
                // Gabungkan dan deduplikasi
                const ruangSet = [...new Set([...ruangNamaFromMaster, ...ruangNamaFromData])].sort();
                ruangSel.innerHTML = '<option value="all">Semua Ruang</option>';
                ruangSet.forEach(r => {
                    const opt = document.createElement('option');
                    opt.value = r; opt.textContent = r;
                    ruangSel.appendChild(opt);
                });
                if (curRuang && ruangSel.querySelector(`option[value="${curRuang}"]`)) ruangSel.value = curRuang;
            }

            // Isi dropdown kelas — dari kelasList (master) + data ujian
            if (kelasSel) {
                const curKelas = kelasSel.value;
                // Nama kelas dari database master
                const kelasNamaFromMaster = (window.kelasList || []).map(k => k.nama).filter(Boolean);
                // Nama kelas dari data ujian yang sudah ada
                const kelasNamaFromData = baseForDropdown.map(d => d.className).filter(Boolean);
                // Gabungkan dan deduplikasi
                const kelasSet = [...new Set([...kelasNamaFromMaster, ...kelasNamaFromData])].sort();
                kelasSel.innerHTML = '<option value="all">Semua Kelas</option>';
                kelasSet.forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k; opt.textContent = k;
                    kelasSel.appendChild(opt);
                });
                if (curKelas && kelasSel.querySelector(`option[value="${curKelas}"]`)) kelasSel.value = curKelas;
            }

            // ══ STEP 5: Handle empty state ══
            const emptyBanner = document.getElementById('analitik-empty-banner');

            if (finished.length === 0) {
                if (emptyBanner) emptyBanner.style.display = '';
                document.getElementById('avg-integrity-score').textContent = '—';
                document.getElementById('honest-count').textContent = '0';
                document.getElementById('honest-pct').textContent = '0% dari total';
                document.getElementById('minor-viol-count').textContent = '0';
                document.getElementById('dq-count-analitik').textContent = '0';
                document.getElementById('chart-integrity-dist').innerHTML = '<div class="flex flex-col items-center justify-center py-10 gap-2 text-gray-300"><i data-lucide="bar-chart-2" class="w-10 h-10"></i><p class="text-sm font-semibold text-gray-400">Menunggu data ujian...</p><p class="text-xs text-gray-300">Terisi otomatis setelah siswa menyelesaikan ujian</p></div>';
                document.getElementById('chart-viol-per-class').innerHTML = '<div class="flex flex-col items-center justify-center py-10 gap-2 text-gray-300"><i data-lucide="users" class="w-10 h-10"></i><p class="text-sm font-semibold text-gray-400">Menunggu data ujian...</p><p class="text-xs text-gray-300">Terisi otomatis setelah siswa menyelesaikan ujian</p></div>';
                document.getElementById('integrity-table-body').innerHTML = '<tr><td colspan="9" class="text-center py-14"><div class="flex flex-col items-center gap-2 text-gray-300"><i data-lucide="clipboard-list" class="w-12 h-12"></i><p class="font-bold text-gray-400 text-base">Belum ada data integritas</p><p class="text-sm text-gray-300 max-w-xs">Tabel terisi otomatis setelah siswa menyelesaikan ujian. Tidak perlu refresh halaman.</p></div></td></tr>';
                const pager = document.getElementById('analitik-pager'); if (pager) pager.innerHTML = '';
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }
            if (emptyBanner) emptyBanner.style.display = 'none';

            // ── Hitung skor integritas ──
            let withScores = finished.map(d => ({
                ...d, integrityScore: calcIntegrityScore(d)
            })).filter(d => d.integrityScore !== null);

            // Filter predikat
            if (fPredikat !== 'all') {
                withScores = withScores.filter(d => {
                    if (fPredikat === 'teladan')  return d.integrityScore === 100;
                    if (fPredikat === 'baik')     return d.integrityScore >= 80 && d.integrityScore < 100;
                    if (fPredikat === 'cukup')    return d.integrityScore >= 60 && d.integrityScore < 80;
                    if (fPredikat === 'evaluasi') return d.integrityScore > 0  && d.integrityScore < 60;
                    if (fPredikat === 'dq')       return d.integrityScore === 0;
                    return true;
                });
            }

            // ── Summary cards ──
            const scores = withScores.map(d => d.integrityScore);
            const avg    = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
            const honest = withScores.filter(d => d.integrityScore >= 80).length;
            const minor  = withScores.filter(d => (d.violations||0) >= 1 && (d.violations||0) <= 2 && !d.status.includes('DISKUALIFIKASI')).length;
            const dq     = withScores.filter(d => d.integrityScore === 0).length;
            const total  = withScores.length;

            document.getElementById('avg-integrity-score').textContent = avg;
            document.getElementById('honest-count').textContent = honest;
            document.getElementById('honest-pct').textContent = total > 0 ? Math.round(honest/total*100)+'% dari total' : '0% dari total';
            document.getElementById('minor-viol-count').textContent = minor;
            document.getElementById('dq-count-analitik').textContent = dq;

            // Update info filter
            const filterInfo = document.getElementById('analitik-filter-info');
            if (filterInfo) {
                const hasFilter = fSesi !== 'all' || (isAdmin && fRuang !== 'all') || fKelas !== 'all' || fPredikat !== 'all';
                filterInfo.textContent = hasFilter ? `Menampilkan ${total} hasil` : '';
                filterInfo.classList.toggle('hidden', !hasFilter);
            }

            // ── Chart 1: Distribusi Skor ──
            const bands = [
                { label: 'Score 100 (Teladan)',      min: 100, max: 100, color: '#10b981' },
                { label: 'Score 80–99 (Baik)',       min: 80,  max: 99,  color: '#34d399' },
                { label: 'Score 60–79 (Cukup)',      min: 60,  max: 79,  color: '#f59e0b' },
                { label: 'Score 1–59 (Evaluasi)',    min: 1,   max: 59,  color: '#ef4444' },
                { label: 'Score 0 (Diskualifikasi)', min: 0,   max: 0,   color: '#991b1b' },
            ];
            const distEl = document.getElementById('chart-integrity-dist');
            distEl.innerHTML = '';
            bands.forEach(band => {
                const count = withScores.filter(d => d.integrityScore >= band.min && d.integrityScore <= band.max).length;
                const pct   = total > 0 ? Math.round(count/total*100) : 0;
                distEl.innerHTML += `
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-gray-500 w-44 shrink-0">${band.label}</span>
                        <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                            <div class="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                                 style="width:${Math.max(pct,0)}%; background:${band.color}; min-width:${count>0?'2rem':'0'}">
                                ${count > 0 ? `<span class="text-white text-xs font-bold">${count}</span>` : ''}
                            </div>
                        </div>
                        <span class="text-xs font-bold text-gray-600 w-10 text-right">${pct}%</span>
                    </div>`;
            });

            // ── Chart 2: Pelanggaran per Kelas ──
            const classMap = {};
            withScores.forEach(d => {
                const cls = d.className || 'Tidak Diketahui';
                if (!classMap[cls]) classMap[cls] = { total: 0, viol: 0 };
                classMap[cls].total++;
                if ((d.violations||0) > 0) classMap[cls].viol++;
            });
            const classEl = document.getElementById('chart-viol-per-class');
            const classEntries = Object.entries(classMap).sort((a,b) => b[1].viol - a[1].viol);
            if (classEntries.length === 0) {
                classEl.innerHTML = '<p class="text-center text-gray-400 text-sm py-8">Belum ada data kelas.</p>';
            } else {
                classEl.innerHTML = '';
                const maxViol = Math.max(...classEntries.map(([,v]) => v.viol), 1);
                classEntries.forEach(([cls, val]) => {
                    const pct  = Math.round(val.viol/val.total*100);
                    const barW = Math.round(val.viol/maxViol*100);
                    const color = pct === 0 ? '#10b981' : pct < 30 ? '#f59e0b' : '#ef4444';
                    classEl.innerHTML += `
                        <div class="flex items-center gap-3">
                            <span class="text-xs text-gray-600 font-bold w-28 shrink-0 truncate">${cls}</span>
                            <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                                     style="width:${Math.max(barW,0)}%; background:${color}; min-width:${val.viol>0?'2rem':'0'}">
                                    ${val.viol > 0 ? `<span class="text-white text-xs font-bold">${val.viol}</span>` : ''}
                                </div>
                            </div>
                            <span class="text-xs text-gray-500 w-20 text-right">${val.viol}/${val.total} (${pct}%)</span>
                        </div>`;
                });
            }

            // ── Scatter Plot: Nilai vs Integritas ──
            (function renderScatterPlot() {
                const container = document.getElementById('scatter-plot-container');
                const legendEl  = document.getElementById('scatter-legend');
                const tooltip   = document.getElementById('scatter-tooltip');
                if (!container) return;

                // Data: hanya yang punya score (nilai ujian)
                const plotData = withScores.filter(d => d.score != null && !isNaN(Number(d.score)));
                if (plotData.length === 0) {
                    container.innerHTML = '<div class="flex flex-col items-center justify-center h-full gap-2 text-gray-300"><p class="text-sm font-semibold text-gray-400">Belum ada data nilai ujian.</p></div>';
                    legendEl.innerHTML = '';
                    return;
                }

                // Kategori warna titik
                const DOT_CATS = [
                    { key:'teladan', label:'Teladan (100)',  color:'#10b981', test: s => s === 100 },
                    { key:'baik',    label:'Baik (80–99)',   color:'#3b82f6', test: s => s >= 80 && s < 100 },
                    { key:'cukup',   label:'Cukup (60–79)',  color:'#f59e0b', test: s => s >= 60 && s < 80 },
                    { key:'eval',    label:'Evaluasi (<60)', color:'#ef4444', test: s => s > 0 && s < 60 },
                    { key:'dq',      label:'Diskualifikasi', color:'#7f1d1d', test: s => s === 0 },
                ];

                // Ukuran area plot
                const W = container.offsetWidth || 600;
                const H = 320;
                const PAD = { top: 20, right: 24, bottom: 48, left: 52 };
                const PW = W - PAD.left - PAD.right;
                const PH = H - PAD.top  - PAD.bottom;

                // Skala
                const toX = v => PAD.left + (Number(v) / 100) * PW;
                const toY = v => PAD.top  + PH - (Number(v) / 100) * PH;

                // SVG builder
                let svg = `<svg width="${W}" height="${H}" style="font-family:inherit;overflow:visible" xmlns="http://www.w3.org/2000/svg">`;

                // Background grid
                [0,25,50,75,100].forEach(tick => {
                    const x = toX(tick);
                    const y = toY(tick);
                    svg += `<line x1="${x}" y1="${PAD.top}" x2="${x}" y2="${PAD.top+PH}" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>`;
                    svg += `<line x1="${PAD.left}" y1="${y}" x2="${PAD.left+PW}" y2="${y}" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>`;
                    svg += `<text x="${x}" y="${PAD.top+PH+14}" text-anchor="middle" font-size="10" fill="#9ca3af">${tick}</text>`;
                    svg += `<text x="${PAD.left-8}" y="${y+4}" text-anchor="end" font-size="10" fill="#9ca3af">${tick}</text>`;
                });

                // Axis labels
                svg += `<text x="${PAD.left + PW/2}" y="${H-4}" text-anchor="middle" font-size="11" font-weight="600" fill="#6b7280">Nilai Ujian →</text>`;
                svg += `<text transform="rotate(-90)" x="${-(PAD.top+PH/2)}" y="13" text-anchor="middle" font-size="11" font-weight="600" fill="#6b7280">Skor Integritas →</text>`;

                // Axis border
                svg += `<rect x="${PAD.left}" y="${PAD.top}" width="${PW}" height="${PH}" fill="none" stroke="#d1d5db" stroke-width="1" rx="2"/>`;

                // Quadrant labels (subtle)
                svg += `<text x="${PAD.left+PW*0.75}" y="${PAD.top+14}" text-anchor="middle" font-size="9" fill="#bbf7d0" font-weight="700">✓ IDEAL</text>`;
                svg += `<text x="${PAD.left+PW*0.75}" y="${PAD.top+PH-6}" text-anchor="middle" font-size="9" fill="#fecaca" font-weight="700">⚠ PERLU CERMATI</text>`;
                svg += `<text x="${PAD.left+PW*0.25}" y="${PAD.top+14}" text-anchor="middle" font-size="9" fill="#bfdbfe" font-weight="700">📚 PERLU BIMBINGAN</text>`;

                // Dots
                // Group by exact position to handle overlap (jitter)
                const posMap = {};
                plotData.forEach(d => {
                    const px = Math.round(Number(d.score));
                    const py = Math.round(d.integrityScore);
                    const key = `${px}_${py}`;
                    if (!posMap[key]) posMap[key] = [];
                    posMap[key].push(d);
                });

                const dotsHTML = [];
                Object.entries(posMap).forEach(([key, group]) => {
                    group.forEach((d, idx) => {
                        const px = Math.round(Number(d.score));
                        const py = Math.round(d.integrityScore);
                        // Jitter jika overlap
                        const jx = group.length > 1 ? (idx - (group.length-1)/2) * 5 : 0;
                        const jy = 0;
                        const cx = toX(px) + jx;
                        const cy = toY(py) + jy;
                        const cat = DOT_CATS.find(c => c.test(d.integrityScore)) || DOT_CATS[4];
                        const r = 7;
                        // Encode nama untuk data attribute
                        const safeName = (d.studentName||'').replace(/"/g,'&quot;');
                        const safeKelas = (d.className||'-').replace(/"/g,'&quot;');
                        dotsHTML.push(`<circle
                            cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"
                            fill="${cat.color}" fill-opacity="0.85"
                            stroke="white" stroke-width="1.5"
                            style="cursor:pointer;transition:r 0.15s"
                            data-name="${safeName}" data-kelas="${safeKelas}"
                            data-nilai="${px}" data-integ="${py}" data-cat="${cat.label}"
                            onmouseenter="window._scatterHover(event,this)"
                            onmouseleave="window._scatterOut()"
                        />`);
                    });
                });
                svg += dotsHTML.join('');
                svg += '</svg>';

                container.innerHTML = svg;

                // Legend
                legendEl.innerHTML = DOT_CATS.map(c => {
                    const cnt = plotData.filter(d => c.test(d.integrityScore)).length;
                    if (cnt === 0) return '';
                    return `<span class="flex items-center gap-1.5">
                        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${c.color}"></span>
                        <span class="text-gray-600">${c.label}</span>
                        <span class="text-gray-400">(${cnt})</span>
                    </span>`;
                }).join('');

                // Tooltip handlers
                window._scatterHover = function(e, el) {
                    tooltip.classList.remove('hidden');
                    tooltip.innerHTML = `
                        <div class="font-bold mb-0.5">${el.dataset.name}</div>
                        <div class="text-gray-300">Kelas: ${el.dataset.kelas}</div>
                        <div>Nilai Ujian: <b class="text-yellow-300">${el.dataset.nilai}</b></div>
                        <div>Skor Integritas: <b class="text-emerald-300">${el.dataset.integ}</b></div>
                        <div class="mt-1 text-gray-400 text-[10px]">${el.dataset.cat}</div>`;
                };
                window._scatterOut = function() { tooltip.classList.add('hidden'); };
                document.addEventListener('mousemove', function(e) {
                    if (!tooltip.classList.contains('hidden')) {
                        tooltip.style.left = (e.clientX + 14) + 'px';
                        tooltip.style.top  = (e.clientY - 10) + 'px';
                    }
                }, { passive: true });
            })();

            // ── Tren Perbandingan Antar Jadwal ──
            window.renderTrendChart(window._trendAllData);

            // ── Tabel dengan Pagination ──
            const sorted = [...withScores].sort((a,b) => {
                // 1. Skor integritas tertinggi dulu
                if (b.integrityScore !== a.integrityScore) return b.integrityScore - a.integrityScore;
                // 2. Jika integritas sama → nilai ujian tertinggi dulu
                const scoreA = Number(a.score ?? -1);
                const scoreB = Number(b.score ?? -1);
                if (scoreB !== scoreA) return scoreB - scoreA;
                // 3. Jika masih sama → nama secara alfabetis
                return (a.studentName || '').localeCompare(b.studentName || '');
            });
            const pgA = window._pg.analitik;
            pgA.page = pgA.perPage === 0 ? 1 : Math.max(1, Math.min(pgA.page, Math.ceil(sorted.length / pgA.perPage) || 1));
            const pageItems  = pgSlice(sorted, pgA);
            const sliceStart = pgA.perPage === 0 ? 0 : (pgA.page - 1) * pgA.perPage;

            const tbody = document.getElementById('integrity-table-body');
            if (pageItems.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" class="text-center py-10 text-gray-400">Tidak ada data untuk filter ini.</td></tr>`;
            } else {
                tbody.innerHTML = '';
                pageItems.forEach((d, i) => {
                    const globalRank = sliceStart + i;
                    const cat = getIntegrityCategory(d.integrityScore);
                    const rankIcon = globalRank === 0 ? '🥇' : globalRank === 1 ? '🥈' : globalRank === 2 ? '🥉' : `#${globalRank+1}`;
                    const scoreBar = `
                        <div class="flex items-center gap-2 justify-center">
                            <div class="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div class="h-full rounded-full" style="width:${d.integrityScore}%; background:${d.integrityScore>=80?'#10b981':d.integrityScore>=60?'#f59e0b':'#ef4444'}"></div>
                            </div>
                            <span class="font-black text-gray-800 w-7 text-right text-sm">${d.integrityScore}</span>
                        </div>`;
                    const hasNote = d._customNote ? '📝' : '';
                    tbody.innerHTML += `
                        <tr class="border-b hover:bg-slate-50 transition-colors ${d.integrityScore === 0 ? 'bg-red-50' : ''}">
                            <td class="px-4 py-3 text-center font-bold text-gray-500 text-sm">${rankIcon}</td>
                            <td class="px-4 py-3 font-semibold text-gray-800 text-sm">${_e(d.studentName)} ${hasNote}</td>
                            <td class="px-4 py-3 text-gray-500 text-xs">${d.className || '-'}</td>
                            <td class="px-4 py-3 text-gray-500 text-xs">${d.ruangUjian || '-'}</td>
                            <td class="px-4 py-3 text-center font-bold text-gray-700 text-sm">${d.score ?? '-'}</td>
                            <td class="px-4 py-3 text-center">${(d.violations||0) > 0
                                ? `<span class="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-xs">${d.violations}×</span>`
                                : '<span class="text-emerald-500 font-bold text-xs">✓ Bersih</span>'}</td>
                            <td class="px-4 py-3">${scoreBar}</td>
                            <td class="px-4 py-3 text-center"><span class="px-2 py-1 rounded-lg text-xs font-bold ${cat.bg} ${cat.text}">${cat.label}</span></td>
                            <td class="px-4 py-3 text-center">
                                <div class="flex items-center justify-center gap-1.5">
                                    <button onclick="window.openNoteModal('${d.id}')"
                                        class="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors"
                                        title="Tambah/Edit Catatan Pengawas">
                                        <i data-lucide="pencil" class="w-3 h-3"></i> Catatan
                                    </button>
                                    <button onclick="window.exportSinglePDF('${d.id}')"
                                        class="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                                        title="Export PDF siswa ini">
                                        <i data-lucide="file-text" class="w-3 h-3"></i> PDF
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                });
            }

            // Render pager
            const pagerEl = document.getElementById('analitik-pager');
            if (pagerEl) pagerEl.innerHTML = renderPagerHTML('analitik', sorted.length, pgA.page, pgA.perPage);

            // ★ Render panel diagnostik KD
            window.renderKDDiagnostic(withScores);

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ── ★ TREN PERBANDINGAN ANTAR JADWAL v4 ─────────────────────────────
        window._trendMetric = window._trendMetric || 'both';
        window._trendView   = window._trendView   || 'bar';

        // Palet warna untuk jadwal/kelas (distingable)
        const TREND_PALETTE = [
            '#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6',
            '#06b6d4','#ec4899','#84cc16','#f97316','#14b8a6',
            '#a855f7','#0ea5e9','#d946ef','#22c55e','#fb923c'
        ];

        // Populate filter jadwal dropdown
        window._trendPopulateFilter = function() {
            const sel = document.getElementById('trend-jadwal-filter');
            if (!sel) return;
            const jadwalList = window.allJadwalDB || [];
            // Hapus semua kecuali opsi pertama "Semua"
            while (sel.options.length > 1) sel.remove(1);
            jadwalList.forEach(j => {
                const opt = document.createElement('option');
                opt.value = j.id;
                opt.textContent = j.nama || j.id;
                sel.appendChild(opt);
            });
        };

        window.renderTrendChart = function(overrideData) {
            const container  = document.getElementById('trend-chart-container');
            const legendEl   = document.getElementById('trend-chart-legend');
            const insightBox = document.getElementById('trend-insight-box');
            const insightContent = document.getElementById('trend-insight-content');
            const scatterHint = document.getElementById('trend-scatter-hint');
            if (!container) return;

            // Populate filter setiap kali render
            window._trendPopulateFilter();

            // ── Update view button styles ──
            ['bar','scatter'].forEach(v => {
                const btn = document.getElementById('trend-view-' + v);
                if (!btn) return;
                btn.className = v === window._trendView
                    ? 'px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-white/30 transition-all flex items-center gap-1.5'
                    : 'px-3 py-1.5 rounded-lg text-xs font-bold text-white/70 hover:bg-white/20 transition-all flex items-center gap-1.5';
            });

            // Show/hide scatter hint
            if (scatterHint) scatterHint.classList.toggle('hidden', window._trendView !== 'scatter');

            // Gunakan SEMUA data selesai (tidak difilter sesi) agar bisa lintas jadwal
            const rawAll = dashboardData || [];
            const allFinished = rawAll.filter(d => d.status !== 'SEDANG MENGERJAKAN');
            const allWithScores = allFinished.map(d => ({ ...d, integrityScore: calcIntegrityScore(d) }))
                                             .filter(d => d.integrityScore !== null && d.score != null && !isNaN(Number(d.score)));

            // ── Update tab metrik aktif ──
            ['both','nilai','integ'].forEach(k => {
                const btn = document.getElementById('trend-tab-' + k);
                if (!btn) return;
                if (k === window._trendMetric) {
                    btn.className = 'px-3 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white border border-violet-600 transition-all';
                } else {
                    btn.className = 'px-3 py-2 rounded-xl text-xs font-bold bg-white text-gray-500 border border-gray-200 hover:border-violet-300 transition-all';
                }
            });

            const groupBy    = (document.getElementById('trend-group-by')?.value) || 'jadwal';
            const filterJdwl = (document.getElementById('trend-jadwal-filter')?.value) || 'all';
            const metric     = window._trendMetric;

            if (allWithScores.length === 0) {
                container.innerHTML = '<div class="flex flex-col items-center justify-center gap-2 text-gray-300" style="min-height:300px"><i data-lucide="git-compare" class="w-10 h-10"></i><p class="text-sm font-semibold text-gray-400">Belum ada data ujian selesai.</p></div>';
                if (legendEl)   legendEl.innerHTML   = '';
                if (insightBox) insightBox.classList.add('hidden');
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // ── Bangun jadwal map untuk nama label ──
            const jadwalMap = {};
            (window.allJadwalDB || []).forEach(j => {
                jadwalMap[j.id] = j.nama || j.id;
            });

            // ── Filter by jadwal jika dipilih ──
            const dataFiltered = filterJdwl === 'all'
                ? allWithScores
                : allWithScores.filter(d => (d.sesiId || 'default') === filterJdwl);

            // ── Bangun kelompok data ──
            const groups = {};
            dataFiltered.forEach(d => {
                const jId   = d.sesiId || 'default';
                const jNama = jadwalMap[jId] || jId;
                const kelas = d.className || '—';
                const key   = groupBy === 'kelas' ? `${jId}||${kelas}` : jId;
                const label = groupBy === 'kelas' ? `${jNama} · ${kelas}` : jNama;
                if (!groups[key]) groups[key] = { label, nilai: [], integ: [], jadwalId: jId, kelas, allData: [] };
                groups[key].nilai.push(Number(d.score));
                groups[key].integ.push(d.integrityScore);
                groups[key].allData.push(d);
            });

            const entries = Object.values(groups).map((g, i) => ({
                label:    g.label,
                nilai:    Math.round(g.nilai.reduce((a,b)=>a+b,0) / g.nilai.length),
                integ:    Math.round(g.integ.reduce((a,b)=>a+b,0) / g.integ.length),
                count:    g.nilai.length,
                jadwalId: g.jadwalId,
                kelas:    g.kelas,
                color:    TREND_PALETTE[i % TREND_PALETTE.length],
                // distribusi DQ
                dqCount:  g.allData.filter(d => d.integrityScore === 0).length,
                avgViol:  g.allData.length ? (g.allData.reduce((a,d) => a + (d.violationCount||0), 0) / g.allData.length).toFixed(1) : 0,
            }));

            // Urut berdasarkan jadwal
            const jadwalOrder = (window.allJadwalDB || []).map(j => j.id);
            entries.sort((a, b) => {
                const ia = jadwalOrder.indexOf(a.jadwalId);
                const ib = jadwalOrder.indexOf(b.jadwalId);
                if (ia !== ib) return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
                return a.kelas.localeCompare(b.kelas);
            });

            if (entries.length === 0) {
                container.innerHTML = '<div class="flex flex-col items-center justify-center gap-2 text-gray-300" style="min-height:300px"><p class="text-sm font-semibold text-gray-400">Tidak cukup data untuk perbandingan.</p></div>';
                if (legendEl) legendEl.innerHTML = '';
                if (insightBox) insightBox.classList.add('hidden');
                return;
            }

            const W   = container.offsetWidth || 640;

            // ════════════════════════════════════════════════════════
            // MODE: BAR CHART
            // ════════════════════════════════════════════════════════
            if (window._trendView === 'bar') {
                const H    = Math.max(300, 200 + entries.length * 2);
                const PAD  = { top: 24, right: 30, bottom: 64, left: 52 };
                const PW   = W - PAD.left - PAD.right;
                const PH   = H - PAD.top  - PAD.bottom;
                const n    = entries.length;
                const showNilai = metric === 'both' || metric === 'nilai';
                const showInteg = metric === 'both' || metric === 'integ';
                const barsPerGroup = (showNilai && showInteg) ? 2 : 1;
                const groupW = PW / n;
                const barW   = Math.max(8, Math.min(36, groupW / (barsPerGroup + 1)));
                const gap    = barsPerGroup === 2 ? barW * 0.25 : 0;

                let svg = `<svg width="${W}" height="${H}" style="font-family:inherit;overflow:visible" xmlns="http://www.w3.org/2000/svg">`;

                // Grid
                [0,25,50,75,100].forEach(tick => {
                    const y = PAD.top + PH - (tick / 100) * PH;
                    svg += `<line x1="${PAD.left}" y1="${y}" x2="${PAD.left+PW}" y2="${y}" stroke="${tick===0?'#9ca3af':'#e5e7eb'}" stroke-width="${tick===0?1.5:1}" stroke-dasharray="${tick===0?'':'4,3'}"/>`;
                    svg += `<text x="${PAD.left-6}" y="${y+4}" text-anchor="end" font-size="10" fill="#9ca3af">${tick}</text>`;
                });

                entries.forEach((e, i) => {
                    const gx = PAD.left + i * groupW + groupW / 2;
                    const totalBarsW = barsPerGroup * barW + (barsPerGroup - 1) * gap;
                    const startX = gx - totalBarsW / 2;
                    const clr = e.color;

                    if (showNilai) {
                        const bx = startX;
                        const bh = (e.nilai / 100) * PH;
                        const by = PAD.top + PH - bh;
                        const c  = e.nilai >= 75 ? '#6366f1' : e.nilai >= 50 ? '#a5b4fc' : '#c7d2fe';
                        svg += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" fill="${c}" rx="4" opacity="0.9"
                            data-label="${e.label.replace(/"/g,'&quot;')}" data-nilai="${e.nilai}" data-integ="${e.integ}" data-count="${e.count}" data-dq="${e.dqCount}" data-viol="${e.avgViol}"
                            onmouseenter="window._trendHover(event,this)" onmouseleave="window._trendOut()"/>`;
                        if (barW >= 14) svg += `<text x="${(bx + barW/2).toFixed(1)}" y="${(by - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="#6366f1" font-weight="700">${e.nilai}</text>`;
                    }
                    if (showInteg) {
                        const bx = showNilai ? startX + barW + gap : startX;
                        const bh = (e.integ / 100) * PH;
                        const by = PAD.top + PH - bh;
                        const c  = e.integ >= 80 ? '#10b981' : e.integ >= 60 ? '#34d399' : e.integ >= 40 ? '#f59e0b' : '#ef4444';
                        svg += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" fill="${c}" rx="4" opacity="0.9"
                            data-label="${e.label.replace(/"/g,'&quot;')}" data-nilai="${e.nilai}" data-integ="${e.integ}" data-count="${e.count}" data-dq="${e.dqCount}" data-viol="${e.avgViol}"
                            onmouseenter="window._trendHover(event,this)" onmouseleave="window._trendOut()"/>`;
                        if (barW >= 14) svg += `<text x="${(bx + barW/2).toFixed(1)}" y="${(by - 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="#10b981" font-weight="700">${e.integ}</text>`;
                    }
                    // X label
                    const lx = gx;
                    const ly = PAD.top + PH + 14;
                    const shortLabel = e.label.length > 20 ? e.label.slice(0,19) + '…' : e.label;
                    if (n > 4) {
                        svg += `<text transform="rotate(-30,${lx},${ly})" x="${lx}" y="${ly}" text-anchor="end" font-size="9" fill="#6b7280">${shortLabel}</text>`;
                    } else {
                        svg += `<text x="${lx}" y="${ly}" text-anchor="middle" font-size="10" fill="#6b7280">${shortLabel}</text>`;
                    }
                });

                svg += `<line x1="${PAD.left}" y1="${PAD.top+PH}" x2="${PAD.left+PW}" y2="${PAD.top+PH}" stroke="#9ca3af" stroke-width="1.5"/>`;
                svg += `<line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top+PH}" stroke="#9ca3af" stroke-width="1.5"/>`;
                svg += `<text transform="rotate(-90)" x="${-(PAD.top+PH/2)}" y="13" text-anchor="middle" font-size="10" font-weight="600" fill="#6b7280">Rata-rata →</text>`;
                svg += '</svg>';
                container.innerHTML = svg;
                container.style.minHeight = H + 'px';

                // Legend bar
                if (legendEl) {
                    const items = [];
                    if (showNilai) items.push(`<span class="flex items-center gap-1.5"><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#6366f1"></span><span class="text-gray-600">Rata-rata Nilai Ujian</span></span>`);
                    if (showInteg) items.push(`<span class="flex items-center gap-1.5"><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#10b981"></span><span class="text-gray-600">Rata-rata Skor Integritas</span></span>`);
                    legendEl.innerHTML = items.join('');
                }

            // ════════════════════════════════════════════════════════
            // MODE: SCATTER LINTAS JADWAL
            // Sumbu X = Rata-rata Nilai, Sumbu Y = Rata-rata Integritas
            // Setiap titik = 1 jadwal atau 1 jadwal×kelas
            // ════════════════════════════════════════════════════════
            } else {
                const H    = 360;
                const PAD  = { top: 30, right: 50, bottom: 60, left: 56 };
                const PW   = W - PAD.left - PAD.right;
                const PH   = H - PAD.top  - PAD.bottom;

                let svg = `<svg width="${W}" height="${H}" style="font-family:inherit;overflow:visible" xmlns="http://www.w3.org/2000/svg">`;

                // Kuadran latar belakang
                const mx = PAD.left + PW / 2;
                const my = PAD.top  + PH / 2;
                svg += `<rect x="${PAD.left}" y="${PAD.top}" width="${PW/2}" height="${PH/2}" fill="#fef9c3" opacity="0.35"/>`;  // kiri atas — perlu bimbingan
                svg += `<rect x="${mx}" y="${PAD.top}" width="${PW/2}" height="${PH/2}" fill="#dcfce7" opacity="0.4"/>`;          // kanan atas — ideal
                svg += `<rect x="${PAD.left}" y="${my}" width="${PW/2}" height="${PH/2}" fill="#f1f5f9" opacity="0.5"/>`;          // kiri bawah — evaluasi
                svg += `<rect x="${mx}" y="${my}" width="${PW/2}" height="${PH/2}" fill="#fee2e2" opacity="0.35"/>`;               // kanan bawah — perlu dicermati

                // Label kuadran
                svg += `<text x="${PAD.left+6}" y="${PAD.top+14}" font-size="9" fill="#ca8a04" font-weight="700" opacity="0.8">↖ Perlu Bimbingan</text>`;
                svg += `<text x="${mx+6}" y="${PAD.top+14}" font-size="9" fill="#16a34a" font-weight="700" opacity="0.8">↗ Ideal ✓</text>`;
                svg += `<text x="${PAD.left+6}" y="${PAD.top+PH-6}" font-size="9" fill="#64748b" font-weight="700" opacity="0.8">↙ Evaluasi</text>`;
                svg += `<text x="${mx+6}" y="${PAD.top+PH-6}" font-size="9" fill="#dc2626" font-weight="700" opacity="0.8">↘ Perlu Dicermati</text>`;

                // Grid garis tengah
                svg += `<line x1="${mx}" y1="${PAD.top}" x2="${mx}" y2="${PAD.top+PH}" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>`;
                svg += `<line x1="${PAD.left}" y1="${my}" x2="${PAD.left+PW}" y2="${my}" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>`;

                // Grid & axis ticks
                [0,25,50,75,100].forEach(tick => {
                    // Y axis
                    const y = PAD.top + PH - (tick / 100) * PH;
                    svg += `<line x1="${PAD.left-3}" y1="${y}" x2="${PAD.left}" y2="${y}" stroke="#9ca3af" stroke-width="1"/>`;
                    svg += `<text x="${PAD.left-6}" y="${y+4}" text-anchor="end" font-size="9" fill="#9ca3af">${tick}</text>`;
                    // X axis
                    const x = PAD.left + (tick / 100) * PW;
                    svg += `<line x1="${x}" y1="${PAD.top+PH}" x2="${x}" y2="${PAD.top+PH+3}" stroke="#9ca3af" stroke-width="1"/>`;
                    svg += `<text x="${x}" y="${PAD.top+PH+14}" text-anchor="middle" font-size="9" fill="#9ca3af">${tick}</text>`;
                });

                // Axis border
                svg += `<rect x="${PAD.left}" y="${PAD.top}" width="${PW}" height="${PH}" fill="none" stroke="#d1d5db" stroke-width="1.5" rx="4"/>`;

                // Axis labels
                svg += `<text x="${PAD.left+PW/2}" y="${H-8}" text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Rata-rata Nilai Ujian →</text>`;
                svg += `<text transform="rotate(-90)" x="${-(PAD.top+PH/2)}" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#6b7280">Rata-rata Integritas →</text>`;

                // Radius ∝ jumlah siswa (size encoding)
                const maxCount = Math.max(...entries.map(e => e.count));
                const minR = 14, maxR = 32;

                entries.forEach((e, i) => {
                    const cx = PAD.left + (e.nilai / 100) * PW;
                    const cy = PAD.top  + PH - (e.integ / 100) * PH;
                    const r  = minR + (maxR - minR) * (e.count / maxCount);
                    const clr = e.color;
                    const shortLabel = e.label.length > 22 ? e.label.slice(0,21) + '…' : e.label;

                    // Shadow / glow circle
                    svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r+5).toFixed(1)}" fill="${clr}" opacity="0.12"/>`;
                    // Main circle
                    svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${clr}" opacity="0.9" stroke="white" stroke-width="2.5" style="cursor:pointer"
                        data-label="${e.label.replace(/"/g,'&quot;')}" data-nilai="${e.nilai}" data-integ="${e.integ}" data-count="${e.count}" data-dq="${e.dqCount}" data-viol="${e.avgViol}"
                        onmouseenter="window._trendHover(event,this)" onmouseleave="window._trendOut()"/>`;
                    // Nomor index di tengah
                    svg += `<text x="${cx.toFixed(1)}" y="${(cy+4).toFixed(1)}" text-anchor="middle" font-size="${Math.max(9,Math.round(r*0.55))}" font-weight="900" fill="white" pointer-events="none">${i+1}</text>`;
                    // Label bawah titik
                    svg += `<text x="${cx.toFixed(1)}" y="${(cy+r+13).toFixed(1)}" text-anchor="middle" font-size="9" fill="${clr}" font-weight="700" pointer-events="none">${shortLabel}</text>`;
                });

                svg += '</svg>';
                container.innerHTML = svg;
                container.style.minHeight = H + 'px';

                // Legend scatter (numbered)
                if (legendEl) {
                    legendEl.innerHTML = entries.map((e, i) =>
                        `<span class="flex items-center gap-1.5">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:${e.color};color:white;font-size:9px;font-weight:900">${i+1}</span>
                            <span class="text-gray-600">${e.label}</span>
                            <span class="text-gray-400">(${e.count} siswa)</span>
                        </span>`
                    ).join('');
                }
            }

            // ── Tooltip (shared both modes) ──
            let ttDiv = document.getElementById('trend-tooltip-div');
            if (!ttDiv) {
                ttDiv = document.createElement('div');
                ttDiv.id = 'trend-tooltip-div';
                ttDiv.className = 'hidden fixed z-[999] bg-gray-900 text-white text-xs rounded-xl shadow-xl px-3 py-2.5 pointer-events-none leading-relaxed';
                ttDiv.style.maxWidth = '230px';
                document.body.appendChild(ttDiv);
            }
            window._trendHover = function(ev, el) {
                ttDiv.classList.remove('hidden');
                const nilaiVal = Number(el.dataset.nilai);
                const integVal = Number(el.dataset.integ);
                const nilaiColor = nilaiVal >= 75 ? '#a5b4fc' : nilaiVal >= 50 ? '#c4b5fd' : '#fca5a5';
                const integColor = integVal >= 80 ? '#6ee7b7' : integVal >= 60 ? '#fde68a' : '#fca5a5';
                const dqN = Number(el.dataset.dq||0);
                ttDiv.innerHTML = `
                    <div class="font-bold mb-1.5 text-white border-b border-white/20 pb-1">${el.dataset.label}</div>
                    <div class="flex items-center justify-between gap-3 mb-0.5">
                        <span class="text-gray-400">Rata-rata Nilai</span>
                        <b style="color:${nilaiColor}">${el.dataset.nilai}</b>
                    </div>
                    <div class="flex items-center justify-between gap-3 mb-0.5">
                        <span class="text-gray-400">Rata-rata Integritas</span>
                        <b style="color:${integColor}">${el.dataset.integ}</b>
                    </div>
                    <div class="flex items-center justify-between gap-3 mb-0.5">
                        <span class="text-gray-400">Rata-rata Pelanggaran</span>
                        <b class="text-amber-300">${el.dataset.viol}×</b>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                        <span class="text-gray-400">Diskualifikasi</span>
                        <b class="text-red-400">${dqN} siswa</b>
                    </div>
                    <div class="text-gray-500 mt-1.5 pt-1 border-t border-white/10">${el.dataset.count} siswa ikut ujian</div>`;
            };
            window._trendOut = function() { ttDiv.classList.add('hidden'); };
            document.addEventListener('mousemove', function(ev) {
                if (!ttDiv.classList.contains('hidden')) {
                    ttDiv.style.left = (ev.clientX + 16) + 'px';
                    ttDiv.style.top  = (ev.clientY - 10) + 'px';
                }
            }, { passive: true });

            // ── Insight Naratif Otomatis ──
            if (insightBox && insightContent && entries.length >= 2) {
                const bestNilai   = entries.reduce((a,b) => a.nilai  >= b.nilai  ? a : b);
                const bestInteg   = entries.reduce((a,b) => a.integ  >= b.integ  ? a : b);
                const worstInteg  = entries.reduce((a,b) => a.integ  <= b.integ  ? a : b);
                const worstNilai  = entries.reduce((a,b) => a.nilai  <= b.nilai  ? a : b);
                const allGood     = entries.every(e => e.integ >= 80);
                const diffNilai   = Math.abs(bestNilai.nilai  - worstNilai.nilai);
                const diffInteg   = Math.abs(bestInteg.integ  - worstInteg.integ);
                const totalDQ     = entries.reduce((a,e) => a + e.dqCount, 0);

                let html = '';
                // Jadwal terbaik keseluruhan (nilai + integritas tinggi)
                const idealScore = entries.map(e => ({ ...e, combined: e.nilai * 0.5 + e.integ * 0.5 }));
                const topJadwal  = idealScore.reduce((a,b) => a.combined >= b.combined ? a : b);
                html += `<div class="flex items-start gap-2"><span class="text-emerald-600 font-black shrink-0">🏆</span><span><strong>${topJadwal.label}</strong> adalah jadwal/kelompok terbaik secara keseluruhan — nilai rata-rata <strong>${topJadwal.nilai}</strong> dan integritas rata-rata <strong>${topJadwal.integ}</strong>.</span></div>`;

                if (bestNilai.label !== bestInteg.label) {
                    html += `<div class="flex items-start gap-2"><span class="text-indigo-500 font-black shrink-0">📊</span><span>Nilai ujian tertinggi diraih <strong>${bestNilai.label}</strong> (${bestNilai.nilai}), sedangkan integritas terbaik ada di <strong>${bestInteg.label}</strong> (${bestInteg.integ}) — keduanya berbeda jadwal/kelompok.</span></div>`;
                } else {
                    html += `<div class="flex items-start gap-2"><span class="text-emerald-500 font-black shrink-0">✅</span><span><strong>${bestNilai.label}</strong> unggul di <em>kedua</em> dimensi — nilai tertinggi sekaligus integritas terbaik.</span></div>`;
                }

                if (diffInteg >= 15) {
                    html += `<div class="flex items-start gap-2"><span class="text-amber-500 font-black shrink-0">⚠️</span><span>Kesenjangan integritas antar jadwal cukup besar (<strong>${diffInteg} poin</strong>). <strong>${worstInteg.label}</strong> perlu perhatian khusus (integritas rata-rata <strong>${worstInteg.integ}</strong>).</span></div>`;
                }
                if (diffNilai >= 15) {
                    html += `<div class="flex items-start gap-2"><span class="text-blue-500 font-black shrink-0">📉</span><span>Selisih nilai antar jadwal mencapai <strong>${diffNilai} poin</strong>. Jadwal <strong>${worstNilai.label}</strong> (${worstNilai.nilai}) mungkin perlu evaluasi materi atau kesulitan soal.</span></div>`;
                }
                if (allGood) {
                    html += `<div class="flex items-start gap-2"><span class="text-emerald-600 font-black shrink-0">🎉</span><span>Semua jadwal mencapai integritas ≥ 80 — kualitas penyelenggaraan ujian sangat baik secara keseluruhan!</span></div>`;
                }
                if (totalDQ > 0) {
                    html += `<div class="flex items-start gap-2"><span class="text-red-500 font-black shrink-0">❌</span><span>Total <strong>${totalDQ} siswa diskualifikasi</strong> lintas semua jadwal yang ditampilkan. Pertimbangkan evaluasi pengawasan atau kondisi ruang ujian.</span></div>`;
                }

                insightContent.innerHTML = html;
                insightBox.classList.remove('hidden');
            } else if (insightBox) {
                insightBox.classList.add('hidden');
            }

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ══════════════════════════════════════════════════════════════════
        // ★★★ TREN LONGITUDINAL PER SISWA — Data berbasis bukti karakter ★★★
        // Melacak perkembangan Skor Integritas & Nilai seorang siswa
        // lintas semua ujian yang pernah diikutinya (berdasarkan NISN/nama+kelas).
        // ══════════════════════════════════════════════════════════════════

        // Palet warna siswa (max 5 siswa dibandingkan sekaligus)
        const LONG_PALETTE = ['#0d9488','#6366f1','#f59e0b','#ec4899','#8b5cf6'];

        // State: daftar siswa yang sedang ditampilkan (max 5)
        window._longSelectedSiswa = []; // array of { nisn, name, class, color }
        window._longMetric = 'integ';
        window._longAllSiswaList = []; // cache flat list siswa unik dari semua jadwal

        // ── Build daftar siswa unik dari SEMUA data ujian selesai ──
        window._longBuildSiswaList = function() {
            const filterKelas = (document.getElementById('long-filter-kelas')?.value) || 'all';
            const rawAll = (window._allDashboardData || dashboardData || []);
            const finished = rawAll.filter(d => d.status !== 'SEDANG MENGERJAKAN');

            // Kumpulkan kelas unik untuk dropdown
            const kelasSet = new Set();
            finished.forEach(d => { if (d.className) kelasSet.add(d.className); });
            const kelasEl = document.getElementById('long-filter-kelas');
            if (kelasEl) {
                const prev = kelasEl.value;
                while (kelasEl.options.length > 1) kelasEl.remove(1);
                [...kelasSet].sort().forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k; opt.textContent = k;
                    kelasEl.appendChild(opt);
                });
                if (prev && kelasEl.querySelector(`option[value="${prev}"]`)) kelasEl.value = prev;
            }

            // Bangun list siswa unik: kunci = NISN || nama+kelas
            const siswaMap = {};
            finished.forEach(d => {
                const key = d.studentNisn
                    ? String(d.studentNisn).trim()
                    : `${(d.studentName||'').toLowerCase().trim()}||${(d.className||'').trim()}`;
                if (!siswaMap[key]) {
                    siswaMap[key] = {
                        key,
                        nisn:  d.studentNisn || '',
                        name:  d.studentName || '—',
                        kelas: d.className   || '—',
                    };
                }
            });

            let list = Object.values(siswaMap).sort((a,b) => a.name.localeCompare(b.name));
            if (filterKelas !== 'all') list = list.filter(s => s.kelas === filterKelas);
            window._longAllSiswaList = list;
            return list;
        };

        // ── Ambil semua data ujian untuk 1 siswa ──
        window._longGetSiswaTimeline = function(siswaKey) {
            const rawAll = (window._allDashboardData || dashboardData || []);
            const finished = rawAll.filter(d => d.status !== 'SEDANG MENGERJAKAN');

            const jadwalMap = {};
            (window.allJadwalDB || []).forEach(j => { jadwalMap[j.id] = j; });

            // Cocokkan record siswa
            const records = finished.filter(d => {
                const key = d.studentNisn
                    ? String(d.studentNisn).trim()
                    : `${(d.studentName||'').toLowerCase().trim()}||${(d.className||'').trim()}`;
                return key === siswaKey;
            });

            // Urutkan berdasarkan waktu (startTime atau timestamp)
            records.sort((a,b) => (a.startTime||a.timestamp||0) - (b.startTime||b.timestamp||0));

            return records.map((d, i) => {
                const jObj   = jadwalMap[d.sesiId] || null;
                const jNama  = jObj?.nama || d.sesiName || d.paketNama || `Ujian ${i+1}`;
                const integ  = calcIntegrityScore(d);
                const nilai  = typeof d.score === 'number' ? d.score : parseFloat(d.score || 0);
                const ts     = d.startTime || d.timestamp || 0;
                const tglStr = ts ? new Date(ts).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'2-digit' }) : '—';
                return {
                    label:      jNama,
                    tgl:        tglStr,
                    integ:      integ ?? 0,
                    nilai:      isNaN(nilai) ? 0 : Math.round(nilai),
                    violations: d.violations || 0,
                    isDQ:       (d.status||'').includes('DISKUALIFIKASI'),
                    raw:        d,
                };
            });
        };

        // ── Debounce pencarian siswa ──
        let _longSearchTimer = null;
        window._longSearchDebounce = function(val) {
            clearTimeout(_longSearchTimer);
            _longSearchTimer = setTimeout(() => window._longShowAutocomplete(val), 200);
        };

        window._longShowAutocomplete = function(val) {
            const ac = document.getElementById('long-autocomplete');
            if (!ac) return;
            const q = (val||'').trim().toLowerCase();
            if (!q) { ac.classList.add('hidden'); return; }

            window._longBuildSiswaList();
            const matches = window._longAllSiswaList.filter(s =>
                s.name.toLowerCase().includes(q) || String(s.nisn).includes(q)
            ).slice(0, 30);

            if (matches.length === 0) {
                ac.innerHTML = '<p class="px-4 py-3 text-xs text-gray-400 italic">Siswa tidak ditemukan</p>';
            } else {
                ac.innerHTML = matches.map(s => {
                    const alreadyAdded = window._longSelectedSiswa.some(x => x.key === s.key);
                    return `<button onclick="window._longSelectSiswa('${s.key.replace(/'/g,"\\'")}','${s.name.replace(/'/g,"\\'")}','${s.kelas.replace(/'/g,"\\'")}','${s.nisn}')"
                        class="w-full text-left px-4 py-2.5 hover:bg-teal-50 flex items-center justify-between gap-3 transition-colors ${alreadyAdded ? 'opacity-40 cursor-not-allowed' : ''}">
                        <div>
                            <span class="text-sm font-bold text-gray-800">${escapeHtml(s.name)}</span>
                            <span class="text-[11px] text-gray-400 ml-2">${escapeHtml(s.kelas)}</span>
                        </div>
                        ${s.nisn ? `<span class="text-[10px] font-mono text-gray-400 shrink-0">${escapeHtml(String(s.nisn))}</span>` : ''}
                    </button>`;
                }).join('');
            }
            ac.classList.remove('hidden');

            // Posisikan di bawah input
            const input = document.getElementById('long-siswa-search');
            if (input) {
                const rect = input.getBoundingClientRect();
                ac.style.position = 'fixed';
                ac.style.top  = (rect.bottom + 4) + 'px';
                ac.style.left = rect.left + 'px';
                ac.style.width = rect.width + 'px';
            }

            // Tutup saat klik luar
            setTimeout(() => {
                document.addEventListener('click', function _closeAC(e) {
                    if (!ac.contains(e.target) && e.target.id !== 'long-siswa-search') {
                        ac.classList.add('hidden');
                        document.removeEventListener('click', _closeAC);
                    }
                });
            }, 50);
        };

        window._longSelectSiswa = function(key, name, kelas, nisn) {
            if (window._longSelectedSiswa.some(x => x.key === key)) return; // sudah ada
            if (window._longSelectedSiswa.length >= 5) {
                alert('Maksimal 5 siswa dapat dibandingkan sekaligus. Hapus salah satu siswa terlebih dahulu.');
                return;
            }
            const color = LONG_PALETTE[window._longSelectedSiswa.length];
            window._longSelectedSiswa.push({ key, name, kelas, nisn, color });
            document.getElementById('long-autocomplete')?.classList.add('hidden');
            const input = document.getElementById('long-siswa-search');
            if (input) input.value = '';
            window.renderLongitudinalChart();
        };

        window._longRemoveSiswa = function(key) {
            window._longSelectedSiswa = window._longSelectedSiswa.filter(x => x.key !== key);
            // Reassign warna setelah remove
            window._longSelectedSiswa.forEach((s, i) => { s.color = LONG_PALETTE[i]; });
            window.renderLongitudinalChart();
        };

        window.resetLongitudinal = function() {
            window._longSelectedSiswa = [];
            const input = document.getElementById('long-siswa-search');
            if (input) input.value = '';
            window.renderLongitudinalChart();
        };

        // ── RENDER UTAMA ──
        window.renderLongitudinalChart = function() {
            const container  = document.getElementById('long-chart-container');
            const legendEl   = document.getElementById('long-chart-legend');
            const insightBox = document.getElementById('long-insight-box');
            const insightContent = document.getElementById('long-insight-content');
            const chipsEl    = document.getElementById('long-selected-chips');
            const summaryDiv = document.getElementById('long-summary-table');
            if (!container) return;

            const metric      = window._longMetric || 'integ';
            const compareMode = (document.getElementById('long-compare-mode')?.value) || 'none';

            // ── Update tab metric button styles ──
            ['integ','nilai','both'].forEach(k => {
                const btn = document.getElementById('long-tab-' + k);
                if (!btn) return;
                btn.className = k === metric
                    ? 'px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-white/30 transition-all'
                    : 'px-3 py-1.5 rounded-lg text-xs font-bold text-white/70 hover:bg-white/20 transition-all';
            });

            // ── Chips siswa yang dipilih ──
            if (chipsEl) {
                if (window._longSelectedSiswa.length === 0) {
                    chipsEl.classList.add('hidden');
                    chipsEl.innerHTML = '';
                } else {
                    chipsEl.classList.remove('hidden');
                    chipsEl.style.display = 'flex';
                    chipsEl.innerHTML = window._longSelectedSiswa.map(s => `
                        <span style="background:${s.color}15;border:1.5px solid ${s.color};color:${s.color}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold">
                            <span style="width:8px;height:8px;border-radius:50%;background:${s.color};display:inline-block"></span>
                            ${escapeHtml(s.name)}
                            <span class="text-gray-400 font-normal">${escapeHtml(s.kelas)}</span>
                            <button onclick="window._longRemoveSiswa('${s.key.replace(/'/g,"\\'")}');" style="color:${s.color};opacity:0.6;font-weight:900;margin-left:2px" class="hover:opacity-100 transition-opacity">✕</button>
                        </span>`).join('');
                }
            }

            // ── Tidak ada siswa dipilih ──
            if (window._longSelectedSiswa.length === 0) {
                container.innerHTML = `<div class="flex flex-col items-center justify-center gap-3 text-gray-300" style="min-height:300px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#99f6e4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <p class="text-sm font-bold text-gray-400">Cari nama siswa di atas untuk melihat grafik perkembangannya</p>
                    <p class="text-xs text-gray-300">Bisa memilih hingga 5 siswa untuk dibandingkan sekaligus</p>
                </div>`;
                if (legendEl) legendEl.innerHTML = '';
                if (insightBox) insightBox.classList.add('hidden');
                if (summaryDiv) summaryDiv.classList.add('hidden');
                return;
            }

            // ── Bangun data timeline tiap siswa ──
            const siswaData = window._longSelectedSiswa.map(s => ({
                ...s,
                timeline: window._longGetSiswaTimeline(s.key),
            })).filter(s => s.timeline.length > 0);

            if (siswaData.length === 0) {
                container.innerHTML = `<div class="flex flex-col items-center justify-center gap-2 text-gray-300" style="min-height:300px">
                    <p class="text-sm font-semibold text-gray-400">Belum ada data ujian selesai untuk siswa yang dipilih.</p>
                </div>`;
                if (insightBox) insightBox.classList.add('hidden');
                if (summaryDiv) summaryDiv.classList.add('hidden');
                return;
            }

            // ── Kumpulkan semua label ujian (X axis) ──
            // Gabungkan semua jadwal yang muncul, urutkan berdasarkan waktu pertama muncul
            const labelOrder = [];
            const labelSeen  = new Set();
            siswaData.forEach(s => {
                s.timeline.forEach(t => {
                    if (!labelSeen.has(t.label)) { labelOrder.push(t.label); labelSeen.add(t.label); }
                });
            });

            // ── Hitung rata-rata kelas / sekolah per label untuk garis pembanding ──
            let compareLines = {}; // label → nilai
            if (compareMode !== 'none') {
                const rawAll = (window._allDashboardData || dashboardData || []);
                const finished = rawAll.filter(d => d.status !== 'SEDANG MENGERJAKAN');
                const jadwalMap = {};
                (window.allJadwalDB || []).forEach(j => { jadwalMap[j.id] = j; });

                // Siswa pertama sebagai referensi kelas
                const refSiswa = window._longSelectedSiswa[0];

                labelOrder.forEach(lbl => {
                    let pool = finished.filter(d => {
                        const j = jadwalMap[d.sesiId];
                        const jNama = j?.nama || d.sesiName || d.paketNama || '';
                        return jNama === lbl;
                    });
                    if (compareMode === 'class') {
                        pool = pool.filter(d => d.className === refSiswa.kelas);
                    }
                    if (pool.length === 0) return;
                    const scores = pool.map(d => {
                        const v = metric === 'integ' ? calcIntegrityScore(d) : (typeof d.score === 'number' ? d.score : parseFloat(d.score));
                        return (v != null && !isNaN(v)) ? v : null;
                    }).filter(v => v !== null);
                    if (scores.length > 0) {
                        compareLines[lbl] = Math.round(scores.reduce((a,b)=>a+b,0) / scores.length);
                    }
                });
            }

            // ── Render SVG line chart ──
            const W   = Math.max(container.offsetWidth || 680, 400);
            const H   = 340;
            const PAD = { top: 30, right: 50, bottom: 65, left: 52 };
            const PW  = W - PAD.left - PAD.right;
            const PH  = H - PAD.top  - PAD.bottom;
            const n   = labelOrder.length;

            let svg = `<svg width="${W}" height="${H}" style="font-family:inherit;overflow:visible" xmlns="http://www.w3.org/2000/svg">`;

            // ── Grid horizontal (0,25,50,75,100) ──
            [0,25,50,75,100].forEach(tick => {
                const y = PAD.top + PH - (tick/100)*PH;
                svg += `<line x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${PAD.left+PW}" y2="${y.toFixed(1)}" stroke="#e2e8f0" stroke-width="${tick===0||tick===100?1.5:1}" stroke-dasharray="${tick%50===0?'none':'3,3'}"/>`;
                svg += `<text x="${PAD.left-6}" y="${(y+4).toFixed(1)}" text-anchor="end" font-size="9" fill="#9ca3af">${tick}</text>`;
            });

            // ── KKM / zona integritas line ──
            const kkm = window.currentKKM || 75;
            const kkmY = PAD.top + PH - (kkm/100)*PH;
            svg += `<line x1="${PAD.left}" y1="${kkmY.toFixed(1)}" x2="${PAD.left+PW}" y2="${kkmY.toFixed(1)}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.7"/>`;
            svg += `<text x="${PAD.left+PW+3}" y="${(kkmY+4).toFixed(1)}" font-size="8.5" fill="#f59e0b" font-weight="700">${metric==='nilai'?'KKM':'Min'}</text>`;

            // Axes
            svg += `<line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top+PH}" stroke="#cbd5e1" stroke-width="1.5"/>`;
            svg += `<line x1="${PAD.left}" y1="${PAD.top+PH}" x2="${PAD.left+PW}" y2="${PAD.top+PH}" stroke="#cbd5e1" stroke-width="1.5"/>`;

            // Axis labels
            const yLabel = metric === 'integ' ? 'Skor Integritas' : metric === 'nilai' ? 'Nilai Ujian' : 'Skor (0–100)';
            svg += `<text transform="rotate(-90)" x="${-(PAD.top+PH/2)}" y="13" text-anchor="middle" font-size="9.5" font-weight="600" fill="#64748b">${yLabel}</text>`;

            // ── X-axis labels (jadwal/ujian) ──
            const step = n > 1 ? PW / (n - 1) : PW / 2;
            const getX = i => n > 1 ? PAD.left + i * step : PAD.left + PW/2;

            labelOrder.forEach((lbl, i) => {
                const x = getX(i);
                svg += `<line x1="${x.toFixed(1)}" y1="${PAD.top}" x2="${x.toFixed(1)}" y2="${(PAD.top+PH).toFixed(1)}" stroke="#f1f5f9" stroke-width="1"/>`;
                const short = lbl.length > 18 ? lbl.slice(0,17)+'…' : lbl;
                svg += `<text transform="rotate(-35,${x.toFixed(1)},${(PAD.top+PH+14).toFixed(1)})" x="${x.toFixed(1)}" y="${(PAD.top+PH+14).toFixed(1)}" text-anchor="end" font-size="9" fill="#6b7280">${escapeHtml(short)}</text>`;
            });

            // ── Garis pembanding (rata-rata kelas/sekolah) ──
            if (compareMode !== 'none' && Object.keys(compareLines).length >= 1) {
                const pts = labelOrder.map((lbl, i) => {
                    const v = compareLines[lbl];
                    if (v == null) return null;
                    return { x: getX(i), y: PAD.top + PH - (Math.min(v,100)/100)*PH, v };
                }).filter(Boolean);
                if (pts.length >= 2) {
                    const d = pts.map((p,i) => `${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                    svg += `<path d="${d}" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.65"/>`;
                    pts.forEach(p => {
                        svg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="white" stroke="#94a3b8" stroke-width="1.5" opacity="0.8"/>`;
                        svg += `<text x="${p.x.toFixed(1)}" y="${(p.y-8).toFixed(1)}" text-anchor="middle" font-size="8" fill="#94a3b8" font-weight="700">${p.v}</text>`;
                    });
                }
            }

            // ── Garis setiap siswa ──
            siswaData.forEach(s => {
                const timelineMap = {};
                s.timeline.forEach(t => { timelineMap[t.label] = t; });

                const points = labelOrder.map((lbl, i) => {
                    const t = timelineMap[lbl];
                    if (!t) return null;
                    const v = metric === 'integ' ? t.integ : metric === 'nilai' ? t.nilai : (t.integ + t.nilai) / 2;
                    const y = PAD.top + PH - (Math.min(v,100)/100)*PH;
                    return { x: getX(i), y, v, t, i };
                });

                // Garis (hanya segmen antar titik yang ada)
                let pathD = '';
                let prevPt = null;
                points.forEach(pt => {
                    if (!pt) { prevPt = null; return; }
                    if (prevPt) {
                        // Garis kurva smooth (cubic bezier)
                        const cpX = (prevPt.x + pt.x) / 2;
                        pathD += `C${cpX.toFixed(1)},${prevPt.y.toFixed(1)} ${cpX.toFixed(1)},${pt.y.toFixed(1)} ${pt.x.toFixed(1)},${pt.y.toFixed(1)} `;
                    } else {
                        pathD += `M${pt.x.toFixed(1)},${pt.y.toFixed(1)} `;
                    }
                    prevPt = pt;
                });
                if (pathD) {
                    svg += `<path d="${pathD}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>`;
                    // Area fill subtle
                    const firstPt = points.find(Boolean);
                    const lastPt  = [...points].reverse().find(Boolean);
                    if (firstPt && lastPt) {
                        const areaD = pathD + ` L${lastPt.x.toFixed(1)},${(PAD.top+PH).toFixed(1)} L${firstPt.x.toFixed(1)},${(PAD.top+PH).toFixed(1)} Z`;
                        svg += `<path d="${areaD}" fill="${s.color}" opacity="0.06"/>`;
                    }
                }

                // Titik data
                points.forEach(pt => {
                    if (!pt) return;
                    const isDQ2 = pt.t.isDQ;
                    const c = s.color;
                    const ptLabel = `${escapeHtml(s.name)} — ${escapeHtml(pt.t.label)} (${pt.t.tgl})\\nIntegritas: ${pt.t.integ}  Nilai: ${pt.t.nilai}  Pelang: ${pt.t.violations}`;
                    svg += `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="7" fill="${isDQ2?'#ef4444':c}" stroke="white" stroke-width="2" opacity="${isDQ2?0.9:0.95}" style="cursor:pointer"
                        data-tip="${ptLabel.replace(/"/g,'&quot;')}"
                        onmouseenter="window._longTipShow(event,this)" onmouseleave="window._longTipHide()"/>`;
                    // Nilai di atas titik
                    const dispV = metric === 'integ' ? pt.t.integ : metric === 'nilai' ? pt.t.nilai : Math.round((pt.t.integ+pt.t.nilai)/2);
                    svg += `<text x="${pt.x.toFixed(1)}" y="${(pt.y-11).toFixed(1)}" text-anchor="middle" font-size="9" fill="${isDQ2?'#ef4444':c}" font-weight="800">${isDQ2?'DQ':dispV}</text>`;
                });
            });

            svg += '</svg>';
            container.innerHTML = svg;
            container.style.minHeight = '';

            // ── Tooltip ──
            let longTip = document.getElementById('long-tooltip-div');
            if (!longTip) {
                longTip = document.createElement('div');
                longTip.id = 'long-tooltip-div';
                longTip.className = 'hidden fixed z-[999] bg-gray-900 text-white text-xs rounded-xl shadow-xl px-3 py-2.5 pointer-events-none leading-relaxed';
                longTip.style.maxWidth = '230px';
                document.body.appendChild(longTip);
            }
            window._longTipShow = function(ev, el) {
                const lines = el.dataset.tip.split('\\n');
                longTip.innerHTML = lines.map((l,i) => i===0
                    ? `<div class="font-bold mb-1 border-b border-white/20 pb-1">${l}</div>`
                    : `<div class="text-gray-300">${l}</div>`).join('');
                longTip.classList.remove('hidden');
            };
            window._longTipHide = function() { longTip.classList.add('hidden'); };
            document.addEventListener('mousemove', function(ev) {
                if (!longTip.classList.contains('hidden')) {
                    longTip.style.left = (ev.clientX + 16) + 'px';
                    longTip.style.top  = (ev.clientY - 10) + 'px';
                }
            }, { passive: true });

            // ── Legend ──
            if (legendEl) {
                let lgItems = siswaData.map(s => `
                    <span class="flex items-center gap-1.5">
                        <span style="display:inline-block;width:24px;height:3px;border-radius:2px;background:${s.color}"></span>
                        <span style="color:${s.color};font-weight:700">${escapeHtml(s.name)}</span>
                        <span class="text-gray-400">(${escapeHtml(s.kelas)})</span>
                    </span>`).join('');
                if (compareMode !== 'none') {
                    lgItems += `<span class="flex items-center gap-1.5">
                        <span style="display:inline-block;width:24px;height:3px;border-radius:2px;background:#94a3b8;border-top:1px dashed #94a3b8"></span>
                        <span class="text-gray-500">Rata-rata ${compareMode==='class'?'Kelas':'Sekolah'}</span>
                    </span>`;
                }
                legendEl.innerHTML = lgItems;
            }

            // ── Tabel rekap lintas ujian ──
            if (summaryDiv) {
                const headerEl = document.getElementById('long-table-header');
                const bodyEl   = document.getElementById('long-table-body');
                if (headerEl && bodyEl) {
                    headerEl.innerHTML = `<th class="px-3 py-2 text-left font-bold text-[10px] tracking-wider">Ujian / Jadwal</th>` +
                        siswaData.map(s => `<th class="px-3 py-2 text-center font-bold text-[10px] tracking-wider" style="color:${s.color}">${escapeHtml(s.name.split(' ')[0])}</th>`).join('');
                    bodyEl.innerHTML = labelOrder.map(lbl => {
                        const cols = siswaData.map(s => {
                            const t = s.timeline.find(x => x.label === lbl);
                            if (!t) return `<td class="px-3 py-2 text-center text-gray-300 text-[10px]">—</td>`;
                            const dispInt = t.isDQ ? '<span style="color:#ef4444;font-weight:900">DQ</span>' : `<span style="color:${t.integ>=80?'#16a34a':t.integ>=60?'#d97706':'#dc2626'};font-weight:800">${t.integ}</span>`;
                            const dispNil = `<span style="color:${t.nilai>=(window.currentKKM||75)?'#16a34a':'#dc2626'}">${t.nilai}</span>`;
                            return `<td class="px-3 py-2 text-center text-[11px]">${metric==='integ'?dispInt:metric==='nilai'?dispNil:dispInt+' / '+dispNil}</td>`;
                        }).join('');
                        return `<tr class="hover:bg-teal-50 transition-colors">
                            <td class="px-3 py-2 font-semibold text-gray-700 text-[11px]">${escapeHtml(lbl)}</td>
                            ${cols}
                        </tr>`;
                    }).join('');
                }
                summaryDiv.classList.remove('hidden');
            }

            // ── Insight Otomatis ──
            if (insightBox && insightContent) {
                let html = '';
                const hasMultiUjian = siswaData.some(s => s.timeline.length >= 2);

                siswaData.forEach(s => {
                    if (s.timeline.length < 2) {
                        html += `<div class="flex items-start gap-2"><span class="font-black shrink-0" style="color:${s.color}">ℹ️</span><span><strong style="color:${s.color}">${escapeHtml(s.name)}</strong> — baru mengikuti 1 ujian. Dibutuhkan minimal 2 ujian untuk melihat tren perkembangan.</span></div>`;
                        return;
                    }
                    const first = s.timeline[0];
                    const last  = s.timeline[s.timeline.length - 1];
                    const getV  = t => metric==='integ' ? t.integ : metric==='nilai' ? t.nilai : (t.integ+t.nilai)/2;
                    const delta = Math.round(getV(last) - getV(first));
                    const allInteg = s.timeline.map(t => t.integ);
                    const avgInteg = Math.round(allInteg.reduce((a,b)=>a+b,0)/allInteg.length);
                    const dqCnt    = s.timeline.filter(t => t.isDQ).length;
                    const trend    = delta > 5 ? '📈 meningkat' : delta < -5 ? '📉 menurun' : '➡️ stabil';
                    const bestT    = s.timeline.reduce((a,b) => getV(a)>=getV(b)?a:b);
                    const worstT   = s.timeline.reduce((a,b) => getV(a)<=getV(b)?a:b);

                    html += `<div class="p-3 rounded-xl border" style="background:${s.color}08;border-color:${s.color}30">
                        <p class="font-bold text-sm mb-1.5" style="color:${s.color}">${escapeHtml(s.name)} <span class="font-normal text-gray-500 text-xs">(${s.timeline.length} ujian)</span></p>
                        <p>Tren ${metric==='integ'?'integritas':metric==='nilai'?'nilai':'gabungan'}: <strong>${trend}</strong> — dari <strong>${Math.round(getV(first))}</strong> (${escapeHtml(first.label)}) ke <strong>${Math.round(getV(last))}</strong> (${escapeHtml(last.label)}), selisih <strong>${delta>=0?'+':''}${delta}</strong> poin.</p>
                        <p class="mt-1">Rata-rata integritas: <strong>${avgInteg}</strong>${avgInteg>=80?' ✅ Konsisten terpuji.':avgInteg>=60?' ⚠️ Perlu pendampingan.':' ❌ Perlu pembinaan intensif.'}</p>
                        ${bestT.label!==worstT.label?`<p class="mt-1">Performa terbaik: <strong>${escapeHtml(bestT.label)}</strong> (${Math.round(getV(bestT))}). Terlemah: <strong>${escapeHtml(worstT.label)}</strong> (${Math.round(getV(worstT))}).</p>`:''}
                        ${dqCnt>0?`<p class="mt-1 text-red-600 font-bold">⛔ ${dqCnt}× Diskualifikasi — prioritas pembinaan karakter.</p>`:''}
                    </div>`;
                });

                if (html) {
                    insightContent.innerHTML = html;
                    insightBox.classList.remove('hidden');
                } else {
                    insightBox.classList.add('hidden');
                }
            }

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ── Inisialisasi: panggil _longBuildSiswaList saat data dashboard diupdate ──
        const _origRenderIntegrityDash = window.renderIntegrityDashboard;
        window.renderIntegrityDashboard = function() {
            if (_origRenderIntegrityDash) _origRenderIntegrityDash.apply(this, arguments);
            // Refresh daftar siswa longitudinal secara background
            try { window._longBuildSiswaList(); } catch(e) {}
        };

        // ── ★ ASESMEN DIAGNOSTIK PER KD ──────────────────────────────────
        window.renderKDDiagnostic = function(withScores) {
            const container = document.getElementById('kd-diagnostic-body');
            if (!container) return;

            // Agregasi dari semua hasil ujian yang terfilter
            const kdAgg = {};
            (withScores || []).forEach(d => {
                if (!Array.isArray(d.kdReport)) return;
                d.kdReport.forEach(({ kd, benar, total }) => {
                    if (!kd || !total) return;
                    if (!kdAgg[kd]) kdAgg[kd] = { totalBenar: 0, totalSoal: 0, siswaCnt: 0 };
                    kdAgg[kd].totalBenar += (benar || 0);
                    kdAgg[kd].totalSoal  += total;
                    kdAgg[kd].siswaCnt++;
                });
            });

            // Simpan ke window untuk export
            window._lastKDData = kdAgg;

            const entries = Object.entries(kdAgg);
            if (entries.length === 0) {
                container.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-300 text-sm">
                    <p class="font-medium text-gray-400">Belum ada data KD.</p>
                    <p class="text-xs mt-1">Beri tag KD/TP pada soal di Bank Soal, lalu siswa selesaikan ujian.</p>
                </td></tr>`;
                return;
            }

            // Urutkan: terlemah dulu (% terkecil) agar guru fokus pada area remedial
            const sorted = entries
                .map(([kd, v]) => ({ kd, persen: Math.round((v.totalBenar / v.totalSoal) * 100), ...v }))
                .sort((a, b) => a.persen - b.persen);

            container.innerHTML = sorted.map(r => {
                const color   = r.persen >= 75 ? '#10b981' : r.persen >= 50 ? '#f59e0b' : '#ef4444';
                const bar     = `<div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div class="h-full rounded-full transition-all" style="width:${r.persen}%;background:${color}"></div>
                    </div>
                    <span class="text-xs text-gray-400 shrink-0">${r.totalBenar}/${r.totalSoal} benar</span>
                </div>`;
                const badge   = r.persen >= 75
                    ? `<span class="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold">✅ Kuat</span>`
                    : r.persen >= 50
                    ? `<span class="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold">⚠️ Sedang</span>`
                    : `<span class="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-bold">❌ Perlu Remedial</span>`;
                return `<tr class="border-b hover:bg-slate-50 transition-colors">
                    <td class="px-5 py-3 text-sm font-bold text-indigo-700">${_e(r.kd)}</td>
                    <td class="px-5 py-3">${bar}</td>
                    <td class="px-5 py-3 text-center font-black text-gray-800" style="color:${color}">${r.persen}%</td>
                    <td class="px-5 py-3 text-center text-xs text-gray-500">${r.siswaCnt} siswa</td>
                    <td class="px-5 py-3 text-center">${badge}</td>
                </tr>`;
            }).join('');

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // ── ★ EXPORT LAPORAN KD (Buka tab baru) ─────────────────────────
        window.exportKDReport = function() {
            const kdData = window._lastKDData;
            if (!kdData || Object.keys(kdData).length === 0) {
                return alert('Belum ada data KD untuk diekspor.\nPastikan soal sudah diberi tag KD dan siswa sudah menyelesaikan ujian.');
            }
            const rows = Object.entries(kdData)
                .map(([kd, v]) => ({ kd, persen: Math.round((v.totalBenar / v.totalSoal) * 100), ...v }))
                .sort((a, b) => a.persen - b.persen);

            const tglCetak = new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' });
            const jamCetak = new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });

            const rowsHtml = rows.map((r, i) => {
                const color  = r.persen >= 75 ? '#10b981' : r.persen >= 50 ? '#f59e0b' : '#ef4444';
                const status = r.persen >= 75 ? 'Kuat' : r.persen >= 50 ? 'Sedang' : 'Perlu Remedial';
                const barW   = r.persen;
                return `<tr>
                    <td style="text-align:center;font-weight:700;color:#9ca3af">${i+1}</td>
                    <td style="font-weight:800;color:#4338ca">${_e(r.kd)}</td>
                    <td>
                        <div style="display:flex;align-items:center;gap:8px">
                            <div style="flex:1;background:#f1f5f9;border-radius:99px;height:8px;overflow:hidden">
                                <div style="height:100%;border-radius:99px;background:${color};width:${barW}%"></div>
                            </div>
                            <span style="font-size:11px;color:#64748b;white-space:nowrap">${r.totalBenar}/${r.totalSoal}</span>
                        </div>
                    </td>
                    <td style="text-align:center;font-weight:900;color:${color};font-size:16px">${r.persen}%</td>
                    <td style="text-align:center;font-size:11px;color:#64748b">${r.siswaCnt} siswa</td>
                    <td style="text-align:center">
                        <span style="background:${r.persen>=75?'#d1fae5':r.persen>=50?'#fef3c7':'#fee2e2'};color:${color};padding:3px 10px;border-radius:99px;font-size:11px;font-weight:800">${status}</span>
                    </td>
                </tr>`;
            }).join('');

            const weakKDs = rows.filter(r => r.persen < 50).map(r => r.kd);
            const rekomendasiHtml = weakKDs.length > 0
                ? `<div style="margin-bottom:24px;padding:14px 18px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px">
                    <p style="font-size:12px;font-weight:900;color:#c2410c;margin-bottom:6px">⚠️ Rekomendasi Remedial</p>
                    <p style="font-size:12px;color:#9a3412;line-height:1.6">KD berikut perlu remedial/pengayaan karena penguasaan kelas di bawah 50%:<br>
                    <strong>${weakKDs.map(k => _e(k)).join(' &nbsp;·&nbsp; ')}</strong></p>
                  </div>`
                : `<div style="margin-bottom:24px;padding:14px 18px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px">
                    <p style="font-size:12px;font-weight:900;color:#166534">✅ Semua KD di atas 50% — tidak ada yang perlu remedial segera.</p>
                  </div>`;

            const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
<title>Laporan Diagnostik KD — INTEGRITEST</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#f8fafc;color:#1e293b;padding:32px}
  .card{background:#fff;border-radius:16px;border:1px solid #e2e8f0;box-shadow:0 1px 6px rgba(0,0,0,.06);padding:24px;margin-bottom:20px}
  table{width:100%;border-collapse:collapse}
  th{background:#f8fafc;padding:10px 14px;text-align:left;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #e2e8f0}
  td{padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;vertical-align:middle}
  @media print{body{padding:16px;background:#fff} .no-print{display:none!important}}
</style></head><body>
<div style="max-width:860px;margin:0 auto">
  <div class="card" style="background:linear-gradient(135deg,#4f46e5,#7c3aed);color:white;margin-bottom:24px">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <p style="font-size:11px;opacity:.7;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px">INTEGRITEST · Asesmen Diagnostik</p>
        <h1 style="font-size:22px;font-weight:900;margin-bottom:2px">Laporan Penguasaan KD / TP</h1>
        <p style="font-size:13px;opacity:.8">Merdeka Belajar — Profil Kompetensi Kelas</p>
      </div>
      <div style="text-align:right;font-size:11px;opacity:.75">
        <p>${tglCetak}</p><p>${jamCetak}</p>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
    <div class="card" style="text-align:center">
      <p style="font-size:28px;font-weight:900;color:#4f46e5">${rows.length}</p>
      <p style="font-size:11px;color:#64748b;margin-top:2px">Total KD Diuji</p>
    </div>
    <div class="card" style="text-align:center">
      <p style="font-size:28px;font-weight:900;color:#10b981">${rows.filter(r=>r.persen>=75).length}</p>
      <p style="font-size:11px;color:#64748b;margin-top:2px">KD Kuat (≥75%)</p>
    </div>
    <div class="card" style="text-align:center">
      <p style="font-size:28px;font-weight:900;color:#ef4444">${weakKDs.length}</p>
      <p style="font-size:11px;color:#64748b;margin-top:2px">KD Perlu Remedial (&lt;50%)</p>
    </div>
  </div>

  ${rekomendasiHtml}

  <div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <h2 style="font-size:15px;font-weight:900;color:#1e293b">Rincian per KD — diurutkan dari terendah</h2>
    </div>
    <table>
      <thead><tr>
        <th style="width:36px">#</th>
        <th>Kompetensi Dasar / TP</th>
        <th>Penguasaan</th>
        <th style="text-align:center">%</th>
        <th style="text-align:center">Siswa</th>
        <th style="text-align:center">Status</th>
      </tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>

  <div style="border-top:1px solid #e2e8f0;padding-top:14px;display:flex;justify-content:space-between;align-items:center">
    <p style="font-size:10px;color:#94a3b8">Dicetak dari sistem <strong>INTEGRITEST</strong>. Data bersumber dari ujian yang diselesaikan siswa.</p>
    <p style="font-size:10px;color:#94a3b8">${tglCetak}, ${jamCetak}</p>
  </div>

  <div class="no-print" style="position:fixed;bottom:24px;right:24px;display:flex;gap:10px">
    <button onclick="window.print()" style="background:#4f46e5;color:white;border:none;padding:12px 22px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)">🖨️ Cetak / Simpan PDF</button>
    <button onclick="window.close()" style="background:#f1f5f9;color:#374151;border:1px solid #e2e8f0;padding:12px 18px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer">✕ Tutup</button>
  </div>
</div>
</body></html>`;

            const win = window.open('', '_blank');
            if (!win) { alert('Pop-up diblokir. Izinkan pop-up lalu coba lagi.'); return; }
            win.document.write(html);
            win.document.close();
        };

        // Reset filter analitik
        window.resetAnalitikFilter = function() {
            const ids = ['analitik-filter-sesi','analitik-filter-ruang','analitik-filter-kelas','analitik-filter-predikat'];
            ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = 'all'; });
            if (window._pg) window._pg.analitik.page = 1;
            window.renderIntegrityDashboard();
        };

        // ── Tambahkan integrityScore ke tabel monitoring ──
        window.addIntegrityToMonitorRow = function(item) {
            const score = calcIntegrityScore(item);
            if (score === null) return '';
            const cat = getIntegrityCategory(score);
            return `<span class="px-2 py-0.5 rounded text-xs font-bold ${cat.bg} ${cat.text}">${score}</span>`;
        };

        // ── Skor Integritas di Hasil Siswa ──
        window.getStudentIntegrityForResult = function(viols, isDQ) {
            if (isDQ) return 0;
            return Math.max(0, 100 - (viols * 20));
        };

        // ── Export Laporan PDF Integritas ──
        window.generateIntegrityReport = function(singleId) {
            // ── Sumber data: gunakan SEMUA data (tanpa filter ruang/sesi)
            // agar rekap kelas selalu menampilkan keseluruhan siswa sekelas,
            // bukan hanya siswa di ruang pengawas yang sedang login.
            const data = window._allDashboardData || dashboardData || [];
            let finished = data.filter(d => d.status !== 'SEDANG MENGERJAKAN');
            if (singleId) finished = finished.filter(d => d.id === singleId);
            if (finished.length === 0) { alert('Belum ada data ujian selesai untuk diexport.'); return; }

            const withScores = finished.map(d => ({
                ...d, integrityScore: calcIntegrityScore(d)
            })).filter(d => d.integrityScore !== null)
              .sort((a, b) => {
                  // Urutkan per kelas, lalu per nama
                  const cls = (a.className||'').localeCompare(b.className||'');
                  if (cls !== 0) return cls;
                  return (a.studentName||'').localeCompare(b.studentName||'');
              });

            const now = new Date().toLocaleString('id-ID');
            const _appPdf = window._savedAppearance || {};
            const judulUjianPdf = (_appPdf.judulUjian || 'Ujian Digital').trim();
            const schoolName    = (_appPdf.subJudul   || 'Sistem Integritas Ujian Digital').trim();

            // ── Halaman per siswa (selalu ada, untuk semua mode) ──
            const studentPages = withScores.map((d, i) => buildStudentCard(d, i, schoolName, judulUjianPdf)).join('');

            // ── Jika export satu siswa, langsung tampilkan tanpa rekap ──
            if (singleId) {
                const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
                <title>Laporan Siswa — ${_e(withScores[0]?.studentName)||''} · ${judulUjianPdf}</title>
                <style>
                    *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                    body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:24px;background:#f1f5f9}
                    @media print{body{background:white;padding:0}.no-print{display:none!important}div[style*="page-break-after:always"]{page-break-after:always}}
                </style></head><body>
                <div class="no-print" style="margin-bottom:20px;background:white;padding:14px 20px;border-radius:14px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid #e2e8f0">
                    <div style="width:3px;height:20px;border-radius:2px;background:#2563eb;margin-right:4px"></div>
                    <div style="font-size:13px;font-weight:800;color:#0f172a;flex:1">${judulUjianPdf} &nbsp;<span style="font-weight:600;color:#2563eb;font-size:11px">${schoolName}</span>&nbsp;<span style="font-weight:400;color:#64748b;font-size:11px">— ${_e(withScores[0]?.studentName)||''}</span></div>
                    <button onclick="window.print()" style="background:#2563eb;color:white;border:none;padding:9px 20px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">🖨️ Cetak / Simpan PDF</button>
                    <button onclick="window.close()" style="background:#f1f5f9;color:#334155;border:1.5px solid #e2e8f0;padding:9px 18px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">✕ Tutup</button>
                </div>
                ${studentPages}</body></html>`;
                const win = window.open('', '_blank');
                if (win) { win.document.write(html); win.document.close(); }
                else { alert('Popup diblokir browser. Izinkan popup untuk tab ini lalu coba lagi.'); }
                return;
            }

            // ── Rekap keseluruhan (header) ──
            const totalAvg = withScores.length ? Math.round(withScores.reduce((s,d) => s + d.integrityScore, 0) / withScores.length) : 0;
            const totalHonest = withScores.filter(d => d.integrityScore === 100).length;
            const totalDQ     = withScores.filter(d => d.integrityScore === 0).length;
            const totalPerlu  = withScores.length - totalHonest - totalDQ;

            // ── Kelompokkan per kelas ──
            const classMap = {};
            withScores.forEach(d => {
                const cls = d.className || 'Tanpa Kelas';
                if (!classMap[cls]) classMap[cls] = [];
                classMap[cls].push(d);
            });
            const classNames = Object.keys(classMap).sort();

            // ── Bangun halaman rekap per kelas ──
            function buildClassRecapPage(cls, siswaList) {
                const avgCls   = Math.round(siswaList.reduce((s,d) => s + d.integrityScore, 0) / siswaList.length);
                const honestC  = siswaList.filter(d => d.integrityScore === 100).length;
                const dqC      = siswaList.filter(d => d.integrityScore === 0).length;
                const perluC   = siswaList.length - honestC - dqC;
                const barW = Math.max(avgCls, 2);
                const barCol = avgCls >= 80 ? '#16a34a' : avgCls >= 60 ? '#d97706' : '#dc2626';
                const rows = siswaList.map((d, i) => {
                    const cat = getIntegrityCategory(d.integrityScore);
                    const sc = d.integrityScore;
                    const isDQ2 = (d.status||'').includes('DISKUALIFIKASI');
                    const scColor = sc===100?'#16a34a':sc>=70?'#d97706':'#dc2626';
                    return `<tr style="background:${isDQ2?'#fef2f2':i%2===0?'#f8fafc':'white'}">
                        <td style="padding:7px 10px;text-align:center;font-weight:700;color:#94a3b8;font-size:11px">${i+1}</td>
                        <td style="padding:7px 10px;font-weight:700;color:#0f172a;font-size:12px">${_e(d.studentName)||'-'}</td>
                        <td style="padding:7px 10px;color:#64748b;font-size:11.5px">${_e(d.studentNisn)||'-'}</td>
                        <td style="padding:7px 10px;color:#64748b;font-size:11.5px">${_e(d.ruangUjian)||'-'}</td>
                        <td style="padding:7px 10px;text-align:center;font-weight:800;font-size:13px;color:#1d4ed8">${d.score??'—'}</td>
                        <td style="padding:7px 10px;text-align:center;font-size:11.5px;color:#64748b">${d.violations||0}</td>
                        <td style="padding:7px 10px;text-align:center;font-weight:900;font-size:13px;color:${scColor}">${sc}</td>
                        <td style="padding:7px 10px;font-size:10.5px;color:#64748b">${cat.label.replace(/[🏆✅⚠️🚨❌⛔]/g,'').trim()}</td>
                    </tr>`;
                }).join('');
                return `
                <div style="background:white;border-radius:16px;overflow:hidden;margin-bottom:32px;box-shadow:0 2px 12px rgba(0,0,0,0.07);page-break-after:always">
                    <!-- Header rekap kelas -->
                    <div style="background:linear-gradient(135deg,#2563eb 0%,#4f46e5 60%,#1e293b 100%);padding:22px 28px;display:flex;justify-content:space-between;align-items:center;position:relative;overflow:hidden">
                        <div style="position:absolute;inset:0;opacity:0.05;background-image:linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px);background-size:20px 20px"></div>
                        <div style="position:relative">
                            <div style="font-size:8.5px;letter-spacing:3px;opacity:0.5;text-transform:uppercase;color:white;margin-bottom:5px">Rekap Kelas — Dokumen Resmi</div>
                            <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.7);margin-bottom:3px">${judulUjianPdf}</div>
                            <div style="font-size:24px;font-weight:900;color:white;line-height:1">${cls}</div>
                            <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-top:5px">${schoolName} · ${now}</div>
                        </div>
                        <div style="position:relative;text-align:center">
                            <div style="font-size:52px;font-weight:900;color:white;line-height:1">${avgCls}</div>
                            <div style="font-size:9px;color:rgba(255,255,255,0.55);margin-top:4px">Rata-rata Indeks Integritas</div>
                            <div style="margin-top:6px;height:3px;background:rgba(255,255,255,0.2);border-radius:2px;overflow:hidden;width:80px;margin-left:auto;margin-right:auto">
                                <div style="height:100%;width:${barW}%;background:${barCol};border-radius:2px"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Stat cards -->
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;border-bottom:1px solid #e2e8f0">
                        <div style="padding:14px 16px;text-align:center;border-right:1px solid #e2e8f0">
                            <div style="font-size:8.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Total Peserta</div>
                            <div style="font-size:30px;font-weight:900;color:#0f172a;margin-top:2px">${siswaList.length}</div>
                        </div>
                        <div style="padding:14px 16px;text-align:center;border-right:1px solid #e2e8f0;background:#f0fdf4">
                            <div style="font-size:8.5px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✓ Sempurna</div>
                            <div style="font-size:30px;font-weight:900;color:#16a34a;margin-top:2px">${honestC}</div>
                        </div>
                        <div style="padding:14px 16px;text-align:center;border-right:1px solid #e2e8f0;background:#fffbeb">
                            <div style="font-size:8.5px;color:#d97706;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">⚠ Pembinaan</div>
                            <div style="font-size:30px;font-weight:900;color:#d97706;margin-top:2px">${perluC}</div>
                        </div>
                        <div style="padding:14px 16px;text-align:center;background:#fef2f2">
                            <div style="font-size:8.5px;color:#dc2626;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✕ Diskualifikasi</div>
                            <div style="font-size:30px;font-weight:900;color:#dc2626;margin-top:2px">${dqC}</div>
                        </div>
                    </div>
                    <!-- Tabel siswa -->
                    <div style="padding:20px 28px">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
                            <div style="width:3px;height:14px;border-radius:2px;background:#2563eb"></div>
                            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b">Daftar Siswa — ${cls} (${siswaList.length} siswa)</div>
                        </div>
                        <div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
                            <table style="width:100%;border-collapse:collapse;font-size:12px">
                                <thead><tr style="background:#1d4ed8;color:white">
                                    <th style="padding:8px 10px;text-align:center;font-weight:700">No</th>
                                    <th style="padding:8px 10px;text-align:left;font-weight:700">Nama Siswa</th>
                                    <th style="padding:8px 10px;text-align:left;font-weight:700">NISN</th>
                                    <th style="padding:8px 10px;text-align:left;font-weight:700">Ruang</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700">Nilai</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700">Pelang.</th>
                                    <th style="padding:8px 10px;text-align:center;font-weight:700">Integritas</th>
                                    <th style="padding:8px 10px;text-align:left;font-weight:700">Predikat</th>
                                </tr></thead>
                                <tbody>${rows}</tbody>
                            </table>
                        </div>
                    </div>
                    <div style="padding:10px 28px;background:#0f172a;color:rgba(255,255,255,0.25);font-size:9px;font-style:italic;text-align:center">
                        Formula: Skor berbobot per jenis (tab=−25, notifikasi=−15, fullscreen=−10). ≥3 pelanggaran=Diskualifikasi. INTEGRITEST Engine v4.
                    </div>
                </div>`;
            }

            // ── Halaman ringkasan semua kelas (cover) ──
            const coverClassRows = classNames.map((cls, ci) => {
                const list = classMap[cls];
                const avgC = Math.round(list.reduce((s,d)=>s+d.integrityScore,0)/list.length);
                const dqC  = list.filter(d=>d.integrityScore===0).length;
                const honC = list.filter(d=>d.integrityScore===100).length;
                const avgColor = avgC>=80?'#16a34a':avgC>=60?'#d97706':'#dc2626';
                return `<tr style="background:${ci%2===0?'#f8fafc':'white'}">
                    <td style="padding:9px 14px;font-weight:700;color:#0f172a;font-size:13px">${cls}</td>
                    <td style="padding:9px 14px;text-align:center;color:#64748b;font-size:12px">${list.length} siswa</td>
                    <td style="padding:9px 14px;text-align:center">
                        <span style="font-weight:800;font-size:14px;color:${avgColor}">${avgC}</span>
                        <div style="margin-top:3px;height:3px;background:#e2e8f0;border-radius:2px;overflow:hidden;width:60px;margin-left:auto;margin-right:auto">
                            <div style="height:100%;width:${Math.max(avgC,2)}%;background:${avgColor};border-radius:2px"></div>
                        </div>
                    </td>
                    <td style="padding:9px 14px;text-align:center;color:#16a34a;font-weight:700;font-size:13px">${honC}</td>
                    <td style="padding:9px 14px;text-align:center;color:#dc2626;font-weight:700;font-size:13px">${dqC}</td>
                </tr>`;
            }).join('');

            const coverPage = `
            <div style="background:white;border-radius:16px;overflow:hidden;margin-bottom:32px;box-shadow:0 2px 12px rgba(0,0,0,0.07);page-break-after:always">
                <!-- Cover header -->
                <div style="background:linear-gradient(135deg,#1d4ed8 0%,#4f46e5 55%,#0f172a 100%);padding:28px 32px;display:flex;justify-content:space-between;align-items:center;position:relative;overflow:hidden">
                    <div style="position:absolute;inset:0;opacity:0.05;background-image:linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px);background-size:20px 20px"></div>
                    <div style="position:relative">
                        <div style="font-size:8.5px;letter-spacing:3px;opacity:0.45;text-transform:uppercase;color:white;margin-bottom:8px">Dokumen Resmi — Rekap Seluruh Kelas</div>
                        <div style="font-size:26px;font-weight:900;color:white;letter-spacing:-0.5px;line-height:1.1">${judulUjianPdf}</div>
                        <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.75);margin-top:4px;letter-spacing:0.3px">${schoolName}</div>
                        <div style="font-size:10px;color:rgba(255,255,255,0.45);margin-top:4px">Diterbitkan: ${now}</div>
                        <div style="display:inline-flex;gap:10px;margin-top:12px">
                            <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:9.5px;color:rgba(255,255,255,0.75);font-weight:600">${withScores.length} peserta</div>
                            <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:9.5px;color:rgba(255,255,255,0.75);font-weight:600">${classNames.length} kelas</div>
                        </div>
                    </div>
                    <div style="position:relative;text-align:center;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:18px 24px">
                        <div style="font-size:54px;font-weight:900;color:white;line-height:1">${totalAvg}</div>
                        <div style="font-size:9px;color:rgba(255,255,255,0.55);margin-top:6px">Rata-rata Indeks Integritas</div>
                    </div>
                </div>
                <!-- Stat row -->
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;border-bottom:1px solid #e2e8f0">
                    <div style="padding:16px 18px;text-align:center;border-right:1px solid #e2e8f0">
                        <div style="font-size:8.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Total Peserta</div>
                        <div style="font-size:32px;font-weight:900;color:#0f172a;margin-top:4px">${withScores.length}</div>
                    </div>
                    <div style="padding:16px 18px;text-align:center;border-right:1px solid #e2e8f0;background:#f0fdf4">
                        <div style="font-size:8.5px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✓ Integritas Sempurna</div>
                        <div style="font-size:32px;font-weight:900;color:#16a34a;margin-top:4px">${totalHonest}</div>
                    </div>
                    <div style="padding:16px 18px;text-align:center;border-right:1px solid #e2e8f0;background:#fffbeb">
                        <div style="font-size:8.5px;color:#d97706;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">⚠ Perlu Pembinaan</div>
                        <div style="font-size:32px;font-weight:900;color:#d97706;margin-top:4px">${totalPerlu}</div>
                    </div>
                    <div style="padding:16px 18px;text-align:center;background:#fef2f2">
                        <div style="font-size:8.5px;color:#dc2626;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✕ Diskualifikasi</div>
                        <div style="font-size:32px;font-weight:900;color:#dc2626;margin-top:4px">${totalDQ}</div>
                    </div>
                </div>
                <!-- Tabel ringkasan kelas -->
                <div style="padding:24px 32px">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
                        <div style="width:3px;height:14px;border-radius:2px;background:#2563eb"></div>
                        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b">Ringkasan per Kelas (${classNames.length} kelas)</div>
                    </div>
                    <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
                        <table style="width:100%;border-collapse:collapse;font-size:13px">
                            <thead><tr style="background:#1d4ed8;color:white">
                                <th style="padding:10px 14px;text-align:left;font-weight:700">Kelas</th>
                                <th style="padding:10px 14px;text-align:center;font-weight:700">Jumlah Siswa</th>
                                <th style="padding:10px 14px;text-align:center;font-weight:700">Rata-rata Integritas</th>
                                <th style="padding:10px 14px;text-align:center;font-weight:700">Sempurna</th>
                                <th style="padding:10px 14px;text-align:center;font-weight:700">Diskualifikasi</th>
                            </tr></thead>
                            <tbody>${coverClassRows}</tbody>
                        </table>
                    </div>
                </div>
                <div style="padding:12px 32px;background:#0f172a;color:rgba(255,255,255,0.2);font-size:9px;font-style:italic;text-align:center">
                    Formula: Skor berbobot per jenis (tab=−25, notifikasi=−15, fullscreen=−10). ≥3 pelanggaran=Diskualifikasi. INTEGRITEST Engine v4.
                </div>
            </div>`;

            // ── Gabungkan: cover → rekap per kelas → laporan per siswa ──
            const classRekapPages = classNames.map(cls => buildClassRecapPage(cls, classMap[cls])).join('');

            const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
            <title>${judulUjianPdf} — ${schoolName} · ${now}</title>
            <style>
                *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                body{font-family:'Segoe UI',system-ui,Arial,sans-serif;margin:0;padding:28px;background:#f1f5f9;color:#1e293b}
                @media print{
                    body{background:#f1f5f9;padding:12px}
                    .no-print{display:none!important}
                    div[style*="page-break-after:always"]{page-break-after:always}
                }
            </style></head><body>

            <!-- TOMBOL AKSI -->
            <div class="no-print" style="margin-bottom:20px;background:white;padding:14px 20px;border-radius:14px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid #e2e8f0">
                <div style="width:3px;height:20px;border-radius:2px;background:#2563eb;margin-right:4px"></div>
                <div style="font-size:13px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;flex:1">${judulUjianPdf} &nbsp;<span style="font-weight:600;color:#2563eb;font-size:12px">${schoolName}</span>&nbsp;<span style="font-weight:400;color:#64748b;font-size:11px">· ${withScores.length} peserta · ${classNames.length} kelas · ${now}</span></div>
                <button onclick="window.print()" style="background:#2563eb;color:white;border:none;padding:9px 20px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px">🖨️ Cetak / Simpan PDF</button>
                <button onclick="window.close()" style="background:#f1f5f9;color:#334155;border:1.5px solid #e2e8f0;padding:9px 18px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">✕ Tutup</button>
            </div>

            <!-- HALAMAN COVER: RINGKASAN SEMUA KELAS -->
            ${coverPage}

            <!-- HALAMAN REKAP PER KELAS -->
            ${classRekapPages}

            <!-- HALAMAN LAPORAN PER SISWA -->
            ${studentPages}

            </body></html>`;

            const win = window.open('', '_blank');
            if (win) { win.document.write(html); win.document.close(); }
            else { alert('Popup diblokir browser. Izinkan popup untuk tab ini lalu coba lagi.'); }
        };

        // Export PDF satu siswa dari tabel monitoring
        window.exportSinglePDF = function(studentId) { window.generateIntegrityReport(studentId); };

        // ══ PDF REKAP KELAS — Laporan agregat per kelas/jurusan untuk kepala sekolah ══
        window.togglePdfKelasDropdown = function() {
            const dd = document.getElementById('dropdown-pdf-kelas');
            const chevron = document.getElementById('pdf-kelas-chevron');
            if (!dd) return;
            const isHidden = dd.classList.contains('hidden');
            if (isHidden) {
                // Populate list kelas dari data dashboard
                window._populatePdfKelasDropdown();
                dd.classList.remove('hidden');
                if (chevron) chevron.style.transform = 'rotate(180deg)';
                // Tutup saat klik di luar
                setTimeout(() => {
                    document.addEventListener('click', window._closePdfKelasOnOutside);
                }, 50);
            } else {
                dd.classList.add('hidden');
                if (chevron) chevron.style.transform = '';
            }
        };

        window._closePdfKelasOnOutside = function(e) {
            const wrap = document.getElementById('dropdown-pdf-kelas-wrap');
            if (wrap && !wrap.contains(e.target)) {
                const dd = document.getElementById('dropdown-pdf-kelas');
                const chevron = document.getElementById('pdf-kelas-chevron');
                if (dd) dd.classList.add('hidden');
                if (chevron) chevron.style.transform = '';
                document.removeEventListener('click', window._closePdfKelasOnOutside);
            }
        };

        window._populatePdfKelasDropdown = function() {
            const list = document.getElementById('dropdown-pdf-kelas-list');
            if (!list) return;
            const data = window._allDashboardData || dashboardData || [];
            const finished = data.filter(d => d.status !== 'SEDANG MENGERJAKAN');
            // Kumpulkan kelas unik
            const classSet = {};
            finished.forEach(d => {
                const cls = d.className || 'Tanpa Kelas';
                if (!classSet[cls]) classSet[cls] = 0;
                classSet[cls]++;
            });
            const classNames = Object.keys(classSet).sort();
            if (classNames.length === 0) {
                list.innerHTML = '<p class="px-4 py-3 text-xs text-gray-400 italic">Belum ada data siswa selesai...</p>';
                return;
            }
            list.innerHTML = classNames.map(cls => `
                <button onclick="window.generateClassReport('${escapeHtml(cls).replace(/'/g,"\\'")}'); document.getElementById('dropdown-pdf-kelas').classList.add('hidden'); document.getElementById('pdf-kelas-chevron').style.transform=''"
                    class="w-full text-left px-4 py-2.5 hover:bg-indigo-50 flex items-center justify-between gap-3 transition-colors group">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black shrink-0">
                            ${escapeHtml(cls).split(' ').map(w=>w[0]||'').join('').slice(0,3).toUpperCase()}
                        </div>
                        <span class="text-sm font-bold text-gray-800">${escapeHtml(cls)}</span>
                    </div>
                    <span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 group-hover:bg-indigo-100 px-2 py-0.5 rounded-full">${classSet[cls]} siswa</span>
                </button>`).join('');
        };

        // Fungsi utama: generate laporan PDF rekap 1 kelas (untuk kepala sekolah)
        window.generateClassReport = function(targetClass) {
            const data = window._allDashboardData || dashboardData || [];
            const finished = data.filter(d => d.status !== 'SEDANG MENGERJAKAN');
            const siswaKelas = finished.filter(d => (d.className || 'Tanpa Kelas') === targetClass);
            if (siswaKelas.length === 0) { alert('Belum ada siswa selesai ujian di kelas ' + targetClass); return; }

            const withScores = siswaKelas.map(d => ({
                ...d, integrityScore: calcIntegrityScore(d)
            })).filter(d => d.integrityScore !== null)
              .sort((a,b) => (a.studentName||'').localeCompare(b.studentName||''));

            if (withScores.length === 0) { alert('Belum ada data integritas untuk kelas ' + targetClass); return; }

            const _appPdf = window._savedAppearance || {};
            const judulUjianPdf = (_appPdf.judulUjian || 'Ujian Digital').trim();
            const schoolName    = (_appPdf.subJudul   || 'Sistem Integritas Ujian Digital').trim();
            const now = new Date().toLocaleString('id-ID');

            const avgInt   = Math.round(withScores.reduce((s,d) => s + d.integrityScore, 0) / withScores.length);
            const avgNilai = withScores.length ? Math.round(withScores.reduce((s,d) => s + (d.score||0), 0) / withScores.length) : 0;
            const kkm      = window.currentKKM || 75;
            const lulus    = withScores.filter(d => (d.score||0) >= kkm).length;
            const sempurna = withScores.filter(d => d.integrityScore === 100).length;
            const perlu    = withScores.filter(d => d.integrityScore > 0 && d.integrityScore < 100).length;
            const dq       = withScores.filter(d => d.integrityScore === 0).length;
            const barCol   = avgInt >= 80 ? '#16a34a' : avgInt >= 60 ? '#d97706' : '#dc2626';
            const nilaiCol = avgNilai >= kkm ? '#16a34a' : '#dc2626';

            // Kelompokkan per ruang ujian
            const ruangMap = {};
            withScores.forEach(d => {
                const r = d.ruangUjian || 'Tanpa Ruang';
                if (!ruangMap[r]) ruangMap[r] = [];
                ruangMap[r].push(d);
            });
            const ruangNames = Object.keys(ruangMap).sort();

            const ruangRows = ruangNames.map(r => {
                const list = ruangMap[r];
                const avgR = Math.round(list.reduce((s,d)=>s+d.integrityScore,0)/list.length);
                const avgN = Math.round(list.reduce((s,d)=>s+(d.score||0),0)/list.length);
                const dqR  = list.filter(d=>d.integrityScore===0).length;
                const col  = avgR>=80?'#16a34a':avgR>=60?'#d97706':'#dc2626';
                return `<tr style="background:#f8fafc">
                    <td style="padding:8px 14px;font-weight:700;color:#0f172a;font-size:12px">${_e(r)}</td>
                    <td style="padding:8px 14px;text-align:center;color:#64748b;font-size:12px">${list.length}</td>
                    <td style="padding:8px 14px;text-align:center;font-weight:800;font-size:13px;color:${nilaiCol}">${avgN}</td>
                    <td style="padding:8px 14px;text-align:center;font-weight:800;font-size:13px;color:${col}">${avgR}</td>
                    <td style="padding:8px 14px;text-align:center;color:#dc2626;font-weight:700;font-size:12px">${dqR}</td>
                </tr>`;
            }).join('');

            const siswaRows = withScores.map((d, i) => {
                const cat = getIntegrityCategory(d.integrityScore);
                const isDQ2 = (d.status||'').includes('DISKUALIFIKASI');
                const scCol = d.integrityScore===100?'#16a34a':d.integrityScore>=70?'#d97706':'#dc2626';
                const nilCol2 = (d.score||0)>=kkm?'#16a34a':'#dc2626';
                const pelangg = (d.anomalyLog||[]);
                const jenisPelangg = {};
                pelangg.forEach(p => { const j = (p.type||p.jenis||'Lainnya'); jenisPelangg[j]=(jenisPelangg[j]||0)+1; });
                const pelanggStr = Object.entries(jenisPelangg).map(([j,c])=>`${j}×${c}`).join(', ') || '—';
                return `<tr style="background:${isDQ2?'#fef2f2':i%2===0?'#f8fafc':'white'}">
                    <td style="padding:8px 10px;text-align:center;font-weight:700;color:#94a3b8;font-size:11px">${i+1}</td>
                    <td style="padding:8px 10px;font-weight:700;color:#0f172a;font-size:12px">${_e(d.studentName)||'-'}</td>
                    <td style="padding:8px 10px;color:#64748b;font-size:11.5px">${_e(d.studentNisn)||'-'}</td>
                    <td style="padding:8px 10px;color:#64748b;font-size:11.5px">${_e(d.ruangUjian)||'-'}</td>
                    <td style="padding:8px 10px;text-align:center;font-weight:800;font-size:13px;color:${nilCol2}">${d.score??'—'}</td>
                    <td style="padding:8px 10px;text-align:center;font-size:11.5px;color:#64748b">${d.violations||0}</td>
                    <td style="padding:8px 10px;text-align:center;font-weight:900;font-size:13px;color:${scCol}">${d.integrityScore}</td>
                    <td style="padding:8px 10px;font-size:10.5px;color:${scCol};font-weight:700">${cat.label.replace(/[🏆✅⚠️🚨❌⛔]/g,'').trim()}</td>
                    <td style="padding:8px 10px;font-size:10px;color:#64748b;max-width:140px">${pelanggStr}</td>
                </tr>`;
            }).join('');

            // Distribusi nilai
            const dist = [
                { label:'91–100', min:91, max:100, col:'#16a34a' },
                { label:'81–90',  min:81, max:90,  col:'#22c55e' },
                { label:'76–80',  min:76, max:80,  col:'#84cc16' },
                { label:'60–75',  min:60, max:75,  col:'#f59e0b' },
                { label:'<60',    min:0,  max:59,  col:'#ef4444' },
            ].map(b => {
                const cnt = withScores.filter(d => (d.score||0) >= b.min && (d.score||0) <= b.max).length;
                const pct = withScores.length ? Math.round(cnt/withScores.length*100) : 0;
                return { ...b, cnt, pct };
            });
            const distBars = dist.map(b => `
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                    <div style="font-size:11px;font-weight:700;color:#64748b;width:44px;text-align:right">${b.label}</div>
                    <div style="flex:1;height:18px;background:#f1f5f9;border-radius:4px;overflow:hidden">
                        <div style="height:100%;width:${b.pct}%;background:${b.col};border-radius:4px;transition:width 0.5s"></div>
                    </div>
                    <div style="font-size:11px;font-weight:800;color:${b.col};width:32px">${b.cnt}</div>
                    <div style="font-size:10px;color:#94a3b8;width:30px">${b.pct}%</div>
                </div>`).join('');

            const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
            <title>Laporan Rekap Kelas ${_e(targetClass)} — ${judulUjianPdf}</title>
            <style>
                *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
                body{font-family:'Segoe UI',system-ui,Arial,sans-serif;margin:0;padding:28px;background:#f1f5f9;color:#1e293b}
                @media print{
                    body{background:#f1f5f9;padding:12px}
                    .no-print{display:none!important}
                    div[style*="page-break"]{page-break-after:always}
                }
            </style></head><body>

            <!-- TOOLBAR -->
            <div class="no-print" style="margin-bottom:20px;background:white;padding:14px 20px;border-radius:14px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);border:1px solid #e2e8f0">
                <div style="width:3px;height:20px;border-radius:2px;background:#4f46e5;margin-right:4px"></div>
                <div style="font-size:13px;font-weight:800;color:#0f172a;flex:1">
                    Laporan Rekap Integritas &nbsp;
                    <span style="color:#4f46e5;font-weight:900">${_e(targetClass)}</span>&nbsp;
                    <span style="color:#64748b;font-weight:400;font-size:11px">· ${judulUjianPdf} · ${schoolName} · ${now}</span>
                </div>
                <button onclick="window.print()" style="background:#4f46e5;color:white;border:none;padding:9px 20px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px">🖨️ Cetak / Simpan PDF</button>
                <button onclick="window.close()" style="background:#f1f5f9;color:#334155;border:1.5px solid #e2e8f0;padding:9px 18px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer">✕ Tutup</button>
            </div>

            <!-- COVER KELAS -->
            <div style="background:white;border-radius:16px;overflow:hidden;margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,0.07)">
                <!-- Header gradient -->
                <div style="background:linear-gradient(135deg,#4f46e5 0%,#2563eb 55%,#0f172a 100%);padding:28px 32px;position:relative;overflow:hidden">
                    <div style="position:absolute;inset:0;opacity:0.05;background-image:linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px);background-size:20px 20px"></div>
                    <div style="position:relative;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px">
                        <div>
                            <div style="font-size:8.5px;letter-spacing:3px;opacity:0.5;text-transform:uppercase;color:white;margin-bottom:6px">Laporan Rekap Integritas Kelas — Dokumen Resmi</div>
                            <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);margin-bottom:4px">${_e(judulUjianPdf)} · ${_e(schoolName)}</div>
                            <div style="font-size:30px;font-weight:900;color:white;line-height:1.1;letter-spacing:-0.5px">${_e(targetClass)}</div>
                            <div style="font-size:10px;color:rgba(255,255,255,0.45);margin-top:6px">Diterbitkan: ${now}</div>
                            <div style="display:inline-flex;gap:10px;margin-top:12px">
                                <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:9.5px;color:rgba(255,255,255,0.75);font-weight:600">${withScores.length} peserta</div>
                                <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:9.5px;color:rgba(255,255,255,0.75);font-weight:600">KKM: ${kkm}</div>
                                <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;font-size:9.5px;color:rgba(255,255,255,0.75);font-weight:600">${ruangNames.length} ruang</div>
                            </div>
                        </div>
                        <div style="display:flex;gap:16px">
                            <div style="text-align:center;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:16px 22px">
                                <div style="font-size:9px;color:rgba(255,255,255,0.55);margin-bottom:4px">Avg. Integritas</div>
                                <div style="font-size:44px;font-weight:900;color:white;line-height:1">${avgInt}</div>
                                <div style="margin-top:6px;height:3px;background:rgba(255,255,255,0.2);border-radius:2px;overflow:hidden;width:60px;margin-left:auto;margin-right:auto">
                                    <div style="height:100%;width:${Math.max(avgInt,2)}%;background:${barCol};border-radius:2px"></div>
                                </div>
                            </div>
                            <div style="text-align:center;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:16px;padding:16px 22px">
                                <div style="font-size:9px;color:rgba(255,255,255,0.55);margin-bottom:4px">Avg. Nilai</div>
                                <div style="font-size:44px;font-weight:900;color:white;line-height:1">${avgNilai}</div>
                                <div style="font-size:9px;color:rgba(255,255,255,0.4);margin-top:6px">KKM ${kkm}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stat cards 5 kolom -->
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;border-bottom:1px solid #e2e8f0">
                    <div style="padding:16px;text-align:center;border-right:1px solid #e2e8f0">
                        <div style="font-size:8px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Total Peserta</div>
                        <div style="font-size:30px;font-weight:900;color:#0f172a;margin-top:2px">${withScores.length}</div>
                    </div>
                    <div style="padding:16px;text-align:center;border-right:1px solid #e2e8f0;background:#f0fdf4">
                        <div style="font-size:8px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Lulus KKM</div>
                        <div style="font-size:30px;font-weight:900;color:#16a34a;margin-top:2px">${lulus}</div>
                        <div style="font-size:9px;color:#86efac;margin-top:1px">${withScores.length?Math.round(lulus/withScores.length*100):0}%</div>
                    </div>
                    <div style="padding:16px;text-align:center;border-right:1px solid #e2e8f0;background:#f0fdf4">
                        <div style="font-size:8px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✓ Integritas Sempurna</div>
                        <div style="font-size:30px;font-weight:900;color:#16a34a;margin-top:2px">${sempurna}</div>
                    </div>
                    <div style="padding:16px;text-align:center;border-right:1px solid #e2e8f0;background:#fffbeb">
                        <div style="font-size:8px;color:#d97706;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">⚠ Perlu Pembinaan</div>
                        <div style="font-size:30px;font-weight:900;color:#d97706;margin-top:2px">${perlu}</div>
                    </div>
                    <div style="padding:16px;text-align:center;background:#fef2f2">
                        <div style="font-size:8px;color:#dc2626;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">✕ Diskualifikasi</div>
                        <div style="font-size:30px;font-weight:900;color:#dc2626;margin-top:2px">${dq}</div>
                    </div>
                </div>

                <!-- Dua kolom: rekap ruang + distribusi nilai -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:1px solid #e2e8f0">
                    <!-- Rekap per ruang -->
                    <div style="padding:20px 24px;border-right:1px solid #e2e8f0">
                        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:12px">Rekap Per Ruang Ujian</div>
                        ${ruangNames.length > 0 ? `<div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
                            <table style="width:100%;border-collapse:collapse;font-size:11.5px">
                                <thead><tr style="background:#1d4ed8;color:white">
                                    <th style="padding:7px 10px;text-align:left;font-weight:700">Ruang</th>
                                    <th style="padding:7px 8px;text-align:center;font-weight:700">Siswa</th>
                                    <th style="padding:7px 8px;text-align:center;font-weight:700">Avg Nilai</th>
                                    <th style="padding:7px 8px;text-align:center;font-weight:700">Avg Int.</th>
                                    <th style="padding:7px 8px;text-align:center;font-weight:700">DQ</th>
                                </tr></thead>
                                <tbody>${ruangRows}</tbody>
                            </table>
                        </div>` : '<p style="font-size:12px;color:#94a3b8;font-style:italic">Tidak ada data ruang</p>'}
                    </div>
                    <!-- Distribusi nilai -->
                    <div style="padding:20px 24px">
                        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:12px">Distribusi Nilai Ujian</div>
                        ${distBars}
                        <div style="margin-top:12px;padding:10px 14px;background:#f8fafc;border-radius:8px;font-size:11px;color:#64748b">
                            <strong>Lulus KKM (≥${kkm}):</strong> ${lulus} siswa (${withScores.length?Math.round(lulus/withScores.length*100):0}%) &nbsp;·&nbsp;
                            <strong>Tidak Lulus:</strong> ${withScores.length-lulus} siswa
                        </div>
                    </div>
                </div>

                <div style="padding:10px 28px;background:#0f172a;color:rgba(255,255,255,0.25);font-size:9px;font-style:italic;text-align:center">
                    Formula Integritas: tab=−25, notifikasi=−15, fullscreen=−10. ≥3 pelanggaran=Diskualifikasi. INTEGRITEST Engine v4.
                </div>
            </div>

            <!-- TABEL LENGKAP SEMUA SISWA -->
            <div style="background:white;border-radius:16px;overflow:hidden;margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,0.07)">
                <div style="padding:18px 24px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <div style="width:3px;height:14px;border-radius:2px;background:#4f46e5"></div>
                            <div style="font-size:13px;font-weight:900;color:#0f172a">Daftar Lengkap Siswa — ${_e(targetClass)}</div>
                        </div>
                        <div style="font-size:11px;color:#64748b;margin-top:2px;padding-left:11px">${withScores.length} peserta · diurutkan berdasarkan nama</div>
                    </div>
                </div>
                <div style="padding:16px 20px">
                    <div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
                        <table style="width:100%;border-collapse:collapse;font-size:12px">
                            <thead><tr style="background:#1d4ed8;color:white">
                                <th style="padding:9px 10px;text-align:center;font-weight:700">No</th>
                                <th style="padding:9px 10px;text-align:left;font-weight:700">Nama Siswa</th>
                                <th style="padding:9px 10px;text-align:left;font-weight:700">NISN</th>
                                <th style="padding:9px 10px;text-align:left;font-weight:700">Ruang</th>
                                <th style="padding:9px 10px;text-align:center;font-weight:700">Nilai</th>
                                <th style="padding:9px 10px;text-align:center;font-weight:700">Pelang.</th>
                                <th style="padding:9px 10px;text-align:center;font-weight:700">Integritas</th>
                                <th style="padding:9px 10px;text-align:left;font-weight:700">Predikat</th>
                                <th style="padding:9px 10px;text-align:left;font-weight:700">Rincian Pelanggaran</th>
                            </tr></thead>
                            <tbody>${siswaRows}</tbody>
                        </table>
                    </div>
                </div>
                <div style="padding:10px 24px;background:#0f172a;color:rgba(255,255,255,0.25);font-size:9px;font-style:italic;text-align:center">
                    Dokumen ini diterbitkan otomatis oleh sistem INTEGRITEST · ${now} · Untuk keperluan administrasi sekolah.
                </div>
            </div>

            </body></html>`;

            const win = window.open('', '_blank');
            if (win) { win.document.write(html); win.document.close(); }
            else { alert('Popup diblokir browser. Izinkan popup untuk tab ini lalu coba lagi.'); }
        };

        // ── Modal Catatan Pengawas Per Siswa ──
        window._studentNotes = {};  // simpan catatan per ID siswa (in-memory)

        window.openNoteModal = function(studentId) {
            const data = dashboardData || [];
            const student = data.find(d => d.id === studentId);
            if (!student) return;
            const viol = student.violations || 0;
            const isDQ = (student.status||'').includes('DISKUALIFIKASI');
            const autoNote = getAutoNote(viol, isDQ);

            document.getElementById('note-student-id').value = studentId;
            document.getElementById('note-student-name').textContent = student.studentName || '-';
            document.getElementById('note-auto-text').textContent = '💬 Catatan otomatis: ' + autoNote.note.slice(0, 100) + '...';
            document.getElementById('note-custom-input').value = window._studentNotes[studentId] || '';
            document.getElementById('modal-note').classList.remove('hidden');
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.saveStudentNote = function() {
            const id = document.getElementById('note-student-id').value;
            const note = document.getElementById('note-custom-input').value.trim();
            window._studentNotes[id] = note;
            // Sisipkan ke dashboardData agar PDF bisa akses
            const data = dashboardData || [];
            const student = data.find(d => d.id === id);
            if (student) student._customNote = note;
            document.getElementById('modal-note').classList.add('hidden');
            // Toast notifikasi kecil
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-6 right-6 z-[999] bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-xl animate-fade-in';
            toast.textContent = '✅ Catatan pengawas disimpan';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        };

        // ── Auto-update analitik ketika data berubah ──
        const _origUpdateStatCards = window.updateStatCards || function(){};
        window._integrityAutoRefresh = function(data) {
            if (data) window._lastAnalitikData = data;
            const panel = document.getElementById('panel-analitik');
            if (panel && !panel.classList.contains('hidden-section')) {
                window.renderIntegrityDashboard();
            }
        };

        // ══ FITUR BARU: TAMPILKAN SKOR INTEGRITAS DI HASIL SISWA ══
        // Patch fungsi finishExam untuk inject skor integritas ke halaman hasil
        const _origFinishExam = window._finishExamPatched;
        window._patchResultPage = function(viols, isDQ) {
            const intScore = window.getStudentIntegrityForResult(viols, isDQ);
            const cat = getIntegrityCategory(intScore);
            const existingBadge = document.getElementById('integrity-score-badge');
            if (existingBadge) existingBadge.remove();

            const resultSection = document.getElementById('section-result');
            if (!resultSection) return;
            const firstCard = resultSection.querySelector('.bg-white, [class*="bg-slate"]');
            if (!firstCard) return;

            const badge = document.createElement('div');
            badge.id = 'integrity-score-badge';
            badge.className = 'mt-4 mx-auto max-w-xs';
            badge.innerHTML = `
                <div class="rounded-2xl border-2 p-4 text-center ${intScore >= 80 ? 'border-emerald-300 bg-emerald-50' : intScore >= 60 ? 'border-amber-300 bg-amber-50' : 'border-red-300 bg-red-50'}">
                    <p class="text-xs font-bold uppercase tracking-wider ${intScore >= 80 ? 'text-emerald-600' : intScore >= 60 ? 'text-amber-600' : 'text-red-600'} mb-1">Skor Integritas Kamu</p>
                    <p class="text-5xl font-black ${intScore >= 80 ? 'text-emerald-600' : intScore >= 60 ? 'text-amber-600' : 'text-red-600'}">${intScore}</p>
                    <p class="text-sm font-bold mt-1 ${cat.text}">${cat.label}</p>
                    <p class="text-xs text-gray-400 mt-2">${intScore >= 100 ? 'Luar biasa! Kamu mengerjakan dengan jujur tanpa pelanggaran.' : intScore >= 80 ? 'Bagus! Kamu mengerjakan dengan cukup jujur.' : intScore >= 60 ? 'Ada beberapa pelanggaran terdeteksi.' : intScore > 0 ? 'Banyak pelanggaran terdeteksi sistem.' : 'Ujian tidak sah karena pelanggaran berulang.'}</p>
                </div>`;

            const scoreDisplay = document.getElementById('final-score-display');
            if (scoreDisplay && scoreDisplay.parentElement) {
                scoreDisplay.parentElement.after(badge);
            }

            // FORM APPEAL — state-aware dengan realtime listener
            const existingAppeal = document.getElementById('appeal-section');
            if (existingAppeal) existingAppeal.remove();

            if (viols >= 1 && window.appealEnabled !== false) {
                const appealDiv = document.createElement('div');
                appealDiv.id = 'appeal-section';
                appealDiv.className = 'mt-4 mx-auto max-w-xs';
                badge.after(appealDiv);

                // Render UI banding berdasarkan status
                window._renderAppealUI = function(appealStatus, guruNote, guruReviewer) {
                    const section = document.getElementById('appeal-section');
                    if (!section) return;

                    if (!appealStatus || appealStatus === 'none') {
                        // ── Belum pernah mengajukan banding ──
                        section.innerHTML = `
                            <div class="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
                                <p class="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">⚖️ Ajukan Banding</p>
                                <p class="text-xs text-amber-700 mb-3">Merasa ada pelanggaran yang tidak adil? Tulis penjelasanmu — guru akan meninjau dan memberi keputusan.</p>
                                <textarea id="appeal-text" rows="3"
                                    class="w-full text-xs p-2 border border-amber-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                                    placeholder="Jelaskan situasi yang sebenarnya terjadi..."></textarea>
                                <button id="appeal-submit-btn" onclick="window.submitAppeal()"
                                    class="mt-2 w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                                    Kirim Banding ke Guru
                                </button>
                            </div>`;

                    } else if (appealStatus === 'pending') {
                        // ── Banding sudah dikirim, menunggu keputusan ──
                        section.innerHTML = `
                            <div class="rounded-2xl border-2 border-blue-300 bg-blue-50 p-4 text-center">
                                <div class="flex items-center justify-center mb-2">
                                    <span class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 6v6l4 2"/></svg>
                                        Menunggu Keputusan Guru
                                    </span>
                                </div>
                                <p class="text-sm font-bold text-blue-800 mb-1">⏳ Banding sedang ditinjau</p>
                                <p class="text-xs text-blue-600 leading-relaxed">Bandingmu sudah diterima guru. Halaman ini akan otomatis diperbarui saat keputusan sudah dibuat.</p>
                                <p class="text-[10px] text-blue-400 mt-2">Status: <span class="font-bold">PENDING</span></p>
                            </div>`;

                    } else if (appealStatus === 'approved') {
                        // ── Banding diterima ──
                        const noteHtml = guruNote
                            ? `<div class="mt-3 bg-white rounded-xl p-3 border border-green-200 text-left"><p class="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-0.5">Catatan Guru${guruReviewer ? ' (' + _e(guruReviewer) + ')' : ''}</p><p class="text-xs text-gray-700 leading-relaxed">${_e(guruNote)}</p></div>`
                            : '';
                        section.innerHTML = `
                            <div class="rounded-2xl border-2 border-green-400 bg-green-50 p-4 text-center">
                                <p class="text-3xl mb-1">✅</p>
                                <p class="text-sm font-black text-green-700">Banding Diterima!</p>
                                <p class="text-xs text-green-600 mt-1 leading-relaxed">Selamat! Gurumu telah meninjau dan menerima bandingmu. Status ujianmu telah diperbaiki.</p>
                                ${noteHtml}
                            </div>`;

                    } else if (appealStatus === 'rejected') {
                        // ── Banding ditolak ──
                        const noteHtml = guruNote
                            ? `<div class="mt-3 bg-white rounded-xl p-3 border border-red-200 text-left"><p class="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-0.5">Alasan Penolakan${guruReviewer ? ' (' + _e(guruReviewer) + ')' : ''}</p><p class="text-xs text-gray-700 leading-relaxed">${_e(guruNote)}</p></div>`
                            : '';
                        section.innerHTML = `
                            <div class="rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-center">
                                <p class="text-3xl mb-1">❌</p>
                                <p class="text-sm font-black text-red-700">Banding Ditolak</p>
                                <p class="text-xs text-red-600 mt-1 leading-relaxed">Gurumu telah meninjau dan memutuskan untuk menolak bandingmu.</p>
                                ${noteHtml}
                            </div>`;
                    }
                };

                // Ambil status appeal terkini dari Firestore, lalu pasang realtime listener
                (async function initAppealUI() {
                    const docId = window.currentExamDocId;
                    if (!docId || !window.isFirebaseReady || !window.db) {
                        // Firebase belum siap — render form default
                        window._renderAppealUI('none');
                        return;
                    }

                    // Baca status saat ini dulu (sinkron pertama kali)
                    try {
                        const snap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                        let initialStatus = 'none', initialNote = '', initialReviewer = '';
                        snap.forEach(ds => {
                            if (ds.id === docId) {
                                const d = ds.data();
                                initialStatus   = d.appealStatus  || 'none';
                                initialNote     = d.guruNote      || '';
                                initialReviewer = d.guruReviewer  || '';
                            }
                        });
                        window._renderAppealUI(initialStatus, initialNote, initialReviewer);
                    } catch(e) {
                        window._renderAppealUI('none');
                    }

                    // Pasang realtime listener agar status update otomatis tanpa refresh
                    try {
                        const resultRef = window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', docId);
                        // Simpan unsubscribe agar bisa dibersihkan jika perlu
                        if (window._appealUnsubscribe) window._appealUnsubscribe();
                        window._appealUnsubscribe = onSnapshot(resultRef, (snap) => {
                            if (!snap.exists()) return;
                            const d = snap.data();
                            window._renderAppealUI(d.appealStatus || 'none', d.guruNote || '', d.guruReviewer || '');
                        });
                    } catch(e) {
                        console.warn('[Appeal] Gagal pasang realtime listener:', e);
                    }
                })();
            }
        };

        // EXPORT EXCEL PROFESIONAL
        // ============================================================
        // ══════════════════════════════════════════════════════════════
        // EXPORT TO CSV — implementasi asli (bukan alias ke Excel)
        // Menghasilkan file .csv murni: UTF-8 BOM, delimiter koma,
        // kolom sama dengan Excel (minus statistik multi-sheet).
        // ══════════════════════════════════════════════════════════════
        function exportToCSVInternal() {
            const dataToExport = window.currentFilteredData && window.currentFilteredData.length > 0
                ? window.currentFilteredData : dashboardData;

            if (!dataToExport || dataToExport.length === 0) {
                return alert('Belum ada data untuk diexport ke CSV.');
            }

            // --- Info dari settings tampilan ---
            const _app        = window._savedAppearance || {};
            const namaUjian   = (_app.judulUjian || 'Rekap Nilai Ujian').trim();
            const namaSekolah = (_app.subJudul   || 'INTEGRITEST').trim();

            // --- Filter aktif ---
            const filterPkt  = document.getElementById('filter-session').value;
            const filterCls  = document.getElementById('filter-class').value;
            const filterDate = document.getElementById('filter-date').value;
            const labelPkt   = filterPkt  !== 'all' ? `Paket ${filterPkt}` : 'Semua Paket';
            const labelCls   = filterCls  !== 'all' ? filterCls              : 'Semua Kelas';
            const labelDate  = filterDate || new Date().toLocaleDateString('id-ID');

            // --- Nama file ---
            let filename = namaUjian.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_\-]/g,'') || 'Rekap_Nilai';
            if (filterCls  !== 'all') filename += `_${filterCls.replace(/\s+/g,'-')}`;
            if (filterPkt  !== 'all') filename += `_Paket-${filterPkt}`;
            if (filterDate)           filename += `_${filterDate}`;
            filename += '.csv';

            // --- Helper: escape nilai CSV ---
            function csvCell(val) {
                if (val === null || val === undefined) return '';
                const s = String(val);
                // Jika mengandung koma, newline, atau kutip → bungkus dengan kutip ganda
                if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
                    return '"' + s.replace(/"/g, '""') + '"';
                }
                return s;
            }

            // --- Statistik ringkasan ---
            const scores       = dataToExport.map(r => parseFloat(r.score)).filter(s => !isNaN(s));
            const total        = dataToExport.length;
            const totalSelesai = dataToExport.filter(r => r.status === 'SELESAI').length;
            const totalDQ      = dataToExport.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
            const totalOngoing = dataToExport.filter(r => r.status === 'SEDANG MENGERJAKAN').length;
            const avgScore     = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
            const maxScore     = scores.length ? Math.max(...scores) : 0;
            const minScore     = scores.length ? Math.min(...scores) : 0;
            const lulus        = scores.filter(s => s >= window.currentKKM).length;
            const tLulus       = scores.filter(s => s <  window.currentKKM).length;
            const pctLulus     = scores.length ? Math.round((lulus/scores.length)*100) : 0;

            // --- Bangun baris CSV ---
            const lines = [];

            // Baris header dokumen
            lines.push(csvCell(namaSekolah));
            lines.push(csvCell(namaUjian));
            lines.push('');
            lines.push(`${csvCell('Laporan Rekap Nilai')},${csvCell(namaUjian)}`);
            lines.push(`${csvCell('Kelas')},${csvCell(labelCls)},${csvCell('Paket')},${csvCell(labelPkt)},${csvCell('Tanggal')},${csvCell(labelDate)}`);
            lines.push(`${csvCell('Dicetak')},${csvCell(new Date().toLocaleString('id-ID'))}`);
            lines.push('');

            // Header kolom tabel
            const colHeaders = ['No.','Tanggal','Jam','Nama Siswa','NISN','Kelas','Ruang','Paket','Nilai','Predikat','Status','Pelanggaran'];
            lines.push(colHeaders.map(csvCell).join(','));

            // Baris data
            dataToExport.forEach((row, i) => {
                const dateObj  = new Date(row.timestamp);
                const dateStr  = isNaN(dateObj) ? '-' : dateObj.toLocaleDateString('id-ID');
                const timeStr  = isNaN(dateObj) ? '-' : dateObj.toLocaleTimeString('id-ID');
                const sc       = parseFloat(row.score);
                let predikat   = '-';
                if (!isNaN(sc)) {
                    if      (sc >= 90) predikat = 'A (Sangat Baik)';
                    else if (sc >= 80) predikat = 'B (Baik)';
                    else if (sc >= 70) predikat = 'C (Cukup)';
                    else if (sc >= 60) predikat = 'D (Kurang)';
                    else               predikat = 'E (Sangat Kurang)';
                }
                const cells = [
                    i + 1,
                    dateStr,
                    timeStr,
                    row.studentName  || '-',
                    row.studentNisn  || '-',
                    row.className    || '-',
                    row.ruangUjian   || '-',
                    `Paket ${row.packetType || '-'}`,
                    isNaN(sc) ? (row.score || '-') : sc,
                    predikat,
                    row.status       || '-',
                    row.violations   || 0,
                ];
                lines.push(cells.map(csvCell).join(','));
            });

            // Ringkasan statistik di bagian bawah
            lines.push('');
            lines.push('RINGKASAN STATISTIK');
            lines.push(`Total Peserta,${total}`);
            lines.push(`Selesai,${totalSelesai}`);
            lines.push(`Diskualifikasi,${totalDQ}`);
            lines.push(`Sedang Mengerjakan,${totalOngoing}`);
            lines.push(`Nilai Rata-rata,${avgScore}`);
            lines.push(`Nilai Tertinggi,${maxScore}`);
            lines.push(`Nilai Terendah,${minScore}`);
            lines.push(`Lulus (≥${window.currentKKM}),${lulus}`);
            lines.push(`Tidak Lulus (<${window.currentKKM}),${tLulus}`);
            lines.push(`Persentase Lulus,${pctLulus}%`);

            // --- Buat blob & trigger download ---
            // UTF-8 BOM (\uFEFF) agar Excel membaca karakter Indonesia dengan benar
            const csvContent = '\uFEFF' + lines.join('\r\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href     = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function exportToExcelInternal() {
            if (typeof XLSX === 'undefined') { alert("Library XLSX belum siap, coba refresh halaman."); return; }

            const dataToExport = window.currentFilteredData && window.currentFilteredData.length > 0
                ? window.currentFilteredData : dashboardData;

            if (!dataToExport || dataToExport.length === 0) return alert("Belum ada data untuk diexport");

            // --- Ambil data tampilan dari settings ---
            const _app = window._savedAppearance || {};
            const namaUjian   = (_app.judulUjian || 'Rekap Nilai Ujian').trim();
            const namaSekolah = (_app.subJudul   || 'INTEGRITEST').trim();

            // --- Info filter untuk judul ---
            const filterPkt  = document.getElementById('filter-session').value;
            const filterCls  = document.getElementById('filter-class').value;
            const filterDate = document.getElementById('filter-date').value;

            const labelPkt  = filterPkt  !== 'all' ? `Paket ${filterPkt}` : 'Semua Paket';
            const labelCls  = filterCls  !== 'all' ? filterCls : 'Semua Kelas';
            const labelDate = filterDate ? filterDate : new Date().toLocaleDateString('id-ID');

            // --- Nama file dinamis ---
            let filename = namaUjian.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_\-]/g,'');
            if (!filename) filename = 'Rekap_Nilai';
            if (filterCls  !== 'all') filename += `_${filterCls.replace(/\s+/g,'-')}`;
            if (filterPkt  !== 'all') filename += `_Paket-${filterPkt}`;
            if (filterDate)           filename += `_${filterDate}`;
            filename += '.xlsx';

            // ================================================================
            // KALKULASI STATISTIK
            // ================================================================
            const scores = dataToExport.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
            const total      = dataToExport.length;
            const totalSelesai  = dataToExport.filter(r => r.status === 'SELESAI').length;
            const totalDQ       = dataToExport.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
            const totalOngoing  = dataToExport.filter(r => r.status === 'SEDANG MENGERJAKAN').length;
            const avgScore   = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0) / scores.length) : 0;
            const maxScore   = scores.length ? Math.max(...scores) : 0;
            const minScore   = scores.length ? Math.min(...scores) : 0;
            const lulus      = scores.filter(s => s >= window.currentKKM).length;
            const tLulus     = scores.filter(s => s < window.currentKKM).length;
            const pctLulus   = scores.length ? Math.round((lulus / scores.length) * 100) : 0;

            // ================================================================
            // SHEET 1: REKAP NILAI (utama)
            // ================================================================
            const wb = XLSX.utils.book_new();

            // Baris header dokumen (baris 1-7 = info sekolah + judul)
            const headerRows = [
                [namaSekolah],                                               // R1: Nama Sekolah
                [namaUjian],                                                 // R2: Nama Ujian
                [''],                                                         // R3
                [`Laporan Rekap Nilai — ${namaUjian}`],                      // R4
                [`Kelas: ${labelCls}  |  Paket: ${labelPkt}  |  Tanggal: ${labelDate}`], // R5
                [`Dicetak: ${new Date().toLocaleString('id-ID')}`],          // R6
                [''],                                                         // R7
            ];

            // Baris kolom tabel
            const colHeaders = [
                'No.', 'Tanggal', 'Jam', 'Nama Siswa', 'NISN', 'Kelas', 'Ruang',
                'Paket', 'Nilai', 'Predikat', 'Status', 'Pelanggaran',
                'Skor Integritas', 'Predikat Integritas'
            ];

            // Data baris
            const dataRows = dataToExport.map((row, i) => {
                const dateObj = new Date(row.timestamp);
                const dateStr = dateObj.toLocaleDateString('id-ID');
                const timeStr = dateObj.toLocaleTimeString('id-ID');
                const sc = typeof row.score === 'number' ? row.score : parseFloat(row.score);
                let predikat = '-';
                if (!isNaN(sc)) {
                    if (sc >= 90)      predikat = 'A (Sangat Baik)';
                    else if (sc >= 80) predikat = 'B (Baik)';
                    else if (sc >= 70) predikat = 'C (Cukup)';
                    else if (sc >= 60) predikat = 'D (Kurang)';
                    else               predikat = 'E (Sangat Kurang)';
                }
                const intScore = calcIntegrityScore(row);
                const intCat   = getIntegrityCategory(intScore);
                const intPredikat = intScore !== null
                    ? intCat.predikat.replace(/[\uD800-\uDFFF]|[\u2600-\u27BF]/gu, '').trim()
                    : '-';
                return [
                    i + 1,
                    dateStr,
                    timeStr,
                    row.studentName  || '-',
                    row.studentNisn  || '-',
                    row.className    || '-',
                    row.ruangUjian   || '-',
                    `Paket ${row.packetType || '-'}`,
                    isNaN(sc) ? row.score : sc,
                    predikat,
                    row.status       || '-',
                    row.violations   || 0,
                    intScore !== null ? intScore : '-',
                    intPredikat,
                ];
            });

            // Gabungkan semua ke dalam AOA
            const aoa = [
                ...headerRows,
                colHeaders,
                ...dataRows,
                [''], // baris kosong pemisah
            ];

            // Baris statistik di bagian bawah
            const statsStartRow = aoa.length + 1;
            aoa.push(['RINGKASAN STATISTIK']);
            aoa.push(['Total Peserta',     total]);
            aoa.push(['Selesai',           totalSelesai]);
            aoa.push(['Diskualifikasi',    totalDQ]);
            aoa.push(['Sedang Mengerjakan',totalOngoing]);
            aoa.push(['Nilai Rata-rata',   avgScore]);
            aoa.push(['Nilai Tertinggi',   maxScore]);
            aoa.push(['Nilai Terendah',    minScore]);
            aoa.push(['Lulus (≥'+window.currentKKM+')',        lulus]);
            aoa.push(['Tidak Lulus (<'+window.currentKKM+')', tLulus]);
            aoa.push(['Persentase Lulus',  `${pctLulus}%`]);

            const ws = XLSX.utils.aoa_to_sheet(aoa);

            // ---- Lebar kolom ----
            ws['!cols'] = [
                {wch: 5},   // No
                {wch: 13},  // Tanggal
                {wch: 10},  // Jam
                {wch: 28},  // Nama
                {wch: 14},  // NISN
                {wch: 12},  // Kelas
                {wch: 10},  // Ruang
                {wch: 10},  // Paket
                {wch: 8},   // Nilai
                {wch: 20},  // Predikat
                {wch: 28},  // Status
                {wch: 12},  // Pelanggaran
                {wch: 16},  // Skor Integritas
                {wch: 22},  // Predikat Integritas
            ];

            // ---- Baris header info (merge cells) ----
            // Judul sekolah merge A1:N1
            const lastCol = 13; // index N (14 kolom: 0-13)
            ws['!merges'] = [
                { s:{r:0,c:0}, e:{r:0,c:lastCol} }, // Nama sekolah
                { s:{r:1,c:0}, e:{r:1,c:lastCol} }, // Sistem
                { s:{r:3,c:0}, e:{r:3,c:lastCol} }, // Judul laporan
                { s:{r:4,c:0}, e:{r:4,c:lastCol} }, // Info filter
                { s:{r:5,c:0}, e:{r:5,c:lastCol} }, // Dicetak
                { s:{r:statsStartRow-1,c:0}, e:{r:statsStartRow-1,c:lastCol} }, // Ringkasan header
            ];

            // ---- STYLING menggunakan SheetJS style object ----
            // Helper: set cell style
            function sc_(ws, addr, style) {
                if (!ws[addr]) ws[addr] = { v: '', t: 's' };
                ws[addr].s = style;
            }
            function cellAddr(r, c) {
                return XLSX.utils.encode_cell({r, c});
            }

            // Style definitions
            const styleTitleSchool = {
                font: { bold: true, sz: 16, color: { rgb: '1E3A5F' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { fgColor: { rgb: 'DBEAFE' } },
            };
            const styleSubtitle = {
                font: { bold: false, sz: 11, color: { rgb: '374151' } },
                alignment: { horizontal: 'center' },
                fill: { fgColor: { rgb: 'DBEAFE' } },
            };
            const styleLaporan = {
                font: { bold: true, sz: 14, color: { rgb: 'FFFFFF' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { fgColor: { rgb: '1D4ED8' } },
            };
            const styleFilter = {
                font: { sz: 10, color: { rgb: '374151' } },
                alignment: { horizontal: 'center' },
                fill: { fgColor: { rgb: 'EFF6FF' } },
            };
            const stylePrinted = {
                font: { italic: true, sz: 9, color: { rgb: '9CA3AF' } },
                alignment: { horizontal: 'center' },
                fill: { fgColor: { rgb: 'EFF6FF' } },
            };
            const styleColHeader = {
                font: { bold: true, sz: 10, color: { rgb: 'FFFFFF' } },
                alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
                fill: { fgColor: { rgb: '1E40AF' } },
                border: {
                    top:    { style: 'thin', color: { rgb: '93C5FD' } },
                    bottom: { style: 'thin', color: { rgb: '93C5FD' } },
                    left:   { style: 'thin', color: { rgb: '93C5FD' } },
                    right:  { style: 'thin', color: { rgb: '93C5FD' } },
                }
            };
            const styleDataEven = {
                font: { sz: 10 },
                alignment: { vertical: 'center' },
                border: {
                    top:    { style: 'thin', color: { rgb: 'E5E7EB' } },
                    bottom: { style: 'thin', color: { rgb: 'E5E7EB' } },
                    left:   { style: 'thin', color: { rgb: 'E5E7EB' } },
                    right:  { style: 'thin', color: { rgb: 'E5E7EB' } },
                }
            };
            const styleDataOdd = {
                font: { sz: 10 },
                alignment: { vertical: 'center' },
                fill: { fgColor: { rgb: 'F0F9FF' } },
                border: {
                    top:    { style: 'thin', color: { rgb: 'E5E7EB' } },
                    bottom: { style: 'thin', color: { rgb: 'E5E7EB' } },
                    left:   { style: 'thin', color: { rgb: 'E5E7EB' } },
                    right:  { style: 'thin', color: { rgb: 'E5E7EB' } },
                }
            };
            const styleCenter = { alignment: { horizontal: 'center', vertical: 'center' } };
            const styleStatsHeader = {
                font: { bold: true, sz: 11, color: { rgb: 'FFFFFF' } },
                fill: { fgColor: { rgb: '059669' } },
                alignment: { horizontal: 'center' },
            };
            const styleStatsLabel = {
                font: { bold: true, sz: 10, color: { rgb: '065F46' } },
                fill: { fgColor: { rgb: 'D1FAE5' } },
                alignment: { horizontal: 'left' },
                border: { bottom: { style: 'thin', color: { rgb: 'A7F3D0' } } }
            };
            const styleStatsValue = {
                font: { bold: true, sz: 10, color: { rgb: '1D4ED8' } },
                fill: { fgColor: { rgb: 'EFF6FF' } },
                alignment: { horizontal: 'center' },
                border: { bottom: { style: 'thin', color: { rgb: 'BFDBFE' } } }
            };

            // Apply header styles
            for (let c = 0; c <= lastCol; c++) {
                sc_(ws, cellAddr(0, c), styleTitleSchool);
                sc_(ws, cellAddr(1, c), styleSubtitle);
                sc_(ws, cellAddr(3, c), styleLaporan);
                sc_(ws, cellAddr(4, c), styleFilter);
                sc_(ws, cellAddr(5, c), stylePrinted);
            }

            // Row heights (in points)
            ws['!rows'] = [];
            ws['!rows'][0] = { hpt: 30 }; // sekolah
            ws['!rows'][1] = { hpt: 18 };
            ws['!rows'][3] = { hpt: 26 }; // judul laporan
            ws['!rows'][4] = { hpt: 18 };
            ws['!rows'][5] = { hpt: 15 };
            ws['!rows'][7] = { hpt: 22 }; // col headers (row index 7)

            // Apply column header styles (row 7 = index 7)
            const colHeaderRow = 7;
            for (let c = 0; c <= lastCol; c++) {
                sc_(ws, cellAddr(colHeaderRow, c), styleColHeader);
            }

            // Apply data row styles
            dataRows.forEach((row, i) => {
                const r = colHeaderRow + 1 + i;
                const baseStyle = i % 2 === 0 ? styleDataEven : styleDataOdd;
                const sc = row[7]; // nilai (index 7)

                for (let c = 0; c <= lastCol; c++) {
                    let style = JSON.parse(JSON.stringify(baseStyle));

                    // Kolom No, Tanggal, Jam, Paket, Nilai, Predikat, Pelanggaran → center
                    if ([0, 1, 2, 6, 7, 8, 10].includes(c)) {
                        style.alignment = { ...style.alignment, horizontal: 'center' };
                    }

                    // Kolom Nilai — warnai sesuai nilai
                    if (c === 7 && typeof sc === 'number') {
                        style.font = { bold: true, sz: 11 };
                        if (sc >= 80)      style.font.color = { rgb: '16A34A' };
                        else if (sc >= window.currentKKM) style.font.color = { rgb: 'D97706' };
                        else               style.font.color = { rgb: 'DC2626' };
                    }

                    // Kolom Status — warnai
                    if (c === 9) {
                        const status = row[9] || '';
                        if (status.includes('DISKUALIFIKASI')) {
                            style.font = { bold: true, sz: 10, color: { rgb: 'DC2626' } };
                            style.fill = { fgColor: { rgb: 'FEE2E2' } };
                        } else if (status === 'SELESAI') {
                            style.font = { bold: true, sz: 10, color: { rgb: '16A34A' } };
                        } else if (status === 'SEDANG MENGERJAKAN') {
                            style.font = { bold: false, sz: 10, color: { rgb: '2563EB' } };
                        }
                    }

                    // Kolom Pelanggaran
                    if (c === 10 && row[10] > 0) {
                        style.font = { bold: true, sz: 10, color: { rgb: 'DC2626' } };
                    }

                    // Kolom Skor Integritas (index 12) — warnai sesuai skor
                    if (c === 12 && typeof row[12] === 'number') {
                        style.font = { bold: true, sz: 10 };
                        style.alignment = { horizontal: 'center', vertical: 'center' };
                        if (row[12] >= 80)     style.font.color = { rgb: '16A34A' };
                        else if (row[12] >= 60) style.font.color = { rgb: 'D97706' };
                        else if (row[12] > 0)  style.font.color = { rgb: 'DC2626' };
                        else                   { style.font.color = { rgb: 'FFFFFF' }; style.fill = { fgColor: { rgb: 'DC2626' } }; }
                    }

                    // Kolom Predikat Integritas (index 13)
                    if (c === 13) {
                        style.alignment = { horizontal: 'center', vertical: 'center' };
                        const intS = row[12];
                        if (typeof intS === 'number') {
                            if (intS >= 80)     style.font = { bold: true, sz: 9, color: { rgb: '16A34A' } };
                            else if (intS >= 60) style.font = { bold: true, sz: 9, color: { rgb: 'D97706' } };
                            else if (intS > 0)  style.font = { bold: true, sz: 9, color: { rgb: 'DC2626' } };
                            else               style.font = { bold: true, sz: 9, color: { rgb: 'FFFFFF' } };
                        }
                    }

                    sc_(ws, cellAddr(r, c), style);
                }
            });

            // Apply statistik styles
            const statsLabelRow = statsStartRow; // row index di AOA (0-based)
            sc_(ws, cellAddr(statsLabelRow - 1, 0), styleStatsHeader); // "RINGKASAN STATISTIK"
            for (let c = 1; c <= lastCol; c++) sc_(ws, cellAddr(statsLabelRow - 1, c), styleStatsHeader);

            for (let i = 0; i < 11; i++) {
                sc_(ws, cellAddr(statsLabelRow + i, 0), styleStatsLabel);
                sc_(ws, cellAddr(statsLabelRow + i, 1), styleStatsValue);
            }

            XLSX.utils.book_append_sheet(wb, ws, 'Rekap Nilai');

            // ================================================================
            // SHEET 2: STATISTIK PER KELAS (baru, lebih detail)
            // ================================================================
            const wsKelas = buildKelasStatistikSheet(dataToExport);
            if (wsKelas) XLSX.utils.book_append_sheet(wb, wsKelas, 'Statistik Per Kelas');

            // ================================================================
            // SHEET 3: ANALISIS PER KELAS (grafik data)
            // ================================================================
            const wsAnalysis = buildAnalysisSheet(dataToExport);
            if (wsAnalysis) XLSX.utils.book_append_sheet(wb, wsAnalysis, 'Distribusi Nilai');

            // ================================================================
            // SHEET 3: DETAIL PELANGGARAN
            // ================================================================
            const wsPelanggaran = buildPelanggaranSheet(dataToExport);
            if (wsPelanggaran) XLSX.utils.book_append_sheet(wb, wsPelanggaran, 'Detail Pelanggaran');

            // ================================================================
            // SHEET BARU: e-RAPOR (format kompatibel impor e-Rapor Kemendikbud)
            // Kolom: NISN, Nama Siswa, Kelas, Mata Pelajaran, Nilai Angka,
            //        Predikat Nilai, Skor Integritas, Predikat Integritas,
            //        Tanggal Ujian, Jam Ujian, Status
            // ================================================================
            (function() {
                const _app3 = window._savedAppearance || {};
                const mapel = (_app3.judulUjian || 'Mata Pelajaran').trim();
                const finRows = dataToExport.filter(r =>
                    r.status === 'SELESAI' || (r.status || '').includes('DISKUALIFIKASI')
                );
                if (!finRows.length) return;

                const wsRapor = XLSX.utils.aoa_to_sheet([
                    // Baris info
                    ['INTEGRITEST — Format Ekspor e-Rapor'],
                    [`Mata Pelajaran: ${mapel}  |  Dicetak: ${new Date().toLocaleString('id-ID')}`],
                    ['Catatan: Kolom ini kompatibel dengan format impor e-Rapor Kemendikbud (NISN, Nama, Kelas, Nilai Angka, Predikat).'],
                    [],
                    // Header kolom
                    [
                        'NISN', 'Nama Siswa', 'Kelas', 'Mata Pelajaran',
                        'Nilai Angka', 'Predikat Nilai',
                        'Skor Integritas', 'Predikat Integritas',
                        'Tanggal Ujian', 'Jam Ujian', 'Status Ujian'
                    ],
                    // Data baris
                    ...finRows.map(r => {
                        const sc2   = typeof r.score === 'number' ? r.score : parseFloat(r.score);
                        const iSc   = calcIntegrityScore(r);
                        const iCat  = getIntegrityCategory(iSc);
                        const iPred = iSc !== null
                            ? iCat.predikat.replace(/[\uD800-\uDFFF]|[\u2600-\u27BF]/gu, '').trim()
                            : '-';
                        let pred2 = '-';
                        if (!isNaN(sc2)) {
                            if (sc2 >= 90) pred2 = 'A';
                            else if (sc2 >= 80) pred2 = 'B';
                            else if (sc2 >= 70) pred2 = 'C';
                            else if (sc2 >= 60) pred2 = 'D';
                            else pred2 = 'E';
                        }
                        const d2 = new Date(r.timestamp);
                        return [
                            r.studentNisn  || '-',
                            r.studentName  || '-',
                            r.className    || '-',
                            mapel,
                            isNaN(sc2) ? '-' : sc2,
                            pred2,
                            iSc !== null ? iSc : '-',
                            iPred,
                            d2.toLocaleDateString('id-ID'),
                            d2.toLocaleTimeString('id-ID'),
                            r.status || '-'
                        ];
                    })
                ]);

                // Lebar kolom e-Rapor
                wsRapor['!cols'] = [
                    {wch:14},{wch:28},{wch:12},{wch:22},
                    {wch:12},{wch:14},
                    {wch:16},{wch:22},
                    {wch:13},{wch:10},{wch:28}
                ];

                // Styling header e-Rapor
                function ca2(r,c){ return XLSX.utils.encode_cell({r,c}); }
                function ss2(ws,addr,style){ if(!ws[addr]) ws[addr]={v:'',t:'s'}; ws[addr].s=style; }
                const sRaporTitle = { font:{bold:true,sz:13,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'7C3AED'}}, alignment:{horizontal:'center'} };
                const sRaporSub   = { font:{sz:9,color:{rgb:'6B7280'}}, fill:{fgColor:{rgb:'F5F3FF'}}, alignment:{horizontal:'center'} };
                const sRaporNote  = { font:{italic:true,sz:8,color:{rgb:'9CA3AF'}}, fill:{fgColor:{rgb:'F5F3FF'}}, alignment:{horizontal:'left',wrapText:true} };
                const sRaporHead  = { font:{bold:true,sz:10,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'7C3AED'}}, alignment:{horizontal:'center',vertical:'center',wrapText:true}, border:{bottom:{style:'thin',color:{rgb:'A78BFA'}}} };
                const sRaporEven  = { font:{sz:10}, alignment:{vertical:'center'}, border:{bottom:{style:'thin',color:{rgb:'E5E7EB'}}} };
                const sRaporOdd   = { font:{sz:10}, fill:{fgColor:{rgb:'F5F3FF'}}, alignment:{vertical:'center'}, border:{bottom:{style:'thin',color:{rgb:'E5E7EB'}}} };

                const nCols = 10; // 0-10
                wsRapor['!merges'] = [
                    {s:{r:0,c:0},e:{r:0,c:nCols}},
                    {s:{r:1,c:0},e:{r:1,c:nCols}},
                    {s:{r:2,c:0},e:{r:2,c:nCols}},
                ];
                for(let c=0;c<=nCols;c++){
                    ss2(wsRapor,ca2(0,c),sRaporTitle);
                    ss2(wsRapor,ca2(1,c),sRaporSub);
                    ss2(wsRapor,ca2(2,c),sRaporNote);
                    ss2(wsRapor,ca2(4,c),sRaporHead); // row 4 = header kolom
                }
                wsRapor['!rows'] = [{hpt:26},{hpt:14},{hpt:28},{hpt:4},{hpt:22}];

                // Styling data rows
                finRows.forEach((_,i) => {
                    const r = 5 + i;
                    const baseS = i % 2 === 0 ? sRaporEven : sRaporOdd;
                    for(let c=0;c<=nCols;c++){
                        const s = JSON.parse(JSON.stringify(baseS));
                        if([0,4,5,6,7,8,9].includes(c)) s.alignment = {...(s.alignment||{}), horizontal:'center'};
                        ss2(wsRapor,ca2(r,c),s);
                    }
                });

                XLSX.utils.book_append_sheet(wb, wsRapor, 'e-Rapor');
            })();

            // Tulis file
            XLSX.writeFile(wb, filename);
        }

        function buildKelasStatistikSheet(data) {
            if (!data || data.length === 0) return null;

            const finishedData = data.filter(r => r.status !== 'SEDANG MENGERJAKAN' && !r.status.includes('MELANJUTKAN'));
            if (finishedData.length === 0) return null;

            const _app2 = window._savedAppearance || {};
            const _namaUjian2   = (_app2.judulUjian || 'Rekap Nilai Ujian').trim();
            const _namaSekolah2 = (_app2.subJudul   || 'INTEGRITEST').trim();

            const now = new Date().toLocaleString('id-ID');
            const byKelas = {};
            finishedData.forEach(row => {
                const cls = row.className || 'Tidak Diketahui';
                if (!byKelas[cls]) byKelas[cls] = [];
                byKelas[cls].push(row);
            });

            const aoa = [
                [_namaSekolah2],
                [`${_namaUjian2} — Statistik Nilai Per Kelas`],
                [`Dicetak: ${now}`],
                [''],
            ];

            function sc_(ws, addr, style) { if (!ws[addr]) ws[addr] = {v:'',t:'s'}; ws[addr].s = style; }
            function ca(r, c) { return XLSX.utils.encode_cell({r, c}); }

            const merges = [
                { s:{r:0,c:0}, e:{r:0,c:11} }, // Nama sekolah
                { s:{r:1,c:0}, e:{r:1,c:11} }, // Nama ujian
                { s:{r:2,c:0}, e:{r:2,c:11} }, // Dicetak
            ];
            let currentRow = 4; // 0-indexed (mulai setelah 4 baris header)

            Object.entries(byKelas).sort().forEach(([kelas, rows]) => {
                const scores = rows.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
                const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : '-';
                const max = scores.length ? Math.max(...scores) : '-';
                const min = scores.length ? Math.min(...scores) : '-';
                const lulus = scores.filter(s => s >= window.currentKKM).length;
                const tLulus = scores.filter(s => s < window.currentKKM).length;
                const pct = scores.length ? Math.round((lulus/scores.length)*100) : 0;
                const dq = rows.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
                const avgViol = rows.length ? (rows.reduce((a,r)=>a+(r.violations||0),0)/rows.length).toFixed(2) : 0;

                // Distribusi per kelas
                const dist = [
                    { label:'A (90-100)', cnt: scores.filter(s=>s>=90).length },
                    { label:'B (80-89)',  cnt: scores.filter(s=>s>=80&&s<90).length },
                    { label:'C (70-79)',  cnt: scores.filter(s=>s>=70&&s<80).length },
                    { label:'D (60-69)',  cnt: scores.filter(s=>s>=60&&s<70).length },
                    { label:'E (<60)',    cnt: scores.filter(s=>s<60).length },
                ];

                // Header kelas
                aoa.push([`KELAS: ${kelas}`, '', '', '', '', '', '', '', '', '', '', '']);
                merges.push({ s:{r:currentRow,c:0}, e:{r:currentRow,c:11} });
                currentRow++;

                // Sub-header ringkasan
                aoa.push(['Peserta', 'Selesai', 'Rata-rata', 'Tertinggi', 'Terendah', 'Lulus (≥'+window.currentKKM+')', 'Tidak Lulus', '% Lulus', 'DQ', 'Rata-rata Pelanggaran', '', '']);
                currentRow++;

                // Data ringkasan
                aoa.push([rows.length, rows.filter(r=>r.status==='SELESAI').length, parseFloat(avg), max, min, lulus, tLulus, `${pct}%`, dq, parseFloat(avgViol), '', '']);
                currentRow++;

                // Distribusi
                aoa.push(['Predikat', 'Jumlah', '% dari kelas', '', '', '', '', '', '', '', '', '']);
                currentRow++;
                dist.forEach(d => {
                    const dpct = scores.length ? Math.round((d.cnt/scores.length)*100) : 0;
                    aoa.push([d.label, d.cnt, `${dpct}%`, '', '', '', '', '', '', '', '', '']);
                    currentRow++;
                });

                aoa.push(['']); currentRow++;
            });

            const ws = XLSX.utils.aoa_to_sheet(aoa);
            ws['!cols'] = Array(12).fill({wch:14});
            ws['!cols'][0] = {wch:20};
            ws['!merges'] = merges;

            // Apply styles for title
            for (let c = 0; c <= 11; c++) {
                sc_(ws, ca(0,c), { font:{bold:true,sz:14,color:{rgb:'1E3A5F'}}, fill:{fgColor:{rgb:'DBEAFE'}}, alignment:{horizontal:'center'} });
                sc_(ws, ca(1,c), { font:{bold:true,sz:13,color:{rgb:'1E40AF'}}, fill:{fgColor:{rgb:'EFF6FF'}}, alignment:{horizontal:'center'} });
                sc_(ws, ca(2,c), { font:{sz:9,color:{rgb:'6B7280'}}, fill:{fgColor:{rgb:'F8FAFC'}}, alignment:{horizontal:'center'} });
            }
            ws['!rows'] = [];
            ws['!rows'][0] = { hpt: 26 };
            ws['!rows'][1] = { hpt: 22 };
            ws['!rows'][2] = { hpt: 14 };

            return ws;
        }

        function buildAnalysisSheet(data) {
            if (!data || data.length === 0) return null;

            // ── Hanya data yang sudah selesai untuk analisis ──
            const finishedData = data.filter(r => r.status !== 'SEDANG MENGERJAKAN' && !r.status.includes('MELANJUTKAN'));

            // Group by kelas
            const byKelas = {};
            finishedData.forEach(row => {
                const cls = row.className || 'Tidak Diketahui';
                if (!byKelas[cls]) byKelas[cls] = [];
                byKelas[cls].push(row);
            });

            const _app3 = window._savedAppearance || {};
            const _namaUjian3   = (_app3.judulUjian || 'Rekap Nilai Ujian').trim();
            const _namaSekolah3 = (_app3.subJudul   || 'INTEGRITEST').trim();

            const now = new Date().toLocaleString('id-ID');
            const aoa = [
                [_namaSekolah3],
                [`${_namaUjian3} — Analisis Statistik Per Kelas`],
                [`Dicetak: ${now}   |   Total Data: ${finishedData.length} peserta (sudah selesai)`],
                [''],
                ['Kelas', 'Peserta', 'Rata-rata', 'Tertinggi', 'Terendah', 'Lulus (≥'+window.currentKKM+')', 'Tidak Lulus', '% Lulus', 'DQ', 'Rata-rata Pelanggaran'],
            ];

            const classRows = [];
            Object.entries(byKelas).sort().forEach(([kelas, rows]) => {
                const scores = rows.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
                const avg    = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : '-';
                const max    = scores.length ? Math.max(...scores) : '-';
                const min    = scores.length ? Math.min(...scores) : '-';
                const lulus  = scores.filter(s => s >= window.currentKKM).length;
                const tLulus = scores.filter(s => s < window.currentKKM).length;
                const pct    = scores.length ? Math.round((lulus/scores.length)*100) : 0;
                const dq     = rows.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
                const avgViol = rows.length ? (rows.reduce((a,r)=>a+(r.violations||0),0)/rows.length).toFixed(1) : 0;
                const rowData = [kelas, rows.length, parseFloat(avg), max, min, lulus, tLulus, `${pct}%`, dq, parseFloat(avgViol)];
                aoa.push(rowData);
                classRows.push({ pct, avg: parseFloat(avg), dq });
            });

            // Baris total
            aoa.push(['']);
            const allScores = finishedData.map(r => typeof r.score === 'number' ? r.score : parseFloat(r.score)).filter(s => !isNaN(s));
            const totalLulus = allScores.filter(s => s >= window.currentKKM).length;
            const totalDQ = finishedData.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
            const grandAvg = allScores.length ? (allScores.reduce((a,b)=>a+b,0)/allScores.length).toFixed(1) : 0;
            const grandAvgViol = finishedData.length ? (finishedData.reduce((a,r)=>a+(r.violations||0),0)/finishedData.length).toFixed(1) : 0;
            aoa.push([
                'GRAND TOTAL',
                finishedData.length,
                parseFloat(grandAvg),
                allScores.length ? Math.max(...allScores) : '-',
                allScores.length ? Math.min(...allScores) : '-',
                totalLulus,
                allScores.filter(s => s < window.currentKKM).length,
                allScores.length ? `${Math.round((totalLulus/allScores.length)*100)}%` : '-',
                totalDQ,
                parseFloat(grandAvgViol),
            ]);

            // ── Distribusi Nilai ──
            aoa.push(['']);
            aoa.push(['DISTRIBUSI NILAI (KESELURUHAN)']);
            aoa.push(['Rentang', 'Predikat', 'Jumlah Siswa', 'Persentase']);
            const distrib = [
                { label:'90 - 100', pred:'A (Sangat Baik)',  filter: s => s >= 90 },
                { label:'80 - 89',  pred:'B (Baik)',          filter: s => s >= 80 && s < 90 },
                { label:'70 - 79',  pred:'C (Cukup)',         filter: s => s >= 70 && s < 80 },
                { label:'60 - 69',  pred:'D (Kurang)',        filter: s => s >= 60 && s < 70 },
                { label:'< 60',     pred:'E (Sangat Kurang)', filter: s => s < 60  },
            ];
            distrib.forEach(d => {
                const cnt = allScores.filter(d.filter).length;
                const pct = allScores.length ? Math.round((cnt/allScores.length)*100) : 0;
                aoa.push([d.label, d.pred, cnt, `${pct}%`]);
            });

            const ws = XLSX.utils.aoa_to_sheet(aoa);
            ws['!cols'] = [{wch:20},{wch:10},{wch:12},{wch:12},{wch:12},{wch:13},{wch:13},{wch:10},{wch:6},{wch:18}];
            ws['!merges'] = [
                { s:{r:0,c:0}, e:{r:0,c:9} },
                { s:{r:1,c:0}, e:{r:1,c:9} },
                { s:{r:2,c:0}, e:{r:2,c:9} },
            ];

            // Helper style cells
            function sc_(ws, addr, style) {
                if (!ws[addr]) ws[addr] = { v: '', t: 's' };
                ws[addr].s = style;
            }
            function ca(r, c) { return XLSX.utils.encode_cell({r, c}); }

            const sTitle = { font:{bold:true,sz:14,color:{rgb:'1E3A5F'}}, fill:{fgColor:{rgb:'DBEAFE'}}, alignment:{horizontal:'center'} };
            const sSub   = { font:{bold:true,sz:13,color:{rgb:'1E40AF'}}, fill:{fgColor:{rgb:'EFF6FF'}}, alignment:{horizontal:'center'} };
            const sSub2  = { font:{sz:9,color:{rgb:'6B7280'}}, fill:{fgColor:{rgb:'F8FAFC'}}, alignment:{horizontal:'center'} };
            const sHead  = { font:{bold:true,sz:10,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'1E40AF'}}, alignment:{horizontal:'center',wrapText:true},
                             border:{top:{style:'thin',color:{rgb:'93C5FD'}},bottom:{style:'thin',color:{rgb:'93C5FD'}},left:{style:'thin',color:{rgb:'93C5FD'}},right:{style:'thin',color:{rgb:'93C5FD'}}} };
            const sTotal = { font:{bold:true,sz:10,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'1D4ED8'}}, alignment:{horizontal:'center'} };
            const sDHead = { font:{bold:true,sz:11,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'7C3AED'}}, alignment:{horizontal:'center'} };
            const sDSub  = { font:{bold:true,sz:9,color:{rgb:'FFFFFF'}},  fill:{fgColor:{rgb:'7C3AED'}}, alignment:{horizontal:'center'} };

            // Title rows
            for (let c = 0; c <= 9; c++) {
                sc_(ws, ca(0,c), sTitle);
                sc_(ws, ca(1,c), sSub);
                sc_(ws, ca(2,c), sSub2);
            }
            // Header row (row 4)
            for (let c = 0; c <= 9; c++) sc_(ws, ca(4,c), sHead);

            // Data rows
            const dataStartR = 5;
            classRows.forEach((cr, i) => {
                const r = dataStartR + i;
                const baseEven = { font:{sz:10}, fill:{fgColor:{rgb:'F0F9FF'}}, alignment:{horizontal:'center'}, border:{bottom:{style:'thin',color:{rgb:'E5E7EB'}}} };
                const baseOdd  = { font:{sz:10}, alignment:{horizontal:'center'}, border:{bottom:{style:'thin',color:{rgb:'E5E7EB'}}} };
                const base = i%2===0 ? baseEven : baseOdd;
                for (let c = 0; c <= 9; c++) {
                    let s = JSON.parse(JSON.stringify(base));
                    if (c === 0) s.alignment = { horizontal:'left' };
                    // % Lulus (c=7): warna sesuai pct
                    if (c === 7) {
                        s.font = { bold:true, sz:10, color:{ rgb: cr.pct>=75 ? '16A34A' : cr.pct>=50 ? 'D97706' : 'DC2626' } };
                    }
                    // Rata-rata (c=2): warna
                    if (c === 2) {
                        s.font = { bold:true, sz:10, color:{ rgb: cr.avg>=80 ? '16A34A' : cr.avg>=60 ? 'D97706' : 'DC2626' } };
                    }
                    // DQ (c=8): merah jika ada
                    if (c === 8 && cr.dq > 0) {
                        s.font = { bold:true, sz:10, color:{ rgb:'DC2626' } };
                    }
                    sc_(ws, ca(r, c), s);
                }
            });

            // Grand total row
            const totalR = dataStartR + classRows.length + 1; // +1 for empty row
            for (let c = 0; c <= 9; c++) sc_(ws, ca(totalR, c), sTotal);

            // Distribusi section header
            const distribTitleR = totalR + 2;
            for (let c = 0; c <= 9; c++) sc_(ws, ca(distribTitleR, c), sDHead);
            const distribHeadR = distribTitleR + 1;
            for (let c = 0; c <= 3; c++) sc_(ws, ca(distribHeadR, c), sDSub);

            ws['!rows'] = [];
            ws['!rows'][0] = { hpt: 28 };
            ws['!rows'][4] = { hpt: 22 };

            return ws;
        }

        function buildPelanggaranSheet(data) {
            const cheaters = data.filter(r => r.violations > 0 || (r.status||'').includes('DISKUALIFIKASI'));
            if (cheaters.length === 0) return null;

            const _app4 = window._savedAppearance || {};
            const _namaUjian4   = (_app4.judulUjian || 'Rekap Nilai Ujian').trim();
            const _namaSekolah4 = (_app4.subJudul   || 'INTEGRITEST').trim();

            const aoa = [
                [_namaSekolah4],
                [`${_namaUjian4} — Laporan Detail Pelanggaran`],
                [`Dicetak: ${new Date().toLocaleString('id-ID')}`],
                [''],
                ['No.', 'Nama Siswa', 'NISN', 'Kelas', 'Paket', 'Nilai', 'Status', 'Jml Pelanggaran', 'Log Pelanggaran'],
            ];

            cheaters.forEach((row, i) => {
                const logs = (row.violationLogs || []).map((l, li) => {
                    const t = new Date(l.time).toLocaleTimeString('id-ID');
                    return `${li+1}. [${t}] ${l.message}`;
                }).join('\n');
                aoa.push([
                    i + 1,
                    row.studentName  || '-',
                    row.studentNisn  || '-',
                    row.className    || '-',
                    `Paket ${row.packetType || '-'}`,
                    row.score,
                    row.status       || '-',
                    row.violations   || 0,
                    logs || 'Tidak ada log',
                ]);
            });

            const ws = XLSX.utils.aoa_to_sheet(aoa);
            ws['!cols'] = [{wch:5},{wch:28},{wch:14},{wch:12},{wch:10},{wch:8},{wch:28},{wch:15},{wch:60}];
            ws['!merges'] = [
                { s:{r:0,c:0}, e:{r:0,c:8} }, // Nama sekolah
                { s:{r:1,c:0}, e:{r:1,c:8} }, // Nama ujian
                { s:{r:2,c:0}, e:{r:2,c:8} }, // Dicetak
            ];

            // Style header pelanggaran
            function sc_p(ws, addr, style) { if (!ws[addr]) ws[addr] = {v:'',t:'s'}; ws[addr].s = style; }
            function ca_p(r, c) { return XLSX.utils.encode_cell({r, c}); }
            for (let c = 0; c <= 8; c++) {
                sc_p(ws, ca_p(0,c), { font:{bold:true,sz:14,color:{rgb:'7F1D1D'}}, fill:{fgColor:{rgb:'FEE2E2'}}, alignment:{horizontal:'center'} });
                sc_p(ws, ca_p(1,c), { font:{bold:true,sz:12,color:{rgb:'991B1B'}}, fill:{fgColor:{rgb:'FEF2F2'}}, alignment:{horizontal:'center'} });
                sc_p(ws, ca_p(2,c), { font:{sz:9,color:{rgb:'6B7280'}}, fill:{fgColor:{rgb:'F8FAFC'}},            alignment:{horizontal:'center'} });
                sc_p(ws, ca_p(4,c), { font:{bold:true,sz:10,color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:'DC2626'}}, alignment:{horizontal:'center',wrapText:true} });
            }
            ws['!rows'] = [{ hpt:24 },{ hpt:20 },{ hpt:14 },{},{ hpt:22 }];
            return ws;
        }

        // ==========================================
        // IMPORT SOAL - EXCEL & WORD + DOWNLOAD TEMPLATE
        // ==========================================

        // Variabel global untuk menyimpan soal yang sudah di-parse
        window.parsedExcelQuestions = [];
        window.parsedWordQuestions  = [];


        // ---------- DOWNLOAD TEMPLATE EXCEL ----------
        window.downloadExcelTemplate = function() {
            if (typeof XLSX === 'undefined') { alert("Library XLSX belum siap, coba refresh halaman."); return; }
            const wb = XLSX.utils.book_new();

            // ── Sheet 1: Pilihan Tunggal (single) ──
            const ws1 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','option_a','image_a','option_b','image_b','option_c','image_c','option_d','image_d','option_e','image_e','correct'],
                ['A','single','Apa kepanjangan dari TKJ?','','Teknik Komputer dan Jaringan','','Teknologi Komunikasi Jaringan','','Teknik Komunikasi dan Jaringan','','Teknologi Komputer dan Jaringan','','','','A'],
                ['A','single','Protokol untuk mengirim email adalah...','','SMTP','','HTTP','','FTP','','SSH','','DNS','','A'],
                ['B','single','Perhatikan topologi jaringan berikut!','https://drive.google.com/file/d/GANTI_ID/view','Star','','Bus','','Ring','','Mesh','','','','A'],
                ['C','single','Pilih gambar yang menunjukkan kabel UTP!','','','https://drive.google.com/file/d/ID_A/view','','https://drive.google.com/file/d/ID_B/view','','https://drive.google.com/file/d/ID_C/view','','https://drive.google.com/file/d/ID_D/view','','','A'],
            ]);
            ws1['!cols'] = [{wch:8},{wch:12},{wch:45},{wch:38},{wch:26},{wch:38},{wch:26},{wch:38},{wch:26},{wch:38},{wch:26},{wch:38},{wch:26},{wch:38},{wch:10}];
            XLSX.utils.book_append_sheet(wb, ws1, '1.Pilihan_Tunggal');

            // ── Sheet 2: Jawaban Ganda (multiple) ──
            const ws2 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','option_a','option_b','option_c','option_d','option_e','correct_multiple'],
                ['A','multiple','Manakah yang termasuk perangkat jaringan? (pilih semua)','','Switch','Router','Monitor','Keyboard','Hub','A,B,E'],
                ['B','multiple','Protokol yang bekerja di Layer 7 OSI adalah...','','HTTP','FTP','IP','TCP','SMTP','A,B,E'],
            ]);
            ws2['!cols'] = [{wch:8},{wch:12},{wch:52},{wch:38},{wch:22},{wch:22},{wch:22},{wch:22},{wch:22},{wch:20}];
            XLSX.utils.book_append_sheet(wb, ws2, '2.Jawaban_Ganda');

            // ── Sheet 3: Benar/Salah (truefalse) ──
            const ws3 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','correct_tf'],
                ['A','truefalse','Switch adalah perangkat Layer 2 dalam model OSI.','','TRUE'],
                ['B','truefalse','IP address kelas C memiliki range 192.168.0.0 - 255.255.','','FALSE'],
                ['A','truefalse','Kabel UTP cat6 mendukung kecepatan hingga 10 Gbps.','','TRUE'],
            ]);
            ws3['!cols'] = [{wch:8},{wch:12},{wch:62},{wch:38},{wch:12}];
            XLSX.utils.book_append_sheet(wb, ws3, '3.Benar_Salah');

            // ── Sheet 4: Esai/Uraian (essay) ──
            const ws4 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','essay_rubrik','essay_skor_maks'],
                ['A','essay','Jelaskan perbedaan hub dan switch dalam jaringan komputer!','','Jawaban harus mencakup: (1) Hub bekerja di Layer 1 dan meneruskan ke semua port; (2) Switch bekerja di Layer 2 menggunakan MAC address; (3) Switch lebih efisien karena mengirim ke port tujuan saja.','10'],
                ['B','essay','Sebutkan dan jelaskan minimal 3 topologi jaringan beserta kelebihan dan kekurangannya!','','Sebutkan min 3 dari: Star/Bus/Ring/Mesh/Tree. Tiap topologi: +1 nama, +1 kelebihan, +1 kekurangan.','10'],
            ]);
            ws4['!cols'] = [{wch:8},{wch:8},{wch:55},{wch:38},{wch:72},{wch:16}];
            XLSX.utils.book_append_sheet(wb, ws4, '4.Esai_Uraian');

            // ── Sheet 5: Menjodohkan (menjodohkan) ──
            const ws5 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','pair_1_kiri','pair_1_kanan','pair_2_kiri','pair_2_kanan','pair_3_kiri','pair_3_kanan','pair_4_kiri','pair_4_kanan','pair_5_kiri','pair_5_kanan'],
                ['A','menjodohkan','Jodohkan perangkat berikut dengan fungsinya!','','Switch','Mengelola MAC address LAN','Router','Routing antar jaringan berbeda','Hub','Broadcast ke semua port','Modem','Konversi sinyal digital ke analog','',''],
                ['B','menjodohkan','Pasangkan lapisan OSI dengan fungsinya!','','Physical Layer','Transmisi bit via media fisik','Data Link Layer','Frame antar node langsung','Network Layer','Pengalamatan dan routing','Transport Layer','Menjamin pengiriman end-to-end','',''],
            ]);
            ws5['!cols'] = [{wch:8},{wch:14},{wch:48},{wch:35},{wch:28},{wch:45},{wch:28},{wch:45},{wch:28},{wch:45},{wch:28},{wch:45},{wch:28},{wch:45}];
            XLSX.utils.book_append_sheet(wb, ws5, '5.Menjodohkan');

            // ── Sheet 6: Gabungan semua tipe dalam 1 sheet ──
            const ws6 = XLSX.utils.aoa_to_sheet([
                ['packet','tipe','question','question_image','option_a','image_a','option_b','image_b','option_c','image_c','option_d','image_d','option_e','image_e','correct','correct_multiple','correct_tf','essay_rubrik','essay_skor_maks','pair_1_kiri','pair_1_kanan','pair_2_kiri','pair_2_kanan','pair_3_kiri','pair_3_kanan','pair_4_kiri','pair_4_kanan','pair_5_kiri','pair_5_kanan'],
                ['A','single','Soal pilihan tunggal contoh','','Opsi A','','Opsi B','','Opsi C','','Opsi D','','','','A','','','','','','','','','','','','','',''],
                ['A','multiple','Soal jawaban ganda contoh','','Opsi A','','Opsi B','','Opsi C','','Opsi D','','Opsi E','','','A,C,E','','','','','','','','','','','','',''],
                ['B','truefalse','Pernyataan benar/salah contoh','','','','','','','','','','','','','','TRUE','','','','','','','','','','','',''],
                ['B','essay','Pertanyaan esai contoh','','','','','','','','','','','','','','','Rubrik penilaian di sini','10','','','','','','','','','',''],
                ['A','menjodohkan','Soal menjodohkan contoh','','','','','','','','','','','','','','','','','Item kiri 1','Item kanan 1','Item kiri 2','Item kanan 2','Item kiri 3','Item kanan 3','','','',''],
            ]);
            ws6['!cols'] = Array(29).fill(null).map((_,i) => ({wch: i < 4 ? 12 : 18}));
            XLSX.utils.book_append_sheet(wb, ws6, '6.Gabungan_Semua_Tipe');

            // ── Sheet 7: Petunjuk Lengkap ──
            const ws7 = XLSX.utils.aoa_to_sheet([
                ['PETUNJUK TEMPLATE SOAL INTEGRITEST — SEMUA TIPE'],
                [''],
                ['KOLOM WAJIB (berlaku semua tipe):'],
                ['Kolom','Keterangan','Contoh Isi'],
                ['packet','Paket soal: A, B, atau C (huruf kapital)','A'],
                ['tipe','Tipe soal: single / multiple / truefalse / essay / menjodohkan  (jika kosong = single)','single'],
                ['question','Teks pertanyaan/pernyataan. Boleh kosong jika ada question_image','Apa kepanjangan TKJ?'],
                ['question_image','URL gambar soal Google Drive (opsional)','https://drive.google.com/file/d/ID/view'],
                [''],
                ['TIPE: single — Pilihan Tunggal (sheet 1.Pilihan_Tunggal)'],
                ['  option_a s/d option_d','Teks pilihan A–D. Minimal 4 wajib diisi','Teknik Komputer dan Jaringan'],
                ['  option_e','Pilihan ke-5 (opsional)',''],
                ['  image_a s/d image_e','URL gambar tiap pilihan (opsional)','https://drive.google.com/file/d/ID/view'],
                ['  correct','Huruf jawaban benar: A / B / C / D / E (kapital)','A'],
                [''],
                ['TIPE: multiple — Jawaban Ganda (sheet 2.Jawaban_Ganda)'],
                ['  option_a s/d option_e','Teks pilihan (min 4 diisi)','Switch'],
                ['  correct_multiple','Huruf-huruf benar dipisah koma','A,B,E'],
                [''],
                ['TIPE: truefalse — Benar/Salah (sheet 3.Benar_Salah)'],
                ['  correct_tf','Kunci jawaban: TRUE atau FALSE (kapital)','TRUE'],
                [''],
                ['TIPE: essay — Esai/Uraian (sheet 4.Esai_Uraian)'],
                ['  essay_rubrik','Rubrik/kunci jawaban untuk koreksi AI atau guru (WAJIB)','Sebutkan min 3 poin: ...'],
                ['  essay_skor_maks','Skor maksimum (angka, default 10)','10'],
                [''],
                ['TIPE: menjodohkan — Pasangkan (sheet 5.Menjodohkan)'],
                ['  pair_N_kiri','Teks item kolom kiri pasangan ke-N  (N = 1 hingga 5)','Switch'],
                ['  pair_N_kanan','Teks item kolom kanan pasangan ke-N','Mengelola MAC address'],
                ['  ','Minimal 2 pasang, maksimal 5 pasang',''],
                [''],
                ['TIPS GOOGLE DRIVE:'],
                ['  1. Upload gambar ke Google Drive','',''],
                ['  2. Klik kanan → Bagikan → ubah ke "Siapa pun yang memiliki link"','',''],
                ['  3. Salin link → paste di kolom gambar yang sesuai','',''],
                ['  4. Sistem otomatis konversi URL Drive ke format yang bisa ditampilkan','',''],
                [''],
                ['CATATAN:'],
                ['  - Semua tipe bisa dicampur dalam 1 sheet (lihat sheet 6.Gabungan_Semua_Tipe)'],
                ['  - Baris dengan packet tidak valid (bukan A/B/C) otomatis dilewati'],
                ['  - Baris dengan tipe tidak valid otomatis dilewati'],
                ['  - Kolom yang tidak relevan dengan tipe soal diabaikan oleh sistem'],
            ]);
            ws7['!cols'] = [{wch:32},{wch:62},{wch:40}];
            XLSX.utils.book_append_sheet(wb, ws7, 'Petunjuk');

            XLSX.writeFile(wb, 'Template_Soal_INTEGRITEST.xlsx');
        };

        // ---------- DOWNLOAD TEMPLATE WORD ----------
        window.downloadWordTemplate = function() {
            const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>Template Soal INTEGRITEST</title>
<style>
@page {
  size: A4 landscape;
  mso-page-orientation: landscape;
  margin: 1.5cm 1.8cm 1.5cm 1.8cm;
}
@page Section1 { size: 29.7cm 21cm; mso-page-orientation: landscape; }
div.Section1 { page: Section1; }

body {
  font-family: Arial, sans-serif;
  font-size: 9.5pt;
  margin: 0;
}
h1 {
  font-size: 14pt;
  color: #1d4ed8;
  margin: 0 0 6px 0;
  border-bottom: 3px solid #2563eb;
  padding-bottom: 6px;
}
h2 {
  font-size: 10.5pt;
  color: #1e3a8a;
  margin: 16px 0 4px 0;
  padding: 5px 10px;
  background: #eff6ff;
  border-left: 5px solid #2563eb;
  page-break-after: avoid;
}
p.sub {
  font-size: 8.5pt;
  color: #6b7280;
  margin: 0 0 5px 4px;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 8px;
  font-size: 8.5pt;
  table-layout: fixed;
  word-wrap: break-word;
}
th {
  background: #1d4ed8;
  color: #fff;
  padding: 5px 6px;
  border: 1px solid #93c5fd;
  text-align: left;
  vertical-align: middle;
  font-size: 8pt;
  word-break: break-word;
}
td {
  padding: 4px 6px;
  border: 1px solid #d1d5db;
  vertical-align: top;
  word-break: break-word;
}
tr:nth-child(even) td { background: #f8fafc; }
.k  { color: #15803d; font-weight: bold; }
.kf { color: #dc2626; font-weight: bold; }
.note {
  background: #fef9c3;
  border: 1px solid #fbbf24;
  padding: 8px 12px;
  margin: 0 0 12px 0;
  font-size: 8.5pt;
}
.tip {
  background: #f0fdf4;
  border: 1px solid #86efac;
  padding: 8px 12px;
  margin: 14px 0 0 0;
  font-size: 8.5pt;
}
.add-row { color: #9ca3af; font-style: italic; }

/* Lebar kolom per tipe — disesuaikan agar muat di A4 landscape */
/* SINGLE: 15 kolom → sembunyikan kolom gambar, tampilkan catatan */
.t-single col.c-pkt  { width: 4%; }
.t-single col.c-tipe { width: 6%; }
.t-single col.c-q    { width: 28%; }
.t-single col.c-oa   { width: 15%; }
.t-single col.c-ob   { width: 15%; }
.t-single col.c-oc   { width: 12%; }
.t-single col.c-od   { width: 12%; }
.t-single col.c-oe   { width: 4%; }
.t-single col.c-cor  { width: 4%; }

/* MULTIPLE: 10 kolom */
.t-multi col.c-pkt  { width: 4%; }
.t-multi col.c-tipe { width: 7%; }
.t-multi col.c-q    { width: 35%; }
.t-multi col.c-oa   { width: 11%; }
.t-multi col.c-ob   { width: 11%; }
.t-multi col.c-oc   { width: 11%; }
.t-multi col.c-od   { width: 11%; }
.t-multi col.c-oe   { width: 5%; }
.t-multi col.c-cor  { width: 5%; }

/* TRUEFALSE: 5 kolom */
.t-tf col.c-pkt  { width: 5%; }
.t-tf col.c-tipe { width: 10%; }
.t-tf col.c-q    { width: 75%; }
.t-tf col.c-img  { width: 5%; }
.t-tf col.c-cor  { width: 5%; }

/* ESSAY: 6 kolom */
.t-essay col.c-pkt   { width: 4%; }
.t-essay col.c-tipe  { width: 5%; }
.t-essay col.c-q     { width: 30%; }
.t-essay col.c-img   { width: 4%; }
.t-essay col.c-rubrik{ width: 52%; }
.t-essay col.c-skor  { width: 5%; }

/* MENJODOHKAN: 13 kolom (packet + tipe + question + 5×2 pair) */
.t-jodoh col.c-pkt  { width: 4%; }
.t-jodoh col.c-tipe { width: 7%; }
.t-jodoh col.c-q    { width: 22%; }
.t-jodoh col.c-p1l  { width: 10%; }
.t-jodoh col.c-p1r  { width: 10%; }
.t-jodoh col.c-p2l  { width: 10%; }
.t-jodoh col.c-p2r  { width: 10%; }
.t-jodoh col.c-p3l  { width: 9%; }
.t-jodoh col.c-p3r  { width: 9%; }
.t-jodoh col.c-p4l  { width: 4.5%; }
.t-jodoh col.c-p4r  { width: 4.5%; }
</style>
</head>
<body>
<div class="Section1">

<h1>&#128196; Template Soal INTEGRITEST &mdash; Semua Tipe Soal</h1>
<div class="note">
<b>&#9888; PETUNJUK:</b> &nbsp;
Kolom <b>packet</b>: A / B / C &nbsp;|&nbsp;
Kolom <b>tipe</b>: single / multiple / truefalse / essay / menjodohkan (kosong = single) &nbsp;|&nbsp;
Kolom gambar (question_image, image_a dst): URL Google Drive &mdash; klik kanan &rarr; Bagikan &rarr; Salin link &nbsp;|&nbsp;
Simpan sebagai <b>.docx</b> sebelum diimport &nbsp;|&nbsp; Hapus baris contoh sebelum diimport
</div>


<!-- ═══════════════════════════════════════════════ -->
<!-- 1. PILIHAN TUNGGAL                             -->
<!-- ═══════════════════════════════════════════════ -->
<h2>&#9312; Pilihan Tunggal &nbsp;&#10098;tipe: single&#10099;</h2>
<p class="sub">Satu jawaban benar. Kolom <b>correct</b>: huruf A/B/C/D/E. Kolom gambar (question_image, image_a–e) opsional, isi URL Google Drive jika ada.</p>
<table class="t-single">
  <colgroup>
    <col class="c-pkt"><col class="c-tipe"><col class="c-q">
    <col class="c-oa"><col class="c-ob"><col class="c-oc"><col class="c-od"><col class="c-oe"><col class="c-cor">
  </colgroup>
  <thead>
    <tr>
      <th>packet</th><th>tipe</th><th>question</th>
      <th>option_a</th><th>option_b</th><th>option_c</th><th>option_d</th><th>option_e</th><th>correct</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td><td>single</td><td>Apa kepanjangan dari TKJ?</td>
      <td>Teknik Komputer dan Jaringan</td><td>Teknologi Komunikasi Jaringan</td>
      <td>Teknik Komunikasi dan Jaringan</td><td>Teknologi Komputer dan Jaringan</td>
      <td></td><td class="k">A</td>
    </tr>
    <tr>
      <td>B</td><td>single</td><td>Protokol untuk mengirim email adalah...</td>
      <td>SMTP</td><td>HTTP</td><td>FTP</td><td>SSH</td><td>DNS</td><td class="k">A</td>
    </tr>
    <tr>
      <td>C</td><td>single</td><td>Perangkat yang menghubungkan dua jaringan berbeda adalah...</td>
      <td>Switch</td><td>Hub</td><td>Router</td><td>Repeater</td><td></td><td class="k">C</td>
    </tr>
    <tr><td colspan="9" class="add-row">&#10133; Tambahkan soal baru di bawah baris ini. Untuk soal bergambar, tambahkan kolom question_image / image_a / image_b / image_c / image_d setelah kolom masing-masing.</td></tr>
  </tbody>
</table>


<!-- ═══════════════════════════════════════════════ -->
<!-- 2. JAWABAN GANDA                               -->
<!-- ═══════════════════════════════════════════════ -->
<h2>&#9313; Jawaban Ganda &nbsp;&#10098;tipe: multiple&#10099;</h2>
<p class="sub">Lebih dari satu jawaban benar. Kolom <b>correct_multiple</b>: huruf-huruf dipisah koma, contoh: <b>A,B,E</b></p>
<table class="t-multi">
  <colgroup>
    <col class="c-pkt"><col class="c-tipe"><col class="c-q">
    <col class="c-oa"><col class="c-ob"><col class="c-oc"><col class="c-od"><col class="c-oe"><col class="c-cor">
  </colgroup>
  <thead>
    <tr>
      <th>packet</th><th>tipe</th><th>question</th>
      <th>option_a</th><th>option_b</th><th>option_c</th><th>option_d</th><th>option_e</th><th>correct_multiple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td><td>multiple</td><td>Manakah yang termasuk perangkat jaringan? (pilih semua yang benar)</td>
      <td>Switch</td><td>Router</td><td>Monitor</td><td>Keyboard</td><td>Hub</td><td class="k">A,B,E</td>
    </tr>
    <tr>
      <td>B</td><td>multiple</td><td>Protokol yang bekerja di Layer 7 OSI adalah...</td>
      <td>HTTP</td><td>FTP</td><td>IP</td><td>TCP</td><td>SMTP</td><td class="k">A,B,E</td>
    </tr>
    <tr><td colspan="9" class="add-row">&#10133; Tambahkan soal baru di bawah baris ini.</td></tr>
  </tbody>
</table>


<!-- ═══════════════════════════════════════════════ -->
<!-- 3. BENAR / SALAH                               -->
<!-- ═══════════════════════════════════════════════ -->
<h2>&#9314; Benar / Salah &nbsp;&#10098;tipe: truefalse&#10099;</h2>
<p class="sub">Pernyataan benar atau salah. Kolom <b>correct_tf</b>: tulis <b>TRUE</b> atau <b>FALSE</b> (kapital).</p>
<table class="t-tf">
  <colgroup>
    <col class="c-pkt"><col class="c-tipe"><col class="c-q"><col class="c-img"><col class="c-cor">
  </colgroup>
  <thead>
    <tr><th>packet</th><th>tipe</th><th>question</th><th>question_image</th><th>correct_tf</th></tr>
  </thead>
  <tbody>
    <tr><td>A</td><td>truefalse</td><td>Switch adalah perangkat Layer 2 dalam model OSI.</td><td></td><td class="k">TRUE</td></tr>
    <tr><td>B</td><td>truefalse</td><td>IP address kelas C memiliki range 192.168.0.0 &ndash; 192.168.255.255.</td><td></td><td class="kf">FALSE</td></tr>
    <tr><td>A</td><td>truefalse</td><td>Kabel UTP kategori 6 mendukung kecepatan hingga 10 Gbps.</td><td></td><td class="k">TRUE</td></tr>
    <tr><td colspan="5" class="add-row">&#10133; Tambahkan soal baru di bawah baris ini.</td></tr>
  </tbody>
</table>


<!-- ═══════════════════════════════════════════════ -->
<!-- 4. ESAI / URAIAN                               -->
<!-- ═══════════════════════════════════════════════ -->
<h2>&#9315; Esai / Uraian &nbsp;&#10098;tipe: essay&#10099;</h2>
<p class="sub">Siswa menjawab uraian bebas. Kolom <b>essay_rubrik</b> WAJIB diisi. Kolom <b>essay_skor_maks</b>: angka (default 10).</p>
<table class="t-essay">
  <colgroup>
    <col class="c-pkt"><col class="c-tipe"><col class="c-q"><col class="c-img"><col class="c-rubrik"><col class="c-skor">
  </colgroup>
  <thead>
    <tr><th>packet</th><th>tipe</th><th>question</th><th>question_image</th><th>essay_rubrik</th><th>essay_skor_maks</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td><td>essay</td><td>Jelaskan perbedaan hub dan switch dalam jaringan komputer!</td><td></td>
      <td>Jawaban harus mencakup: (1) Hub Layer 1 meneruskan ke semua port; (2) Switch Layer 2 menggunakan MAC address; (3) Switch lebih efisien karena kirim ke port tujuan saja.</td>
      <td>10</td>
    </tr>
    <tr>
      <td>B</td><td>essay</td><td>Sebutkan minimal 3 topologi jaringan beserta kelebihan dan kekurangannya!</td><td></td>
      <td>Min 3 dari: Star / Bus / Ring / Mesh / Tree. Tiap topologi: +1 nama, +1 kelebihan, +1 kekurangan.</td>
      <td>10</td>
    </tr>
    <tr><td colspan="6" class="add-row">&#10133; Tambahkan soal baru di bawah baris ini.</td></tr>
  </tbody>
</table>


<!-- ═══════════════════════════════════════════════ -->
<!-- 5. MENJODOHKAN                                 -->
<!-- ═══════════════════════════════════════════════ -->
<h2>&#9316; Menjodohkan / Pasangkan &nbsp;&#10098;tipe: menjodohkan&#10099;</h2>
<p class="sub">Siswa memasangkan kolom kiri dengan kanan. Isi <b>pair_N_kiri</b> &amp; <b>pair_N_kanan</b> (N = 1&ndash;5). Minimal 2 pasang, maksimal 5 pasang.</p>
<table class="t-jodoh">
  <colgroup>
    <col class="c-pkt"><col class="c-tipe"><col class="c-q">
    <col class="c-p1l"><col class="c-p1r">
    <col class="c-p2l"><col class="c-p2r">
    <col class="c-p3l"><col class="c-p3r">
    <col class="c-p4l"><col class="c-p4r">
  </colgroup>
  <thead>
    <tr>
      <th>packet</th><th>tipe</th><th>question</th>
      <th>pair_1_kiri</th><th>pair_1_kanan</th>
      <th>pair_2_kiri</th><th>pair_2_kanan</th>
      <th>pair_3_kiri</th><th>pair_3_kanan</th>
      <th>pair_4_kiri</th><th>pair_4_kanan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td><td>menjodohkan</td><td>Jodohkan perangkat dengan fungsinya!</td>
      <td>Switch</td><td>Mengelola MAC</td>
      <td>Router</td><td>Routing jaringan</td>
      <td>Hub</td><td>Broadcast semua port</td>
      <td>Modem</td><td>Konversi sinyal</td>
    </tr>
    <tr>
      <td>B</td><td>menjodohkan</td><td>Pasangkan lapisan OSI dengan fungsinya!</td>
      <td>Physical Layer</td><td>Transmisi bit</td>
      <td>Data Link</td><td>Frame antar node</td>
      <td>Network Layer</td><td>Routing paket</td>
      <td>Transport</td><td>Pengiriman end-to-end</td>
    </tr>
    <tr><td colspan="11" class="add-row">&#10133; Tambahkan soal baru di bawah baris ini. Untuk 5 pasang tambahkan kolom pair_5_kiri dan pair_5_kanan.</td></tr>
  </tbody>
</table>


<div class="tip">
<b>&#128161; TIPS IMPORT:</b>&nbsp;
Semua tipe soal bisa <b>dicampur dalam 1 tabel</b> &mdash; gabungkan header dan isi kolom yang relevan per baris. &nbsp;|&nbsp;
Hapus baris contoh sebelum diimport. &nbsp;|&nbsp;
Download <b>Template Excel</b> untuk versi multi-sheet dengan petunjuk lengkap.
</div>

</div>
</body></html>`;
            const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Template_Soal_INTEGRITEST.doc';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        // ---------- HELPER: Build preview table HTML ----------
        function buildPreviewTable(questions) {
            if (!questions || questions.length === 0) return '<p class="p-4 text-gray-400">Tidak ada soal valid yang terdeteksi.</p>';
            const labels = ['A','B','C','D','E'];
            const rows = questions.slice(0, 15).map((q, i) => {
                const hasQImg = q.image ? ' 🖼️' : '';
                const pktColor = q.packet==='A'?'bg-blue-100 text-blue-700':q.packet==='B'?'bg-purple-100 text-purple-700':'bg-orange-100 text-orange-700';
                const tipe = q.tipe || 'single';
                const tipeBadge = {
                    single:      '<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Tunggal</span>',
                    multiple:    '<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Ganda</span>',
                    truefalse:   '<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">B/S</span>',
                    essay:       '<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Esai</span>',
                    menjodohkan: '<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-700">Jodoh</span>',
                }[tipe] || `<span class="text-xs text-gray-400">${tipe}</span>`;

                let kunciCell;
                if (tipe === 'essay') {
                    kunciCell = '<span class="text-purple-500 text-[10px] italic">Rubrik</span>';
                } else if (tipe === 'truefalse') {
                    const tf = q.correct === true || q.correct === 'true';
                    kunciCell = `<span class="${tf?'bg-green-100 text-green-700':'bg-red-100 text-red-700'} px-2 py-0.5 rounded text-xs font-bold">${tf?'BENAR':'SALAH'}</span>`;
                } else if (tipe === 'multiple' && Array.isArray(q.correct)) {
                    kunciCell = `<span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">${q.correct.map(c=>labels[c]||c).join(',')}</span>`;
                } else if (tipe === 'menjodohkan') {
                    kunciCell = `<span class="text-teal-600 text-[10px]">${(q.pasangan||[]).length} pasang</span>`;
                } else {
                    kunciCell = `<span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">${labels[q.correct]??'-'}</span>`;
                }
                const opsiInfo = tipe==='menjodohkan' ? `${(q.pasangan||[]).length}🔗` : tipe==='truefalse' ? 'B/S' : tipe==='essay' ? '—' : `${(q.options||[]).length}`;

                return `<tr class="${i%2===0?'bg-white':'bg-gray-50'}">
                    <td class="px-3 py-2 text-center font-bold text-xs text-gray-400">${i+1}</td>
                    <td class="px-3 py-2"><span class="inline-block px-2 py-0.5 rounded text-xs font-bold ${pktColor}">${q.packet}</span></td>
                    <td class="px-3 py-2">${tipeBadge}</td>
                    <td class="px-3 py-2 text-xs text-gray-700 max-w-xs truncate">${hasQImg}${_e(q.text) || '<em class="text-gray-400">hanya gambar</em>'}</td>
                    <td class="px-3 py-2 text-xs text-gray-500 text-center">${opsiInfo}</td>
                    <td class="px-3 py-2 text-center">${kunciCell}</td>
                </tr>`;
            }).join('');
            const extra = questions.length > 15 ? `<tr><td colspan="6" class="px-3 py-2 text-center text-gray-400 text-xs italic">... dan ${questions.length-15} soal lainnya</td></tr>` : '';
            return `<table class="w-full text-sm">
                <thead class="bg-gray-100 text-gray-700 text-xs font-bold">
                    <tr><th class="px-3 py-2">#</th><th class="px-3 py-2">Paket</th><th class="px-3 py-2">Tipe</th><th class="px-3 py-2 text-left">Pertanyaan</th><th class="px-3 py-2 text-center">Opsi</th><th class="px-3 py-2">Kunci</th></tr>
                </thead>
                <tbody>${rows}${extra}</tbody>
            </table>`;
        }

        // ---------- HELPER: Parse rows → format soal (SEMUA TIPE) ----------
        function parseRows(rows) {
            const questions  = [];
            const correctMap = { A:0, B:1, C:2, D:3, E:4 };
            const VALID_TIPE = ['single','multiple','truefalse','essay','menjodohkan'];

            rows.forEach((row) => {
                // Helper: ambil nilai pertama yang ada dari array key candidates
                const g = (keys) => {
                    for (const k of keys) {
                        const v = row[k];
                        if (v !== undefined && v !== null && v.toString().trim() !== '') return v.toString().trim();
                    }
                    return '';
                };

                const packet = g(['packet','Packet','PACKET']).toUpperCase();
                const text   = g(['question','Question','QUESTION','pertanyaan','soal']);
                const qImg   = g(['question_image','image','gambar_soal','img']);
                const tipe   = g(['tipe','Tipe','TIPE','type','Type']).toLowerCase() || 'single';

                if (!packet || !['A','B','C'].includes(packet)) return;
                if (!text && !qImg) return;
                if (!VALID_TIPE.includes(tipe)) return;

                const base = {
                    packet, text, tipe, aktif: true,
                    image: window.convertGDriveUrl(qImg),
                    createdAt: Date.now()
                };

                // ── menjodohkan ──
                if (tipe === 'menjodohkan') {
                    const pasangan = [];
                    for (let n = 1; n <= 5; n++) {
                        const kiri  = g([`pair_${n}_kiri`,  `pair${n}_kiri`,  `kiri_${n}`]);
                        const kanan = g([`pair_${n}_kanan`, `pair${n}_kanan`, `kanan_${n}`]);
                        if (kiri && kanan) pasangan.push({ kiri, kanan });
                    }
                    if (pasangan.length < 2) return;
                    questions.push({ ...base, pasangan, options: [], optionImages: [], correct: null });
                    return;
                }

                // ── essay ──
                if (tipe === 'essay') {
                    const rubrik = g(['essay_rubrik','rubrik','rubric','kunci_essay']);
                    if (!rubrik) return;
                    const skorMaks = parseInt(g(['essay_skor_maks','skor_maks','skor','score_max'])) || 10;
                    questions.push({ ...base, essayRubrik: rubrik, essaySkorMaks: skorMaks, options: [], optionImages: [], correct: null });
                    return;
                }

                // ── truefalse ──
                if (tipe === 'truefalse') {
                    const tfRaw = g(['correct_tf','correct','kunci_tf','jawaban_tf']).toUpperCase();
                    if (!['TRUE','FALSE'].includes(tfRaw)) return;
                    questions.push({ ...base, correct: tfRaw === 'TRUE', options: [], optionImages: [] });
                    return;
                }

                // ── multiple ──
                if (tipe === 'multiple') {
                    const optA = g(['option_a','Option_A','a','A','pilihan_a']);
                    const optB = g(['option_b','Option_B','b','B','pilihan_b']);
                    const optC = g(['option_c','Option_C','c','C','pilihan_c']);
                    const optD = g(['option_d','Option_D','d','D','pilihan_d']);
                    const optE = g(['option_e','Option_E','e','E','pilihan_e']);
                    if (!optA || !optB || !optC || !optD) return;
                    const rawMulti = g(['correct_multiple','correct','kunci_multiple']).toUpperCase();
                    const correctArr = rawMulti.split(/[,;\s\/]+/).map(l => correctMap[l.trim()]).filter(v => v !== undefined);
                    if (correctArr.length === 0) return;
                    const options = [optA, optB, optC, optD];
                    const optionImages = ['','','',''];
                    if (optE) { options.push(optE); optionImages.push(''); }
                    questions.push({ ...base, options, optionImages, correct: [...new Set(correctArr)].sort() });
                    return;
                }

                // ── single (default) ──
                const optA = g(['option_a','Option_A','option_A','a','A','pilihan_a']);
                const optB = g(['option_b','Option_B','option_B','b','B','pilihan_b']);
                const optC = g(['option_c','Option_C','option_C','c','C','pilihan_c']);
                const optD = g(['option_d','Option_D','option_D','d','D','pilihan_d']);
                const optE = g(['option_e','Option_E','option_E','e','E','pilihan_e']);
                const correct = g(['correct','Correct','CORRECT','kunci','jawaban']).toUpperCase();

                if (!optA || !optB || !optC || !optD) return;
                if (!(correct in correctMap)) return;

                const imgA = g(['image_a','img_a','gambar_a']);
                const imgB = g(['image_b','img_b','gambar_b']);
                const imgC = g(['image_c','img_c','gambar_c']);
                const imgD = g(['image_d','img_d','gambar_d']);
                const imgE = g(['image_e','img_e','gambar_e']);

                const options = [optA, optB, optC, optD];
                const optionImages = [
                    window.convertGDriveUrl(imgA), window.convertGDriveUrl(imgB),
                    window.convertGDriveUrl(imgC), window.convertGDriveUrl(imgD),
                ];
                if (optE) { options.push(optE); optionImages.push(window.convertGDriveUrl(imgE)); }
                questions.push({ ...base, options, optionImages, correct: correctMap[correct] });
            });
            return questions;
        }

        // ---------- EXCEL IMPORT ----------
        window.handleExcelDrop = function(e) {
            e.preventDefault();
            document.getElementById('excel-drop-zone').classList.remove('border-green-500','bg-green-50');
            const file = e.dataTransfer.files[0];
            if (file) window.handleExcelFile(file);
        };

        window.handleExcelFile = function(file) {
            if (!file) return;
            if (typeof XLSX === 'undefined') { alert("Library XLSX belum siap."); return; }

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const wb = XLSX.read(e.target.result, { type: 'array' });

                    // Baca SEMUA sheet (kecuali sheet Petunjuk) agar template multi-sheet bisa diimport
                    const SKIP_SHEETS = ['petunjuk','petunjuk lengkap','instructions','panduan','readme'];
                    let allRows = [];
                    wb.SheetNames.forEach(sheetName => {
                        if (SKIP_SHEETS.includes(sheetName.toLowerCase().trim())) return;
                        const ws = wb.Sheets[sheetName];
                        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
                        allRows = allRows.concat(rows);
                    });

                    const questions = parseRows(allRows);
                    window.parsedExcelQuestions = questions;

                    const sheetInfo = wb.SheetNames.filter(n => !SKIP_SHEETS.includes(n.toLowerCase().trim())).length;
                    document.getElementById('excel-count').innerText = questions.length;
                    document.getElementById('excel-preview-table').innerHTML = buildPreviewTable(questions);
                    document.getElementById('excel-preview').classList.remove('hidden');

                    if (questions.length === 0) {
                        document.getElementById('excel-preview-table').innerHTML = `<div class="p-4 text-red-600 text-sm"><strong>Tidak ada soal valid ditemukan.</strong> Pastikan kolom <b>packet</b> (A/B/C), <b>tipe</b> (single/multiple/truefalse/essay/menjodohkan), dan kolom kunci sudah benar sesuai template.</div>`;
                    }
                    if(typeof lucide !== 'undefined') window._createIconsSafe();
                } catch(err) {
                    alert("Gagal membaca file Excel: " + err.message);
                }
            };
            reader.readAsArrayBuffer(file);
        };

        window.uploadParsedQuestions = async function() {
            if (!window.isFirebaseReady) { alert("Mode Offline: Tidak bisa upload ke database."); return; }
            const questions = window.parsedExcelQuestions;
            if (!questions || questions.length === 0) { alert("Tidak ada soal untuk diupload."); return; }

            const btn = document.getElementById('btn-upload-excel');
            btn.disabled = true;
            btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Mengupload...`;
            if(typeof lucide !== 'undefined') window._createIconsSafe();

            showImportStatus('info', `Mengupload ${questions.length} soal ke database...`);
            let uploaded = 0, skipped = 0;

            try {
                for (const q of questions) {
                    const exists = window.allQuestionsDB.some(dbQ => dbQ.text === q.text && dbQ.packet === q.packet);
                    if (!exists) {
                        await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'), q);
                        uploaded++;
                    } else {
                        skipped++;
                    }
                }
                showImportStatus('success', `✅ Berhasil upload ${uploaded} soal baru! (${skipped} soal duplikat dilewati)`);
                document.getElementById('excel-preview').classList.add('hidden');
                document.getElementById('excel-file-input').value = '';
                window.parsedExcelQuestions = [];
            } catch(err) {
                showImportStatus('error', `❌ Gagal upload: ${err.message}`);
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload ke Database`;
                if(typeof lucide !== 'undefined') window._createIconsSafe();
            }
        };

        // ---------- WORD IMPORT ----------
        window.handleWordDrop = function(e) {
            e.preventDefault();
            document.getElementById('word-drop-zone').classList.remove('border-blue-500','bg-blue-50');
            const file = e.dataTransfer.files[0];
            if (file) window.handleWordFile(file);
        };

        window.handleWordFile = function(file) {
            if (!file) return;
            if (!file.name.endsWith('.docx')) { alert("Hanya file .docx yang didukung!"); return; }
            if (typeof mammoth === 'undefined') { alert("Library mammoth belum siap."); return; }

            const logEl = document.getElementById('word-log');
            logEl.classList.remove('hidden');
            logEl.innerText = '⏳ Membaca file Word...';

            const reader = new FileReader();
            reader.onload = function(e) {
                mammoth.convertToHtml({ arrayBuffer: e.target.result })
                    .then(result => {
                        const parser = new DOMParser();
                        const docHtml = parser.parseFromString(result.value, 'text/html');
                        const tables = docHtml.querySelectorAll('table');
                        
                        if (tables.length === 0) {
                            logEl.innerText = '⚠️ Tidak ditemukan tabel di dalam file Word. Pastikan soal diformat dalam tabel sesuai template.';
                            return;
                        }

                        // Ambil tabel pertama yang valid
                        let allRows = [];
                        tables.forEach(table => {
                            const rows = table.querySelectorAll('tr');
                            if (rows.length < 2) return;

                            // Cek apakah ini tabel soal (ada header 'packet' atau 'question')
                            const headerCells = rows[0].querySelectorAll('th, td');
                            const headerTexts = Array.from(headerCells).map(c => c.innerText.trim().toLowerCase());
                            if (!headerTexts.includes('packet') && !headerTexts.includes('question')) return;

                            // Parse rows
                            Array.from(rows).slice(1).forEach(row => {
                                const cells = row.querySelectorAll('td, th');
                                if (cells.length < 8) return;
                                const rowData = {};
                                headerTexts.forEach((h, i) => { rowData[h] = cells[i] ? cells[i].innerText.trim() : ''; });
                                allRows.push(rowData);
                            });
                        });

                        const questions = parseRows(allRows);
                        window.parsedWordQuestions = questions;

                        document.getElementById('word-count').innerText = questions.length;
                        document.getElementById('word-preview-table').innerHTML = buildPreviewTable(questions);
                        document.getElementById('word-preview').classList.remove('hidden');

                        if (questions.length === 0) {
                            document.getElementById('word-preview-table').innerHTML = `<div class="p-4 text-red-600 text-sm"><strong>Tidak ada soal valid.</strong> Pastikan tabel di Word sesuai template: header <b>packet</b> (A/B/C), <b>tipe</b> (single/multiple/truefalse/essay/menjodohkan), dan kolom kunci sesuai tipe.</div>`;
                            logEl.innerText = `⚠️ ${allRows.length} baris ditemukan tapi tidak ada yang valid. Cek format kolom.`;
                        } else {
                            logEl.classList.add('hidden');
                        }
                        if(typeof lucide !== 'undefined') window._createIconsSafe();
                    })
                    .catch(err => {
                        logEl.innerText = '❌ Gagal membaca Word: ' + err.message;
                    });
            };
            reader.readAsArrayBuffer(file);
        };

        window.uploadParsedWordQuestions = async function() {
            if (!window.isFirebaseReady) { alert("Mode Offline: Tidak bisa upload ke database."); return; }
            const questions = window.parsedWordQuestions;
            if (!questions || questions.length === 0) { alert("Tidak ada soal untuk diupload."); return; }

            const btn = document.getElementById('btn-upload-word');
            btn.disabled = true;
            btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Mengupload...`;
            if(typeof lucide !== 'undefined') window._createIconsSafe();

            showImportStatus('info', `Mengupload ${questions.length} soal ke database...`);
            let uploaded = 0, skipped = 0;

            try {
                for (const q of questions) {
                    const exists = window.allQuestionsDB.some(dbQ => dbQ.text === q.text && dbQ.packet === q.packet);
                    if (!exists) {
                        await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'), q);
                        uploaded++;
                    } else {
                        skipped++;
                    }
                }
                showImportStatus('success', `✅ Berhasil upload ${uploaded} soal baru dari Word! (${skipped} duplikat dilewati)`);
                document.getElementById('word-preview').classList.add('hidden');
                document.getElementById('word-file-input').value = '';
                document.getElementById('word-log').classList.add('hidden');
                window.parsedWordQuestions = [];
            } catch(err) {
                showImportStatus('error', `❌ Gagal upload: ${err.message}`);
            } finally {
                btn.disabled = false;
                btn.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload ke Database`;
                if(typeof lucide !== 'undefined') window._createIconsSafe();
            }
        };

        function showImportStatus(type, msg) {
            const el = document.getElementById('import-status');
            el.classList.remove('hidden', 'bg-blue-50', 'border-blue-200', 'text-blue-800',
                                'bg-green-50', 'border-green-200', 'text-green-800',
                                'bg-red-50', 'border-red-200', 'text-red-800');
            const styles = {
                info:    ['bg-blue-50','border-blue-200','text-blue-800'],
                success: ['bg-green-50','border-green-200','text-green-800'],
                error:   ['bg-red-50','border-red-200','text-red-800'],
            };
            el.classList.add(...(styles[type] || styles.info));
            el.innerText = msg;
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if(typeof lucide !== 'undefined') {
            window._createIconsSafe();
        }

        // Tampilkan badge perf-mode di panel tampilan jika HP kentang
        document.addEventListener('DOMContentLoaded', () => {
            if (window._perfMode) {
                const badge = document.getElementById('perf-mode-info');
                if (badge) badge.classList.remove('hidden');
            }

            // ══════════════════════════════════════════════════════════════
            // ★ MODE STAF — Sembunyikan/tampilkan tab Login Staf
            // ══════════════════════════════════════════════════════════════
            // Cara akses:
            //   1. URL param  : ?mode=staff  → tab langsung terlihat
            //   2. Tombol dot : klik 3x dalam 2 detik → sama seperti ?mode=staff
            // ──────────────────────────────────────────────────────────────
            const _params        = new URLSearchParams(window.location.search);
            const _isStaffMode   = _params.get('mode') === 'staff';
            const _tabTeacher    = document.getElementById('tab-teacher');
            const _btnStaffDot   = document.getElementById('btn-staff-access');
            const _sectionLogin  = document.getElementById('section-login');

            // Fungsi aktifkan mode staf (bisa dipanggil dari mana saja)
            window._activateStaffTab = function() {
                if (!_tabTeacher) return;
                _tabTeacher.style.display = '';          // tampilkan tab
                _tabTeacher.style.flex    = '1';
                if (_btnStaffDot) _btnStaffDot.style.display = 'none'; // sembunyikan dot
            };

            // Jika URL mengandung ?mode=staff → aktifkan langsung
            if (_isStaffMode) {
                window._activateStaffTab();
            }

            // Tampilkan tombol dot hanya saat section-login terlihat (dan mode belum aktif)
            function _syncDotVisibility() {
                if (!_btnStaffDot) return;
                const loginVisible = _sectionLogin &&
                    !_sectionLogin.classList.contains('hidden') &&
                    _sectionLogin.style.display !== 'none';
                const tabHidden = _tabTeacher && _tabTeacher.style.display === 'none';
                _btnStaffDot.style.display = (loginVisible && tabHidden) ? 'block' : 'none';
            }
            _syncDotVisibility();

            // Observer: perbarui visibilitas dot saat section-login di-show/hide
            if (_sectionLogin && typeof MutationObserver !== 'undefined') {
                new MutationObserver(_syncDotVisibility)
                    .observe(_sectionLogin, { attributes: true, attributeFilter: ['class','style'] });
            }

            // Triple-click handler untuk tombol dot
            let _dotClickCount = 0;
            let _dotClickTimer = null;
            window._handleStaffAccessClick = function() {
                _dotClickCount++;
                clearTimeout(_dotClickTimer);
                if (_dotClickCount >= 3) {
                    _dotClickCount = 0;
                    window._activateStaffTab();
                } else {
                    _dotClickTimer = setTimeout(() => { _dotClickCount = 0; }, 2000);
                }
            };

            // Export sync agar bisa dipanggil saat navigasi antar section
            window._syncStaffDot = _syncDotVisibility;
        });
    </script>
