// Home (/) — accepts a mode prop ('light' | 'dark') for token theming.
// Token system: window.TOKENS[mode] supplies all surface/text/border colors.

const { TOKENS, DISCIPLINES_T, PageBg, PageNav, PageFooter, TechChip, FilterPills, TYPE: TY_h } = window;

const HOME_W = 1440;
const HOME_H = 2280;

function HomeCard({t, mode, discipline, n, title, desc, tech, date, rotate=0, x=0, y=0, scale=1, z=1, opacity=1, blur=0}) {
  const d = DISCIPLINES_T[discipline];
  return (
    <div style={{
      position:'absolute', inset:0,
      transform:`translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
      transformOrigin:'50% 95%', zIndex:z, opacity, filter: blur ? `blur(${blur}px)` : 'none',
    }}>
      <div style={{
        width:'100%', height:'100%', borderRadius:20,
        background: t.surface, border:`1px solid ${t.surfaceEdge}`,
        backdropFilter:'blur(28px) saturate(170%)', WebkitBackdropFilter:'blur(28px) saturate(170%)',
        boxShadow:`0 1px 0 ${mode==='dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)'} inset, ${t.shadowXl}`,
        padding:14, display:'flex', flexDirection:'column', gap:12,
      }}>
        <div style={{flex:'1 1 auto', borderRadius:14, background:d.grad, position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', right:-12, bottom:-30,
            fontFamily:TY_h.display, fontSize:180, color:'rgba(255,255,255,0.16)',
            fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>{n}</div>
          <div style={{position:'absolute', left:12, top:12, padding:'4px 10px', borderRadius:999,
            background:'rgba(255,255,255,0.92)', color:'#1c1b18',
            fontSize:11, fontWeight:600, letterSpacing:'-0.005em'}}>{d.label}</div>
          <div style={{position:'absolute', right:12, top:12, display:'flex', gap:5}}>
            {d.swatches.map((c, i) => (
              <span key={i} style={{width:11, height:11, borderRadius:'50%', background:c,
                border:'1px solid rgba(255,255,255,0.5)'}} />
            ))}
          </div>
        </div>
        <div style={{padding:'2px 4px 2px'}}>
          <div style={{fontSize:18, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, color:t.text}}>{title}</div>
          {desc && <div style={{fontSize:13, fontWeight:400, color:t.textSoft, lineHeight:1.4, marginTop:4, marginBottom:8}}>{desc}</div>}
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginTop: desc ? 0 : 8}}>
            <div style={{display:'flex', gap:5, overflow:'hidden'}}>
              {tech.map((tag, i) => <TechChip key={i} label={tag} t={t} mode={mode} />)}
            </div>
            <div style={{fontFamily:TY_h.mono, fontSize:10, color:t.textMuted, whiteSpace:'nowrap'}}>{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HOME_DECK = [
  { discipline:'code',  n:'01', title:'Boucle',          desc:'A generative drum kit in the browser', tech:['React','TypeScript','WebAudio'], date:'Mar 2026' },
  { discipline:'music', n:'02', title:'Tape loops, vol. 3', desc:'Slow ambient tape recordings',         tech:['Logic Pro X','Ableton'],         date:'Jan 2026' },
  { discipline:'photo', n:'03', title:'Lisbon',             desc:'A small photo set on 35mm',            tech:['Portra 400','Leica M6'],          date:'Feb 2026' },
  { discipline:'video', n:'04', title:'Walks',              desc:'A short film about not arriving',      tech:['Final Cut Pro X','DaVinci'],      date:'Apr 2026' },
];

function HomeDeck({t, mode}) {
  const c = HOME_DECK;
  return (
    <div style={{position:'relative', width:'100%', height:'100%'}}>
      <HomeCard t={t} mode={mode} {...c[3]} rotate={-4} x={-18} y={32} scale={0.9} z={1} opacity={0.5} blur={1.5} />
      <HomeCard t={t} mode={mode} {...c[2]} rotate={-2} x={-9} y={18} scale={0.95} z={2} opacity={0.78} />
      <HomeCard t={t} mode={mode} {...c[1]} rotate={2} x={9} y={8} scale={0.98} z={3} opacity={0.94} />
      <HomeCard t={t} mode={mode} {...c[0]} z={4} />
    </div>
  );
}

function HomeHero({t, mode}) {
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:110, height:780,
      display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:64,
    }}>
      <div style={{padding:'72px 0 24px'}}>
        <div style={{
          fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
          marginBottom:32, display:'flex', alignItems:'center', gap:12,
        }}>
          <span style={{width:8, height:8, borderRadius:'50%', background:t.accent,
            boxShadow:`0 0 0 4px ${t.accent}33`}} />
          <span>Tom Hinsley · London</span>
        </div>
        <h1 style={{
          margin:0, fontFamily:TY_h.display,
          fontSize:148, lineHeight:0.92, letterSpacing:'-0.045em', fontWeight:600,
          textWrap:'pretty', color:t.text,
        }}>
          Tom Hinsley,<br/>
          <span style={{color:t.textSoft, fontWeight:500}}>digital creative</span><span style={{color:t.accent}}>.</span>
        </h1>
        <p style={{
          margin:'36px 0 0', maxWidth:580, fontSize:19, color:t.textSoft, lineHeight:1.55, fontWeight:400,
          fontFamily:TY_h.display,
        }}>
          Frontend engineer based in London. Side practices in
          music, sound, photography and film.
        </p>
      </div>

      <div style={{padding:'72px 0 24px', display:'flex', flexDirection:'column'}}>
        <div style={{
          fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
          marginBottom:14, display:'flex', justifyContent:'space-between',
        }}>
          <span>Featured deck</span>
          <span>01 / 04</span>
        </div>
        <div style={{position:'relative', height:440}}>
          <HomeDeck t={t} mode={mode} />
        </div>
        <div style={{
          marginTop:18, display:'flex', justifyContent:'space-between', alignItems:'center',
          paddingTop:16, borderTop:`1px solid ${t.ruleSoft}`,
        }}>
          <span style={{display:'flex', gap:5}}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{width: i===0 ? 24 : 8, height:5, borderRadius:3,
                background: i===0 ? t.text : t.ruleSoft}} />
            ))}
          </span>
          <div style={{display:'flex', gap:8}}>
            <button style={{width:38, height:38, borderRadius:10, border:`1px solid ${t.ruleSoft}`,
              background:t.surfaceSoft, backdropFilter:'blur(12px)',
              fontFamily:TY_h.mono, fontSize:14, color:t.text, cursor:'pointer'}}>←</button>
            <button style={{width:38, height:38, borderRadius:10, border:'none',
              background:t.text, color:t.bg, fontFamily:TY_h.mono, fontSize:14, cursor:'pointer',
              boxShadow:t.shadowSm}}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisciplineCard({slug, accent, tools, t, mode}) {
  return (
    <div style={{
      flex:'0 0 232px', height:148, borderRadius:14,
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(160%)', WebkitBackdropFilter:'blur(20px) saturate(160%)',
      boxShadow:`0 1px 0 ${mode==='dark'?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.9)'} inset, ${t.shadowSm}`,
      padding:'16px 18px', display:'flex', flexDirection:'column', justifyContent:'space-between',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:9}}>
          <span style={{width:10, height:10, borderRadius:'50%', background:accent}} />
          <span style={{fontFamily:TY_h.display, fontSize:18, fontWeight:600, letterSpacing:'-0.025em', color:t.text}}>{slug}</span>
        </div>
        <span style={{fontFamily:TY_h.mono, fontSize:11, color:t.textMuted}}>↗</span>
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
        {tools.map((tool, i) => <TechChip key={i} label={tool} t={t} mode={mode} />)}
      </div>
    </div>
  );
}

