// About / CV page — with scroll-revealed interactive timeline.
// Static mockup shows the structure; entries lower in the timeline use
// progressive opacity to indicate the on-scroll reveal animation.

const { THEME: t_a, DISCIPLINES: D_a, PageBg: PageBg_a, PageNav: PageNav_a,
        PageFooter: PageFooter_a, TechChip: TechChip_a } = window;

const ABOUT_W = 1440;
const ABOUT_H = 3920;

function AboutHero() {
  const t = t_a;
  return (
    <div style={{position:'absolute', left:40, right:40, top:120, height:560}}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:24, display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{width:8, height:8, borderRadius:'50%', background:t.accent,
          boxShadow:`0 0 0 4px rgba(221,74,46,0.18)`}} />
        <span>About · Tom Hinsley</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>London · 51.5°N</span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'360px 1fr', gap:56, alignItems:'end',
      }}>
        {/* Avatar placeholder */}
        <div style={{
          aspectRatio:'4/5', borderRadius:18, position:'relative', overflow:'hidden',
          background:`linear-gradient(160deg, #dd4a2e 0%, #c84830 40%, #5e1c14 100%)`,
          boxShadow:'0 30px 60px rgba(13,14,18,0.20)',
        }}>
          <div style={{position:'absolute', inset:0,
            background:`repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 14px, transparent 14px 28px)`}} />
          <div style={{
            position:'absolute', left:14, top:14, padding:'4px 10px', borderRadius:6,
            background:'rgba(13,14,18,0.7)', color:'#fff',
            fontFamily:t.mono, fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase',
          }}>Portrait · 2026</div>
          <div style={{
            position:'absolute', right:14, bottom:14, fontFamily:t.mono, fontSize:10,
            color:'rgba(255,255,255,0.8)', letterSpacing:'0.08em', textAlign:'right',
          }}>shot by a friend ·<br/>roll 14 · frame 02</div>
        </div>

        <div style={{paddingBottom:8}}>
          <h1 style={{
            margin:0, fontFamily:t.display,
            fontSize:148, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600,
          }}>
            Tom Hinsley<span style={{color:t.accent}}>.</span>
          </h1>
          <p style={{
            margin:'24px 0 0', maxWidth:640, fontFamily:t.display,
            fontSize:22, lineHeight:1.4, color:t.inkSoft, fontWeight:400,
          }}>
            Trained as a designer, now a frontend engineer in London —
            with side practices in music, sound, photo, video and writing.
          </p>
          <div style={{marginTop:28, display:'flex', flexWrap:'wrap', gap:6}}>
            {['Frontend','3D','Generative','Music','Sound design','Photography','Video','Writing'].map((tag, i) =>
              <TechChip_a key={i} label={tag} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutIntro() {
  const t = t_a;
  return (
    <div style={{position:'absolute', left:40, right:40, top:720, height:260}}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:64, paddingTop:24, borderTop:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14,
          }}>Currently</div>
          <div style={{fontFamily:t.display, fontSize:28, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.15}}>
            Frontend Engineer at <span style={{color:t.accent}}>a research lab</span>.
          </div>
          <div style={{marginTop:14, fontFamily:t.mono, fontSize:12, color:t.inkSoft, lineHeight:1.7}}>
            Mostly building research interfaces.<br/>
            Working on side things in the evenings.
          </div>
        </div>
        <div style={{fontFamily:t.display, fontSize:18, color:t.inkSoft, lineHeight:1.55}}>
          <p style={{margin:'0 0 14px'}}>
            I&rsquo;ve been building things on the web since 2018 — first as a
            designer, then increasingly as an engineer. My day job is shipping
            production interfaces; the rest of my time goes into smaller, weirder
            projects that mix code with sound, image and writing.
          </p>
          <p style={{margin:0}}>
            Most of what&rsquo;s here is self-initiated. If something looks like the
            sort of thing you&rsquo;d like to commission, send me a note.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ Interactive scrolling timeline ============
const TIMELINE = [
  { year:'2026 — present',     role:'Frontend Engineer',           place:'Research Lab · London',
    desc:'Building research interfaces and small tools. Working with the design team on a long-running internal system; occasional side experiments with WebGL.',
    tags:['React','TypeScript','Three.js','Design systems'],
    accent:'#dd4a2e',
  },
  { year:'2024 — 2026',         role:'Senior Frontend',             place:'Studio Z · London',
    desc:'Two years building marketing sites, product surfaces and the occasional micro-tool for client work. Set up the studio\u2019s component library.',
    tags:['Next.js','Sanity','Tailwind','Storybook'],
    accent:'#5b76d6',
  },
  { year:'2022 — 2024',         role:'Frontend Developer',          place:'Agency Y · Berlin',
    desc:'Joined a small studio in Mitte. Shipped a half-dozen identity sites, learned to draw clean React state diagrams on a whiteboard, drank too much filter coffee.',
    tags:['React','TypeScript','Framer Motion','Contentful'],
    accent:'#7a5fd0',
  },
  { year:'2020 — 2022',         role:'Designer / Developer',        place:'Independently · Remote',
    desc:'Freelance through the pandemic — building portfolios, brand sites, and a couple of small generative tools. Started teaching myself sound design somewhere in the middle.',
    tags:['Webflow','Vue.js','Figma','Ableton'],
    accent:'#d4a55b',
  },
  { year:'2018 — 2022',         role:'BA Digital Media',            place:'University Q · UK',
    desc:'Half design, half code; thesis was a generative typography tool. The course pushed me toward writing more software than I planned to.',
    tags:['Processing','p5.js','Print','Editorial'],
    accent:'#2a7caa',
  },
  { year:'2016 — 2018',         role:'First projects',              place:'Self-taught',
    desc:'Made my first paid site for a local restaurant in 2017. Spent the next eighteen months learning git, css and how to invoice.',
    tags:['HTML','CSS','jQuery','Self-taught'],
    accent:'#4e8068',
  },
  { year:'2014 — 2016',         role:'Sixth form',                  place:'Hampshire',
    desc:'Started a blog about film cameras. Never updated it past month two, but learned enough about Squarespace to convince myself I could build websites.',
    tags:['Squarespace','35mm'],
    accent:'#aaaaaa',
  },
];

function TimelineItem({entry, opacity, offset}) {
  const t = t_a;
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'200px 40px 1fr', gap:32, alignItems:'flex-start',
      opacity, transform:`translateY(${offset}px)`,
      transition:'opacity .4s ease-out, transform .4s ease-out',
      paddingBottom:48,
    }}>
      <div style={{textAlign:'right', paddingTop:6}}>
        <div style={{fontFamily:t.mono, fontSize:11, color:t.ink, letterSpacing:'0.06em', textTransform:'uppercase'}}>{entry.year}</div>
      </div>
      <div style={{position:'relative', display:'flex', justifyContent:'center', paddingTop:6}}>
        <span style={{
          width:14, height:14, borderRadius:'50%', background:entry.accent,
          boxShadow:`0 0 0 4px rgba(13,14,18,0.05), 0 0 18px ${entry.accent}55`,
          position:'relative', zIndex:2,
        }} />
      </div>
      <div>
        <div style={{fontFamily:t.display, fontSize:30, fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.1}}>
          {entry.role} <span style={{color:t.inkSoft, fontWeight:500}}>· {entry.place}</span>
        </div>
        <p style={{
          margin:'14px 0 16px', fontFamily:t.display, fontSize:17, color:t.inkSoft, lineHeight:1.55, maxWidth:680, fontWeight:400,
        }}>{entry.desc}</p>
        <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
          {entry.tags.map((tag, i) => <TechChip_a key={i} label={tag} />)}
        </div>
      </div>
    </div>
  );
}

