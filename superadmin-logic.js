// ── Modal detail sekolah ────────────────────────────────────────
function _dsE(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function fmtIntDetail(v){
    if(v===undefined||v===null||v==='')return'<span style="color:#94a3b8;">—</span>';
    const n=Math.round(v);
    const col=n>=80?'#16a34a':n>=60?'#d97706':'#dc2626';
    const bar=Math.max(4,n);
    return`<span style="font-weight:700;color:${col};">${n}</span>
           <div style="height:4px;background:#f1f5f9;border-radius:99px;margin-top:3px;width:80px;display:inline-block;vertical-align:middle;margin-left:6px;">
             <div style="height:4px;background:${col};border-radius:99px;width:${bar}%;transition:width .4s;"></div>
           </div>`;
}

window.openDetailSekolah = async function(schoolDocId, schoolData) {
    // schoolDocId bisa berupa appId (e.g. 'ukktkj') atau Firestore auto-ID
    // Kita selalu ambil data terbaru dari Firestore supaya stat cards akurat
    const appIdToUse = schoolData.appId || schoolDocId || null;

    // Tentukan docId yang benar: pakai appId sebagai docId jika dokumen dengan appId ada
    // (karena sekolah yang dibuat via form simpanSekolah pakai addDoc → auto-ID,
    //  tapi syncManual perlu tahu docId yang benar)
    let resolvedDocId = schoolDocId;
    let freshData = { ...schoolData };

    try {
        // Coba baca langsung pakai schoolDocId
        const snap = await window.getDoc(window.doc(window.db, 'superadmin', 'data', 'schools', schoolDocId));
        if (snap.exists()) {
            const d = snap.data();
            // Jika dokumen ini hanya punya _init (dokumen hantu), coba cari yang benar via appId
            if (!d.appId && !d.nama && appIdToUse) {
                const appSnap = await window.getDoc(window.doc(window.db, 'superadmin', 'data', 'schools', appIdToUse));
                if (appSnap.exists()) {
                    resolvedDocId = appIdToUse;
                    freshData = { _docId: appIdToUse, id: appIdToUse, ...appSnap.data() };
                }
            } else {
                freshData = { _docId: schoolDocId, id: schoolDocId, ...d };
                resolvedDocId = schoolDocId;
            }
        } else if (appIdToUse && appIdToUse !== schoolDocId) {
            // Coba dengan appId sebagai docId
            const appSnap = await window.getDoc(window.doc(window.db, 'superadmin', 'data', 'schools', appIdToUse));
            if (appSnap.exists()) {
                resolvedDocId = appIdToUse;
                freshData = { _docId: appIdToUse, id: appIdToUse, ...appSnap.data() };
            }
        }
    } catch(e) {
        console.warn('[openDetailSekolah] gagal baca Firestore:', e.message);
    }

    // Simpan referensi aktif untuk syncManual
    window._dsActiveAppId      = freshData.appId || appIdToUse;
    window._dsActiveDocId      = resolvedDocId;
    window._dsActiveSchoolData = freshData;

    const modal = document.getElementById('modal-detail-sekolah');
    document.getElementById('ds-nama').textContent = freshData.nama || freshData.appId || resolvedDocId;
    document.getElementById('ds-sub').textContent  = (freshData.kota||'') + (freshData.provinsi?' · '+freshData.provinsi:'') + ' · Kode: ' + (freshData.appId||resolvedDocId||'');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Reset status sync
    const ss = document.getElementById('ds-sync-status');
    if(ss) ss.style.display='none';

    // Stat cards ringkas — pakai freshData yang sudah diambil dari Firestore
    const sc = document.getElementById('ds-stats');
    sc.innerHTML = [
        {lbl:'Total Sesi Ujian', val: freshData.totalExamSessions||0, col:'#3b82f6'},
        {lbl:'Rata Integritas',  val: (freshData.avgIntegrityScore!=null ? Math.round(freshData.avgIntegrityScore)+'%' : '—'), col:'#10b981'},
        {lbl:'Diskualifikasi',   val: freshData.disqualifiedCount||0, col:'#ef4444'},
        {lbl:'Total Akses',      val: (freshData.totalAccess||0)+'×', col:'#7c3aed'}
    ].map(c=>`
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;border-top:3px solid ${c.col};">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:4px;">${c.lbl}</div>
            <div style="font-size:22px;font-weight:900;color:#0f172a;">${c.val}</div>
        </div>`).join('');

    // Load exam_sessions subcollection — pakai resolvedDocId yang sudah diverifikasi
    document.getElementById('ds-loading').style.display = 'block';
    document.getElementById('ds-table-wrap').style.display = 'none';
    document.getElementById('ds-empty').style.display = 'none';

    try {
        // Coba baca dari resolvedDocId, fallback ke appId jika kosong
        let sessSnap = await getDocs(
            collection(db, 'superadmin', 'data', 'schools', resolvedDocId, 'exam_sessions')
        );
        if (sessSnap.empty && freshData.appId && freshData.appId !== resolvedDocId) {
            const altSnap = await getDocs(
                collection(db, 'superadmin', 'data', 'schools', freshData.appId, 'exam_sessions')
            );
            if (!altSnap.empty) sessSnap = altSnap;
        }
        const rows = [];
        sessSnap.forEach(d => rows.push(d.data()));

        document.getElementById('ds-loading').style.display = 'none';

        if (!rows.length) {
            document.getElementById('ds-empty').style.display = 'block';
            return;
        }

        // Sort: kelas asc, lalu sesiName asc
        rows.sort((a,b)=>(a.kelas||'').localeCompare(b.kelas||'')||
                          (a.sesiName||'').localeCompare(b.sesiName||''));

        const tbody = document.getElementById('ds-tbody');
        tbody.innerHTML = rows.map(r=>{
            const dq = r.disqualified||0;
            const lu = r.lastUpdated ? new Date(r.lastUpdated).toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
            return`<tr style="border-bottom:1px solid #f8fafc;">
                <td style="padding:10px 12px;font-size:12px;font-weight:700;color:#0f172a;">${_dsE(r.kelas)}</td>
                <td style="padding:10px 12px;font-size:12px;color:#475569;">
                    <div style="font-weight:600;color:#0f172a;">${_dsE(r.sesiName||r.paketNama||'—')}</div>
                    ${r.paketNama&&r.paketNama!==r.sesiName?`<div style="font-size:10px;color:#94a3b8;">${_dsE(r.paketNama)}</div>`:''}
                </td>
                <td style="padding:10px 12px;text-align:right;font-weight:700;color:#7c3aed;">${r.totalSiswa||0}</td>
                <td style="padding:10px 12px;text-align:right;font-weight:700;color:#0f172a;">${r.avgScore!=null?Math.round(r.avgScore):'—'}</td>
                <td style="padding:10px 12px;text-align:right;">${fmtIntDetail(r.avgIntegrity)}</td>
                <td style="padding:10px 12px;text-align:right;">${dq>0?`<span style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:99px;padding:2px 8px;font-size:11px;font-weight:700;">${dq} DQ</span>`:'<span style="color:#94a3b8;font-size:12px;">—</span>'}</td>
                <td style="padding:10px 12px;font-size:11px;color:#94a3b8;">${lu}</td>
            </tr>`;
        }).join('');

        document.getElementById('ds-table-wrap').style.display = 'block';
    } catch(e) {
        document.getElementById('ds-loading').textContent = '⚠️ Gagal memuat data: ' + e.message;
    }
};

// ── Sync Manual: baca exam_results dari Firestore sekolah → tulis ke exam_sessions superadmin ──
window._dsActiveAppId   = null;
window._dsActiveDocId   = null;

window.syncManual = async function() {
    const appId       = window._dsActiveAppId;
    const schoolDocId = window._dsActiveDocId;
    if (!appId || !schoolDocId) { alert('Data sekolah tidak ditemukan'); return; }
    // Selalu tulis ke dokumen dengan appId sebagai docId (konsisten, hindari dokumen hantu)
    const targetDocId = appId;

    const btn      = document.getElementById('btn-sync-manual');
    const icon     = document.getElementById('sync-icon');
    const statusEl = document.getElementById('ds-sync-status');
    btn.disabled = true;
    icon.textContent = '⏳';
    statusEl.style.display = 'none';

    try {
        // Baca semua exam_results dari Firestore sekolah
        const resultsSnap = await getDocs(
            collection(db, 'artifacts', appId, 'public', 'data', 'exam_results')
        );

        if (resultsSnap.empty) {
            statusEl.textContent = '⚠️ Belum ada data ujian di Firestore sekolah ini';
            statusEl.style.cssText = 'display:block;font-size:11px;padding:5px 10px;border-radius:8px;font-weight:600;background:#fffbeb;color:#92400e;border:1px solid #fde68a;';
            return;
        }

        // Formula integritas — sama dengan syncToSuperadmin di app.html
        const VWEIGHTS = { focus:15, clipboard:20, back_button:25, split_screen:30, device_dup:50, idle:10, unknown:15 };
        function calcInt(data) {
            const viol = data.violations || 0;
            const logs = data.violationLogs || [];
            if (data.status && data.status.includes('DISKUALIFIKASI')) return 0;
            if (viol >= 3) return 0;
            if (viol === 0) return 100;
            let ded = 0;
            if (logs.length > 0) logs.forEach(l => { ded += VWEIGHTS[l.type||'unknown']||VWEIGHTS.unknown; });
            else ded = viol * VWEIGHTS.unknown;
            return Math.max(5, 100 - ded);
        }

        // Agregasi per (kelas × sesi)
        const sessions = {};
        // Untuk agregat sekolah: hitung unik per siswa (hindari double-count)
        let totalSiswaGlobal = 0;
        let sumIntGlobal = 0;
        let totalDQGlobal = 0;

        resultsSnap.forEach(d => {
            const r = d.data();
            // Hanya siswa yang sudah selesai
            if (!r.status || r.status === 'sedang_ujian') return;
            const kelas    = (r.className || 'Tidak Diketahui').trim();
            const sesiId   = r.sesiId  || r.jadwalId || 'tanpa-jadwal';
            const sesiName = r.sesiName || r.paketNama || 'Ujian';
            const key = (appId + '__' + kelas + '__' + sesiId).replace(/[^a-zA-Z0-9_\-]/g,'_').substring(0,200);
            const intScore = calcInt(r);
            const isDQ     = intScore === 0;
            const score    = r.score || 0;

            if (!sessions[key]) {
                sessions[key] = { appId, kelas, sesiId, sesiName, paketNama: r.paketNama||sesiName,
                    totalSiswa:0, sumInt:0, sumScore:0, disqualified:0, lastUpdated: Date.now() };
            }
            const s = sessions[key];
            s.totalSiswa++;
            s.sumInt   += intScore;
            s.sumScore += score;
            if (isDQ) s.disqualified++;

            // Agregat global (per record, bukan per sesi)
            totalSiswaGlobal++;
            sumIntGlobal += intScore;
            if (isDQ) totalDQGlobal++;
        });

        const keys = Object.keys(sessions);
        if (!keys.length) {
            statusEl.textContent = '⚠️ Tidak ada siswa yang sudah selesai ujian';
            statusEl.style.cssText = 'display:block;font-size:11px;padding:5px 10px;border-radius:8px;font-weight:600;background:#fffbeb;color:#92400e;border:1px solid #fde68a;';
            return;
        }

        // Tulis ke exam_sessions superadmin
        let written = 0;
        for (const key of keys) {
            const s = sessions[key];
            const sessionRef = doc(db, 'superadmin', 'data', 'schools', targetDocId, 'exam_sessions', key);
            await setDoc(sessionRef, {
                appId        : s.appId,
                kelas        : s.kelas,
                sesiId       : s.sesiId,
                sesiName     : s.sesiName,
                paketNama    : s.paketNama,
                totalSiswa   : s.totalSiswa,
                avgIntegrity : Math.round(s.sumInt   / s.totalSiswa),
                avgScore     : Math.round(s.sumScore / s.totalSiswa),
                disqualified : s.disqualified,
                lastUpdated  : s.lastUpdated,
                lastUpdatedDate: new Date().toISOString(),
                syncedManually: true
            }, { merge: false });
            written++;
        }

        // Hitung avgIntegrity keseluruhan dari total peserta (bukan rata-rata sesi)
        const avgIntGlobal = Math.round(sumIntGlobal / Math.max(totalSiswaGlobal, 1));

        // Update stat agregat di dokumen sekolah (targetDocId = appId, sudah dideklarasi di atas)
        await setDoc(doc(db, 'superadmin', 'data', 'schools', targetDocId), {
            appId             : appId,
            totalExamSessions : totalSiswaGlobal,
            avgIntegrityScore : avgIntGlobal,
            disqualifiedCount : totalDQGlobal,
            lastSyncManual    : Date.now()
        }, { merge: true });

        statusEl.textContent = `✅ Sync selesai — ${written} sesi, ${totalSiswaGlobal} peserta`;
        statusEl.style.cssText = 'display:block;font-size:11px;padding:5px 10px;border-radius:8px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;';

        // Reload modal dengan data terbaru langsung dari Firestore (pakai appId sebagai docId)
        const freshSnap = await window.getDoc(doc(db, 'superadmin', 'data', 'schools', targetDocId));
        const freshData = freshSnap.exists() ? { _docId: schoolDocId, id: schoolDocId, ...freshSnap.data() } : {
            ...window._dsActiveSchoolData,
            totalExamSessions: totalSiswaGlobal,
            avgIntegrityScore: avgIntGlobal,
            disqualifiedCount: totalDQGlobal
        };
        await openDetailSekolah(targetDocId, freshData);

        // Tampilkan ulang status setelah openDetailSekolah (karena ia reset status)
        const statusEl2 = document.getElementById('ds-sync-status');
        if (statusEl2) {
            statusEl2.textContent = `✅ Sync selesai — ${written} sesi, ${totalSiswaGlobal} peserta`;
            statusEl2.style.cssText = 'display:block;font-size:11px;padding:5px 10px;border-radius:8px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;';
        }

        // Reload tabel monitoring & dashboard di background agar data terbaru tampil
        if (typeof loadAll === 'function') loadAll().catch(()=>{});

    } catch(e) {
        statusEl.textContent = '❌ Gagal: ' + e.message;
        statusEl.style.cssText = 'display:block;font-size:11px;padding:5px 10px;border-radius:8px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;';
        console.error('[syncManual]', e);
    } finally {
        btn.disabled = false;
        icon.textContent = '🔄';
    }
};

window.closeDetailSekolah = function() {
    document.getElementById('modal-detail-sekolah').style.display = 'none';
    document.body.style.overflow = '';
};