        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, onSnapshot, query, getDocs, doc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // --- EXPOSE FIREBASE FUNCTIONS ---
        window.getDocs = getDocs;
        window.collection = collection;
        window.addDoc = addDoc;
        window.onSnapshot = onSnapshot;
        window.query = query;
        window.doc = doc;
        window.updateDoc = updateDoc;
        window.deleteDoc = deleteDoc;
        window.setDoc = setDoc;

        window.db = null;
        window.auth = null;
        window.isFirebaseReady = false;

        // ══════════════════════════════════════════════════════════════
        // MULTI-TENANT: Resolusi appId — 4 lapis prioritas
        //
        //  1. URL param ?s=xxxx          → paling eksplisit, langsung pakai
        //  2. sessionStorage             → handle refresh tanpa ?s=
        //  3. baseUrl matching (async)   → domain/path cocok dengan data Firebase
        //  4. Hardcoded last-resort      → HANYA jika semua gagal (offline total)
        //
        // Lapis 3 adalah kunci: siapapun buka URL ini tanpa ?s=
        // akan otomatis dikenali sebagai pemilik URL tersebut
        // berdasarkan field baseUrl di superadmin/data/schools.
        // ══════════════════════════════════════════════════════════════
        window._appIdSource = null; // debug: dari mana appId berasal

        (function() {
            // ── Lapis 1: URL param ?s= ──
            try {
                const urlParam = new URLSearchParams(window.location.search).get('s');
                if (urlParam && /^[a-z0-9_-]+$/i.test(urlParam)) {
                    window.appId = urlParam.toLowerCase();
                    window._appIdSource = 'url-param';
                    sessionStorage.setItem('integritest_appid_from_url', window.appId);
                    sessionStorage.setItem('integritest_appid_source', 'url-param');
                    console.log('[MultiTenant] appId dari URL param:', window.appId);
                    return;
                }
            } catch(e) {}

            // ── Lapis 2: sessionStorage (handle refresh tanpa ?s=) ──
            try {
                const ss  = sessionStorage.getItem('integritest_appid_from_url');
                const src = sessionStorage.getItem('integritest_appid_source') || 'session';
                if (ss) {
                    window.appId = ss;
                    window._appIdSource = src;
                    console.log('[MultiTenant] appId dari sessionStorage (' + src + '):', ss);
                    return;
                }
            } catch(e) {}

            // ── Lapis 3 & 4: baseUrl matching + last-resort ──
            // Tandai sebagai "pending" — akan diselesaikan async di initFirebase
            window.appId = null;
            window._appIdSource = 'pending-baseurl';
            console.log('[MultiTenant] Tidak ada ?s= atau session — akan coba baseUrl matching saat Firebase siap');
        })();        
        // --- GLOBAL SETTINGS ---
        window.currentExamToken = ""; // Token diset oleh admin via Firebase — tidak ada default hardcoded
        window.currentExamDuration = 60; 
        window.currentMinExamDuration = 0; 
        window.deviceCooldownHours = 30; // Default 30 Menit (bukan jam)
        window.currentKKM = 75;           // KKM — dapat diubah admin dari UI
        window.currentSesiId = null;      // Kompatibilitas mundur (jadwal aktif pertama)
        window.currentSesiName = "Jadwal Aktif"; // Kompatibilitas mundur
        
        window.allQuestionsDB = []; 
        window.allSiswaDB = [];    // ★ FIX: inisialisasi awal agar tidak undefined sebelum Firebase siap
        window.allPaketDB = [];    // ★ FIX: idem
        window.allJadwalDB = [];   // ★ FIX: idem
        window.currentExamDocId = null; 
        window.examStartTime = null;
        
        // ★ BANDING SETTINGS ★
        window.appealEnabled = true; // Admin dapat mengaktifkan/menonaktifkan fitur banding

        // ★ PEMBAHASAN SETTINGS (NEW) ★
        // Admin dapat mengatur kapan siswa boleh melihat pembahasan
        window.showDiscussionAfterExam = true;      // Aktifkan/nonaktifkan pembahasan
        window.discussionVisibility = 'after-exam'; // after-exam | after-deadline | manual | never
        window.manualDiscussionOpen = false;        // Kontrol manual pembukaan pembahasan oleh admin 
        
        // ★ RECOVERY: Ambil currentExamDocId dari sessionStorage jika ada (untuk handle refresh)
        try {
            const savedDocId = sessionStorage.getItem('ukktkj_current_exam_doc_id');
            if (savedDocId) {
                window.currentExamDocId = savedDocId;
                console.log('[Recovery Init] Memulihkan exam doc ID dari sessionStorage:', savedDocId);
            }
        } catch(e) {}

        // --- DEVICE FINGERPRINTING (HARDENED V3) ---
        // V3: Multi-layer storage — localStorage + sessionStorage + IndexedDB hash
        // Jika siswa menghapus localStorage saat ujian, session masih terkunci via sessionStorage
        // dan browser fingerprint hash (canvas, screen, timezone, UA).
        function getDeviceFingerprint() {
            const LS_KEY  = 'ukktkj_device_v3';
            const SS_KEY  = 'ukktkj_device_ss';  // sessionStorage backup (hilang saat tab ditutup)

            // ── Bangun hardware hash sebagai komponen tambahan ──
            function buildHardwareHash() {
                const parts = [
                    navigator.userAgent,
                    navigator.language,
                    screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
                    (new Date()).getTimezoneOffset(),
                    navigator.hardwareConcurrency || 0,
                    navigator.deviceMemory || 0,
                    navigator.platform || ''
                ].join('|');
                // Simple non-crypto hash (djb2)
                let hash = 5381;
                for (let i = 0; i < parts.length; i++) {
                    hash = ((hash << 5) + hash) ^ parts.charCodeAt(i);
                    hash = hash & hash; // force 32-bit
                }
                return 'HW' + Math.abs(hash).toString(36).toUpperCase();
            }

            // ── Coba ambil dari localStorage ──
            let deviceId = null;
            try { deviceId = localStorage.getItem(LS_KEY); } catch(e) {}

            // ── Fallback ke sessionStorage jika localStorage kosong / dihapus ──
            if (!deviceId) {
                try { deviceId = sessionStorage.getItem(SS_KEY); } catch(e) {}
            }

            if (!deviceId) {
                // Generate ID baru: V3 + timestamp + random + hardware hash
                const ts   = Date.now().toString(36);
                const r1   = Math.random().toString(36).substring(2, 8);
                const r2   = Math.random().toString(36).substring(2, 8);
                const hw   = buildHardwareHash();
                deviceId   = `V3-${ts}-${r1}-${r2}-${hw}`;
            }

            // Tulis ke KEDUA storage agar saling membackup
            try { localStorage.setItem(LS_KEY, deviceId); } catch(e) {}
            try { sessionStorage.setItem(SS_KEY, deviceId); } catch(e) {}

            return deviceId;
        }

        // ── Saat ujian dimulai, kunci fingerprint ke sessionStorage ──
        // Ini memastikan menghapus localStorage di tengah ujian tidak membantu
        window._lockFingerprintForExam = function() {
            const fp = getDeviceFingerprint();
            try { sessionStorage.setItem('ukktkj_fp_locked', fp); } catch(e) {}
        };

        // ── Ambil fingerprint yang terkunci (prioritas locked > reguler) ──
        window.getLockedFingerprint = function() {
            try {
                const locked = sessionStorage.getItem('ukktkj_fp_locked');
                if (locked) return locked;
            } catch(e) {}
            return getDeviceFingerprint();
        };

        // Expose ke global agar bisa diakses dari script non-module
        window.getDeviceFingerprint = getDeviceFingerprint;

        async function initFirebase() {
            // TIME LIMIT FOR CONNECTION
            const connectionTimeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Koneksi Timeout")), 8000)
            );

            try {
                const defaultConfig = {
                    apiKey: "AIzaSyAdqApOvuUXrZUO19NfiqZCLSyUYR74w5M",
                    authDomain: "waliq-ded98.firebaseapp.com",
                    projectId: "waliq-ded98",
                    storageBucket: "waliq-ded98.firebasestorage.app",
                    messagingSenderId: "915222555864",
                    appId: "1:915222555864:web:25320841c97661172e3bad",
                    measurementId: "G-K51RW0YQ0M"
                };

                // ══════════════════════════════════════════════════════
                // STEP 1: Init Firebase default dulu (untuk baca config sekolah)
                // ══════════════════════════════════════════════════════
                const defaultApp = initializeApp(defaultConfig, 'default-sa');
                const defaultDb  = getFirestore(defaultApp);
                window._defaultDb = defaultDb; // ★ expose agar syncToSuperadmin bisa akses Firebase bersama
                const defaultAuth = getAuth(defaultApp);
                await signInAnonymously(defaultAuth);

                // ══════════════════════════════════════════════════════
                // STEP 2: Baca data sekolah dari superadmin Firestore
                // Sekaligus lakukan baseUrl matching jika appId masih pending
                // ══════════════════════════════════════════════════════
                let firebaseConfig = defaultConfig;
                let schoolData = null;
                try {
                    const schoolsSnap = await getDocs(collection(defaultDb, 'superadmin', 'data', 'schools'));

                    // ── LAPIS 3: baseUrl matching — DINONAKTIFKAN ─────────────────────────
                    // Semua sekolah pakai baseUrl yang sama, matching tidak relevan.
                    // Tanpa ?s= langsung fallback ke appId default (ukktkj).
                    if (!window.appId || window._appIdSource === 'pending-baseurl') {
                        // ── LAPIS 4: last-resort — langsung tanpa baseUrl matching ───────────
                        window.appId = 'ukktkj'; // default pemilik sistem
                        window._appIdSource = 'last-resort';
                        console.log('[MultiTenant] Tidak ada ?s= — pakai default appId: ukktkj');
                    }
                    // ── Selesai resolusi appId ─────────────────────────────────────────────────────

                    schoolsSnap.forEach(d => {
                        const sd = d.data();
                        if (sd.appId === window.appId) schoolData = sd;
                    });

                    if (schoolData?.firebaseMode === 'custom' && schoolData?.firebaseConfig) {
                        try {
                            const customCfg = JSON.parse(schoolData.firebaseConfig);
                            if (customCfg.apiKey && customCfg.projectId) {
                                firebaseConfig = customCfg;
                                console.log('[Firebase] Sekolah pakai Firebase sendiri:', customCfg.projectId);
                            }
                        } catch(eParse) {
                            console.warn('[Firebase] Gagal parse custom config, fallback ke default:', eParse.message);
                        }
                    } else {
                        console.log('[Firebase] Sekolah pakai Firebase bersama (default)');
                    }
                } catch(eRead) {
                    console.warn('[Firebase] Gagal baca config sekolah, pakai default:', eRead.message);
                }

                // ══════════════════════════════════════════════════════
                // STEP 3: Init Firebase final (bisa default atau custom)
                // ══════════════════════════════════════════════════════
                let app, isCustomFirebase = false;
                if (firebaseConfig === defaultConfig) {
                    // Pakai instance yang sudah ada
                    app = defaultApp;
                    window.auth = defaultAuth;
                    window.db   = defaultDb;
                    isCustomFirebase = false;
                } else {
                    // Init Firebase baru untuk sekolah custom
                    app = initializeApp(firebaseConfig, `school-${window.appId}`);
                    window.auth = getAuth(app);
                    window.db   = getFirestore(app);
                    await signInAnonymously(window.auth);
                    isCustomFirebase = true;
                }

                // Override appId jika ada custom app ID dari localStorage
                if (window._customAppId) {
                    window.appId = window._customAppId;
                } else if (typeof __app_id !== 'undefined') {
                    window.appId = __app_id;
                }

                await Promise.race([
                    Promise.resolve(), // sudah signIn di atas
                    connectionTimeout
                ]);
                
                window.isFirebaseReady = true;
                console.log('[Firebase] Connected —', isCustomFirebase ? 'custom project' : 'shared project');

                // ══════════════════════════════════════════════════════
                // ★ CEK STATUS SEKOLAH — blokir jika nonaktif
                // Gunakan schoolData yang sudah diambil di STEP 2
                // ══════════════════════════════════════════════════════
                try {
                    const schoolStatus = schoolData?.status || null;
                    const schoolNama   = schoolData?.nama   || window.appId;

                    if (schoolStatus === 'nonaktif') {
                        document.body.innerHTML = `
                        <div style="position:fixed;inset:0;z-index:99999;background:linear-gradient(135deg,#1e3a5f,#1e40af);display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;">
                            <div style="background:#fff;border-radius:20px;padding:40px 36px;max-width:400px;width:90%;text-align:center;box-shadow:0 32px 80px rgba(0,0,0,.3);">
                                <div style="width:64px;height:64px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;">⛔</div>
                                <h2 style="font-size:20px;font-weight:900;color:#0f172a;margin-bottom:8px;">Akses Dinonaktifkan</h2>
                                <p style="font-size:13px;color:#64748b;line-height:1.6;margin-bottom:6px;">
                                    Akses untuk <strong style="color:#1d4ed8;">${schoolNama}</strong> saat ini dinonaktifkan oleh administrator sistem.
                                </p>
                                <p style="font-size:12px;color:#94a3b8;">Hubungi administrator untuk mengaktifkan kembali.</p>
                            </div>
                        </div>`;
                        return; // hentikan semua proses
                    }
                    console.log('[StatusCheck] Sekolah', window.appId, '→', schoolStatus || 'aktif (tidak ditemukan di superadmin, lanjut)');

                    // ★ ACTIVITY PING — dijalankan di background (non-blocking)
                    // Tidak menghambat proses koneksi utama
                    setTimeout(async function() {
                        try {
                            const _pingKey = 'integritest_last_ping_' + window.appId;
                            const _lastPing = parseInt(sessionStorage.getItem(_pingKey) || '0');
                            if (Date.now() - _lastPing > 5 * 60 * 1000) {
                                sessionStorage.setItem(_pingKey, String(Date.now()));
                                const _schoolsSnap2 = await getDocs(collection(defaultDb, 'superadmin', 'data', 'schools'));
                                for (const _sd of _schoolsSnap2.docs) {
                                    if (_sd.data().appId === window.appId) {
                                        await updateDoc(doc(defaultDb, 'superadmin', 'data', 'schools', _sd.id), {
                                            lastAccess    : Date.now(),
                                            lastAccessDate: new Date().toISOString(),
                                            totalAccess   : (_sd.data().totalAccess || 0) + 1
                                        });
                                        console.log('[ActivityPing] Berhasil dicatat untuk', window.appId);
                                        break;
                                    }
                                }
                            }
                        } catch(ePing) {
                            console.warn('[ActivityPing] Gagal (diabaikan):', ePing.message);
                        }
                    }, 5000); // delay 5 detik setelah koneksi utama selesai
                    // ══════════════════════════════════════════════════════

                } catch(e) {
                    console.warn('[StatusCheck] Gagal cek status sekolah:', e.message, '— lanjut tanpa blokir');
                }
                // ══════════════════════════════════════════════════════
                
                // ★ Auto-reconnect saat browser kembali online
                window.addEventListener('online', function() {
                    console.log('[Firebase] Browser online - checking listeners...');
                    // Re-trigger listener yang belum aktif
                    setTimeout(function() {
                        if (window.listenForJadwal && !window._unsub_listenForJadwal) window.listenForJadwal();
                        if (window.listenForPaket && !window._unsub_listenForPaket) window.listenForPaket();
                        if (window.listenForKelas && !window._unsub_listenForKelas) window.listenForKelas();
                        if (window.listenForRuang && !window._unsub_listenForRuang) window.listenForRuang();
                    }, 1000);
                }, { once: false });
                updateConnectionStatus(true, "Terhubung ke Server");
                
                listenForSettings(); 
                listenForQuestions();
                setTimeout(() => { if(window.ensureAdminCredentials) window.ensureAdminCredentials(); }, 1500);
                // Load ruang ujian & sesi aktif untuk dropdown siswa (deferred ke setelah LOGIC SCRIPT dimuat)
                setTimeout(() => { 
                    if (window.listenForRuang) window.listenForRuang();
                    if (window.listenForActiveSesi) window.listenForActiveSesi();
                    // FIX: Kelas harus dimuat untuk SEMUA user (siswa butuh dropdown kelas saat login)
                    if (window.listenForKelas) window.listenForKelas();
                    // FIX KRITIS: Paket harus dimuat untuk SEMUA user — tanpa ini allPaketDB kosong untuk siswa
                    // sehingga welcome page selalu kosong atau fallback ke Paket A hardcode
                    if (window.listenForPaket) window.listenForPaket();
                    // Jadwal ujian otomatis
                    if (window.listenForJadwal) window.listenForJadwal();
                    setTimeout(() => {
                        if (window.startJadwalScheduler) window.startJadwalScheduler();
                        if (window.startAutoFinishChecker) window.startAutoFinishChecker(); // ★ Auto-finish siswa yg browser-nya tutup
                        if (window.initJadwalForm) window.initJadwalForm();
                    }, 1000);
                }, 500);
                
                if (window.isStaff()) {
                    setupRealtimeListener();
                    window.listenForKelas();
                    window.listenForPaket();
                    window.listenForRuang();

                    // Auto-check banding pending setiap 30 detik untuk update badge & banner
                    async function _checkPendingAppeals() {
                        try {
                            if (!window.isFirebaseReady || !window.db) return;
                            const snap = await window.getDocs(
                                window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                            );
                            const rows = [];
                            snap.forEach(d => rows.push(d.data()));
                            window.updateAppealNotifications(rows);
                        } catch(e) { /* silent fail */ }
                    }
                    // Jalankan pertama kali setelah 3 detik (beri waktu Firebase siap)
                    setTimeout(_checkPendingAppeals, 3000);
                    // Lalu setiap 30 detik
                    setInterval(_checkPendingAppeals, 30000);
                    // ★ Mulai polling kendala pengawas
                    if (window.startKendalaPolling) window.startKendalaPolling();
                }

                // ★ RESTORE SESSION — cek sesi admin/pengawas yang tersimpan, delay agar
                // semua listener & data Firestore sudah siap sebelum UI di-restore
                setTimeout(() => {
                    if (window.restoreStaffSession) window.restoreStaffSession();
                }, 900);

            } catch (error) {
                console.warn("Firebase Init Error/Timeout:", error);
                window.isFirebaseReady = false;
                // Tetap izinkan aplikasi berjalan dalam mode offline
                updateConnectionStatus(false, "Mode Offline (Lokal)");
            }
        }
        
        function updateConnectionStatus(isOnline, text) {
            const el = document.getElementById('connection-status');
            if(el) {
                el.innerText = text;
                // Updated styles for better visibility on new background
                el.innerHTML = isOnline 
                    ? `<span class="inline-block w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></span> ${text}`
                    : `<span class="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span> ${text}`;
                
                el.className = isOnline 
                    ? "text-[10px] font-bold text-white/90 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 backdrop-blur-sm" 
                    : "text-[10px] font-bold text-white/90 bg-red-500/20 px-3 py-1 rounded-full border border-red-400/30 backdrop-blur-sm";
            }
        }

        // ── Load custom Firebase config dari localStorage SEBELUM initFirebase ──
        try {
            const _savedCfg = localStorage.getItem('integritest_firebase_config');
            if (_savedCfg) {
                window._customFirebaseConfig = JSON.parse(_savedCfg);
                console.log('[Firebase] Custom config dimuat:', window._customFirebaseConfig.projectId);
            }
            // Custom appId dari localStorage HANYA berlaku jika TIDAK ada ?s= di URL
            const _urlParamExists = !!new URLSearchParams(window.location.search).get('s');
            if (!_urlParamExists) {
                const _savedAppId = localStorage.getItem('integritest_custom_appid');
                if (_savedAppId) {
                    window._customAppId = _savedAppId;
                    window.appId = _savedAppId;
                    console.log('[Firebase] Custom appId dari localStorage:', _savedAppId);
                }
            }
        } catch(e) { console.warn('[Firebase] Gagal load custom config:', e); }

        initFirebase();

        // Listeners
        function listenForSettings() {
            if (!window.db || !window.isFirebaseReady) return;
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'app_settings'));
            onSnapshot(q, (snapshot) => {
                let latestTime = 0;
                let latestAppearance = {};
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.timestamp > latestTime) {
                        latestTime = data.timestamp;
                        if (data.token) window.currentExamToken = data.token;
                        if (data.examDuration) window.currentExamDuration = parseInt(data.examDuration);
                        if (data.minDuration) window.currentMinExamDuration = parseInt(data.minDuration); 
                        if (data.deviceCooldown) window.deviceCooldownHours = Math.max(10, parseInt(data.deviceCooldown)); // menit, minimal 10
                        if (data.kkm !== undefined) window.currentKKM = Math.max(0, Math.min(100, parseInt(data.kkm) || 75));
                        if ('appealEnabled' in data) window.appealEnabled = data.appealEnabled !== false;
                        // Appearance — gunakan 'in' agar nilai null (dikosongkan user) ikut ter-apply
                        if ('judulUjian' in data) latestAppearance.judulUjian = data.judulUjian ?? '';
                        if ('subJudul'   in data) latestAppearance.subJudul   = data.subJudul   ?? '';
                        if ('motivasi'   in data) latestAppearance.motivasi   = data.motivasi   ?? '';
                        if ('logoUrl'    in data) latestAppearance.logoUrl    = data.logoUrl    ?? '';
                        if (data.nomorIdMode !== undefined) latestAppearance.nomorIdMode = data.nomorIdMode;
                    }
                });
                
                const teacherInput = document.getElementById('teacher-token-input');
                const durationInput = document.getElementById('teacher-duration-input');
                const minDurationInput = document.getElementById('teacher-min-duration-input'); 
                const cooldownInput = document.getElementById('teacher-cooldown-input');
                
                if(teacherInput && document.activeElement !== teacherInput) teacherInput.value = window.currentExamToken;
                if(durationInput && document.activeElement !== durationInput) durationInput.value = window.currentExamDuration;
                if(minDurationInput && document.activeElement !== minDurationInput) minDurationInput.value = window.currentMinExamDuration;
                if(cooldownInput && document.activeElement !== cooldownInput) cooldownInput.value = window.deviceCooldownHours;
                const kkmInput = document.getElementById('teacher-kkm-input');
                if(kkmInput && document.activeElement !== kkmInput) kkmInput.value = window.currentKKM;
                // Update label stat card KKM
                const lblLulusVal = document.getElementById('stat-label-lulus-val');
                if (lblLulusVal) lblLulusVal.textContent = window.currentKKM;
                // Sync toggle banding
                const appealToggle = document.getElementById('toggle-appeal');
                if (appealToggle) appealToggle.checked = window.appealEnabled;
                const appealStatusEl = document.getElementById('appeal-setting-status');
                if (appealStatusEl) appealStatusEl.innerHTML = window.appealEnabled
                    ? '<span class="text-green-600 font-bold">✅ Aktif — Siswa dapat mengajukan banding</span>'
                    : '<span class="text-red-500 font-bold">❌ Nonaktif — Fitur banding disembunyikan</span>';
                // Selalu update tampilan token di panel pengawas
                if (window.updatePengawasTokenDisplay) window.updatePengawasTokenDisplay();
                if (window.refreshAdminTokenQr) window.refreshAdminTokenQr(window.currentExamToken);

                // Terapkan pengaturan tampilan — selalu apply termasuk saat semua field dikosongkan
                if (latestTime > 0) {
                    window._savedAppearance = latestAppearance;
                    if (window.applyAppearanceSettings) window.applyAppearanceSettings(latestAppearance);
                }
            }, (error) => {
                console.log("Offline mode triggered by snapshot error");
                window.isFirebaseReady = false;
                updateConnectionStatus(false, "Mode Offline (Lokal)");
            });
        }

        function listenForQuestions() {
            if (!window.db || !window.isFirebaseReady) return;
            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'));
            onSnapshot(q, (snapshot) => {
                window.allQuestionsDB = [];
                snapshot.forEach((doc) => {
                    window.allQuestionsDB.push({ id: doc.id, ...doc.data() });
                });
                console.log(`Loaded ${window.allQuestionsDB.length} questions from DB`);
                
                if (typeof window.filterQuestionBank === 'function' && !document.getElementById('section-dashboard').classList.contains('hidden-section')) {
                    window.filterQuestionBank();
                }
            }, (err) => {});
        }

        // --- START EXAM LOG ---
        window.saveExamStart = async (data) => {
            // ★ KEAMANAN: Kunci fingerprint ke sessionStorage saat ujian dimulai
            // Menghapus localStorage di tengah ujian tidak akan membantu siswa mengelabui sistem
            if (window._lockFingerprintForExam) window._lockFingerprintForExam();
            // ★ ACTIVITY PING — catat sesi ujian ke counter superadmin (fire-and-forget)
            (async function() {
                try {
                    if (window.isFirebaseReady && window.db) {
                        const _sSnap = await window.getDocs(window.collection(window.db, 'superadmin', 'data', 'schools'));
                        for (const _sd of _sSnap.docs) {
                            if (_sd.data().appId === window.appId) {
                                const _d = _sd.data();
                                await window.updateDoc(window.doc(window.db, 'superadmin', 'data', 'schools', _sd.id), {
                                    totalExamSessions : (_d.totalExamSessions || 0) + 1,
                                    lastExamStart     : Date.now(),
                                    lastExamStartDate : new Date().toISOString()
                                });
                                break;
                            }
                        }
                    }
                } catch(_ep) { /* silent — jangan blokir ujian */ }
            })();
            if (window.isFirebaseReady && window.db) {
                try {
                    // Gunakan fingerprint yang sudah terkunci (locked > reguler)
                    data.deviceFingerprint = window.getLockedFingerprint ? window.getLockedFingerprint() : getDeviceFingerprint();
                    const docRef = await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'), data);
                    window.currentExamDocId = docRef.id;
                    // Simpan ke sessionStorage agar tidak hilang saat refresh
                    try {
                        sessionStorage.setItem('ukktkj_current_exam_doc_id', docRef.id);
                        sessionStorage.setItem('ukktkj_student_data', JSON.stringify({
                            name: data.studentName,
                            nisn: data.studentNisn,
                            cls: data.className
                        }));
                    } catch(e) {}
                } catch (e) {
                    console.error("Failed to log start", e);
                }
            } else {
                console.log("Offline: Exam start stored locally only");
            }
        }

        // --- SAVE RESULT ---
        window.saveExamResult = async (data) => {
            // ★ Selalu simpan ke localStorage sebagai backup terlebih dahulu
            try {
                localStorage.setItem('integritest_result_backup', JSON.stringify({...data, savedAt: Date.now()}));
            } catch(e) {}

            const doSave = async () => {
                // Coba ambil currentExamDocId dari sessionStorage jika null
                if (!window.currentExamDocId) {
                    try {
                        const savedDocId = sessionStorage.getItem('ukktkj_current_exam_doc_id');
                        if (savedDocId) {
                            console.log('[Recovery] Menggunakan exam doc ID dari sessionStorage:', savedDocId);
                            window.currentExamDocId = savedDocId;
                        }
                    } catch(e) {}
                }
                
                // Jika masih null, cari dokumen yang sesuai dengan siswa ini
                if (!window.currentExamDocId && window.isFirebaseReady && window.db) {
                    try {
                        console.log('[Recovery] Mencari dokumen exam yang sesuai...');
                        const studentData = data.studentName ? data : 
                            JSON.parse(sessionStorage.getItem('ukktkj_student_data') || '{}');
                        
                        if (studentData.studentName || studentData.name) {
                            const qSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                            
                            // Cari dokumen SEDANG MENGERJAKAN/MELANJUTKAN dengan NISN atau nama+kelas yang sama
                            qSnap.forEach(ds => {
                                const d = ds.data();
                                const nisnMatch = d.studentNisn && studentData.studentNisn && 
                                    d.studentNisn.toString().trim() === studentData.studentNisn.toString().trim();
                                const nameMatch = !nisnMatch && 
                                    d.studentName && d.studentName.toLowerCase() === (studentData.studentName || studentData.name).toLowerCase() &&
                                    d.className === studentData.className;
                                
                                if ((nisnMatch || nameMatch) && 
                                    (d.status === 'SEDANG MENGERJAKAN' || d.status.includes('MELANJUTKAN'))) {
                                    window.currentExamDocId = ds.id;
                                    console.log('[Recovery] Ditemukan dokumen exam:', ds.id);
                                }
                            });
                        }
                    } catch(e) {
                        console.error('[Recovery] Gagal mencari dokumen:', e);
                    }
                }
                
                if (window.currentExamDocId) {
                    console.log('[Save] Updating dokumen exam:', window.currentExamDocId);
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', window.currentExamDocId), data);
                } else {
                    console.warn('[Save] currentExamDocId masih null, membuat dokumen baru');
                    const ref = await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'), data);
                    window.currentExamDocId = ref.id;
                    try {
                        sessionStorage.setItem('ukktkj_current_exam_doc_id', ref.id);
                    } catch(e) {}
                }
            };

            if (window.isFirebaseReady && window.db) {
                try {
                    await doSave();
                    console.log('[IntegriTest] Nilai tersimpan ke server.');
                    // Hapus dari sessionStorage setelah berhasil
                    try {
                        sessionStorage.removeItem('ukktkj_current_exam_doc_id');
                    } catch(e) {}

                    // ══════════════════════════════════════════════════════
                    // ★ SUPERADMIN SYNC — update statistik integritas & ujian
                    // Dijalankan fire-and-forget, tidak memblokir alur siswa
                    // ══════════════════════════════════════════════════════
                    (async function syncToSuperadmin() {
                        try {
                            if (!window.isFirebaseReady || !window._defaultDb) return;

                            // Hitung integrityScore siswa ini (formula sama dengan calcIntegrityScore di admin panel)
                            const _viol = data.violations || 0;
                            const _logs = data.violationLogs || [];
                            const VWEIGHTS = { focus:15, clipboard:20, back_button:25, split_screen:30, device_dup:50, idle:10, unknown:15 };
                            let _intScore;
                            if (data.status && data.status.includes('DISKUALIFIKASI')) { _intScore = 0; }
                            else if (_viol >= 3) { _intScore = 0; }
                            else if (_viol === 0) { _intScore = 100; }
                            else {
                                let _ded = 0;
                                if (_logs.length > 0) { _logs.forEach(l => { _ded += VWEIGHTS[l.type || 'unknown'] || VWEIGHTS.unknown; }); }
                                else { _ded = _viol * VWEIGHTS.unknown; }
                                _intScore = Math.max(5, 100 - _ded);
                            }
                            const _isDQ = _intScore === 0;

                            // Gunakan window._defaultDb — selalu Firebase bersama (superadmin)
                            const _schoolsSnap = await getDocs(collection(window._defaultDb, 'superadmin', 'data', 'schools'));
                            for (const _sd of _schoolsSnap.docs) {
                                if (_sd.data().appId !== window.appId) continue;
                                const _cur = _sd.data();

                                // Hitung avgIntegrityScore baru (rolling average)
                                const _prevAvg   = _cur.avgIntegrityScore || 0;
                                const _prevCount = _cur.totalExamSessions || 0;
                                // totalExamSessions sudah di-increment di saveExamStart, jadi count = prevCount
                                const _newAvg = _prevCount > 0
                                    ? Math.round((_prevAvg * (_prevCount - 1) + _intScore) / _prevCount)
                                    : _intScore;

                                await updateDoc(doc(window._defaultDb, 'superadmin', 'data', 'schools', _sd.id), {
                                    avgIntegrityScore  : _newAvg,
                                    lastExamSession    : Date.now(),
                                    lastExamSessionDate: new Date().toISOString(),
                                    disqualifiedCount  : (_cur.disqualifiedCount || 0) + (_isDQ ? 1 : 0),
                                    lastExamStudentName: data.studentName || '',
                                    lastExamScore      : data.score || 0
                                });
                                console.log('[SuperadminSync] ✅ Statistik integritas diperbarui. avgScore:', _newAvg, 'DQ:', _isDQ);

                                // ══════════════════════════════════════════════════════
                                // ★ PUSH DATA PER KELAS/JADWAL ke subcollection exam_sessions
                                // Dipakai superadmin untuk melihat Rekap Ujian per sekolah
                                // ══════════════════════════════════════════════════════
                                try {
                                    const _kelas   = (data.className || 'Tidak Diketahui').trim();
                                    const _sesiId  = data.sesiId  || data.jadwalId || 'tanpa-jadwal';
                                    const _sesiNm  = data.sesiName || data.paketNama || 'Ujian';
                                    // Key unik per (kelas × sesi) — karakter aman untuk Firestore doc ID
                                    const _sessionKey = (window.appId + '__' + _kelas + '__' + _sesiId)
                                        .replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 200);
                                    const _sessionRef  = doc(
                                        window._defaultDb,
                                        'superadmin', 'data', 'schools', _sd.id, 'exam_sessions', _sessionKey
                                    );

                                    // Ambil snapshot sebelumnya via getDocs (sudah ter-expose di window)
                                    // — tidak pakai dynamic import agar tidak ganggu module scope Firebase
                                    let _prevSD = null;
                                    try {
                                        const _sessCol = collection(
                                            window._defaultDb,
                                            'superadmin', 'data', 'schools', _sd.id, 'exam_sessions'
                                        );
                                        const _sessSnap = await getDocs(_sessCol);
                                        _sessSnap.forEach(_ss => {
                                            if (_ss.id === _sessionKey) _prevSD = _ss.data();
                                        });
                                    } catch(_eg) { /* gagal baca — mulai dari nol, tidak masalah */ }

                                    const _pc  = _prevSD ? (_prevSD.totalSiswa   || 0) : 0;
                                    const _pai = _prevSD ? (_prevSD.avgIntegrity  || 0) : 0;
                                    const _pas = _prevSD ? (_prevSD.avgScore      || 0) : 0;
                                    const _pdq = _prevSD ? (_prevSD.disqualified  || 0) : 0;
                                    const _nc  = _pc + 1;

                                    await setDoc(_sessionRef, {
                                        appId          : window.appId,
                                        kelas          : _kelas,
                                        sesiId         : _sesiId,
                                        sesiName       : _sesiNm,
                                        paketNama      : data.paketNama || _sesiNm,
                                        totalSiswa     : _nc,
                                        avgIntegrity   : Math.round((_pai * _pc + _intScore)        / _nc),
                                        avgScore       : Math.round((_pas * _pc + (data.score || 0)) / _nc),
                                        disqualified   : _pdq + (_isDQ ? 1 : 0),
                                        lastUpdated    : Date.now(),
                                        lastUpdatedDate: new Date().toISOString()
                                    }, { merge: true });
                                    console.log('[SuperadminSync] ✅ exam_sessions → kelas:', _kelas, '/ jadwal:', _sesiNm);
                                } catch(_ess) {
                                    console.warn('[SuperadminSync] Gagal push exam_sessions (diabaikan):', _ess.message);
                                }
                                // ══════════════════════════════════════════════════════

                                break;
                            }
                        } catch(_es) {
                            console.warn('[SuperadminSync] Gagal sync ke superadmin (diabaikan):', _es.message);
                        }
                    })();
                    // ══════════════════════════════════════════════════════

                    // ★ AUTO KIRIM WA — jika diaktifkan admin
                    try {
                        const autoSendOn = localStorage.getItem('integritest_fonnte_auto_send') === '1';
                        const fonnteToken = localStorage.getItem('integritest_fonnte_token') || '';
                        if (autoSendOn && fonnteToken && data.studentNisn) {
                            // Tunggu allSiswaDB siap (maks 5 detik)
                            let _tries = 0;
                            const _waitSiswa = () => new Promise(res => {
                                const _chk = () => {
                                    if ((window.allSiswaDB && window.allSiswaDB.length > 0) || _tries++ > 25) res();
                                    else setTimeout(_chk, 200);
                                };
                                _chk();
                            });
                            await _waitSiswa();

                            const _nisn = data.studentNisn.toString().trim();
                            const _siswaDB = (window.allSiswaDB || []).find(s => s.nisn && s.nisn.toString().trim() === _nisn);
                            const _waOrtu = _siswaDB ? (_siswaDB.waOrtu || '') : '';
                            if (_waOrtu) {
                                const _defTpl = "Assalamu'alaikum Bpk/Ibu Wali dari *{nama}*.\n\nBerikut hasil ujian putra/putri Anda:\n\ud83d\udcda Mata Ujian: {mapel}\n\ud83c\udfeb Kelas: {kelas}\n\ud83d\udcca Nilai: *{nilai}*\n\ud83c\udfc6 Predikat: {status}\n\nTerima kasih \ud83d\ude4f";
                                const _tpl = localStorage.getItem('integritest_fonnte_template') || _defTpl;
                                const _score = data.score ?? '-';
                                let _statusLabel = '-';
                                if (typeof _score === 'number') _statusLabel = _score>=90?'Sangat Baik (A)':_score>=80?'Baik (B)':_score>=70?'Cukup (C)':_score>=60?'Kurang (D)':'Sangat Kurang (E)';
                                const _pesan = _tpl
                                    .replace(/{nama}/g, data.studentName || (_siswaDB ? _siswaDB.nama : '') || '-')
                                    .replace(/{kelas}/g, data.className || (_siswaDB ? _siswaDB.kelas : '') || '-')
                                    .replace(/{nilai}/g, _score)
                                    .replace(/{status}/g, _statusLabel)
                                    .replace(/{mapel}/g, data.paketNama || data.sesiName || 'Ujian');
                                fetch('https://api.fonnte.com/send', {
                                    method: 'POST',
                                    headers: { 'Authorization': fonnteToken, 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ target: _waOrtu, message: _pesan, countryCode: '62' })
                                }).then(r => r.json()).then(res => {
                                    if (res.status === true) {
                                        console.log('[AutoWA] \u2705 Notifikasi nilai terkirim ke', _waOrtu);
                                        if (_siswaDB && _siswaDB.id && window.isFirebaseReady) {
                                            updateDoc(doc(window.db,'artifacts',window.appId,'public','data','data_siswa',_siswaDB.id),{notifSent:true,notifSentAt:Date.now()}).catch(()=>{});
                                        }
                                    } else {
                                        console.warn('[AutoWA] \u26a0\ufe0f Gagal kirim WA otomatis:', res);
                                    }
                                }).catch(eW => console.warn('[AutoWA] Error fetch:', eW));
                            } else {
                                console.log('[AutoWA] Tidak ada No. WA untuk NISN', _nisn);
                            }
                        }
                    } catch(eAuto) {
                        console.warn('[AutoWA] Error auto-send:', eAuto);
                    }
                } catch (e) {
                    console.warn('[IntegriTest] Gagal simpan, retry dalam 3 detik...', e);
                    // Tampilkan banner offline
                    const ob = document.getElementById('offline-result-banner');
                    if (ob) ob.style.display = '';
                    // Retry 1x setelah 3 detik
                    setTimeout(async () => {
                        try {
                            if (window.isFirebaseReady && window.db) {
                                await doSave();
                                console.log('[IntegriTest] Retry berhasil.');
                                const ob2 = document.getElementById('offline-result-banner');
                                if (ob2) { ob2.innerHTML = '<span style="color:#16a34a">✅ Nilai berhasil dikirim ke server!</span>'; }
                                // Hapus dari sessionStorage setelah berhasil
                                try {
                                    sessionStorage.removeItem('ukktkj_current_exam_doc_id');
                                } catch(e) {}
                            }
                        } catch(e2) { console.error('[IntegriTest] Retry gagal.', e2); }
                    }, 3000);
                }
            } else {
                // Mode offline total
                const ob = document.getElementById('offline-result-banner');
                if (ob) ob.style.display = '';
            }
        }

                // --- SAVE SETTINGS (Pengaturan Sistem Ujian SAJA — Token, Durasi, Cooldown) ---
        window.saveSettings = async () => {
            const newToken = document.getElementById('teacher-token-input').value.trim().toUpperCase();
            const newDuration = parseInt(document.getElementById('teacher-duration-input').value);
            const newMinDuration = parseInt(document.getElementById('teacher-min-duration-input').value) || 0; 
            const newCooldown = parseInt(document.getElementById('teacher-cooldown-input').value) || 30;
            const newKKM = parseInt(document.getElementById('teacher-kkm-input').value) || 75;
            const newAppealEnabled = document.getElementById('toggle-appeal') ? document.getElementById('toggle-appeal').checked : window.appealEnabled;

            if(!newToken) return alert("Token tidak boleh kosong!");
            if(!newDuration || newDuration < 1) return alert("Durasi tidak valid (minimal 1 menit)!");
            if(newMinDuration > newDuration) return alert("Durasi minimal tidak boleh lebih besar dari durasi ujian!");
            if(newCooldown < 10) return alert("Cooldown device minimal 10 menit!");
            if(isNaN(newKKM) || newKKM < 0 || newKKM > 100) return alert("KKM harus antara 0 dan 100!");

            // Ambil nilai tampilan yang sudah tersimpan agar tidak terhapus
            const savedApp = window._savedAppearance || {};

            if (window.isFirebaseReady && window.db) {
                try {
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'app_settings'), {
                        token: newToken,
                        examDuration: newDuration,
                        minDuration: newMinDuration,
                        deviceCooldown: newCooldown,
                        kkm: newKKM,
                        appealEnabled: newAppealEnabled,
                        // Sertakan nilai tampilan yang sudah ada agar tidak tertimpa null
                        judulUjian:   savedApp.judulUjian  ?? null,
                        subJudul:     savedApp.subJudul    ?? null,
                        motivasi:     savedApp.motivasi    ?? null,
                        logoUrl:      savedApp.logoUrl     ?? null,
                        nomorIdMode:  savedApp.nomorIdMode ?? 'nisn',
                        timestamp: Date.now()
                    });
                    window.appealEnabled = newAppealEnabled;
                    window.currentKKM = newKKM;
                    // Update label stat card KKM
                    const lbl = document.getElementById('stat-label-lulus-val');
                    if (lbl) lbl.textContent = newKKM;
                    alert(`✅ Pengaturan sistem disimpan!\nToken: ${newToken} | Durasi: ${newDuration} mnt | Cooldown: ${newCooldown} mnt | KKM: ${newKKM}\nFitur Banding: ${newAppealEnabled ? 'Aktif' : 'Nonaktif'}`);
                } catch(saveErr) {
                    alert(`❌ Gagal simpan ke server: ${saveErr.message}\n\nCek koneksi internet dan coba lagi.`);
                }
            } else {
                alert("Mode Offline: Pengaturan sistem tidak tersimpan ke server.");
            }
        };

        // ★ PEMBAHASAN SETTINGS FUNCTIONS (NEW) ★
        window.saveDiscussionSettings = async function() {
            const toggle = document.getElementById('toggle-discussion');
            const mode = document.querySelector('input[name="discussion-mode"]:checked')?.value || 'after-exam';
            
            window.showDiscussionAfterExam = toggle.checked;
            window.discussionVisibility = mode;

            // Update UI status
            window.updateDiscussionUIStatus();

            // Simpan ke localStorage untuk persistensi
            try {
                localStorage.setItem('ukktkj_discussion_settings', JSON.stringify({
                    enabled: window.showDiscussionAfterExam,
                    visibility: window.discussionVisibility,
                    manualOpen: window.manualDiscussionOpen
                }));
            } catch(e) {
                console.warn("Gagal menyimpan discussion settings ke localStorage");
            }

            // ★ FIX #1: Simpan ke Firestore lewat koleksi 'discussion_settings' (global, tidak tergantung currentExamDocId)
            // Ini memastikan pengaturan tersimpan ke server KAPAN SAJA, bahkan sebelum ujian aktif.
            if (window.isFirebaseReady && window.db) {
                try {
                    await setDoc(
                        doc(window.db, 'artifacts', window.appId, 'public', 'data', 'discussion_settings', 'global'),
                        {
                            discussionEnabled: window.showDiscussionAfterExam,
                            discussionVisibility: window.discussionVisibility,
                            manualDiscussionOpen: window.manualDiscussionOpen,
                            updatedAt: Date.now()
                        }
                    );
                    console.log('[DiscussionSettings] Tersimpan ke Firestore (global).');
                } catch(err) {
                    console.warn('Gagal simpan discussion settings ke Firestore:', err);
                }
                // Juga update ke currentExamDocId jika ada (backward compat)
                if (window.currentExamDocId) {
                    updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exams', window.currentExamDocId), {
                        discussionEnabled: window.showDiscussionAfterExam,
                        discussionVisibility: window.discussionVisibility,
                    }).catch(() => {});
                }
            }

            alert('✅ Pengaturan pembahasan disimpan!');
        };

        window.updateDiscussionUIStatus = function() {
            const toggle = document.getElementById('toggle-discussion');
            const manualArea = document.getElementById('manual-control-area');
            const statusText = document.getElementById('discussion-status-text');
            const modeRadios = document.querySelectorAll('input[name="discussion-mode"]');
            const selectedMode = document.querySelector('input[name="discussion-mode"]:checked')?.value || 'after-exam';

            // Update visibility manual control area
            if (selectedMode === 'manual') {
                manualArea.classList.remove('hidden');
            } else {
                manualArea.classList.add('hidden');
            }

            // Update status text
            if (!toggle.checked) {
                statusText.innerHTML = '❌ Dinonaktifkan - Pembahasan tidak tersedia';
                statusText.className = 'text-red-600 font-bold';
            } else if (selectedMode === 'never') {
                statusText.innerHTML = '❌ Jangan Tampilkan - Pembahasan tidak tersedia';
                statusText.className = 'text-red-600 font-bold';
            } else if (selectedMode === 'manual') {
                const isOpen = window.manualDiscussionOpen ? '✅ Dibuka' : '⏳ Ditutup';
                statusText.innerHTML = `🔧 Manual - ${isOpen}`;
                statusText.className = 'text-amber-600 font-bold';
            } else {
                statusText.innerHTML = '✅ Aktif - Setelah Ujian Selesai';
                statusText.className = 'text-indigo-600 font-bold';
            }
        };

        window.toggleDiscussionManually = function() {
            window.manualDiscussionOpen = !window.manualDiscussionOpen;
            const btn = document.getElementById('btn-toggle-manual-discussion');

            if (window.manualDiscussionOpen) {
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                btn.classList.add('bg-red-600', 'hover:bg-red-700');
                btn.innerHTML = '<i data-lucide="lock" class="w-5 h-5"></i> Tutup Pembahasan untuk Siswa';
            } else {
                btn.classList.remove('bg-red-600', 'hover:bg-red-700');
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
                btn.innerHTML = '<i data-lucide="unlock" class="w-5 h-5"></i> Buka Pembahasan untuk Siswa';
            }

            if(typeof lucide !== 'undefined') window._createIconsSafe();
            window.updateDiscussionUIStatus();
            
            // Broadcast ke Firestore (untuk update real-time di tab lain)
            if (window.isFirebaseReady && window.currentExamDocId) {
                window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exams', window.currentExamDocId), {
                    manualDiscussionOpen: window.manualDiscussionOpen,
                    discussionOpenedAt: new Date().toISOString()
                }).catch(err => console.warn('Gagal update manual discussion status:', err));
            }

            alert(window.manualDiscussionOpen ? '✅ Pembahasan dibuka!' : '🔒 Pembahasan ditutup!');
        };

        // Load discussion settings dari localStorage saat init
        document.addEventListener('DOMContentLoaded', () => {
            try {
                const saved = localStorage.getItem('ukktkj_discussion_settings');
                if (saved) {
                    const settings = JSON.parse(saved);
                    window.showDiscussionAfterExam = settings.enabled !== false;
                    window.discussionVisibility = settings.visibility || 'after-exam';
                    window.manualDiscussionOpen = settings.manualOpen || false;

                    // Update UI elements
                    const toggle = document.getElementById('toggle-discussion');
                    if (toggle) {
                        toggle.checked = window.showDiscussionAfterExam;
                    }

                    const modeRadio = document.querySelector(`input[name="discussion-mode"][value="${window.discussionVisibility}"]`);
                    if (modeRadio) {
                        modeRadio.checked = true;
                    }

                    // Add event listeners
                    if (toggle) {
                        toggle.addEventListener('change', window.updateDiscussionUIStatus);
                    }

                    document.querySelectorAll('input[name="discussion-mode"]').forEach(radio => {
                        radio.addEventListener('change', window.updateDiscussionUIStatus);
                    });

                    window.updateDiscussionUIStatus();
                }
            } catch(e) {
                console.warn("Gagal load discussion settings dari localStorage:", e);
            }
        });

        // --- SAVE APPEARANCE ONLY (Pengaturan Tampilan SAJA — dari tab Setting Tampilan) ---
        window.saveAppearanceOnly = async () => {
            const savedApp = window._savedAppearance || {};
            const newJudulUjian   = (document.getElementById('setting-judul-ujian')?.value  ?? '').trim();
            const newSubJudul     = (document.getElementById('setting-sub-judul')?.value    ?? '').trim();
            const newMotivasi     = (document.getElementById('setting-motivasi')?.value     ?? '').trim();
            const newLogoUrl      = (document.getElementById('setting-logo-url')?.value     ?? '').trim();
            const newNomorIdMode  = document.getElementById('setting-nomor-id-mode')?.value || savedApp.nomorIdMode || 'nisn';

            if (window.isFirebaseReady && window.db) {
                try {
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'app_settings'), {
                        // Sertakan nilai sistem yang sudah ada agar tidak tertimpa
                        token:        window.currentExamToken       || '',
                        examDuration: window.currentExamDuration    || 60,
                        minDuration:  window.currentMinExamDuration || 0,
                        deviceCooldown: window.deviceCooldownHours  || 30,
                        appealEnabled: window.appealEnabled !== false,
                        judulUjian:   newJudulUjian || null,
                        subJudul:     newSubJudul   || null,
                        motivasi:     newMotivasi   || null,
                        logoUrl:      newLogoUrl    || null,
                        nomorIdMode:  newNomorIdMode,
                        timestamp: Date.now()
                    });
                    // Update cache lokal
                    window._savedAppearance = { judulUjian: newJudulUjian, subJudul: newSubJudul, motivasi: newMotivasi, logoUrl: newLogoUrl, nomorIdMode: newNomorIdMode };
                    // Terapkan ke UI langsung
                    window.applyAppearanceSettings(window._savedAppearance);
                    alert(`✅ Pengaturan tampilan disimpan!`);
                } catch(saveErr) {
                    alert(`❌ Gagal simpan ke server: ${saveErr.message}\n\nCek koneksi internet dan coba lagi.`);
                    window.applyAppearanceSettings({ judulUjian: newJudulUjian, subJudul: newSubJudul, motivasi: newMotivasi, logoUrl: newLogoUrl, nomorIdMode: newNomorIdMode });
                }
            } else {
                // Offline — terapkan ke UI saja
                window.applyAppearanceSettings({ judulUjian: newJudulUjian, subJudul: newSubJudul, motivasi: newMotivasi, logoUrl: newLogoUrl, nomorIdMode: newNomorIdMode });
                alert("Mode Offline: Pengaturan tampilan diterapkan sementara, tidak tersimpan ke server.");
            }
        };

        window.seedDatabase = async () => {
            if(!window.isFirebaseReady) return alert("Fitur ini butuh koneksi internet (Firebase).");

            // Pastikan questionBank sudah tersedia (didefinisikan di script terpisah)
            const qBank = window.questionBank;
            if (!qBank) return alert("Data soal belum siap, coba refresh halaman.");

            if (!confirm(
                "Upload Soal Bawaan ke Database?\n\n" +
                "Ini akan:\n" +
                "1. Membuat 3 Paket Soal (A, B, C) jika belum ada\n" +
                "2. Mengupload soal ke masing-masing paket\n\n" +
                "Soal duplikat akan dilewati secara otomatis."
            )) return;

            const btn = document.getElementById('btn-seed-db');
            if(btn) { btn.disabled = true; btn.innerText = "⏳ Sedang Upload... Jangan tutup halaman ini"; }

            try {
                // ── STEP 1: Fetch paket SEGAR dari Firestore (hindari cache stale) ──
                const paketSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal'));
                const freshPaket = [];
                paketSnap.forEach(d => freshPaket.push({ id: d.id, ...d.data() }));

                const paketDefs = [
                    { jenis: 'A', nama: 'Paket A - PKK (PKWU)', mapel: 'Produk Kreatif dan Kewirausahaan', token: window.currentExamToken || '' },
                    { jenis: 'B', nama: 'Paket B - PKK (PKWU)', mapel: 'Produk Kreatif dan Kewirausahaan', token: window.currentExamToken || '' },
                    { jenis: 'C', nama: 'Paket C - Keamanan Jaringan', mapel: 'Keamanan Jaringan', token: window.currentExamToken || '' },
                ];

                const paketMap = {}; // jenis -> paketId
                let paketBaru = 0;

                for (const def of paketDefs) {
                    const existing = freshPaket.find(p => p.jenis === def.jenis);
                    if (existing) {
                        paketMap[def.jenis] = existing.id;
                    } else {
                        const ref = await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'paket_soal'), {
                            ...def, aktif: true, kelas: [], createdAt: Date.now(), updatedAt: Date.now()
                        });
                        paketMap[def.jenis] = ref.id;
                        paketBaru++;
                    }
                }

                // ── STEP 2: Fetch soal SEGAR dari Firestore (hindari cache stale) ──
                const soalSnap = await getDocs(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'));
                const freshSoal = [];
                soalSnap.forEach(d => freshSoal.push({ id: d.id, ...d.data() }));

                // ── STEP 3: Upload soal ke masing-masing paket ──
                let count = 0, skipped = 0;

                for (const pkt of ['A', 'B', 'C']) {
                    const questions = qBank[pkt];
                    if (!questions || !questions.length) continue;
                    const paketId = paketMap[pkt];

                    for (const q of questions) {
                        // Cek duplikat berdasarkan teks soal + paketId
                        const duplikat = freshSoal.some(dbQ =>
                            dbQ.paketId === paketId && dbQ.text === q.text
                        );
                        if (duplikat) { skipped++; continue; }

                        await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'), {
                            paketId,
                            packet: pkt,
                            text: q.text,
                            options: q.options,
                            correct: q.correct,
                            aktif: true,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        });
                        count++;
                        // Update label progres
                        if(btn) btn.innerText = `⏳ Upload soal... (${count} soal)`;
                    }
                }

                alert(`✅ Selesai!\n\nPaket baru dibuat: ${paketBaru}\nPaket diverifikasi: ${3 - paketBaru}\nSoal baru diupload: ${count}\nSoal duplikat dilewati: ${skipped}`);
            } catch (e) {
                console.error(e);
                alert("❌ Gagal upload: " + e.message);
            } finally {
                if(btn) {
                    btn.disabled = false;
                    btn.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload Soal Bawaan ke DB (+ Buat Paket A/B/C)`;
                    if(typeof lucide !== 'undefined') window._createIconsSafe();
                }
            }
        };

        window.deleteQuestion = async (id) => {
            if(!window.isFirebaseReady) return alert("Mode Offline.");
            if(!confirm("Hapus soal ini?")) return;
            try { await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'questions', id)); } catch(e) { alert("Gagal hapus: " + e.message); }
        };
        
        window.deleteExamResult = async (id) => {
            if(!window.isFirebaseReady) return alert("Mode Offline.");
            if(!confirm("Apakah Anda yakin ingin MENGHAPUS data ujian siswa ini?\n\nTindakan ini tidak dapat dibatalkan.")) return;
            try {
                await deleteDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', id));
            } catch(e) {
                alert("Gagal menghapus: " + e.message);
            }
        };

        // ★ FUNGSI BARU: Paksa Selesaikan Ujian Siswa (untuk siswa yang masih "SEDANG MENGERJAKAN")
        window.forceFinishStudent = async (id) => {
            if(!window.isFirebaseReady) return alert("Mode Offline.");
            
            const studentData = dashboardData.find(item => item.id === id);
            if (!studentData) return alert("Data siswa tidak ditemukan.");
            
            const confirmMsg = `⚠️ PAKSA SELESAIKAN UJIAN\n\n` +
                `Siswa  : ${studentData.studentName}\n` +
                `Kelas  : ${studentData.className}\n` +
                `Status : ${studentData.status}\n\n` +
                `Tindakan ini akan:\n` +
                `• Mengubah status menjadi "PERLU VERIFIKASI GURU"\n` +
                `• Ujian siswa langsung berakhir\n` +
                `• Nilai dikosongkan — dapat diisi manual oleh guru setelah ujian\n\n` +
                `Lanjutkan?`;
            
            if(!confirm(confirmMsg)) return;

            // ── Strategi dua lapis ─────────────────────────────────────────────
            // Lapis 1: Kirim sinyal "forceFinishSignal: true" ke Firestore.
            //          Browser siswa yang masih online akan mendeteksi sinyal ini
            //          (polling setiap 30 detik) dan menjalankan finishExam() sendiri —
            //          sehingga nilai PG/menjodohkan/benar-salah dihitung otomatis dari jawaban mereka.
            // Lapis 2: Jika siswa offline, status langsung jadi "PERLU VERIFIKASI GURU"
            //          dan admin dapat isi nilai manual via tombol "Isi Nilai" di tabel monitoring.
            const pengawasName = window.currentPengawasName || window.currentStaffName || 'Admin';
            try {
                const updateData = {
                    status: "PERLU VERIFIKASI GURU",
                    forceFinishSignal: true,   // ← sinyal ke browser siswa
                    score: null,
                    scoreNonEssay: null,
                    forcedFinishBy: pengawasName,
                    forcedFinishAt: Date.now(),
                    note: (studentData.note || '') + `\n[${new Date().toLocaleString('id-ID')}] Ujian dipaksa selesai oleh ${pengawasName}. Sistem mengirim sinyal ke browser siswa untuk menyelesaikan ujian dan menghitung nilai otomatis.`
                };
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', id), updateData);
                alert(
                    `✅ Sinyal selesai dikirim ke ${studentData.studentName}.\n\n` +
                    `⏱️ Jika browser siswa masih terbuka → nilai akan dihitung otomatis dalam maks. 30 detik.\n\n` +
                    `📴 Jika siswa sudah offline → gunakan tombol "Isi Nilai" di baris siswa ini untuk mengisi nilai manual.`
                );
            } catch(e) {
                alert("Gagal memaksa selesai: " + e.message);
            }
        };

        // Isi nilai manual untuk siswa yang dipaksa selesai (status: PERLU VERIFIKASI GURU)
        window.isiNilaiManual = async (id, nama) => {
            if (!window.isFirebaseReady || !window.db) return alert('Firebase belum siap.');
            const scoreInput = prompt(
                `📝 Isi Nilai Manual\n\nSiswa: ${nama}\n\nMasukkan nilai akhir (0–100):`,
                ''
            );
            if (scoreInput === null) return; // dibatalkan
            const score = scoreInput.trim() === '' ? null : parseInt(scoreInput);
            if (score !== null && (isNaN(score) || score < 0 || score > 100)) {
                return alert('❌ Nilai tidak valid! Masukkan angka antara 0–100.');
            }
            try {
                const pengawasName = window.currentPengawasName || window.currentStaffName || 'Admin';
                await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', id), {
                    score: score,
                    scoreNonEssay: score,
                    status: 'SELESAI (Paksa oleh Pengawas)',
                    note: ((window._allDashboardData || []).find(d => d.id === id)?.note || '') +
                        `\n[${new Date().toLocaleString('id-ID')}] Nilai diisi manual oleh ${pengawasName}: ${score}.`
                });
                alert(`✅ Nilai ${nama} berhasil disimpan: ${score}`);
            } catch(e) {
                alert('Gagal menyimpan nilai: ' + e.message);
            }
        };

        window.resetAllExamData = async () => {
            if(!window.isFirebaseReady) return alert("Mode Offline.");
            const sesiNama = window.currentSesiName || 'Jadwal Aktif';
            const key = prompt(
                `⚠️ HAPUS DATA SESI INI\n\n` +
                `Anda akan menghapus semua data hasil ujian di "${sesiNama}".\n` +
                `Data sesi lain TIDAK akan terhapus.\n\n` +
                `Ketik 'HAPUS SESI' untuk konfirmasi:`
            );
            
            if (key !== 'HAPUS SESI') {
                return alert("Penghapusan dibatalkan.");
            }

            const btn = document.getElementById('btn-reset-all');
            if(btn) { btn.disabled = true; btn.innerText = "Sedang Menghapus..."; }

            try {
                const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                const snapshot = await getDocs(q);
                
                if (snapshot.empty) { alert("Data sudah kosong."); return; }

                const activeSesiId = window.currentSesiId || 'default';
                const jadwalAktifIds = (window.allJadwalDB || []).filter(j => j.isActive).map(j => j.id);
                const toDelete = [];
                snapshot.forEach((d) => {
                    const data = d.data();
                    // Hapus data dari jadwal aktif saat ini
                    const matchSesi = jadwalAktifIds.includes(data.sesiId)
                        || (data.sesiId === activeSesiId)
                        || (!data.sesiId && activeSesiId === 'default');
                    if (matchSesi) toDelete.push(deleteDoc(d.ref));
                });
                
                await Promise.all(toDelete);
                alert(`✅ Berhasil menghapus ${toDelete.length} data ujian dari "${sesiNama}".`);
                
            } catch(e) {
                console.error(e);
                alert("Gagal mereset data: " + e.message);
            } finally {
                if(btn) { btn.disabled = false; btn.innerHTML = `<i data-lucide="trash-2" class="w-4 h-4"></i> Reset Jadwal Ini`; if(typeof lucide !== 'undefined') window._createIconsSafe(); }
            }
        };

        // ---- HELPER: Konversi URL Google Drive ke direct link ----
        window.convertGDriveUrl = function(url) {
            if (!url) return '';
            // Format: https://drive.google.com/file/d/FILE_ID/view?...
            const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (matchFile) return `https://drive.google.com/uc?export=view&id=${matchFile[1]}`;
            // Format: https://drive.google.com/open?id=FILE_ID
            const matchOpen = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (matchOpen) return `https://drive.google.com/uc?export=view&id=${matchOpen[1]}`;
            // Format lain (langsung URL gambar) - kembalikan apa adanya
            return url;
        };

        // ---- HELPER: Switch tab URL/Upload di editor soal ----
        window.switchImgTab = function(prefix, tab) {
            const urlPanel    = document.getElementById(`${prefix}-img-panel-url`);
            const uploadPanel = document.getElementById(`${prefix}-img-panel-upload`);
            const tabUrl      = document.getElementById(`${prefix}-img-tab-url`);
            const tabUpload   = document.getElementById(`${prefix}-img-tab-upload`);
            if (tab === 'url') {
                urlPanel.classList.remove('hidden');
                uploadPanel.classList.add('hidden');
                tabUrl.className    = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white';
                tabUpload.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-white text-blue-600 border border-blue-300 hover:bg-blue-50';
            } else {
                urlPanel.classList.add('hidden');
                uploadPanel.classList.remove('hidden');
                tabUrl.className    = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-white text-blue-600 border border-blue-300 hover:bg-blue-50';
                tabUpload.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white';
            }
        };

        // ---- HELPER: Preview gambar dari URL ----
        window.previewImg = function(prefix, url) {
            const finalUrl = window.convertGDriveUrl(url.trim());
            const preview  = document.getElementById(`${prefix}-img-preview`);
            const img      = document.getElementById(`${prefix}-img-preview-img`);
            const dataEl   = document.getElementById(`${prefix}-image-data`);
            if (finalUrl) {
                img.src = finalUrl;
                preview.classList.remove('hidden');
                dataEl.value = finalUrl;
            } else {
                preview.classList.add('hidden');
                dataEl.value = '';
            }
        };

        // ---- HELPER: Upload gambar → Base64 ----
        window.handleImgUpload = function(prefix, input) {
            const file = input.files[0];
            if (!file) return;
            if (file.size > 900 * 1024) {
                alert('Ukuran gambar terlalu besar (maks 800KB). Kompres dulu gambarnya ya!');
                input.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                const preview = document.getElementById(`${prefix}-img-preview`);
                const img     = document.getElementById(`${prefix}-img-preview-img`);
                const dataEl  = document.getElementById(`${prefix}-image-data`);
                img.src = base64;
                preview.classList.remove('hidden');
                dataEl.value = base64;
            };
            reader.readAsDataURL(file);
        };

        // ---- HELPER: Hapus gambar ----
        window.clearImg = function(prefix) {
            document.getElementById(`${prefix}-img-preview`).classList.add('hidden');
            document.getElementById(`${prefix}-img-preview-img`).src = '';
            document.getElementById(`${prefix}-image-data`).value = '';
            const urlInput = document.getElementById(`${prefix}-image-url`);
            if (urlInput) urlInput.value = '';
            const fileInput = document.getElementById(`${prefix}-img-file`);
            if (fileInput) fileInput.value = '';
        };

        // ---- HELPER: hapus gambar opsi ----
        window.clearOptImg = function(btn) {
            const wrapper = btn.closest('.opt-img-wrapper');
            if (!wrapper) return;
            wrapper.querySelector('.opt-img-preview').classList.add('hidden');
            wrapper.querySelector('.opt-img-preview img').src = '';
            wrapper.querySelector('.opt-image-data').value = '';
            const urlInput = wrapper.querySelector('.opt-image-url');
            if (urlInput) urlInput.value = '';
            const fileInput = wrapper.querySelector('.opt-img-file');
            if (fileInput) fileInput.value = '';
        };

        // ── ESSAY MODE KOREKSI TOGGLE ─────────────────────────────
        window._setEssayMode = function(mode) {
            // Update hidden radio
            const aiRadio     = document.getElementById('q-essay-mode-ai');
            const manualRadio = document.getElementById('q-essay-mode-manual');
            if (aiRadio)     aiRadio.checked     = (mode === 'ai');
            if (manualRadio) manualRadio.checked = (mode === 'manual');

            // Update card visuals
            const aiCard     = document.getElementById('q-essay-mode-ai-card');
            const manualCard = document.getElementById('q-essay-mode-manual-card');
            const aiCheck    = document.getElementById('q-essay-mode-ai-check');
            const manualCheck= document.getElementById('q-essay-mode-manual-check');

            if (mode === 'ai') {
                if (aiCard)     { aiCard.style.border = '2px solid #7c3aed'; aiCard.style.background = '#f5f3ff'; }
                if (manualCard) { manualCard.style.border = '2px solid #e5e7eb'; manualCard.style.background = '#fff'; }
                if (aiCheck)     aiCheck.style.display = 'inline';
                if (manualCheck) manualCheck.style.display = 'none';
            } else {
                if (aiCard)     { aiCard.style.border = '2px solid #e5e7eb'; aiCard.style.background = '#fff'; }
                if (manualCard) { manualCard.style.border = '2px solid #d97706'; manualCard.style.background = '#fffbeb'; }
                if (aiCheck)     aiCheck.style.display = 'none';
                if (manualCheck) manualCheck.style.display = 'inline';
            }

            // Toggle info boxes
            const aiBox     = document.getElementById('q-essay-ai-info-box');
            const manualBox = document.getElementById('q-essay-manual-info-box');
            const hintEl    = document.getElementById('q-essay-rubrik-hint');
            if (mode === 'ai') {
                if (aiBox)     aiBox.style.display = 'block';
                if (manualBox) manualBox.style.display = 'none';
                if (hintEl)    hintEl.textContent = '⚡ AI akan menilai berdasarkan rubrik ini otomatis saat siswa submit.';
            } else {
                if (aiBox)     aiBox.style.display = 'none';
                if (manualBox) manualBox.style.display = 'block';
                if (hintEl)    hintEl.textContent = '⏳ Guru akan menilai manual melalui panel Monitoring setelah siswa submit.';
            }
        };

        // Alias untuk kompatibilitas kode lama
        window.onEssayModeChange = function() {
            const modeEl = document.querySelector('input[name="q-essay-koreksi-mode"]:checked');
            window._setEssayMode(modeEl ? modeEl.value : 'ai');
        };

        // ── TIPE SOAL TOGGLE ──────────────────────────────────────
        window.setQuestionType = function(tipe) {
            document.getElementById('q-tipe').value = tipe;
            const singleWrap   = document.getElementById('q-correct-single-wrap');
            const multiWrap    = document.getElementById('q-correct-multiple-wrap');
            const tfWrap       = document.getElementById('q-correct-truefalse-wrap');
            const essayWrap    = document.getElementById('q-correct-essay-wrap');
            const singleBtn    = document.getElementById('q-tipe-single-btn');
            const multiBtn     = document.getElementById('q-tipe-multiple-btn');
            const tfBtn        = document.getElementById('q-tipe-truefalse-btn');
            const essayBtn     = document.getElementById('q-tipe-essay-btn');
            const hint         = document.getElementById('q-tipe-hint');
            const optSection   = document.getElementById('q-options-section');
            const tfInfo       = document.getElementById('q-truefalse-info');
            const essayInfo    = document.getElementById('q-essay-info');

            const inactiveClass = 'py-2.5 px-3 rounded-xl border-2 border-gray-200 bg-white text-gray-500 font-bold text-sm flex items-center justify-center gap-2 transition-all';
            const menjodohkanBtn  = document.getElementById('q-tipe-menjodohkan-btn');
            const menjodohkanWrap = document.getElementById('q-menjodohkan-wrap');
            const menjodohkanInfo = document.getElementById('q-menjodohkan-info');

            // Reset all — gunakan null-check agar tidak crash jika elemen tidak ada di HTML
            if (singleWrap)       singleWrap.classList.add('hidden');
            if (multiWrap)        multiWrap.classList.add('hidden');
            if (tfWrap)           tfWrap.classList.add('hidden');
            if (essayWrap)        essayWrap.classList.add('hidden');
            if (menjodohkanWrap)  menjodohkanWrap.classList.add('hidden');
            if (menjodohkanInfo)  menjodohkanInfo.classList.add('hidden');
            if (singleBtn)        singleBtn.className = inactiveClass;
            if (multiBtn)         multiBtn.className  = inactiveClass;
            if (tfBtn)            tfBtn.className     = inactiveClass;
            if (essayBtn)         essayBtn.className  = inactiveClass;
            if (menjodohkanBtn)   menjodohkanBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-gray-200 bg-white text-gray-500 font-bold text-sm flex items-center justify-center gap-2 transition-all col-span-2';
            if (optSection)       optSection.classList.remove('hidden');
            if (tfInfo)           tfInfo.classList.add('hidden');
            if (essayInfo)        essayInfo.classList.add('hidden');

            if (tipe === 'multiple') {
                if (multiWrap) multiWrap.classList.remove('hidden');
                if (multiBtn)  multiBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-bold text-sm flex items-center justify-center gap-2 transition-all';
                if (hint) { hint.textContent = 'Jawaban ganda: siswa harus memilih SEMUA pilihan yang benar.'; hint.className = 'text-xs text-emerald-600 mt-2'; }
            } else if (tipe === 'truefalse') {
                if (tfWrap)  tfWrap.classList.remove('hidden');
                if (tfBtn)   tfBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-amber-500 bg-amber-50 text-amber-700 font-bold text-sm flex items-center justify-center gap-2 transition-all';
                if (hint) { hint.textContent = 'Benar/Salah: siswa memilih apakah pernyataan benar atau salah.'; hint.className = 'text-xs text-amber-600 mt-2'; }
                if (optSection) optSection.classList.add('hidden');
                if (tfInfo)     tfInfo.classList.remove('hidden');
            } else if (tipe === 'essay') {
                if (essayWrap) essayWrap.classList.remove('hidden');
                if (essayBtn)  essayBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-purple-500 bg-purple-50 text-purple-700 font-bold text-sm flex items-center justify-center gap-2 transition-all';
                if (hint) { hint.textContent = 'Esai: pilih mode koreksi ⚡ AI Otomatis (nilai langsung) atau 👨‍🏫 Manual Guru (nilai pending).'; hint.className = 'text-xs text-purple-600 mt-2'; }
                if (optSection) optSection.classList.add('hidden');
                if (essayInfo)  essayInfo.classList.remove('hidden');
                if (typeof window.onEssayModeChange === 'function') window.onEssayModeChange();
                // Init tampilan mode (default AI)
                if (typeof window._setEssayMode === 'function') {
                    const curMode = (document.querySelector('input[name="q-essay-koreksi-mode"]:checked') || {}).value || 'ai';
                    window._setEssayMode(curMode);
                }
            } else if (tipe === 'menjodohkan') {
                if (menjodohkanBtn)  menjodohkanBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-teal-500 bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center gap-2 transition-all col-span-2';
                if (menjodohkanWrap) menjodohkanWrap.classList.remove('hidden');
                if (menjodohkanInfo) menjodohkanInfo.classList.remove('hidden');
                if (hint) { hint.textContent = 'Menjodohkan: siswa memasangkan kolom kiri dengan kolom kanan yang sesuai.'; hint.className = 'text-xs text-teal-600 mt-2'; }
                if (optSection) optSection.classList.add('hidden');
                // Auto-isi 3 pasang kosong jika belum ada
                const pairsContainer = document.getElementById('q-menjodohkan-pairs');
                if (pairsContainer && pairsContainer.children.length === 0) {
                    window.addMenjodohkanPair();
                    window.addMenjodohkanPair();
                    window.addMenjodohkanPair();
                }
            } else {
                if (singleWrap) singleWrap.classList.remove('hidden');
                if (singleBtn)  singleBtn.className = 'py-2.5 px-3 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center gap-2 transition-all';
                if (hint) { hint.textContent = 'Pilihan tunggal: hanya 1 jawaban benar.'; hint.className = 'text-xs text-gray-400 mt-2'; }
            }
        };

        // ★ MENJODOHKAN HELPER — tambah baris pasangan
        window.addMenjodohkanPair = function() {
            const container = document.getElementById('q-menjodohkan-pairs');
            if (!container) return;
            const idx = container.children.length;
            const row = document.createElement('div');
            row.className = 'flex items-center gap-2';
            row.dataset.pairIdx = idx;
            row.innerHTML = `
                <span class="text-xs font-bold text-teal-500 w-5 text-center shrink-0">${idx+1}</span>
                <input type="text" placeholder="Pernyataan / Soal..." class="mj-kiri flex-1 px-3 py-2 border border-teal-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-400 bg-white" oninput="window._menjodohkanDirty=true">
                <span class="text-teal-400 font-bold shrink-0">↔</span>
                <input type="text" placeholder="Pasangan / Jawaban..." class="mj-kanan flex-1 px-3 py-2 border border-orange-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white" oninput="window._menjodohkanDirty=true">
                <button type="button" onclick="this.closest('[data-pair-idx]').remove(); window._renumberPairs()" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0" title="Hapus baris">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>`;
            container.appendChild(row);
        };

        window._renumberPairs = function() {
            const rows = document.querySelectorAll('#q-menjodohkan-pairs [data-pair-idx]');
            rows.forEach((r, i) => { r.querySelector('span').textContent = i+1; r.dataset.pairIdx = i; });
        };

        window._getMenjodohkanPairs = function() {
            const rows = document.querySelectorAll('#q-menjodohkan-pairs [data-pair-idx]');
            return Array.from(rows).map(r => ({
                kiri:  r.querySelector('.mj-kiri').value.trim(),
                kanan: r.querySelector('.mj-kanan').value.trim()
            })).filter(p => p.kiri || p.kanan);
        };

        window._loadMenjodohkanPairs = function(pairs) {
            const container = document.getElementById('q-menjodohkan-pairs');
            if (!container) return;
            container.innerHTML = '';
            (pairs || []).forEach((p, idx) => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2';
                row.dataset.pairIdx = idx;
                row.innerHTML = `
                    <span class="text-xs font-bold text-teal-500 w-5 text-center shrink-0">${idx+1}</span>
                    <input type="text" value="${(p.kiri||'').replace(/"/g,'&quot;')}" placeholder="Pernyataan / Soal..." class="mj-kiri flex-1 px-3 py-2 border border-teal-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-400 bg-white" oninput="window._menjodohkanDirty=true">
                    <span class="text-teal-400 font-bold shrink-0">↔</span>
                    <input type="text" value="${(p.kanan||'').replace(/"/g,'&quot;')}" placeholder="Pasangan / Jawaban..." class="mj-kanan flex-1 px-3 py-2 border border-orange-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white" oninput="window._menjodohkanDirty=true">
                    <button type="button" onclick="this.closest('[data-pair-idx]').remove(); window._renumberPairs()" class="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0" title="Hapus baris">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>`;
                container.appendChild(row);
            });
        };

        window.openQuestionModal = (id = null) => {
            const modal = document.getElementById('modal-question');
            const form  = document.getElementById('form-question');
            form.reset();
            document.getElementById('q-id').value = id || '';
            document.getElementById('q-options-container').innerHTML = '';
            document.getElementById('q-aktif').checked = true;
            document.getElementById('q-aktif-label').textContent = 'Aktif';
            document.getElementById('q-aktif-label').className = 'text-sm font-bold text-green-600';
            // Reset tipe ke single
            window.setQuestionType('single');
            // Uncheck semua kunci ganda
            document.querySelectorAll('#q-correct-multi-checks input[type=checkbox]').forEach(c => c.checked = false);
            // Uncheck kunci benar/salah
            document.querySelectorAll('input[name="correct-tf"]').forEach(r => r.checked = false);
            // Reset essay fields
            const essayRubrikEl = document.getElementById('q-essay-rubrik');
            const essaySkorEl = document.getElementById('q-essay-skor-maks');
            if (essayRubrikEl) essayRubrikEl.value = '';
            if (essaySkorEl) essaySkorEl.value = '10';
            // Reset mode koreksi ke AI otomatis (default)
            const modeAiReset = document.getElementById('q-essay-mode-ai');
            if (modeAiReset) { modeAiReset.checked = true; if (typeof window._setEssayMode === 'function') window._setEssayMode('ai'); }
            // Reset KD tag
            const kdTagEl = document.getElementById('q-kd-tag');
            if (kdTagEl) kdTagEl.value = '';

            // Set paket context
            const paket = (window.allPaketDB || []).find(p => p.id === window.activePaketId);
            document.getElementById('q-packet').value = window.activePaketId || '';
            document.getElementById('modal-q-paket-label').textContent = paket ? paket.nama : '—';

            // Reset gambar soal
            window.clearImg('q');
            window.switchImgTab('q', 'url');

            // aktif toggle
            document.getElementById('q-aktif').onchange = function() {
                const lbl = document.getElementById('q-aktif-label');
                lbl.textContent = this.checked ? 'Aktif' : 'Nonaktif';
                lbl.className = `text-sm font-bold ${this.checked ? 'text-green-600' : 'text-gray-400'}`;
            };

            if (id) {
                document.getElementById('modal-q-title').textContent = 'Edit Soal';
                const q = window.allQuestionsDB.find(x => x.id === id);
                if (q) {
                    // Set tipe soal
                    const tipe = q.tipe || 'single';
                    window.setQuestionType(tipe);
                    if (tipe === 'multiple' && Array.isArray(q.correct)) {
                        document.querySelectorAll('#q-correct-multi-checks input[type=checkbox]').forEach(c => {
                            c.checked = q.correct.includes(parseInt(c.value));
                        });
                    } else if (tipe === 'truefalse') {
                        const tfVal = q.correct === true || q.correct === 'true' ? 'true' : 'false';
                        const tfRadio = document.querySelector(`input[name="correct-tf"][value="${tfVal}"]`);
                        if (tfRadio) tfRadio.checked = true;
                    } else if (tipe === 'essay') {
                        const rubrikEl = document.getElementById('q-essay-rubrik');
                        const skorEl = document.getElementById('q-essay-skor-maks');
                        if (rubrikEl) rubrikEl.value = q.essayRubrik || '';
                        if (skorEl) skorEl.value = q.essaySkorMaks || 10;
                        // Load mode koreksi
                        const modeVal = q.essayKoreksiMode || 'ai';
                        const modeEl = document.querySelector(`input[name="q-essay-koreksi-mode"][value="${modeVal}"]`);
                        if (modeEl) { modeEl.checked = true; }
                        if (typeof window._setEssayMode === 'function') window._setEssayMode(modeVal);
                    } else if (tipe === 'menjodohkan') {
                        // Load pasangan menjodohkan
                        if (Array.isArray(q.pasangan)) window._loadMenjodohkanPairs(q.pasangan);
                    } else {
                        document.getElementById('q-correct').value = Array.isArray(q.correct) ? q.correct[0] : q.correct;
                    }
                    document.getElementById('q-text').value = q.text || '';
                    // Load KD tag
                    const _kdTagEl = document.getElementById('q-kd-tag');
                    if (_kdTagEl) _kdTagEl.value = q.kdTag || '';
                    const isAktif = q.aktif !== false;
                    document.getElementById('q-aktif').checked = isAktif;
                    document.getElementById('q-aktif-label').textContent = isAktif ? 'Aktif' : 'Nonaktif';
                    document.getElementById('q-aktif-label').className = `text-sm font-bold ${isAktif ? 'text-green-600' : 'text-gray-400'}`;
                    if (q.image) {
                        document.getElementById('q-image-data').value = q.image;
                        const img = document.getElementById('q-img-preview-img');
                        img.src = q.image;
                        document.getElementById('q-img-preview').classList.remove('hidden');
                        if (!q.image.startsWith('data:')) document.getElementById('q-image-url').value = q.image;
                    }
                    q.options.forEach((opt, i) => addOptionInput(opt, q.optionImages ? q.optionImages[i] : ''));
                }
            } else {
                document.getElementById('modal-q-title').textContent = 'Tambah Soal Baru';
                for(let i=0; i<5; i++) addOptionInput('', '');
            }
            modal.classList.remove('hidden');
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.closeQuestionModal = () => {
            document.getElementById('modal-question').classList.add('hidden');
            // Tutup preview juga
            const panel = document.getElementById('q-preview-panel');
            if (panel) panel.classList.add('hidden');
        };

        // ── PREVIEW SOAL ─────────────────────────────────────────────
        window.toggleQuestionPreview = function() {
            const panel = document.getElementById('q-preview-panel');
            if (!panel) return;
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) {
                window.renderQuestionPreview();
                panel.classList.remove('hidden');
                // Scroll agar panel terlihat
                setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
                const btn = document.getElementById('btn-preview-soal');
                if (btn) { btn.classList.add('bg-indigo-600','text-white'); btn.classList.remove('bg-indigo-50','text-indigo-700'); }
            } else {
                panel.classList.add('hidden');
                const btn = document.getElementById('btn-preview-soal');
                if (btn) { btn.classList.remove('bg-indigo-600','text-white'); btn.classList.add('bg-indigo-50','text-indigo-700'); }
            }
        };

        window.renderQuestionPreview = function() {
            const container = document.getElementById('q-preview-content');
            if (!container) return;

            const tipe   = document.getElementById('q-tipe') ? document.getElementById('q-tipe').value : 'single';
            const text   = (document.getElementById('q-text') ? document.getElementById('q-text').value : '').trim();
            const imgSrc = document.getElementById('q-image-data') ? document.getElementById('q-image-data').value : '';

            // Ambil opsi
            const optRows = document.querySelectorAll('#q-options-container > div');
            const options = [], optImgs = [];
            optRows.forEach(row => {
                const t = row.querySelector('input[name="options[]"]');
                const d = row.querySelector('.opt-image-data');
                options.push(t ? t.value : '');
                optImgs.push(d ? d.value : '');
            });

            const labels = ['A','B','C','D','E'];

            let html = '';

            // Header tipe badge
            const tipeBadgeMap = {
                single:      { color: 'bg-blue-100 text-blue-700',    label: 'Pilihan Ganda' },
                multiple:    { color: 'bg-purple-100 text-purple-700', label: 'Jawaban Ganda' },
                truefalse:   { color: 'bg-amber-100 text-amber-700',   label: 'Benar / Salah' },
                essay:       { color: 'bg-emerald-100 text-emerald-700', label: 'Esai' },
                menjodohkan: { color: 'bg-teal-100 text-teal-700',     label: 'Menjodohkan' },
            };
            const badge = tipeBadgeMap[tipe] || tipeBadgeMap.single;
            html += `<div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-bold px-2.5 py-1 rounded-full ${badge.color}">${badge.label}</span>
                <span class="text-xs text-gray-400">Tampilan seperti yang dilihat siswa</span>
            </div>`;

            // Teks soal
            if (!text && !imgSrc) {
                container.innerHTML = '<p class="text-sm text-gray-400 text-center py-6 italic">Teks soal dan gambar masih kosong.</p>';
                return;
            }

            html += `<div class="mb-3">`;
            if (text) html += `<p class="text-sm text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">${window.escapeHtml ? window.escapeHtml(text) : text}</p>`;
            if (imgSrc) html += `<img src="${imgSrc}" class="mt-2 max-h-48 rounded-xl border object-contain bg-gray-50" onerror="this.style.display='none'">`;
            html += `</div>`;

            // Opsi berdasarkan tipe
            if (tipe === 'single' || tipe === 'multiple') {
                // Ambil jawaban benar
                let correctIdx = [];
                if (tipe === 'multiple') {
                    correctIdx = Array.from(document.querySelectorAll('#q-correct-multi-checks input[type=checkbox]:checked')).map(c => parseInt(c.value));
                } else {
                    const cv = document.getElementById('q-correct');
                    if (cv && cv.value !== '') correctIdx = [parseInt(cv.value)];
                }
                html += `<div class="space-y-2 mt-3">`;
                options.forEach((opt, i) => {
                    if (!opt && !optImgs[i]) return;
                    const isCorrect = correctIdx.includes(i);
                    const bg = isCorrect ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-200';
                    const labelBg = isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600';
                    html += `<div class="flex items-start gap-2.5 p-2.5 rounded-xl border ${bg}">
                        <span class="text-xs font-black px-2 py-0.5 rounded-lg shrink-0 mt-0.5 ${labelBg}">${labels[i]||i}</span>
                        <div class="flex-1">
                            ${opt ? `<p class="text-sm text-gray-800">${window.escapeHtml ? window.escapeHtml(opt) : opt}</p>` : ''}
                            ${optImgs[i] ? `<img src="${optImgs[i]}" class="mt-1 max-h-20 rounded-lg border object-contain bg-white" onerror="this.style.display='none'">` : ''}
                        </div>
                        ${isCorrect ? `<span class="text-green-500 shrink-0 mt-0.5 text-xs font-bold">✓ Kunci</span>` : ''}
                    </div>`;
                });
                html += `</div>`;

            } else if (tipe === 'truefalse') {
                const tfChecked = document.querySelector('input[name="correct-tf"]:checked');
                const answer = tfChecked ? tfChecked.value : null;
                html += `<div class="flex gap-3 mt-3">`;
                ['true','false'].forEach(v => {
                    const label = v === 'true' ? '✅ BENAR' : '❌ SALAH';
                    const isCorrect = answer === v;
                    const bg = isCorrect ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-100 border-gray-200 text-gray-500';
                    html += `<div class="flex-1 text-center py-3 rounded-xl border-2 font-bold text-sm ${bg}">
                        ${label} ${isCorrect ? '<span class="text-xs">(Kunci)</span>' : ''}
                    </div>`;
                });
                html += `</div>`;

            } else if (tipe === 'essay') {
                const rubrik = document.getElementById('q-essay-rubrik') ? document.getElementById('q-essay-rubrik').value : '';
                const skor   = document.getElementById('q-essay-skor-maks') ? document.getElementById('q-essay-skor-maks').value : '10';
                html += `<div class="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p class="text-xs font-bold text-emerald-700 mb-1">📝 Jawaban siswa (area teks esai)</p>
                    <div class="w-full h-16 rounded-lg border border-emerald-200 bg-white"></div>
                    ${rubrik ? `<div class="mt-2 pt-2 border-t border-emerald-200"><p class="text-xs font-bold text-emerald-600 mb-0.5">Rubrik/Kunci Koreksi:</p><p class="text-xs text-gray-600 whitespace-pre-wrap">${window.escapeHtml ? window.escapeHtml(rubrik) : rubrik}</p></div>` : ''}
                    <p class="text-xs text-emerald-600 font-semibold mt-1.5">Skor maks: ${skor} poin</p>
                </div>`;

            } else if (tipe === 'menjodohkan') {
                const pairs = typeof window._getMenjodohkanPairs === 'function' ? window._getMenjodohkanPairs() : [];
                if (pairs.length > 0) {
                    html += `<div class="mt-3">
                        <p class="text-xs text-gray-500 mb-2 font-semibold">Pasangkan item kiri dengan item kanan yang benar:</p>
                        <div class="space-y-2">`;
                    pairs.forEach((p, i) => {
                        html += `<div class="flex items-center gap-3 p-2.5 bg-teal-50 rounded-xl border border-teal-200">
                            <span class="flex-1 text-sm text-gray-800 font-medium">${i+1}. ${window.escapeHtml ? window.escapeHtml(p.kiri||'') : (p.kiri||'')}</span>
                            <span class="text-teal-400 font-bold shrink-0">↔</span>
                            <span class="flex-1 text-sm text-teal-700 font-medium">${window.escapeHtml ? window.escapeHtml(p.kanan||'') : (p.kanan||'')}</span>
                        </div>`;
                    });
                    html += `</div></div>`;
                } else {
                    html += `<p class="text-xs text-gray-400 italic mt-2">Pasangan menjodohkan belum ditambahkan.</p>`;
                }
            }

            container.innerHTML = html;
            if (typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
        };

        window.addOptionInput = (value = '', imgValue = '') => {
            const container = document.getElementById('q-options-container');
            const idx = container.children.length;
            const labels = ['A','B','C','D','E'];
            const div = document.createElement('div');
            div.className = "mb-3 border rounded-xl p-3 bg-gray-50";
            div.innerHTML = `
                <div class="flex gap-2 mb-2 items-center">
                    <span class="py-1.5 px-3 bg-blue-600 text-white rounded-lg text-sm font-bold min-w-[32px] text-center">${labels[idx]||idx}</span>
                    <input type="text" name="options[]" value="${value.replace(/"/g,'&quot;')}" class="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm" placeholder="Teks pilihan (boleh kosong jika pakai gambar)">
                    <button type="button" onclick="this.closest('.mb-3').remove(); window.reindexOptions()" class="text-red-400 hover:bg-red-50 p-2 rounded-lg shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
                <div class="opt-img-wrapper">
                    <div class="flex gap-2 mb-1">
                        <button type="button" onclick="window.switchOptImgTab(this,'url')" class="opt-img-tab-url px-2 py-1 text-xs font-bold rounded bg-purple-600 text-white">🔗 URL/Drive</button>
                        <button type="button" onclick="window.switchOptImgTab(this,'upload')" class="opt-img-tab-upload px-2 py-1 text-xs font-bold rounded bg-white text-purple-600 border border-purple-300 hover:bg-purple-50">📁 Upload</button>
                        <span class="text-xs text-gray-400 self-center">Gambar pilihan (opsional)</span>
                    </div>
                    <div class="opt-img-panel-url">
                        <input type="text" class="opt-image-url w-full px-2 py-1.5 border rounded text-xs outline-none focus:ring-1 focus:ring-purple-400 bg-white" placeholder="URL gambar atau link Google Drive..." value="${imgValue && !imgValue.startsWith('data:') ? imgValue.replace(/"/g,'&quot;') : ''}" oninput="window.previewOptImg(this)">
                    </div>
                    <div class="opt-img-panel-upload hidden">
                        <div class="border border-dashed border-purple-300 rounded p-2 text-center cursor-pointer hover:bg-purple-50 text-xs text-purple-500" onclick="this.nextElementSibling.click()">📁 Pilih gambar...</div>
                        <input type="file" class="opt-img-file hidden" accept="image/*" onchange="window.handleOptImgUpload(this)">
                    </div>
                    <input type="hidden" class="opt-image-data" value="${imgValue ? imgValue.replace(/"/g,'&quot;') : ''}">
                    <div class="opt-img-preview hidden mt-2 flex items-center gap-2">
                        <img src="${imgValue || ''}" class="max-h-20 rounded border border-purple-200 object-contain bg-white" ${imgValue ? '' : 'style="display:none"'}>
                        <button type="button" onclick="window.clearOptImg(this)" class="text-xs text-red-400 hover:underline shrink-0">✕ Hapus</button>
                    </div>
                </div>
            `;
            container.appendChild(div);
            // Tampilkan preview jika ada gambar awal
            if (imgValue) {
                const preview = div.querySelector('.opt-img-preview');
                const img = preview.querySelector('img');
                preview.classList.remove('hidden');
                img.style.display = '';
                img.src = imgValue;
            }
            if(typeof lucide !== 'undefined') window._createIconsSafe();
        };

        window.reindexOptions = function() {
            const labels = ['A','B','C','D','E'];
            document.querySelectorAll('#q-options-container > div').forEach((div, i) => {
                const badge = div.querySelector('span.bg-blue-600');
                if (badge) badge.textContent = labels[i] || i;
            });
        };

        window.switchOptImgTab = function(btn, tab) {
            const wrapper = btn.closest('.opt-img-wrapper');
            const urlPanel    = wrapper.querySelector('.opt-img-panel-url');
            const uploadPanel = wrapper.querySelector('.opt-img-panel-upload');
            const tabUrl      = wrapper.querySelector('.opt-img-tab-url');
            const tabUpload   = wrapper.querySelector('.opt-img-tab-upload');
            if (tab === 'url') {
                urlPanel.classList.remove('hidden');
                uploadPanel.classList.add('hidden');
                tabUrl.className    = 'opt-img-tab-url px-2 py-1 text-xs font-bold rounded bg-purple-600 text-white';
                tabUpload.className = 'opt-img-tab-upload px-2 py-1 text-xs font-bold rounded bg-white text-purple-600 border border-purple-300 hover:bg-purple-50';
            } else {
                urlPanel.classList.add('hidden');
                uploadPanel.classList.remove('hidden');
                tabUrl.className    = 'opt-img-tab-url px-2 py-1 text-xs font-bold rounded bg-white text-purple-600 border border-purple-300 hover:bg-purple-50';
                tabUpload.className = 'opt-img-tab-upload px-2 py-1 text-xs font-bold rounded bg-purple-600 text-white';
            }
        };

        window.previewOptImg = function(input) {
            const wrapper = input.closest('.opt-img-wrapper');
            const url = window.convertGDriveUrl(input.value.trim());
            const preview = wrapper.querySelector('.opt-img-preview');
            const img = preview.querySelector('img');
            const dataEl = wrapper.querySelector('.opt-image-data');
            if (url) {
                img.src = url; img.style.display = '';
                preview.classList.remove('hidden');
                dataEl.value = url;
            } else {
                img.style.display = 'none';
                preview.classList.add('hidden');
                dataEl.value = '';
            }
        };

        window.handleOptImgUpload = function(input) {
            const file = input.files[0];
            if (!file) return;
            if (file.size > 900 * 1024) { alert('Gambar terlalu besar (maks 800KB)!'); input.value=''; return; }
            const reader = new FileReader();
            reader.onload = function(e) {
                const wrapper = input.closest('.opt-img-wrapper');
                const preview = wrapper.querySelector('.opt-img-preview');
                const img = preview.querySelector('img');
                const dataEl = wrapper.querySelector('.opt-image-data');
                img.src = e.target.result; img.style.display = '';
                preview.classList.remove('hidden');
                dataEl.value = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        window.saveQuestionSubmit = async (e) => {
            e.preventDefault();
            if(!window.isFirebaseReady) return alert("Mode Offline: Tidak bisa menyimpan soal.");

            const id      = document.getElementById('q-id').value;
            const paketId = document.getElementById('q-packet').value;

            // Guard: guru hanya boleh simpan soal ke paket yang di-assign
            if (window.currentGuruData && !window.currentGuruData.paketIds.includes(paketId)) {
                return alert('⛔ Anda tidak memiliki akses ke paket ini.\nHubungi Admin untuk mendapatkan akses.');
            }
            const text    = document.getElementById('q-text').value;
            const tipe    = document.getElementById('q-tipe').value || 'single';
            const image   = document.getElementById('q-image-data').value || '';
            const aktif   = document.getElementById('q-aktif').checked;

            // Derive correct answer(s)
            let correct;
            let essayRubrik = '';
            let essaySkorMaks = 10;
            if (tipe === 'multiple') {
                const checked = Array.from(document.querySelectorAll('#q-correct-multi-checks input[type=checkbox]:checked')).map(c => parseInt(c.value));
                if (checked.length === 0) return alert("Jawaban ganda: centang minimal 1 jawaban yang benar!");
                correct = checked.sort();
            } else if (tipe === 'truefalse') {
                const tfRadio = document.querySelector('input[name="correct-tf"]:checked');
                if (!tfRadio) return alert("Pilih kunci jawaban: BENAR atau SALAH!");
                correct = tfRadio.value === 'true'; // boolean
            } else if (tipe === 'essay') {
                const rubrikEl = document.getElementById('q-essay-rubrik');
                const skorEl = document.getElementById('q-essay-skor-maks');
                essayRubrik = rubrikEl ? rubrikEl.value.trim() : '';
                essaySkorMaks = skorEl ? parseInt(skorEl.value) || 10 : 10;
                if (!essayRubrik) return alert("Soal esai harus memiliki rubrik/kunci jawaban untuk koreksi!");
                correct = null; // essay tidak punya correct index
            } else if (tipe === 'menjodohkan') {
                correct = null; // menjodohkan tidak pakai correct biasa
            } else {
                correct = parseInt(document.getElementById('q-correct').value);
            }

            // Derive packet letter from paket data
            const paket = (window.allPaketDB || []).find(p => p.id === paketId);
            const packet = paket ? (paket.jenis !== 'nonpaket' ? paket.jenis : 'A') : 'A';
            const token  = paket ? paket.token : '';

            const optRows = document.querySelectorAll('#q-options-container > div');
            const options = [], optionImages = [];
            optRows.forEach(row => {
                const textInput = row.querySelector('input[name="options[]"]');
                const imgData   = row.querySelector('.opt-image-data');
                options.push(textInput ? textInput.value : '');
                optionImages.push(imgData ? imgData.value : '');
            });

            // Validasi menjodohkan
            let pasangan = [];
            if (tipe === 'menjodohkan') {
                pasangan = window._getMenjodohkanPairs();
                if (pasangan.length < 2) return alert("Soal menjodohkan minimal memiliki 2 pasangan!");
                if (pasangan.some(p => !p.kiri || !p.kanan)) return alert("Semua baris menjodohkan harus terisi (kiri dan kanan)!");
            }

            if (!text && !image) return alert("Soal harus memiliki teks pertanyaan atau gambar soal!");
            if (tipe !== 'truefalse' && tipe !== 'essay' && tipe !== 'menjodohkan' && options.every(o => !o) && optionImages.every(i => !i)) return alert("Minimal satu pilihan jawaban harus diisi!");

            // ★ Ambil KD tag
            const kdTag = (document.getElementById('q-kd-tag')?.value || '').trim();

            const data = { paketId, packet, text, options, optionImages, correct, tipe, image, token, aktif, kdTag, updatedAt: Date.now() };
            if (tipe === 'essay') {
                const modeChecked = document.querySelector('input[name="q-essay-koreksi-mode"]:checked');
                data.essayRubrik = essayRubrik;
                data.essaySkorMaks = essaySkorMaks;
                data.essayKoreksiMode = modeChecked ? modeChecked.value : 'ai'; // 'ai' | 'manual'
            }
            if (tipe === 'menjodohkan') { data.pasangan = pasangan; }

            try {
                if (id) {
                    await updateDoc(doc(window.db, 'artifacts', window.appId, 'public', 'data', 'questions', id), data);
                } else {
                    data.createdAt = Date.now();
                    await addDoc(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'questions'), data);
                }
                window.closeQuestionModal();
            } catch (err) { alert("Gagal menyimpan: " + err.message); }
        };

        // ── ROLE HELPER ─────────────────────────────────────────────
        window.isAdmin    = () => window.currentUserRole === 'admin';
        window.isPengawas = () => window.currentUserRole === 'pengawas';
        window.isGuru     = () => window.currentUserRole === 'guru';
        window.isStaff    = () => ['admin','pengawas','guru'].includes(window.currentUserRole);
        window.isSiswa    = () => window.currentUserRole === 'siswa';
        // Data guru yang sedang login (paketIds yang diizinkan)
        window.currentGuruData = null; // { username, displayName, mapel, paketIds: [] }

        // ── UPDATE TOKEN DISPLAY DI UI PENGAWAS ───────────────────────────
        window.updatePengawasTokenDisplay = function() {
            const container = document.getElementById('pengawas-token-list');
            if (!container) return;

            // Helper: render satu QR card untuk sebuah token
            function renderTokenCard(token, namaJadwal, kelasInfo, badgeHtml) {
                const uid = 'qr-' + token.replace(/[^A-Z0-9]/g,'') + '-' + Math.random().toString(36).slice(2,6);
                const card = document.createElement('div');
                card.className = 'flex flex-col items-center bg-white border-2 border-amber-300 rounded-2xl px-4 py-3 min-w-[160px] shadow-sm';
                card.innerHTML =
                    '<div id="' + uid + '" class="mb-2"></div>' +
                    '<span class="font-mono font-black text-xl tracking-[0.2em] text-amber-800">' + token + '</span>' +
                    '<span class="text-[10px] text-amber-600 font-bold mt-1 text-center leading-tight">' + escapeHtml(namaJadwal) + '</span>' +
                    (kelasInfo ? '<span class="text-[9px] text-gray-400 text-center">' + escapeHtml(kelasInfo) + '</span>' : '') +
                    badgeHtml;
                container.appendChild(card);
                // Generate QR setelah card masuk DOM
                if (typeof QRCode !== 'undefined') {
                    new QRCode(document.getElementById(uid), {
                        text: token,
                        width: 128,
                        height: 128,
                        colorDark: '#92400e',   // amber-800
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.M
                    });
                }
            }

            container.innerHTML = ''; // Bersihkan dulu

            // Kumpulkan semua jadwal yang sedang aktif bersamaan
            const jadwalAktifList = (window.allJadwalDB || []).filter(j => j.isActive === true);

            if (jadwalAktifList.length > 0) {
                jadwalAktifList.forEach(function(jadwal) {
                    const paketJadwal = (window.allPaketDB || []).find(p => p.id === jadwal.paketId);
                    const token = jadwal.tokenCustom
                        ? jadwal.tokenCustom.toUpperCase()
                        : (paketJadwal ? (paketJadwal.token || window.currentExamToken || '—') : (window.currentExamToken || '—'));
                    const namaJadwal = jadwal.nama || (paketJadwal ? paketJadwal.nama : '—');
                    const kelasInfo  = jadwal.kelasArr && jadwal.kelasArr.length
                        ? jadwal.kelasArr.join(', ')
                        : (jadwal.kelas || '');
                    const badgeHtml = '<span class="text-[9px] text-green-600 font-bold mt-0.5">⚡ Aktif ' + jadwal.jamMulai + '–' + jadwal.jamSelesai + '</span>';
                    renderTokenCard(token, namaJadwal, kelasInfo, badgeHtml);
                });
                return;
            }

            // Tidak ada jadwal aktif → cek jadwal hari ini yang belum mulai
            const now = new Date();
            const todayStr = now.toISOString().slice(0, 10);
            const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
            const jadwalHariIni = (window.allJadwalDB || []).filter(j =>
                j.tanggal === todayStr && timeStr < j.jamSelesai && !j.sudahDijalankan
            );

            if (jadwalHariIni.length > 0) {
                const berikutnya = jadwalHariIni.sort((a,b) => a.jamMulai.localeCompare(b.jamMulai))[0];
                container.innerHTML =
                    '<div class="flex flex-col items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 min-w-[140px] text-center">' +
                        '<span class="text-xs font-bold text-gray-400">⏳ Menunggu Jadwal</span>' +
                        '<span class="text-sm font-black text-gray-600 mt-1">' + escapeHtml(berikutnya.nama || '—') + '</span>' +
                        '<span class="text-[10px] text-gray-400 mt-0.5">Mulai pukul ' + berikutnya.jamMulai + '</span>' +
                    '</div>';
                return;
            }

            // Tidak ada jadwal → fallback token global dengan QR
            const globalToken = window.currentExamToken || '—';
            renderTokenCard(globalToken, 'Token Global', '', '<span class="text-[9px] text-amber-400 font-semibold mt-0.5">(Token Global)</span>');
        };

        // ══════════ QR TOKEN — Admin Panel ══════════
        // Dipanggil setiap kali token berubah (dari Firebase listener atau save)
        window._adminQrInstance = null;
        window.refreshAdminTokenQr = function(token) {
            const wrap = document.getElementById('admin-token-qr');
            if (!wrap || !token || token === '—') return;
            if (typeof QRCode === 'undefined') return;
            // Destroy instance lama dulu
            wrap.innerHTML = '';
            window._adminQrInstance = new QRCode(wrap, {
                text: token,
                width: 140,
                height: 140,
                colorDark: '#1d4ed8',   // blue-700
                colorLight: '#eff6ff',   // blue-50
                correctLevel: QRCode.CorrectLevel.M
            });
        };

        window.setupRealtimeListener = () => {
            if (!window.isFirebaseReady || !window.db) return;
            if (window._unsub_realtimeMonitor) return; // ★ guard: sudah aktif

            const q = query(collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));

            // FIX 1: Tandai dokumen yang sudah ada saat listener pertama kali aktif.
            // Dengan menyimpan set ID awal, kita bisa membedakan data LAMA vs data BARU
            // sehingga alert hanya muncul untuk kejadian yang benar-benar baru terjadi,
            // tapi tabel monitoring tetap langsung menampilkan SEMUA data (termasuk SEDANG MENGERJAKAN).
            let knownIds = null;

            window._unsub_realtimeMonitor = onSnapshot(q, (snapshot) => {
                const results = [];
                snapshot.forEach((docSnap) => {
                    results.push({ id: docSnap.id, ...docSnap.data() });
                });

                // Pertama kali snapshot tiba → catat semua ID yang sudah ada, jangan alert
                if (knownIds === null) {
                    knownIds = new Set(results.map(r => r.id));
                } else if (window.isStaff()) {
                    // FIX 2: Hanya alert untuk perubahan pada data di RUANG PENGAWAS SENDIRI.
                    // Admin (tidak ada currentPengawasRuang) mendapat alert semua ruang.
                    const pgRuang = window.currentPengawasRuang
                        ? (window.currentPengawasRuang.nama || '').trim().toLowerCase()
                        : null; // null = admin, tidak difilter

                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "modified" || change.type === "added") {
                            const data = change.doc.data();
                            const isNew = !knownIds.has(change.doc.id);
                            knownIds.add(change.doc.id);

                            // Cek apakah kejadian ini relevan untuk pengawas yang login
                            if (pgRuang !== null) {
                                // Pengawas: hanya alert jika siswa di ruangnya sendiri
                                const siswaRuang = (data.ruangUjian || '').trim().toLowerCase();
                                if (siswaRuang !== pgRuang) return; // ← beda ruang, skip
                            }

                            // Trigger alert hanya jika ada pelanggaran BARU (bukan data lama)
                            const hasViolation = data.violations > 0 || (data.status && data.status.includes("DISKUALIFIKASI"));
                            if (hasViolation && !isNew) {
                                // modified dengan pelanggaran = siswa baru melanggar
                                if(window.triggerCheatAlert) window.triggerCheatAlert(data);
                            } else if (hasViolation && isNew && data.violations > 0) {
                                // doc baru langsung punya violations (edge case re-login)
                                if(window.triggerCheatAlert) window.triggerCheatAlert(data);
                            }
                        }
                    });
                }

                results.sort((a, b) => b.timestamp - a.timestamp);
                if(window.updateDashboardTable) window.updateDashboardTable(results);
            });
        }
