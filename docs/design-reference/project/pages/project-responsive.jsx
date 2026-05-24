// Project /code/boucle — responsive (tablet 768, mobile 390)

const { TOKENS: TK_pr, DISCIPLINES_T: D_pr, TechChip: Chip_pr } = window;
const acP = D_pr.code.color;

// ============================ TABLET ============================
const PT_W = 768, PT_H = 3000;

function PTNav({t}) {
  return (
    <div style={{position:'absolute', top:20, left:24, right:24, height:52,
      padding:'9px 12px 9px 14px', borderRadius:16, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:28, height:28, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${acP} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${acP}33`}} />
        <span style={{fontSize:15, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', gap:2}}>
        {['Code','Music','Sound','Photo','Video','Blog','About'].map((n)=>(
          <span key={n} style={{padding:'7px 10px', borderRadius:8, fontSize:12, fontWeight:500,
            background:n==='Code'?t.text:'transparent', color:n==='Code'?t.bg:t.text}}>{n}</span>
        ))}
      </div>
      <a style={{padding:'8px 12px', borderRadius:8, background:acP, color:'#fff', textDecoration:'none',
        fontSize:12, fontWeight:600, boxShadow:`0 4px 14px ${acP}44`}}>hello@ →</a>
    </div>
  );
}

function PTHero({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:90}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14}}>
        Home / <span style={{color:t.text}}>Code</span> / <span style={{color:t.text}}>Boucle</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:18}}>
        <span style={{padding:'5px 12px', borderRadius:999, background:acP, color:'#fff', fontSize:11, fontWeight:600}}>Code</span>
        <span style={{padding:'5px 10px', borderRadius:999, border:`1px solid ${acP}`, color:acP, fontFamily:t.mono, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:5}}>
          <span style={{width:5, height:5, borderRadius:'50%', background:acP, boxShadow:`0 0 0 2px ${acP}33`}} />Live
        </span>
        <span style={{fontFamily:t.mono, fontSize:10, color:t.textMuted}}>boucle.tomhinsley.com ↗</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:120, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Boucle<span style={{color:acP}}>.</span>
      </h1>
      <p style={{margin:'16px 0 0', maxWidth:560, fontFamily:t.display, fontSize:17, lineHeight:1.4, color:t.textSoft, fontWeight:400}}>
        A generative drum kit that lives in the browser. Sixteen pads, one knob for character, no two sessions the same.
      </p>
    </div>
  );
}

function PTEmbed({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:540, height:340}}>
      <div style={{width:'100%', height:'100%', borderRadius:14, background:D_pr.code.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowLg}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 16px, transparent 16px 32px)`}} />
        <div style={{position:'absolute', top:0, left:0, right:0, padding:'10px 18px', display:'flex', justifyContent:'space-between',
          fontFamily:t.mono, fontSize:10, color:'rgba(255,255,255,0.8)', letterSpacing:'0.12em', textTransform:'uppercase',
          borderBottom:'1px solid rgba(255,255,255,0.14)'}}>
          <span style={{color:'#fff'}}>Boucle · v0.4</span><span>120 bpm</span><span>↗ open</span>
        </div>
        <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', width:340, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
          {[...Array(16)].map((_, i) => {
            const active = [0,4,6,10,11,13].includes(i);
            return <div key={i} style={{aspectRatio:'1', borderRadius:10,
              background: active ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.12)',
              boxShadow: active ? '0 0 16px rgba(255,255,255,0.4)' : 'none'}} />;
          })}
        </div>
      </div>
    </div>
  );
}

function PTBody({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:910, fontFamily:t.display}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:12}}>§ 01 — Notes</div>
      <h2 style={{margin:0, fontSize:32, lineHeight:1.1, letterSpacing:'-0.03em', fontWeight:600, color:t.text}}>A way to make noise without opening Ableton.</h2>
      <p style={{margin:'18px 0', fontSize:16, color:t.textSoft, lineHeight:1.6, fontWeight:400}}>
        Boucle pairs a small grid sequencer with a procedural sample bank. Each pad re-synthesises its own sound on the fly,
        so no two sessions sound the same — the only knob you turn is &ldquo;character&rdquo;, mapped to a few dozen parameters
        under the hood. Started as a way to test the Web Audio API; ended up the thing I default to when I want to make noise
        without opening Ableton.
      </p>
      <div style={{marginTop:18, padding:'14px 16px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(16px)'}}>
        <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10}}>Built with</div>
        <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
          {['React 19','TypeScript','Web Audio API','Three.js','Vite'].map((tag, i) => <Chip_pr key={i} label={tag} t={t} />)}
        </div>
      </div>
    </div>
  );
}

