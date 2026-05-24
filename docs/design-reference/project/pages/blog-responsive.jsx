// Blog /blog and /blog/[slug] — responsive (tablet 768, mobile 390)

const { TOKENS: TK_b, DISCIPLINES_T: D_b, TechChip: Chip_b } = window;
const acB = D_b.blog.color;

const POSTS = [
  { date:'12 Apr 2026', cat:'Studio log',  title:'Studio log #04 — early 2026',                              excerpt:'A quarterly catch-up. What I shipped, what I shelved, and the small thing that surprised me about React 19.', read:'6 min', tags:['Studio log','Code','React'] },
  { date:'28 Mar 2026', cat:'Process',     title:'Notes on building tools that aren\u2019t startups',         excerpt:'In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow.',     read:'12 min', tags:['Process','Tools'] },
  { date:'14 Feb 2026', cat:'Photography', title:'Why I switched back to film for personal photography',     excerpt:'I sold my digital camera last year and replaced it with a Leica M6.',                                       read:'8 min', tags:['Photography','35mm','Leica'] },
  { date:'02 Feb 2026', cat:'Sound',       title:'A field recording from the kitchen',                       excerpt:'Brief notes on a thirty-minute recording of nothing happening in particular.',                                read:'4 min', tags:['Sound','Field rec'] },
  { date:'21 Dec 2025', cat:'Music',       title:'Three months with Logic Pro X',                            excerpt:'On switching from Ableton, the things that took me by surprise.',                                              read:'10 min', tags:['Music','Logic','Workflow'] },
];

// ============================ TABLET — INDEX ============================
const BIT_W = 768, BIT_H = 2700;