function AboutTimeline() {
  const t = t_a;
  // Static opacities to suggest the scroll-reveal animation pattern.
  const visibility = [1, 1, 1, 0.85, 0.55, 0.30, 0.12];
  const offsets    = [0, 0, 0, 8,    14,   22,   30];
  return (
    <div style={{position:'absolute', left:40, right:40, top:1040, height:1700}}>
      {/* section header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32}}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>§ Career timeline · scroll-revealed</div>
          <h2 style={{margin:0, fontSize:64, lineHeight:0.92, letterSpacing:'-0.04em', fontWeight:600, fontFamily:t.display}}>
            Where I&rsquo;ve been<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        <div style={{
          padding:'10px 16px', borderRadius:10, border:`1px solid ${t.ruleSoft}`,
          background:'rgba(255,253,247,0.55)', backdropFilter:'blur(12px)',
          fontFamily:t.mono, fontSize:11, color:t.inkSoft, letterSpacing:'0.06em', textTransform:'uppercase',
          display:'inline-flex', alignItems:'center', gap:8,
        }}>
          <span style={{
            display:'inline-block', width:8, height:8, borderRadius:'50%',
            background:t.accent, boxShadow:`0 0 0 3px rgba(221,74,46,0.18)`,
          }} />
          Items reveal on scroll
        </div>
      </div>

      {/* spine + items */}
      <div style={{position:'relative', paddingTop:24}}>
        {/* vertical spine line (behind markers) */}
        <div style={{
          position:'absolute',
          left:200 + 32 + 6,  // align with marker center
          top:0, bottom:0, width:1, background:t.ruleSoft,
        }} />
        {TIMELINE.map((entry, i) => (
          <TimelineItem key={i} entry={entry} opacity={visibility[i]} offset={offsets[i]} />
        ))}

        {/* scroll prompt at the end */}
        <div style={{
          paddingLeft:272, fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.14em', textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:10, marginTop:-12,
        }}>
          <span>↓ Continue scrolling</span>
          <span style={{width:24, height:1, background:t.ruleSoft}} />
          <span>more reveals as you go</span>
        </div>
      </div>
    </div>
  );
}

