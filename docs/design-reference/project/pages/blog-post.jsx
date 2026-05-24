// Blog post — /blog/[slug]
// Article hero, featured image, long-form body w/ H2s + pull quote + code,
// tags, author bio, related posts, prev/next.

const { THEME: t_bp, DISCIPLINES: D_bp, PageBg: PageBg_bp, PageNav: PageNav_bp,
        PageFooter: PageFooter_bp, TechChip: TechChip_bp } = window;

const BP_W = 1440;
const BP_H = 3960;

function BPBreadcrumb() {
  const t = t_bp;
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:110,
      fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase',
      display:'flex', alignItems:'center', gap:10,
    }}>
      <span>Home</span><span>/</span>
      <span style={{color:t.ink}}>Blog</span><span>/</span>
      <span style={{color:t.ink}}>Notes on building tools that aren&rsquo;t startups</span>
    </div>
  );
}

function BPHero() {
  const t = t_bp;
  return (
    <div style={{position:'absolute', left:40, right:40, top:170, height:480}}>
      <div style={{
        display:'flex', alignItems:'center', gap:10, marginBottom:32,
      }}>
        <span style={{
          padding:'5px 12px', borderRadius:999,
          background:D_bp.blog.color, color:'#fff',
          fontFamily:t.display, fontSize:12, fontWeight:600, letterSpacing:'-0.005em',
        }}>Process</span>
        <span style={{fontFamily:t.mono, fontSize:11, color:t.inkSoft, letterSpacing:'0.06em'}}>
          28 Mar 2026 · 12 min read · in /blog
        </span>
      </div>

      <h1 style={{
        margin:0, fontFamily:t.display,
        fontSize:120, lineHeight:0.92, letterSpacing:'-0.045em', fontWeight:600, textWrap:'pretty', maxWidth:1200,
      }}>
        Notes on building<br/>
        tools that aren&rsquo;t startups<span style={{color:D_bp.blog.color}}>.</span>
      </h1>

      <div style={{
        marginTop:32, display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:18, borderTop:`1px solid ${t.ruleSoft}`,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{
            width:36, height:36, borderRadius:'50%',
            background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, ${t.navy} 100%)`,
            boxShadow:`inset -3px -3px 6px rgba(0,0,0,0.18), 0 4px 10px ${t.accent}33`,
          }} />
          <div>
            <div style={{fontFamily:t.display, fontSize:14, fontWeight:600, letterSpacing:'-0.015em'}}>Tom Hinsley</div>
            <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase', marginTop:2}}>
              A digital creative in London
            </div>
          </div>
        </div>
        <div style={{display:'flex', gap:5}}>
          {['Process','Tools','Writing'].map((tag, i) => <TechChip_bp key={i} label={tag} />)}
        </div>
      </div>
    </div>
  );
}

function BPFeaturedImage() {
  const t = t_bp;
  return (
    <div style={{position:'absolute', left:40, right:40, top:680, height:520}}>
      <div style={{
        width:'100%', height:'100%', borderRadius:18,
        background:D_bp.blog.grad, position:'relative', overflow:'hidden',
        boxShadow:'0 30px 70px rgba(13,14,18,0.20)',
      }}>
        <div style={{position:'absolute', inset:0,
          background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 14px, transparent 14px 28px)`}} />
        <div style={{
          position:'absolute', right:-20, bottom:-40,
          fontFamily:t.display, fontSize:360, color:'rgba(255,255,255,0.14)',
          fontWeight:600, letterSpacing:'-0.06em', lineHeight:0.9,
        }}>02</div>
        <div style={{
          position:'absolute', left:24, top:24, padding:'5px 12px', borderRadius:6,
          background:'rgba(13,14,18,0.7)', color:'#fff',
          fontFamily:t.mono, fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase',
        }}>Fig. 01 · cover image</div>
        <div style={{
          position:'absolute', left:24, bottom:24, fontFamily:t.mono, fontSize:11, color:'rgba(255,255,255,0.8)', letterSpacing:'0.06em',
        }}>shot in Berlin, 2024</div>
      </div>
    </div>
  );
}