function BITNav({t}) {
  return (
    <div style={{position:'absolute', top:20, left:24, right:24, height:52,
      padding:'9px 12px 9px 14px', borderRadius:16, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:28, height:28, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${acB} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${acB}33`}} />
        <span style={{fontSize:15, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', gap:2}}>
        {['Code','Music','Sound','Photo','Video','Blog','About'].map((n)=>(
          <span key={n} style={{padding:'7px 10px', borderRadius:8, fontSize:12, fontWeight:500,
            background:n==='Blog'?t.text:'transparent', color:n==='Blog'?t.bg:t.text}}>{n}</span>
        ))}
      </div>
      <a style={{padding:'8px 12px', borderRadius:8, background:acB, color:'#fff', textDecoration:'none', fontSize:12, fontWeight:600, boxShadow:`0 4px 14px ${acB}44`}}>hello@ →</a>
    </div>
  );
}

function BITHero({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:90}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:18, display:'flex', alignItems:'center', gap:10}}>
        <span style={{width:8, height:8, borderRadius:'50%', background:acB, boxShadow:`0 0 0 3px ${acB}33`}} />
        <span>/blog · 17 posts · since 2024</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:120, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Blog<span style={{color:acB}}>.</span>
      </h1>
      <p style={{margin:'14px 0 0', maxWidth:520, fontFamily:t.display, fontSize:16, lineHeight:1.5, color:t.textSoft}}>
        Notes, essays and dev logs. Mostly about whatever I&rsquo;m currently chewing on.
      </p>
    </div>
  );
}

function BITFeatured({t}) {
  const p = POSTS[0];
  return (
    <div style={{position:'absolute', left:24, right:24, top:500}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:12, display:'flex', gap:10}}>
        <span style={{color:t.text}}>Latest</span><span style={{width:20, height:1, background:t.ruleSoft, marginTop:5}} /><span>{p.date} · {p.read}</span>
      </div>
      <div style={{aspectRatio:'16/8', borderRadius:14, background:D_b.blog.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowLg, marginBottom:14}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
        <div style={{position:'absolute', right:-10, bottom:-30, fontFamily:t.display, fontSize:200, color:'rgba(255,255,255,0.16)', fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>04</div>
        <div style={{position:'absolute', left:16, top:16, padding:'4px 10px', borderRadius:999, background:'rgba(255,255,255,0.92)', color:t.text, fontSize:11, fontWeight:600}}>{p.cat}</div>
      </div>
      <h2 style={{margin:0, fontFamily:t.display, fontSize:34, lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:600}}>{p.title}</h2>
      <p style={{margin:'10px 0', fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.5}}>{p.excerpt}</p>
      <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>{p.tags.map((tag, i) => <Chip_b key={i} label={tag} t={t} />)}</div>
    </div>
  );
}

function BITList({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:1430}}>
      <div style={{paddingBottom:14, borderBottom:`1px solid ${t.rule}`}}>
        <div style={{fontFamily:t.display, fontSize:24, fontWeight:600, letterSpacing:'-0.025em'}}>
          Older posts<span style={{color:acB}}>.</span>
        </div>
      </div>
      {POSTS.slice(1).map((p, i) => (
        <div key={i} style={{display:'grid', gridTemplateColumns:'90px 1fr 80px', gap:18, alignItems:'flex-start',
          padding:'18px 0', borderBottom:`1px solid ${t.ruleSoft}`}}>
          <div>
            <div style={{fontFamily:t.mono, fontSize:10, color:t.text, letterSpacing:'0.04em'}}>{p.date}</div>
            <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.12em', textTransform:'uppercase', marginTop:4}}>{p.cat}</div>
          </div>
          <div>
            <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, letterSpacing:'-0.022em', lineHeight:1.2}}>{p.title}</div>
            <p style={{margin:'8px 0 8px', fontFamily:t.display, fontSize:13, color:t.textSoft, lineHeight:1.5}}>{p.excerpt}</p>
            <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>{p.tags.map((tag, ix) => <Chip_b key={ix} label={tag} t={t} />)}</div>
          </div>
          <div style={{textAlign:'right', fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.06em'}}>
            {p.read}<br/><span style={{color:t.text, fontFamily:t.display, fontSize:12, fontWeight:600}}>read →</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BITFooter({t}) {
  const items = ['Tom Hinsley','●','hello@tomhinsley.com','●','London','●','Sep 2026'];
  return (
    <div style={{position:'absolute', left:24, right:24, bottom:24}}>
      <div style={{padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:46, fontWeight:600, letterSpacing:'-0.045em', display:'flex', gap:24, lineHeight:1, color:t.text}}>
          {[...items, ...items].map((it, i) => it==='●' ? <span key={i} style={{color:t.accent, fontSize:18}}>●</span> : <span key={i} style={i%7===4?{color:t.textSoft,fontWeight:500}:{}}>{it}</span>)}
        </div>
      </div>
      <div style={{paddingTop:18, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:24, fontSize:12, color:t.textSoft, fontFamily:t.display, lineHeight:1.6}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Tom Hinsley</div>Frontend engineer in London.</div>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div>v6.0 · No tracking</div>
      </div>
    </div>
  );
}

function PageBlogIndexTablet() {
  const t = TK_b.light;
  return (
    <div style={{width:BIT_W, height:BIT_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acB} />
      <BITNav t={t} /><BITHero t={t} /><BITFeatured t={t} /><BITList t={t} /><BITFooter t={t} />
    </div>
  );
}

// ============================ MOBILE — INDEX ============================
const BIM_W = 390, BIM_H = 2900;

function BIMNav({t}) {
  return (
    <div style={{position:'absolute', top:16, left:16, right:16, height:48,
      padding:'8px 10px 8px 12px', borderRadius:14, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:26, height:26, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${acB} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${acB}33`}} />
        <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <button style={{width:36, height:32, borderRadius:8, border:'none', background:'transparent', display:'flex', flexDirection:'column', justifyContent:'center', gap:4, padding:'0 8px'}}>
        <span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} />
      </button>
    </div>
  );
}

function BIMHero({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:84}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:12, display:'flex', gap:8}}>
        <span style={{width:6, height:6, borderRadius:'50%', background:acB, boxShadow:`0 0 0 3px ${acB}33`}} />
        /blog · 17 posts
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:90, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Blog<span style={{color:acB}}>.</span>
      </h1>
      <p style={{margin:'14px 0 0', fontFamily:t.display, fontSize:14, lineHeight:1.5, color:t.textSoft}}>
        Notes, essays and dev logs.
      </p>
    </div>
  );
}

