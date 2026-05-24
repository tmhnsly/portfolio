// Section /code — responsive (tablet 768, mobile 390)

const { TOKENS: TK_s, DISCIPLINES_T: D_s, TechChip: Chip_s, FilterPills: FP_s } = window;

const SECTION_PROJECTS = [
  { n:'01', title:'Boucle',         desc:'Generative drum kit in the browser',     tech:['React','TypeScript','WebAudio'],  date:'Mar 2026', grad:'linear-gradient(135deg, #dd4a2e, #6b1d1a)' },
  { n:'02', title:'Tide tables',    desc:'Design system for a sea-side studio',     tech:['TypeScript','Sanity'],            date:'Dec 2025', grad:'linear-gradient(135deg, #d65a4a, #6e2218)' },
  { n:'03', title:'Site for L.',    desc:'Quiet portfolio for a friend',            tech:['Next.js','Sanity'],               date:'Oct 2025', grad:'linear-gradient(135deg, #c84830, #5e1c14)' },
  { n:'04', title:'Marble',         desc:'3D toy that lives on a hill',             tech:['Three.js','R3F'],                 date:'Aug 2025', grad:'linear-gradient(135deg, #b03e26, #441510)' },
  { n:'05', title:'Caustics',       desc:'Real-time underwater shader',              tech:['WebGL','GLSL'],                   date:'Jul 2025', grad:'linear-gradient(135deg, #e85f3d, #832418)' },
  { n:'06', title:'Cycle',          desc:'Small game made in a weekend',            tech:['Godot','GDScript'],               date:'Jun 2025', grad:'linear-gradient(135deg, #a44432, #3a160e)' },
];

// ============================ TABLET ============================
const ST_W = 768, ST_H = 2520;

function STNav({t, ac}) {
  return (
    <div style={{position:'absolute', top:20, left:24, right:24, height:52,
      padding:'9px 12px 9px 14px', borderRadius:16,
      background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)',
      boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:28, height:28, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${ac} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${ac}33`}} />
        <span style={{fontSize:15, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', gap:2}}>
        {['Code','Music','Sound','Photo','Video','Blog','About'].map((n)=>(
          <span key={n} style={{padding:'7px 10px', borderRadius:8, fontSize:12, fontWeight:500,
            background:n==='Code'?t.text:'transparent', color:n==='Code'?t.bg:t.text}}>{n}</span>
        ))}
      </div>
      <a style={{padding:'8px 12px', borderRadius:8, background:ac, color:'#fff', textDecoration:'none',
        fontSize:12, fontWeight:600, boxShadow:`0 4px 14px ${ac}44`}}>hello@ →</a>
    </div>
  );
}

function STHero({t, ac}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:90}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:18, display:'flex', alignItems:'center', gap:10}}>
        <span style={{width:8, height:8, borderRadius:'50%', background:ac, boxShadow:`0 0 0 3px ${ac}33`}} />
        <span>Section · /code · 24 projects</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:120, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Code<span style={{color:ac}}>.</span>
      </h1>
      <p style={{margin:'18px 0 0', maxWidth:520, fontSize:16, color:t.textSoft, lineHeight:1.5, fontFamily:t.display}}>
        Production frontend, generative builds and the occasional creative experiment.
      </p>
      <div style={{marginTop:18, display:'flex', flexWrap:'wrap', gap:5}}>
        {['React','TypeScript','Next.js','Three.js','R3F','WebGL','GLSL','Tailwind','Sanity','Node.js','Godot'].map((tag, i) =>
          <Chip_s key={i} label={tag} t={t} />
        )}
      </div>
    </div>
  );
}

function STFilter({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:480,
      display:'flex', justifyContent:'space-between', alignItems:'center',
      paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`}}>
      <FP_s t={t} items={[['All',24],['Featured',5],['Web',12],['Gen',6]]} />
      <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.06em'}}>Recent ↓</span>
    </div>
  );
}