// ============ Skills section ============
const SKILLS = [
  { discipline:'code',  tools:['React','TypeScript','Next.js','Three.js','React Three Fiber','WebGL','GLSL','Node.js','Sanity','Storybook','Tailwind','Vite','Godot','React Native','Expo'] },
  { discipline:'music', tools:['Logic Pro X','Ableton Live','Tape (TASCAM 388)','Modular synthesis','Field recording'] },
  { discipline:'sound', tools:['Pro Tools','Reaper','iZotope RX','Soundminer','Field recording'] },
  { discipline:'photo', tools:['35mm (Leica M6, Mamiya 7)','Digital (Fuji X-T5)','Lightroom','Negative Lab Pro','Portra 400','HP5+'] },
  { discipline:'video', tools:['Final Cut Pro X','DaVinci Resolve','Premiere','RED','BMPCC 6K'] },
  { discipline:'blog',  tools:['Long-form writing','Sanity','Markdown'] },
];

function AboutSkills() {
  const t = t_a;
  return (
    <div style={{position:'absolute', left:40, right:40, top:2820, height:480}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:24, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>§ Tools and craft</div>
          <h2 style={{margin:0, fontSize:54, lineHeight:0.92, letterSpacing:'-0.04em', fontWeight:600, fontFamily:t.display}}>
            What I work with<span style={{color:t.accent}}>.</span>
          </h2>
        </div>
        <div style={{fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          Not exhaustive · last updated Mar 2026
        </div>
      </div>
      <div style={{
        marginTop:28, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'24px 28px',
      }}>
        {SKILLS.map((s, i) => {
          const d = D_a[s.discipline];
          return (
            <div key={i} style={{
              padding:'16px 18px', borderRadius:14,
              background:'rgba(255,253,247,0.5)', border:'1px solid rgba(255,255,255,0.8)',
              backdropFilter:'blur(16px) saturate(160%)', WebkitBackdropFilter:'blur(16px) saturate(160%)',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:9, marginBottom:12}}>
                <span style={{width:10, height:10, borderRadius:'50%', background:d.color}} />
                <span style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em'}}>/{s.discipline}</span>
              </div>
              <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                {s.tools.map((tool, ix) => <TechChip_a key={ix} label={tool} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutContactCTA() {
  const t = t_a;
  return (
    <div style={{position:'absolute', left:40, right:40, top:3320}}>
      <div style={{
        padding:'56px 48px', borderRadius:24,
        background:'rgba(255,253,247,0.55)', border:'1px solid rgba(255,255,255,0.85)',
        backdropFilter:'blur(28px) saturate(170%)', WebkitBackdropFilter:'blur(28px) saturate(170%)',
        boxShadow:'0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 70px rgba(13,14,18,0.10)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14,
          }}>Get in touch</div>
          <h3 style={{
            margin:0, fontFamily:t.display, fontSize:56, lineHeight:0.95, letterSpacing:'-0.035em', fontWeight:600,
          }}>
            Working on something<br/>
            <span style={{color:t.inkSoft, fontWeight:500}}>I should know about?</span>
          </h3>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:12, alignItems:'flex-end'}}>
          <a style={{
            padding:'18px 28px', borderRadius:12, background:t.accent, color:'#fff', textDecoration:'none',
            fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.005em',
            boxShadow:`0 8px 22px ${t.accent}44`,
          }}>hello@tomhinsley.com →</a>
          <span style={{fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em'}}>
            usually replies within a day or two.
          </span>
        </div>
      </div>
    </div>
  );
}

function PageAbout() {
  return (
    <div style={{
      width: ABOUT_W, height: ABOUT_H, background: t_a.bg, color: t_a.ink,
      position:'relative', overflow:'hidden', fontFamily: t_a.display,
    }}>
      <PageBg_a />
      <PageNav_a active="about" />
      <AboutHero />
      <AboutIntro />
      <AboutTimeline />
      <AboutSkills />
      <AboutContactCTA />
      <PageFooter_a />
    </div>
  );
}

window.PageAbout = PageAbout;
window.ABOUT_DIM = { w: ABOUT_W, h: ABOUT_H };
