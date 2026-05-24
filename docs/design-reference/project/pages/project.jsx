// Project detail page — /code/boucle (pattern for any work item)
// Hero w/ breadcrumb + title + meta, live-demo embed, body w/ sidebar,
// gallery, prev/next, related work, footer.

const { THEME: t_p, DISCIPLINES: D_p, PageBg: PageBg_p, PageNav: PageNav_p,
        PageFooter: PageFooter_p, TechChip: TechChip_p } = window;

const PROJ_W = 1440;
const PROJ_H = 3600;

function ProjBreadcrumb() {
  const t = t_p;
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:110,
      fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase',
      display:'flex', alignItems:'center', gap:10,
    }}>
      <span>Home</span>
      <span>/</span>
      <span style={{color:t.ink}}>Code</span>
      <span>/</span>
      <span style={{color:t.ink}}>Boucle</span>
      <span style={{width:24, height:1, background:t.ruleSoft, margin:'0 6px'}} />
      <span>01 / 24 in section</span>
    </div>
  );
}

function ProjHero() {
  const t = t_p;
  return (
    <div style={{position:'absolute', left:40, right:40, top:170, height:540}}>
      <div style={{
        display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:64,
      }}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:30}}>
            <span style={{
              padding:'5px 12px', borderRadius:999,
              background:D_p.code.color, color:'#fff',
              fontFamily:t.display, fontSize:12, fontWeight:600, letterSpacing:'-0.005em',
            }}>Code</span>
            <span style={{
              padding:'5px 12px', borderRadius:999, border:`1px solid ${D_p.code.color}`,
              color:D_p.code.color, fontFamily:t.mono, fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase',
              display:'inline-flex', alignItems:'center', gap:6,
            }}>
              <span style={{width:6, height:6, borderRadius:'50%', background:D_p.code.color, boxShadow:`0 0 0 3px rgba(221,74,46,0.2)`}} />
              Live
            </span>
            <span style={{fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em'}}>
              boucle.tomhinsley.com ↗
            </span>
          </div>
          <h1 style={{
            margin:0, fontFamily:t.display,
            fontSize:184, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600,
          }}>
            Boucle<span style={{color:D_p.code.color}}>.</span>
          </h1>
          <p style={{
            margin:'22px 0 0', maxWidth:620, fontFamily:t.display,
            fontSize:24, lineHeight:1.35, color:t.inkSoft, fontWeight:400,
          }}>
            A generative drum kit that lives in the browser. Sixteen pads,
            one knob for character, no two sessions the same.
          </p>
        </div>

        {/* meta strip */}
        <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:18, paddingBottom:14}}>
          {[
            ['Role',   'Design + engineering'],
            ['Year',   '2026'],
            ['Status', 'Live · v0.4'],
            ['Repo',   'github.com/th/boucle ↗'],
          ].map(([k, v]) => (
            <div key={k} style={{
              display:'grid', gridTemplateColumns:'90px 1fr', gap:20,
              paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`,
              fontFamily:t.mono, fontSize:12,
            }}>
              <div style={{color:t.muted, letterSpacing:'0.12em', textTransform:'uppercase', fontSize:10}}>{k}</div>
              <div style={{color:t.ink}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjEmbed() {
  const t = t_p;
  // Custom placeholder that hints at the actual UI: 4x4 pad grid + dials.
  return (
    <div style={{position:'absolute', left:40, right:40, top:740, height:560}}>
      <div style={{
        width:'100%', height:'100%', borderRadius:18,
        background:D_p.code.grad, position:'relative', overflow:'hidden',
        boxShadow:'0 30px 70px rgba(13,14,18,0.22)',
      }}>
        <div style={{position:'absolute', inset:0,
          background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 18px, transparent 18px 36px)`}} />

        {/* top chrome */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:56,
          padding:'0 28px', display:'flex', alignItems:'center', justifyContent:'space-between',
          fontFamily:t.mono, fontSize:11, color:'rgba(255,255,255,0.8)', letterSpacing:'0.14em', textTransform:'uppercase',
          borderBottom:'1px solid rgba(255,255,255,0.14)',
        }}>
          <span style={{color:'#fff'}}>Boucle · v0.4</span>
          <div style={{display:'flex', alignItems:'center', gap:18}}>
            <span>● rec</span><span>120 bpm</span><span>4/4</span><span>seed: a8c1</span>
          </div>
          <span>↗ open in new tab</span>
        </div>

        {/* central pad grid */}
        <div style={{
          position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)',
          width:560, height:340,
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14,
        }}>
          {[...Array(16)].map((_, i) => {
            const isActive = [0, 4, 6, 10, 11, 13].includes(i);
            return (
              <div key={i} style={{
                borderRadius:14,
                background: isActive ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.12)',
                border:'1px solid rgba(255,255,255,0.2)',
                boxShadow: isActive ? '0 0 24px rgba(255,255,255,0.4), inset 0 0 0 2px rgba(255,255,255,0.5)' : 'none',
                display:'flex', alignItems:'flex-end', justifyContent:'flex-start',
                padding:'10px 12px',
                fontFamily:t.mono, fontSize:11, color: isActive ? '#1a1a1a' : 'rgba(255,255,255,0.55)',
                letterSpacing:'0.04em',
              }}>{String(i+1).padStart(2,'0')}</div>
            );
          })}
        </div>

        {/* dials left + right */}
        {[ {x:'7%',  label:'tempo',     value:'120'},
           {x:'93%', label:'character', value:'68'} ].map((d, i) => (
          <div key={i} style={{
            position:'absolute', left:d.x, top:'50%', transform:'translate(-50%, -50%)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:12,
          }}>
            <div style={{
              width:90, height:90, borderRadius:'50%',
              background:'rgba(255,255,255,0.92)',
              boxShadow:'inset 0 -6px 12px rgba(0,0,0,0.15), 0 8px 22px rgba(0,0,0,0.18)',
              position:'relative',
            }}>
              <div style={{
                position:'absolute', left:'50%', top:8, width:3, height:24,
                background:t_p.ink, transform:`translateX(-50%) rotate(${i===0 ? -45 : 60}deg)`,
                transformOrigin:'50% 36px', borderRadius:2,
              }} />
            </div>
            <div style={{
              fontFamily:t.mono, fontSize:10, color:'rgba(255,255,255,0.85)', letterSpacing:'0.16em', textTransform:'uppercase',
            }}>
              {d.label} · <span style={{color:'#fff'}}>{d.value}</span>
            </div>
          </div>
        ))}

        {/* bottom chrome */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:48,
          padding:'0 28px', display:'flex', alignItems:'center', justifyContent:'space-between',
          fontFamily:t.mono, fontSize:11, color:'rgba(255,255,255,0.7)', letterSpacing:'0.12em', textTransform:'uppercase',
          borderTop:'1px solid rgba(255,255,255,0.14)',
        }}>
          <span>▶ play · ⏵ shuffle · ⏺ record</span>
          <span style={{color:'#fff'}}>00:00:14:02</span>
          <span>shift + space</span>
        </div>
      </div>
    </div>
  );
}

