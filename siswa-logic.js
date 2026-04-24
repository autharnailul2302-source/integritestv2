    <script>
        function waitFirebase(cb, tries=0) {
            if (window.isFirebaseReady && window.db && window.collection && window.onSnapshot) { cb(); return; }
            if (tries > 30) {
                console.warn('[Siswa] Firebase timeout - retry in 5s');
                setTimeout(() => waitFirebase(cb, 0), 5000); // reset & coba lagi
                return;
            }
            // Exponential backoff: 200ms, 400ms, 600ms... max 2s
            const delay = Math.min(200 * (tries + 1), 2000);
            setTimeout(() => waitFirebase(cb, tries+1), delay);
        }

        const COLL_SISWA   = () => window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa');
        const COLL_SETTING = () => window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'app_settings');

        // ══════════════════════════════════════════════
        // SUB-TAB SWITCHER (Data Siswa / Kartu / WA)
        // ══════════════════════════════════════════════
        window.switchSiswaSubTab = function(tab) {
            // Pastikan tabel dirender ulang setiap kali sub-tab data dibuka
            if (tab === 'data' || !tab) {
                window.renderSiswaTable();
            }
        };

        // ══════════════════════════════════════════════
        // KARTU PESERTA — Core Logic
        // ══════════════════════════════════════════════
        window.allKartuData = [];

        window.generateKartuPeserta = async function() {
            if (!window.allSiswaDB || !window.allSiswaDB.length) {
                alert('Belum ada data siswa. Import Excel terlebih dahulu di tab Data Siswa.'); return;
            }
            const prefix   = (document.getElementById('kartu-prefix').value.trim() || 'PES').toUpperCase();
            const kapasitas= parseInt(document.getElementById('kartu-kapasitas').value) || 30;
            const mode     = document.querySelector('input[name="kartu-mode-ruang"]:checked').value;

            let ruangList = [];
            if (window.isFirebaseReady && window.db) {
                try {
                    const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'ruang_ujian'));
                    snap.forEach(d => ruangList.push({ id: d.id, ...d.data() }));
                } catch(e) { console.warn('[Kartu] Gagal ambil ruang:', e); }
            }
            if (!ruangList.length) {
                alert('Belum ada ruang ujian.\nTambahkan ruang di tab Kelas & Ruang terlebih dahulu.'); return;
            }

            let siswaList = [...window.allSiswaDB];
            const hasil = [];

            if (mode === 'kelas') {
                const kelasList = [...new Set(siswaList.map(s => s.kelas || ''))].sort();
                let ruangIdx = 0, slotSisa = kapasitas;
                for (const kelas of kelasList) {
                    const siswaKelas = siswaList.filter(s => (s.kelas || '') === kelas);
                    for (let i = 0; i < siswaKelas.length; i++) {
                        if (slotSisa <= 0) { ruangIdx++; slotSisa = kapasitas; }
                        if (ruangIdx >= ruangList.length) ruangIdx = ruangList.length - 1;
                        hasil.push({ siswa: siswaKelas[i], ruangObj: ruangList[ruangIdx] });
                        slotSisa--;
                    }
                    if (slotSisa < kapasitas && slotSisa > 0) { ruangIdx++; slotSisa = kapasitas; }
                }
            } else {
                // Acak
                for (let i = siswaList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [siswaList[i], siswaList[j]] = [siswaList[j], siswaList[i]];
                }
                let ruangIdx = 0, slot = 0;
                for (const sw of siswaList) {
                    if (slot >= kapasitas) { ruangIdx++; slot = 0; }
                    if (ruangIdx >= ruangList.length) ruangIdx = ruangList.length - 1;
                    hasil.push({ siswa: sw, ruangObj: ruangList[ruangIdx] });
                    slot++;
                }
            }

            hasil.sort((a, b) => {
                const ra = (a.ruangObj.nama||a.ruangObj.name||'').localeCompare(b.ruangObj.nama||b.ruangObj.name||'');
                if (ra !== 0) return ra;
                const ka = (a.siswa.kelas||'').localeCompare(b.siswa.kelas||'');
                if (ka !== 0) return ka;
                return (a.siswa.nama||'').localeCompare(b.siswa.nama||'');
            });

            window.allKartuData = hasil.map((item, idx) => ({
                siswaId: item.siswa.id,
                nisn: item.siswa.nisn || '',
                nama: item.siswa.nama || '',
                kelas: item.siswa.kelas || '',
                waOrtu: item.siswa.waOrtu || '',
                noPeserta: prefix + '-' + String(idx + 1).padStart(3, '0'),
                ruang: item.ruangObj.nama || item.ruangObj.name || ('Ruang '+(idx+1)),
                ruangId: item.ruangObj.id || '',
            }));

            if (window.isFirebaseReady && window.db) {
                const batchPromises = window.allKartuData.map(k =>
                    window.updateDoc(
                        window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', k.siswaId),
                        { noPeserta: k.noPeserta, ruangKartu: k.ruang, ruangKartuId: k.ruangId }
                    ).catch(() => {})
                );
                await Promise.all(batchPromises);
            }

            _updateKartuFilters();
            _updateKartuStats();
            window.renderKartuTable();
            alert('\u2705 Berhasil generate ' + window.allKartuData.length + ' nomor peserta!\nData tersimpan ke database.');
        };

        function _updateKartuFilters() {
            const ruangSet = [...new Set(window.allKartuData.map(k => k.ruang))].sort();
            const kelasSet = [...new Set(window.allKartuData.map(k => k.kelas))].sort();
            const selR = document.getElementById('kartu-filter-ruang');
            const selK = document.getElementById('kartu-filter-kelas');
            if (selR) selR.innerHTML = '<option value="">Semua Ruang</option>' + ruangSet.map(r => '<option>'+r+'</option>').join('');
            if (selK) selK.innerHTML = '<option value="">Semua Kelas</option>' + kelasSet.map(k => '<option>'+k+'</option>').join('');
        }

        function _updateKartuStats() {
            const statsEl = document.getElementById('kartu-stats');
            if (statsEl) { statsEl.classList.remove('hidden'); statsEl.style.display = 'grid'; }
            const ruangSet = new Set(window.allKartuData.map(k => k.ruang));
            const kelasSet = new Set(window.allKartuData.map(k => k.kelas));
            const total = window.allKartuData.length;
            const rataRuang = ruangSet.size > 0 ? Math.round(total / ruangSet.size) : 0;
            const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
            set('kartu-stat-total', total);
            set('kartu-stat-ruang', ruangSet.size);
            set('kartu-stat-kelas', kelasSet.size);
            set('kartu-stat-rataruang', rataRuang);
        }

        window.renderKartuTable = function() {
            if (!window.allKartuData.length && window.allSiswaDB && window.allSiswaDB.length) {
                const hasPeserta = window.allSiswaDB.filter(s => s.noPeserta);
                if (hasPeserta.length) {
                    window.allKartuData = hasPeserta.map(s => ({
                        siswaId: s.id, nisn: s.nisn||'', nama: s.nama||'', kelas: s.kelas||'',
                        waOrtu: s.waOrtu||'', noPeserta: s.noPeserta, ruang: s.ruangKartu||'-', ruangId: s.ruangKartuId||''
                    }));
                    _updateKartuFilters();
                    _updateKartuStats();
                }
            }
            const search = (document.getElementById('kartu-search')?.value || '').toLowerCase();
            const fRuang = document.getElementById('kartu-filter-ruang')?.value || '';
            const fKelas = document.getElementById('kartu-filter-kelas')?.value || '';
            let data = window.allKartuData.filter(k => {
                if (fRuang && k.ruang !== fRuang) return false;
                if (fKelas && k.kelas !== fKelas) return false;
                if (search && !(k.nama.toLowerCase().includes(search) || k.noPeserta.toLowerCase().includes(search))) return false;
                return true;
            });
            const tbody = document.getElementById('kartu-table-body');
            if (!tbody) return;
            const pwKartu = document.getElementById('pager-kartu-wrap');
            if (!data.length) {
                tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-12 text-center text-gray-400">Tidak ada data.</td></tr>';
                if (pwKartu) pwKartu.innerHTML = '';
                return;
            }
            // ★ PAGING
            const pgKartu = window._pg.kartu;
            const totalKartu = data.length;
            const pageKartu = pgSlice(data, pgKartu);
            const ksStart = pgKartu.perPage === 0 ? 0 : (pgKartu.page - 1) * pgKartu.perPage;
            tbody.innerHTML = pageKartu.map(k =>
                '<tr class="hover:bg-slate-50 border-b">' +
                '<td class="px-4 py-3 font-mono font-bold text-indigo-700 text-sm">' + k.noPeserta + '</td>' +
                '<td class="px-4 py-3 font-semibold text-gray-800">' + k.nama + '</td>' +
                '<td class="px-4 py-3 text-gray-600 text-sm">' + k.kelas + '</td>' +
                '<td class="px-4 py-3"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">' + k.ruang + '</span></td>' +
                '<td class="px-4 py-3 text-center"><button onclick="window.printSatuKartu(\'' + k.siswaId + '\')" class="text-indigo-500 hover:bg-indigo-50 p-1.5 rounded border border-indigo-100" title="Cetak Kartu"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 6 2 18 2 18 9\"/><path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><rect width=\"12\" height=\"8\" x=\"6\" y=\"14\"/></svg></button></td>' +
                '</tr>'
            ).join('');
            if (pwKartu) pwKartu.innerHTML = renderPagerHTML('kartu', totalKartu, pgKartu.page, pgKartu.perPage);
        };

        window.resetKartuPeserta = async function() {
            if (!confirm('Reset semua nomor peserta & pembagian ruang?')) return;
            window.allKartuData = [];
            if (window.isFirebaseReady && window.db) {
                const promises = (window.allSiswaDB || []).filter(s => s.noPeserta).map(s =>
                    window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', s.id), { noPeserta: '', ruangKartu: '', ruangKartuId: '' }).catch(()=>{})
                );
                await Promise.all(promises);
            }
            window.renderKartuTable();
            const statsEl = document.getElementById('kartu-stats');
            if (statsEl) statsEl.style.display = 'none';
            alert('\u2705 Nomor peserta berhasil direset.');
        };

        // PRINT KARTU
        function _buildKartuHTML(kartuList) {
            const judul   = document.getElementById('kartu-judul')?.value.trim()   || 'Ujian Sekolah';
            const sekolah = document.getElementById('kartu-sekolah')?.value.trim() || 'Sekolah';

            const cards = kartuList.map((k, idx) =>
                `<div class="kartu">
                  <!-- HEADER -->
                  <div class="kartu-header">
                    <div class="header-left">
                      <div class="logo-integri">
                        <span class="logo-integri-text">INTEGRI<span class="logo-test">TEST</span></span>
                        <span class="logo-tagline">Computer Based Test</span>
                      </div>
                    </div>
                    <div class="header-divider"></div>
                    <div class="header-right">
                      <div class="sekolah-name">${sekolah}</div>
                      <div class="ujian-name">${judul}</div>
                      <div class="kartu-badge">KARTU PESERTA UJIAN</div>
                    </div>
                  </div>

                  <!-- NOMOR PESERTA — area utama -->
                  <div class="nomor-section">
                    <div class="nomor-label">NOMOR PESERTA</div>
                    <div class="nomor-value">${k.noPeserta}</div>
                    <div class="nomor-keterangan">⚠ Nomor ini bersifat unik dan tidak dapat digunakan oleh peserta lain. Tunjukkan kartu ini kepada pengawas sebelum ujian dimulai.</div>
                  </div>

                  <!-- DATA PESERTA -->
                  <div class="data-section">
                    <div class="data-row">
                      <div class="data-item">
                        <span class="data-label">Nama Peserta</span>
                        <span class="data-value bold">${_e(k.nama)}</span>
                      </div>
                      <div class="data-item">
                        <span class="data-label">NISN</span>
                        <span class="data-value mono">${k.nisn || '—'}</span>
                      </div>
                    </div>
                    <div class="data-row">
                      <div class="data-item">
                        <span class="data-label">Kelas</span>
                        <span class="data-value">${k.kelas}</span>
                      </div>
                      <div class="data-item ruang-highlight">
                        <span class="data-label">Ruang Ujian</span>
                        <span class="data-value bold ruang-val">📍 ${k.ruang}</span>
                      </div>
                    </div>
                  </div>

                  <!-- FOOTER TTD -->
                  <div class="kartu-footer">
                    <div class="ttd-col">
                      <div class="ttd-label">Mengetahui,</div>
                      <div class="ttd-label">Panitia / Pengawas Ruang</div>
                      <div class="ttd-space"></div>
                      <div class="ttd-line"></div>
                      <div class="ttd-nama">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</div>
                    </div>
                    <div class="ttd-col">
                      <div class="ttd-label">Tanda Tangan</div>
                      <div class="ttd-label">Peserta Ujian</div>
                      <div class="ttd-space"></div>
                      <div class="ttd-line"></div>
                      <div class="ttd-nama">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</div>
                    </div>
                  </div>
                </div>`
            ).join('<div class="page-break"></div>');

            const css = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; }

.kartu {
  width: 15cm;
  margin: 0.6cm auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  page-break-inside: avoid;
  border: 1px solid #d1d9e6;
}

