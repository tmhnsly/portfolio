// Shared components — Nav, Footer, Bg, TechChip, FilterPills.
// All accept an optional `t` token-set (defaults to light); pass dark to render dark mode.

window.THEME = window.TOKENS.light;
window.DISCIPLINES = window.DISCIPLINES_T;
window.PAGE_W = 1440;

const _baseFont = {
  display: window.TYPE.display,
  mono:    window.TYPE.mono,
};

function hexToRgba(hex, alpha) {
  const h = hex.replace('#','');
  const r = parseInt(h.substr(0,2), 16);
  const g = parseInt(h.substr(2,2), 16);
  const b = parseInt(h.substr(4,2), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function PageBg({t = window.TOKENS.light, mode = 'light', accentColor}) {
  const isDark = mode === 'dark';
  const ac = accentColor || t.accent;
  const bloom1 = hexToRgba(ac, isDark ? 0.20 : 0.26);
  return (
    <>
      <div style={{position:'absolute', left:'45%', top:'-25%', width:1300, height:1300, borderRadius:'50%',
        background:`radial-gradient(circle, ${bloom1}, transparent 60%)`,
        filter:'blur(90px)', pointerEvents:'none'}} />
      <div style={{position:'absolute', left:'-20%', top:'25%', width:1000, height:1000, borderRadius:'50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(62,99,221,0.18), transparent 60%)'
          : 'radial-gradient(circle, rgba(62,99,221,0.14), transparent 60%)',
        filter:'blur(90px)', pointerEvents:'none'}} />
      <div style={{position:'absolute', right:'-15%', bottom:'-15%', width:1100, height:1100, borderRadius:'50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(173,127,88,0.14), transparent 60%)'
          : 'radial-gradient(circle, rgba(173,127,88,0.22), transparent 60%)',
        filter:'blur(90px)', pointerEvents:'none'}} />
      <div style={{position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:`radial-gradient(${isDark ? 'rgba(255,255,255,0.025)' : 'rgba(28,27,24,0.04)'} 1px, transparent 1px)`,
        backgroundSize:'3px 3px', mixBlendMode: isDark ? 'screen' : 'multiply', opacity:0.5}} />
    </>
  );
}

function PageNav({active, t = window.TOKENS.light, mode = 'light', accent}) {
  const items = ['Code', 'Music', 'Sound', 'Photo', 'Video', 'Blog', 'About'];
  const ac = accent || t.accent;
  return (
    <div style={{
      position:'absolute', top:24, left:40, right:40, height:56,
      padding:'10px 14px 10px 18px', borderRadius:18,
      background: mode === 'dark' ? 'rgba(40,40,38,0.55)' : 'rgba(255,253,247,0.65)',
      border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(24px) saturate(170%)',
      WebkitBackdropFilter:'blur(24px) saturate(170%)',
      boxShadow: `0 1px 0 ${mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)'} inset, ${t.shadowMd}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      fontFamily: _baseFont.display, fontSize:14, color: t.text, zIndex:10,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{
          width:30, height:30, borderRadius:8,
          background: ac,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily: _baseFont.display, fontSize:14, fontWeight:700, letterSpacing:'-0.02em', color:'#fff',
          boxShadow:`0 2px 6px ${ac}33`,
        }}>TH</div>
        <span style={{fontSize:16, fontWeight:600, letterSpacing:'-0.02em'}}>Tom Hinsley</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:2}}>
        {items.map((n) => {
          const isActive = active && n.toLowerCase() === active.toLowerCase();
          return (
            <span key={n} style={{
              padding:'9px 14px', borderRadius:10, fontWeight:500, letterSpacing:'-0.005em',
              background: isActive ? t.text : 'transparent', color: isActive ? t.bg : t.text,
            }}>{n}</span>
          );
        })}
      </div>
      <a style={{
        padding:'10px 16px', borderRadius:10, background:ac, color:t.textOnAccent, textDecoration:'none',
        fontWeight:600, letterSpacing:'-0.005em', boxShadow:`0 6px 18px ${ac}44`,
      }}>hello@tomhinsley.com →</a>
    </div>
  );
}

function TechChip({label, t = window.TOKENS.light, mode = 'light'}) {
  return (
    <span style={{
      display:'inline-flex', padding:'3px 9px', borderRadius:6,
      border:`1px solid ${t.ruleSoft}`,
      background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,253,247,0.6)',
      fontFamily:_baseFont.mono, fontSize:10, color:t.textSoft,
      letterSpacing:'0.02em', whiteSpace:'nowrap',
    }}>{label}</span>
  );
}

function PageFooter({t = window.TOKENS.light, mode = 'light'}) {
  const items = ['Tom Hinsley', '●', 'hello@tomhinsley.com', '●', 'London 51.5°N', '●', 'Get in touch'];
  return (
    <div style={{position:'absolute', left:40, right:40, bottom:32}}>
      <div style={{
        padding:'22px 0', borderTop:`1px solid ${t.rule}`, borderBottom:`1px solid ${t.rule}`,
        overflow:'hidden', whiteSpace:'nowrap',
      }}>
        <div style={{
          fontFamily:_baseFont.display, fontSize:88, fontWeight:600, letterSpacing:'-0.05em',
          display:'flex', alignItems:'center', gap:48, lineHeight:1, color:t.text,
        }}>
          {[...items, ...items].map((item, i) => {
            if (item === '●') return <span key={i} style={{color:t.accent, fontSize:24}}>●</span>;
            return <span key={i} style={i % 7 === 4 ? {color:t.textSoft, fontWeight:500} : {}}>{item}</span>;
          })}
        </div>
      </div>

      <div style={{
        paddingTop:32, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:32,
        fontSize:13, color:t.textSoft, lineHeight:1.6, fontFamily:_baseFont.display,
      }}>
        <div>
          <div style={{color:t.text, fontFamily:_baseFont.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Tom Hinsley</div>
          <div>A digital creative based in London. Frontend engineer with side practices in music, sound, photo, video &amp; blog.</div>
        </div>
        <div>
          <div style={{color:t.text, fontFamily:_baseFont.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Sections</div>
          <div>Code<br/>Music<br/>Sound<br/>Photo<br/>Video<br/>Blog</div>
        </div>
        <div>
          <div style={{color:t.text, fontFamily:_baseFont.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Elsewhere</div>
          <div>Github<br/>Are.na<br/>Read.cv<br/>Bluesky</div>
        </div>
        <div>
          <div style={{color:t.text, fontFamily:_baseFont.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>Colophon</div>
          <div>Set in Space Grotesk + JetBrains Mono. Built with Sanity. Colors from Radix.</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{color:t.text, fontFamily:_baseFont.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8}}>© 2026</div>
          <div>v6.0</div>
        </div>
      </div>
    </div>
  );
}

function FilterPills({items, active=0, t = window.TOKENS.light, mode = 'light'}) {
  return (
    <div style={{display:'flex', gap:6, padding:5, borderRadius:14,
      background: mode === 'dark' ? 'rgba(40,40,38,0.55)' : 'rgba(255,253,247,0.55)',
      border:`1px solid ${t.surfaceEdge}`, backdropFilter:'blur(20px)'}}>
      {items.map(([n, c], i) => (
        <span key={n} style={{
          padding:'9px 13px', borderRadius:10, fontFamily:_baseFont.display, fontSize:13, fontWeight:600,
          background: i===active ? t.text : 'transparent', color: i===active ? t.bg : t.text,
          display:'inline-flex', alignItems:'center', gap:6,
        }}>{n}{c != null && <span style={{opacity:0.55, fontFamily:_baseFont.mono, fontSize:10, fontWeight:400}}>{c}</span>}</span>
      ))}
    </div>
  );
}

Object.assign(window, {
  PageBg, PageNav, PageFooter, TechChip, FilterPills,
});