function BIMList({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:420}}>
      {POSTS.map((p, i) => (
        <div key={i} style={{padding:'18px 0', borderBottom:`1px solid ${t.ruleSoft}`}}>
          <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.08em', marginBottom:6}}>
            {p.date} · {p.cat} · {p.read}
          </div>
          <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, marginBottom:8}}>{p.title}</div>
          <p style={{margin:'0 0 8px', fontFamily:t.display, fontSize:13, color:t.textSoft, lineHeight:1.5}}>{p.excerpt}</p>
          <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>{p.tags.map((tag, ix) => <Chip_b key={ix} label={tag} t={t} />)}</div>
        </div>
      ))}
    </div>
  );
}

function BIMFooter({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, bottom:18}}>
      <div style={{padding:'12px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:30, fontWeight:600, letterSpacing:'-0.045em', display:'flex', gap:18, lineHeight:1, color:t.text}}>
          <span>hello@tomhinsley.com</span><span style={{color:t.accent}}>●</span><span>London</span>
        </div>
      </div>
      <div style={{paddingTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, fontSize:11, color:t.textSoft, fontFamily:t.display, lineHeight:1.6}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div>v6.0</div>
      </div>
    </div>
  );
}

function PageBlogIndexMobile() {
  const t = TK_b.light;
  return (
    <div style={{width:BIM_W, height:BIM_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acB} />
      <BIMNav t={t} /><BIMHero t={t} /><BIMList t={t} /><BIMFooter t={t} />
    </div>
  );
}

// ============================ TABLET — POST ============================
const BPT_W = 768, BPT_H = 3500;

function BPTHero({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:90}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14}}>
        Home / <span style={{color:t.text}}>Blog</span> / <span style={{color:t.text}}>Notes on building tools</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:24}}>
        <span style={{padding:'5px 12px', borderRadius:999, background:acB, color:'#fff', fontSize:11, fontWeight:600}}>Process</span>
        <span style={{fontFamily:t.mono, fontSize:10, color:t.textSoft, letterSpacing:'0.06em'}}>28 Mar 2026 · 12 min</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:74, lineHeight:0.95, letterSpacing:'-0.04em', fontWeight:600, color:t.text}}>
        Notes on building<br/>tools that aren&rsquo;t startups<span style={{color:acB}}>.</span>
      </h1>
    </div>
  );
}

