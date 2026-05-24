// About /about — responsive (tablet 768, mobile 390). Scroll-revealed timeline.

const { TOKENS: TK_a, DISCIPLINES_T: D_a, TechChip: Chip_a } = window;

const TIMELINE = [
  { year:'2026 — now',  role:'Frontend Engineer',     place:'Research Lab · London', desc:'Building research interfaces and small tools. Working with the design team on a long-running internal system.', tags:['React','TypeScript','Three.js'], accent:'#dd4a2e' },
  { year:'2024 — 2026',  role:'Senior Frontend',       place:'Studio Z · London',     desc:'Two years building marketing sites, product surfaces and the occasional micro-tool. Set up the studio\u2019s component library.', tags:['Next.js','Sanity','Tailwind'], accent:'#3e63dd' },
  { year:'2022 — 2024',  role:'Frontend Developer',    place:'Agency Y · Berlin',     desc:'Joined a small studio in Mitte. Shipped a half-dozen identity sites, learned to draw clean React state diagrams.', tags:['React','Framer','Contentful'], accent:'#5b5bd6' },
  { year:'2020 — 2022',  role:'Designer / Developer',  place:'Independently · Remote', desc:'Freelance through the pandemic — building portfolios, brand sites, generative tools. Started teaching myself sound design.', tags:['Webflow','Vue.js','Ableton'], accent:'#ad7f58' },
  { year:'2018 — 2022',  role:'BA Digital Media',      place:'University Q · UK',     desc:'Half design, half code; thesis was a generative typography tool.', tags:['p5.js','Processing','Editorial'], accent:'#00a2c7' },
  { year:'2016 — 2018',  role:'First projects',         place:'Self-taught',           desc:'First paid site for a local restaurant. Learned git, css and how to invoice.', tags:['HTML','CSS','jQuery'], accent:'#46a758' },
];

// ============================ TABLET ============================
const AT_W = 768, AT_H = 3400;

