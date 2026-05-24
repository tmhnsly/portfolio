// Blog index — /blog
// Hero + tag pills, featured (latest) post, list of older posts, pagination.

const { THEME: t_b, DISCIPLINES: D_b, PageBg: PageBg_b, PageNav: PageNav_b,
        PageFooter: PageFooter_b, TechChip: TechChip_b, FilterPills: FilterPills_b } = window;

const BL_W = 1440;
const BL_H = 2780;

const POSTS = [
  { date:'12 Apr 2026', cat:'Studio log',  title:'Studio log #04 — early 2026',                              excerpt:'A quarterly catch-up. What I shipped, what I shelved, and the small thing that surprised me about React 19.',                          read:'6 min', tags:['Studio log','Code','React'] },
  { date:'28 Mar 2026', cat:'Process',     title:'Notes on building tools that aren\u2019t startups',         excerpt:'In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow.',                                read:'12 min', tags:['Process','Tools'] },
  { date:'14 Feb 2026', cat:'Photography', title:'Why I switched back to film for personal photography',     excerpt:'I sold my digital camera last year and replaced it with a Leica M6. Some thoughts after fifteen rolls.',                                 read:'8 min', tags:['Photography','35mm','Leica'] },
  { date:'02 Feb 2026', cat:'Sound',       title:'A field recording from the kitchen',                       excerpt:'Brief notes on a thirty-minute recording of nothing happening in particular, and why I keep going back to it.',                            read:'4 min', tags:['Sound','Field recording'] },
  { date:'18 Jan 2026', cat:'Reading',     title:'Re-reading Calvino at the start of a new year',            excerpt:'Why \u2018Invisible Cities\u2019 keeps coming back. Notes on a book I\u2019ve read three times and still don\u2019t finish.',                  read:'7 min', tags:['Reading','Books'] },
  { date:'21 Dec 2025', cat:'Music',       title:'Three months with Logic Pro X — a developer\u2019s notes',  excerpt:'On switching from Ableton, the things that took me by surprise, and the macOS shortcuts I\u2019ve quietly learned to love.',              read:'10 min', tags:['Music','Logic Pro X','Workflow'] },
  { date:'07 Nov 2025', cat:'Code',        title:'The case for handwritten CSS',                             excerpt:'A defence of writing your own classes, in 2025, even when Tailwind is right there. Or, a love letter to BEM.',                              read:'14 min', tags:['Code','CSS','Process'] },
  { date:'29 Oct 2025', cat:'Process',     title:'A small Sanity setup for non-technical clients',           excerpt:'How I structure a Sanity studio so the friend who runs a café can update their menu without calling me first.',                            read:'16 min', tags:['Process','Sanity','CMS'] },
  { date:'12 Sep 2025', cat:'Studio log',  title:'Studio log #03 — autumn \u201925',                          excerpt:'Looking back at the summer\u2019s side projects and the one client thing that ate up August.',                                                read:'5 min', tags:['Studio log'] },
];

