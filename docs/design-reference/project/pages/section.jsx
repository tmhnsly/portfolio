// Section page — /code (template for any discipline)
// Hero with discipline title + tools row, filter pills, 3×3 grid of projects,
// "other disciplines" hint, footer.

const { THEME: t_sec, DISCIPLINES: D_sec, PageBg: PageBg_sec, PageNav: PageNav_sec,
        PageFooter: PageFooter_sec, TechChip: TechChip_sec, FilterPills: FilterPills_sec } = window;

const SEC_W = 1440;
const SEC_H = 2720;

const CODE_PROJECTS = [
  { n:'01', title:'Boucle',                  desc:'A generative drum kit in the browser',     tech:['React','TypeScript','WebAudio','Three.js'], date:'Mar 2026', grad:'linear-gradient(135deg, #dd4a2e, #6b1d1a)' },
  { n:'02', title:'Tide tables',             desc:'A small design system for a sea-side studio', tech:['TypeScript','Sanity','Storybook'],          date:'Dec 2025', grad:'linear-gradient(135deg, #d65a4a, #6e2218)' },
  { n:'03', title:'Site for L.',             desc:'A quiet portfolio for a friend',           tech:['Next.js','Sanity','Tailwind'],              date:'Oct 2025', grad:'linear-gradient(135deg, #c84830, #5e1c14)' },
  { n:'04', title:'Marble',                  desc:'A 3D toy that lives on a hill',            tech:['Three.js','R3F','GLSL'],                    date:'Aug 2025', grad:'linear-gradient(135deg, #b03e26, #441510)' },
  { n:'05', title:'Caustics',                desc:'Real-time underwater light shader',         tech:['WebGL','GLSL'],                             date:'Jul 2025', grad:'linear-gradient(135deg, #e85f3d, #832418)' },
  { n:'06', title:'Cycle',                   desc:'A small game made in a long weekend',      tech:['Godot','GDScript'],                         date:'Jun 2025', grad:'linear-gradient(135deg, #a44432, #3a160e)' },
  { n:'07', title:'snip',                    desc:'A tiny CLI for clipping useful URLs',      tech:['Node.js','TypeScript'],                     date:'May 2025', grad:'linear-gradient(135deg, #d05540, #5a1d16)' },
  { n:'08', title:'Studio site',             desc:'Marketing site for a friend\u2019s studio', tech:['Next.js','Sanity','Tailwind'],              date:'Mar 2025', grad:'linear-gradient(135deg, #c0432e, #4d160d)' },
  { n:'09', title:'Notes prototype',         desc:'A small notes app for capturing things quickly', tech:['React Native','Expo'],                date:'Feb 2025', grad:'linear-gradient(135deg, #be3f2c, #461410)' },
];

function SecHero() {
  const t = t_sec;
  return (
    <div style={{position:'absolute', left:40, right:40, top:120, height:560}}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:24, display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{width:10, height:10, borderRadius:'50%', background:D_sec.code.color,
          boxShadow:`0 0 0 4px rgba(221,74,46,0.18)`}} />
        <span>Section · /code · 24 projects</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>Updated Mar 2026</span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'end',
      }}>
        <div>
          <h1 style={{
            margin:0, fontFamily:t.display,
            fontSize:208, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600,
          }}>
            Code<span style={{color:D_sec.code.color}}>.</span>
          </h1>
          <p style={{
            margin:'24px 0 0', maxWidth:600, fontSize:20, color:t.inkSoft, lineHeight:1.5, fontWeight:400,
            fontFamily:t.display,
          }}>
            Production frontend, generative builds and the occasional creative
            experiment. Things I make on the web.
          </p>
        </div>
        <div style={{paddingBottom:16}}>
          <div style={{
            fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14,
          }}>Working with</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {['React','TypeScript','Next.js','Three.js','R3F','WebGL','GLSL','Tailwind','Sanity','Node.js','React Native','Godot','GDScript'].map((tag, i) =>
              <TechChip_sec key={i} label={tag} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecFilters() {
  const t = t_sec;
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:710,
      display:'flex', justifyContent:'space-between', alignItems:'center',
      paddingBottom:18, borderBottom:`1px solid ${t.ruleSoft}`,
    }}>
      <FilterPills_sec items={[['All',24],['Featured',5],['Web',12],['Generative',6],['Tools',4],['Experiments',4]]} />
      <div style={{
        display:'flex', alignItems:'center', gap:10, fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em',
      }}>
        <span>Sort:</span>
        <span style={{color:t.ink, padding:'4px 10px', border:`1px solid ${t.ruleSoft}`, borderRadius:6}}>Recent ↓</span>
      </div>
    </div>
  );
}

