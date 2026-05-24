// Home — tablet (768 wide). Two-column hero (narrower), 2-col recent,
// compact discipline scroller, 3-col footer.

const { TOKENS: TK_ht, DISCIPLINES_T: D_ht, TechChip: Chip_ht, FilterPills: FP_ht } = window;
const HTW = 768;
const HTH = 2300;

function HTNav({t}) {
  return (
    <div style={{
      position:'absolute', top:20, left:24, right:24, height:52,
      padding:'9px 12px 9px 14px', borderRadius:16,
      background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)',
      boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily:t.display, fontSize:13, color:t.text, zIndex:10,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{
          width:28, height:28, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${t.accent}33`,
        }} />
        <span style={{fontSize:15, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:2}}>
        {['Code','Music','Sound','Photo','Video','Blog','About'].map((n) => (
          <span key={n} style={{
            padding:'7px 10px', borderRadius:8, fontWeight:500, letterSpacing:'-0.005em', fontSize:12,
          }}>{n}</span>
        ))}
      </div>
      <a style={{
        padding:'8px 12px', borderRadius:8, background:t.accent, color:'#fff', textDecoration:'none',
        fontWeight:600, fontSize:12, letterSpacing:'-0.005em', boxShadow:`0 4px 14px ${t.accent}44`,
      }}>hello@ →</a>
    </div>
  );
}

function HTCard({t, discipline, n, title, desc, tech, date, rotate=0, x=0, y=0, scale=1, z=1, opacity=1, blur=0}) {
  const d = D_ht[discipline];
  return (
    <div style={{
      position:'absolute', inset:0,
      transform:`translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
      transformOrigin:'50% 95%', zIndex:z, opacity, filter: blur ? `blur(${blur}px)` : 'none',
    }}>
      <div style={{
        width:'100%', height:'100%', borderRadius:16,
        background:t.surface, border:`1px solid ${t.surfaceEdge}`,
        backdropFilter:'blur(28px) saturate(170%)',
        boxShadow:`0 1px 0 rgba(255,255,255,0.95) inset, ${t.shadowLg}`,
        padding:10, display:'flex', flexDirection:'column', gap:10,
      }}>
        <div style={{flex:'1 1 auto', borderRadius:12, background:d.grad, position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', right:-8, bottom:-22,
            fontFamily:t.display, fontSize:130, color:'rgba(255,255,255,0.16)',
            fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{n}</div>
          <div style={{position:'absolute', left:10, top:10, padding:'3px 9px', borderRadius:999,
            background:'rgba(255,255,255,0.92)', color:'#1c1b18',
            fontSize:10, fontWeight:600, letterSpacing:'-0.005em'}}>{d.label}</div>
        </div>
        <div style={{padding:'0 4px'}}>
          <div style={{fontSize:14, fontWeight:600, letterSpacing:'-0.022em', lineHeight:1.2, color:t.text}}>{title}</div>
          {desc && <div style={{fontSize:11, fontWeight:400, color:t.textSoft, lineHeight:1.35, marginTop:2, marginBottom:6}}>{desc}</div>}
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop: desc ? 0 : 6}}>
            <div style={{display:'flex', gap:4, overflow:'hidden'}}>
              {tech.slice(0,2).map((tag, i) => <Chip_ht key={i} label={tag} t={t} />)}
            </div>
            <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HTDeck({t}) {
  const cards = [
    { discipline:'code',  n:'01', title:'Boucle',          desc:'A generative drum kit',          tech:['React','TS'], date:'Mar 26' },
    { discipline:'music', n:'02', title:'Tape loops, vol. 3', desc:'Slow ambient recordings',     tech:['Logic','Ableton'], date:'Jan 26' },
    { discipline:'photo', n:'03', title:'Lisbon',           desc:'A 35mm photo set',               tech:['Portra','Leica'], date:'Feb 26' },
    { discipline:'video', n:'04', title:'Walks',            desc:'A short film',                    tech:['FC Pro','DaVinci'], date:'Apr 26' },
  ];
  return (
    <div style={{position:'relative', width:'100%', height:'100%'}}>
      <HTCard t={t} {...cards[3]} rotate={-3} x={-12} y={22} scale={0.9} z={1} opacity={0.5} blur={1.2} />
      <HTCard t={t} {...cards[2]} rotate={-1.5} x={-6} y={12} scale={0.95} z={2} opacity={0.78} />
      <HTCard t={t} {...cards[1]} rotate={1.5} x={6} y={6} scale={0.98} z={3} opacity={0.94} />
      <HTCard t={t} {...cards[0]} z={4} />
    </div>
  );
}

function HTHero({t}) {
  return (
    <div style={{
      position:'absolute', left:24, right:24, top:90, height:560,
      display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:24,
    }}>
      <div style={{padding:'30px 0 12px'}}>
        <div style={{
          fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
          marginBottom:18, display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{width:7, height:7, borderRadius:'50%', background:t.accent,
            boxShadow:`0 0 0 3px ${t.accentGlow}`}} />
          <span>Tom Hinsley · London</span>
        </div>
        <h1 style={{
          margin:0, fontFamily:t.display,
          fontSize:74, lineHeight:0.94, letterSpacing:'-0.045em', fontWeight:600, textWrap:'pretty', color:t.text,
        }}>
          Tom Hinsley,<br/>
          <span style={{color:t.textSoft, fontWeight:500}}>digital creative</span><span style={{color:t.accent}}>.</span>
        </h1>
        <p style={{
          margin:'22px 0 0', maxWidth:380, fontSize:15, color:t.textSoft, lineHeight:1.55, fontWeight:400, fontFamily:t.display,
        }}>
          Frontend engineer based in London. Side practices in
          music, sound, photography and film.
        </p>
      </div>
      <div style={{padding:'30px 0 12px', display:'flex', flexDirection:'column'}}>
        <div style={{
          fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
          marginBottom:10, display:'flex', justifyContent:'space-between',
        }}>
          <span>Featured</span>
          <span>01 / 04</span>
        </div>
        <div style={{position:'relative', height:340}}>
          <HTDeck t={t} />
        </div>
        <div style={{
          marginTop:14, display:'flex', justifyContent:'space-between', alignItems:'center',
          paddingTop:12, borderTop:`1px solid ${t.ruleSoft}`,
        }}>
          <span style={{display:'flex', gap:4}}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{width: i===0 ? 16 : 5, height:4, borderRadius:2,
                background: i===0 ? t.text : t.ruleSoft}} />
            ))}
          </span>
          <div style={{display:'flex', gap:6}}>
            <button style={{width:30, height:30, borderRadius:8, border:`1px solid ${t.ruleSoft}`,
              background:t.surfaceSoft, backdropFilter:'blur(10px)',
              fontFamily:t.mono, fontSize:12, color:t.text}}>←</button>
            <button style={{width:30, height:30, borderRadius:8, border:'none',
              background:t.text, color:t.bg, fontFamily:t.mono, fontSize:12, boxShadow:t.shadowSm}}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HTDisciplines({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:680}}>
      <div style={{
        fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:12, display:'flex', alignItems:'center', gap:10,
      }}>
        <span>Explore by discipline</span>
        <span style={{width:20, height:1, background:t.ruleSoft}} />
        <span>Scroll →</span>
      </div>
      <div style={{position:'relative', overflow:'hidden'}}>
        <div style={{display:'flex', gap:10, paddingRight:80}}>
          {Object.entries(D_ht).map(([slug, d]) => (
            <div key={slug} style={{
              flex:'0 0 200px', height:130, borderRadius:12,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
              backdropFilter:'blur(16px) saturate(160%)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
              padding:'14px 14px', display:'flex', flexDirection:'column', justifyContent:'space-between',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{width:8, height:8, borderRadius:'50%', background:d.color}} />
                <span style={{fontFamily:t.display, fontSize:16, fontWeight:600, letterSpacing:'-0.02em', color:t.text}}>/{slug}</span>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
                {(slug==='code' ? ['React','TS','Three.js'] : slug==='music' ? ['Logic','Ableton'] : slug==='sound' ? ['Pro Tools','Reaper'] : slug==='photo' ? ['35mm','Portra'] : slug==='video' ? ['FC Pro','DaVinci'] : ['Notes','Essays']).map((tag, i) => <Chip_ht key={i} label={tag} t={t} />)}
              </div>
            </div>
          ))}
        </div>
        <div style={{position:'absolute', right:0, top:0, bottom:0, width:60,
          background:'linear-gradient(to right, transparent, rgba(240,236,226,0.95))', pointerEvents:'none'}} />
      </div>
    </div>
  );
}

