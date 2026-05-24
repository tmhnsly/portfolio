// Animation polish — annotated reference for the motion in the site.
// Each section calls out a specific micro-interaction with a static
// before/after diagram and timing notes. Treat as the source of truth
// for whoever implements this in code (Framer Motion / CSS / RAF).

const { TOKENS: TK_an, DISCIPLINES_T: D_an } = window;

const AN_W = 1440;
const AN_H = 4200;

function ANHero({t}) {
  return (
    <div style={{position:'absolute', left:40, right:40, top:120}}>
      <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:22, display:'flex', alignItems:'center', gap:12}}>
        <span style={{width:10, height:10, borderRadius:'50%', background:t.accent, boxShadow:`0 0 0 4px ${t.accentGlow}`}} />
        <span>Motion · v1</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>spec for implementation</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'flex-end'}}>
        <div>
          <h1 style={{margin:0, fontFamily:t.display, fontSize:104, lineHeight:0.9, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
            Animation polish<span style={{color:t.accent}}>.</span>
          </h1>
          <p style={{margin:'20px 0 0', maxWidth:620, fontSize:17, color:t.textSoft, lineHeight:1.5, fontFamily:t.display}}>
            Restrained, considered motion. Each interaction below is documented
            with a static before/after and a timing recipe. Use these as the
            source of truth when implementing.
          </p>
        </div>
        <div style={{paddingBottom:10, display:'flex', flexDirection:'column', gap:8, fontFamily:t.mono, fontSize:11, color:t.textSoft}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Base duration</span><span style={{color:t.text}}>240–320 ms</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Default easing</span><span style={{color:t.text}}>cubic-bezier(0.2, 0.7, 0.3, 1)</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Reduced motion</span><span style={{color:t.text}}>respects prefers-reduced-motion</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Frame target</span><span style={{color:t.text}}>60 fps · transform + opacity only</span></div>
        </div>
      </div>
    </div>
  );
}

// Spec block: title, kind tag, before/after visual, params/notes
function ANSpec({n, title, kind, intent, when, visual, params, t}) {
  return (
    <div>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`, marginBottom:18,
      }}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:8}}>§ {n} — {kind}</div>
          <h2 style={{margin:0, fontFamily:t.display, fontSize:34, lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:600, color:t.text}}>
            {title}<span style={{color:t.accent}}>.</span>
          </h2>
          <p style={{margin:'10px 0 0', maxWidth:640, fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.5}}>{intent}</p>
        </div>
        <div style={{
          padding:'8px 12px', borderRadius:8, border:`1px solid ${t.ruleSoft}`, background:t.surfaceSoft,
          fontFamily:t.mono, fontSize:10, color:t.textSoft, letterSpacing:'0.06em', textTransform:'uppercase',
        }}>{when}</div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:32, alignItems:'flex-start'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 24px 1fr', gap:16, alignItems:'center'}}>
          <div>{visual.before}</div>
          <div style={{textAlign:'center', fontFamily:t.mono, fontSize:18, color:t.textMuted}}>→</div>
          <div>{visual.after}</div>
        </div>
        <div style={{padding:'14px 16px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(14px)'}}>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10}}>Spec</div>
          {params.map(([k, v], i) => (
            <div key={i} style={{
              display:'flex', justifyContent:'space-between', gap:14, paddingBottom:8, marginBottom:8,
              borderBottom: i < params.length-1 ? `1px solid ${t.ruleSoft}` : 'none',
              fontFamily:t.mono, fontSize:11,
            }}>
              <span style={{color:t.textSoft, letterSpacing:'0.04em'}}>{k}</span>
              <span style={{color:t.text, textAlign:'right'}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mini visual blocks for each spec
function DeckMini({state, t}) {
  const d = D_an.code;
  return (
    <div style={{position:'relative', height:200, padding:'16px 14px', borderRadius:14,
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, overflow:'hidden'}}>
      {/* card 3 (back) */}
      <div style={{position:'absolute', left:24, top:30, right:24, bottom:18, borderRadius:10,
        background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
        transform: state === 'after' ? 'translateX(-14px) rotate(-3deg) scale(0.94)' : 'translateY(28px) scale(0.92)', opacity:0.5}} />
      {/* card 2 */}
      <div style={{position:'absolute', left:14, top:22, right:14, bottom:14, borderRadius:10,
        background:'rgba(255,253,247,0.85)', border:`1px solid ${t.surfaceEdge}`,
        transform: state === 'after' ? 'translateX(-6px) rotate(-1.5deg) scale(0.97)' : 'translateY(14px) scale(0.96)', opacity:0.85}} />
      {/* card 1 (top) */}
      <div style={{position:'absolute', inset:'18px 14px', borderRadius:10,
        background:d.grad, position:'absolute',
        transform: state === 'after' ? 'translateX(280px) rotate(8deg) scale(0.92)' : 'none',
        opacity: state === 'after' ? 0 : 1,
        transition:'transform .32s, opacity .3s',
        boxShadow:'0 16px 30px rgba(13,14,18,0.2)',
        display:'flex', alignItems:'flex-end', padding:14,
      }}>
        <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, color:'#fff', letterSpacing:'-0.022em'}}>Boucle</div>
      </div>
      <div style={{position:'absolute', left:14, bottom:6, fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.1em', textTransform:'uppercase'}}>
        {state === 'before' ? '01 / 04' : '02 / 04'}
      </div>
    </div>
  );
}

function ScrollerMini({state, t}) {
  const items = ['/code','/music','/sound','/photo'];
  return (
    <div style={{position:'relative', height:200, padding:'16px 14px', borderRadius:14,
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, overflow:'hidden'}}>
      <div style={{display:'flex', gap:8, transform: state === 'after' ? 'translateX(-110px)' : 'translateX(0)', transition:'transform .4s'}}>
        {[...items, ...items].map((slug, i) => {
          const d = D_an[slug.slice(1)];
          return (
            <div key={i} style={{flex:'0 0 120px', height:110, borderRadius:10,
              background:t.surface, border:`1px solid ${t.surfaceEdge}`, padding:'12px',
              boxShadow:t.shadowSm}}>
              <div style={{display:'flex', alignItems:'center', gap:6, fontFamily:t.display, fontSize:13, fontWeight:600}}>
                <span style={{width:7, height:7, borderRadius:'50%', background:d.color}} />
                {slug}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position:'absolute', right:0, top:0, bottom:0, width:60,
        background:'linear-gradient(to right, transparent, rgba(240,236,226,0.95))', pointerEvents:'none'}} />
    </div>
  );
}

function TimelineMini({state, t}) {
  const items = state === 'before' ? [1, 0.5, 0.15, 0.05] : [1, 1, 1, 0.5];
  return (
    <div style={{position:'relative', height:200, padding:'16px 14px', borderRadius:14,
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, overflow:'hidden'}}>
      <div style={{position:'absolute', left:30, top:14, bottom:14, width:1, background:t.ruleSoft}} />
      {items.map((o, i) => (
        <div key={i} style={{display:'flex', alignItems:'center', gap:14, paddingLeft:24, marginBottom:14, opacity:o, transform: o < 0.3 ? 'translateY(10px)' : 'none', transition:'all .4s'}}>
          <span style={{width:11, height:11, borderRadius:'50%', background:'#dd4a2e', boxShadow:`0 0 0 3px rgba(221,74,46,0.2)`}} />
          <div>
            <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.06em'}}>2026 — now</div>
            <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Frontend Engineer</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BloomMini({state, t}) {
  const accent = state === 'before' ? '#e54d2e' : '#46a758';
  const ac = state === 'before' ? 'rgba(229,77,46,0.55)' : 'rgba(70,167,88,0.55)';
  return (
    <div style={{position:'relative', height:200, borderRadius:14, overflow:'hidden',
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`}}>
      <div style={{position:'absolute', left:'-20%', top:'-30%', width:300, height:300, borderRadius:'50%',
        background:`radial-gradient(circle, ${ac}, transparent 65%)`,
        filter:'blur(40px)', transition:'background .5s'}} />
      <div style={{position:'absolute', left:18, bottom:18, fontFamily:t.display, fontSize:24, fontWeight:600, letterSpacing:'-0.025em'}}>
        {state === 'before' ? '/code.' : '/blog.'}
      </div>
      <div style={{position:'absolute', right:18, top:18, padding:'4px 10px', borderRadius:999,
        background:accent, color:'#fff', fontFamily:t.display, fontSize:11, fontWeight:600}}>
        {state === 'before' ? 'Code' : 'Blog'}
      </div>
    </div>
  );
}