function PTGallery({t}) {
  const shots = [
    { grad:'linear-gradient(135deg, #dd4a2e, #6b1d1a)' },
    { grad:'linear-gradient(135deg, #e85f3d, #832418)' },
    { grad:'linear-gradient(135deg, #b03e26, #441510)' },
  ];
  return (
    <div style={{position:'absolute', left:24, right:24, top:1620}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14}}>§ 02 — Gallery</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
        {shots.map((s, i) => (
          <div key={i} style={{aspectRatio:'4/3', borderRadius:12, background:s.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowMd}}>
            <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
            <div style={{position:'absolute', left:10, top:10, padding:'3px 8px', borderRadius:6, background:'rgba(13,14,18,0.7)', color:'#fff', fontFamily:t.mono, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase'}}>Fig. 0{i+1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PTNav2({t}) {
  return (
    <div style={{position:'absolute', left:24, right:24, top:1960, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
      <div style={{padding:'14px 16px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.ruleSoft}`, backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:12}}>
        <span style={{fontFamily:t.mono, fontSize:14}}>←</span>
        <div>
          <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase'}}>Prev</div>
          <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Caustics</div>
        </div>
      </div>
      <div style={{padding:'14px 16px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.ruleSoft}`, backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:12, justifyContent:'flex-end', textAlign:'right'}}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase'}}>Next</div>
          <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tide tables</div>
        </div>
        <span style={{fontFamily:t.mono, fontSize:14}}>→</span>
      </div>
    </div>
  );
}

function PTRelated({t}) {
  const items = [
    { d:'music', title:'Tape loops vol. 3' },
    { d:'sound', title:'Rooms — SFX library' },
    { d:'code',  title:'Marble — 3D toy' },
  ];
  return (
    <div style={{position:'absolute', left:24, right:24, top:2110}}>
      <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:12}}>You might also like</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
        {items.map((p, i) => {
          const d = D_pr[p.d];
          return (
            <div key={i} style={{display:'flex', flexDirection:'column', gap:8}}>
              <div style={{aspectRatio:'4/3', borderRadius:10, background:d.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowSm}}>
                <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
                <div style={{position:'absolute', left:8, top:8, padding:'2px 8px', borderRadius:999, background:'rgba(255,255,255,0.92)', color:t.text, fontSize:9, fontWeight:600}}>{d.label}</div>
              </div>
              <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>{p.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PTFooter({t}) {
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

function PageProjectTablet() {
  const t = TK_pr.light;
  return (
    <div style={{width:PT_W, height:PT_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acP} />
      <PTNav t={t} /><PTHero t={t} /><PTEmbed t={t} /><PTBody t={t} /><PTGallery t={t} />
      <PTNav2 t={t} /><PTRelated t={t} /><PTFooter t={t} />
    </div>
  );
}

// ============================ MOBILE ============================
const PM_W = 390, PM_H = 3300;

function PMNav({t}) {
  return (
    <div style={{position:'absolute', top:16, left:16, right:16, height:48,
      padding:'8px 10px 8px 12px', borderRadius:14, background:'rgba(255,253,247,0.7)', border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(20px) saturate(170%)', boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
      display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:t.display, fontSize:13, color:t.text, zIndex:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:26, height:26, borderRadius:8,
          background:`radial-gradient(circle at 30% 30%, #fff, ${acP} 65%, #1a2347 100%)`,
          boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 3px 8px ${acP}33`}} />
        <span style={{fontSize:14, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <button style={{width:36, height:32, borderRadius:8, border:'none', background:'transparent', display:'flex', flexDirection:'column', justifyContent:'center', gap:4, padding:'0 8px'}}>
        <span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} /><span style={{height:1.5, background:t.text}} />
      </button>
    </div>
  );
}

function PMHero({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:84}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:12}}>
        Home / <span style={{color:t.text}}>Code</span> / Boucle
      </div>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:14, flexWrap:'wrap'}}>
        <span style={{padding:'4px 10px', borderRadius:999, background:acP, color:'#fff', fontSize:10, fontWeight:600}}>Code</span>
        <span style={{padding:'4px 9px', borderRadius:999, border:`1px solid ${acP}`, color:acP, fontFamily:t.mono, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase'}}>● Live</span>
      </div>
      <h1 style={{margin:0, fontFamily:t.display, fontSize:80, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
        Boucle<span style={{color:acP}}>.</span>
      </h1>
      <p style={{margin:'12px 0 0', fontFamily:t.display, fontSize:15, lineHeight:1.4, color:t.textSoft}}>
        A generative drum kit that lives in the browser. Sixteen pads, one knob.
      </p>
    </div>
  );
}

function PMEmbed({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:380, height:240}}>
      <div style={{width:'100%', height:'100%', borderRadius:12, background:D_pr.code.grad, position:'relative', overflow:'hidden', boxShadow:t.shadowMd}}>
        <div style={{position:'absolute', inset:0, background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 14px, transparent 14px 28px)`}} />
        <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', width:240, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8}}>
          {[...Array(16)].map((_, i) => {
            const active = [0,4,6,10,11,13].includes(i);
            return <div key={i} style={{aspectRatio:'1', borderRadius:8,
              background: active ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.12)',
              boxShadow: active ? '0 0 12px rgba(255,255,255,0.4)' : 'none'}} />;
          })}
        </div>
      </div>
    </div>
  );
}

function PMBody({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, top:650}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10}}>§ 01 — Notes</div>
      <h2 style={{margin:0, fontFamily:t.display, fontSize:24, lineHeight:1.15, letterSpacing:'-0.025em', fontWeight:600, color:t.text}}>A way to make noise without opening Ableton.</h2>
      <p style={{margin:'14px 0', fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.6}}>
        Boucle pairs a small grid sequencer with a procedural sample bank. Each pad re-synthesises its own sound on the fly,
        so no two sessions sound the same. The only knob you turn is &ldquo;character&rdquo;.
      </p>
      <p style={{margin:'0 0 14px', fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.6}}>
        Started as a way to test the Web Audio API. Ended up the thing I default to when I want to make noise quickly —
        between meetings, on a train, somewhere with my headphones in.
      </p>
      <div style={{marginTop:14, padding:'12px 14px', borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(16px)'}}>
        <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Built with</div>
        <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
          {['React','TypeScript','WebAudio','Three.js'].map((tag, i) => <Chip_pr key={i} label={tag} t={t} />)}
        </div>
      </div>
    </div>
  );
}

function PMRelated({t}) {
  const items = [
    { d:'music', title:'Tape loops vol. 3' },
    { d:'sound', title:'Rooms — SFX library' },
    { d:'code',  title:'Marble — 3D toy' },
  ];
  return (
    <div style={{position:'absolute', left:16, right:16, top:1320}}>
      <div style={{fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10}}>You might also like</div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        {items.map((p, i) => {
          const d = D_pr[p.d];
          return (
            <div key={i} style={{display:'grid', gridTemplateColumns:'90px 1fr', gap:12, padding:8, borderRadius:12,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(14px)'}}>
              <div style={{aspectRatio:'4/3', borderRadius:8, background:d.grad, position:'relative', overflow:'hidden'}}>
                <div style={{position:'absolute', left:6, top:6, padding:'2px 6px', borderRadius:999, background:'rgba(255,255,255,0.92)', color:t.text, fontSize:8, fontWeight:600}}>{d.label}</div>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.022em', lineHeight:1.2}}>{p.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PMFooter({t}) {
  return (
    <div style={{position:'absolute', left:16, right:16, bottom:20}}>
      <div style={{padding:'14px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`, overflow:'hidden', whiteSpace:'nowrap'}}>
        <div style={{fontFamily:t.display, fontSize:32, fontWeight:600, letterSpacing:'-0.045em', display:'flex', gap:22, lineHeight:1, color:t.text}}>
          <span>hello@tomhinsley.com</span><span style={{color:t.accent}}>●</span><span>London</span><span style={{color:t.accent}}>●</span><span>Sep 2026</span>
        </div>
      </div>
      <div style={{paddingTop:18, display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, fontSize:11, color:t.textSoft, fontFamily:t.display, lineHeight:1.6}}>
        <div><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Sections</div>Code · Music · Sound<br/>Photo · Video · Blog</div>
        <div style={{textAlign:'right'}}><div style={{color:t.text, fontFamily:t.mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>© 2026</div>v6.0 · No tracking</div>
      </div>
    </div>
  );
}

function PageProjectMobile() {
  const t = TK_pr.light;
  return (
    <div style={{width:PM_W, height:PM_H, background:t.bg, color:t.text, position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" accentColor={acP} />
      <PMNav t={t} /><PMHero t={t} /><PMEmbed t={t} /><PMBody t={t} /><PMRelated t={t} /><PMFooter t={t} />
    </div>
  );
}

window.PageProjectTablet = PageProjectTablet;
window.PageProjectMobile = PageProjectMobile;
window.PT_DIM = {w:PT_W, h:PT_H};
window.PM_DIM = {w:PM_W, h:PM_H};
