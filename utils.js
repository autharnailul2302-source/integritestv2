// ══ MULTI-TENANT BADGE & GUARD ══
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            const urlParam = new URLSearchParams(window.location.search).get('s');
            // Tampilkan badge untuk ?s= maupun mode default (baseUrl match / last-resort)
            // resolvedId akan diisi setelah appId selesai diresolved secara async
            const badgeWrap = document.getElementById('school-badge-wrap');
            const badgeText = document.getElementById('school-badge-text');

            // Tunggu Firebase siap & appId selesai diresolved
            function waitAndFetch(tries) {
                if (tries > 30) return;
                const currentId = urlParam || window.appId;
                if (!window.isFirebaseReady || !window.db || !currentId || window._appIdSource === 'pending-baseurl') {
                    setTimeout(() => waitAndFetch(tries + 1), 400);
                    return;
                }
                // Tampilkan badge dengan appId sementara
                if (badgeWrap && badgeText) {
                    badgeText.textContent = currentId.toUpperCase();
                    badgeWrap.classList.remove('hidden');
                }
                // Cari sekolah di superadmin/data/schools berdasarkan appId
                window.getDocs(window.collection(window.db, 'superadmin', 'data', 'schools'))
                    .then(snap => {
                        snap.forEach(d => {
                            const data = d.data();
                            if (data.appId === (urlParam || window.appId || '').toLowerCase()) {
                                // Update badge dengan nama sekolah lengkap
                                if (badgeText) badgeText.textContent = data.nama || (urlParam || window.appId || '').toUpperCase();

                                // Jika sekolah nonaktif — blokir akses
                                if (data.status === 'nonaktif') {
                                    document.body.innerHTML = `
                                        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;font-family:sans-serif;">
                                            <div style="text-align:center;padding:40px;">
                                                <div style="font-size:48px;margin-bottom:16px;">⛔</div>
                                                <h2 style="color:#f87171;font-size:20px;font-weight:800;margin-bottom:8px;">Akses Sekolah Dinonaktifkan</h2>
                                                <p style="color:#64748b;font-size:13px;">Sekolah <strong style="color:#94a3b8;">${data.nama}</strong> sementara tidak dapat mengakses sistem.<br>Hubungi administrator INTEGRITEST untuk informasi lebih lanjut.</p>
                                            </div>
                                        </div>`;
                                }
                            }
                        });
                    })
                    .catch(() => {}); // Gagal fetch superadmin — tidak masalah, app tetap jalan
            }
            waitAndFetch(0);
        });
    </script>


// ══ QR SCANNER ══
    <script>
        // ══════════ QR SCANNER — Siswa ══════════
        window._qrStream = null;
        window._qrAnimFrame = null;
        window._qrDone = false;

        window.openQrScanner = function() {
            window._qrDone = false;
            const modal = document.getElementById('modal-qr-scanner');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.getElementById('qr-status-text').textContent = '🔍 Memulai kamera...';

            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(function(stream) {
                    window._qrStream = stream;
                    const video = document.getElementById('qr-video');
                    video.srcObject = stream;
                    video.play();
                    video.addEventListener('loadedmetadata', function() {
                        document.getElementById('qr-status-text').textContent = '🔍 Arahkan kamera ke QR token...';
                        window._qrTick();
                    });
                })
                .catch(function(err) {
                    document.getElementById('qr-status-text').textContent = '⚠️ Kamera tidak dapat diakses: ' + err.message;
                });
        };

        window._qrTick = function() {
            if (window._qrDone) return;
            const video = document.getElementById('qr-video');
            const canvas = document.getElementById('qr-canvas');
            if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
                window._qrAnimFrame = requestAnimationFrame(window._qrTick);
                return;
            }
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            if (typeof jsQR !== 'undefined') {
                const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'dontInvert' });
                if (code && code.data) {
                    const raw = code.data.trim().toUpperCase();
                    // Token bisa berupa plain text atau JSON {token:"XXX"}
                    let token = raw;
                    try {
                        const parsed = JSON.parse(code.data);
                        if (parsed && parsed.token) token = parsed.token.trim().toUpperCase();
                    } catch(e) {}
                    window._qrDone = true;
                    document.getElementById('qr-status-text').textContent = '✅ Token ditemukan: ' + token;
                    setTimeout(function() {
                        // Isi input token di form siswa
                        const tokenInput = document.getElementById('student-token');
                        if (tokenInput) {
                            tokenInput.value = token;
                            tokenInput.dispatchEvent(new Event('input'));
                        }
                        window.closeQrScanner();
                    }, 600);
                    return;
                }
            }
            window._qrAnimFrame = requestAnimationFrame(window._qrTick);
        };

        window.closeQrScanner = function() {
            window._qrDone = true;
            if (window._qrAnimFrame) cancelAnimationFrame(window._qrAnimFrame);
            if (window._qrStream) {
                window._qrStream.getTracks().forEach(function(t) { t.stop(); });
                window._qrStream = null;
            }
            const video = document.getElementById('qr-video');
            if (video) video.srcObject = null;
            const modal = document.getElementById('modal-qr-scanner');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };
    </script>


// ══ QR TOKEN REFRESH ══
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Debounced refresh: QR admin diperbarui saat input berhenti 500ms
            var _qrDebounce = null;
            var tokenInput = document.getElementById('teacher-token-input');
            if (tokenInput) {
                tokenInput.addEventListener('input', function() {
                    clearTimeout(_qrDebounce);
                    var val = this.value.trim().toUpperCase();
                    _qrDebounce = setTimeout(function() {
                        if (val && window.refreshAdminTokenQr) window.refreshAdminTokenQr(val);
                    }, 500);
                });
            }
        });
    </script>