function BlHero() {
  const t = t_b;
  return (
    <div style={{position:'absolute', left:40, right:40, top:120, height:460}}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:24, display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{width:10, height:10, borderRadius:'50%', background:D_b.blog.color,
          boxShadow:`0 0 0 4px rgba(78,128,104,0.18)`}} />
        <span>/blog · 17 posts · since 2024</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'end'}}>
        <div>
          <h1 style={{
            margin:0, fontFamily:t.display,
            fontSize:200, lineHeight:0.88, letterSpacing:'-0.05em', fontWeight:600,
          }}>
            Blog<span style={{color:D_b.blog.color}}>.</span>
          </h1>
          <p style={{
            margin:'24px 0 0', maxWidth:580, fontFamily:t.display,
            fontSize:20, lineHeight:1.5, color:t.inkSoft, fontWeight:400,
          }}>
            Notes, essays and dev logs. Mostly about whatever I&rsquo;m
            currently chewing on — usually code, sometimes sound, occasionally
            a book.
          </p>
        </div>
        <div style={{paddingBottom:10}}>
          <div style={{
            fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14,
          }}>Filter</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
            {[['All',17],['Studio logs',4],['Code',5],['Process',3],['Music',2],['Sound',1],['Photography',1],['Reading',1]].map(([n, c], i) => (
              <span key={n} style={{
                padding:'7px 12px', borderRadius:8, fontFamily:t.display, fontSize:13, fontWeight:600,
                background: i===0 ? t.ink : 'rgba(255,253,247,0.55)',
                color: i===0 ? '#fff' : t.ink,
                border: i===0 ? 'none' : `1px solid ${t.ruleSoft}`,
                display:'inline-flex', alignItems:'center', gap:6,
              }}>{n} <span style={{opacity:0.55, fontFamily:t.mono, fontSize:10, fontWeight:400}}>{c}</span></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlFeatured() {
  const t = t_b;
  const p = POSTS[0];
  return (
    <div style={{position:'absolute', left:40, right:40, top:620, height:380}}>
      <div style={{
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14,
        display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{color:t.ink}}>Latest</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>{p.date} · {p.read} read</span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:32,
        height:330,
      }}>
        {/* Featured image */}
        <div style={{
          borderRadius:18, background:D_b.blog.grad,
          position:'relative', overflow:'hidden',
          boxShadow:'0 22px 50px rgba(13,14,18,0.16)',
        }}>
          <div style={{position:'absolute', inset:0,
            background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)`}} />
          <div style={{position:'absolute', right:-10, bottom:-30,
            fontFamily:t.display, fontSize:240, color:'rgba(255,255,255,0.16)',
            fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9}}>04</div>
          <div style={{position:'absolute', left:18, top:18, padding:'5px 12px', borderRadius:999,
            background:'rgba(255,255,255,0.92)', color:t.ink, fontSize:12, fontWeight:600, letterSpacing:'-0.005em'}}>
            {p.cat}
          </div>
        </div>
        {/* Featured content */}
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <h2 style={{
              margin:0, fontFamily:t.display, fontSize:52, lineHeight:1, letterSpacing:'-0.035em', fontWeight:600,
            }}>{p.title}</h2>
            <p style={{
              margin:'20px 0 0', fontFamily:t.display, fontSize:18, color:t.inkSoft, lineHeight:1.5, fontWeight:400, maxWidth:560,
            }}>{p.excerpt}</p>
          </div>
          <div>
            <div style={{display:'flex', gap:5, flexWrap:'wrap', marginBottom:18}}>
              {p.tags.map((tag, i) => <TechChip_b key={i} label={tag} />)}
            </div>
            <div style={{
              fontFamily:t.display, fontSize:15, fontWeight:600, letterSpacing:'-0.005em', color:t.ink,
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              Read the post <span style={{color:D_b.blog.color}}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlListItem({date, cat, title, excerpt, read, tags}) {
  const t = t_b;
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'120px 1fr 240px',
      gap:32, alignItems:'flex-start',
      padding:'24px 0', borderBottom:`1px solid ${t.ruleSoft}`,
    }}>
      <div>
        <div style={{
          fontFamily:t.mono, fontSize:11, color:t.ink, letterSpacing:'0.06em',
        }}>{date}</div>
        <div style={{
          fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.14em', textTransform:'uppercase', marginTop:6,
        }}>{cat}</div>
      </div>
      <div>
        <div style={{
          fontFamily:t.display, fontSize:26, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1.15,
        }}>{title}</div>
        <p style={{
          margin:'10px 0 12px', fontFamily:t.display, fontSize:15, color:t.inkSoft, lineHeight:1.5, maxWidth:760,
        }}>{excerpt}</p>
        <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>
          {tags.map((tag, i) => <TechChip_b key={i} label={tag} />)}
        </div>
      </div>
      <div style={{
        textAlign:'right', paddingTop:6,
        fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em',
        display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8,
      }}>
        <span>{read} read</span>
        <span style={{
          fontFamily:t_b.display, fontSize:14, fontWeight:600, color:t.ink, letterSpacing:'-0.005em',
          display:'inline-flex', alignItems:'center', gap:6,
        }}>read →</span>
      </div>
    </div>
  );
}

function BlList() {
  const t = t_b;
  return (
    <div style={{position:'absolute', left:40, right:40, top:1050}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:16, borderBottom:`1px solid ${t.rule}`,
      }}>
        <div style={{fontFamily:t.display, fontSize:32, fontWeight:600, letterSpacing:'-0.03em'}}>
          Older posts<span style={{color:D_b.blog.color}}>.</span>
        </div>
        <div style={{fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          Showing 8 of 16 · sorted by date ↓
        </div>
      </div>
      {POSTS.slice(1).map((p, i) => <BlListItem key={i} {...p} />)}

      {/* Pagination */}
      <div style={{
        marginTop:24, display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          Page 01 / 02
        </span>
        <div style={{display:'flex', gap:8}}>
          <button style={{
            padding:'10px 14px', borderRadius:10, border:`1px solid ${t.ruleSoft}`,
            background:'rgba(255,253,247,0.55)', backdropFilter:'blur(12px)',
            fontFamily:t.display, fontSize:13, fontWeight:600, color:t.muted, cursor:'pointer',
          }}>← Newer</button>
          <button style={{
            padding:'10px 14px', borderRadius:10, border:'none',
            background:t.ink, color:'#fff',
            fontFamily:t.display, fontSize:13, fontWeight:600, cursor:'pointer',
            boxShadow:'0 6px 14px rgba(13,14,18,0.25)',
          }}>Older →</button>
        </div>
      </div>
    </div>
  );
}

function PageBlogIndex() {
  return (
    <div style={{
      width: BL_W, height: BL_H, background: t_b.bg, color: t_b.ink,
      position:'relative', overflow:'hidden', fontFamily: t_b.display,
    }}>
      <PageBg_b accentColor={D_b.blog.color} />
      <PageNav_b active="blog" accent={D_b.blog.color} />
      <BlHero />
      <BlFeatured />
      <BlList />
      <PageFooter_b />
    </div>
  );
}

window.PageBlogIndex = PageBlogIndex;
window.BL_DIM = { w: BL_W, h: BL_H };
