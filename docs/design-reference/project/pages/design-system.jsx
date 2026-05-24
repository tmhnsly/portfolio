// Design system — refactored to flex-column layout so sections never overlap.

const T_light = window.TOKENS.light;
const T_dark  = window.TOKENS.dark;
const D_ds    = window.DISCIPLINES_T;
const TYPE_ds = window.TYPE;

const DS_W = 1440;
const DS_H = 6700;

function DSSection({n, title, subtitle, children}) {
  const t = T_light;
  return (
    <div>
      <div style={{
        display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        paddingBottom:18, borderBottom:`1px solid ${t.rule}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>§ {n} — {title}</div>
          <h2 style={{
            margin:0, fontFamily:t.display, fontSize:42, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.05, color:t.text,
          }}>
            {title}<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        {subtitle && (
          <div style={{maxWidth:480, fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.5, textAlign:'right'}}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{marginTop:28}}>{children}</div>
    </div>
  );
}

function Label({children, t}) {
  return (
    <div style={{
      fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6,
    }}>{children}</div>
  );
}

function DSHero() {
  const t = T_light;
  return (
    <div>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:24, display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{width:10, height:10, borderRadius:'50%', background:t.accent,
          boxShadow:`0 0 0 4px ${t.accentGlow}`}} />
        <span>Design System · v1 · May 2026</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>Built on Radix Colors</span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'flex-end',
      }}>
        <div>
          <h1 style={{
            margin:0, fontFamily:t.display, fontSize:128, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text,
          }}>
            Visual<br/>
            language<span style={{color:t.accent}}>.</span>
          </h1>
          <p style={{
            margin:'24px 0 0', maxWidth:580, fontFamily:t.display,
            fontSize:19, lineHeight:1.5, color:t.textSoft, fontWeight:400,
          }}>
            Tokens, type, spacing and components for tomhinsley.com.
            Light + dark derive from the same semantic tokens; every page in
            the flow consumes this system.
          </p>
        </div>
        <div style={{paddingBottom:12, display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:6}}>
          {Object.entries(D_ds).map(([slug, d]) => (
            <div key={slug} style={{aspectRatio:'1/1.4', borderRadius:10, background:d.color, position:'relative',
              boxShadow:t.shadowMd}}>
              <div style={{position:'absolute', left:8, top:8, fontFamily:t.mono, fontSize:9, color:'#fff', letterSpacing:'0.06em'}}>/{slug}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----- Colors -----
function ModeChip({label, mode}) {
  return (
    <span style={{
      padding:'4px 10px', borderRadius:6,
      background: mode === 'dark' ? '#161615' : '#fff',
      color: mode === 'dark' ? '#ededec' : '#1c1b18',
      border:`1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(28,27,24,0.16)'}`,
      fontFamily:T_light.mono, fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase',
    }}>{label}</span>
  );
}

function ColorSwatch({name, value, mono, sample, dark}) {
  const onDark = dark === true;
  return (
    <div style={{
      display:'flex', flexDirection:'column', gap:6, padding:12, borderRadius:10,
      background: onDark ? 'rgba(40,40,38,0.5)' : 'rgba(255,253,247,0.5)',
      border:`1px solid ${onDark ? 'rgba(255,255,255,0.08)' : 'rgba(28,27,24,0.08)'}`,
    }}>
      <div style={{
        height:64, borderRadius:6, background: sample || value,
        boxShadow:onDark ? '0 4px 12px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)'
                         : '0 4px 12px rgba(28,27,24,0.06), inset 0 0 0 1px rgba(28,27,24,0.04)',
      }} />
      <div style={{
        fontFamily:T_light.display, fontSize:12, fontWeight:600, letterSpacing:'-0.01em',
        color: onDark ? '#ededec' : '#1c1b18',
      }}>{name}</div>
      <div style={{
        fontFamily:T_light.mono, fontSize:10,
        color: onDark ? 'rgba(237,237,236,0.55)' : 'rgba(28,27,24,0.55)',
        letterSpacing:'0.04em',
      }}>{mono || value}</div>
    </div>
  );
}