function ATNav({t}) {
  return (
    <div style={{position:'absolute', top:20, left:24, right:24, height:52,
      padding:'9px 12px 9px 14px', borderRadius:16, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:28, height:28, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${t.accent}33`}} />
        <span style={{fontSize:15, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', gap:2}}>
        {['Code','Music','Sound','Photo','Video','Blog','About'].map((n)=>(
          <span key={n} style={{padding:'7px 10px', borderRadius:8, fontSize:12, fontWeight:500,
            background:n==='About'?t.text:'transparent', color:n==='About'?t.bg:t.text}}>{n}</span>
        ))}
      </div>
      <a style={{padding:'8px 12px', borderRadius:8, background:t.accent, color:'#fff', textDecoration:'none',
        fontSize:12, fontWeight:600}}>hello@ →</a>
    </div>
  );
}

function ATHero({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:90}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:18, display:'flex', alignItems:'center', gap:10}}>
        <span style={{width:7, height:7, borderRadius:'50%', background:t.accent, boxShadow:`0 0 0 3px ${t.accentGlow}`}} />
        <span>About · Tom Hinsley · London</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24, alignItems:'end'}}>
        <div style={{aspectRatio:'4/5', borderRadius:14, background:'linear-gradient(160deg, #dd4a2e, #5e1c14)', position:'relative', overflow:'hidden', boxShadow:t.shadowMd}}>
          <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 12px, transparent 12px 24px)`}} />
          <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:5, background:'rgba(13,14,18,0.7)', color:'#fff', fontFamily:t.mono, fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase'}}>Portrait · 2026</div>
        </div>
        <div>
          <h1 style={{margin:0, fontFamily:t.display, fontSize:78, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
            Tom Hinsley<span style={{color:t.accent}}>.</span>
          </h1>
          <p style={{margin:'16px 0 0', fontFamily:t.display, fontSize:16, lineHeight:1.4, color:t.textSoft, fontWeight:400}}>
            Trained as a designer, now a frontend engineer in London — with side practices in music, sound, photo, video and writing.
          </p>
        </div>
      </div>
    </div>
  );
}

function ATTimeline({t}) {
  const vis = [1, 1, 0.85, 0.55, 0.30, 0.12];
  const off = [0, 0, 8, 14, 22, 30];
  return (
    <div style={{position:'absolute', left:24, right:24, top:540}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24}}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:8}}>§ Career · scroll-revealed</div>
          <h2 style={{margin:0, fontSize:46, lineHeight:0.95, letterSpacing:'-0.035em', fontWeight:600, fontFamily:t.display}}>
            Where I&rsquo;ve been<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        <div style={{padding:'8px 12px', borderRadius:8, border:`1px solid ${t.ruleSoft}`, background:t.surfaceSoft,
          fontFamily:t.mono, fontSize:10, color:t.textSoft, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          ● Reveal on scroll
        </div>
      </div>
      <div style={{position:'relative', paddingTop:14}}>
        <div style={{position:'absolute', left:120 + 14 + 12, top:0, bottom:0, width:1, background:t.ruleSoft, transform:'translateX(-0.5px)'}} />
        {TIMELINE.map((e, i) => (
          <div key={i} style={{display:'grid', gridTemplateColumns:'120px 24px 1fr', gap:14, alignItems:'flex-start',
            opacity:vis[i], transform:`translateY(${off[i]}px)`, paddingBottom:36}}>
            <div style={{textAlign:'right', paddingTop:4, fontFamily:t.mono, fontSize:10, color:t.text, letterSpacing:'0.04em'}}>{e.year}</div>
            <div style={{position:'relative', display:'flex', justifyContent:'center', paddingTop:4}}>
              <span style={{width:12, height:12, borderRadius:'50%', background:e.accent,
                boxShadow:`0 0 0 3px rgba(13,14,18,0.05), 0 0 14px ${e.accent}55`, position:'relative', zIndex:2}} />
            </div>
            <div>
              <div style={{fontFamily:t.display, fontSize:20, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.15}}>
                {e.role} <span style={{color:t.textSoft, fontWeight:500}}>· {e.place}</span>
              </div>
              <p style={{margin:'8px 0 10px', fontFamily:t.display, fontSize:13, color:t.textSoft, lineHeight:1.5, fontWeight:400}}>{e.desc}</p>
              <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>{e.tags.map((tag, ix) => <Chip_a key={ix} label={tag} t={t} />)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ATContactCTA({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:3070}}>
      <div style={{padding:'32px 28px', borderRadius:18, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
        backdropFilter:'blur(20px)', boxShadow:t.shadowMd,
        display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0, fontFamily:t.display, fontSize:30, lineHeight:1, letterSpacing:'-0.03em', fontWeight:600}}>
          Working on something<br/>
          <span style={{color:t.textSoft, fontWeight:500}}>I should know about?</span>
        </h3>
        <a style={{padding:'14px 20px', borderRadius:10, background:t.accent, color:'#fff', textDecoration:'none',
          fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.005em'}}>hello@tomhinsley.com →</a>
      </div>
    </div>
  );
}

function ATFooter({t}) {
  const items = ['Tom Hinsley','●','hello@tomhinsley.com','●','London','●','Sep 2026'];
  return (
    <div style={{position:'absolute', left:24, right:24, bottom:24}}>
      <div style={{padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:46, fontWeight:600, letterSpacing:'-0.045em', display:'flex', gap:24, lineHeight:1, color:t.text}}>
          {[...items, ...items].map((it, i) => it==='●' ? <span key={i} style={{color:t.accent, fontSize:18}}>●</span> : <span key={i} style={i%7===4?{color:t.textSoft,fontWeight:500}:{}}>{it}</span>)}
        </div>
      </div>
      <div style={{paddingTop:18, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:24, fontSize:12, color:t.textSoft, fontFamily:t.display, lineHeight:1.6}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Tom Hinsley</div>Frontend engineer in London. Side practices in music, photo, video &amp; blog.</div>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div>v6.0 · No tracking</div>
      </div>
    </div>
  );
}

function PageAboutTablet() {
  const t = TK_a.light;
  return (
    <div style={{width:AT_W, height:AT_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" />
      <ATNav t={t} /><ATHero t={t} /><ATTimeline t={t} /><ATContactCTA t={t} /><ATFooter t={t} />
    </div>
  );
}

// ============================ MOBILE ============================
const AM_W = 390, AM_H = 3500;

function AMNav({t}) {
  return (
    <div style={{position:'absolute', top:16, left:16, right:16, height:48,
      padding:'8px 10px 8px 12px', borderRadius:14, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:26, height:26, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${t.accent}33`}} />
        <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <button style={{width:36, height:32, borderRadius:8, border:'none', background:'transparent', display:'flex', flexDirection:'column', justifyContent:'center', gap:4, padding:'0 8px'}}>
        <span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} />
      </button>
    </div>
  );
}

function AMHero({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:84}}>
      <div style={{aspectRatio:'4/3', borderRadius:14, background:'linear-gradient(160deg, #dd4a2e, #5e1c14)', position:'relative', overflow:'hidden', boxShadow:t.shadowMd, marginBottom:18}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 12px, transparent 12px 24px)`}} />
        <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:5, background:'rgba(13,14,18,0.7)', color:'#fff', fontFamily:t.mono, fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase'}}>Portrait · 2026</div>
      </div>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:6, height:6, borderRadius:'50%', background:t.accent, boxShadow:`0 0 0 3px ${t.accentGlow}`}} />
        About · London
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:62, lineHeight:0.88, letterSpacing:'-0.045em', fontWeight:600, color:t.text}}>
        Tom Hinsley<span style={{color:t.accent}}>.</span>
      </h1>
      <p style={{margin:'14px 0 0', fontFamily:t.display, fontSize:14, lineHeight:1.5, color:t.textSoft, fontWeight:400}}>
        Trained as a designer, now a frontend engineer in London — with side practices in music, sound, photo, video and writing.
      </p>
    </div>
  );
}

function AMTimeline({t}) {
  const vis = [1, 1, 0.85, 0.55, 0.30, 0.12];
  return (
    <div style={{position:'absolute', left:16, right:16, top:790}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>§ Career · scroll-revealed</div>
      <h2 style={{margin:0, fontSize:32, lineHeight:0.95, letterSpacing:'-0.03em', fontWeight:600, fontFamily:t.display, color:t.text, marginBottom:18}}>
        Where I&rsquo;ve been<span style={{color:t.accent}}>.</span>
      </h2>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute', left:6, top:6, bottom:0, width:1, background:t.ruleSoft}} />
        {TIMELINE.map((e, i) => (
          <div key={i} style={{paddingLeft:28, paddingBottom:26, opacity:vis[i], position:'relative'}}>
            <span style={{position:'absolute', left:0, top:6, width:13, height:13, borderRadius:'50%',
              background:e.accent, boxShadow:`0 0 0 3px rgba(13,14,18,0.05), 0 0 12px ${e.accent}55`}} />
            <div style={{fontFamily:t.mono, fontSize:9, color:t.text, letterSpacing:'0.04em', marginBottom:4}}>{e.year}</div>
            <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1.15}}>
              {e.role} <span style={{color:t.textSoft, fontWeight:500}}>· {e.place}</span>
            </div>
            <p style={{margin:'6px 0 8px', fontFamily:t.display, fontSize:12, color:t.textSoft, lineHeight:1.5}}>{e.desc}</p>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>{e.tags.map((tag, ix) => <Chip_a key={ix} label={tag} t={t} />)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AMContactCTA({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:3210}}>
      <div style={{padding:'22px 20px', borderRadius:14, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(20px)', boxShadow:t.shadowMd}}>
        <h3 style={{margin:0, fontFamily:t.display, fontSize:22, lineHeight:1.1, letterSpacing:'-0.025em', fontWeight:600}}>
          Working on something I should know about<span style={{color:t.accent}}>?</span>
        </h3>
        <a style={{display:'inline-block', marginTop:14, padding:'12px 16px', borderRadius:10, background:t.accent, color:'#fff', textDecoration:'none',
          fontFamily:t.display, fontSize:13, fontWeight:600}}>hello@tomhinsley.com →</a>
      </div>
    </div>
  );
}

function AMFooter({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, bottom:18}}>
      <div style={{padding:'12px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:30, fontWeight:600, letterSpacing:'-0.045em', display:'flex', gap:18, lineHeight:1, color:t.text}}>
          <span>hello@tomhinsley.com</span><span style={{color:t.accent}}>●</span><span>London</span>
        </div>
      </div>
      <div style={{paddingTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, fontSize:11, color:t.textSoft, fontFamily:t.display, lineHeight:1.6}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div>v6.0 · No tracking</div>
      </div>
    </div>
  );
}

function PageAboutMobile() {
  const t = TK_a.light;
  return (
    <div style={{width:AM_W, height:AM_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" />
      <AMNav t={t} /><AMHero t={t} /><AMTimeline t={t} /><AMContactCTA t={t} /><AMFooter t={t} />
    </div>
  );
}

window.PageAboutTablet = PageAboutTablet;
window.PageAboutMobile = PageAboutMobile;
window.AT_DIM = {w:AT_W, h:AT_H};
window.AM_DIM = {w:AM_W, h:AM_H};