function STGrid({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:560,
      display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'28px 18px'}}>
      {SECTION_PROJECTS.map((p, i) => (
        <div key={i} style={{display:'flex', flexDirection:'column', gap:10}}>
          <div style={{aspectRatio:'4/3', borderRadius:12, background:p.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowMd}}>
            <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
            <div style={{position:'absolute', right:-6, bottom:-18, fontFamily:t.display, fontSize:120, color:'rgba(255,255,255,0.18)', fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{p.n}</div>
            <div style={{position:'absolute', left:10, top:10, padding:'3px 9px', borderRadius:999, background:'rgba(255,255,255,0.92)', color:t.text, fontSize:10, fontWeight:600}}>Code</div>
          </div>
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:10}}>
              <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.022em'}}>{p.title}</div>
              <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>{p.date}</div>
            </div>
            <div style={{fontFamily:t.display, fontSize:12, color:t.textSoft, lineHeight:1.4, marginTop:4, marginBottom:6}}>{p.desc}</div>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
              {p.tech.map((tag, ix) => <Chip_s key={ix} label={tag} t={t} />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function STAlsoSee({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:2080, paddingTop:18, borderTop:`1px solid ${t.ruleSoft}`}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:12}}>Also see</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8}}>
        {['music','sound','photo','video','blog'].map((slug) => {
          const d = D_s[slug];
          return (
            <div key={slug} style={{padding:'12px 14px', borderRadius:12,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(16px)',
              display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{width:8, height:8, borderRadius:'50%', background:d.color}} />
                <span style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>/{slug}</span>
              </div>
              <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function STFooter({t}) {
  const items = ['Tom Hinsley','●','hello@tomhinsley.com','●','London','●','Sep 2026'];
  return (
    <div style={{position:'absolute', left:24, right:24, bottom:24}}>
      <div style={{padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:46, fontWeight:600, letterSpacing:'-0.045em', display:'flex', alignItems:'center', gap:24, lineHeight:1, color:t.text}}>
          {[...items, ...items].map((it, i) => it==='●' ? <span key={i} style={{color:t.accent, fontSize:18}}>●</span> : <span key={i} style={i%7===4?{color:t.textSoft,fontWeight:500}:{}}>{it}</span>)}
        </div>
      </div>
      <div style={{paddingTop:18, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:24, fontSize:12, color:t.textSoft, lineHeight:1.6, fontFamily:t.display}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Tom Hinsley</div><div>Frontend engineer in London. Side practices in audio, photo, video &amp; blog.</div></div>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div><div>Code · Music · Sound<br/>Photo · Video · Blog</div></div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div><div>v6.0 · No tracking</div></div>
      </div>
    </div>
  );
}

function PageSectionTablet() {
  const t = TK_s.light;
  const ac = D_s.code.color;
  return (
    <div style={{width:ST_W, height:ST_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={ac} />
      <STNav t={t} ac={ac} />
      <STHero t={t} ac={ac} />
      <STFilter t={t} />
      <STGrid t={t} />
      <STAlsoSee t={t} />
      <STFooter t={t} />
    </div>
  );
}

// ============================ MOBILE ============================
const SM_W = 390, SM_H = 3200;

function SMNav({t, ac}) {
  return (
    <div style={{position:'absolute', top:16, left:16, right:16, height:48,
      padding:'8px 10px 8px 12px', borderRadius:14,
      background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)',
      boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:26, height:26, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${ac} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${ac}33`}} />
        <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <button style={{width:36, height:32, borderRadius:8, border:'none', background:'transparent',
        display:'flex', flexDirection:'column', justifyContent:'center', gap:4, padding:'0 8px', cursor:'pointer'}}>
        <span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} />
      </button>
    </div>
  );
}

function SMHero({t, ac}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:84}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase',
        marginBottom:14, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:6, height:6, borderRadius:'50%', background:ac, boxShadow:`0 0 0 3px ${ac}33`}} />
        <span>/code · 24 projects</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:90, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Code<span style={{color:ac}}>.</span>
      </h1>
      <p style={{margin:'14px 0 0', fontSize:14, color:t.textSoft, lineHeight:1.5, fontFamily:t.display}}>
        Production frontend, generative builds and creative experiments.
      </p>
      <div style={{marginTop:14, display:'flex', flexWrap:'wrap', gap:4}}>
        {['React','TypeScript','Next.js','Three.js','WebGL','Tailwind','Sanity','Godot'].map((tag, i) =>
          <Chip_s key={i} label={tag} t={t} />
        )}
      </div>
    </div>
  );
}

function SMFilters({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:430, position:'absolute'}}>
      <div style={{position:'relative', overflow:'hidden'}}>
        <div style={{display:'flex', gap:4, paddingRight:30}}>
          {[['All',24],['Featured',5],['Web',12],['Generative',6],['Tools',4],['Experiments',4]].map(([n, c], i) => (
            <span key={n} style={{padding:'7px 11px', borderRadius:8, fontSize:11, fontWeight:600, fontFamily:t.display,
              background: i===0 ? t.text : 'rgba(255,253,247,0.55)', color: i===0 ? '#fff' : t.text,
              border: i===0 ? 'none' : `1px solid ${t.ruleSoft}`, backdropFilter:'blur(10px)',
              display:'inline-flex', alignItems:'center', gap:4, whiteSpace:'nowrap', flexShrink:0}}>
              {n} <span style={{opacity:0.55, fontFamily:t.mono, fontSize:9, fontWeight:400}}>{c}</span>
            </span>
          ))}
        </div>
        <div style={{position:'absolute', right:0, top:0, bottom:0, width:30, background:'linear-gradient(to right, transparent, rgba(240,236,226,0.95))', pointerEvents:'none'}} />
      </div>
    </div>
  );
}

function SMGrid({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:500, display:'flex', flexDirection:'column', gap:18}}>
      {SECTION_PROJECTS.map((p, i) => (
        <div key={i} style={{borderRadius:14, background:t.surface, border:`1px solid ${t.surfaceEdge}`,
          backdropFilter:'blur(16px) saturate(160%)',
          boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`, padding:10}}>
          <div style={{aspectRatio:'16/9', borderRadius:10, background:p.grad, position:'relative', overflow:'hidden', marginBottom:10}}>
            <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
            <div style={{position:'absolute', right:-6, bottom:-18, fontFamily:t.display, fontSize:110, color:'rgba(255,255,255,0.18)', fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{p.n}</div>
            <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:999, background:'rgba(255,255,255,0.92)', color:t.text, fontSize:9, fontWeight:600}}>Code</div>
          </div>
          <div style={{padding:'0 4px 4px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8, marginBottom:4}}>
              <div style={{fontFamily:t.display, fontSize:16, fontWeight:600, letterSpacing:'-0.025em'}}>{p.title}</div>
              <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>{p.date}</div>
            </div>
            <div style={{fontFamily:t.display, fontSize:12, color:t.textSoft, lineHeight:1.4, marginBottom:6}}>{p.desc}</div>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
              {p.tech.map((tag, ix) => <Chip_s key={ix} label={tag} t={t} />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SMFooter({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, bottom:20}}>
      <div style={{padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:32, fontWeight:600, letterSpacing:'-0.045em', display:'flex', alignItems:'center', gap:22, lineHeight:1, color:t.text}}>
          <span>hello@tomhinsley.com</span><span style={{color:t.accent}}>●</span><span>London</span><span style={{color:t.accent}}>●</span><span>Sep 2026</span>
        </div>
      </div>
      <div style={{paddingTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, fontSize:11, color:t.textSoft, lineHeight:1.6, fontFamily:t.display}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div><div>Code · Music · Sound<br/>Photo · Video · Blog</div></div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div><div>v6.0 · No tracking</div></div>
      </div>
    </div>
  );
}

function PageSectionMobile() {
  const t = TK_s.light;
  const ac = D_s.code.color;
  return (
    <div style={{width:SM_W, height:SM_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={ac} />
      <SMNav t={t} ac={ac} />
      <SMHero t={t} ac={ac} />
      <SMFilters t={t} />
      <SMGrid t={t} />
      <SMFooter t={t} />
    </div>
  );
}

window.PageSectionTablet = PageSectionTablet;
window.PageSectionMobile = PageSectionMobile;
window.ST_DIM = {w:ST_W, h:ST_H};
window.SM_DIM = {w:SM_W, h:SM_H};