function ColorBlock({title, items}) {
  const t = T_light;
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'160px 1fr 1fr', gap:24, alignItems:'flex-start',
    }}>
      <div style={{paddingTop:8}}>
        <Label t={t}>Category</Label>
        <div style={{fontFamily:t.display, fontSize:20, fontWeight:600, letterSpacing:'-0.02em', color:t.text}}>{title}</div>
      </div>
      <div>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
          <ModeChip label="Light" mode="light" />
          <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.04em'}}>default</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
          {items.map((it, i) => (
            <ColorSwatch key={i} name={it.name} mono={it.lightMono || it.light} sample={it.light} />
          ))}
        </div>
      </div>
      <div>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
          <ModeChip label="Dark" mode="dark" />
          <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.04em'}}>prefers-color-scheme</span>
        </div>
        <div style={{padding:10, borderRadius:12, background:'#161615', border:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10}}>
            {items.map((it, i) => (
              <ColorSwatch key={i} name={it.name} mono={it.darkMono || it.dark} sample={it.dark} dark />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DSColors() {
  const t = T_light;
  const surfaces = [
    { name:'bg',       light:'#f0ece2',                lightMono:'#f0ece2',                dark:'#161615',                  darkMono:'#161615' },
    { name:'bgSubtle', light:'#ebe6d8',                lightMono:'#ebe6d8',                dark:'#1c1c1a',                  darkMono:'#1c1c1a' },
    { name:'surface',  light:'rgba(255,253,247,0.78)', lightMono:'rgba(255,253,247,0.78)', dark:'rgba(40,40,38,0.65)',      darkMono:'rgba(40,40,38,0.65)' },
  ];
  const inks = [
    { name:'text',      light:'#1c1b18',             dark:'#ededec' },
    { name:'textSoft',  light:'rgba(28,27,24,0.62)', dark:'rgba(237,237,236,0.62)' },
    { name:'textMuted', light:'rgba(28,27,24,0.42)', dark:'rgba(237,237,236,0.42)' },
  ];
  const accents = [
    { name:'accent · tomato9',       light:'#e54d2e', dark:'#e54d2e' },
    { name:'accentHover · tomato10',  light:'#dd4425', dark:'#ec6142' },
    { name:'accentSubtle · tomato4',  light:'#ffdcd3', dark:'#4e1511' },
  ];
  const borders = [
    { name:'ruleSoft',   light:'rgba(28,27,24,0.12)', dark:'rgba(255,255,255,0.08)' },
    { name:'rule',       light:'rgba(28,27,24,0.24)', dark:'rgba(255,255,255,0.16)' },
    { name:'ruleStrong', light:'rgba(28,27,24,0.36)', dark:'rgba(255,255,255,0.32)' },
  ];

  return (
    <DSSection n="01" title="Colors"
      subtitle="Semantic, mode-aware. Radix tomato is the primary accent. Each section also gets its own discipline colour (six Radix step-9 hues).">
      <div style={{display:'flex', flexDirection:'column', gap:40}}>
        <ColorBlock title="Surfaces" items={surfaces} />
        <ColorBlock title="Text"     items={inks} />
        <ColorBlock title="Borders"  items={borders} />
        <ColorBlock title="Accent"   items={accents} />

        <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:24, alignItems:'flex-start'}}>
          <div style={{paddingTop:8}}>
            <Label t={t}>Discipline accents</Label>
            <div style={{fontFamily:t.display, fontSize:20, fontWeight:600, letterSpacing:'-0.02em', color:t.text}}>Per-section</div>
            <div style={{marginTop:8, fontFamily:t.display, fontSize:13, color:t.textSoft, lineHeight:1.5}}>
              Each section gets its own colour identity for the page-level accent (CTA, period dots, eyebrow). Radix step 9 — same hex in light + dark.
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:10}}>
            {Object.entries(D_ds).map(([slug, d]) => (
              <div key={slug} style={{padding:12, borderRadius:10,
                background:'rgba(255,253,247,0.5)', border:'1px solid rgba(28,27,24,0.08)'}}>
                <div style={{height:80, borderRadius:6, background:d.color,
                  boxShadow:'0 4px 12px rgba(28,27,24,0.06), inset 0 0 0 1px rgba(28,27,24,0.04)'}} />
                <div style={{marginTop:8, fontFamily:t.display, fontSize:12, fontWeight:600, color:t.text}}>{d.label}</div>
                <div style={{fontFamily:t.mono, fontSize:10, color:t.textSoft, marginTop:2}}>{d.color}</div>
                <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, marginTop:1, textTransform:'lowercase'}}>{slug}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DSSection>
  );
}