function HomeDisciplines({t, mode}) {
  const fadeColor = mode === 'dark' ? 'rgba(22,22,21,0.95)' : 'rgba(240,236,226,0.95)';
  return (
    <div style={{position:'absolute', left:40, right:40, top:920, height:200}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:14,
      }}>
        <div style={{
          fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span>Explore by discipline</span>
          <span style={{width:24, height:1, background:t.ruleSoft}} />
          <span>Drag or scroll →</span>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button style={{width:30, height:30, borderRadius:8, border:`1px solid ${t.ruleSoft}`,
            background:t.surfaceSoft, backdropFilter:'blur(12px)',
            fontFamily:TY_h.mono, fontSize:12, color:t.text, cursor:'pointer'}}>←</button>
          <button style={{width:30, height:30, borderRadius:8, border:`1px solid ${t.ruleSoft}`,
            background:t.surfaceSoft, backdropFilter:'blur(12px)',
            fontFamily:TY_h.mono, fontSize:12, color:t.text, cursor:'pointer'}}>→</button>
        </div>
      </div>
      <div style={{position:'relative', overflow:'hidden'}}>
        <div style={{display:'flex', gap:14, paddingRight:120}}>
          <DisciplineCard t={t} mode={mode} slug="/code"  accent={DISCIPLINES_T.code.color}  tools={['React','TypeScript','Three.js','Sanity','Godot']} />
          <DisciplineCard t={t} mode={mode} slug="/music" accent={DISCIPLINES_T.music.color} tools={['Logic Pro X','Ableton','Tape']} />
          <DisciplineCard t={t} mode={mode} slug="/sound" accent={DISCIPLINES_T.sound.color} tools={['Pro Tools','Reaper','Field rec.']} />
          <DisciplineCard t={t} mode={mode} slug="/photo" accent={DISCIPLINES_T.photo.color} tools={['35mm','Portra 400','Leica M6','Lightroom']} />
          <DisciplineCard t={t} mode={mode} slug="/video" accent={DISCIPLINES_T.video.color} tools={['Final Cut Pro X','DaVinci','RED']} />
          <DisciplineCard t={t} mode={mode} slug="/blog"  accent={DISCIPLINES_T.blog.color}  tools={['Notes','Essays','Dev logs']} />
        </div>
        <div style={{position:'absolute', right:0, top:0, bottom:0, width:80,
          background:`linear-gradient(to right, transparent, ${fadeColor})`, pointerEvents:'none'}} />
      </div>
    </div>
  );
}

function HomeRecent({t, mode}) {
  const thumbs = [
    { discipline:'photo', title:'Lisbon',             desc:'A photo set on 35mm',           tech:['Portra 400','Leica M6'],    date:'Feb 2026' },
    { discipline:'music', title:'Tape loops, vol. 3', desc:'Slow ambient tape recordings',  tech:['Logic Pro X','Ableton'],    date:'Jan 2026' },
    { discipline:'video', title:'Walks',              desc:'A short film about not arriving', tech:['Final Cut Pro X','DaVinci'], date:'Apr 2026' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:1170, height:700}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:24, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>Selected work</div>
          <h2 style={{margin:0, fontSize:68, lineHeight:0.92, letterSpacing:'-0.04em', fontWeight:600, fontFamily:TY_h.display, color:t.text}}>
            Recent<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        <FilterPills t={t} mode={mode} items={[['All',12],['Code',4],['Music',2],['Sound',2],['Photo',2],['Video',1],['Blog',1]]} />
      </div>

      <div style={{marginTop:28, display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:32}}>
        <div>
          <div style={{
            aspectRatio:'16/10', borderRadius:18, background:DISCIPLINES_T.code.grad,
            position:'relative', overflow:'hidden',
            boxShadow:t.shadowLg,
          }}>
            <div style={{position:'absolute', inset:0,
              background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
            <div style={{position:'absolute', right:-10, bottom:-32,
              fontFamily:TY_h.display, fontSize:260, color:'rgba(255,255,255,0.16)',
              fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>01</div>
            <div style={{position:'absolute', left:18, top:18, padding:'5px 12px', borderRadius:999,
              background:'rgba(255,255,255,0.92)', color:'#1c1b18', fontSize:12, fontWeight:600, letterSpacing:'-0.005em'}}>Code — featured</div>
            <div style={{position:'absolute', right:18, top:18, display:'flex', gap:6}}>
              {DISCIPLINES_T.code.swatches.map((c, i) => (
                <span key={i} style={{width:14, height:14, borderRadius:'50%', background:c,
                  border:'1px solid rgba(255,255,255,0.5)'}} />
              ))}
            </div>
          </div>
          <div style={{marginTop:20, display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:24}}>
            <div style={{display:'flex', flexDirection:'column', gap:10, maxWidth:'78%'}}>
              <div>
                <div style={{fontFamily:TY_h.display, fontSize:30, fontWeight:600, letterSpacing:'-0.028em', lineHeight:1.05, color:t.text}}>
                  Boucle
                </div>
                <div style={{fontFamily:TY_h.display, fontSize:17, fontWeight:400, color:t.textSoft, lineHeight:1.4, marginTop:6}}>
                  A generative drum kit in the browser
                </div>
              </div>
              <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
                {['React','TypeScript','WebAudio','Three.js'].map((tag, i) => <TechChip key={i} label={tag} t={t} mode={mode} />)}
              </div>
            </div>
            <div style={{fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, whiteSpace:'nowrap'}}>Mar 2026 →</div>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {thumbs.map((p, i) => {
            const d = DISCIPLINES_T[p.discipline];
            return (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'140px 1fr', gap:16, alignItems:'center',
                padding:'10px 14px 10px 10px', borderRadius:14,
                background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
                backdropFilter:'blur(16px) saturate(160%)', WebkitBackdropFilter:'blur(16px) saturate(160%)',
              }}>
                <div style={{
                  aspectRatio:'4/3', borderRadius:10, background:d.grad,
                  position:'relative', overflow:'hidden',
                  boxShadow:t.shadowSm,
                }}>
                  <div style={{position:'absolute', inset:0,
                    background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
                  <div style={{position:'absolute', left:8, top:8, padding:'2px 7px', borderRadius:999,
                    background:'rgba(255,255,255,0.92)', color:'#1c1b18', fontSize:9, fontWeight:600}}>{d.label}</div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:6, minWidth:0}}>
                  <div>
                    <div style={{fontFamily:TY_h.display, fontSize:18, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.2, color:t.text}}>
                      {p.title}
                    </div>
                    {p.desc && <div style={{fontFamily:TY_h.display, fontSize:12, fontWeight:400, color:t.textSoft, lineHeight:1.4, marginTop:2}}>{p.desc}</div>}
                  </div>
                  <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                    {p.tech.map((tag, ix) => <TechChip key={ix} label={tag} t={t} mode={mode} />)}
                  </div>
                  <div style={{fontFamily:TY_h.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.04em'}}>{p.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        marginTop:24, paddingTop:16, borderTop:`1px solid ${t.ruleSoft}`,
        display:'flex', justifyContent:'space-between',
        fontFamily:TY_h.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.06em', textTransform:'uppercase',
      }}>
        <span>4 of 12 · 91 in the archive</span>
        <span style={{color:t.text, fontFamily:TY_h.display, fontSize:14, fontWeight:600, letterSpacing:'-0.005em', textTransform:'none'}}>Everything →</span>
      </div>
    </div>
  );
}

function PageHome({mode = 'light'}) {
  const t = TOKENS[mode];
  return (
    <div style={{
      width: HOME_W, height: HOME_H, background: t.bg, color: t.text,
      position:'relative', overflow:'hidden', fontFamily: TY_h.display,
    }}>
      <PageBg t={t} mode={mode} />
      <PageNav t={t} mode={mode} />
      <HomeHero t={t} mode={mode} />
      <HomeDisciplines t={t} mode={mode} />
      <HomeRecent t={t} mode={mode} />
      <PageFooter t={t} mode={mode} />
    </div>
  );
}

window.PageHome = PageHome;
window.HOME_DIM = { w: HOME_W, h: HOME_H };