function BPBody() {
  const t = t_bp;
  return (
    <div style={{position:'absolute', left:40, right:40, top:1240, height:1600}}>
      {/* Main column: 780px centered for readable body */}
      <div style={{maxWidth:780, margin:'0 auto', fontFamily:t.display}}>
        {/* Lead */}
        <p style={{
          margin:0, fontSize:26, lineHeight:1.4, fontWeight:500, color:t.ink, letterSpacing:'-0.015em',
        }}>
          In praise of small, single-purpose software you make for yourself,
          ship for ten people, and never grow.
        </p>

        <p style={{margin:'36px 0 0', fontSize:18, lineHeight:1.7, color:t.inkSoft, fontWeight:400}}>
          A few months ago I started using a tiny CLI I wrote one weekend. It
          does one thing: it watches a folder for new image files, runs them
          through a Lightroom export preset I configured once, and drops the
          results in a folder named after today&rsquo;s date. It will never have
          users. It will never get a landing page. It saves me about ten
          minutes a day and is, for me, software.
        </p>

        <h2 style={{
          margin:'56px 0 0', fontFamily:t.display, fontSize:36, lineHeight:1.15, letterSpacing:'-0.03em', fontWeight:600, color:t.ink,
        }}>
          Tools don&rsquo;t need to be products<span style={{color:D_bp.blog.color}}>.</span>
        </h2>

        <p style={{margin:'24px 0 0', fontSize:18, lineHeight:1.7, color:t.inkSoft, fontWeight:400}}>
          I think the most interesting kind of software is the kind nobody talks
          about. Not the apps with the funding round and the launch tweet, but
          the tiny utilities that one specific person built for one specific
          friction in their day. A python script that renames files. A bash
          function that opens the latest git repo. A 200-line web app that
          converts BPM to milliseconds because the maker is tired of doing it
          in their head.
        </p>

        {/* Pull quote */}
        <div style={{
          margin:'56px -32px', padding:'40px 48px',
          borderLeft:`3px solid ${D_bp.blog.color}`,
          background:'rgba(255,253,247,0.5)',
          backdropFilter:'blur(14px)',
        }}>
          <p style={{
            margin:0, fontFamily:t.display, fontSize:34, lineHeight:1.25,
            letterSpacing:'-0.025em', fontWeight:500, color:t.ink, fontStyle:'normal',
          }}>
            &ldquo;The most interesting kind of software is the kind nobody talks
            about. The tiny utility one person built for one specific friction.&rdquo;
          </p>
          <div style={{
            marginTop:20, fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.14em', textTransform:'uppercase',
          }}>
            — Note to self, somewhere in March
          </div>
        </div>

        <p style={{margin:'40px 0 0', fontSize:18, lineHeight:1.7, color:t.inkSoft, fontWeight:400}}>
          These tools have a different relationship with their maker than
          products do. A product owes its users patches, documentation, a
          roadmap. A tool owes its maker exactly what they decided it should
          do, no more. You can ship it half-broken if you don&rsquo;t need the
          broken half.
        </p>

        <h2 style={{
          margin:'56px 0 0', fontFamily:t.display, fontSize:36, lineHeight:1.15, letterSpacing:'-0.03em', fontWeight:600, color:t.ink,
        }}>
          The five-person ship<span style={{color:D_bp.blog.color}}>.</span>
        </h2>

        <p style={{margin:'24px 0 0', fontSize:18, lineHeight:1.7, color:t.inkSoft, fontWeight:400}}>
          Some of these tools end up being useful to other people too. The
          threshold for sharing them is low — a friend asks what you used, and
          you send them the repo. Five people use it, then ten, then maybe
          twenty. Nobody calls it a product. Nobody asks for features it
          doesn&rsquo;t have.
        </p>

        {/* Code block */}
        <div style={{
          margin:'36px 0',
          padding:'20px 22px', borderRadius:10,
          background:'#1a1c22', color:'#e8e6e0',
          fontFamily:t.mono, fontSize:13, lineHeight:1.7, letterSpacing:'0.02em',
          boxShadow:'0 10px 24px rgba(13,14,18,0.18)',
        }}>
          <div style={{color:'#a8b5a8'}}>$ snip https://github.com/...</div>
          <div style={{color:'#999b9f'}}>saved to: ~/.snips/2026-03-28-a8c1.md</div>
          <div style={{color:'#999b9f'}}>annotated: yes (3 hashtags)</div>
        </div>

        <p style={{margin:'24px 0 0', fontSize:18, lineHeight:1.7, color:t.inkSoft, fontWeight:400}}>
          I&rsquo;d like to make more software like this. Not because I have anything
          against products — I work on products for a living — but because tools
          have a kind of honesty about them that products can&rsquo;t. They exist to
          do a thing. They don&rsquo;t have to be anything else.
        </p>

        <p style={{
          margin:'56px 0 0', fontFamily:t.mono, fontSize:12, color:t.muted, lineHeight:1.7, letterSpacing:'0.04em',
        }}>
          ※ &nbsp; This piece was written with <code style={{
            padding:'2px 6px', borderRadius:4, background:'rgba(13,14,18,0.08)', fontFamily:t.mono,
          }}>snip</code>, a tiny CLI that exists for exactly one person.
        </p>
      </div>
    </div>
  );
}