/* HEADER */
.kartu-header {
  background: linear-gradient(135deg, #0f2057 0%, #1e40af 55%, #1d4ed8 100%);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #fff;
}
.header-left { flex-shrink: 0; }
.logo-integri {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-integri-text {
  font-size: 15pt;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #fff;
  font-family: 'Segoe UI Black', Arial Black, sans-serif;
  line-height: 1;
}
.logo-test { color: #60a5fa; }
.logo-tagline {
  font-size: 6pt;
  color: rgba(255,255,255,0.65);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 3px;
  font-weight: 500;
}
.header-divider {
  width: 1.5px;
  height: 44px;
  background: rgba(255,255,255,0.25);
  flex-shrink: 0;
}
.header-right { flex: 1; }
.sekolah-name {
  font-size: 9.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
  line-height: 1.2;
}
.ujian-name {
  font-size: 8pt;
  color: rgba(255,255,255,0.8);
  margin: 3px 0 5px;
  font-style: italic;
}
.kartu-badge {
  display: inline-block;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  font-size: 6pt;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 20px;
}

/* NOMOR PESERTA */
.nomor-section {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-bottom: 2px solid #1e40af;
  padding: 12px 18px 10px;
  text-align: center;
  position: relative;
}
.nomor-label {
  font-size: 6.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #1e40af;
  margin-bottom: 4px;
}
.nomor-value {
  font-size: 26pt;
  font-weight: 900;
  color: #0f2057;
  font-family: 'Courier New', monospace;
  letter-spacing: 3px;
  line-height: 1.1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.nomor-keterangan {
  font-size: 6pt;
  color: #2563eb;
  margin-top: 5px;
  background: rgba(37,99,235,0.08);
  border: 1px solid rgba(37,99,235,0.2);
  border-radius: 6px;
  padding: 3px 8px;
  display: inline-block;
  line-height: 1.4;
}

/* DATA PESERTA */
.data-section {
  padding: 10px 18px 8px;
}
.data-row {
  display: flex;
  gap: 12px;
  margin-bottom: 6px;
}
.data-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  padding: 5px 9px;
}
.data-item.ruang-highlight {
  background: #f0fdf4;
  border-color: #86efac;
}
.data-label {
  font-size: 6.5pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #64748b;
  margin-bottom: 2px;
}
.data-value {
  font-size: 9.5pt;
  color: #1e293b;
  line-height: 1.2;
}
.data-value.bold { font-weight: 700; }
.data-value.mono { font-family: 'Courier New', monospace; font-size: 9pt; }
.ruang-val { color: #15803d; font-weight: 700; }

/* FOOTER TTD */
.kartu-footer {
  display: flex;
  gap: 0;
  border-top: 1.5px dashed #cbd5e1;
  margin-top: 4px;
  padding: 10px 18px 12px;
}
.ttd-col {
  flex: 1;
  text-align: center;
  padding: 0 8px;
}
.ttd-col:first-child {
  border-right: 1px dashed #e2e8f0;
}
.ttd-label {
  font-size: 7pt;
  color: #64748b;
  line-height: 1.5;
}
.ttd-space { height: 26px; }
.ttd-line {
  border-bottom: 1px solid #334155;
  width: 85%;
  margin: 0 auto 4px;
}
.ttd-nama {
  font-size: 7pt;
  color: #475569;
}

.page-break { page-break-after: always; height: 0; display: block; }
@media print {
  body { background: #fff; }
  .page-break { page-break-after: always; }
  .kartu { box-shadow: none; margin: 0.4cm auto; }
}
`;

            return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Kartu Peserta Ujian — ${judul}</title><style>${css}</style></head><body>${cards}</body></html>`;
        }

        window.printSatuKartu = function(siswaId) {
            const k = window.allKartuData.find(k => k.siswaId === siswaId);
            if (!k) { alert('Data kartu tidak ditemukan. Klik "Generate" terlebih dahulu.'); return; }
            const html = _buildKartuHTML([k]);
            const win = window.open('', '_blank', 'width=700,height=600');
            if (!win) { alert('Popup diblokir browser.'); return; }
            win.document.write(html);
            win.document.close();
            win.onload = () => { win.focus(); win.print(); };
        };

        window.printAllKartu = function() {
            const fRuang = document.getElementById('kartu-filter-ruang')?.value || '';
            const fKelas = document.getElementById('kartu-filter-kelas')?.value || '';
            const search = (document.getElementById('kartu-search')?.value || '').toLowerCase();
            let data = window.allKartuData.filter(k => {
                if (fRuang && k.ruang !== fRuang) return false;
                if (fKelas && k.kelas !== fKelas) return false;
                if (search && !(k.nama.toLowerCase().includes(search) || k.noPeserta.toLowerCase().includes(search))) return false;
                return true;
            });
            if (!data.length) { alert('Tidak ada kartu untuk dicetak.'); return; }
            const html = _buildKartuHTML(data);
            const win = window.open('', '_blank', 'width=800,height=700');
            if (!win) { alert('Popup diblokir browser.'); return; }
            win.document.write(html);
            win.document.close();
            win.onload = () => { win.focus(); win.print(); };
        };

        window.saveFonnteSettings = async function() {
            const token    = document.getElementById('fonnte-token-input').value.trim();
            const template = document.getElementById('fonnte-template-input').value;
            if (!token) { alert('Token Fonnte tidak boleh kosong!'); return; }
            localStorage.setItem('integritest_fonnte_token', token);
            localStorage.setItem('integritest_fonnte_template', template);
            // Simpan juga state auto-send
            const autoSendChk = document.getElementById('fonnte-auto-send-toggle');
            if (autoSendChk) {
                localStorage.setItem('integritest_fonnte_auto_send', autoSendChk.checked ? '1' : '0');
            }
            if (window.isFirebaseReady && window.db && window.setDoc && window.doc) {
                try {
                    await window.setDoc(
                        window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'app_settings', 'fonnte_settings'),
                        { fonnteToken: token, fonnteTemplate: template, updatedAt: Date.now(), timestamp: Date.now() },
                        { merge: true }
                    );
                } catch(e) { console.warn('[Fonnte] Gagal simpan ke Firestore:', e); }
            }
            const status = document.getElementById('fonnte-save-status');
            if (status) { status.classList.remove('hidden'); setTimeout(() => status.classList.add('hidden'), 2500); }
            alert('\u2705 Pengaturan WA berhasil disimpan!');
        };

        window.toggleAutoSendWA = function(checked) {
            localStorage.setItem('integritest_fonnte_auto_send', checked ? '1' : '0');
            console.log('[AutoWA] Auto kirim WA', checked ? 'AKTIF' : 'NONAKTIF');
        };

        function _loadFonnteLocal() {
            const token    = localStorage.getItem('integritest_fonnte_token') || '';
            const defTpl   = "Assalamu'alaikum Bpk/Ibu Wali dari *{nama}*.\n\nBerikut hasil ujian putra/putri Anda:\n📚 Mata Ujian: {mapel}\n🏫 Kelas: {kelas}\n📊 Nilai: *{nilai}*\n🏆 Predikat: {status}\n\nTerima kasih 🙏";
            const template = localStorage.getItem('integritest_fonnte_template') || defTpl;
            const ti = document.getElementById('fonnte-token-input');
            const tm = document.getElementById('fonnte-template-input');
            if (ti) ti.value = token;
            if (tm) tm.value = template;
            // Load state auto-send toggle
            const autoSend = localStorage.getItem('integritest_fonnte_auto_send') === '1';
            const chk = document.getElementById('fonnte-auto-send-toggle');
            if (chk) chk.checked = autoSend;
        }

        window.allSiswaDB = [];

        function _listenForSiswa() {
            if (!window.isFirebaseReady || !window.db) return;
            if (window._unsub_listenForSiswa) return; // ★ guard duplikat
            window._unsub_listenForSiswa = window.onSnapshot(window.query(COLL_SISWA()), (snap) => {
                window.allSiswaDB = [];
                snap.forEach(d => window.allSiswaDB.push({ id: d.id, ...d.data() }));
                _updateSiswaStats();
                // Selalu render tabel siswa
                window.renderSiswaTable();

                // AUTO-REBUILD allKartuData dari Firestore setiap kali data siswa siap
                // Ini memastikan kartu tidak hilang setelah pindah halaman / refresh
                const hasPeserta = window.allSiswaDB.filter(s => s.noPeserta);
                if (hasPeserta.length) {
                    window.allKartuData = hasPeserta.map(s => ({
                        siswaId: s.id,
                        nisn: s.nisn || '',
                        nama: s.nama || '',
                        kelas: s.kelas || '',
                        waOrtu: s.waOrtu || '',
                        noPeserta: s.noPeserta,
                        ruang: s.ruangKartu || '-',
                        ruangId: s.ruangKartuId || ''
                    }));
                    window.allKartuData.sort((a, b) => a.noPeserta.localeCompare(b.noPeserta));
                    if (typeof _updateKartuFilters === 'function') _updateKartuFilters();
                    if (typeof _updateKartuStats === 'function') _updateKartuStats();
                    if (typeof window.renderKartuTable === 'function') {
                        window.renderKartuTable();
                    }
                }
            });
        }

        function _updateSiswaStats() {
            const total    = window.allSiswaDB.length;
            const withWa   = window.allSiswaDB.filter(s => s.waOrtu).length;
            const noWa     = total - withWa;
            const notifSent= window.allSiswaDB.filter(s => s.notifSent).length;
            const s = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
            s('siswa-stat-total', total); s('siswa-stat-wa', withWa);
            s('siswa-stat-nowa',  noWa);  s('siswa-stat-notif', notifSent);
        }

        window.renderSiswaTable = function() {
            const search   = (document.getElementById('siswa-search')?.value || '').toLowerCase();
            const filterWa = document.getElementById('siswa-filter-wa')?.value || 'all';
            const data = window.allSiswaDB.filter(s => {
                const matchSearch = !search || (s.nama||'').toLowerCase().includes(search) || (s.nisn||'').toString().includes(search);
                const matchWa = filterWa==='all' || (filterWa==='ada' ? !!s.waOrtu : !s.waOrtu);
                return matchSearch && matchWa;
            });
            const tbody = document.getElementById('siswa-table-body');
            if (!tbody) return;
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="px-4 py-10 text-center text-gray-400"><i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-gray-300"></i><p>' + (window.allSiswaDB.length===0?'Belum ada data siswa. Import dari Excel terlebih dahulu.':'Tidak ada data yang cocok.') + '</p></td></tr>';
                const pw2 = document.getElementById('pager-siswa-wrap'); if(pw2) pw2.innerHTML='';
                if(typeof lucide!=='undefined') window._createIconsSafe(); return;
            }
            // ★ PAGING
            const pgSiswa = window._pg.siswa;
            const total = data.length;
            const pageData = pgSlice(data, pgSiswa);
            const sliceStart = pgSiswa.perPage === 0 ? 0 : (pgSiswa.page - 1) * pgSiswa.perPage;
            tbody.innerHTML = pageData.map((s,i) => {
                const globalIdx = sliceStart + i;
                const waStatus = s.waOrtu
                    ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold"><i data-lucide="check-circle" class="w-3 h-3"></i>Ada</span>'
                    : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold"><i data-lucide="alert-circle" class="w-3 h-3"></i>Belum</span>';
                const notifBadge = s.notifSent ? '<span class="text-[10px] text-teal-600 font-semibold ml-1">\u2713 Terkirim</span>' : '';
                const namaEsc = (s.nama||'').replace(/'/g,"&#39;");
                // Tombol kirim WA langsung per baris
                const kirimBtn = s.waOrtu
                    ? '<button onclick="window.kirimWALangsung(\'' + s.id + '\')" class="text-green-600 hover:bg-green-50 p-1.5 rounded border border-green-200 hover:border-green-400" title="Kirim WA ke Ortu Sekarang"><i data-lucide="send" class="w-3.5 h-3.5"></i></button>'
                    : '<button disabled class="text-gray-300 p-1.5 rounded border border-gray-100 cursor-not-allowed" title="Tidak ada No. WA"><i data-lucide="send" class="w-3.5 h-3.5"></i></button>';
                return '<tr class="hover:bg-slate-50 border-b">' +
                    '<td class="px-4 py-3 text-gray-500 text-sm">'+(globalIdx+1)+'</td>' +
                    '<td class="px-4 py-3 font-mono text-sm text-gray-700">'+(s.nisn||'-')+'</td>' +
                    '<td class="px-4 py-3 font-semibold text-gray-800">'+(s.nama||'-')+'</td>' +
                    '<td class="px-4 py-3 text-gray-600 text-sm">'+(s.kelas||'-')+'</td>' +
                    '<td class="px-4 py-3 font-mono text-sm text-gray-700">'+(s.waOrtu||'<span class="text-gray-300">\u2014</span>')+'</td>' +
                    '<td class="px-4 py-3 text-center">'+waStatus+notifBadge+'</td>' +
                    '<td class="px-4 py-3 text-center"><div class="flex gap-1 justify-center">' +
                        kirimBtn +
                        '<button onclick="window.openEditSiswa(\'' + s.id + '\')" class="text-blue-500 hover:bg-blue-50 p-1.5 rounded border border-blue-100" title="Edit Data Siswa"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>' +
                        '<button onclick="window.hapusSiswa(\'' + s.id + '\')" class="text-red-500 hover:bg-red-50 p-1.5 rounded border border-red-100" title="Hapus"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>' +
                    '</div></td>' +
                '</tr>';
            }).join('');
            // Render pager siswa
            const pwSiswa = document.getElementById('pager-siswa-wrap');
            if (pwSiswa) pwSiswa.innerHTML = renderPagerHTML('siswa', total, pgSiswa.page, pgSiswa.perPage);
            if(typeof lucide!=='undefined') window._createIconsSafe();
        };

        window.filterSiswaTable = function() {
            if (window._pg && window._pg.siswa) window._pg.siswa.page = 1;
            window.renderSiswaTable();
        };

        window.editSiswaWa = function(id, nisn, nama, waLama) {
            window.openEditSiswa(id);
        };

        // ★ MODAL EDIT SISWA LENGKAP (NISN, Nama, Kelas, No WA Ortu)
        window.openEditSiswa = function(id) {
            const siswa = window.allSiswaDB.find(s => s.id === id);
            if (!siswa) { alert('Data siswa tidak ditemukan.'); return; }

            // Buat modal jika belum ada
            let modal = document.getElementById('modal-edit-siswa');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'modal-edit-siswa';
                modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
                modal.innerHTML = `
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                        <div class="flex items-center justify-between mb-5">
                            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                </span>
                                Edit Data Siswa
                            </h3>
                            <button onclick="document.getElementById('modal-edit-siswa').remove()" class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">NISN</label>
                                <input id="edit-siswa-nisn" type="text" placeholder="Contoh: 1234567890" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                                <input id="edit-siswa-nama" type="text" placeholder="Nama siswa" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Kelas</label>
                                <input id="edit-siswa-kelas" type="text" placeholder="Contoh: XI TKJ 1" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">No. WA Orang Tua</label>
                                <input id="edit-siswa-wa" type="text" placeholder="Contoh: 628123456789 (kosongkan jika tidak ada)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                                <p class="text-xs text-gray-400 mt-1">Format: diawali 62, tanpa spasi/tanda hubung</p>
                            </div>
                        </div>
                        <div class="flex gap-3 mt-6">
                            <button onclick="document.getElementById('modal-edit-siswa').remove()" class="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50">Batal</button>
                            <button onclick="window.simpanEditSiswa()" class="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                                Simpan
                            </button>
                        </div>
                    </div>`;
                document.body.appendChild(modal);
                // Tutup modal jika klik di luar
                modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
            }

            // Isi nilai saat ini
            document.getElementById('edit-siswa-nisn').value = siswa.nisn || '';
            document.getElementById('edit-siswa-nama').value = siswa.nama || '';
            document.getElementById('edit-siswa-kelas').value = siswa.kelas || '';
            document.getElementById('edit-siswa-wa').value = siswa.waOrtu || '';
            modal.dataset.editId = id;
            modal.style.display = 'flex';
        };

        window.simpanEditSiswa = async function() {
            const modal = document.getElementById('modal-edit-siswa');
            if (!modal) return;
            const id = modal.dataset.editId;
            const nisn = document.getElementById('edit-siswa-nisn').value.trim();
            const nama = document.getElementById('edit-siswa-nama').value.trim();
            const kelas = document.getElementById('edit-siswa-kelas').value.trim();
            const waRaw = document.getElementById('edit-siswa-wa').value.trim().replace(/\D/g,'');

            if (!nisn) { alert('NISN tidak boleh kosong!'); document.getElementById('edit-siswa-nisn').focus(); return; }
            if (!nama) { alert('Nama tidak boleh kosong!'); document.getElementById('edit-siswa-nama').focus(); return; }
            if (waRaw && !waRaw.startsWith('62')) { alert('Format No. WA harus diawali 62 (contoh: 628123456789)'); document.getElementById('edit-siswa-wa').focus(); return; }
            if (!window.isFirebaseReady) { alert('Mode offline. Tidak bisa menyimpan.'); return; }

            try {
                await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', id), {
                    nisn: nisn,
                    nama: nama,
                    kelas: kelas,
                    waOrtu: waRaw,
                });
                modal.remove();
            } catch(e) {
                alert('Gagal menyimpan: ' + e.message);
            }
        };

        window.hapusSiswa = async function(id) {
            if (!confirm('Hapus data siswa ini?')) return;
            await window.deleteDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', id));
        };

        // ★ FITUR #9: Konfirmasi kuat sebelum Hapus Semua data siswa ★
        window.clearAllSiswa = async function() {
            if (!window.allSiswaDB.length) { alert('Tidak ada data untuk dihapus.'); return; }
            const jumlah = window.allSiswaDB.length;

            // Tampilkan modal konfirmasi berlapis — bukan hanya window.confirm
            const html = `<div id="modal-confirm-hapus-siswa" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px)">
              <div style="background:#fff;border-radius:16px;padding:32px;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);text-align:center">
                <div style="font-size:48px;margin-bottom:12px">⚠️</div>
                <h2 style="font-size:20px;font-weight:900;color:#dc2626;margin-bottom:8px">Hapus Semua Data Siswa?</h2>
                <p style="font-size:14px;color:#6b7280;margin-bottom:16px">Anda akan menghapus <strong style="color:#dc2626">${jumlah} siswa</strong> dari database.<br>Tindakan ini <strong>tidak bisa dibatalkan</strong>.</p>
                <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin-bottom:20px">
                  <p style="font-size:12px;color:#dc2626;font-weight:700;margin:0 0 8px">Ketik HAPUS untuk konfirmasi:</p>
                  <input id="konfirmasi-hapus-input" type="text" placeholder="Ketik HAPUS di sini..." style="width:100%;padding:8px 12px;border:2px solid #fca5a5;border-radius:8px;font-size:14px;font-weight:700;outline:none;box-sizing:border-box" oninput="document.getElementById('btn-konfirmasi-hapus').disabled=this.value!=='HAPUS'">
                </div>
                <div style="display:flex;gap:10px;justify-content:center">
                  <button onclick="document.getElementById('modal-confirm-hapus-siswa').remove()" style="flex:1;padding:10px;border:1px solid #e5e7eb;background:#f9fafb;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer">Batal</button>
                  <button id="btn-konfirmasi-hapus" disabled onclick="window._doHapusSemua()" style="flex:1;padding:10px;background:#dc2626;color:white;border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;opacity:0.4;transition:opacity 0.2s" 
                    onmouseenter="if(!this.disabled)this.style.background='#b91c1c'" onmouseleave="this.style.background='#dc2626'">
                    🗑️ Hapus ${jumlah} Siswa
                  </button>
                </div>
              </div>
            </div>`;
            // Enable button only when text matches
            document.body.insertAdjacentHTML('beforeend', html);
            const input = document.getElementById('konfirmasi-hapus-input');
            const btn   = document.getElementById('btn-konfirmasi-hapus');
            input.addEventListener('input', () => { btn.disabled = input.value !== 'HAPUS'; btn.style.opacity = btn.disabled ? '0.4' : '1'; });
        };
        window._doHapusSemua = async function() {
            const modal = document.getElementById('modal-confirm-hapus-siswa');
            if (modal) modal.remove();
            const btn = document.querySelector('[onclick="window.clearAllSiswa()"]');
            if (btn) { btn.textContent = '⏳ Menghapus...'; btn.disabled = true; }
            try {
                for (const s of window.allSiswaDB) {
                    await window.deleteDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', s.id));
                }
                alert('✅ Semua data siswa berhasil dihapus.');
            } catch(e) {
                alert('❌ Gagal hapus: ' + e.message);
            } finally {
                if (btn) { btn.innerHTML = '<i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Hapus Semua'; btn.disabled = false; if(window._createIconsSafe) window._createIconsSafe(); }
            }
        };

        window.downloadTemplateSiswa = function() {
            if (typeof XLSX === 'undefined') { alert('Library XLSX belum siap.'); return; }
            const ws = XLSX.utils.aoa_to_sheet([
                ['nisn', 'nama', 'kelas', 'wa_ortu'],
                ['1234567890', 'Ahmad Fauzan', 'XI TKJ 1', '628123456789'],
                ['0987654321', 'Siti Rahayu', 'XI TKJ 2', '628987654321'],
            ]);
            ws['!cols'] = [{wch:15},{wch:30},{wch:15},{wch:18}];
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data Siswa');
            XLSX.writeFile(wb, 'template_data_siswa.xlsx');
        };

        window.handleSiswaImport = function(input) {
            const file = input.files[0];
            if (!file) return;
            if (typeof XLSX === 'undefined') { alert('Library XLSX belum siap.'); return; }
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const wb  = XLSX.read(e.target.result, { type: 'array' });
                    const ws  = wb.Sheets[wb.SheetNames[0]];
                    const rows= XLSX.utils.sheet_to_json(ws, { defval: '' });
                    const parsed = rows.map(r => {
                        const norm = {};
                        Object.keys(r).forEach(k => norm[k.toLowerCase().trim().replace(/\s+/g,'_')] = r[k]);
                        return {
                            nisn:   (norm.nisn||norm.no_nisn||'').toString().trim(),
                            nama:   (norm.nama||norm.nama_siswa||norm.name||'').toString().trim(),
                            kelas:  (norm.kelas||norm.class||'').toString().trim(),
                            waOrtu: (norm.wa_ortu||norm.no_wa_ortu||norm.wa||norm.whatsapp||'').toString().trim().replace(/\D/g,''),
                        };
                    }).filter(r => r.nisn && r.nama);
                    if (!parsed.length) { showSiswaStatus('error', '❌ Tidak ada data valid. Pastikan kolom: nisn, nama, kelas, wa_ortu.'); return; }
                    window._parsedSiswaData = parsed;
                    document.getElementById('siswa-import-count').textContent = parsed.length;
                    document.getElementById('siswa-preview-body').innerHTML = parsed.map(s =>
                        '<tr class="border-b hover:bg-gray-50"><td class="px-4 py-2 font-mono text-xs">'+s.nisn+'</td><td class="px-4 py-2 text-sm">'+s.nama+'</td><td class="px-4 py-2 text-sm">'+s.kelas+'</td><td class="px-4 py-2 font-mono text-xs '+(s.waOrtu?'text-green-700':'text-amber-500')+'">'+(s.waOrtu||'—')+'</td></tr>'
                    ).join('');
                    document.getElementById('siswa-import-preview').classList.remove('hidden');
                    if(typeof lucide!=='undefined') window._createIconsSafe();
                } catch(err) { showSiswaStatus('error', '❌ Gagal membaca: ' + err.message); }
                input.value = '';
            };
            reader.readAsArrayBuffer(file);
        };

        window.uploadSiswaData = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Mode offline.'); return; }
            const data = window._parsedSiswaData || [];
            if (!data.length) return;
            const btn = document.getElementById('btn-upload-siswa');
            btn.disabled = true;
            btn.innerHTML = 'Menyimpan...';
            let added=0, updated=0;
            try {
                for (const s of data) {
                    const existing = window.allSiswaDB.find(d => d.nisn.toString()===s.nisn.toString());
                    if (existing) {
                        await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', existing.id), { nama:s.nama, kelas:s.kelas, waOrtu:s.waOrtu, updatedAt:Date.now() });
                        updated++;
                    } else {
                        await window.addDoc(COLL_SISWA(), { ...s, createdAt:Date.now(), notifSent:false });
                        added++;
                    }
                }
                document.getElementById('siswa-import-preview').classList.add('hidden');
                window._parsedSiswaData = [];
                showSiswaStatus('success', '✅ ' + added + ' siswa ditambahkan, ' + updated + ' diperbarui!');
            } catch(err) { showSiswaStatus('error', '❌ Gagal: ' + err.message); }
            finally {
                btn.disabled = false;
                btn.innerHTML = 'Simpan ke Database';
                if(typeof lucide!=='undefined') window._createIconsSafe();
            }
        };

        function showSiswaStatus(type, msg) {
            const el = document.getElementById('siswa-import-status');
            if (!el) return;
            el.className = type==='success'
                ? 'mb-4 px-4 py-3 rounded-lg border text-sm font-semibold bg-green-50 border-green-200 text-green-800'
                : 'mb-4 px-4 py-3 rounded-lg border text-sm font-semibold bg-red-50 border-red-200 text-red-800';
            el.textContent = msg;
            el.classList.remove('hidden');
            setTimeout(() => el.classList.add('hidden'), 6000);
        }

        async function _kirimWA(nomorWA, pesan) {
            const token = localStorage.getItem('integritest_fonnte_token') || '';
            if (!token) { alert('⚠️ Token Fonnte belum diatur! Buka tab Data Siswa → isi Token API Fonnte.'); return false; }
            try {
                const resp = await fetch('https://api.fonnte.com/send', {
                    method: 'POST',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ target: nomorWA, message: pesan, countryCode: '62' })
                });
                const result = await resp.json();
                return result.status === true;
            } catch(e) { console.error('[Fonnte]', e); return false; }
        }

        function _buildPesan(siswaDB, hasil) {
            const defTpl = "Assalamu'alaikum Bpk/Ibu Wali dari *{nama}*.\n\nHasil ujian:\n📚 {mapel}\n🏫 Kelas: {kelas}\n📊 Nilai: *{nilai}*\n🏆 {status}\n\nTerima kasih 🙏";
            const template = localStorage.getItem('integritest_fonnte_template') || defTpl;
            const score = hasil.score ?? '-';
            let statusLabel = '-';
            if (typeof score === 'number') statusLabel = score>=90?'Sangat Baik (A)':score>=80?'Baik (B)':score>=70?'Cukup (C)':score>=60?'Kurang (D)':'Sangat Kurang (E)';
            return template
                .replace(/{nama}/g, hasil.studentName || siswaDB.nama || '-')
                .replace(/{kelas}/g, hasil.className || siswaDB.kelas || '-')
                .replace(/{nilai}/g, score)
                .replace(/{status}/g, statusLabel)
                .replace(/{mapel}/g, hasil.paketNama || hasil.sesiName || 'Ujian');
        }

        // Helper ambil hasil ujian dari Firestore langsung (tidak bergantung _allDashboardData)
        async function _getHasilUjianDariFirestore() {
            if (!window.isFirebaseReady || !window.db) return [];
            try {
                const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                const hasil = [];
                snap.forEach(d => hasil.push({ id: d.id, ...d.data() }));
                return hasil;
            } catch(e) {
                console.warn('[Fonnte] Gagal ambil exam_results dari Firestore:', e);
                return [];
            }
        }

        // Kirim WA dari tombol di tab Monitoring (pakai hasilId)
        window.kirimNotifikasiSatu = async function(hasilId) {
            // Cari di cache dulu, kalau tidak ada ambil dari Firestore
            let semua = [...(window._allDashboardData||[]), ...(window.currentFilteredData||[])];
            let hasil = semua.find(d => d.id === hasilId);
            if (!hasil) {
                // Ambil langsung dari Firestore
                const allHasil = await _getHasilUjianDariFirestore();
                hasil = allHasil.find(d => d.id === hasilId);
            }
            if (!hasil) { alert('Data ujian tidak ditemukan.'); return; }
            const nisn = (hasil.studentNisn||'').toString().trim();
            let waOrtu = '';
            if (nisn) {
                const sw = window.allSiswaDB.find(s => s.nisn.toString()===nisn);
                if (sw) waOrtu = sw.waOrtu || '';
            }
            if (!waOrtu) {
                const manual = prompt('No. WA Ortu untuk ' + hasil.studentName + ' tidak ada di database.\nMasukkan manual (628xxx) atau kosongkan untuk batal:');
                if (!manual) return;
                waOrtu = manual.trim().replace(/\D/g,'');
            }
            if (!waOrtu) return;
            const siswaDB = window.allSiswaDB.find(s => s.nisn&&s.nisn.toString()===nisn) || {};
            const token = localStorage.getItem('integritest_fonnte_token') || '';
            if (!token) { alert('\u26a0\ufe0f Token Fonnte belum diatur! Buka tab Data Siswa \u2192 isi Token API Fonnte.'); return; }
            const pesan = _buildPesan(siswaDB, hasil);
            const ok = await _kirimWA(waOrtu, pesan);
            if (ok) {
                alert('\u2705 Notifikasi terkirim ke ' + waOrtu);
                if (siswaDB.id && window.isFirebaseReady) {
                    await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', siswaDB.id), { notifSent:true, notifSentAt:Date.now() });
                }
            } else { alert('\u274c Gagal kirim. Cek token Fonnte dan pastikan device WhatsApp sudah Connect.'); }
        };

        // ★ Kirim WA langsung dari baris tabel Data Siswa
        window.kirimWALangsung = async function(siswaId) {
            const siswa = window.allSiswaDB.find(s => s.id === siswaId);
            if (!siswa || !siswa.waOrtu) { alert('Nomor WA tidak ditemukan.'); return; }
            const token = localStorage.getItem('integritest_fonnte_token') || '';
            if (!token) { alert('\u26a0\ufe0f Token Fonnte belum diatur! Isi dulu di pengaturan di atas.'); return; }
            // Cari hasil ujian siswa ini — dari cache dulu, lalu Firestore
            let allHasil = [...(window._allDashboardData||[]), ...(window.currentFilteredData||[])];
            if (!allHasil.length) allHasil = await _getHasilUjianDariFirestore();
            const hasilUjian = allHasil.find(d =>
                d.studentNisn && d.studentNisn.toString() === siswa.nisn.toString() && d.score != null
            );
            let pesan;
            const defTpl = "Assalamu'alaikum Bpk/Ibu Wali dari *{nama}*.\n\nBerikut hasil ujian putra/putri Anda:\n\ud83d\udcda Mata Ujian: {mapel}\n\ud83c\udfeb Kelas: {kelas}\n\ud83d\udcca Nilai: *{nilai}*\n\ud83c\udfc6 Predikat: {status}\n\nTerima kasih \ud83d\ude4f";
            const tpl = localStorage.getItem('integritest_fonnte_template') || defTpl;
            if (hasilUjian) {
                pesan = _buildPesan(siswa, hasilUjian);
            } else {
                pesan = tpl.replace(/{nama}/g,siswa.nama||'-').replace(/{kelas}/g,siswa.kelas||'-').replace(/{nilai}/g,'-').replace(/{status}/g,'-').replace(/{mapel}/g,'Ujian');
            }
            const preview = pesan.length > 150 ? pesan.substring(0,150)+'...' : pesan;
            if (!confirm('Kirim WA ke orang tua ' + (siswa.nama||'') + '?\nNomor: ' + siswa.waOrtu + '\n\nPreview:\n' + preview)) return;
            const ok = await _kirimWA(siswa.waOrtu, pesan);
            if (ok) {
                alert('\u2705 Pesan terkirim ke ' + siswa.waOrtu);
                await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'data_siswa', siswaId), { notifSent:true, notifSentAt:Date.now() });
            } else {
                alert('\u274c Gagal kirim. Cek token Fonnte dan pastikan device WhatsApp sudah Connect di fonnte.com');
            }
        };

        // ★ Kirim Semua — ambil langsung dari Firestore, tidak perlu buka tab Monitoring dulu
        window.kirimNotifikasiSemua = async function() {
            const token = localStorage.getItem('integritest_fonnte_token') || '';
            if (!token) { alert('\u26a0\ufe0f Token Fonnte belum diatur! Isi dulu di pengaturan di atas.'); return; }

            // Ambil semua siswa yang ada No. WA
            const siswaAdaWA = window.allSiswaDB.filter(s => s.waOrtu);
            if (!siswaAdaWA.length) {
                alert('Tidak ada siswa dengan No. WA Ortu di database.\nImport data siswa dengan kolom wa_ortu terlebih dahulu.');
                return;
            }

            // Ambil semua hasil ujian langsung dari Firestore (tidak perlu buka tab Monitoring dulu)
            const btnKirim = document.querySelector('button[onclick="window.kirimNotifikasiSemua()"]');
            if (btnKirim) { btnKirim.disabled = true; btnKirim.innerHTML = '\u23f3 Memuat data...'; }
            let allHasil = [...(window._allDashboardData||[]), ...(window.currentFilteredData||[])];
            if (!allHasil.length) {
                allHasil = await _getHasilUjianDariFirestore();
            }
            if (btnKirim) { btnKirim.disabled = false; btnKirim.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Kirim Semua (Yang Sudah Ujian)'; if(typeof lucide!=='undefined') window._createIconsSafe(); }

            // Hitung yang punya nilai vs yang belum
            const punyaHasil = siswaAdaWA.filter(s =>
                allHasil.some(d => d.studentNisn && d.studentNisn.toString()===s.nisn.toString() && d.score!=null)
            );
            const tanpaHasil = siswaAdaWA.filter(s => !punyaHasil.includes(s));

            let konfirmMsg = 'Kirim WA ke ' + siswaAdaWA.length + ' orang tua?';
            if (punyaHasil.length) konfirmMsg += '\n\u2705 ' + punyaHasil.length + ' siswa: dikirim hasil ujian dengan nilai';
            if (tanpaHasil.length) konfirmMsg += '\n\ud83d\udccb ' + tanpaHasil.length + ' siswa: belum ujian (nilai ditampilkan -)';
            konfirmMsg += '\n\nLanjutkan?';
            if (!confirm(konfirmMsg)) return;

            let berhasil=0, gagal=0;
            for (const siswa of siswaAdaWA) {
                const hasilUjian = allHasil.find(d =>
                    d.studentNisn && d.studentNisn.toString()===siswa.nisn.toString() && d.score!=null
                );
                let pesan;
                const defTpl = "Assalamu'alaikum Bpk/Ibu Wali dari *{nama}*.\n\nBerikut hasil ujian putra/putri Anda:\n\ud83d\udcda Mata Ujian: {mapel}\n\ud83c\udfeb Kelas: {kelas}\n\ud83d\udcca Nilai: *{nilai}*\n\ud83c\udfc6 Predikat: {status}\n\nTerima kasih \ud83d\ude4f";
                const tpl = localStorage.getItem('integritest_fonnte_template') || defTpl;
                if (hasilUjian) {
                    pesan = _buildPesan(siswa, hasilUjian);
                } else {
                    pesan = tpl.replace(/{nama}/g,siswa.nama||'-').replace(/{kelas}/g,siswa.kelas||'-').replace(/{nilai}/g,'-').replace(/{status}/g,'-').replace(/{mapel}/g,'Ujian');
                }
                const ok = await _kirimWA(siswa.waOrtu, pesan);
                if (ok) {
                    berhasil++;
                    await window.updateDoc(window.doc(window.db,'artifacts',window.appId,'public','data','data_siswa',siswa.id),{notifSent:true,notifSentAt:Date.now()});
                } else { gagal++; }
                await new Promise(r => setTimeout(r, 700));
            }
            alert('\u2705 Selesai!\n\u2713 Terkirim: ' + berhasil + '\n\u2717 Gagal: ' + gagal);
        };

        window.getWaOrtuByNisn = function(nisn) {
            if (!nisn) return null;
            const found = window.allSiswaDB.find(s => s.nisn.toString().trim()===nisn.toString().trim());
            return found ? found.waOrtu || null : null;
        };

        waitFirebase(() => {
            _listenForSiswa();
            _loadFonnteLocal();
            window.getDocs(COLL_SETTING()).then(snap => {
                snap.forEach(d => {
                    const data = d.data();
                    if (data.fonnteToken) {
                        localStorage.setItem('integritest_fonnte_token', data.fonnteToken);
                        if (data.fonnteTemplate) localStorage.setItem('integritest_fonnte_template', data.fonnteTemplate);
                        _loadFonnteLocal();
                    }
                });
            }).catch(()=>{});
        });

        // ═══════════════════════════════════════════════════════════════
        //  LOG ANOMALI — VALIDASI DATA FIREBASE REAL-TIME
        //  Membaca koleksi exam_results (sama dengan Monitoring Nilai)
        //  Menampilkan violationLogs + pagination 10/25/50/Semua
        // ═══════════════════════════════════════════════════════════════

        // ── State pagination ──
        window._logAnomalState = { data: [], pageSize: 10, page: 1 };

        // Ubah ukuran halaman & re-render tanpa fetch ulang ke Firebase
        window.setLogPageSize = function(size) {
            window._logAnomalState.pageSize = size;
            window._logAnomalState.page     = 1;
            // Update style tombol aktif
            ['10','25','50','all'].forEach(s => {
                const btn = document.getElementById('log-page-btn-' + s);
                if (!btn) return;
                const isActive = String(s) === String(size);
                btn.className = isActive
                    ? 'px-3 py-1.5 bg-red-600 text-white transition-colors' + (s !== '10' ? ' border-l border-red-500' : '')
                    : 'px-3 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors border-l border-gray-200';
            });
            window._renderLogTable();
        };

        // Pindah ke halaman tertentu
        window.goLogPage = function(p) {
            window._logAnomalState.page = p;
            window._renderLogTable();
            const tbl = document.getElementById('log-anomal-tbody');
            if (tbl) tbl.closest('.overflow-x-auto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        // Render baris tabel sesuai halaman aktif (tanpa fetch Firebase)
        window._renderLogTable = function() {
            const { data, pageSize, page } = window._logAnomalState;
            const tbody   = document.getElementById('log-anomal-tbody');
            const pBar    = document.getElementById('log-pagination-bar');
            const pInfo   = document.getElementById('log-pagination-info');
            const pBtns   = document.getElementById('log-pagination-btns');
            const countEl = document.getElementById('log-row-count');
            if (!tbody) return;

            const total      = data.length;
            const showAll    = pageSize === 'all';
            const perPage    = showAll ? total : Number(pageSize);
            const totalPages = showAll ? 1 : Math.ceil(total / perPage) || 1;
            const curPage    = Math.min(page, totalPages);
            const start      = showAll ? 0 : (curPage - 1) * perPage;
            const end        = showAll ? total : Math.min(start + perPage, total);
            const slice      = data.slice(start, end);

            if (countEl) countEl.textContent = total + ' siswa';

            if (!slice.length) {
                tbody.innerHTML = `<tr><td colspan="8" class="text-center py-12 text-gray-400">
                    <div class="flex flex-col items-center gap-2">
                        <i data-lucide="search-x" class="w-6 h-6 opacity-40"></i>
                        <p>Tidak ada data sesuai filter.</p>
                    </div></td></tr>`;
                if (pBar) pBar.classList.add('hidden');
                if (typeof lucide !== 'undefined') window._createIconsSafe();
                return;
            }

            // ── Render baris ──
            tbody.innerHTML = slice.map(r => {
                const viol  = r.violations || 0;
                const isDQ  = (r.status || '').includes('DISKUALIFIKASI');
                const logs  = r.violationLogs || [];

                const violBadge = viol === 0
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"><i data-lucide="check-circle" class="w-3 h-3"></i> Bersih</span>`
                    : isDQ
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><i data-lucide="x-circle" class="w-3 h-3"></i> ${viol}\u00d7 (DQ)</span>`
                    : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700"><i data-lucide="alert-triangle" class="w-3 h-3"></i> ${viol}\u00d7</span>`;

                const statusColor = isDQ ? 'bg-red-600 text-white' : viol === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800';
                const statusText  = isDQ ? '\ud83d\udd34 DISKUALIFIKASI' : viol === 0 ? '\ud83d\udfe2 BERSIH' : '\ud83d\udfe1 PERINGATAN';

                const logHtml = logs.length === 0
                    ? `<span class="text-gray-300 text-xs italic">Tidak ada rekaman</span>`
                    : logs.map((l, li) => {
                        const tStr = l.time ? new Date(l.time).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit', second:'2-digit'}) : '??:??';
                        let icon = '\u26a0\ufe0f';
                        if (/tab|meninggalkan/i.test(l.message||''))      icon = '\ud83d\udd00';
                        if (/fullscreen/i.test(l.message||''))            icon = '\u26f6';
                        if (/mengambang|notifikasi/i.test(l.message||'')) icon = '\ud83d\udcf1';
                        if (/incognito/i.test(l.message||''))             icon = '\ud83d\udd76\ufe0f';
                        const dotColor = isDQ && li === logs.length - 1 ? '#dc2626' : '#f59e0b';
                        // Badge bobot per jenis
                        const wMap = { high: { label: '−25', cls: 'bg-red-100 text-red-600' }, medium: { label: '−15', cls: 'bg-amber-100 text-amber-700' }, low: { label: '−10', cls: 'bg-yellow-100 text-yellow-700' } };
                        const wb = wMap[l.type] || { label: '−20', cls: 'bg-gray-100 text-gray-500' };
                        return `<div class="flex items-start gap-2 py-1 ${li < logs.length-1 ? 'border-b border-dashed border-gray-100' : ''}">
                            <div class="w-2 h-2 rounded-full mt-1 shrink-0" style="background:${dotColor}"></div>
                            <div class="flex-1">
                                <span class="text-[10px] font-mono text-gray-400">[${tStr}]</span>
                                <span class="text-[10px] text-gray-700 ml-1">${icon} ${l.message || 'Anomali terdeteksi'}</span>
                                <span class="ml-1 text-[9px] font-black px-1 py-0.5 rounded ${wb.cls}">${wb.label}</span>
                            </div>
                        </div>`;
                    }).join('');

                const startStr = r.startTime ? new Date(r.startTime).toLocaleString('id-ID', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '\u2014';
                const endStr   = r.endTime   ? new Date(r.endTime).toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'}) : '<span class="text-blue-500 text-[10px]">Berlangsung</span>';
                const nilaiStr = r.score != null ? `<span class="font-black text-lg ${r.score >= window.currentKKM ? 'text-green-600' : 'text-red-500'}">${r.score}</span>` : `<span class="text-gray-300">\u2014</span>`;
                const rowBg    = isDQ ? 'bg-red-50/60' : viol > 0 ? 'bg-yellow-50/40' : '';

                // Appeal cell
                const ap = r.appealStatus || 'none';
                let appealCell = '';
                if (ap === 'none' && viol === 0) {
                    appealCell = `<span class="text-gray-200 text-xs">\u2014</span>`;
                } else if (ap === 'none' && viol > 0) {
                    appealCell = `<span class="text-xs text-gray-400 italic">Tidak ada</span>`;
                } else if (ap === 'pending') {
                    const notePreview = r.appealNote ? r.appealNote.substring(0,60)+(r.appealNote.length>60?'\u2026':'') : '';
                    appealCell = `<div class="flex flex-col items-center gap-1.5">
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 animate-pulse">\u2696\ufe0f Menunggu Review</span>
                        ${notePreview ? `<p class="text-[10px] text-gray-500 text-center max-w-[130px]">"${notePreview}"</p>` : ''}
                        <div class="flex gap-1 mt-1">
                            <button onclick="window.approveAppeal('${r.id}')" class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-lg active:scale-95 transition-all">\u2705 Ampuni</button>
                            <button onclick="window.rejectAppeal('${r.id}')" class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-lg active:scale-95 transition-all">\u274c Tolak</button>
                        </div></div>`;
                } else if (ap === 'approved') {
                    appealCell = `<div class="flex flex-col items-center gap-1">
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">\u2705 Banding Diterima</span>
                        ${r.guruReviewer ? `<span class="text-[10px] text-gray-400">oleh ${r.guruReviewer}</span>` : ''}
                        ${r.guruNote ? `<span class="text-[10px] text-gray-500 italic">"${r.guruNote}"</span>` : ''}
                    </div>`;
                } else if (ap === 'rejected') {
                    appealCell = `<div class="flex flex-col items-center gap-1">
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">\u274c Banding Ditolak</span>
                        ${r.guruReviewer ? `<span class="text-[10px] text-gray-400">oleh ${r.guruReviewer}</span>` : ''}
                        ${r.guruNote ? `<span class="text-[10px] text-gray-500 italic">"${r.guruNote}"</span>` : ''}
                    </div>`;
                } else {
                    appealCell = `<span class="text-gray-300 text-xs">\u2014</span>`;
                }

                return `<tr class="hover:bg-gray-50 transition-colors ${rowBg}">
                    <td class="px-4 py-3">
                        <div class="font-bold text-gray-800 text-sm">${_e(r.studentName) || '\u2014'}</div>
                        <div class="text-[10px] text-gray-400 font-mono">${_e(r.studentNisn) || ''}</div>
                    </td>
                    <td class="px-4 py-3">
                        <div class="text-sm text-gray-700">${_e(r.studentKelas) || '\u2014'}</div>
                        <div class="text-[10px] text-gray-400">${r.ruangNama || r.paketNama || ''}</div>
                    </td>
                    <td class="px-4 py-3 text-center">${violBadge}</td>
                    <td class="px-4 py-3 text-center">
                        <span class="px-2.5 py-1 rounded-full text-xs font-bold ${statusColor}">${statusText}</span>
                    </td>
                    <td class="px-4 py-3 max-w-xs min-w-[220px]"><div class="space-y-0">${logHtml}</div></td>
                    <td class="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        <div>${startStr}</div>
                        <div class="text-gray-400">\u2192 ${endStr}</div>
                    </td>
                    <td class="px-4 py-3 text-center">${nilaiStr}</td>
                    <td class="px-4 py-3 text-center min-w-[140px]">${appealCell}</td>
                </tr>`;
            }).join('');

            // ── Render pagination bar ──
            if (pBar) {
                if (showAll || totalPages <= 1) {
                    pBar.classList.add('hidden');
                } else {
                    pBar.classList.remove('hidden');
                    if (pInfo) pInfo.textContent = `Menampilkan ${start + 1}\u2013${end} dari ${total} data`;

                    if (pBtns) {
                        const bBase    = 'w-8 h-8 rounded-lg text-xs font-bold transition-colors flex items-center justify-center';
                        const bActive  = bBase + ' bg-red-600 text-white shadow-sm';
                        const bInact   = bBase + ' bg-white border border-gray-200 text-gray-600 hover:bg-gray-50';
                        const bDisable = bBase + ' bg-gray-100 text-gray-300 cursor-not-allowed';

                        let html = '';
                        html += curPage > 1
                            ? `<button onclick="window.goLogPage(${curPage-1})" class="${bInact}"><i data-lucide="chevron-left" class="w-3 h-3"></i></button>`
                            : `<button disabled class="${bDisable}"><i data-lucide="chevron-left" class="w-3 h-3"></i></button>`;

                        const makeBtn = p => p === curPage
                            ? `<button class="${bActive}">${p}</button>`
                            : `<button onclick="window.goLogPage(${p})" class="${bInact}">${p}</button>`;

                        if (totalPages <= 7) {
                            for (let p = 1; p <= totalPages; p++) html += makeBtn(p);
                        } else {
                            html += makeBtn(1);
                            if (curPage > 3) html += `<span class="text-gray-400 text-xs px-1">\u2026</span>`;
                            const lo = Math.max(2, curPage - 1);
                            const hi = Math.min(totalPages - 1, curPage + 1);
                            for (let p = lo; p <= hi; p++) html += makeBtn(p);
                            if (curPage < totalPages - 2) html += `<span class="text-gray-400 text-xs px-1">\u2026</span>`;
                            html += makeBtn(totalPages);
                        }

                        html += curPage < totalPages
                            ? `<button onclick="window.goLogPage(${curPage+1})" class="${bInact}"><i data-lucide="chevron-right" class="w-3 h-3"></i></button>`
                            : `<button disabled class="${bDisable}"><i data-lucide="chevron-right" class="w-3 h-3"></i></button>`;

                        pBtns.innerHTML = html;
                    }
                }
            }

            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // Fetch Firebase + proses filter/sort → simpan ke state → render tabel
        window.renderLogAnomal = async function() {
            const tbody = document.getElementById('log-anomal-tbody');
            if (!tbody) return;

            tbody.innerHTML = `<tr><td colspan="7" class="text-center py-16 text-gray-400">
                <div class="flex flex-col items-center gap-3">
                    <div class="w-8 h-8 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                    <p class="text-sm font-medium">Memuat data anomali dari Firebase...</p>
                </div></td></tr>`;

            ['log-stat-total','log-stat-students','log-stat-dq','log-stat-warning','log-stat-clean','log-stat-appeal'].forEach(id => {
                const el = document.getElementById(id); if (el) el.textContent = '...';
            });

            if (!window.isFirebaseReady || !window.db) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center py-10 text-red-400 font-medium">
                    \u26a0\ufe0f Firebase belum siap. Tunggu koneksi atau refresh halaman.</td></tr>`;
                return;
            }

            try {
                const snap = await window.getDocs(
                    window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                );
                let rows = [];
                snap.forEach(d => rows.push({ id: d.id, ...d.data() }));

                // Update badge & banner notifikasi banding
                window.updateAppealNotifications(rows);

                // Isi dropdown kelas
                const sel = document.getElementById('filter-log-kelas');
                if (sel) {
                    const kelasSet   = [...new Set(rows.map(r => r.studentKelas).filter(Boolean))].sort();
                    const currentVal = sel.value;
                    while (sel.options.length > 1) sel.remove(1);
                    kelasSet.forEach(k => {
                        const o = document.createElement('option');
                        o.value = k; o.textContent = k;
                        if (k === currentVal) o.selected = true;
                        sel.appendChild(o);
                    });
                }

                // Statistik global (sebelum filter)
                const setEl = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
                setEl('log-stat-total',    rows.reduce((s,r) => s+(r.violations||0), 0));
                setEl('log-stat-students', rows.length);
                setEl('log-stat-dq',       rows.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length);
                setEl('log-stat-warning',  rows.filter(r => (r.violations||0)>=1 && (r.violations||0)<=2 && !(r.status||'').includes('DISKUALIFIKASI')).length);
                setEl('log-stat-clean',    rows.filter(r => (r.violations||0)===0).length);
                const appealEl = document.getElementById('log-stat-appeal');
                if (appealEl) appealEl.textContent = rows.filter(r => r.appealStatus === 'pending').length;

                // Distribusi jenis anomali
                const anomaliTypes = {};
                rows.forEach(r => (r.violationLogs||[]).forEach(l => {
                    const msg = l.message || '';
                    let cat = 'Lainnya';
                    if (/tab|meninggalkan/i.test(msg))           cat = '\ud83d\udd00 Pindah Tab / Minimize';
                    else if (/fullscreen|layar penuh/i.test(msg)) cat = '\u26f6 Keluar Fullscreen';
                    else if (/mengambang|notifikasi/i.test(msg))  cat = '\ud83d\udcf1 Interaksi di Luar Layar';
                    else if (/incognito|private/i.test(msg))      cat = '\ud83d\udd76\ufe0f Mode Incognito';
                    anomaliTypes[cat] = (anomaliTypes[cat]||0) + 1;
                }));
                const chartEl = document.getElementById('log-anomali-chart');
                if (chartEl) {
                    const maxVal = Math.max(...Object.values(anomaliTypes), 1);
                    chartEl.innerHTML = Object.keys(anomaliTypes).length === 0
                        ? '<p class="text-xs text-green-600 font-medium">\u2705 Tidak ada anomali terdeteksi.</p>'
                        : Object.entries(anomaliTypes).sort((a,b)=>b[1]-a[1]).map(([label,count]) => {
                            const pct   = Math.round((count/maxVal)*100);
                            const color = label.includes('Tab') ? '#ef4444' : label.includes('Full') ? '#f97316' : label.includes('Luar') ? '#a855f7' : '#64748b';
                            return `<div class="flex items-center gap-3">
                                <span class="text-xs text-gray-600 w-52 shrink-0 font-medium">${label}</span>
                                <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2" style="width:${pct}%;background:${color}">
                                        <span class="text-[9px] text-white font-black">${count}\u00d7</span>
                                    </div>
                                </div>
                                <span class="text-xs font-black text-gray-700 w-8 text-right">${count}</span>
                            </div>`;
                        }).join('');
                }

                // Filter
                const filterKelas  = document.getElementById('filter-log-kelas')?.value  || '';
                const filterStatus = document.getElementById('filter-log-status')?.value || '';
                const sortBy       = document.getElementById('filter-log-sort')?.value   || 'viol-desc';
                let filtered = [...rows];
                if (filterKelas)  filtered = filtered.filter(r => r.studentKelas === filterKelas);
                if (filterStatus === 'dq')              filtered = filtered.filter(r => (r.status||'').includes('DISKUALIFIKASI') || r.status === 'PERLU VERIFIKASI GURU');
                if (filterStatus === 'warning')         filtered = filtered.filter(r => (r.violations||0)>=1 && (r.violations||0)<=2 && !(r.status||'').includes('DISKUALIFIKASI') && r.status !== 'PERLU VERIFIKASI GURU');
                if (filterStatus === 'clean')           filtered = filtered.filter(r => (r.violations||0)===0);
                if (filterStatus === 'appeal')          filtered = filtered.filter(r => (r.appealStatus||'none') === 'pending');
                if (filterStatus === 'appeal-approved') filtered = filtered.filter(r => r.appealStatus === 'approved');
                if (filterStatus === 'appeal-rejected') filtered = filtered.filter(r => r.appealStatus === 'rejected');

                // Sort
                if (sortBy === 'viol-desc') filtered.sort((a,b) => (b.violations||0)-(a.violations||0));
                if (sortBy === 'viol-asc')  filtered.sort((a,b) => (a.violations||0)-(b.violations||0));
                if (sortBy === 'name-asc')  filtered.sort((a,b) => (a.studentName||'').localeCompare(b.studentName||''));
                if (sortBy === 'time-desc') filtered.sort((a,b) => (b.startTime||0)-(a.startTime||0));

                // Simpan ke state & render
                window._logAnomalState.data = filtered;
                window._logAnomalState.page = 1;

                const updEl = document.getElementById('log-last-updated');
                if (updEl) updEl.textContent = 'Diperbarui: ' + new Date().toLocaleTimeString('id-ID');

                window._renderLogTable();

            } catch(err) {
                console.error('[LogAnomal]', err);
                document.getElementById('log-anomal-tbody').innerHTML = `
                    <tr><td colspan="7" class="text-center py-10">
                        <p class="text-red-500 font-medium">\u26a0\ufe0f Gagal memuat data</p>
                        <p class="text-xs text-gray-400 mt-1">${err.message}</p>
                        <button onclick="window.renderLogAnomal()" class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Coba Lagi</button>
                    </td></tr>`;
            }
        };

        // APPEAL SYSTEM
        window.submitAppeal = async function() {
            const noteEl = document.getElementById('appeal-text');
            const note = noteEl ? noteEl.value.trim() : '';
            if (!note) { alert('Harap isi alasan bandingmu terlebih dahulu.'); return; }
            const docId = window.currentExamDocId;
            if (!docId || !window.isFirebaseReady || !window.db) {
                alert('Tidak dapat mengirim banding: koneksi atau data ujian tidak ditemukan.');
                return;
            }
            const btn = document.getElementById('appeal-submit-btn');
            if (btn) { btn.disabled = true; btn.textContent = 'Mengirim...'; }
            try {
                await window.updateDoc(
                    window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', docId),
                    { appealStatus: 'pending', appealNote: note, appealAt: Date.now() }
                );
                // Gunakan _renderAppealUI agar konsisten dengan state lainnya
                if (typeof window._renderAppealUI === 'function') {
                    window._renderAppealUI('pending');
                } else {
                    const section = document.getElementById('appeal-section');
                    if (section) section.innerHTML = `<div class="rounded-2xl border-2 border-blue-300 bg-blue-50 p-4 text-center"><p class="text-sm font-bold text-blue-700">⏳ Banding sedang ditinjau guru...</p></div>`;
                }
            } catch(err) {
                if (btn) { btn.disabled = false; btn.textContent = 'Kirim Banding ke Guru'; }
                alert('Gagal mengirim banding: ' + err.message);
            }
        };

        window.approveAppeal = async function(docId) {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            const guruNote = prompt('Catatan keputusan untuk siswa (opsional):') ?? '';
            const guruNama = window.currentAdminUser || window.currentPengawasName || (window.currentPengawasRuang && window.currentPengawasRuang.nama) || 'Guru';
            try {
                // Ambil data siswa dulu untuk ditampilkan di SOP
                let siswaName = '', siswaNisn = '', siswaKelas = '', siswaViols = 0, siswaStatus = '';
                try {
                    const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                    snap.forEach(ds => {
                        if (ds.id === docId) {
                            const d = ds.data();
                            siswaName  = d.studentName  || '';
                            siswaNisn  = d.studentNisn  || '';
                            siswaKelas = d.studentKelas || '';
                            siswaViols = d.violations   || 0;
                            siswaStatus = d.status      || '';
                        }
                    });
                } catch(e) {}

                await window.updateDoc(
                    window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', docId),
                    { appealStatus: 'approved', status: 'SELESAI (Banding Diterima)', guruNote, guruReviewer: guruNama, reviewedAt: Date.now() }
                );

                // ★ Tampilkan SOP panel tindak lanjut untuk pengawas
                const sopPanel  = document.getElementById('pengawas-appeal-approved-sop');
                const sopInfo   = document.getElementById('sop-approved-siswa-info');
                const sopSub    = document.getElementById('sop-approved-subtitle');
                const wasDQ     = siswaStatus.includes('DISKUALIFIKASI') || siswaStatus.includes('PERLU VERIFIKASI') || siswaViols >= 3;

                if (sopInfo) {
                    sopInfo.innerHTML = `
                        <div class="flex flex-wrap gap-x-4 gap-y-1">
                            <span>👤 <strong>${_e(siswaName) || '—'}</strong></span>
                            <span>🎓 ${_e(siswaKelas) || '—'}</span>
                            <span>🪪 NISN: <strong class="text-green-700 select-all">${_e(siswaNisn) || '—'}</strong></span>
                            <span>⚠️ ${siswaViols}× pelanggaran</span>
                        </div>
                        ${wasDQ ? '<div class="mt-2 px-2 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-[10px] font-bold">⚠️ Siswa ini DQ/terhenti di tengah ujian — wajib Unlock Device agar bisa mengerjakan ulang.</div>' : '<div class="mt-2 px-2 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-[10px]">ℹ️ Siswa ini sudah menyelesaikan ujian — Unlock Device opsional, atau Admin bisa isi nilai manual jika diperlukan.</div>'}
                    `;
                }
                if (sopSub) sopSub.textContent = wasDQ
                    ? 'Siswa DQ di tengah ujian — ikuti langkah berikut'
                    : 'Banding diterima — tindak lanjut sesuai kondisi';
                if (sopPanel) sopPanel.classList.remove('hidden');

                // Tampilkan langkah yang sesuai kondisi
                const dqSteps    = document.getElementById('sop-dq-steps');
                const nonDqSteps = document.getElementById('sop-nondq-steps');
                if (dqSteps)    dqSteps.classList.toggle('hidden', !wasDQ);
                if (nonDqSteps) nonDqSteps.classList.toggle('hidden', wasDQ);

                if (window.currentPengawasRuang) {
                    window.loadPengawasAppealList();
                } else {
                    window.renderLogAnomal();
                }
            } catch(err) { alert('Gagal: ' + err.message); }
        };

        window.rejectAppeal = async function(docId) {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            const guruNote = prompt('Alasan penolakan untuk siswa (wajib diisi):');
            if (!guruNote || !guruNote.trim()) { alert('Harap isi alasan penolakan.'); return; }
            const guruNama = window.currentAdminUser || window.currentPengawasName || (window.currentPengawasRuang && window.currentPengawasRuang.nama) || 'Guru';
            try {
                await window.updateDoc(
                    window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', docId),
                    { appealStatus: 'rejected', status: 'DISKUALIFIKASI (Banding Ditolak)', guruNote: guruNote.trim(), guruReviewer: guruNama, reviewedAt: Date.now() }
                );
                alert('\u274c Banding ditolak. Status siswa dikonfirmasi Diskualifikasi.');
                if (window.currentPengawasRuang) {
                    // pengawas: refresh widget saja
                } else {
                    window.renderLogAnomal();
                }
            } catch(err) { alert('Gagal: ' + err.message); }
        };
        // Load banding untuk pengawas per ruang
        window.loadPengawasAppealList = async function() {
            const list   = document.getElementById('pengawas-appeal-list');
            const sub    = document.getElementById('pengawas-appeal-subtitle');
            if (!list) return;

            // Sembunyikan notif banding jika fitur dinonaktifkan admin
            if (window.appealEnabled === false) {
                const notif = document.getElementById('pengawas-banding-notif');
                if (notif) notif.classList.add('hidden');
                return;
            }

            if (!window.isFirebaseReady || !window.db) {
                if (sub) sub.textContent = 'Menunggu koneksi...';
                if (list) list.innerHTML = '<p class="text-xs text-amber-400 italic animate-pulse">Menunggu Firebase siap...</p>';
                // Coba lagi setelah 3 detik
                setTimeout(() => { if (window.loadPengawasAppealList) window.loadPengawasAppealList(); }, 3000);
                return;
            }

            try {
                list.innerHTML = '<p class="text-xs text-amber-500 italic animate-pulse">Memuat...</p>';
                const snap = await window.getDocs(
                    window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                );
                let rows = [];
                snap.forEach(d => rows.push({ id: d.id, ...d.data() }));

                // Filter hanya ruang pengawas ini + ada banding pending
                const ruangNama = window.currentPengawasRuang ? (window.currentPengawasRuang.nama || '').toLowerCase() : null;
                const appeals = rows.filter(r => {
                    const inRuang = !ruangNama || (r.ruangUjian || '').toLowerCase() === ruangNama || (r.ruangNama || '').toLowerCase() === ruangNama;
                    return inRuang && r.appealStatus === 'pending';
                });

                // Update badge & notif monitoring
                if (window.updateAppealNotifications) window.updateAppealNotifications(rows);

                // Update subtitle
                if (sub) sub.textContent = appeals.length === 0
                    ? 'Tidak ada banding pending di ruang ini.'
                    : `${appeals.length} siswa menunggu keputusanmu.`;

                if (appeals.length === 0) {
                    list.innerHTML = '<p class="text-xs text-green-600 font-medium text-center py-2">&#x2705; Tidak ada banding pending.</p>';
                    return;
                }

                // Render list
                list.innerHTML = appeals.map(r => {
                    const noteShort = r.appealNote ? r.appealNote.substring(0, 100) + (r.appealNote.length > 100 ? '\u2026' : '') : '(tidak ada catatan)';
                    const viol = r.violations || 0;
                    return `<div class="bg-white rounded-xl border border-amber-200 p-3 shadow-sm">
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${_e(r.studentName) || '\u2014'}</p>
                                <p class="text-[10px] text-gray-400">${_e(r.studentKelas) || ''} &bull; ${_e(r.studentNisn) || ''}</p>
                            </div>
                            <span class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">
                                ${viol}\u00d7 pelanggaran
                            </span>
                        </div>
                        <p class="text-xs text-gray-600 bg-amber-50 rounded-lg p-2 mb-3 italic">"${noteShort}"</p>
                        <div class="flex gap-2">
                            <button onclick="window.approveAppeal('${r.id}').then(() => window.loadPengawasAppealList())"
                                class="flex-1 bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-bold py-1.5 rounded-lg transition-all">
                                &#x2705; Ampuni
                            </button>
                            <button onclick="window.rejectAppeal('${r.id}').then(() => window.loadPengawasAppealList())"
                                class="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-bold py-1.5 rounded-lg transition-all">
                                &#x274c; Tolak
                            </button>
                        </div>
                    </div>`;
                }).join('');

            } catch(err) {
                if (list) list.innerHTML = `<p class="text-xs text-red-400">Gagal memuat: ${err.message}</p>`;
            }
        };

        // Update badge & banner notifikasi banding pending
        window.updateAppealNotifications = function(rows) {
            // Jika fitur banding dinonaktifkan, sembunyikan semua notifikasi
            if (window.appealEnabled === false) {
                const badge = document.getElementById('appeal-badge-tab');
                if (badge) badge.classList.add('hidden');
                const bandingBadge = document.getElementById('banding-badge-tab');
                if (bandingBadge) bandingBadge.classList.add('hidden');
                const mobBandingBadge = document.getElementById('mob-banding-badge');
                if (mobBandingBadge) mobBandingBadge.classList.add('hidden');
                const banner = document.getElementById('appeal-alert-banner');
                if (banner) banner.classList.add('hidden');
                return;
            }

            const pendingCount = (rows || []).filter(r => r.appealStatus === 'pending').length;

            // -- Tab badge Log Anomali (existing) --
            const badge = document.getElementById('appeal-badge-tab');
            if (badge) {
                if (pendingCount > 0) {
                    badge.textContent = pendingCount > 99 ? '99+' : pendingCount;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }

            // -- Tab badge Banding (new) --
            const bandingBadge = document.getElementById('banding-badge-tab');
            const mobBandingBadge = document.getElementById('mob-banding-badge');
            if (bandingBadge) {
                if (pendingCount > 0) {
                    bandingBadge.textContent = pendingCount > 99 ? '99+' : pendingCount;
                    bandingBadge.classList.remove('hidden');
                } else {
                    bandingBadge.classList.add('hidden');
                }
            }
            if (mobBandingBadge) {
                if (pendingCount > 0) {
                    mobBandingBadge.textContent = pendingCount > 99 ? '99+' : pendingCount;
                    mobBandingBadge.classList.remove('hidden');
                } else {
                    mobBandingBadge.classList.add('hidden');
                }
            }

            // -- Notif kecil di panel monitoring (pengawas) --
            const bandingNotif = document.getElementById('pengawas-banding-notif');
            const bandingNotifCount = document.getElementById('pengawas-banding-notif-count');
            if (bandingNotif) {
                if (pendingCount > 0 && window.currentPengawasRuang) {
                    if (bandingNotifCount) bandingNotifCount.textContent =
                        pendingCount === 1 ? '1 siswa menunggu' : `${pendingCount} siswa menunggu`;
                    bandingNotif.classList.remove('hidden');
                } else {
                    bandingNotif.classList.add('hidden');
                }
            }

            // -- Dashboard banner --
            const banner = document.getElementById('appeal-alert-banner');
            const bannerText = document.getElementById('appeal-banner-text');
            if (banner) {
                if (pendingCount > 0) {
                    if (bannerText) bannerText.textContent =
                        pendingCount === 1
                            ? '1 siswa sedang menunggu keputusan banding kamu.'
                            : `${pendingCount} siswa sedang menunggu keputusan banding kamu.`;
                    banner.classList.remove('hidden');
                } else {
                    banner.classList.add('hidden');
                }
            }

            // -- Update stat cards di panel banding admin --
            if (rows) {
                const approved = rows.filter(r => r.appealStatus === 'approved').length;
                const rejected = rows.filter(r => r.appealStatus === 'rejected').length;
                const total    = rows.filter(r => r.appealStatus && r.appealStatus !== 'none').length;
                const elP = document.getElementById('banding-stat-pending');
                const elA = document.getElementById('banding-stat-approved');
                const elR = document.getElementById('banding-stat-rejected');
                const elT = document.getElementById('banding-stat-total');
                if (elP) elP.textContent = pendingCount;
                if (elA) elA.textContent = approved;
                if (elR) elR.textContent = rejected;
                if (elT) elT.textContent = total;
            }
        };

        // ── Load & Render tabel banding untuk Admin ──
        window._bandingAdminData = [];

        window.loadBandingAdminList = async function() {
            const container = document.getElementById('banding-admin-list-container');
            if (!container) return;
            if (!window.isFirebaseReady || !window.db) {
                container.innerHTML = `<div class="px-6 py-10 text-center text-gray-400"><p class="font-medium">Firebase belum siap. Coba refresh halaman.</p></div>`;
                return;
            }
            container.innerHTML = `<div class="px-6 py-10 text-center text-gray-400"><i data-lucide="loader-2" class="w-8 h-8 mx-auto mb-2 animate-spin text-amber-400"></i><p class="font-medium">Memuat data banding...</p></div>`;
            if(typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
            try {
                const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results'));
                const rows = [];
                snap.forEach(d => { const r = {id: d.id, ...d.data()}; if (r.appealStatus && r.appealStatus !== 'none') rows.push(r); });
                window._bandingAdminData = rows;
                window.updateAppealNotifications(snap.docs.map(d => d.data()));
                // Isi filter ruang
                const filterRuang = document.getElementById('banding-filter-ruang');
                if (filterRuang) {
                    const ruangSet = [...new Set(rows.map(r => r.ruangName || r.roomName || '').filter(Boolean))].sort();
                    filterRuang.innerHTML = '<option value="all">Semua Ruang</option>' + ruangSet.map(r => `<option value="${_e(r)}">${_e(r)}</option>`).join('');
                }
                window.renderBandingAdminList();
            } catch(err) {
                container.innerHTML = `<div class="px-6 py-10 text-center text-red-400"><p class="font-medium">Gagal memuat: ${_e(err.message)}</p></div>`;
            }
        };

        window.renderBandingAdminList = function() {
            const container = document.getElementById('banding-admin-list-container');
            if (!container) return;
            let rows = window._bandingAdminData || [];
            const fStatus = (document.getElementById('banding-filter-status') || {}).value || 'all';
            const fRuang  = (document.getElementById('banding-filter-ruang')  || {}).value || 'all';
            if (fStatus !== 'all') rows = rows.filter(r => r.appealStatus === fStatus);
            if (fRuang  !== 'all') rows = rows.filter(r => (r.ruangName || r.roomName || '') === fRuang);
            rows.sort((a,b) => (b.appealAt || b.submittedAt || 0) - (a.appealAt || a.submittedAt || 0));
            if (!rows.length) {
                container.innerHTML = `<div class="px-6 py-12 text-center text-gray-400"><i data-lucide="inbox" class="w-10 h-10 mx-auto text-gray-200 mb-3"></i><p class="font-semibold">Tidak ada data banding</p></div>`;
                if(typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
                return;
            }
            const statusBadge = (s) => {
                if (s === 'pending')  return `<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 animate-pulse">⏳ Menunggu</span>`;
                if (s === 'approved') return `<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">✅ Diterima</span>`;
                if (s === 'rejected') return `<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">❌ Ditolak</span>`;
                return `<span class="text-[10px] text-gray-400">${_e(s)}</span>`;
            };
            const rows_html = rows.map(r => {
                const waktu = r.appealAt ? new Date(r.appealAt).toLocaleString('id-ID', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
                const reviewTime = r.reviewedAt ? new Date(r.reviewedAt).toLocaleString('id-ID', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '—';
                return `<tr class="border-b border-gray-100 hover:bg-amber-50 transition-colors">
                    <td class="px-4 py-3">
                        <p class="font-bold text-gray-800 text-sm">${_e(r.studentName || '—')}</p>
                        <p class="text-xs text-gray-400">${_e(r.studentNisn || '—')} · ${_e(r.className || '—')}</p>
                    </td>
                    <td class="px-4 py-3 text-xs text-gray-600">${_e(r.ruangName || r.roomName || '—')}</td>
                    <td class="px-4 py-3 text-xs text-gray-600 max-w-[200px]">
                        <p class="line-clamp-2">${_e(r.appealReason || '—')}</p>
                    </td>
                    <td class="px-4 py-3 text-center">${statusBadge(r.appealStatus)}</td>
                    <td class="px-4 py-3 text-xs text-gray-400">${waktu}</td>
                    <td class="px-4 py-3 text-xs text-gray-500">
                        ${r.guruReviewer ? `<p class="font-medium">${_e(r.guruReviewer)}</p><p class="text-gray-400">${reviewTime}</p>` : '<span class="text-gray-300">Belum ditinjau</span>'}
                    </td>
                </tr>`;
            }).join('');
            container.innerHTML = `<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-amber-600 text-white text-[11px] uppercase tracking-wider">
                <th class="px-4 py-3 text-left font-bold">Siswa</th>
                <th class="px-4 py-3 text-left font-bold">Ruang</th>
                <th class="px-4 py-3 text-left font-bold">Alasan Banding</th>
                <th class="px-4 py-3 text-center font-bold">Status</th>
                <th class="px-4 py-3 text-left font-bold">Waktu Ajuan</th>
                <th class="px-4 py-3 text-left font-bold">Reviewer</th>
            </tr></thead><tbody class="divide-y divide-gray-100">${rows_html}</tbody></table></div>`;
            if(typeof lucide !== 'undefined') window._createIconsSafe && window._createIconsSafe();
        };
        // ═══════════════════════════════════════════════════════
        // DATA & BACKUP — Reset Collections + Firebase Config
        // ═══════════════════════════════════════════════════════

        // Konstanta koleksi yang bisa di-reset
        const _RESET_COLLECTIONS = ['exam_results','questions','exam_packets','students','kelas','ruang','jadwal','app_settings'];

        // Hapus semua dokumen dalam satu koleksi
        window.resetCollection = async function(colName, label) {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            const confirmed = confirm(`⚠️ HAPUS SEMUA DATA "${label}"?\n\nKoleksi: ${colName}\n\nTindakan ini TIDAK BISA dibatalkan!`);
            if (!confirmed) return;
            const confirmText = prompt(`Ketik "HAPUS" untuk konfirmasi:`);
            if (confirmText !== 'HAPUS') { alert('Dibatalkan — teks konfirmasi tidak sesuai.'); return; }
            try {
                const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', colName));
                if (snap.empty) { alert(`ℹ️ Koleksi "${label}" sudah kosong.`); return; }
                let count = 0;
                const batchSize = 20;
                const docs = [];
                snap.forEach(d => docs.push(d.ref));
                // Hapus batch per batch
                for (let i = 0; i < docs.length; i += batchSize) {
                    await Promise.all(docs.slice(i, i + batchSize).map(ref => window.deleteDoc(ref)));
                    count += Math.min(batchSize, docs.length - i);
                }
                alert(`✅ Berhasil menghapus ${count} dokumen dari "${label}".`);
                // Refresh UI jika relevan
                if (colName === 'exam_results' && window.setupRealtimeListener) window.setupRealtimeListener();
                if (colName === 'questions' && window.filterQuestionBank) window.filterQuestionBank();
                if (colName === 'exam_packets' && window.renderPaketGrid) window.renderPaketGrid();
                if (colName === 'students' && window.renderSiswaTable) window.renderSiswaTable();
                if (colName === 'kelas' && window.renderKelasList) window.renderKelasList();
                if (colName === 'ruang' && window.renderRuangList) window.renderRuangList();
                if (colName === 'jadwal' && window.renderJadwalList) window.renderJadwalList();
            } catch(err) { alert('Gagal reset: ' + err.message); }
        };

        // Reset SEMUA koleksi sekaligus
        window.resetAllCollections = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            const confirmed = confirm('🔴 RESET SEMUA DATA?\n\nIni akan menghapus:\n• Hasil ujian\n• Bank soal\n• Paket soal\n• Database siswa\n• Kelas & Ruang\n• Jadwal\n• Pengaturan sistem\n\nTindakan ini TIDAK BISA dibatalkan!');
            if (!confirmed) return;
            const confirmText = prompt('Ketik "RESET SEMUA" untuk konfirmasi akhir:');
            if (confirmText !== 'RESET SEMUA') { alert('Dibatalkan.'); return; }
            let totalDeleted = 0;
            for (const col of _RESET_COLLECTIONS) {
                try {
                    const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', col));
                    const docs = [];
                    snap.forEach(d => docs.push(d.ref));
                    for (let i = 0; i < docs.length; i += 20) {
                        await Promise.all(docs.slice(i, i + 20).map(ref => window.deleteDoc(ref)));
                    }
                    totalDeleted += docs.length;
                } catch(e) { console.warn('Gagal reset koleksi', col, e); }
            }
            alert(`✅ Reset selesai! Total ${totalDeleted} dokumen dihapus dari semua koleksi.\n\nHalaman akan di-refresh.`);
            setTimeout(() => location.reload(), 1500);
        };

        // Muat panel Data & Backup — tampilkan config aktif
        window.loadDataBackupPanel = function() {
            const el = document.getElementById('fb-config-active-text');
            if (!el) return;
            // Cek apakah ada custom config di localStorage
            try {
                const saved = localStorage.getItem('integritest_firebase_config');
                if (saved) {
                    const cfg = JSON.parse(saved);
                    el.textContent = `Custom: ${cfg.projectId || '?'} (dari localStorage)`;
                } else {
                    // Tampilkan config default dari kode
                    el.textContent = `Default: waliq-ded98 (hardcoded)`;
                }
            } catch(e) {
                el.textContent = 'Default (hardcoded)';
            }
            // Pre-fill textarea dengan config tersimpan jika ada
            const textarea = document.getElementById('fb-config-input');
            const appIdInput = document.getElementById('fb-appid-input');
            if (textarea) {
                try {
                    const saved = localStorage.getItem('integritest_firebase_config');
                    if (saved) textarea.value = JSON.stringify(JSON.parse(saved), null, 2);
                } catch(e) {}
            }
            if (appIdInput) {
                try {
                    const savedId = localStorage.getItem('integritest_custom_appid');
                    if (savedId) appIdInput.value = savedId;
                } catch(e) {}
            }
            if (typeof lucide !== 'undefined') window._createIconsSafe();
        };

        // Simpan Firebase config baru ke localStorage, lalu reload
        window.saveFirebaseConfig = function() {
            const raw = (document.getElementById('fb-config-input')?.value || '').trim();
            const newAppId = (document.getElementById('fb-appid-input')?.value || '').trim();
            if (!raw) { alert('Config JSON tidak boleh kosong.'); return; }
            let parsed;
            try {
                // Support format "const firebaseConfig = {...}" dan format JSON murni
                const jsonStr = raw.replace(/^\s*(const|var|let)\s+\w+\s*=\s*/, '').replace(/;\s*$/, '');
                parsed = JSON.parse(jsonStr);
            } catch(e) {
                alert('❌ Format JSON tidak valid!\n\nPastikan kamu paste seluruh object config dari Firebase Console.\n\nError: ' + e.message);
                return;
            }
            // Validasi field wajib
            const required = ['apiKey','authDomain','projectId','appId'];
            const missing = required.filter(k => !parsed[k]);
            if (missing.length) {
                alert('❌ Config tidak lengkap!\nField wajib yang hilang: ' + missing.join(', '));
                return;
            }
            const ok = confirm(`Simpan config Firebase baru?\n\nProject: ${parsed.projectId}\nAuth Domain: ${parsed.authDomain}\n\nHalaman akan di-reload setelah disimpan.`);
            if (!ok) return;
            try {
                localStorage.setItem('integritest_firebase_config', JSON.stringify(parsed));
                if (newAppId) localStorage.setItem('integritest_custom_appid', newAppId.toLowerCase().replace(/\s+/g,'_'));
                else localStorage.removeItem('integritest_custom_appid');
                alert('✅ Config disimpan! Halaman akan di-reload...');
                setTimeout(() => location.reload(), 800);
            } catch(e) {
                alert('Gagal menyimpan ke localStorage: ' + e.message);
            }
        };

        // Kembalikan ke config default (hapus override)
        window.resetFirebaseConfig = function() {
            const ok = confirm('Kembalikan ke Firebase config default (hardcoded)?\n\nHalaman akan di-reload.');
            if (!ok) return;
            localStorage.removeItem('integritest_firebase_config');
            localStorage.removeItem('integritest_custom_appid');
            alert('✅ Config dikembalikan ke default. Halaman akan di-reload...');
            setTimeout(() => location.reload(), 800);
        };

        // ════════════════════════════════════════════════════════════
        // ★ EXPORT BACKUP JSON
        // Fetch semua koleksi yang dicentang → bundle → download .json
        // ════════════════════════════════════════════════════════════
        window.exportBackupJSON = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }

            const COLL_MAP = {
                'bkp-chk-results':   'exam_results',
                'bkp-chk-questions': 'questions',
                'bkp-chk-packets':   'exam_packets',
                'bkp-chk-students':  'students',
                'bkp-chk-kelas':     'kelas',
                'bkp-chk-ruang':     'ruang',
                'bkp-chk-jadwal':    'jadwal',
                'bkp-chk-settings':  'app_settings',
            };

            const selected = Object.entries(COLL_MAP)
                .filter(([chkId]) => document.getElementById(chkId)?.checked)
                .map(([, col]) => col);

            if (selected.length === 0) { alert('Pilih minimal satu koleksi untuk di-backup.'); return; }

            const btn    = document.getElementById('btn-export-backup');
            const status = document.getElementById('bkp-export-status');
            btn.disabled = true;
            btn.innerHTML = '<svg class="animate-spin w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Mengambil data...';

            const backup = {
                _meta: {
                    app:         'INTEGRITEST',
                    version:     '1.0',
                    appId:       window.appId || 'unknown',
                    exportedAt:  new Date().toISOString(),
                    exportedBy:  window.currentUserRole || 'admin',
                    collections: selected,
                },
                data: {}
            };

            let totalDocs = 0;
            for (const col of selected) {
                try {
                    status.textContent = 'Mengambil ' + col + '...';
                    const snap = await window.getDocs(
                        window.collection(window.db, 'artifacts', window.appId, 'public', 'data', col)
                    );
                    backup.data[col] = {};
                    snap.forEach(d => { backup.data[col][d.id] = d.data(); totalDocs++; });
                } catch(e) {
                    console.warn('[Backup] Gagal fetch koleksi', col, e);
                    backup.data[col] = { _error: e.message };
                }
            }

            const now      = new Date();
            const pad      = n => String(n).padStart(2,'0');
            const datePart = now.getFullYear() + pad(now.getMonth()+1) + pad(now.getDate());
            const timePart = pad(now.getHours()) + pad(now.getMinutes());
            const filename = 'integritest_backup_' + datePart + '_' + timePart + '.json';

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href = url; a.download = filename;
            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(url);

            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="download" class="w-4 h-4 inline mr-1"></i> Export Backup JSON';
            status.textContent = '✅ ' + totalDocs + ' dokumen dari ' + selected.length + ' koleksi berhasil di-export.';
            if (window._createIconsSafe) window._createIconsSafe();
            setTimeout(() => { status.textContent = ''; }, 6000);
        };

        // ════════════════════════════════════════════════════════════
        // ★ HANDLE FILE SELECTION / DROP
        // ════════════════════════════════════════════════════════════
        window._backupFileData = null;

        function _parseAndPreviewBackup(file) {
            const status  = document.getElementById('bkp-import-status');
            const preview = document.getElementById('bkp-preview');
            const opts    = document.getElementById('bkp-import-opts');
            const btnImp  = document.getElementById('btn-import-backup');
            status.textContent = 'Membaca file...';
            window._backupFileData = null;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (!parsed._meta || !parsed.data) {
                        throw new Error('File bukan backup INTEGRITEST yang valid (tidak ada _meta / data).');
                    }
                    let totalDocs = 0;
                    const cols = [];
                    for (const col of Object.keys(parsed.data)) {
                        const d = parsed.data[col];
                        if (d && typeof d === 'object' && !d._error) {
                            const cnt = Object.keys(d).length;
                            cols.push(col + ' (' + cnt + ')');
                            totalDocs += cnt;
                        }
                    }
                    document.getElementById('bkp-preview-filename').textContent = file.name;
                    document.getElementById('bkp-preview-date').textContent =
                        parsed._meta.exportedAt ? new Date(parsed._meta.exportedAt).toLocaleString('id-ID') : 'Tidak diketahui';
                    document.getElementById('bkp-preview-cols').textContent  = cols.join(', ') || '-';
                    document.getElementById('bkp-preview-count').textContent = totalDocs + ' dokumen';
                    preview.classList.remove('hidden');
                    opts.classList.remove('hidden');
                    btnImp.disabled = false;
                    status.textContent = '';
                    window._backupFileData = parsed;
                    if (window._createIconsSafe) window._createIconsSafe();
                } catch(err) {
                    preview.classList.add('hidden');
                    opts.classList.add('hidden');
                    btnImp.disabled = true;
                    status.textContent = '❌ ' + err.message;
                    window._backupFileData = null;
                }
            };
            reader.onerror = () => { status.textContent = '❌ Gagal membaca file.'; };
            reader.readAsText(file);
        }

        window._handleBackupFileSelect = function(input) {
            const file = input.files && input.files[0];
            if (!file) return;
            _parseAndPreviewBackup(file);
            input.value = '';
        };

        window._handleBackupFileDrop = function(event) {
            const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
            if (!file) return;
            if (!file.name.endsWith('.json') && file.type !== 'application/json') {
                alert('Hanya file .json yang diterima.'); return;
            }
            _parseAndPreviewBackup(file);
        };

        // ════════════════════════════════════════════════════════════
        // ★ IMPORT / RESTORE BACKUP JSON
        // ════════════════════════════════════════════════════════════
        window.importBackupJSON = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            if (!window._backupFileData)               { alert('Belum ada file backup yang dimuat.'); return; }

            const parsed = window._backupFileData;
            const mode   = (document.querySelector('input[name="bkp-mode"]:checked') || {}).value || 'merge';
            const cols   = Object.keys(parsed.data).filter(c => {
                const d = parsed.data[c];
                return d && typeof d === 'object' && !d._error && Object.keys(d).length > 0;
            });
            if (cols.length === 0) { alert('Tidak ada data valid untuk di-import.'); return; }

            const modeLabel = mode === 'replace'
                ? 'REPLACE (hapus dulu lalu tulis ulang)'
                : 'MERGE (tambah/timpa per dokumen)';
            const confirmed = confirm(
                'Import Backup?\n\nMode: ' + modeLabel +
                '\nKoleksi: ' + cols.join(', ') + '\n\n' +
                (mode === 'replace' ? '⚠️ Mode Replace akan MENGHAPUS semua data koleksi terpilih terlebih dahulu!\n\n' : '') +
                'Lanjutkan?'
            );
            if (!confirmed) return;

            const btn    = document.getElementById('btn-import-backup');
            const status = document.getElementById('bkp-import-status');
            btn.disabled = true;
            btn.innerHTML = '<svg class="animate-spin w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Mengimport...';

            let totalWritten = 0, totalErrors = 0;

            for (const col of cols) {
                const docs   = parsed.data[col];
                const docIds = Object.keys(docs);
                status.textContent = 'Memproses ' + col + ' (' + docIds.length + ' dok)...';

                // Mode Replace: hapus dulu koleksi lama
                if (mode === 'replace') {
                    try {
                        const snap = await window.getDocs(
                            window.collection(window.db, 'artifacts', window.appId, 'public', 'data', col)
                        );
                        const refs = [];
                        snap.forEach(d => refs.push(d.ref));
                        for (let i = 0; i < refs.length; i += 20) {
                            await Promise.all(refs.slice(i, i+20).map(r => window.deleteDoc(r)));
                        }
                    } catch(e) { console.warn('[Import] Gagal hapus koleksi lama', col, e); }
                }

                // Tulis dokumen dari backup
                for (let i = 0; i < docIds.length; i += 20) {
                    const chunk = docIds.slice(i, i+20);
                    await Promise.all(chunk.map(async docId => {
                        try {
                            const ref = window.doc(
                                window.db, 'artifacts', window.appId, 'public', 'data', col, docId
                            );
                            await window.setDoc(ref, docs[docId], { merge: mode === 'merge' });
                            totalWritten++;
                        } catch(e) {
                            console.warn('[Import] Gagal tulis', col, docId, e);
                            totalErrors++;
                        }
                    }));
                }
            }

            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="upload" class="w-4 h-4 inline mr-1"></i> Import &amp; Restore';

            const resultMsg = totalErrors > 0
                ? '✅ ' + totalWritten + ' dokumen berhasil, ⚠️ ' + totalErrors + ' gagal.'
                : '✅ ' + totalWritten + ' dokumen berhasil di-import dari ' + cols.length + ' koleksi.';
            status.textContent = resultMsg;
            alert(resultMsg + '\n\nData di UI akan segera diperbarui.');

            // Refresh UI relevan
            if (cols.includes('exam_results')  && window.setupRealtimeListener) window.setupRealtimeListener();
            if (cols.includes('questions')      && window.filterQuestionBank)   window.filterQuestionBank();
            if (cols.includes('exam_packets')   && window.renderPaketGrid)      window.renderPaketGrid();
            if (cols.includes('students')       && window.renderSiswaTable)     window.renderSiswaTable();
            if (cols.includes('kelas')          && window.renderKelasList)      window.renderKelasList();
            if (cols.includes('ruang')          && window.renderRuangList)      window.renderRuangList();
            if (cols.includes('jadwal')         && window.renderJadwalList)     window.renderJadwalList();
            if (window._createIconsSafe) window._createIconsSafe();
        };

        // END DATA & BACKUP

        // ════════════════════════════════════════════════════════════
        // FITUR KENDALA — Pengawas kirim laporan → Admin terima notif
        // ════════════════════════════════════════════════════════════

        // Buka modal kendala (dari tombol pengawas)
        window.openKendalaModal = function() {
            const modal = document.getElementById('modal-kendala');
            if (!modal) { console.error('[Kendala] modal-kendala tidak ditemukan!'); return; }
            // Pastikan modal ada di body langsung (hindari stacking context parent)
            if (modal.parentElement !== document.body) {
                document.body.appendChild(modal);
            }
            // Set label ruang
            const ruangLabel = document.getElementById('kendala-modal-ruang-label');
            if (ruangLabel) {
                const namaRuang = (window.currentPengawasRuang && window.currentPengawasRuang.nama) ? window.currentPengawasRuang.nama : 'Ruang tidak diketahui';
                ruangLabel.textContent = 'Ruang: ' + namaRuang;
            }
            // Reset form
            const jenisEl = document.getElementById('kendala-jenis');
            const ketEl   = document.getElementById('kendala-keterangan');
            const siswaEl = document.getElementById('kendala-siswa');
            if (jenisEl) jenisEl.value = '';
            if (ketEl)   ketEl.value   = '';
            if (siswaEl) siswaEl.value = '';
            const radios = document.querySelectorAll('input[name="kendala-urgensi"]');
            radios.forEach((r, i) => { r.checked = i === 0; });
            // Gunakan inline style agar tidak terpengaruh !important dari CSS lain
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            if (window._createIconsSafe) window._createIconsSafe();
        };

        window.closeKendalaModal = function() {
            const modal = document.getElementById('modal-kendala');
            if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
        };

        // Kirim laporan kendala ke Firestore
        window.kirimKendala = async function() {
            if (!window.isFirebaseReady || !window.db) return alert('Firebase belum siap.');
            const jenis    = (document.getElementById('kendala-jenis')?.value || '').trim();
            const ket      = (document.getElementById('kendala-keterangan')?.value || '').trim();
            const siswa    = (document.getElementById('kendala-siswa')?.value || '').trim();
            const urgensi  = document.querySelector('input[name="kendala-urgensi"]:checked')?.value || 'normal';

            if (!jenis) return alert('⚠️ Pilih jenis kendala terlebih dahulu!');

            const btn = document.getElementById('btn-kirim-kendala');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span class="animate-spin">⏳</span> Mengirim...'; }

            try {
                const namaRuang    = (window.currentPengawasRuang && window.currentPengawasRuang.nama) ? window.currentPengawasRuang.nama : '-';
                const namaPengawas = window.currentPengawasName || window.currentStaffName || 'Pengawas';

                const data = {
                    timestamp:    Date.now(),
                    jenis,
                    keterangan:   ket || '-',
                    siswaTerdampak: siswa || '-',
                    urgensi,
                    ruang:        namaRuang,
                    ruangId:      (window.currentPengawasRuang && window.currentPengawasRuang.id) ? window.currentPengawasRuang.id : '-',
                    pengawas:     namaPengawas,
                    status:       'open',   // open | resolved
                    balasanAdmin: '',
                    resolvedAt:   null,
                    resolvedBy:   ''
                };

                await window.addDoc(
                    window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian'),
                    data
                );

                window.closeKendalaModal();
                alert('✅ Laporan kendala berhasil dikirim ke Admin!\n\nAdmin akan segera menindaklanjuti.');

                // Refresh riwayat di widget pengawas dan di panel tab Kendala
                if (window.loadPengawasKendalaHistory) window.loadPengawasKendalaHistory();
                if (window.loadPengawasKendalaHistoryPanel) window.loadPengawasKendalaHistoryPanel();

            } catch(e) {
                alert('Gagal mengirim laporan: ' + e.message);
            } finally {
                if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Kirim Laporan'; if (window._createIconsSafe) window._createIconsSafe(); }
            }
        };

        // ══ TOGGLE VISIBILITY PASSWORD ══
        const _SVG_EYE = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`;
        const _SVG_EYE_OFF = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

        window.togglePassVis = function(inputId, btn) {
            const inp = document.getElementById(inputId);
            if (!inp) return;
            const willShow = inp.type === 'password';
            inp.type = willShow ? 'text' : 'password';
            // SVG langsung — tidak bergantung Lucide
            btn.innerHTML = willShow ? _SVG_EYE_OFF : _SVG_EYE;
            // Warna tombol: aktif (tampil) = biru terang, nonaktif = abu
            btn.style.color = willShow ? '#6366f1' : '';
            btn.title = willShow ? 'Sembunyikan password' : 'Lihat password';
            inp.focus();
        };

        // ── Load riwayat kendala di widget pengawas (laporan dari ruang saya) ──
        window.loadPengawasKendalaHistory = async function() {
            const container = document.getElementById('pengawas-kendala-history');
            if (!container || !window.isFirebaseReady || !window.db) return;
            const myRuangId = (window.currentPengawasRuang && window.currentPengawasRuang.id) ? window.currentPengawasRuang.id : null;
            if (!myRuangId) return;
            try {
                const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian'));
                const items = [];
                snap.forEach(ds => { const d = ds.data(); if (d.ruangId === myRuangId) items.push({id: ds.id, ...d}); });
                items.sort((a,b) => b.timestamp - a.timestamp);
                if (items.length === 0) {
                    container.innerHTML = '<p class="text-xs text-orange-400 italic">Belum ada laporan dari ruang ini.</p>';
                    return;
                }
                container.innerHTML = items.slice(0, 5).map(it => {
                    const waktu  = new Date(it.timestamp).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
                    const stBadge = it.status === 'resolved'
                        ? '<span class="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">✅ Selesai</span>'
                        : '<span class="text-[10px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded-full animate-pulse">🕐 Menunggu</span>';
                    const urgColor = it.urgensi === 'mendesak' ? 'border-red-300 bg-red-50' : it.urgensi === 'penting' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white';
                    const balasan  = it.balasanAdmin ? '<p class="text-[10px] text-green-700 mt-1 font-semibold">💬 Admin: ' + it.balasanAdmin + '</p>' : '';
                    return '<div class="p-2.5 rounded-xl border ' + urgColor + '">'
                        + '<div class="flex items-center justify-between gap-2">'
                        + '<p class="text-xs font-bold text-gray-700 flex-1 truncate">' + _e(it.jenis) + '</p>'
                        + stBadge
                        + '</div>'
                        + '<p class="text-[10px] text-gray-400 mt-0.5">' + waktu + (it.keterangan !== '-' ? ' · ' + _e(it.keterangan).substring(0,50) : '') + '</p>'
                        + balasan
                        + '</div>';
                }).join('');
            } catch(e) { container.innerHTML = '<p class="text-xs text-red-400">Gagal memuat riwayat.</p>'; }
        };

        // ── Load & render daftar kendala di panel Admin ──
        window._allKendalaData = [];

        window.loadKendalaList = async function() {
            if (!window.isFirebaseReady || !window.db) return;
            // Jika onSnapshot sudah aktif, cukup re-render dari cache
            if (window._kendalaUnsubscribe && window._allKendalaData.length >= 0) {
                window.renderKendalaList();
                window.updateKendalaNotifications(window._allKendalaData);
                const filterRuang = document.getElementById('kendala-filter-ruang');
                if (filterRuang) {
                    const ruangs = [...new Set(window._allKendalaData.map(k => k.ruang).filter(Boolean))];
                    filterRuang.innerHTML = '<option value="all">Semua Ruang</option>'
                        + ruangs.map(r => '<option value="' + r + '">' + r + '</option>').join('');
                }
                return;
            }
            // Fallback: getDocs manual
            try {
                const snap = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian'));
                window._allKendalaData = [];
                snap.forEach(ds => window._allKendalaData.push({id: ds.id, ...ds.data()}));
                window._allKendalaData.sort((a,b) => b.timestamp - a.timestamp);
                window.renderKendalaList();
                window.updateKendalaNotifications(window._allKendalaData);
                const filterRuang = document.getElementById('kendala-filter-ruang');
                if (filterRuang) {
                    const ruangs = [...new Set(window._allKendalaData.map(k => k.ruang).filter(Boolean))];
                    filterRuang.innerHTML = '<option value="all">Semua Ruang</option>'
                        + ruangs.map(r => '<option value="' + r + '">' + r + '</option>').join('');
                }
            } catch(e) { console.warn('[Kendala] Gagal load:', e); }
        };

        window.renderKendalaList = function() {
            const container = document.getElementById('kendala-list-container');
            if (!container) return;
            const filterStatus = document.getElementById('kendala-filter-status')?.value || 'all';
            const filterRuang  = document.getElementById('kendala-filter-ruang')?.value  || 'all';

            let data = [...window._allKendalaData];
            if (filterStatus !== 'all') data = data.filter(k => k.status === filterStatus);
            if (filterRuang  !== 'all') data = data.filter(k => k.ruang  === filterRuang);

            if (data.length === 0) {
                container.innerHTML = '<div class="px-6 py-12 text-center text-gray-400"><i data-lucide="inbox" class="w-10 h-10 mx-auto text-gray-200 mb-3"></i><p class="font-semibold">Tidak ada laporan kendala</p></div>';
                if (window._createIconsSafe) window._createIconsSafe();
                return;
            }

            const urgLabel = { normal: '🔵 Normal', penting: '🟡 Penting', mendesak: '🔴 Mendesak' };
            const urgBg    = { normal: 'bg-blue-50 border-blue-200', penting: 'bg-amber-50 border-amber-300', mendesak: 'bg-red-50 border-red-300' };

            container.innerHTML = '<div class="divide-y divide-gray-100">' + data.map(k => {
                const waktu   = new Date(k.timestamp).toLocaleString('id-ID', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'});
                const isOpen  = k.status === 'open';
                const stBadge = isOpen
                    ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-orange-100 text-orange-700 animate-pulse">🕐 Belum Ditangani</span>'
                    : '<span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-green-100 text-green-700">✅ Selesai</span>';
                const urgBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + urgBg[k.urgensi || 'normal'] + ' border">' + (urgLabel[k.urgensi] || '🔵 Normal') + '</span>';
                const balasanHtml = k.balasanAdmin
                    ? '<div class="mt-2 p-2.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800"><span class="font-bold">💬 Balasan Admin:</span> ' + k.balasanAdmin + '</div>'
                    : '';
                const resolveBtn = isOpen
                    ? '<button onclick="window.resolveKendala(\'' + k.id + '\')" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i> Tandai Selesai</button>'
                      + '<button onclick="window.balasKendala(\'' + k.id + '\')" class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> Balas</button>'
                    : '';

                return '<div class="p-5 hover:bg-gray-50 transition-colors">'
                    + '<div class="flex flex-wrap items-start justify-between gap-3">'
                    +   '<div class="flex-1 min-w-0">'
                    +     '<div class="flex flex-wrap items-center gap-2 mb-1">'
                    +       stBadge + urgBadge
                    +       '<span class="text-[10px] text-gray-400">' + waktu + '</span>'
                    +     '</div>'
                    +     '<p class="font-black text-gray-800 text-sm">' + _e(k.jenis) + '</p>'
                    +     '<div class="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">'
                    +       '<span class="text-xs text-gray-500">📍 <strong>' + (k.ruang || '-') + '</strong></span>'
                    +       '<span class="text-xs text-gray-500">👤 Pengawas: <strong>' + (k.pengawas || '-') + '</strong></span>'
                    +       (k.siswaTerdampak && k.siswaTerdampak !== '-' ? '<span class="text-xs text-gray-500">🎓 Siswa: ' + _e(k.siswaTerdampak) + '</span>' : '')
                    +     '</div>'
                    +     (k.keterangan && k.keterangan !== '-' ? '<p class="text-xs text-gray-500 mt-1 italic">"' + _e(k.keterangan) + '"</p>' : '')
                    +     balasanHtml
                    +   '</div>'
                    +   (resolveBtn ? '<div class="flex gap-2 shrink-0">' + resolveBtn + '</div>' : '')
                    + '</div>'
                    + '</div>';
            }).join('') + '</div>';
            if (window._createIconsSafe) window._createIconsSafe();
        };

        // Tandai selesai
        window.resolveKendala = async function(id) {
            if (!window.isFirebaseReady || !window.db) return;
            const by = window.currentPengawasName || window.currentStaffName || 'Admin';
            try {
                await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian', id), {
                    status: 'resolved', resolvedAt: Date.now(), resolvedBy: by
                });
                await window.loadKendalaList();
            } catch(e) { alert('Gagal: ' + e.message); }
        };

        // Balas kendala
        window.balasKendala = async function(id) {
            if (!window.isFirebaseReady || !window.db) return;
            const item  = window._allKendalaData.find(k => k.id === id);
            const balasan = prompt('💬 Tulis balasan untuk pengawas' + (item ? ' (' + item.ruang + ')' : '') + ':', item?.balasanAdmin || '');
            if (balasan === null) return;
            const by = window.currentPengawasName || window.currentStaffName || 'Admin';
            try {
                await window.updateDoc(window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian', id), {
                    balasanAdmin: balasan.trim(),
                    status: 'resolved', resolvedAt: Date.now(), resolvedBy: by
                });
                await window.loadKendalaList();
            } catch(e) { alert('Gagal: ' + e.message); }
        };

        // ── Update badge & banner notifikasi kendala di panel Admin ──
        window.updateKendalaNotifications = function(data) {
            const openCount = (data || []).filter(k => k.status === 'open').length;
            const label = openCount > 99 ? '99+' : String(openCount);
            // Badge di tab desktop
            const badge = document.getElementById('kendala-badge-tab');
            if (badge) {
                if (openCount > 0) { badge.textContent = label; badge.classList.remove('hidden'); }
                else badge.classList.add('hidden');
            }
            // Badge di tab mobile
            const mobBadge = document.getElementById('mob-kendala-badge');
            if (mobBadge) {
                if (openCount > 0) { mobBadge.textContent = label; mobBadge.classList.remove('hidden'); }
                else mobBadge.classList.add('hidden');
            }
            // Banner di welcome (semua elemen dengan id kendala-alert-banner)
            document.querySelectorAll('#kendala-alert-banner').forEach(banner => {
                const bannerTxt = banner.querySelector('#kendala-banner-text') || document.getElementById('kendala-banner-text');
                if (openCount > 0) {
                    if (bannerTxt) bannerTxt.textContent = openCount === 1 ? '1 laporan kendala baru dari pengawas' : openCount + ' laporan kendala baru dari pengawas';
                    banner.classList.remove('hidden');
                } else banner.classList.add('hidden');
            });
        };

        // ── Load riwayat ke panel Kendala (view pengawas di tab Kendala) ──
        window.loadPengawasKendalaHistoryPanel = async function() {
            const container = document.getElementById('kendala-pengawas-history-panel');
            if (!container || !window.isFirebaseReady || !window.db) return;
            const myRuangId = (window.currentPengawasRuang && window.currentPengawasRuang.id) ? window.currentPengawasRuang.id : null;
            if (!myRuangId) return;
            container.innerHTML = '<div class="px-6 py-8 text-center text-gray-400"><div class="animate-spin w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-2"></div><p class="text-sm">Memuat laporan...</p></div>';
            try {
                const snap  = await window.getDocs(window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian'));
                const items = [];
                snap.forEach(ds => { const d = ds.data(); if (d.ruangId === myRuangId) items.push({id: ds.id, ...d}); });
                items.sort((a,b) => b.timestamp - a.timestamp);
                if (items.length === 0) {
                    container.innerHTML = '<div class="px-6 py-10 text-center text-gray-400 bg-white rounded-2xl border"><i data-lucide=\"inbox\" class=\"w-8 h-8 mx-auto text-gray-200 mb-2\"></i><p class=\"text-sm font-semibold\">Belum ada laporan dari ruang ini</p><p class=\"text-xs mt-1\">Gunakan tombol Kirim Laporan untuk melaporkan kendala.</p></div>';
                    if (window._createIconsSafe) window._createIconsSafe();
                    return;
                }
                const urgLabel  = {mendesak:'🔴 Mendesak', penting:'🟡 Penting', normal:'🔵 Normal'};
                const urgColor  = {mendesak:'border-red-300 bg-red-50', penting:'border-amber-200 bg-amber-50', normal:'border-gray-200 bg-white'};
                container.innerHTML = items.map(it => {
                    const waktu    = new Date(it.timestamp).toLocaleString('id-ID', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
                    const stBadge  = it.status === 'resolved'
                        ? '<span class="text-[11px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✅ Selesai</span>'
                        : '<span class="text-[11px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full animate-pulse">🕐 Menunggu</span>';
                    const balasan  = it.balasanAdmin ? '<div class="mt-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2"><p class="text-xs font-bold text-green-700">💬 Balasan Admin:</p><p class="text-xs text-green-800 mt-0.5">' + it.balasanAdmin + '</p></div>' : '';
                    const resolvedInfo = it.status === 'resolved' && it.resolvedAt ? '<p class="text-[10px] text-gray-400 mt-1">Diselesaikan: ' + new Date(it.resolvedAt).toLocaleString('id-ID', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) + (it.resolvedBy ? ' oleh ' + it.resolvedBy : '') + '</p>' : '';
                    return '<div class="p-4 rounded-2xl border-2 ' + (urgColor[it.urgensi]||urgColor.normal) + '">'
                        + '<div class="flex items-start justify-between gap-3">'
                        +   '<div class="flex-1 min-w-0">'
                        +     '<div class="flex flex-wrap items-center gap-2 mb-1">' + stBadge + '<span class="text-[11px] text-gray-400">' + waktu + '</span><span class="text-[11px] font-bold text-gray-500">' + (urgLabel[it.urgensi]||'') + '</span></div>'
                        +     '<p class="font-black text-gray-800">' + _e(it.jenis) + '</p>'
                        +     (it.keterangan && it.keterangan !== '-' ? '<p class="text-xs text-gray-500 mt-1 italic">"' + _e(it.keterangan) + '"</p>' : '')
                        +     (it.siswaTerdampak && it.siswaTerdampak !== '-' ? '<p class="text-xs text-gray-500 mt-1">🎓 Siswa: ' + _e(it.siswaTerdampak) + '</p>' : '')
                        +   '</div>'
                        + '</div>'
                        + balasan + resolvedInfo
                        + '</div>';
                }).join('');
                if (window._createIconsSafe) window._createIconsSafe();
            } catch(e) {
                container.innerHTML = '<p class="text-sm text-red-400 p-4">Gagal memuat: ' + e.message + '</p>';
            }
        };

        // ── Tampilkan widget kendala saat pengawas login ──
        // Dipanggil bersamaan dengan widget appeal & token
        window._showPengawasKendalaWidget = function() {
            const widget = document.getElementById('pengawas-kendala-widget');
            if (widget) widget.classList.remove('hidden');
        };

        // ── Real-time listener kendala (onSnapshot — instan, tanpa polling) ──
        window._kendalaUnsubscribe = null;
        window._kendalaLastCount   = 0;   // track jumlah laporan open untuk deteksi laporan baru

        // Toast notif kendala (muncul di pojok kanan bawah)
        window._showKendalaToast = function(item) {
            // Hapus toast lama jika ada
            const old = document.getElementById('kendala-toast');
            if (old) old.remove();

            const urgColor = item.urgensi === 'mendesak'
                ? 'bg-red-600'
                : item.urgensi === 'penting'
                    ? 'bg-amber-500'
                    : 'bg-orange-500';

            const urgIcon = item.urgensi === 'mendesak' ? '🚨' : item.urgensi === 'penting' ? '⚠️' : '📋';

            const toast = document.createElement('div');
            toast.id = 'kendala-toast';
            toast.className = 'fixed bottom-6 right-4 z-[9999] max-w-xs w-80 rounded-2xl shadow-2xl text-white overflow-hidden animate-bounce-once';
            toast.style.cssText = 'animation: slideInRight 0.4s ease-out forwards;';
            toast.innerHTML = `
                <div class="${urgColor} px-4 py-3 flex items-start gap-3">
                    <span class="text-2xl shrink-0">${urgIcon}</span>
                    <div class="flex-1 min-w-0">
                        <p class="font-black text-sm">Laporan Kendala Baru!</p>
                        <p class="text-xs opacity-90 font-semibold mt-0.5 truncate">${_e(item.jenis)}</p>
                        <p class="text-xs opacity-75 mt-0.5">📍 ${item.ruang || '-'} · 👤 ${item.pengawas || '-'}</p>
                    </div>
                    <button onclick="this.closest('#kendala-toast').remove()" class="text-white/70 hover:text-white shrink-0 text-lg leading-none">×</button>
                </div>
                <div class="bg-black/20 px-4 py-2 flex items-center justify-between">
                    <span class="text-xs opacity-80">${new Date(item.timestamp).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})}</span>
                    <button onclick="window.switchDashTab('kendala'); document.getElementById('kendala-toast').remove();" class="text-xs font-bold underline hover:no-underline">Lihat Detail →</button>
                </div>
            `;
            document.body.appendChild(toast);

            // Inject animasi kalau belum ada
            if (!document.getElementById('kendala-toast-style')) {
                const st = document.createElement('style');
                st.id = 'kendala-toast-style';
                st.textContent = `@keyframes slideInRight { from { transform: translateX(120%); opacity:0; } to { transform: translateX(0); opacity:1; } }`;
                document.head.appendChild(st);
            }

            // Suara notif singkat (Web Audio API — tidak butuh file)
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const playBeep = (freq, start, dur, vol=0.3) => {
                    const osc  = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(vol, ctx.currentTime + start);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
                    osc.start(ctx.currentTime + start);
                    osc.stop(ctx.currentTime + start + dur + 0.05);
                };
                if (item.urgensi === 'mendesak') {
                    playBeep(880, 0,    0.12);
                    playBeep(660, 0.15, 0.12);
                    playBeep(880, 0.30, 0.12);
                    playBeep(660, 0.45, 0.20);
                } else {
                    playBeep(660, 0,    0.12);
                    playBeep(880, 0.18, 0.18);
                }
            } catch(e) {}

            // Auto-dismiss setelah 8 detik
            setTimeout(() => { const t = document.getElementById('kendala-toast'); if (t) t.remove(); }, 8000);
        };

        window.startKendalaPolling = function() {
            // Hentikan listener lama jika ada
            if (window._kendalaUnsubscribe) {
                try { window._kendalaUnsubscribe(); } catch(e) {}
                window._kendalaUnsubscribe = null;
            }
            if (!window.isFirebaseReady || !window.db) return;

            const colRef = window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'kendala_ujian');

            window._kendalaUnsubscribe = window.onSnapshot(colRef, (snapshot) => {
                const rows = [];
                snapshot.forEach(ds => rows.push({id: ds.id, ...ds.data()}));
                rows.sort((a,b) => b.timestamp - a.timestamp);
                window._allKendalaData = rows;

                // Deteksi laporan baru — bandingkan count open saat ini vs sebelumnya
                const openItems   = rows.filter(k => k.status === 'open');
                const openCount   = openItems.length;
                const prevCount   = window._kendalaLastCount;
                window._kendalaLastCount = openCount;

                // Jika ada penambahan laporan open baru (bukan pertama kali load)
                if (prevCount > 0 && openCount > prevCount) {
                    // Cari item terbaru yang open
                    const newest = openItems.sort((a,b) => b.timestamp - a.timestamp)[0];
                    if (newest) window._showKendalaToast(newest);
                }

                window.updateKendalaNotifications(rows);

                // Re-render panel kendala jika sedang terbuka
                const panelKendala = document.getElementById('panel-kendala');
                if (panelKendala && !panelKendala.classList.contains('hidden-section')) {
                    window.renderKendalaList();
                }

                // Populate filter ruang (jika panel admin terbuka)
                const filterRuang = document.getElementById('kendala-filter-ruang');
                if (filterRuang && filterRuang.options.length <= 1) {
                    const ruangs = [...new Set(rows.map(k => k.ruang).filter(Boolean))];
                    filterRuang.innerHTML = '<option value="all">Semua Ruang</option>'
                        + ruangs.map(r => '<option value="' + r + '">' + r + '</option>').join('');
                }
            }, (err) => {
                console.warn('[Kendala] onSnapshot error:', err.message);
            });
        };

        // Export CSV (ambil dari state jika sudah ada, atau fetch ulang)
        window.exportLogAnomal = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }
            try {
                const snap = await window.getDocs(
                    window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                );
                let rows = [];
                snap.forEach(d => rows.push({ id: d.id, ...d.data() }));
                rows.sort((a,b) => (b.violations||0)-(a.violations||0));

                const header = 'No,Nama Siswa,Kelas,NISN,Jumlah Pelanggaran,Status,Log Anomali (Timestamp | Pesan),Nilai,Waktu Mulai,Waktu Selesai\n';
                const csvRows = rows.map((r,i) => {
                    const logs = (r.violationLogs||[]).map(l =>
                        `[${l.time ? new Date(l.time).toLocaleString('id-ID') : '-'}] ${l.message||'Anomali'}`
                    ).join(' || ');
                    return [i+1, r.studentName||'', r.studentKelas||'', r.studentNisn||'',
                        r.violations||0, r.status||'Selesai', `"${logs}"`,
                        r.score!=null?r.score:'',
                        r.startTime?new Date(r.startTime).toLocaleString('id-ID'):'',
                        r.endTime?new Date(r.endTime).toLocaleString('id-ID'):''
                    ].join(',');
                });
                const blob = new Blob([header+csvRows.join('\n')], {type:'text/csv;charset=utf-8;'});
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `log_anomali_integritest_${new Date().toISOString().slice(0,10)}.csv`;
                document.body.appendChild(a); a.click(); document.body.removeChild(a);
                URL.revokeObjectURL(a.href);
            } catch(err) { alert('Gagal export: ' + err.message); }
        };

        // ══════════════════════════════════════════════
        // RESET LOG ANOMALI — Hapus semua data exam_results
        // ══════════════════════════════════════════════
        window.resetLogAnomal = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }

            // Konfirmasi bertingkat supaya tidak tidak sengaja terhapus
            if (!confirm('⚠️ PERHATIAN\n\nAnda akan menghapus SEMUA data log anomali & hasil ujian siswa dari Firebase.\n\nData yang dihapus:\n• Seluruh rekaman pelanggaran\n• Nilai & status ujian\n• Data banding siswa\n\nTindakan ini TIDAK BISA dibatalkan.\n\nLanjutkan?')) return;
            if (!confirm('🔴 KONFIRMASI TERAKHIR\n\nApakah Anda sudah export data terlebih dahulu?\n\nTekan OK untuk menghapus semua data sekarang.')) return;

            const btn = document.querySelector('[onclick="window.resetLogAnomal()"]');
            if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Menghapus...'; if (typeof lucide !== 'undefined') window._createIconsSafe(); }

            try {
                const snap = await window.getDocs(
                    window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                );

                if (snap.empty) {
                    alert('Tidak ada data untuk dihapus.');
                    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="trash-2" class="w-4 h-4"></i> Reset Log'; if (typeof lucide !== 'undefined') window._createIconsSafe(); }
                    return;
                }

                // Hapus semua dokumen satu per satu (Firestore tidak support batch delete langsung)
                const deletePromises = [];
                snap.forEach(d => {
                    deletePromises.push(window.deleteDoc(
                        window.doc(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results', d.id)
                    ));
                });
                await Promise.all(deletePromises);

                alert(`✅ Berhasil menghapus ${snap.size} data log anomali.`);
                // Refresh tampilan
                window.renderLogAnomal();

            } catch(err) {
                alert('❌ Gagal menghapus: ' + err.message);
            } finally {
                if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="trash-2" class="w-4 h-4"></i> Reset Log'; if (typeof lucide !== 'undefined') window._createIconsSafe(); }
            }
        };

        // ══════════════════════════════════════════════
        // EXPORT LOG ANOMALI — PDF / HTML LAPORAN BAGUS
        // ══════════════════════════════════════════════
        window.exportLogAnomalPDF = async function() {
            if (!window.isFirebaseReady || !window.db) { alert('Firebase belum siap.'); return; }

            // Pakai data yang sudah di-filter jika ada, fallback ke semua data
            let rows = window._logAnomalState && window._logAnomalState.data && window._logAnomalState.data.length > 0
                ? window._logAnomalState.data
                : null;

            if (!rows) {
                try {
                    const snap = await window.getDocs(
                        window.collection(window.db, 'artifacts', window.appId, 'public', 'data', 'exam_results')
                    );
                    rows = [];
                    snap.forEach(d => rows.push({ id: d.id, ...d.data() }));
                    rows.sort((a,b) => (b.violations||0)-(a.violations||0));
                } catch(err) { alert('Gagal mengambil data: ' + err.message); return; }
            }

            const judulUjian  = document.getElementById('preview-judul')?.textContent
                             || (document.getElementById('setting-judul-ujian')?.value)
                             || 'Ujian';
            const subJudul    = document.getElementById('setting-sub-judul')?.value || '';
            const tglCetak    = new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
            const jamCetak    = new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
            const totalSiswa  = rows.length;
            const totalViol   = rows.reduce((s,r) => s+(r.violations||0), 0);
            const totalDQ     = rows.filter(r => (r.status||'').includes('DISKUALIFIKASI')).length;
            const totalBersih = rows.filter(r => (r.violations||0) === 0).length;
            const totalWarn   = rows.filter(r => (r.violations||0) > 0 && !(r.status||'').includes('DISKUALIFIKASI')).length;

            // Hitung distribusi jenis pelanggaran
            const anomaliCount = {};
            rows.forEach(r => (r.violationLogs||[]).forEach(l => {
                const msg = l.message || '';
                let cat = 'Lainnya';
                if (/tab|meninggalkan/i.test(msg))            cat = 'Pindah Tab / Minimize';
                else if (/fullscreen|layar penuh/i.test(msg)) cat = 'Keluar Fullscreen';
                else if (/mengambang|notifikasi/i.test(msg))  cat = 'Interaksi di Luar Layar';
                else if (/incognito|private/i.test(msg))      cat = 'Mode Incognito';
                anomaliCount[cat] = (anomaliCount[cat]||0) + 1;
            }));
            const anomaliEntries = Object.entries(anomaliCount).sort((a,b) => b[1]-a[1]);
            const maxAnomali     = Math.max(...anomaliEntries.map(e => e[1]), 1);

            const catColors = {
                'Pindah Tab / Minimize':    '#ef4444',
                'Keluar Fullscreen':         '#f97316',
                'Interaksi di Luar Layar':   '#a855f7',
                'Mode Incognito':            '#64748b',
                'Lainnya':                   '#94a3b8',
            };

            // ── Build HTML tabel baris ──
            const rowsHtml = rows.map((r, i) => {
                const viol   = r.violations || 0;
                const isDQ   = (r.status||'').includes('DISKUALIFIKASI');
                const logs   = r.violationLogs || [];
                const rowBg  = isDQ ? '#fff1f2' : viol > 0 ? '#fffbeb' : '#f0fdf4';
                const statusLabel = isDQ ? '🔴 DISKUALIFIKASI' : viol === 0 ? '🟢 BERSIH' : '🟡 PERINGATAN';
                const statusColor = isDQ ? '#dc2626' : viol === 0 ? '#16a34a' : '#d97706';
                const nilaiStr    = r.score != null ? r.score : '—';
                const startStr    = r.startTime ? new Date(r.startTime).toLocaleString('id-ID', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
                const endStr      = r.endTime   ? new Date(r.endTime).toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'}) : '(berlangsung)';

                const logLines = logs.length === 0
                    ? '<span style="color:#94a3b8;font-style:italic;font-size:10px">Tidak ada rekaman pelanggaran</span>'
                    : logs.map((l, li) => {
                        const t    = l.time ? new Date(l.time).toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit',second:'2-digit'}) : '--:--';
                        let icon   = '⚠️';
                        if (/tab|meninggalkan/i.test(l.message||''))      icon = '🔀';
                        if (/fullscreen/i.test(l.message||''))            icon = '⛶';
                        if (/mengambang|notifikasi/i.test(l.message||'')) icon = '📱';
                        if (/incognito/i.test(l.message||''))             icon = '🕶️';
                        const wMap = { high: '−25', medium: '−15', low: '−10' };
                        const wLabel = wMap[l.type] || '−20';
                        const wColor = l.type === 'high' ? '#dc2626' : l.type === 'medium' ? '#d97706' : '#ca8a04';
                        return `<div style="padding:2px 0;border-bottom:${li < logs.length-1 ? '1px dashed #e2e8f0' : 'none'};display:flex;align-items:flex-start;gap:6px;">
                            <span style="font-size:10px;color:#94a3b8;font-family:monospace;white-space:nowrap">[${t}]</span>
                            <span style="font-size:10px;color:#374151;flex:1">${icon} ${_e(l.message)||'Anomali terdeteksi'}</span>
                            <span style="font-size:9px;font-weight:800;color:${wColor};white-space:nowrap">${wLabel}</span>
                        </div>`;
                    }).join('');

                // Appeal info
                const ap = r.appealStatus || 'none';
                const appealHtml = ap === 'pending'
                    ? '<span style="background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:700">⚖️ Menunggu Review</span>'
                    : ap === 'approved'
                    ? `<span style="background:#dcfce7;color:#166534;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:700">✅ Diterima${r.guruReviewer ? ' oleh '+_e(r.guruReviewer) : ''}</span>`
                    : ap === 'rejected'
                    ? `<span style="background:#fee2e2;color:#991b1b;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:700">❌ Ditolak${r.guruReviewer ? ' oleh '+_e(r.guruReviewer) : ''}</span>`
                    : '';

                return `<tr style="background:${rowBg};page-break-inside:avoid">
                    <td style="padding:8px 10px;font-weight:700;color:#374151;font-size:11px;border-bottom:1px solid #e2e8f0;white-space:nowrap">${i+1}</td>
                    <td style="padding:8px 10px;border-bottom:1px solid #e2e8f0">
                        <div style="font-weight:800;font-size:12px;color:#0f172a">${_e(r.studentName)||'—'}</div>
                        <div style="font-size:10px;color:#64748b;font-family:monospace">${_e(r.studentNisn)||''}</div>
                        ${appealHtml ? '<div style="margin-top:3px">'+appealHtml+'</div>' : ''}
                    </td>
                    <td style="padding:8px 10px;font-size:11px;color:#374151;border-bottom:1px solid #e2e8f0">
                        <div style="font-weight:600">${_e(r.studentKelas)||'—'}</div>
                        <div style="font-size:10px;color:#94a3b8">${_e(r.ruangNama||r.paketNama||'')}</div>
                    </td>
                    <td style="padding:8px 10px;text-align:center;border-bottom:1px solid #e2e8f0">
                        <span style="background:${isDQ?'#dc2626':viol===0?'#16a34a':'#d97706'};color:white;padding:3px 8px;border-radius:99px;font-size:10px;font-weight:800">${viol}×</span>
                    </td>
                    <td style="padding:8px 10px;text-align:center;border-bottom:1px solid #e2e8f0">
                        <span style="font-weight:800;font-size:10px;color:${statusColor}">${statusLabel}</span>
                    </td>
                    <td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;min-width:220px">${logLines}</td>
                    <td style="padding:8px 10px;text-align:center;border-bottom:1px solid #e2e8f0">
                        <span style="font-weight:900;font-size:14px;color:${r.score>=75?'#16a34a':'#dc2626'}">${nilaiStr}</span>
                    </td>
                    <td style="padding:8px 10px;font-size:10px;color:#64748b;border-bottom:1px solid #e2e8f0;white-space:nowrap">
                        <div>${startStr}</div>
                        <div style="color:#94a3b8">→ ${endStr}</div>
                    </td>
                </tr>`;
            }).join('');

            // ── Bar chart distribusi anomali ──
            const chartHtml = anomaliEntries.length === 0
                ? '<p style="color:#16a34a;font-weight:600;font-size:12px">✅ Tidak ada anomali terdeteksi.</p>'
                : anomaliEntries.map(([label, cnt]) => {
                    const pct   = Math.round((cnt/maxAnomali)*100);
                    const color = catColors[label] || '#64748b';
                    return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
                        <span style="font-size:11px;color:#374151;width:200px;flex-shrink:0">${_e(label)}</span>
                        <div style="flex:1;background:#f1f5f9;border-radius:4px;height:16px;overflow:hidden">
                            <div style="width:${pct}%;background:${color};height:100%;border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px">
                                <span style="font-size:9px;color:white;font-weight:800">${cnt}×</span>
                            </div>
                        </div>
                        <span style="font-size:11px;font-weight:800;color:#374151;width:24px;text-align:right">${cnt}</span>
                    </div>`;
                }).join('');

            // ── Susun dokumen HTML lengkap ──
            const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Laporan Log Anomali — ${_e(judulUjian)}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f8fafc; color:#0f172a; }
  @media print {
    body { background:white; }
    .no-print { display:none !important; }
    .page-break { page-break-before:always; }
    @page { margin:15mm 12mm; }
  }
  .container { max-width:1100px; margin:0 auto; padding:24px; }
  table { border-collapse:collapse; width:100%; }
  thead th { background:#0f172a; color:white; padding:10px 10px; font-size:10px; text-transform:uppercase; letter-spacing:.05em; text-align:left; }
  thead th:nth-child(4), thead th:nth-child(5), thead th:nth-child(7) { text-align:center; }
</style>
</head>
<body>
<div class="container">

  <!-- HEADER LAPORAN -->
  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:16px;padding:28px 32px;margin-bottom:24px;color:white;display:flex;align-items:center;justify-content:space-between;gap:20px">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="width:52px;height:52px;background:rgba(255,255,255,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px">🛡️</div>
      <div>
        <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:2px">INTEGRITEST — Laporan Resmi</p>
        <h1 style="font-size:22px;font-weight:900;line-height:1.1">${_e(judulUjian)}</h1>
        ${subJudul ? `<p style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:3px">${_e(subJudul)}</p>` : ''}
      </div>
    </div>
    <div style="text-align:right;flex-shrink:0">
      <p style="font-size:11px;color:rgba(255,255,255,0.5)">Dicetak pada</p>
      <p style="font-size:13px;font-weight:700">${tglCetak}</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.6)">${jamCetak} WIB</p>
    </div>
  </div>

  <!-- KARTU STATISTIK RINGKASAN -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px">
    ${[
      { label:'Total Siswa',     val: totalSiswa,   bg:'#f0f9ff', border:'#bae6fd', num:'#0369a1' },
      { label:'Total Pelanggaran', val: totalViol,  bg:'#fff7ed', border:'#fed7aa', num:'#c2410c' },
      { label:'Diskualifikasi',  val: totalDQ,      bg:'#fff1f2', border:'#fecdd3', num:'#be123c' },
      { label:'Peringatan',      val: totalWarn,    bg:'#fefce8', border:'#fde68a', num:'#a16207' },
      { label:'Bersih',          val: totalBersih,  bg:'#f0fdf4', border:'#bbf7d0', num:'#15803d' },
    ].map(s => `<div style="background:${s.bg};border:1.5px solid ${s.border};border-radius:12px;padding:16px;text-align:center">
      <p style="font-size:28px;font-weight:900;color:${s.num};line-height:1">${s.val}</p>
      <p style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:4px">${s.label}</p>
    </div>`).join('')}
  </div>

  <!-- DISTRIBUSI JENIS ANOMALI -->
  ${anomaliEntries.length > 0 ? `
  <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px">
    <h2 style="font-size:13px;font-weight:800;color:#0f172a;margin-bottom:14px;display:flex;align-items:center;gap-8px">
      📊 Distribusi Jenis Pelanggaran
    </h2>
    ${chartHtml}
  </div>` : ''}

  <!-- TABEL DETAIL -->
  <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:32px">
    <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between">
      <div>
        <h2 style="font-size:15px;font-weight:800;color:#0f172a">📋 Log Detail Per Siswa</h2>
        <p style="font-size:11px;color:#64748b;margin-top:2px">Diurutkan berdasarkan jumlah pelanggaran (tertinggi ke terendah)</p>
      </div>
      <span style="background:#f1f5f9;color:#475569;font-size:11px;font-weight:700;padding:4px 12px;border-radius:99px">${totalSiswa} siswa</span>
    </div>
    <div style="overflow-x:auto">
      <table>
        <thead>
          <tr>
            <th style="width:32px">#</th>
            <th>Nama Siswa / NISN</th>
            <th>Kelas / Ruang</th>
            <th style="text-align:center">Pelang.</th>
            <th style="text-align:center">Status</th>
            <th>Log Anomali</th>
            <th style="text-align:center">Nilai</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="border-top:1px solid #e2e8f0;padding-top:16px;display:flex;align-items:center;justify-content:space-between">
    <p style="font-size:10px;color:#94a3b8">Dokumen ini dibuat otomatis oleh sistem <strong>INTEGRITEST</strong>. Data bersumber dari Firebase Realtime.</p>
    <p style="font-size:10px;color:#94a3b8">${tglCetak}, ${jamCetak}</p>
  </div>

  <!-- TOMBOL PRINT (hilang saat dicetak) -->
  <div class="no-print" style="position:fixed;bottom:24px;right:24px;display:flex;gap:10px">
    <button onclick="window.print()" style="background:#0f172a;color:white;border:none;padding:12px 22px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.3);display:flex;align-items:center;gap:8px">
      🖨️ Cetak / Simpan PDF
    </button>
    <button onclick="window.close()" style="background:#f1f5f9;color:#374151;border:1px solid #e2e8f0;padding:12px 18px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer">
      ✕ Tutup
    </button>
  </div>

</div>
</body>
</html>`;

            // Buka di tab baru
            const win = window.open('', '_blank');
            if (!win) { alert('Pop-up diblokir browser. Izinkan pop-up untuk situs ini lalu coba lagi.'); return; }
            win.document.write(html);
            win.document.close();
        };

    </script>