function HTRecent({t}) {
  const items = [
    { discipline:'code',  title:'Boucle',          desc:'A generative drum kit in the browser', tech:['React','TS','WebAudio'], date:'Mar 26', n:'01', span:2 },
    { discipline:'photo', title:'Lisbon',          desc:'A 35mm photo set',                     tech:['Portra','Leica M6'],     date:'Feb 26', n:'02' },
    { discipline:'music', title:'Tape loops, vol. 3', desc:'Slow ambient recordings',          tech:['Logic','Ableton'],       date:'Jan 26', n:'03' },
    { discipline:'video', title:'Walks',           desc:'A short film',                          tech:['FC Pro','DaVinci'],      date:'Apr 26', n:'04' },
  ];
  return (
    <div style={{position:'absolute', left:24, right:24, top:870}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:6,
          }}>Selected work</div>
          <h2 style={{margin:0, fontSize:48, lineHeight:0.95, letterSpacing:'-0.04em', fontWeight:600, fontFamily:t.display, color:t.text}}>
            Recent<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        <FP_ht t={t} items={[['All',12],['Code',4],['Audio',5],['Visual',3]]} />
      </div>
      <div style={{marginTop:20, display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14}}>
        {items.map((p, i) => {
          const d = D_ht[p.discipline];
          return (
            <div key={i} style={{
              gridColumn: p.span === 2 ? 'span 2' : 'span 1',
              borderRadius:14, background:t.surface, border:`1px solid ${t.surfaceEdge}`,
              backdropFilter:'blur(20px) saturate(160%)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowMd}`,
              padding:12, display:'flex', flexDirection:'column', gap:10,
            }}>
              <div style={{aspectRatio: p.span===2 ? '16/8' : '4/3', borderRadius:10, background:d.grad,
                position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', inset:0,
                  background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
                <div style={{position:'absolute', right:-8, bottom:-22,
                  fontFamily:t.display, fontSize:p.span===2 ? 150 : 96, color:'rgba(255,255,255,0.16)',
                  fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{p.n}</div>
                <div style={{position:'absolute', left:10, top:10, padding:'3px 9px', borderRadius:999,
                  background:'rgba(255,255,255,0.92)', color:'#1c1b18', fontSize:10, fontWeight:600}}>{d.label}</div>
              </div>
              <div style={{padding:'0 4px'}}>
                <div style={{fontFamily:t.display, fontSize:16, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, color:t.text}}>
                  {p.title}
                </div>
                {p.desc && <div style={{fontFamily:t.display, fontSize:12, color:t.textSoft, lineHeight:1.4, marginTop:3, marginBottom:8}}>{p.desc}</div>}
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop: p.desc ? 0 : 6}}>
                  <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                    {p.tech.map((tag, ix) => <Chip_ht key={ix} label={tag} t={t} />)}
                  </div>
                  <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, whiteSpace:'nowrap'}}>{p.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HTFooter({t}) {
  const items = ['Tom Hinsley', '●', 'hello@tomhinsley.com', '●', 'London', '●', 'Sep 2026'];
  return (
    <div style={{position:'absolute', left:24, right:24, bottom:24}}>
      <div style={{
        padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`,
        overflow:'hidden', whiteSpace:'nowrap',
      }}>
        <div style={{
          fontFamily:t.display, fontSize:46, fontWeight:600, letterSpacing:'-0.045em',
          display:'flex', alignItems:'center', gap:24, lineHeight:1, color:t.text,
        }}>
          {[...items, ...items].map((it, i) => {
            if (it === '●') return <span key={i} style={{color:t.accent, fontSize:18}}>●</span>;
            return <span key={i} style={i % 7 === 4 ? {color:t.textSoft, fontWeight:500} : {}}>{it}</span>;
          })}
        </div>
      </div>
      <div style={{
        paddingTop:20, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:24,
        fontSize:12, color:t.textSoft, lineHeight:1.6, fontFamily:t.display,
      }}>
        <div>
          <div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Tom Hinsley</div>
          <div>Frontend engineer in London. Music, photo, video &amp; blog on the side.</div>
        </div>
        <div>
          <div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Sections</div>
          <div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>© 2026 · v6.0</div>
          <div>No tracking. Just the work.</div>
        </div>
      </div>
    </div>
  );
}

function PageHomeTablet() {
  const t = TK_ht.light;
  return (
    <div style={{
      width: HTW, height: HTH, background: t.bg, color: t.text,
      position:'relative', overflow:'hidden', fontFamily: t.display,
    }}>
      <window.PageBg t={t} mode="light" />
      <HTNav t={t} />
      <HTHero t={t} />
      <HTDisciplines t={t} />
      <HTRecent t={t} />
      <HTFooter t={t} />
    </div>
  );
}

window.PageHomeTablet = PageHomeTablet;
window.HT_DIM = { w: HTW, h: HTH };
