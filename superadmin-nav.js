    const VALID_SECTIONS=['dashboard','sekolah','admin','monitoring','kendala'];
    function showSection(n){
        if(!VALID_SECTIONS.includes(n))n='dashboard';
        document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.mob-nav-item').forEach(x=>x.classList.remove('active'));
        document.getElementById('section-'+n).classList.add('active');
        document.getElementById('nav-'+n).classList.add('active');
        if(document.getElementById('mob-nav-'+n))document.getElementById('mob-nav-'+n).classList.add('active');
        const titles={dashboard:'Dashboard',sekolah:'Kelola Sekolah',admin:'Admin Sekolah',monitoring:'Monitoring Aktivitas',kendala:'Laporan Kendala'};
        const t=titles[n]||n;
        document.getElementById('topbar-title').textContent=t;
        if(document.getElementById('topbar-title-mob'))document.getElementById('topbar-title-mob').textContent=t;
        // Simpan posisi menu di URL hash
        history.replaceState(null,'','#'+n);
    }
    function toggleMobSidebar(){
        const sb=document.querySelector('.sidebar');
        const ov=document.getElementById('mob-sidebar-ov');
        const isOpen=sb.classList.contains('mob-open');
        if(isOpen){sb.classList.remove('mob-open');ov.classList.remove('open');}
        else{sb.classList.add('mob-open');ov.classList.add('open');}
    }
    function closeMobSidebar(){
        document.querySelector('.sidebar').classList.remove('mob-open');
        document.getElementById('mob-sidebar-ov').classList.remove('open');
    }
    function openModal(id){
        document.getElementById(id).classList.add('open');
        if(id==='modal-admin'&&window.updDrop)window.updDrop();
        if(id==='modal-admin'&&window.clrAD)window.clrAD();
        if(id==='modal-sekolah'&&window.clrSK)window.clrSK();
    }
    function closeModal(id){document.getElementById(id).classList.remove('open');}
    document.getElementById('topbar-date').textContent=new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

    // ── DARK MODE ──
    function applyTheme(dark){
        document.body.classList.toggle('dark', dark);
        document.getElementById('theme-icon-moon').style.display = dark ? 'none' : 'block';
        document.getElementById('theme-icon-sun').style.display  = dark ? 'block' : 'none';
    }
    function toggleTheme(){
        const dark = !document.body.classList.contains('dark');
        localStorage.setItem('sa_theme', dark ? 'dark' : 'light');
        applyTheme(dark);
    }
    // Apply saved theme on load
    applyTheme(localStorage.getItem('sa_theme') === 'dark');