function HoverMini({state, t}) {
  const lifted = state === 'after';
  return (
    <div style={{position:'relative', height:200, padding:'16px 14px', borderRadius:14,
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, overflow:'hidden'}}>
      <div style={{
        margin:'18px auto 0', width:'80%', aspectRatio:'5/3', borderRadius:10,
        background:D_an.music.grad,
        transform: lifted ? 'translateY(-6px)' : 'none',
        boxShadow: lifted ? '0 24px 50px rgba(13,14,18,0.22)' : '0 8px 16px rgba(13,14,18,0.10)',
        transition:'transform .26s, box-shadow .26s', position:'relative',
      }}>
        <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:999,
          background:'rgba(255,255,255,0.92)', color:t.text, fontSize:10, fontWeight:600}}>Music</div>
        <div style={{position:'absolute', right:10, bottom:8, fontFamily:t.mono, fontSize:9, color:'rgba(255,255,255,0.85)', letterSpacing:'0.08em', textTransform:'uppercase'}}>
          {lifted ? 'hover →' : 'idle'}
        </div>
      </div>
    </div>
  );
}

function MarqueeMini({state, t}) {
  return (
    <div style={{position:'relative', height:200, padding:'14px 0', borderRadius:14, overflow:'hidden',
      background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`}}>
      <div style={{borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, padding:'10px 0', whiteSpace:'nowrap', marginTop:60}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:18,
          fontFamily:t.display, fontSize:36, fontWeight:600, letterSpacing:'-0.045em', color:t.text,
          transform: state === 'after' ? 'translateX(-120px)' : 'translateX(0)', transition:'transform 6s linear'}}>
          <span>Tom Hinsley</span><span style={{color:t.accent}}>●</span>
          <span>hello@tomhinsley.com</span><span style={{color:t.accent}}>●</span>
          <span>London 51.5°N</span><span style={{color:t.accent}}>●</span>
          <span>Tom Hinsley</span>
        </div>
      </div>
      <div style={{position:'absolute', left:14, bottom:6, fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.1em', textTransform:'uppercase'}}>
        marquee · footer
      </div>
    </div>
  );
}

function ANSpecs({t}) {
  return (
    <div style={{position:'absolute', left:40, right:40, top:520, display:'flex', flexDirection:'column', gap:60}}>
      <ANSpec n="01" kind="Hero · card deck"
        title="Deck flip"
        intent="Cards advance like a real deck — the top one slides out + rotates, the stack shifts up. Arrow keys, click, or swipe trigger it."
        when="on next/prev"
        visual={{ before:<DeckMini state="before" t={t} />, after:<DeckMini state="after" t={t} /> }}
        params={[
          ['duration',         '320 ms'],
          ['easing',           'cubic-bezier(0.2, 0.7, 0.3, 1)'],
          ['top card',         'translateX(+280) + rotate(8deg) + fadeOut'],
          ['back cards',       'shift up one step (rotate -2deg, opacity +0.16)'],
          ['stagger',          '32 ms between layers'],
          ['triggers',         'click · arrow keys · swipe · auto every 8s if idle'],
        ]}
        t={t} />

      <ANSpec n="02" kind="Discipline scroller"
        title="Drag + snap"
        intent="Horizontal-scroll row with momentum on drag and snap-to-card when released. Arrow buttons advance one card width."
        when="on drag / arrow"
        visual={{ before:<ScrollerMini state="before" t={t} />, after:<ScrollerMini state="after" t={t} /> }}
        params={[
          ['snap',          'scroll-snap-type: x mandatory'],
          ['snap point',    '232px + 14px gap'],
          ['drag friction', '0.92'],
          ['arrow advance', '1 card per click · 400 ms'],
          ['fade edge',     '80px rgba(bg, 0.95) on right'],
        ]}
        t={t} />

      <ANSpec n="03" kind="About · CV timeline"
        title="Scroll-revealed entries"
        intent="Each timeline entry fades and lifts into place as it enters the viewport. The vertical spine extends with scroll."
        when="on scroll into view"
        visual={{ before:<TimelineMini state="before" t={t} />, after:<TimelineMini state="after" t={t} /> }}
        params={[
          ['trigger',       'IntersectionObserver · threshold 0.4'],
          ['entry',         'translateY(20px) → 0 · opacity 0 → 1'],
          ['duration',      '420 ms · ease-out'],
          ['stagger',       '60 ms between entries'],
          ['marker pulse',  'one-time scale 1 → 1.18 → 1 on reveal'],
          ['spine',         'scaleY(0 → 1) tied to scroll position'],
        ]}
        t={t} />

      <ANSpec n="04" kind="Route change"
        title="Discipline bloom shift"
        intent="On route change, the background bloom interpolates from the previous discipline colour to the new one — gives the site a felt sense of where you are."
        when="on navigation"
        visual={{ before:<BloomMini state="before" t={t} />, after:<BloomMini state="after" t={t} /> }}
        params={[
          ['duration',     '520 ms'],
          ['easing',       'ease-in-out'],
          ['property',     'bloom radial-gradient stop colour (custom var)'],
          ['fallback',     'instant swap if prefers-reduced-motion'],
          ['nav CTA',      'accent colour interpolates in lockstep'],
        ]}
        t={t} />

      <ANSpec n="05" kind="Card · hover"
        title="Quiet lift"
        intent="Project cards lift gently on hover. Restrained — no scale, no shadow blowup."
        when="on hover / focus"
        visual={{ before:<HoverMini state="before" t={t} />, after:<HoverMini state="after" t={t} /> }}
        params={[
          ['duration',  '260 ms'],
          ['easing',    'cubic-bezier(0.2, 0.7, 0.3, 1)'],
          ['transform', 'translateY(-6px)'],
          ['shadow',    'shadow-md → shadow-lg'],
          ['no-go',     'never scale, never rotate'],
        ]}
        t={t} />

      <ANSpec n="06" kind="Footer · marquee"
        title="Continuous slow scroll"
        intent="Footer marquee scrolls in a calm, perpetual loop. Pauses on hover."
        when="ambient"
        visual={{ before:<MarqueeMini state="before" t={t} />, after:<MarqueeMini state="after" t={t} /> }}
        params={[
          ['duration',      '40 s per full loop'],
          ['easing',        'linear'],
          ['pause on hover','animation-play-state: paused'],
          ['direction',     'right-to-left'],
          ['repeat',        'infinite, seamless'],
        ]}
        t={t} />

      {/* Motion principles closing block */}
      <div style={{
        padding:'24px 28px', borderRadius:14, background:t.text, color:t.bg,
        boxShadow:t.shadowMd,
      }}>
        <div style={{fontFamily:t.mono, fontSize:10, color:'rgba(240,236,226,0.6)', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14}}>
          Principles
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24}}>
          {[
            { name:'Restrained',  desc:'Less than you think. If a motion isn\u2019t functional, cut it.' },
            { name:'Functional',  desc:'Every animation reflects a state change. No decoration.' },
            { name:'Quiet',       desc:'Short durations (240–420ms). Soft easing.' },
            { name:'Respectful',  desc:'Honour prefers-reduced-motion. Always.' },
          ].map((p) => (
            <div key={p.name}>
              <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em', marginBottom:6}}>{p.name}<span style={{color:t.accent}}>.</span></div>
              <div style={{fontFamily:t.display, fontSize:12, color:'rgba(240,236,226,0.65)', lineHeight:1.5}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageAnimations() {
  const t = TK_an.light;
  return (
    <div style={{width:AN_W, height:AN_H, background:t.bg, color:t.text,
      position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" />
      <window.PageNav />
      <ANHero t={t} />
      <ANSpecs t={t} />
      <window.PageFooter />
    </div>
  );
}

window.PageAnimations = PageAnimations;
window.AN_DIM = { w:AN_W, h:AN_H };