// ----- Typography -----
function DSType() {
  const t = T_light;
  const rows = [
    { name:'displayXXL', size:156, weight:600, ls:'-0.045em', sample:'A digital creative,' },
    { name:'displayXL',  size:120, weight:600, ls:'-0.04em',  sample:'Boucle.' },
    { name:'displayL',   size:72,  weight:600, ls:'-0.04em',  sample:'Recent.' },
    { name:'display',    size:56,  weight:600, ls:'-0.035em', sample:'Get in touch.' },
    { name:'h1',         size:42,  weight:600, ls:'-0.03em',  sample:'A way to make noise.' },
    { name:'h2',         size:28,  weight:600, ls:'-0.025em', sample:'Tools don\u2019t need to be products.' },
    { name:'h3',         size:22,  weight:600, ls:'-0.02em',  sample:'Boucle — drum kit' },
    { name:'h4',         size:18,  weight:600, ls:'-0.018em', sample:'Project title' },
    { name:'bodyL',      size:19,  weight:400, ls:'0',        sample:'Frontend engineer by day.' },
    { name:'body',       size:16,  weight:400, ls:'0',        sample:'The most interesting software is the kind nobody talks about.' },
    { name:'bodyS',      size:14,  weight:500, ls:'-0.005em', sample:'Description, links, captions.' },
    { name:'caption',    size:13,  weight:500, ls:'-0.005em', sample:'Get in touch · Read the post →' },
  ];
  const monos = [
    { name:'mono',   size:12, weight:500, ls:'0.02em', sample:'/code · 24 projects · updated may 2026' },
    { name:'monoS',  size:11, weight:500, ls:'0.04em', sample:'§ 01 — Index · 91 in the archive' },
    { name:'monoXS', size:10, weight:500, ls:'0.14em', sample:'EYEBROW · LAST UPDATE 2026-05-24' },
  ];
  return (
    <DSSection n="02" title="Typography"
      subtitle="Space Grotesk for display + body. Space Mono for chrome, eyebrows and meta. Use weight 500–600 for emphasis; never bold body copy.">
      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:32, alignItems:'flex-start'}}>
        <div>
          <Label t={t}>Display + body · Space Grotesk</Label>
          <div style={{fontFamily:t.display, fontSize:42, fontWeight:600, lineHeight:1, color:t.text, letterSpacing:'-0.03em'}}>Aa Bb</div>
          <div style={{marginTop:12, fontFamily:t.mono, fontSize:11, color:t.textSoft, lineHeight:1.7}}>
            0123456789<br/>!&ldquo;§$%&amp;/()=?<br/>weights · 300 · 400 · 500 · 600 · 700
          </div>

          <div style={{marginTop:30}}>
            <Label t={t}>Mono · Space Mono</Label>
          </div>
          <div style={{fontFamily:t.mono, fontSize:38, fontWeight:500, lineHeight:1, color:t.text}}>Aa Bb</div>
          <div style={{marginTop:12, fontFamily:t.mono, fontSize:11, color:t.textSoft, lineHeight:1.7}}>
            0123456789<br/>!&ldquo;§$%&amp;/()=?<br/>weights · 400 · 700
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {rows.map((r) => (
            <div key={r.name} style={{
              display:'grid', gridTemplateColumns:'120px 80px 80px 1fr', gap:18, alignItems:'baseline',
              paddingBottom:12, borderBottom:`1px solid ${t.ruleSoft}`,
            }}>
              <span style={{fontFamily:t.mono, fontSize:11, color:t.text, letterSpacing:'0.04em'}}>{r.name}</span>
              <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>{r.size}px</span>
              <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>w{r.weight}</span>
              <span style={{
                fontFamily:t.display, fontSize:Math.min(r.size, 36), fontWeight:r.weight,
                letterSpacing:r.ls, lineHeight:1.1, color:t.text,
              }}>{r.sample}</span>
            </div>
          ))}
          <div style={{height:8}} />
          {monos.map((r) => (
            <div key={r.name} style={{
              display:'grid', gridTemplateColumns:'120px 80px 80px 1fr', gap:18, alignItems:'baseline',
              paddingBottom:12, borderBottom:`1px solid ${t.ruleSoft}`,
            }}>
              <span style={{fontFamily:t.mono, fontSize:11, color:t.text, letterSpacing:'0.04em'}}>{r.name}</span>
              <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>{r.size}px</span>
              <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>w{r.weight}</span>
              <span style={{
                fontFamily:t.mono, fontSize:Math.max(r.size, 11), fontWeight:r.weight,
                letterSpacing:r.ls, lineHeight:1.5, color:t.text,
              }}>{r.sample}</span>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}

// ----- Spacing -----
function DSSpacing() {
  const t = T_light;
  const steps = [['1',4],['2',8],['3',12],['4',16],['5',20],['6',24],['7',32],['8',40],['9',48],['10',56],['11',64],['12',80],['13',96],['14',128]];
  return (
    <DSSection n="03" title="Spacing"
      subtitle="4px base. space-4 (16) for component padding, space-8 (40) for section gaps, space-12 (80) for top-level rhythm.">
      <div style={{display:'flex', flexDirection:'column', gap:10, paddingTop:8}}>
        {steps.map(([name, px]) => (
          <div key={name} style={{
            display:'grid', gridTemplateColumns:'120px 140px 1fr', gap:18, alignItems:'center', minHeight:20,
          }}>
            <span style={{fontFamily:t.mono, fontSize:11, color:t.text, letterSpacing:'0.04em'}}>space-{name}</span>
            <span style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.04em'}}>{px}px / {(px/16).toFixed(2)}rem</span>
            <div style={{height:14, width:px, background:t.accent, borderRadius:2}} />
          </div>
        ))}
      </div>
    </DSSection>
  );
}

// ----- Radius -----
function DSRadius() {
  const t = T_light;
  const items = [['radius-xs',4],['radius-sm',6],['radius-md',8],['radius-lg',10],['radius-xl',14],['radius-2xl',18],['radius-3xl',24],['radius-full','999']];
  return (
    <DSSection n="04" title="Radius"
      subtitle="Pill nav uses 2xl (18). Card chrome uses xl (14). Inline chips use sm (6). Buttons use lg (10).">
      <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:14}}>
        {items.map(([name, r]) => (
          <div key={name} style={{display:'flex', flexDirection:'column', gap:8, alignItems:'center'}}>
            <div style={{
              width:'100%', aspectRatio:'1', borderRadius: r === '999' ? 999 : r,
              background:t.surface, border:`1px solid ${t.surfaceEdge}`, boxShadow:t.shadowSm, position:'relative',
            }}>
              {r === '999' && <div style={{
                position:'absolute', inset:8, borderRadius:999, border:`2px dashed ${t.accent}`, opacity:0.5,
              }} />}
            </div>
            <div style={{fontFamily:t.mono, fontSize:10, color:t.text, letterSpacing:'0.04em'}}>{name}</div>
            <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>{r === '999' ? 'pill' : `${r}px`}</div>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

// ----- Shadows -----
function DSShadow() {
  const t = T_light;
  const items = [
    { name:'shadow-sm',  spec:'0 4px 12px rgba(0,0,0,.06)',  shadow:t.shadowSm, desc:'Inline chrome, filter pills' },
    { name:'shadow-md',  spec:'0 12px 30px rgba(0,0,0,.08)', shadow:t.shadowMd, desc:'Nav pill, glass cards' },
    { name:'shadow-lg',  spec:'0 22px 50px rgba(0,0,0,.14)', shadow:t.shadowLg, desc:'Featured cards' },
    { name:'shadow-xl',  spec:'0 36px 70px rgba(0,0,0,.20)', shadow:t.shadowXl, desc:'Deck cards, focused content' },
  ];
  return (
    <DSSection n="05" title="Shadows"
      subtitle="Four tiers. Soft in light, deeper black in dark. Reserved for hierarchy — never hover-only.">
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20, paddingTop:14}}>
        {items.map((s) => (
          <div key={s.name} style={{display:'flex', flexDirection:'column', gap:14}}>
            <div style={{
              height:130, borderRadius:14, background:'#fff', boxShadow:s.shadow,
              border:`1px solid ${t.ruleSoft}`,
            }} />
            <div>
              <div style={{fontFamily:t.mono, fontSize:11, color:t.text, letterSpacing:'0.04em'}}>{s.name}</div>
              <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, marginTop:3, letterSpacing:'0.04em'}}>{s.spec}</div>
              <div style={{fontFamily:t.display, fontSize:12, color:t.textSoft, marginTop:6, lineHeight:1.45}}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

// ----- Components -----
function DSComponents() {
  const t = T_light;
  return (
    <DSSection n="06" title="Components"
      subtitle="Building blocks shared across the flow. Variants here translate 1:1 to props.">
      <div style={{display:'flex', flexDirection:'column', gap:36}}>
        <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:24, alignItems:'flex-start'}}>
          <div style={{paddingTop:8}}>
            <Label t={t}>Buttons</Label>
            <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, color:t.text, letterSpacing:'-0.02em'}}>Three variants</div>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:18, alignItems:'center'}}>
            <a style={{padding:'10px 16px', borderRadius:10, background:t.accent, color:'#fff', textDecoration:'none',
              fontFamily:t.display, fontWeight:600, fontSize:14, letterSpacing:'-0.005em', boxShadow:`0 6px 18px ${t.accent}44`}}>Primary →</a>
            <a style={{padding:'10px 16px', borderRadius:10, background:t.text, color:t.bg, textDecoration:'none',
              fontFamily:t.display, fontWeight:600, fontSize:14, letterSpacing:'-0.005em'}}>Secondary →</a>
            <a style={{padding:'10px 16px', borderRadius:10, background:'transparent', color:t.text, textDecoration:'none',
              border:`1px solid ${t.ruleSoft}`,
              fontFamily:t.display, fontWeight:600, fontSize:14, letterSpacing:'-0.005em'}}>Ghost</a>
            <button style={{width:38, height:38, borderRadius:10, border:'none',
              background:t.text, color:t.bg, fontFamily:t.mono, fontSize:14, cursor:'pointer'}}>→</button>
            <button style={{width:38, height:38, borderRadius:10, border:`1px solid ${t.ruleSoft}`,
              background:'rgba(255,253,247,0.55)', backdropFilter:'blur(12px)', fontFamily:t.mono, fontSize:14, color:t.text}}>←</button>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:24, alignItems:'flex-start'}}>
          <div style={{paddingTop:8}}>
            <Label t={t}>Chips &amp; tags</Label>
            <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, color:t.text, letterSpacing:'-0.02em'}}>Mono · pill · solid</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {['React','TypeScript','WebAudio','Logic Pro X','Ableton','Pro Tools','Final Cut Pro X','DaVinci','35mm','Portra 400'].map((tag, i) => (
                <window.TechChip key={i} label={tag} />
              ))}
            </div>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {Object.entries(D_ds).map(([slug, d]) => (
                <span key={slug} style={{
                  padding:'5px 12px', borderRadius:999, background:d.color, color:'#fff',
                  fontFamily:t.display, fontSize:12, fontWeight:600, letterSpacing:'-0.005em',
                }}>{d.label}</span>
              ))}
            </div>
            <div>
              <window.FilterPills items={[['All',12],['Code',4],['Music',2],['Sound',2],['Photo',2],['Video',1],['Blog',1]]} />
            </div>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:24, alignItems:'flex-start'}}>
          <div style={{paddingTop:8}}>
            <Label t={t}>Glass surface</Label>
            <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, color:t.text, letterSpacing:'-0.02em'}}>Base card</div>
            <div style={{fontFamily:t.display, fontSize:13, color:t.textSoft, lineHeight:1.5, marginTop:8}}>
              bg surface · border surfaceEdge<br/>blur 20–28 saturate 160–170<br/>shadow-md / shadow-lg
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
            <div style={{padding:'16px 18px', borderRadius:14,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(20px)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.85) inset, ${t.shadowSm}`}}>
              <div style={{display:'flex', alignItems:'center', gap:9, marginBottom:12}}>
                <span style={{width:10, height:10, borderRadius:'50%', background:D_ds.code.color}} />
                <span style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em'}}>/code</span>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
                {['React','TS','Three.js'].map((x,i)=><window.TechChip key={i} label={x} />)}
              </div>
            </div>
            <div style={{borderRadius:14,
              background:t.surface, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(28px)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.95) inset, ${t.shadowMd}`,
              padding:14, display:'flex', flexDirection:'column', gap:10}}>
              <div style={{aspectRatio:'4/3', borderRadius:10, background:D_ds.code.grad, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', inset:0,
                  background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
                <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:999,
                  background:'rgba(255,255,255,0.92)', color:t.text, fontSize:10, fontWeight:600}}>Code</div>
              </div>
              <div style={{fontFamily:t.display, fontSize:16, fontWeight:600, letterSpacing:'-0.02em'}}>Boucle</div>
            </div>
            <div style={{padding:'14px 18px', borderRadius:14,
              background:t.text, color:t.bg,
              display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:124,
              boxShadow:t.shadowMd}}>
              <div>
                <div style={{fontFamily:t.mono, fontSize:10, color:'rgba(240,236,226,0.6)', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:8}}>
                  Marquee tile
                </div>
                <div style={{fontFamily:t.display, fontSize:24, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.1}}>
                  Inverse surface
                </div>
              </div>
              <div style={{fontFamily:t.mono, fontSize:11, color:'rgba(240,236,226,0.6)', letterSpacing:'0.06em'}}>
                hello@tomhinsley.com →
              </div>
            </div>
          </div>
        </div>
      </div>
    </DSSection>
  );
}

