// Home — mobile (390 wide). Single column. Hero stacked above deck (compact),
// then discipline scroller, then recent feed.

const { TOKENS: TK_hm, DISCIPLINES_T: D_hm, TechChip: Chip_hm } = window;
const HMW = 390;
const HMH = 2400;

function HMNav({t}) {
  return (
    <div style={{
      position:'absolute', top:16, left:16, right:16, height:48,
      padding:'8px 10px 8px 12px', borderRadius:14,
      background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)',
      boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily:t.display, fontSize:13, color:t.text, zIndex:10,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{
          width:26, height:26, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${t.accent}33`,
        }} />
        <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <button style={{
        width:36, height:32, borderRadius:8, border:'none', background:'transparent',
        display:'flex', flexDirection:'column', justifyContent:'center', gap:4, padding:'0 8px', cursor:'pointer',
      }}>
        <span style={{height:1.5, background:t.text}} />
        <span style={{height:1.5, background:t.text}} />
        <span style={{height:1.5, background:t.text}} />
      </button>
    </div>
  );
}

function HMHero({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:88}}>
      <div style={{
        fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase',
        marginBottom:14, display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{width:6, height:6, borderRadius:'50%', background:t.accent,
          boxShadow:`0 0 0 3px ${t.accentGlow}`}} />
        <span>Tom Hinsley · London</span>
      </div>
      <h1 style={{
        margin:0, fontFamily:t.display,
        fontSize:54, lineHeight:0.95, letterSpacing:'-0.04em', fontWeight:600, color:t.text,
      }}>
        Tom Hinsley,<br/>
        <span style={{color:t.textSoft, fontWeight:500}}>digital creative</span><span style={{color:t.accent}}>.</span>
      </h1>
      <p style={{
        margin:'18px 0 0', fontSize:15, color:t.textSoft, lineHeight:1.5, fontWeight:400, fontFamily:t.display,
      }}>
        Frontend engineer based in London. Side practices
        in music, sound, photography and film.
      </p>
    </div>
  );
}

function HMDeck({t}) {
  // Single visible card with stack hint below it
  const d = D_hm.code;
  return (
    <div style={{position:'absolute', left:16, right:16, top:550}}>
      <div style={{
        fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase',
        marginBottom:10, display:'flex', justifyContent:'space-between',
      }}>
        <span>Featured deck</span>
        <span>01 / 04</span>
      </div>
      <div style={{position:'relative', height:380}}>
        {/* peek back cards */}
        <div style={{
          position:'absolute', left:14, right:14, top:18, bottom:24,
          borderRadius:18, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
          opacity:0.55, transform:'scale(0.92)', boxShadow:t.shadowSm,
        }} />
        <div style={{
          position:'absolute', left:8, right:8, top:10, bottom:12,
          borderRadius:18, background:t.surface, border:`1px solid ${t.surfaceEdge}`,
          opacity:0.8, transform:'scale(0.96)', boxShadow:t.shadowMd,
        }} />
        {/* top card */}
        <div style={{
          position:'absolute', inset:0, borderRadius:18,
          background:t.surface, border:`1px solid ${t.surfaceEdge}`,
          backdropFilter:'blur(28px) saturate(170%)',
          boxShadow:`0 1px 0 rgba(255,255,255,0.95) inset, ${t.shadowXl}`,
          padding:10, display:'flex', flexDirection:'column', gap:10,
        }}>
          <div style={{flex:'1 1 auto', borderRadius:12, background:d.grad, position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', right:-10, bottom:-22,
              fontFamily:t.display, fontSize:140, color:'rgba(255,255,255,0.16)',
              fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>01</div>
            <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:999,
              background:'rgba(255,255,255,0.92)', color:'#1c1b18',
              fontSize:10, fontWeight:600, letterSpacing:'-0.005em'}}>Code</div>
            <div style={{position:'absolute', right:10, top:10, display:'flex', gap:4}}>
              {d.swatches.map((c, i) => (
                <span key={i} style={{width:9, height:9, borderRadius:'50%', background:c,
                  border:'1px solid rgba(255,255,255,0.5)'}} />
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:16, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, color:t.text}}>
              Boucle
            </div>
            <div style={{fontSize:12, fontWeight:400, color:t.textSoft, lineHeight:1.4, marginTop:3, marginBottom:8}}>
              A generative drum kit in the browser
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
              <div style={{display:'flex', gap:4, flexWrap:'wrap', overflow:'hidden'}}>
                {['React','TypeScript','WebAudio'].map((tag, i) => <Chip_hm key={i} label={tag} t={t} />)}
              </div>
              <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>Mar 26</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        marginTop:14, display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:12, borderTop:`1px solid ${t.ruleSoft}`,
      }}>
        <span style={{display:'flex', gap:4}}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{width: i===0 ? 18 : 6, height:4, borderRadius:2,
              background: i===0 ? t.text : t.ruleSoft}} />
          ))}
        </span>
        <div style={{display:'flex', gap:6}}>
          <button style={{width:32, height:32, borderRadius:8, border:`1px solid ${t.ruleSoft}`,
            background:t.surfaceSoft, backdropFilter:'blur(12px)',
            fontFamily:t.mono, fontSize:13, color:t.text}}>←</button>
          <button style={{width:32, height:32, borderRadius:8, border:'none',
            background:t.text, color:t.bg, fontFamily:t.mono, fontSize:13,
            boxShadow:t.shadowSm}}>→</button>
        </div>
      </div>
    </div>
  );
}

function HMDisciplines({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:1030}}>
      <div style={{
        fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase',
        marginBottom:10, display:'flex', alignItems:'center', gap:8,
      }}>
        <span>Explore by discipline</span>
        <span style={{width:18, height:1, background:t.ruleSoft}} />
        <span>Swipe →</span>
      </div>
      <div style={{position:'relative', overflow:'hidden'}}>
        <div style={{display:'flex', gap:10, paddingRight:60}}>
          {Object.entries(D_hm).map(([slug, d]) => (
            <div key={slug} style={{
              flex:'0 0 180px', height:118, borderRadius:12,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
              backdropFilter:'blur(16px) saturate(160%)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
              padding:'14px 14px', display:'flex', flexDirection:'column', justifyContent:'space-between',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{width:8, height:8, borderRadius:'50%', background:d.color}} />
                <span style={{fontFamily:t.display, fontSize:15, fontWeight:600, letterSpacing:'-0.02em', color:t.text}}>/{slug}</span>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
                {(slug==='code' ? ['React','TS'] : slug==='music' ? ['Logic','Ableton'] : slug==='sound' ? ['Pro Tools','Reaper'] : slug==='photo' ? ['35mm','Leica'] : slug==='video' ? ['Final Cut','DaVinci'] : ['Notes','Essays']).map((tag, i) => <Chip_hm key={i} label={tag} t={t} />)}
              </div>
            </div>
          ))}
        </div>
        <div style={{position:'absolute', right:0, top:0, bottom:0, width:50,
          background:'linear-gradient(to right, transparent, rgba(240,236,226,0.95))', pointerEvents:'none'}} />
      </div>
    </div>
  );
}

function HMRecent({t}) {
  const items = [
    { discipline:'code',  title:'Boucle',          desc:'A generative drum kit in the browser', tech:['React','TypeScript','WebAudio'], date:'Mar 2026', n:'01' },
    { discipline:'photo', title:'Lisbon',          desc:'A 35mm photo set',                     tech:['Portra 400','Leica M6'],          date:'Feb 2026', n:'02' },
    { discipline:'music', title:'Tape loops, vol. 3', desc:'Slow ambient recordings',           tech:['Logic Pro X','Ableton'],          date:'Jan 2026', n:'03' },
    { discipline:'video', title:'Walks',           desc:'A short film',                          tech:['Final Cut Pro X','DaVinci'],      date:'Apr 2026', n:'04' },
  ];
  return (
    <div style={{position:'absolute', left:16, right:16, top:1230}}>
      <div style={{paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`}}>
        <div style={{
          fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6,
        }}>Selected work</div>
        <h2 style={{margin:0, fontSize:36, lineHeight:0.95, letterSpacing:'-0.035em', fontWeight:600, fontFamily:t.display, color:t.text}}>
          Recent<span style={{color:t.accent}}>.</span>
        </h2>
      </div>
      {/* horizontal scrolling filter pills */}
      <div style={{marginTop:14, overflow:'hidden', position:'relative'}}>
        <div style={{display:'flex', gap:4, paddingRight:40}}>
          {[['All',12],['Code',4],['Music',2],['Sound',2],['Photo',2],['Video',1],['Blog',1]].map(([n, c], i) => (
            <span key={n} style={{
              padding:'7px 11px', borderRadius:8, fontFamily:t.display, fontSize:11, fontWeight:600,
              background: i===0 ? t.text : 'rgba(255,253,247,0.55)',
              color: i===0 ? '#fff' : t.text,
              border: i===0 ? 'none' : `1px solid ${t.ruleSoft}`, backdropFilter:'blur(10px)',
              display:'inline-flex', alignItems:'center', gap:4, whiteSpace:'nowrap', flexShrink:0,
            }}>{n} <span style={{opacity:0.55, fontFamily:t.mono, fontSize:9, fontWeight:400}}>{c}</span></span>
          ))}
        </div>
        <div style={{position:'absolute', right:0, top:0, bottom:0, width:30,
          background:'linear-gradient(to right, transparent, rgba(240,236,226,0.95))', pointerEvents:'none'}} />
      </div>
      {/* stacked cards */}
      <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:14}}>
        {items.map((p, i) => {
          const d = D_hm[p.discipline];
          return (
            <div key={i} style={{
              borderRadius:14, background:t.surface, border:`1px solid ${t.surfaceEdge}`,
              backdropFilter:'blur(16px) saturate(160%)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
              padding:10, display:'flex', flexDirection:'column', gap:10,
            }}>
              <div style={{aspectRatio:'16/9', borderRadius:10, background:d.grad, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', inset:0,
                  background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
                <div style={{position:'absolute', right:-6, bottom:-18,
                  fontFamily:t.display, fontSize:96, color:'rgba(255,255,255,0.16)',
                  fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{p.n}</div>
                <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:999,
                  background:'rgba(255,255,255,0.92)', color:'#1c1b18', fontSize:9, fontWeight:600}}>{d.label}</div>
              </div>
              <div style={{padding:'0 4px 4px'}}>
                <div style={{fontFamily:t.display, fontSize:15, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, color:t.text}}>
                  {p.title}
                </div>
                {p.desc && <div style={{fontFamily:t.display, fontSize:11, color:t.textSoft, lineHeight:1.4, marginTop:2, marginBottom:8}}>{p.desc}</div>}
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop: p.desc ? 0 : 6}}>
                  <div style={{display:'flex', gap:4, flexWrap:'wrap', overflow:'hidden'}}>
                    {p.tech.map((tag, ix) => <Chip_hm key={ix} label={tag} t={t} />)}
                  </div>
                  <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>{p.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop:18, paddingTop:12, borderTop:`1px solid ${t.ruleSoft}`,
        display:'flex', justifyContent:'space-between',
        fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.06em', textTransform:'uppercase',
      }}>
        <span>4 of 12 in feed</span>
        <span style={{color:t.text, fontFamily:t.display, fontSize:12, fontWeight:600, letterSpacing:'-0.005em', textTransform:'none'}}>Everything →</span>
      </div>
    </div>
  );
}

function HMFooter({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, bottom:20}}>
      <div style={{
        padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`,
        overflow:'hidden', whiteSpace:'nowrap',
      }}>
        <div style={{
          fontFamily:t.display, fontSize:36, fontWeight:600, letterSpacing:'-0.045em',
          display:'flex', alignItems:'center', gap:22, lineHeight:1, color:t.text,
        }}>
          <span>hello@tomhinsley.com</span>
          <span style={{color:t.accent}}>●</span>
          <span>London 51.5°N</span>
          <span style={{color:t.accent}}>●</span>
          <span>Open Sep 2026</span>
        </div>
      </div>
      <div style={{
        paddingTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18,
        fontSize:12, color:t.textSoft, lineHeight:1.6, fontFamily:t.display,
      }}>
        <div>
          <div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>
          <div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026 · v6.0</div>
          <div>No tracking.<br/>Just the work.</div>
        </div>
      </div>
    </div>
  );
}

function PageHomeMobile() {
  const t = TK_hm.light;
  return (
    <div style={{
      width: HMW, height: HMH, background: t.bg, color: t.text,
      position:'relative', overflow:'hidden', fontFamily: t.display,
    }}>
      <window.PageBg t={t} mode="light" />
      <HMNav t={t} />
      <HMHero t={t} />
      <HMDeck t={t} />
      <HMDisciplines t={t} />
      <HMRecent t={t} />
      <HMFooter t={t} />
    </div>
  );
}

window.PageHomeMobile = PageHomeMobile;
window.HM_DIM = { w: HMW, h: HMH };
