// Routes overview — visual sitemap. Shows the entire URL tree with
// discipline colours and a one-line description per route.

const { TOKENS: TK_r, DISCIPLINES_T: D_r, TechChip: Chip_r } = window;

const RO_W = 1440;
const RO_H = 2400;

// route → {discipline accent for that branch, path, description}
const ROUTES = [
  { path:'/',           discipline:null,    label:'Home',           desc:'Index. Hero w/ card-deck, discipline scroller, recent feed.',           kind:'page' },
  { path:'/about',      discipline:null,    label:'About',          desc:'Bio, scroll-revealed career timeline, skills, contact CTA.',            kind:'page' },

  { path:'/code',                   discipline:'code',  label:'Code',                   desc:'Section hub. Grid of code projects with filters.',         kind:'section' },
  { path:'/code/[slug]',            discipline:'code',  label:'Code · project',         desc:'Detail page: embed, body, sidebar, gallery, related.',     kind:'detail' },

  { path:'/music',                  discipline:'music', label:'Music',                  desc:'Section hub. Releases, mixes, tape.',                       kind:'section' },
  { path:'/music/[slug]',           discipline:'music', label:'Music · project',        desc:'Detail page using the same project template.',              kind:'detail' },

  { path:'/sound',                  discipline:'sound', label:'Sound',                  desc:'Section hub. Sound design and field recordings.',           kind:'section' },
  { path:'/sound/[slug]',           discipline:'sound', label:'Sound · project',        desc:'Detail page.',                                              kind:'detail' },

  { path:'/photo',                  discipline:'photo', label:'Photo',                  desc:'Section hub. 35mm and digital sets.',                       kind:'section' },
  { path:'/photo/[slug]',           discipline:'photo', label:'Photo · project',        desc:'Detail page.',                                              kind:'detail' },

  { path:'/video',                  discipline:'video', label:'Video',                  desc:'Section hub. Short films and motion.',                       kind:'section' },
  { path:'/video/[slug]',           discipline:'video', label:'Video · project',        desc:'Detail page.',                                              kind:'detail' },

  { path:'/blog',                   discipline:'blog',  label:'Blog',                   desc:'Blog index. Featured + list of older posts.',               kind:'section' },
  { path:'/blog/[slug]',            discipline:'blog',  label:'Blog · post',            desc:'Long-form reading view with pull-quote and code block.',    kind:'detail' },

  { path:'/404',         discipline:null,   label:'404',            desc:'Not-found page with discipline shortcuts.',                              kind:'system' },
];

function RouteRow({r, t}) {
  const d = r.discipline ? D_r[r.discipline] : null;
  const ac = d ? d.color : t.accent;
  const kindLabel = { page:'page', section:'section hub', detail:'detail page', system:'system' }[r.kind];
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'28px 320px 1fr 120px',
      gap:18, alignItems:'center', padding:'14px 18px',
      borderRadius:12, background:t.surfaceSoft, border:`1px solid ${t.surfaceEdge}`,
      backdropFilter:'blur(14px)',
    }}>
      <span style={{
        width:14, height:14, borderRadius:4, background:ac,
        boxShadow:`0 0 0 3px ${ac}22`,
      }} />
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <span style={{fontFamily:t.mono, fontSize:13, color:t.text, letterSpacing:'0.02em'}}>{r.path}</span>
        {r.kind === 'detail' && (
          <span style={{
            padding:'2px 7px', borderRadius:4, background:t.bg, border:`1px solid ${t.ruleSoft}`,
            fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.08em', textTransform:'uppercase',
          }}>dynamic</span>
        )}
      </div>
      <div style={{fontFamily:t.display, fontSize:14, color:t.textSoft, lineHeight:1.4}}>
        <span style={{color:t.text, fontWeight:600}}>{r.label}</span>
        <span style={{color:t.textMuted, margin:'0 8px'}}>·</span>
        {r.desc}
      </div>
      <div style={{
        textAlign:'right', fontFamily:t.mono, fontSize:9, color:t.textMuted, letterSpacing:'0.12em', textTransform:'uppercase',
      }}>{kindLabel}</div>
    </div>
  );
}