// ----- Light + Dark preview -----
function DSModesPreview() {
  return (
    <DSSection n="07" title="Light + dark"
      subtitle="The same composition rendered in both modes. Discipline accents stay constant; surfaces, text and borders flip.">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, paddingTop:10}}>
        {[
          { mode:'light', bg:T_light.bg, text:T_light.text, soft:T_light.textSoft, accent:T_light.accent, label:'Light · default' },
          { mode:'dark',  bg:T_dark.bg,  text:T_dark.text,  soft:T_dark.textSoft,  accent:T_dark.accent,  label:'Dark · prefers-color-scheme: dark' },
        ].map((m) => (
          <div key={m.mode} style={{
            background:m.bg, borderRadius:18, padding:'28px 32px',
            border:`1px solid ${m.mode==='dark' ? 'rgba(255,255,255,0.08)' : 'rgba(28,27,24,0.08)'}`,
            color:m.text, minHeight:200,
          }}>
            <div style={{
              fontFamily:T_light.mono, fontSize:10, color:m.soft, letterSpacing:'0.16em', textTransform:'uppercase',
              marginBottom:14, display:'flex', alignItems:'center', gap:10,
            }}>
              <span style={{width:8, height:8, borderRadius:'50%', background:m.accent}} />
              {m.label}
            </div>
            <div style={{fontFamily:T_light.display, fontSize:46, fontWeight:600, letterSpacing:'-0.035em', lineHeight:0.95}}>
              A digital creative,<br/>
              <span style={{color:m.soft}}>based in</span> London<span style={{color:m.accent}}>.</span>
            </div>
            <div style={{marginTop:14, display:'flex', gap:6}}>
              {Object.entries(D_ds).map(([slug, d]) => (
                <span key={slug} style={{width:14, height:14, borderRadius:'50%', background:d.color}} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DSSection>
  );
}

function PageDesignSystem() {
  const t = T_light;
  return (
    <div style={{
      width: DS_W, height: DS_H, background: t.bg, color: t.text,
      position:'relative', overflow:'hidden', fontFamily: t.display,
    }}>
      <window.PageBg />
      <window.PageNav />
      {/* Flex column for sections — auto-spaced, no overlap */}
      <div style={{
        position:'absolute', top:120, left:40, right:40, bottom:380,
        display:'flex', flexDirection:'column', gap:80,
      }}>
        <DSHero />
        <DSColors />
        <DSType />
        <DSSpacing />
        <DSRadius />
        <DSShadow />
        <DSComponents />
        <DSModesPreview />
      </div>
      <window.PageFooter />
    </div>
  );
}

window.PageDesignSystem = PageDesignSystem;
window.DS_DIM = { w: DS_W, h: DS_H };