function BPEnd() {
  const t = t_bp;
  return (
    <div style={{position:'absolute', left:40, right:40, top:2880, height:160}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:22, borderTop:`1px solid ${t.ruleSoft}`,
      }}>
        <div style={{display:'flex', gap:5}}>
          {['Process','Tools','Writing','Code','Sanity'].map((tag, i) => <TechChip_bp key={i} label={tag} />)}
        </div>
        <div style={{display:'flex', gap:14, alignItems:'center', fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase'}}>
          <span>Found this useful?</span>
          <a style={{
            padding:'8px 12px', borderRadius:8, border:`1px solid ${t.ruleSoft}`,
            background:'rgba(255,253,247,0.55)', backdropFilter:'blur(10px)',
            fontFamily:t_bp.display, fontSize:13, fontWeight:600, color:t.ink, textDecoration:'none', letterSpacing:'-0.005em', textTransform:'none',
          }}>Send a note ↗</a>
        </div>
      </div>
      {/* author bio mini-card */}
      <div style={{
        marginTop:24, padding:'18px 22px', borderRadius:14,
        background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
        backdropFilter:'blur(14px)',
        display:'grid', gridTemplateColumns:'52px 1fr auto', gap:18, alignItems:'center',
      }}>
        <div style={{
          width:52, height:52, borderRadius:'50%',
          background:`radial-gradient(circle at 30% 30%, #fff, ${t.accent} 65%, ${t.navy} 100%)`,
          boxShadow:`inset -4px -4px 8px rgba(0,0,0,0.18), 0 4px 12px ${t.accent}44`,
        }} />
        <div>
          <div style={{fontFamily:t.display, fontSize:16, fontWeight:600, letterSpacing:'-0.015em'}}>Tom Hinsley</div>
          <div style={{fontFamily:t.display, fontSize:13, color:t.inkSoft, marginTop:2}}>
            A digital creative in London. Mostly writes about code, sometimes about everything else.
          </div>
        </div>
        <a style={{
          padding:'8px 14px', borderRadius:8, border:`1px solid ${t.ruleSoft}`,
          background:'rgba(255,255,255,0.5)', backdropFilter:'blur(10px)',
          fontFamily:t.display, fontSize:13, fontWeight:600, color:t.ink, textDecoration:'none', letterSpacing:'-0.005em',
        }}>About →</a>
      </div>
    </div>
  );
}

function BPNav() {
  const t = t_bp;
  return (
    <div style={{
      position:'absolute', left:40, right:40, top:3080, height:96,
      display:'grid', gridTemplateColumns:'1fr 1fr', gap:18,
    }}>
      <div style={{
        padding:'16px 22px', borderRadius:14,
        background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
        backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:18,
      }}>
        <span style={{fontFamily:t.mono, fontSize:18, color:t.ink}}>←</span>
        <div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4}}>Older post</div>
          <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em'}}>Why I switched back to film</div>
        </div>
      </div>
      <div style={{
        padding:'16px 22px', borderRadius:14,
        background:'rgba(255,253,247,0.55)', border:`1px solid ${t.ruleSoft}`,
        backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:18, justifyContent:'flex-end', textAlign:'right',
      }}>
        <div>
          <div style={{fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4}}>Newer post</div>
          <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em'}}>Studio log #04</div>
        </div>
        <span style={{fontFamily:t.mono, fontSize:18, color:t.ink}}>→</span>
      </div>
    </div>
  );
}