function ProjectCard({n, title, desc, tech, date, grad}) {
  const t = t_sec;
  return (
    <div style={{display:'flex', flexDirection:'column', gap:14}}>
      <div style={{
        aspectRatio:'4/3', borderRadius:14, background:grad,
        position:'relative', overflow:'hidden',
        boxShadow:'0 18px 38px rgba(13,14,18,0.14)',
      }}>
        <div style={{position:'absolute', inset:0,
          background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
        <div style={{position:'absolute', right:-8, bottom:-22,
          fontFamily:t.display, fontSize:160, color:'rgba(255,255,255,0.18)',
          fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{n}</div>
        <div style={{position:'absolute', left:14, top:14, padding:'4px 10px', borderRadius:999,
          background:'rgba(255,255,255,0.92)', color:t.ink, fontSize:11, fontWeight:600, letterSpacing:'-0.005em'}}>Code</div>
        <div style={{position:'absolute', right:14, top:14, display:'flex', gap:5}}>
          {D_sec.code.swatches.map((c, i) => (
            <span key={i} style={{width:11, height:11, borderRadius:'50%', background:c,
              border:'1px solid rgba(255,255,255,0.5)'}} />
          ))}
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:14,
        }}>
          <div style={{fontFamily:t.display, fontSize:22, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.15}}>{title}</div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, whiteSpace:'nowrap'}}>{date}</div>
        </div>
        <div style={{fontFamily:t.display, fontSize:14, color:t.inkSoft, lineHeight:1.4}}>{desc}</div>
        <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
          {tech.map((tag, i) => <TechChip_sec key={i} label={tag} />)}
        </div>
      </div>
    </div>
  );
}

function SecGrid() {
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:810,
      display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'40px 28px',
    }}>
      {CODE_PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
    </div>
  );
}

function SecOtherDisciplines() {
  const t = t_sec;
  const others = ['music','sound','photo','video','blog'];
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:2200,
      paddingTop:24, borderTop:`1px solid ${t.ruleSoft}`,
    }}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:16,
      }}>Also see</div>
      <div style={{display:'flex', gap:14}}>
        {others.map(slug => {
          const d = D_sec[slug];
          return (
            <div key={slug} style={{
              flex:1, padding:'18px 20px', borderRadius:14,
              background:'rgba(255,253,247,0.55)', border:'1px solid rgba(255,255,255,0.85)',
              backdropFilter:'blur(20px) saturate(160%)', WebkitBackdropFilter:'blur(20px) saturate(160%)',
              boxShadow:'0 1px 0 rgba(255,255,255,0.9) inset, 0 10px 24px rgba(13,14,18,0.08)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <span style={{width:10, height:10, borderRadius:'50%', background:d.color}} />
                <span style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em'}}>/{slug}</span>
              </div>
              <span style={{fontFamily:t.mono, fontSize:11, color:t.muted}}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageSection() {
  return (
    <div style={{
      width: SEC_W, height: SEC_H, background: t_sec.bg, color: t_sec.ink,
      position:'relative', overflow:'hidden', fontFamily: t_sec.display,
    }}>
      <PageBg_sec accentColor={D_sec.code.color} />
      <PageNav_sec active="code" accent={D_sec.code.color} />
      <SecHero />
      <SecFilters />
      <SecGrid />
      <SecOtherDisciplines />
      <PageFooter_sec />
    </div>
  );
}

window.PageSection = PageSection;
window.SEC_DIM = { w: SEC_W, h: SEC_H };