function ROHero({t}) {
  return (
    <div style={{position:'absolute', left:40, right:40, top:120}}>
      <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase',
        marginBottom:22, display:'flex', alignItems:'center', gap:12}}>
        <span style={{width:10, height:10, borderRadius:'50%', background:t.accent, boxShadow:`0 0 0 4px ${t.accentGlow}`}} />
        <span>Sitemap · all routes · v1</span>
        <span style={{width:24, height:1, background:t.ruleSoft}} />
        <span>14 routes, 5 templates</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'flex-end'}}>
        <div>
          <h1 style={{margin:0, fontFamily:t.display, fontSize:104, lineHeight:0.9, letterSpacing:'-0.05em', fontWeight:600, color:t.text}}>
            Every route<span style={{color:t.accent}}>.</span>
          </h1>
          <p style={{margin:'20px 0 0', maxWidth:600, fontSize:17, color:t.textSoft, lineHeight:1.5, fontFamily:t.display}}>
            Sanity-driven content, statically generated. Each section (code, music, sound,
            photo, video, blog) shares one template — the only thing that changes is
            the accent colour and the data.
          </p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:6, paddingBottom:12}}>
          {Object.entries(D_r).map(([slug, d]) => (
            <div key={slug} style={{aspectRatio:'1', borderRadius:8, background:d.color,
              boxShadow:t.shadowSm, position:'relative'}}>
              <div style={{position:'absolute', left:6, top:6, fontFamily:t.mono, fontSize:8, color:'#fff'}}>/{slug}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ROList({t}) {
  // group routes
  const groups = [
    { label:'Top-level',  filter:r => r.discipline === null && r.kind === 'page' },
    { label:'Sections',   filter:r => r.kind === 'section' },
    { label:'Detail pages (one template, swap content)', filter:r => r.kind === 'detail' },
    { label:'System',     filter:r => r.kind === 'system' },
  ];
  return (
    <div style={{position:'absolute', left:40, right:40, top:520, display:'flex', flexDirection:'column', gap:30}}>
      {groups.map((g) => (
        <div key={g.label}>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'flex-end',
            paddingBottom:14, borderBottom:`1px solid ${t.ruleSoft}`, marginBottom:14,
          }}>
            <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted, letterSpacing:'0.16em', textTransform:'uppercase'}}>
              {g.label}
            </div>
            <div style={{fontFamily:t.mono, fontSize:11, color:t.textMuted}}>{ROUTES.filter(g.filter).length}</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {ROUTES.filter(g.filter).map((r) => <RouteRow key={r.path} r={r} t={t} />)}
          </div>
        </div>
      ))}

      {/* Template summary */}
      <div style={{
        marginTop:6, padding:'22px 24px', borderRadius:14,
        background:t.text, color:t.bg,
        boxShadow:t.shadowMd,
      }}>
        <div style={{fontFamily:t.mono, fontSize:10, color:'rgba(240,236,226,0.6)', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10}}>
          Five templates · cover every route
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:18}}>
          {[
            { name:'Home',         routes:'/' },
            { name:'Section hub',  routes:'/code · /music · /sound · /photo · /video · /blog' },
            { name:'Detail page',  routes:'/[discipline]/[slug]  (Boucle template)' },
            { name:'About',        routes:'/about (scroll-revealed timeline)' },
            { name:'404',          routes:'/404 (system)' },
          ].map((tpl) => (
            <div key={tpl.name}>
              <div style={{fontFamily:t.display, fontSize:17, fontWeight:600, letterSpacing:'-0.02em', marginBottom:6}}>{tpl.name}</div>
              <div style={{fontFamily:t.mono, fontSize:10, color:'rgba(240,236,226,0.7)', letterSpacing:'0.04em', lineHeight:1.5}}>{tpl.routes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageRoutesOverview() {
  const t = TK_r.light;
  return (
    <div style={{width:RO_W, height:RO_H, background:t.bg, color:t.text,
      position:'relative', overflow:'hidden', fontFamily:t.display}}>
      <window.PageBg t={t} mode="light" />
      <window.PageNav />
      <ROHero t={t} />
      <ROList t={t} />
      <window.PageFooter />
    </div>
  );
}

window.PageRoutesOverview = PageRoutesOverview;
window.RO_DIM = { w:RO_W, h:RO_H };