function BPRelated() {
  const t = t_bp;
  const items = [
    { cat:'Code',    title:'The case for handwritten CSS', date:'Nov 2025', read:'14 min', grad:'linear-gradient(135deg, #dd4a2e, #6b1d1a)' },
    { cat:'Process', title:'A small Sanity setup',         date:'Oct 2025', read:'16 min', grad:'linear-gradient(135deg, #4e8068, #1f3a2f)' },
    { cat:'Music',   title:'Three months with Logic Pro X',date:'Dec 2025', read:'10 min', grad:'linear-gradient(135deg, #1a2347, #050817)' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:3220, height:340}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        paddingBottom:18, borderBottom:`1px solid ${t.ruleSoft}`,
      }}>
        <div>
          <div style={{
            fontFamily:t.mono, fontSize:11, color:t.muted, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10,
          }}>Related posts</div>
          <h3 style={{
            margin:0, fontFamily:t.display, fontSize:30, lineHeight:1, letterSpacing:'-0.03em', fontWeight:600,
          }}>More from the blog<span style={{color:D_bp.blog.color}}>.</span></h3>
        </div>
        <div style={{
          fontFamily:t.mono, fontSize:11, color:t.ink, letterSpacing:'0.06em', textTransform:'uppercase',
          padding:'6px 12px', border:`1px solid ${t.ruleSoft}`, borderRadius:8,
        }}>↗ All posts</div>
      </div>
      <div style={{marginTop:22, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18}}>
        {items.map((p, i) => (
          <div key={i} style={{display:'flex', flexDirection:'column', gap:10}}>
            <div style={{
              aspectRatio:'16/9', borderRadius:12, background:p.grad,
              position:'relative', overflow:'hidden',
              boxShadow:'0 12px 26px rgba(13,14,18,0.12)',
            }}>
              <div style={{position:'absolute', inset:0,
                background:`repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 12px, transparent 12px 24px)`}} />
              <div style={{position:'absolute', left:12, top:12, padding:'3px 9px', borderRadius:999,
                background:'rgba(255,255,255,0.92)', color:t.ink, fontSize:10, fontWeight:600}}>{p.cat}</div>
            </div>
            <div style={{fontFamily:t.display, fontSize:18, fontWeight:600, letterSpacing:'-0.022em', lineHeight:1.2}}>{p.title}</div>
            <div style={{
              fontFamily:t.mono, fontSize:10, color:t.muted, letterSpacing:'0.06em', textTransform:'uppercase',
              display:'flex', justifyContent:'space-between',
            }}>
              <span>{p.date}</span><span>{p.read} read →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageBlogPost() {
  return (
    <div style={{
      width: BP_W, height: BP_H, background: t_bp.bg, color: t_bp.ink,
      position:'relative', overflow:'hidden', fontFamily: t_bp.display,
    }}>
      <PageBg_bp accentColor={D_bp.blog.color} />
      <PageNav_bp active="blog" accent={D_bp.blog.color} />
      <BPBreadcrumb />
      <BPHero />
      <BPFeaturedImage />
      <BPBody />
      <BPEnd />
      <BPNav />
      <BPRelated />
      <PageFooter_bp />
    </div>
  );
}

window.PageBlogPost = PageBlogPost;
window.BP_DIM = { w: BP_W, h: BP_H };