function BPTImg({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:530, height:360}}>
      <div style={{width:'100%', height:'100%', borderRadius:14, background:D_b.blog.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowLg}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 14px, transparent 14px 28px)`}} />
        <div style={{position:'absolute', right:-20, bottom:-40, fontFamily:t.display, fontSize:280, color:'rgba(255,255,255,0.14)', fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>02</div>
        <div style={{position:'absolute', left:18, top:18, padding:'4px 10px', borderRadius:6, background:'rgba(13,14,18,0.7)', color:'#fff', fontFamily:t.mono, fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase'}}>Fig. 01</div>
      </div>
    </div>
  );
}

function BPTBody({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:930, fontFamily:t.display, maxWidth:680, margin:'0 auto'}}>
      <p style={{margin:0, fontSize:22, lineHeight:1.4, fontWeight:500, color:t.text, letterSpacing:'-0.012em'}}>
        In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow.
      </p>
      <p style={{margin:'28px 0 0', fontSize:16, lineHeight:1.7, color:t.textSoft}}>
        A few months ago I started using a tiny CLI I wrote one weekend. It does one thing: it watches a folder for new image files, runs them through a Lightroom preset I configured once, and drops the results in a folder named after today&rsquo;s date.
      </p>
      <h2 style={{margin:'40px 0 0', fontFamily:t.display, fontSize:30, lineHeight:1.15, letterSpacing:'-0.03em', fontWeight:600, color:t.text}}>
        Tools don&rsquo;t need to be products<span style={{color:acB}}>.</span>
      </h2>
      <p style={{margin:'18px 0 0', fontSize:16, lineHeight:1.7, color:t.textSoft}}>
        The most interesting kind of software is the kind nobody talks about. Not the apps with the funding round and the launch tweet, but the tiny utilities one person built for one specific friction in their day.
      </p>
      <div style={{margin:'36px -16px', padding:'28px 32px', borderLeft:`3px solid ${acB}`, background:t.surfaceSoft, backdropFilter:'blur(14px)'}}>
        <p style={{margin:0, fontFamily:t.display, fontSize:24, lineHeight:1.3, letterSpacing:'-0.02em', fontWeight:500, color:t.text}}>
          &ldquo;The most interesting software is the kind nobody talks about.&rdquo;
        </p>
      </div>
      <p style={{margin:'24px 0 0', fontSize:16, lineHeight:1.7, color:t.textSoft}}>
        These tools have a different relationship with their maker than products do. A product owes its users patches, documentation, a roadmap. A tool owes its maker exactly what they decided it should do, no more.
      </p>
      <div style={{margin:'28px 0', padding:'16px 20px', borderRadius:8, background:'#1a1c22', color:'#e8e6e0', fontFamily:t.mono, fontSize:12, lineHeight:1.7}}>
        <div style={{color:'#a8b5a8'}}>$ snip https://github.com/...</div>
        <div style={{color:'#999b9f'}}>saved to: ~/.snips/2026-03-28-a8c1.md</div>
      </div>
    </div>
  );
}

function BPTEnd({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:2940, paddingTop:18, borderTop:`1px solid ${t.ruleSoft}`}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14}}>
        <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
          {['Process','Tools','Writing','Code'].map((tag, i) => <Chip_b key={i} label={tag} t={t} />)}
        </div>
        <a style={{padding:'8px 14px', borderRadius:8, border:`1px solid ${t.ruleSoft}`, background:t.surfaceSoft, fontFamily:t.display, fontSize:13, fontWeight:600, color:t.text, textDecoration:'none'}}>Send a note ↗</a>
      </div>
      <div style={{marginTop:18, padding:'14px 18px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.ruleSoft}`, display:'grid', gridTemplateColumns:'40px 1fr auto', gap:14, alignItems:'center'}}>
        <div style={{width:40, height:40, borderRadius:'50%', background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`}} />
        <div>
          <div style={{fontFamily:t.display, fontSize:14, fontWeight:600}}>Tom Hinsley</div>
          <div style={{fontFamily:t.display, fontSize:12, color:t.textSoft}}>A digital creative in London.</div>
        </div>
        <a style={{padding:'6px 12px', borderRadius:6, border:`1px solid ${t.ruleSoft}`, fontFamily:t.display, fontSize:12, fontWeight:600, color:t.text}}>About →</a>
      </div>
    </div>
  );
}

function PageBlogPostTablet() {
  const t = TK_b.light;
  return (
    <div style={{width:BPT_W, height:BPT_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acB} />
      <BITNav t={t} /><BPTHero t={t} /><BPTImg t={t} /><BPTBody t={t} /><BPTEnd t={t} /><BITFooter t={t} />
    </div>
  );
}

// ============================ MOBILE — POST ============================
const BPM_W = 390, BPM_H = 3600;

function BPMHero({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:84}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:12}}>
        Home / <span style={{color:t.text}}>Blog</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:18}}>
        <span style={{padding:'4px 10px', borderRadius:999, background:acB, color:'#fff', fontSize:10, fontWeight:600}}>Process</span>
        <span style={{fontFamily:t.mono, fontSize:9, color:t.textSoft}}>28 Mar 26 · 12 min</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:42, lineHeight:1, letterSpacing:'-0.035em', fontWeight:600, color:t.text}}>
        Notes on building tools that aren&rsquo;t startups<span style={{color:acB}}>.</span>
      </h1>
    </div>
  );
}

function BPMImg({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:430, aspectRatio:'16/10'}}>
      <div style={{width:'100%', height:'100%', borderRadius:12, background:D_b.blog.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowMd}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 14px, transparent 14px 28px)`}} />
        <div style={{position:'absolute', left:12, top:12, padding:'3px 8px', borderRadius:6, background:'rgba(13,14,18,0.7)', color:'#fff', fontFamily:t.mono, fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase'}}>Fig. 01</div>
      </div>
    </div>
  );
}

