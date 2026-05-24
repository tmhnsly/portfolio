// 404 / not-found page. Discipline-neutral (uses brand tomato accent).
// Visual: big "404", a faux URL bar showing the broken path, options to
// jump to popular destinations.

const { TOKENS: TK_n, DISCIPLINES_T: D_n, TechChip: Chip_n } = window;

const N4_W = 1440;
const N4_H = 1800;

function N4Hero({t}) {
  return (
    <div style={{position:'absolute', left:40, right:40, top:120}}>
      <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:22, display:'flex', alignItems:'center', gap:12}}>
        <span style={{width:10, height:10, borderRadius:'50%', background:t.accent, boxShadow:`0 0 0 4px ${t.accentGlow}`}} />
        <span>404 · page not found</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>that&rsquo;s on me</span>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:64, alignItems:'flex-end'}}>
        <div>
          <h1 style={{margin:0, fontFamily:t.display, fontSize:280, lineHeight:0.85, letterSpacing:'-0.06em', fontWeight:600, color:t.text}}>
            <span style={{color:t.accent}}>4</span>0<span style={{color:t.accent}}>4</span><span style={{color:t.accent}}>.</span>
          </h1>
          <h2 style={{margin:'18px 0 0', fontFamily:t.display, fontSize:42, lineHeight:1.05, letterSpacing:'-0.03em', fontWeight:600, color:t.text}}>
            This page is somewhere else,<br/>
            <span style={{color:t.textSoft, fontWeight:500}}>or maybe nowhere at all.</span>
          </h2>
          <p style={{margin:'20px 0 0', maxWidth:560, fontSize:17, color:t.textSoft, lineHeight:1.5, fontFamily:t.display}}>
            Either I moved it, the link is from a previous version of the site, or you typed
            something hopeful into the URL bar. Honest accounting: probably the first one.
          </p>
        </div>

        {/* Faux URL bar showing the broken path */}
        <div style={{paddingBottom:30}}>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.textMuted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:10}}>
            You asked for
          </div>
          <div style={{
            padding:'14px 18px', borderRadius:12, background:t.surface, border:`1px solid ${t.surfaceEdge}`,
            backdropFilter:'blur(16px)', boxShadow:t.shadowSm,
            display:'flex', alignItems:'center', gap:10,
          }}>
            <span style={{width:10, height:10, borderRadius:'50%', background:t.accent}} />
            <span style={{fontFamily:t.mono, fontSize:14, color:t.text, letterSpacing:'0.02em', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
              tomhinsley.com/code/something-that-doesnt-exist
            </span>
            <span style={{fontFamily:t.mono, fontSize:10, color:t.accent, letterSpacing:'0.1em', textTransform:'uppercase'}}>404</span>
          </div>
          <div style={{marginTop:14, fontFamily:t.mono, fontSize:11, color:t.textSoft, lineHeight:1.7}}>
            <div>↪ <span style={{color:t.text}}>tried:</span> looking for this path</div>
            <div>↪ <span style={{color:t.text}}>found:</span> nothing here</div>
            <div>↪ <span style={{color:t.text}}>suggest:</span> see options below</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function N4Options({t}) {
  const opts = [
    { d:'code',  label:'/code',   desc:'Production frontend, generative builds.' },
    { d:'music', label:'/music',  desc:'Music, releases, tape loops.' },
    { d:'sound', label:'/sound',  desc:'Sound design and field recordings.' },
    { d:'photo', label:'/photo',  desc:'35mm and digital photography.' },
    { d:'video', label:'/video',  desc:'Short films and motion work.' },
    { d:'blog',  label:'/blog',   desc:'Notes, essays and dev logs.' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:830}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:18, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10}}>
            Try one of these instead
          </div>
          <h3 style={{margin:0, fontFamily:t.display, fontSize:46, lineHeight:1, letterSpacing:'-0.035em', fontWeight:600, color:t.text}}>
            Somewhere to go<span style={{color:t.accent}}>.</span>
          </h3>
        </div>
        <a style={{padding:'10px 16px', borderRadius:10, background:t.text, color:t.bg, textDecoration:'none',
          fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.005em'}}>← Back to home</a>
      </div>

      <div style={{marginTop:24, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
        {opts.map((o) => {
          const d = D_n[o.d];
          return (
            <div key={o.d} style={{
              padding:'20px 22px', borderRadius:14,
              background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
              backdropFilter:'blur(20px) saturate(160%)',
              boxShadow:`0 1px 0 rgba(255,255,255,0.9) inset, ${t.shadowSm}`,
              display:'flex', flexDirection:'column', gap:14,
            }}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <span style={{width:12, height:12, borderRadius:'50%', background:d.color,
                    boxShadow:`0 0 0 3px ${d.color}22`}} />
                  <span style={{fontFamily:t.display, fontSize:24, fontWeight:600, letterSpacing:'-0.025em'}}>{o.label}</span>
                </div>
                <span style={{fontFamily:t.mono, fontSize:11, color:t.textMuted}}>↗</span>
              </div>
              <div style={{fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.5}}>{o.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Search prompt */}
      <div style={{
        marginTop:28, padding:'18px 22px', borderRadius:14,
        background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
        backdropFilter:'blur(16px)',
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:18,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <span style={{fontFamily:t.mono, fontSize:12, color:t.textMuted, letterSpacing:'0.06em', textTransform:'uppercase'}}>or</span>
          <span style={{fontFamily:t.display, fontSize:17, fontWeight:500, color:t.text}}>
            Send a note about the broken link
          </span>
        </div>
        <a style={{padding:'10px 16px', borderRadius:10, background:t.accent, color:'#fff', textDecoration:'none',
          fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.005em',
          boxShadow:`0 6px 18px ${t.accent}44`}}>hello@tomhinsley.com →</a>
      </div>
    </div>
  );
}

function PageNotFound() {
  const t = TK_n.light;
  return (
    <div style={{width:N4_W, height:N4_H, background:t.bg, color:t.text,
      position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" />
      <window.PageNav />
      <N4Hero t={t} />
      <N4Options t={t} />
      <window.PageFooter />
    </div>
  );
}

window.PageNotFound = PageNotFound;
window.N4_DIM = { w:N4_W, h:N4_H };