function ProjBody() {
  const t = t_p;
  return (
    <div style={{position:'absolute', left:40, right:40, top:1340, height:680}}>
      <div style={{display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:64}}>
        {/* Description */}
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:18,
          }}>§ 01 — Notes</div>
          <h2 style={{
            margin:0, fontFamily:t.display, fontSize:42, lineHeight:1.1, letterSpacing:'-0.03em', fontWeight:600,
          }}>
            A way to make noise<br/>without opening Ableton.
          </h2>
          <div style={{marginTop:28, fontFamily:t.display, fontSize:17, color:t.inkSoft, lineHeight:1.6, fontWeight:400, maxWidth:640}}>
            <p style={{margin:'0 0 18px'}}>
              Boucle pairs a small grid sequencer with a procedural sample bank. Each pad
              re-synthesises its own sound on the fly, so no two sessions sound the same —
              the only knob you turn is &ldquo;character&rdquo;, mapped to a few dozen parameters
              under the hood.
            </p>
            <p style={{margin:'0 0 18px'}}>
              I started it as a way to test how far the Web Audio API could be pushed for
              real-time synthesis. It ended up becoming the thing I default to when I want
              to make noise quickly — between meetings, on a train, somewhere with my
              headphones in.
            </p>
            <p style={{margin:'0 0 18px'}}>
              Visuals are kept deliberately minimal. The pads glow when they hit; the
              dials nudge in response to the audio engine. Three.js draws a small particle
              field behind the grid that breathes with the master amplitude.
            </p>
            <p style={{margin:0}}>
              It&rsquo;s open-source, runs on any modern browser, and works on a phone if
              you don&rsquo;t mind the touch targets being a bit small.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{display:'flex', flexDirection:'column', gap:28}}>
          <div>
            <div style={{
              fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14,
            }}>Built with</div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {[
                ['React 19',           'UI scaffold and state'],
                ['TypeScript',         'Type safety end-to-end'],
                ['Web Audio API',      'Synthesis + scheduling'],
                ['Three.js',           'Small 3D visualisation layer'],
                ['Vite',               'Build + HMR'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'120px 1fr', gap:14,
                  paddingBottom:10, borderBottom:`1px solid ${t.ruleSoft}`,
                }}>
                  <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.015em', color:t.ink}}>{k}</div>
                  <div style={{fontFamily:t.display, fontSize:13, color:t.inkSoft, lineHeight:1.4}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14,
            }}>Links</div>
            <div style={{display:'flex', flexDirection:'column', gap:10, fontFamily:t.display, fontSize:14, fontWeight:500}}>
              {[
                ['↗', 'Live — boucle.tomhinsley.com'],
                ['↗', 'Source — github.com/th/boucle'],
                ['↗', 'Notes — read.cv/tomhinsley/boucle'],
              ].map(([icn, v], i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10,
                  background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
                  backdropFilter:'blur(10px)',
                }}>
                  <span style={{color:t.accent}}>{icn}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjGallery() {
  const t = t_p;
  const shots = [
    { caption:'The empty grid. Sixteen pads, one knob.',           grad:'linear-gradient(135deg, #dd4a2e, #6b1d1a)' },
    { caption:'Mid-session. Active pads pulse with audio.',         grad:'linear-gradient(135deg, #e85f3d, #832418)' },
    { caption:'The character dial, mapped to four dozen params.',   grad:'linear-gradient(135deg, #b03e26, #441510)' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:2080, height:420}}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:18,
        display:'flex', alignItems:'center', gap:12,
      }}>
        <span>§ 02 — Gallery</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>3 frames · drag to scroll</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
        {shots.map((s, i) => (
          <div key={i} style={{display:'flex', flexDirection:'column', gap:10}}>
            <div style={{
              aspectRatio:'4/3', borderRadius:14, background:s.grad,
              position:'relative', overflow:'hidden',
              boxShadow:'0 18px 36px rgba(13,14,18,0.14)',
            }}>
              <div style={{position:'absolute', inset:0,
                background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
              <div style={{position:'absolute', left:12, top:12, padding:'3px 8px', borderRadius:6,
                background:'rgba(13,14,18,0.7)', color:'#fff',
                fontFamily:t_p.mono, fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase'}}>
                Fig. {String(i+1).padStart(2,'0')}
              </div>
            </div>
            <div style={{fontFamily:t.mono, fontSize:11, color:t.muted, lineHeight:1.5}}>{s.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjNav() {
  const t = t_p;
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:2560, height:96,
      display:'grid', gridTemplateColumns:'1fr 1fr', gap:18,
    }}>
      <div style={{
        padding:'18px 22px', borderRadius:14,
        background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
        backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:18,
      }}>
        <span style={{fontFamily:t.mono, fontSize:18, color:t.ink}}>←</span>
        <div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4}}>Previous in /code</div>
          <div style={{fontFamily:t.display, fontSize:20, fontWeight:600, letterSpacing:'-0.02em'}}>Caustics — underwater shader</div>
        </div>
      </div>
      <div style={{
        padding:'18px 22px', borderRadius:14,
        background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
        backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:18, justifyContent:'flex-end', textAlign:'right',
      }}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4}}>Next in /code</div>
          <div style={{fontFamily:t.display, fontSize:20, fontWeight:600, letterSpacing:'-0.02em'}}>Tide tables — design system</div>
        </div>
        <span style={{fontFamily:t.mono, fontSize:18, color:t.ink}}>→</span>
      </div>
    </div>
  );
}

function ProjRelated() {
  const t = t_p;
  const items = [
    { discipline:'music', title:'Tape loops, vol. 3',     tech:['Logic Pro X','Ableton'],  date:'Jan 2026' },
    { discipline:'sound', title:'Rooms — SFX library',    tech:['Pro Tools','Reaper'],     date:'Nov 2025' },
    { discipline:'code',  title:'Marble — a small 3D toy', tech:['Three.js','R3F','GLSL'],  date:'Aug 2025' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:2720, height:480}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:20, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>You might also like</div>
          <h2 style={{
            margin:0, fontFamily:t.display, fontSize:38, lineHeight:1, letterSpacing:'-0.03em', fontWeight:600,
          }}>From across the practice<span style={{color:t.accent}}>.</span></h2>
        </div>
        <div style={{
          fontFamily:t.mono, fontSize:11, color:t.ink, letterSpacing:'0.06em', textTransform:'uppercase',
          padding:'6px 12px', border:`1px solid ${t.ruleSoft}`, borderRadius:8,
        }}>↗ Archive</div>
      </div>
      <div style={{marginTop:24, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
        {items.map((p, i) => {
          const d = D_p[p.discipline];
          return (
            <div key={i} style={{display:'flex', flexDirection:'column', gap:12}}>
              <div style={{
                aspectRatio:'4/3', borderRadius:14, background:d.grad,
                position:'relative', overflow:'hidden',
                boxShadow:'0 14px 30px rgba(13,14,18,0.12)',
              }}>
                <div style={{position:'absolute', inset:0,
                  background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
                <div style={{position:'absolute', left:12, top:12, padding:'4px 10px', borderRadius:999,
                  background:'rgba(255,255,255,0.92)', color:t.ink, fontSize:10, fontWeight:600}}>{d.label}</div>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', gap:14, alignItems:'baseline'}}>
                <div style={{fontFamily:t.display, fontSize:19, fontWeight:600, letterSpacing:'-0.022em', lineHeight:1.2}}>{p.title}</div>
                <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, whiteSpace:'nowrap'}}>{p.date}</div>
              </div>
              <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                {p.tech.map((tag, ix) => <TechChip_p key={ix} label={tag} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageProject() {
  return (
    <div style={{
      width: PROJ_W, height: PROJ_H, background: t_p.bg, color: t_p.ink,
      position:'relative', overflow:'hidden', fontFamily: t_p.display,
    }}>
      <PageBg_p accentColor={D_p.code.color} />
      <PageNav_p active="code" accent={D_p.code.color} />
      <ProjBreadcrumb />
      <ProjHero />
      <ProjEmbed />
      <ProjBody />
      <ProjGallery />
      <ProjNav />
      <ProjRelated />
      <PageFooter_p />
    </div>
  );
}

window.PageProject = PageProject;
window.PROJ_DIM = { w: PROJ_W, h: PROJ_H };