function BPMBody({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:700, fontFamily:t.display}}>
      <p style={{margin:0, fontSize:17, lineHeight:1.45, fontWeight:500, color:t.text, letterSpacing:'-0.01em'}}>
        In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow.
      </p>
      <p style={{margin:'18px 0 0', fontSize:14, lineHeight:1.7, color:t.textSoft}}>
        A few months ago I started using a tiny CLI I wrote one weekend. It does one thing: it watches a folder for new image files, runs them through a Lightroom preset, and drops the results in a folder named after today&rsquo;s date.
      </p>
      <h2 style={{margin:'24px 0 0', fontFamily:t.display, fontSize:22, lineHeight:1.2, letterSpacing:'-0.025em', fontWeight:600, color:t.text}}>
        Tools don&rsquo;t need to be products<span style={{color:acB}}>.</span>
      </h2>
      <p style={{margin:'12px 0 0', fontSize:14, lineHeight:1.7, color:t.textSoft}}>
        The most interesting kind of software is the kind nobody talks about. Not the apps with funding rounds, but the tiny utilities one person built for one specific friction in their day.
      </p>
      <div style={{margin:'22px -8px', padding:'18px 20px', borderLeft:`3px solid ${acB}`, background:t.surfaceSoft, backdropFilter:'blur(14px)'}}>
        <p style={{margin:0, fontFamily:t.display, fontSize:17, lineHeight:1.3, letterSpacing:'-0.015em', fontWeight:500, color:t.text}}>
          &ldquo;The most interesting software is the kind nobody talks about.&rdquo;
        </p>
      </div>
      <p style={{margin:'16px 0 0', fontSize:14, lineHeight:1.7, color:t.textSoft}}>
        These tools have a different relationship with their maker than products do. A product owes its users patches, documentation, a roadmap. A tool owes its maker exactly what they decided it should do.
      </p>
      <div style={{margin:'20px 0', padding:'12px 14px', borderRadius:8, background:'#1a1c22', color:'#e8e6e0', fontFamily:t.mono, fontSize:11, lineHeight:1.6}}>
        <div style={{color:'#a8b5a8'}}>$ snip https://...</div>
        <div style={{color:'#999b9f'}}>saved to: ~/.snips/...</div>
      </div>
    </div>
  );
}

function BPMEnd({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:3050, paddingTop:14, borderTop:`1px solid ${t.ruleSoft}`}}>
      <div style={{display:'flex', gap:4, flexWrap:'wrap', marginBottom:14}}>
        {['Process','Tools','Writing'].map((tag, i) => <Chip_b key={i} label={tag} t={t} />)}
      </div>
      <div style={{padding:'12px 14px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.ruleSoft}`, display:'grid', gridTemplateColumns:'36px 1fr', gap:12, alignItems:'center'}}>
        <div style={{width:36, height:36, borderRadius:'50%', background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`}} />
        <div>
          <div style={{fontFamily:t.display, fontSize:13, fontWeight:600}}>Tom Hinsley</div>
          <div style={{fontFamily:t.display, fontSize:11, color:t.textSoft}}>A digital creative in London.</div>
        </div>
      </div>
    </div>
  );
}

function PageBlogPostMobile() {
  const t = TK_b.light;
  return (
    <div style={{width:BPM_W, height:BPM_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acB} />
      <BIMNav t={t} /><BPMHero t={t} /><BPMImg t={t} /><BPMBody t={t} /><BPMEnd t={t} /><BIMFooter t={t} />
    </div>
  );
}

window.PageBlogIndexTablet = PageBlogIndexTablet;
window.PageBlogIndexMobile = PageBlogIndexMobile;
window.PageBlogPostTablet = PageBlogPostTablet;
window.PageBlogPostMobile = PageBlogPostMobile;
window.BIT_DIM = {w:BIT_W, h:BIT_H};
window.BIM_DIM = {w:BIM_W, h:BIM_H};
window.BPT_DIM = {w:BPT_W, h:BPT_H};
window.BPM_DIM = {w:BPM_W, h:BPM_H};
