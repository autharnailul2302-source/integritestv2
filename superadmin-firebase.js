    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

    const cfg = {apiKey:"AIzaSyAdqApOvuUXrZUO19NfiqZCLSyUYR74w5M",authDomain:"waliq-ded98.firebaseapp.com",projectId:"waliq-ded98",storageBucket:"waliq-ded98.firebasestorage.app",messagingSenderId:"915222555864",appId:"1:915222555864:web:25320841c97661172e3bad"};
    const app=initializeApp(cfg);
    const db=getFirestore(app);
    const auth=getAuth(app);
    // Expose ke window agar script non-module (openDetailSekolah, syncManual) bisa akses
    window.db=db; window.getDocs=getDocs; window.getDoc=getDoc; window.collection=collection; window.doc=doc;
    window.setDoc=setDoc; window.updateDoc=updateDoc;
    // Auth dilakukan saat login — tidak pakai anonymous

    const SA='superadmin';
    const CC=()=>collection(db,SA,'config','credentials');
    const CS=()=>collection(db,SA,'data','schools');
    const CA=()=>collection(db,SA,'data','school_admins');

    // ══════════════════════════════════════════════════════════════
    // FIX: Pastikan dokumen perantara ada dulu agar sub-koleksi
    // bisa dibaca oleh Firestore SDK. Tanpa ini getDocs() pada
    // sub-koleksi akan diam-diam mengembalikan array kosong.
    // ══════════════════════════════════════════════════════════════
    async function ensureParentDocs() {
        // Dokumen 'superadmin/config' — perantara untuk sub-koleksi credentials
        await setDoc(doc(db, SA, 'config'), { _init: true }, { merge: true });
        // Dokumen 'superadmin/data' — perantara untuk sub-koleksi schools & school_admins
        await setDoc(doc(db, SA, 'data'),   { _init: true }, { merge: true });
    }

    // ══════════════════════════════════════════════════════════════
    // AUTO-SEED: Dijalankan setiap load — sekolah & admin dicek
    // secara INDEPENDEN. Jika salah satu terhapus, akan di-restore.
    // ══════════════════════════════════════════════════════════════
    async function runSeedIfEmpty() {
        try {
            await ensureParentDocs();
            // Hanya seed superadmin credentials — tidak auto-buat sekolah/admin
            const snCred = await getDocs(CC());
            if (snCred.empty) {
                await setDoc(doc(db, SA, 'config', 'credentials', 'superadmin'), {
                    username: 'superadmin',
                    password: 'integritest2025',
                    createdAt: Date.now()
                });
            }
        } catch(e) {
            console.warn('[Seed] Error:', e.message);
        }
    }
    await runSeedIfEmpty();

    let SL=[],AL=[];

    // LOGIN
    // ══════════════════════════════════════════════════════════════
    // AUTH: Google Sign-In — pakai akun Google yang sudah terdaftar
    // Hanya email autharnailul2302@gmail.com yang diizinkan masuk
    // Firestore rule: allow read,write: if request.auth.token.email == "autharnailul2302@gmail.com"
    // ══════════════════════════════════════════════════════════════

    const SA_EMAIL = 'autharnailul2302@gmail.com';
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ login_hint: SA_EMAIL, prompt: 'select_account' });

    function _showApp(user) {
        document.getElementById('login-screen').style.display='none';
        document.getElementById('main-app').style.display='flex';
        document.getElementById('sa-user-label').textContent = user.displayName || user.email || 'superadmin';
        document.body.classList.add('logged-in');
        loadAll();
        const h = window.location.hash.replace('#','');
        if(h && VALID_SECTIONS.includes(h)) showSection(h);
    }

    function _showLogin(msg) {
        document.getElementById('login-screen').style.display='flex';
        document.getElementById('main-app').style.display='none';
        document.body.classList.remove('logged-in');
        if(msg) {
            const err = document.getElementById('login-err');
            err.textContent = msg;
            err.style.display = 'block';
        }
    }

    // Pantau state auth — restore session otomatis saat refresh
    onAuthStateChanged(auth, user => {
        if(user) {
            if(user.email !== SA_EMAIL) {
                signOut(auth);
                _showLogin('⛔ Akun ini tidak memiliki akses superadmin.');
                return;
            }
            _showApp(user);
        } else {
            _showLogin();
        }
    });

    window.doLogin = async function(){
        const btn = document.getElementById('btn-login');
        const err = document.getElementById('login-err');
        err.style.display = 'none';
        btn.textContent = 'Membuka Google...'; btn.disabled = true;
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if(user.email !== SA_EMAIL) {
                await signOut(auth);
                showErr(err, '⛔ Akun ' + user.email + ' tidak memiliki akses superadmin.');
            }
            // Kalau email cocok, onAuthStateChanged otomatis panggil _showApp()
        } catch(e) {
            const kode = e.code || '';
            if(kode === 'auth/popup-closed-by-user' || kode === 'auth/cancelled-popup-request') {
                // User tutup popup sendiri, tidak perlu error
            } else if(kode === 'auth/popup-blocked') {
                showErr(err, 'Popup diblokir browser. Izinkan popup untuk situs ini lalu coba lagi.');
            } else {
                showErr(err, 'Login gagal: ' + e.message);
            }
        }
        btn.textContent = 'Masuk dengan Google →'; btn.disabled = false;
    };

    window.doLogout = async function(){
        await signOut(auth);
        location.reload();
    };

    window.loadAll = async function loadAll(){
        await ensureParentDocs();
        await Promise.all([loadSK(),loadAD()]);
        renderDash();
        if(window.filterMonitoring)window.filterMonitoring();
        loadKendala();
    }

    // ── LAPORAN KENDALA ──
    let KL=[]; // Kendala List cache
    const CK=()=>collection(db,SA,'data','laporan_kendala');
    const PG_KD={cur:1,perPage:10};

    window.loadKendala=async function(){
        document.getElementById('tabel-kendala').innerHTML=`<tr><td colspan="7"><div class="empty">Memuat laporan...</div></td></tr>`;
        try{
            await setDoc(doc(db,SA,'data'),{_init:true},{merge:true});
            const sn=await getDocs(CK());
            KL=[];
            sn.forEach(d=>KL.push({id:d.id,...d.data()}));
            KL.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
            window.filterKendala();
            // Update stat cards
            const baru=KL.filter(k=>k.status==='baru'||!k.status).length;
            const proses=KL.filter(k=>k.status==='diproses').length;
            const selesai=KL.filter(k=>k.status==='selesai').length;
            document.getElementById('kd-stat-baru').textContent=baru;
            document.getElementById('kd-stat-proses').textContent=proses;
            document.getElementById('kd-stat-selesai').textContent=selesai;
            document.getElementById('kd-stat-total').textContent=KL.length;
        }catch(e){
            document.getElementById('tabel-kendala').innerHTML=`<tr><td colspan="7"><div class="empty" style="color:#dc2626;">⚠️ Gagal memuat: ${_e(e.message)}</div></td></tr>`;
        }
    };

    function kdStatusBadge(s){
        if(s==='selesai') return'<span class="badge bg-green">✅ Selesai</span>';
        if(s==='diproses') return'<span class="badge bg-amber">🟡 Diproses</span>';
        return'<span class="badge bg-red">🔴 Baru</span>';
    }

    window.filterKendala=function(){
        const q=(document.getElementById('kd-search')?.value||'').toLowerCase();
        const st=document.getElementById('kd-filter-status')?.value||'';
        const kat=document.getElementById('kd-filter-kategori')?.value||'';
        PG_KD.cur=1;
        let list=[...KL];
        if(q) list=list.filter(k=>(k.namaSekolah||'').toLowerCase().includes(q)||(k.judul||'').toLowerCase().includes(q)||(k.kategori||'').toLowerCase().includes(q));
        if(st) list=list.filter(k=>(k.status||'baru')===st);
        if(kat) list=list.filter(k=>k.kategori===kat);
        renderKendala(list);
    };

    function renderKendala(list){
        const tb=document.getElementById('tabel-kendala');
        if(!list.length){
            tb.innerHTML=`<tr><td colspan="7"><div class="empty">Tidak ada laporan yang cocok</div></td></tr>`;
            document.getElementById('pg-kd-wrap').style.display='none';
            return;
        }
        const total=list.length, pp=PG_KD.perPage;
        PG_KD.cur=Math.min(PG_KD.cur,Math.ceil(total/pp));
        const slice=list.slice((PG_KD.cur-1)*pp,PG_KD.cur*pp);
        const offset=(PG_KD.cur-1)*pp;
        tb.innerHTML=slice.map((k,i)=>`<tr>
            <td style="color:#94a3b8;font-size:12px;">${offset+i+1}</td>
            <td><strong>${_e(k.namaSekolah||k.appId||'—')}</strong><br><span class="badge bg-blue mono" style="font-size:10px;">${_e(k.appId||'—')}</span></td>
            <td style="max-width:200px;"><span style="font-weight:700;color:#0f172a;">${_e(k.judul||'—')}</span>${k.deskripsi?`<br><span style="font-size:11px;color:#64748b;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${_e(k.deskripsi)}</span>`:''}</td>
            <td><span style="font-size:12px;font-weight:600;color:#475569;">${_e(k.kategori||'—')}</span></td>
            <td>${kdStatusBadge(k.status||'baru')}</td>
            <td style="font-size:11px;color:#64748b;">${k.createdAt?new Date(k.createdAt).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}):'—'}</td>
            <td><button class="btn-sm btn-blue" onclick="bukaDetailKendala('${_e(k.id)}')">Detail →</button></td>
        </tr>`).join('');
        window._filteredKD=list;
        renderPager('pg-kd-wrap','pg-kd-btns','pg-kd-info',PG_KD.cur,total,pp,
            'function(p){PG_KD.cur=p;renderKendala(window._filteredKD);}');
    }

    let _kdActiveId=null;
    window.bukaDetailKendala=function(id){
        const k=KL.find(x=>x.id===id);
        if(!k)return;
        _kdActiveId=id;
        document.getElementById('kd-detail-judul').textContent='🐛 '+(_e(k.judul)||'Laporan Kendala');
        document.getElementById('kd-detail-sub').textContent=(_e(k.namaSekolah||k.appId||'—'))+' · '+new Date(k.createdAt||Date.now()).toLocaleString('id-ID');
        document.getElementById('kd-respons-text').value=k.responSuperadmin||'';

        const urgentColor=k.urgensi==='tinggi'?'#dc2626':k.urgensi==='sedang'?'#d97706':'#16a34a';
        document.getElementById('kd-detail-body').innerHTML=`
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:11px;">
                    <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:3px;">Sekolah (Tenant)</div>
                    <div style="font-size:13px;font-weight:700;">${_e(k.namaSekolah||k.appId||'—')}</div>
                    <div class="mono" style="font-size:11px;color:#3b82f6;">${_e(k.appId||'—')}</div>
                </div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:11px;">
                    <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:3px;">Kategori</div>
                    <div style="font-size:13px;font-weight:700;">${_e(k.kategori||'—')}</div>
                </div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:11px;">
                    <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:3px;">Status</div>
                    ${kdStatusBadge(k.status||'baru')}
                </div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:11px;">
                    <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:3px;">Urgensi</div>
                    <span style="font-size:13px;font-weight:800;color:${urgentColor};">${_e(k.urgensi?k.urgensi.charAt(0).toUpperCase()+k.urgensi.slice(1):'Normal')}</span>
                </div>
            </div>
            <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:9px;padding:13px;margin-bottom:12px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#92400e;margin-bottom:6px;">📋 Judul Kendala</div>
                <div style="font-size:14px;font-weight:800;color:#0f172a;">${_e(k.judul||'—')}</div>
            </div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:13px;margin-bottom:12px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:6px;">📝 Deskripsi Lengkap</div>
                <div style="font-size:12px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${_e(k.deskripsi||'—')}</div>
            </div>
            ${k.kontakPengirim?`<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;padding:10px 13px;margin-bottom:12px;font-size:12px;color:#1d4ed8;font-weight:600;">📧 Kontak Admin: ${_e(k.kontakPengirim)}</div>`:''}
            ${k.responSuperadmin?`<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:13px;margin-bottom:12px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#16a34a;margin-bottom:6px;">💬 Catatan Respons Sebelumnya</div>
                <div style="font-size:12px;color:#15803d;line-height:1.7;">${_e(k.responSuperadmin)}</div>
            </div>`:''}
        `;

        // Update button visibility based on current status
        const st=k.status||'baru';
        document.getElementById('btn-kd-diproses').style.display=st==='selesai'?'none':'';
        document.getElementById('btn-kd-selesai').style.display=st==='selesai'?'none':'';

        openModal('modal-kendala-detail');
    };

    window.ubahStatusKendala=async function(statusBaru){
        if(!_kdActiveId)return;
        const respons=document.getElementById('kd-respons-text').value.trim();
        try{
            const payload={status:statusBaru,updatedAt:Date.now()};
            if(respons) payload.responSuperadmin=respons;
            await updateDoc(doc(db,SA,'data','laporan_kendala',_kdActiveId),payload);
            showToast('✅',`Status diperbarui: ${statusBaru}`);
            closeModal('modal-kendala-detail');
            await loadKendala();
        }catch(e){alert('Gagal update: '+e.message);}
    };

    window.hapusKendala=async function(){
        if(!_kdActiveId)return;
        if(!confirm('Hapus laporan ini secara permanen?'))return;
        try{
            await deleteDoc(doc(db,SA,'data','laporan_kendala',_kdActiveId));
            showToast('🗑️','Laporan dihapus');
            closeModal('modal-kendala-detail');
            await loadKendala();
        }catch(e){alert('Gagal hapus: '+e.message);}
    };

    async function loadSK(){
        try{
            await ensureParentDocs();
            const sn=await getDocs(CS());
            SL=[];
            window._SL_MAP={};
            sn.forEach(d=>{
                const data=d.data();
                // Lewati dokumen hantu yang tidak punya field appId/nama (misal dokumen _init)
                if(!data.appId && !data.nama) return;
                const row={_docId:d.id,id:d.id,...data};
                SL.push(row);
                window._SL_MAP[row.appId]=row;
            });
            SL.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
            renderSK(SL);
            if(window.filterMonitoring)window.filterMonitoring();
        }catch(e){
            console.error('[loadSK] Error:', e.code, e.message);
            document.getElementById('tabel-sekolah').innerHTML=`<tr><td colspan="9"><div class="empty" style="color:#dc2626;">⚠️ Gagal memuat: ${e.message}</div></td></tr>`;
            document.getElementById('tabel-monitoring').innerHTML=`<tr><td colspan="11"><div class="empty" style="color:#dc2626;">⚠️ Gagal memuat: ${e.message}</div></td></tr>`;
        }
    }
    async function loadAD(){
        try{
            await ensureParentDocs();
            const sn=await getDocs(CA());
            AL=[];
            sn.forEach(d=>AL.push({id:d.id,...d.data()}));
            renderAD(AL);
            updDrop();
        }catch(e){
            console.error('[loadAD] Error:', e.code, e.message);
            document.getElementById('tabel-admin').innerHTML=`<tr><td colspan="6"><div class="empty" style="color:#dc2626;">⚠️ Gagal memuat admin: ${e.message}</div></td></tr>`;
        }
    }

    function renderDash(){
        document.getElementById('stat-total').textContent=SL.length;
        document.getElementById('stat-aktif').textContent=SL.filter(s=>s.status!=='nonaktif').length;
        document.getElementById('stat-nonaktif').textContent=SL.filter(s=>s.status==='nonaktif').length;
        document.getElementById('stat-admin').textContent=AL.length;
        const _7d=Date.now()-7*24*60*60*1000;
        document.getElementById('stat-aktif7').textContent=SL.filter(s=>s.lastAccess&&s.lastAccess>_7d).length;
        // ★ Stat integritas lintas sekolah
        const _withInt=SL.filter(s=>s.avgIntegrityScore!=null&&s.totalExamSessions>0);
        const _avgInt=_withInt.length?Math.round(_withInt.reduce((a,s)=>a+(s.avgIntegrityScore||0),0)/_withInt.length):null;
        document.getElementById('stat-avg-integrity').textContent=_avgInt!=null?_avgInt:'—';
        document.getElementById('stat-total-dq').textContent=SL.reduce((a,s)=>a+(s.disqualifiedCount||0),0);
        const tb=document.getElementById('dash-list');
        if(!SL.length){tb.innerHTML=`<tr><td colspan="4"><div class="empty">Belum ada sekolah. <a onclick="showSection('sekolah')" style="color:#3b82f6;cursor:pointer;">Tambah →</a></div></td></tr>`;return;}
        tb.innerHTML=SL.slice(0,6).map(s=>`<tr><td><strong>${_e(s.nama)}</strong><br><span style="font-size:11px;color:#64748b;">${_e(s.kota||'')}${s.provinsi?' · '+_e(s.provinsi):''}</span></td><td><span class="badge bg-blue mono">${_e(s.appId)}</span></td><td>${sb(s.status)}</td><td>${fmtAccess(s.lastAccess)}</td><td style="font-weight:700;color:#7c3aed;">${s.totalExamSessions||0}x</td></tr>`).join('');
    }

    // ── PAGINATION STATE ──
    const PG = { sk: 1, ad: 1, perPage: 10 };

    function renderPager(wrapId, btnsId, infoId, cur, total, perPage, onGo) {
        const pages = Math.ceil(total / perPage) || 1;
        const wrap  = document.getElementById(wrapId);
        const btns  = document.getElementById(btnsId);
        const info  = document.getElementById(infoId);
        if(total === 0){ wrap.style.display='none'; return; }
        wrap.style.display = 'flex';
        const from = (cur-1)*perPage+1, to = Math.min(cur*perPage, total);
        info.textContent = `Menampilkan ${from}–${to} dari ${total} data`;
        // Build page buttons (max 5 shown)
        let html = `<button class="pg-btn" ${cur===1?'disabled':''} onclick="(${onGo})(${cur-1})">‹</button>`;
        let start = Math.max(1, cur-2), end = Math.min(pages, start+4);
        if(end-start<4) start = Math.max(1, end-4);
        if(start>1) html += `<button class="pg-btn" onclick="(${onGo})(1)">1</button>${start>2?'<span style="padding:0 2px;color:#94a3b8;font-size:12px;">…</span>':''}`;
        for(let p=start;p<=end;p++) html += `<button class="pg-btn${p===cur?' active':''}" onclick="(${onGo})(${p})">${p}</button>`;
        if(end<pages) html += `${end<pages-1?'<span style="padding:0 2px;color:#94a3b8;font-size:12px;">…</span>':''}<button class="pg-btn" onclick="(${onGo})(${pages})">${pages}</button>`;
        html += `<button class="pg-btn" ${cur===pages?'disabled':''} onclick="(${onGo})(${cur+1})">›</button>`;
        btns.innerHTML = html;
    }

    window.renderSK=function(list){
        const tb=document.getElementById('tabel-sekolah');
        if(!list.length){tb.innerHTML=`<tr><td colspan="7"><div class="empty">Belum ada sekolah terdaftar</div></td></tr>`;document.getElementById('pg-sekolah-wrap').style.display='none';return;}
        const total=list.length, pp=PG.perPage;
        PG.sk = Math.min(PG.sk, Math.ceil(total/pp));
        const slice=list.slice((PG.sk-1)*pp, PG.sk*pp);
        const offset=(PG.sk-1)*pp;
        tb.innerHTML=slice.map((s,i)=>{
            const lnk=bLink(s);const dl=s.shortlink||lnk;
            return`<tr data-id="${_e(s.id)}" data-nama="${_e(s.nama)}">
                <td style="color:#94a3b8;font-size:12px;">${offset+i+1}</td>
                <td><strong>${_e(s.nama)}</strong><br><span style="font-size:11px;color:#64748b;">${_e(s.kota||'')}${s.provinsi?' · '+_e(s.provinsi):''}</span></td>
                <td><span class="badge bg-blue mono" style="font-size:11px;">${_e(s.appId)}</span></td>
                <td style="max-width:180px;"><div style="display:flex;align-items:center;gap:5px;"><span class="mono" style="font-size:10px;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:130px;" title="${_e(dl)}">${_e(dl)}</span><button class="btn-sm btn-blue" onclick="copyText('${_e(dl)}')" style="padding:3px 8px;font-size:11px;">Salin</button></div></td>
                <td>${sb(s.status)}</td>
                <td style="font-size:11px;">${fmtAccess(s.lastAccess)}</td>
                <td style="font-size:11px;color:#475569;font-weight:700;">${s.totalExamSessions||0}x</td>
                <td style="font-size:11px;color:#94a3b8;">${s.createdAt?new Date(s.createdAt).toLocaleDateString('id-ID'):'—'}</td>
                <td><div style="display:flex;gap:4px;flex-wrap:wrap;">
                    <button class="btn-sm btn-outline" onclick="showDetail(this.closest('tr').dataset.id)">Detail</button>
                    <button class="btn-sm btn-blue" onclick="editSekolah(this.closest('tr').dataset.id)">Edit</button>
                    <button class="btn-sm ${s.status==='nonaktif'?'btn-green':'btn-outline'}" onclick="toggleStatus(this.closest('tr').dataset.id,'${s.status}')">${s.status==='nonaktif'?'Aktifkan':'Nonaktifkan'}</button>
                    <button class="btn-sm btn-red" onclick="hapusSK(this)">Hapus</button>
                </div></td>
            </tr>`;
        }).join('');
        // simpan list terfilter untuk pager
        window._filteredSK = list;
        renderPager('pg-sekolah-wrap','pg-sekolah-btns','pg-sekolah-info', PG.sk, total, pp,
            'function(p){PG.sk=p;window.renderSK(window._filteredSK);}');
    };

    window.renderAD=function(list){
        const tb=document.getElementById('tabel-admin');
        if(!list.length){tb.innerHTML=`<tr><td colspan="6"><div class="empty">Belum ada akun admin sekolah</div></td></tr>`;document.getElementById('pg-admin-wrap').style.display='none';return;}
        const total=list.length, pp=PG.perPage;
        PG.ad = Math.min(PG.ad, Math.ceil(total/pp));
        const slice=list.slice((PG.ad-1)*pp, PG.ad*pp);
        const offset=(PG.ad-1)*pp;
        tb.innerHTML=slice.map((a,i)=>{
            const sk=SL.find(s=>s.appId===a.appId);
            return`<tr data-id="${_e(a.id)}" data-nama="${_e(a.username)}">
                <td style="color:#94a3b8;font-size:12px;">${offset+i+1}</td>
                <td><span class="mono" style="font-weight:700;">${_e(a.username)}</span></td>
                <td style="color:#475569;">${_e(a.nama||'—')}</td>
                <td>${_e(sk?.nama||a.appId)}<br><span class="badge bg-blue mono" style="font-size:10px;">${_e(a.appId)}</span></td>
                <td style="font-size:11px;color:#94a3b8;">${a.createdAt?new Date(a.createdAt).toLocaleDateString('id-ID'):'—'}</td>
                <td><div style="display:flex;gap:4px;">
                    <button class="btn-sm btn-blue" onclick="editAdmin(this.closest('tr').dataset.id)">Edit</button>
                    <button class="btn-sm btn-red" onclick="hapusAD(this)">Hapus</button>
                </div></td>
            </tr>`;
        }).join('');
        window._filteredAD = list;
        renderPager('pg-admin-wrap','pg-admin-btns','pg-admin-info', PG.ad, total, pp,
            'function(p){PG.ad=p;window.renderAD(window._filteredAD);}');
    };

    // ── MONITORING ──
    const PG_MON = { cur: 1, perPage: 10 };

    function fmtIntScore(s){
        if(s===null||s===undefined||s==='')return'<span style="color:#94a3b8;">—</span>';
        const n=Math.round(Number(s));
        const color=n>=80?'#16a34a':n>=60?'#d97706':n>0?'#dc2626':'#dc2626';
        const label=n>=80?'Teladan':n>=60?'Cukup':n>0?'Evaluasi':'DQ';
        return`<div style="display:flex;align-items:center;gap:6px;">
            <div style="flex:1;height:5px;background:#f1f5f9;border-radius:99px;min-width:40px;">
                <div style="height:5px;border-radius:99px;background:${color};width:${Math.max(3,n)}%;transition:width .3s;"></div>
            </div>
            <span style="font-weight:700;color:${color};font-size:12px;min-width:28px;text-align:right;">${n}</span>
            <span style="font-size:10px;color:${color};background:${color}18;padding:1px 6px;border-radius:99px;">${label}</span>
        </div>`;
    }

    function renderMonitoring(list){
        const tb=document.getElementById('tabel-monitoring');
        if(!list.length){
            tb.innerHTML=`<tr><td colspan="11"><div class="empty">Tidak ada data yang cocok</div></td></tr>`;
            document.getElementById('pg-mon-wrap').style.display='none';
            return;
        }
        const total=list.length, pp=PG_MON.perPage;
        PG_MON.cur=Math.min(PG_MON.cur,Math.ceil(total/pp));
        const slice=list.slice((PG_MON.cur-1)*pp,PG_MON.cur*pp);
        const offset=(PG_MON.cur-1)*pp;
        tb.innerHTML=slice.map((s,i)=>{
            const dq=s.disqualifiedCount||0;
            const avgInt=s.avgIntegrityScore;
            return`<tr data-id="${_e(s.id)}" data-nama="${_e(s.nama)}">
                <td style="color:#94a3b8;font-size:12px;">${offset+i+1}</td>
                <td><strong>${_e(s.nama)}</strong><br><span style="font-size:11px;color:#64748b;">${_e(s.kota||'')}${s.provinsi?' · '+_e(s.provinsi):''}</span></td>
                <td><span class="badge bg-blue mono" style="font-size:11px;">${_e(s.appId)}</span></td>
                <td>${sb(s.status)}</td>
                <td>${fmtAccess(s.lastAccess)}</td>
                <td style="font-weight:700;color:#7c3aed;">${s.totalAccess||0}×</td>
                <td style="font-weight:700;color:#0f172a;">${s.totalExamSessions||0}×</td>
                <td style="min-width:160px;">${fmtIntScore(avgInt)}</td>
                <td>${dq>0?`<span class="badge bg-red">${dq} DQ</span>`:'<span style="color:#94a3b8;font-size:12px;">—</span>'}</td>
                <td style="font-size:11px;color:#64748b;">${s.lastExamSession?new Date(s.lastExamSession).toLocaleString('id-ID'):'—'}</td>
                <td><button class="btn-sm btn-blue" onclick="openDetailSekolah(window._SL_MAP&&window._SL_MAP['${_e(s.appId)}']?window._SL_MAP['${_e(s.appId)}']._docId:'',window._SL_MAP&&window._SL_MAP['${_e(s.appId)}']||{})" style="white-space:nowrap;">📊 Detail</button></td>
            </tr>`;
        }).join('');
        window._filteredMON=list;
        renderPager('pg-mon-wrap','pg-mon-btns','pg-mon-info',PG_MON.cur,total,pp,
            'function(p){PG_MON.cur=p;window.renderMonitoring(window._filteredMON);}');
    }
    window.renderMonitoring=renderMonitoring;

    window.filterMonitoring=function(){
        const q=(document.getElementById('search-monitoring')?.value||'').toLowerCase();
        const st=document.getElementById('filter-status-monitoring')?.value||'';
        const act=document.getElementById('filter-activity-monitoring')?.value||'';
        PG_MON.cur=1;
        let list=[...SL];
        if(q) list=list.filter(s=>(s.nama||'').toLowerCase().includes(q)||(s.kota||'').toLowerCase().includes(q)||(s.appId||'').toLowerCase().includes(q));
        if(st) list=list.filter(s=>(s.status||'aktif')===st);
        if(act){
            if(act==='never') list=list.filter(s=>!s.lastAccess);
            else{const days=parseInt(act);const cutoff=Date.now()-days*24*60*60*1000;list=list.filter(s=>s.lastAccess&&s.lastAccess>cutoff);}
        }
        renderMonitoring(list);
    };

    window.filterSekolah=function(){
        const q=document.getElementById('search-sekolah').value.toLowerCase();
        PG.sk=1;
        renderSK(SL.filter(s=>(s.nama||'').toLowerCase().includes(q)||(s.kota||'').toLowerCase().includes(q)||(s.appId||'').toLowerCase().includes(q)));
    };

    window.simpanSekolah=async function(){
        const nama=document.getElementById('s-nama').value.trim();
        const kota=document.getElementById('s-kota').value.trim();
        const provinsi=document.getElementById('s-provinsi').value.trim();
        const appId=document.getElementById('s-appid').value.trim();
        const baseUrl=document.getElementById('s-baseurl').value.trim();
        const shortlink=document.getElementById('s-shortlink').value.trim();
        const kontak=document.getElementById('s-kontak').value.trim();
        const fbMode=document.getElementById('s-firebase-mode-val').value;
        const fbConfigRaw=document.getElementById('s-firebase-config').value.trim();
        const err=document.getElementById('modal-sekolah-err');
        if(!nama||!kota||!appId){showErr(err,'Nama, kota, dan kode sekolah wajib diisi');return;}
        if(!/^[a-z0-9]+$/.test(appId)){showErr(err,'Kode hanya huruf kecil dan angka');return;}
        if(SL.find(s=>s.appId===appId)){showErr(err,'App ID sudah dipakai sekolah lain');return;}
        // Validasi Firebase config jika mode custom
        let firebaseConfig=null;
        if(fbMode==='custom'){
            try{firebaseConfig=JSON.parse(fbConfigRaw);if(!firebaseConfig.apiKey||!firebaseConfig.projectId)throw new Error('apiKey/projectId wajib');}
            catch(e){showErr(err,'Firebase Config JSON tidak valid: '+e.message);return;}
        }
        const btn=document.getElementById('btn-simpan-sekolah');
        btn.textContent='Menyimpan...';btn.disabled=true;err.style.display='none';
        try{
            const payload={nama,kota,provinsi,appId,baseUrl,shortlink,kontak,status:'aktif',createdAt:Date.now(),firebaseMode:fbMode};
            if(firebaseConfig) payload.firebaseConfig=JSON.stringify(firebaseConfig);
            await addDoc(CS(),payload);
            showToast('✅',`${nama} berhasil ditambahkan`);
            closeModal('modal-sekolah');clrSK();await loadAll();
        }catch(e){showErr(err,'Gagal: '+e.message);}
        btn.textContent='Simpan Sekolah';btn.disabled=false;
    };

    window.simpanAdmin=async function(){
        const appId=document.getElementById('a-sekolah').value;
        const username=document.getElementById('a-username').value.trim();
        const password=document.getElementById('a-password').value;
        const nama=document.getElementById('a-nama').value.trim();
        const err=document.getElementById('modal-admin-err');
        if(!appId){showErr(err,'Pilih sekolah terlebih dahulu');return;}
        if(!username){showErr(err,'Username wajib diisi');return;}
        if(password.length<6){showErr(err,'Password minimal 6 karakter');return;}
        if(AL.find(a=>a.username===username&&a.appId===appId)){showErr(err,'Username sudah ada untuk sekolah ini');return;}
        const btn=document.getElementById('btn-simpan-admin');
        btn.textContent='Membuat...';btn.disabled=true;err.style.display='none';
        try{
            await addDoc(CA(),{appId,username,nama,createdAt:Date.now()});
            await addDoc(collection(db,'artifacts',appId,'public','data','admin_credentials'),{username,password,nama,role:'admin',createdAt:Date.now()});
            showToast('✅',`Admin ${username} berhasil dibuat`);
            closeModal('modal-admin');clrAD();await loadAll();
        }catch(e){showErr(err,'Gagal: '+e.message);}
        btn.textContent='Buat Akun Admin';btn.disabled=false;
    };

    window.toggleStatus=async function(id,cur){
        const ns=cur==='nonaktif'?'aktif':'nonaktif';
        try{await updateDoc(doc(db,SA,'data','schools',id),{status:ns});showToast(ns==='aktif'?'✅':'⛔',`Status → ${ns}`);await loadAll();}catch(e){alert('Gagal: '+e.message);}
    };

    window.hapusSK=async function(btn){
        const tr=btn.closest('tr');
        const id=tr?tr.dataset.id:'';
        const nama=tr?tr.dataset.nama:'';
        if(!id){alert('Gagal: ID sekolah tidak ditemukan');return;}
        if(!confirm(`Hapus sekolah "${nama}"?`))return;
        try{await deleteDoc(doc(db,SA,'data','schools',id));showToast('🗑️',`${nama} dihapus`);await loadAll();}catch(e){alert('Gagal: '+e.message);}
    };

    // ── EDIT SEKOLAH ──
    window.editSekolah=function(id){
        const s=SL.find(x=>x.id===id);if(!s)return;
        document.getElementById('es-id').value=id;
        document.getElementById('es-old-appid').value=s.appId;
        document.getElementById('es-appid-label').textContent=s.appId;
        document.getElementById('es-appid').value=s.appId;
        document.getElementById('es-appid-warn').style.display='none';
        document.getElementById('es-nama').value=s.nama||'';
        document.getElementById('es-kota').value=s.kota||'';
        document.getElementById('es-provinsi').value=s.provinsi||'';
        document.getElementById('es-baseurl').value=s.baseUrl||'';
        document.getElementById('es-shortlink').value=s.shortlink||'';
        document.getElementById('es-kontak').value=s.kontak||'';
        document.getElementById('modal-edit-sekolah-err').style.display='none';
        // Tampilkan warning saat App ID diubah
        document.getElementById('es-appid').oninput=function(){
            this.value=this.value.toLowerCase().replace(/[^a-z0-9]/g,'');
            const oldId=document.getElementById('es-old-appid').value;
            document.getElementById('es-appid-warn').style.display=this.value&&this.value!==oldId?'block':'none';
            previewEditLink();
        };
        // Set firebase mode
        const mode=s.firebaseMode||'shared';
        document.querySelectorAll('input[name="es-firebase-mode"]').forEach(r=>{r.checked=r.value===mode;});
        document.getElementById('es-firebase-mode-val').value=mode;
        document.getElementById('es-firebase-config').value=s.firebaseConfig||'';
        toggleFirebaseInput('es');
        // preview link
        const prev=document.getElementById('es-link-preview');
        const prevUrl=document.getElementById('es-lp-url');
        if(s.baseUrl){prevUrl.textContent=s.baseUrl.replace(/\?.*$/,'')+`?s=${s.appId}`;prev.classList.add('show');}
        else{prev.classList.remove('show');}
        openModal('modal-edit-sekolah');
    };

    window.previewEditLink=function(){
        const b=document.getElementById('es-baseurl').value.trim();
        const newAppId=document.getElementById('es-appid').value.trim();
        const prev=document.getElementById('es-link-preview');
        const prevUrl=document.getElementById('es-lp-url');
        if(b&&newAppId){prevUrl.textContent=b.replace(/\?.*$/,'')+`?s=${newAppId}`;prev.classList.add('show');}
        else{prev.classList.remove('show');}
    };

    window.simpanEditSekolah=async function(){
        const id       = document.getElementById('es-id').value;
        const oldAppId = document.getElementById('es-old-appid').value;
        const newAppId = document.getElementById('es-appid').value.trim();
        const nama     = document.getElementById('es-nama').value.trim();
        const kota     = document.getElementById('es-kota').value.trim();
        const provinsi = document.getElementById('es-provinsi').value.trim();
        const baseUrl  = document.getElementById('es-baseurl').value.trim();
        const shortlink= document.getElementById('es-shortlink').value.trim();
        const kontak   = document.getElementById('es-kontak').value.trim();
        const fbMode   = document.getElementById('es-firebase-mode-val').value;
        const fbConfigRaw = document.getElementById('es-firebase-config').value.trim();
        const err      = document.getElementById('modal-edit-sekolah-err');
        if(!nama||!kota){showErr(err,'Nama dan kota wajib diisi');return;}
        if(!newAppId||!/^[a-z0-9]+$/.test(newAppId)){showErr(err,'App ID hanya boleh huruf kecil dan angka');return;}
        // Cek duplikat App ID jika diubah
        if(newAppId!==oldAppId&&SL.find(s=>s.appId===newAppId)){showErr(err,'App ID sudah dipakai sekolah lain');return;}
        // Validasi Firebase config jika mode custom
        let firebaseConfig=null;
        if(fbMode==='custom'){
            try{firebaseConfig=JSON.parse(fbConfigRaw);if(!firebaseConfig.apiKey||!firebaseConfig.projectId)throw new Error('apiKey/projectId wajib');}
            catch(e){showErr(err,'Firebase Config JSON tidak valid: '+e.message);return;}
        }
        const btn=document.getElementById('btn-simpan-edit-sekolah');
        btn.textContent='Menyimpan...';btn.disabled=true;err.style.display='none';
        try{
            const payload={nama,kota,provinsi,appId:newAppId,baseUrl,shortlink,kontak,firebaseMode:fbMode};
            if(firebaseConfig) payload.firebaseConfig=JSON.stringify(firebaseConfig);
            else payload.firebaseConfig='';

            if(newAppId!==oldAppId){
                // App ID berubah: buat dokumen baru dengan ID baru, hapus yang lama
                const oldData=SL.find(x=>x.id===id)||{};
                await setDoc(doc(db,SA,'data','schools',newAppId),{...oldData,...payload,createdAt:oldData.createdAt||Date.now()});
                await deleteDoc(doc(db,SA,'data','schools',id));
                // Update semua admin yang pakai appId lama
                const adminSnap=await getDocs(CA());
                for(const ad of adminSnap.docs){
                    if(ad.data().appId===oldAppId){
                        await updateDoc(doc(db,SA,'data','school_admins',ad.id),{appId:newAppId});
                    }
                }
                showToast('✅',`${nama} diperbarui (App ID: ${oldAppId} → ${newAppId})`);
            } else {
                await updateDoc(doc(db,SA,'data','schools',id),payload);
                showToast('✅',`${nama} berhasil diperbarui`);
            }
            closeModal('modal-edit-sekolah');
            await loadAll();
        }catch(e){showErr(err,'Gagal: '+e.message);}
        btn.textContent='Simpan Perubahan';btn.disabled=false;
    };

    window.hapusAD=async function(btn){
        const tr=btn.closest('tr');
        const id=tr?tr.dataset.id:'';
        const username=tr?tr.dataset.nama:'';
        if(!id){alert('Gagal: ID admin tidak ditemukan');return;}
        if(!confirm(`Hapus admin "${username}"?`))return;
        try{await deleteDoc(doc(db,SA,'data','school_admins',id));showToast('🗑️',`Admin ${username} dihapus`);await loadAll();}catch(e){alert('Gagal: '+e.message);}
    };

    // ── EDIT ADMIN ──
    window.editAdmin=function(id){
        const a=AL.find(x=>x.id===id);if(!a)return;
        document.getElementById('ea-id').value=id;
        document.getElementById('ea-appid').value=a.appId;
        document.getElementById('ea-username').value=a.username;
        document.getElementById('ea-nama').value=a.nama||'';
        document.getElementById('ea-password').value='';
        document.getElementById('ea-sekolah-label').textContent=(SL.find(s=>s.appId===a.appId)?.nama||a.appId)+' ('+a.appId+')';
        document.getElementById('modal-edit-admin-err').style.display='none';
        openModal('modal-edit-admin');
    };

    window.simpanEditAdmin=async function(){
        const id       = document.getElementById('ea-id').value;
        const appId    = document.getElementById('ea-appid').value;
        const username = document.getElementById('ea-username').value.trim();
        const nama     = document.getElementById('ea-nama').value.trim();
        const password = document.getElementById('ea-password').value;
        const err      = document.getElementById('modal-edit-admin-err');
        if(!username){showErr(err,'Username wajib diisi');return;}
        // Cek duplikat username (kecuali dirinya sendiri)
        const duplikat = AL.find(a=>a.username===username && a.appId===appId && a.id!==id);
        if(duplikat){showErr(err,'Username sudah dipakai admin lain di sekolah ini');return;}
        if(password && password.length<6){showErr(err,'Password baru minimal 6 karakter');return;}
        const btn=document.getElementById('btn-simpan-edit-admin');
        btn.textContent='Menyimpan...';btn.disabled=true;err.style.display='none';
        try{
            // Update list di superadmin
            await updateDoc(doc(db,SA,'data','school_admins',id),{username,nama});

            // Update credentials di Firestore sekolah
            // Cari semua doc di admin_credentials sekolah, update yang username-nya cocok (atau main_admin)
            const credCol = collection(db,'artifacts',appId,'public','data','admin_credentials');
            const credSnap = await getDocs(credCol);
            const oldAdmin = AL.find(x=>x.id===id);
            let updated = false;
            for(const cd of credSnap.docs){
                const d=cd.data();
                if(d.username===oldAdmin?.username || cd.id==='main_admin'){
                    const payload={username,nama};
                    if(password) payload.password=password;
                    await updateDoc(doc(db,'artifacts',appId,'public','data','admin_credentials',cd.id),payload);
                    updated=true;
                    break;
                }
            }
            // Kalau belum ada doc sama sekali (misalnya seed lama), buat baru
            if(!updated){
                const payload={username,nama,role:'admin',createdAt:Date.now()};
                if(password) payload.password=password;
                await setDoc(doc(db,'artifacts',appId,'public','data','admin_credentials','main_admin'),payload);
            }

            showToast('✅',`Admin ${username} diperbarui`);
            closeModal('modal-edit-admin');
            await loadAll();
        }catch(e){showErr(err,'Gagal: '+e.message);}
        btn.textContent='Simpan Perubahan';btn.disabled=false;
    };

    window.showDetail=function(id){
        const s=SL.find(x=>x.id===id);if(!s)return;
        const lnk=bLink(s);const admins=AL.filter(a=>a.appId===s.appId);
        document.getElementById('detail-judul').textContent=s.nama;
        document.getElementById('detail-sub').textContent='App ID: '+s.appId;
        document.getElementById('detail-body').innerHTML=`
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">App ID</div><div class="mono" style="font-weight:700;color:#1d4ed8;">${_e(s.appId)}</div></div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Status</div>${sb(s.status)}</div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Kota</div><div style="font-size:13px;font-weight:600;">${_e(s.kota||'—')}</div></div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Admin</div><div style="font-size:22px;font-weight:900;color:#1d4ed8;">${admins.length}</div></div>
        </div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px;margin-bottom:10px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#3b82f6;margin-bottom:6px;">Link Akses Sekolah</div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="mono" style="font-size:11px;color:#1e40af;flex:1;word-break:break-all;">${_e(s.shortlink||lnk)}</span>
                <button class="btn-sm btn-blue" onclick="copyText('${_e(s.shortlink||lnk)}')">Salin</button>
                <a href="${_e(s.shortlink||lnk)}" target="_blank" class="btn-sm btn-outline" style="text-decoration:none;">Buka</a>
            </div>
        </div>
        ${admins.length?`<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:10px;"><div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:8px;">Admin Terdaftar</div>${admins.map(a=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="mono" style="font-size:12px;font-weight:700;">${_e(a.username)}</span>${a.nama?`<span style="font-size:12px;color:#64748b;">· ${_e(a.nama)}</span>`:''}</div>`).join('')}</div>`:''}
        ${s.kontak?`<div style="font-size:12px;color:#64748b;margin-bottom:6px;">📧 ${_e(s.kontak)}</div>`:''}
        <div style="font-size:11px;color:#94a3b8;">Terdaftar: ${s.createdAt?new Date(s.createdAt).toLocaleString('id-ID'):'—'}</div>`;
        openModal('modal-detail');
    };

    window.updDrop=function(){
        const sel=document.getElementById('a-sekolah');
        sel.innerHTML='<option value="">-- Pilih Sekolah --</option>'+SL.filter(s=>s.status!=='nonaktif').map(s=>`<option value="${_e(s.appId)}">${_e(s.nama)} (${_e(s.appId)})</option>`).join('');
    };

    function bLink(s){if(!s.baseUrl)return`index.html?s=${s.appId}`;return s.baseUrl.replace(/\?.*$/,'')+`?s=${s.appId}`;}
    function sb(status){return status==='nonaktif'?'<span class="badge bg-red">⛔ Nonaktif</span>':'<span class="badge bg-green">✅ Aktif</span>';}
    function fmtAccess(ts){
        if(!ts)return'<span style="color:#94a3b8;">—</span>';
        const diff=Date.now()-ts;
        const m=Math.floor(diff/60000);
        if(m<1)return'<span style="color:#16a34a;">Baru saja</span>';
        if(m<60)return`<span style="color:#16a34a;">${m} menit lalu</span>`;
        const h=Math.floor(m/60);
        if(h<24)return`<span style="color:#d97706;">${h} jam lalu</span>`;
        const d=Math.floor(h/24);
        if(d<30)return`<span style="color:#475569;">${d} hari lalu</span>`;
        return'<span style="color:#94a3b8;">'+new Date(ts).toLocaleDateString('id-ID')+'</span>';
    }
    function showErr(el,msg){el.textContent=msg;el.style.display='block';}
    function _e(str){if(!str)return'';return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}

    window.copyText=function(t){navigator.clipboard.writeText(t).then(()=>showToast('📋','Link disalin!')).catch(()=>{});};
    window.showToast=function(icon,msg){document.getElementById('t-icon').textContent=icon;document.getElementById('t-msg').textContent=msg;const t=document.getElementById('toast');t.classList.add('show');clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),3000);};
    window.autoGenAppId=function(nama){
        // Generate App ID dari nama sekolah: ambil huruf/angka, lowercase, max 20 char
        const raw=nama.toLowerCase()
            .replace(/negeri/g,'n').replace(/swasta/g,'sw')
            .replace(/sekolah menengah atas/g,'sma').replace(/sekolah menengah kejuruan/g,'smk')
            .replace(/sekolah menengah pertama/g,'smp').replace(/sekolah dasar/g,'sd')
            .replace(/[^a-z0-9\s]/g,'').trim()
            .split(/\s+/).join('').slice(0,20);
        const el=document.getElementById('s-appid');
        if(el && (!el.dataset.manualEdit || el.dataset.manualEdit==='false')) el.value=raw;
    };
    // Tandai App ID sebagai "diedit manual" supaya auto-gen tidak override ketikan user
    document.getElementById('s-appid').addEventListener('input',function(){this.dataset.manualEdit='true';});
    window.previewLink=function(){const a=document.getElementById('s-appid').value.trim();const b=document.getElementById('s-baseurl').value.trim();const w=document.getElementById('link-preview');const u=document.getElementById('lp-url');if(a&&b){u.textContent=b.replace(/\?.*$/,'')+`?s=${a}`;w.classList.add('show');}else{w.classList.remove('show');}};
    window.clrSK=function(){
        ['s-nama','s-kota','s-provinsi','s-appid','s-shortlink','s-kontak','s-firebase-config'].forEach(id=>{const el=document.getElementById(id);if(el){el.value='';if(el.dataset)el.dataset.manualEdit='false';}});
        document.getElementById('s-baseurl').value='';
        document.getElementById('link-preview').classList.remove('show');
        document.getElementById('modal-sekolah-err').style.display='none';
        // Reset firebase ke shared
        document.querySelectorAll('input[name="s-firebase-mode"]').forEach(r=>{r.checked=r.value==='shared';});
        document.getElementById('s-firebase-mode-val').value='shared';
        toggleFirebaseInput('s');
    };
    window.clrAD=function(){['a-sekolah','a-username','a-password','a-nama'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.getElementById('modal-admin-err').style.display='none';};

    // Toggle tampil/sembunyikan textarea Firebase config + styling tombol pilihan
    window.toggleFirebaseInput=function(prefix){
        const radios=document.querySelectorAll(`input[name="${prefix}-firebase-mode"]`);
        let mode='shared';
        radios.forEach(r=>{if(r.checked)mode=r.value;});
        document.getElementById(`${prefix}-firebase-mode-val`).value=mode;
        const wrap=document.getElementById(`${prefix}-firebase-config-wrap`);
        if(wrap) wrap.style.display=mode==='custom'?'block':'none';
        // Update visual button
        const sharedBtn=document.getElementById(`${prefix}-fb-shared-btn`);
        const customBtn=document.getElementById(`${prefix}-fb-custom-btn`);
        if(sharedBtn&&customBtn){
            if(mode==='shared'){
                sharedBtn.style.cssText='border:2px solid #3b82f6;background:#eff6ff;border-radius:10px;padding:10px 12px;text-align:center;';
                sharedBtn.querySelector('div').style.color='#1d4ed8';
                customBtn.style.cssText='border:2px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:10px 12px;text-align:center;';
                customBtn.querySelector('div').style.color='#475569';
            } else {
                customBtn.style.cssText='border:2px solid #7c3aed;background:#f5f3ff;border-radius:10px;padding:10px 12px;text-align:center;';
                customBtn.querySelector('div').style.color='#7c3aed';
                sharedBtn.style.cssText='border:2px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:10px 12px;text-align:center;';
                sharedBtn.querySelector('div').style.color='#475569';
            }
        }
    };