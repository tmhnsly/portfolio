// Canvas — design system + full responsive flow.
// Each page is its own row: desktop · tablet · mobile (· dark where present).

function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="overview"
        title="Project overview"
        subtitle="Sitemap of every route, with discipline colours and template assignments. The five templates cover every page in the site."
      >
        <DCArtboard id="routes" label="Sitemap · all routes" width={RO_DIM.w} height={RO_DIM.h}>
          <PageRoutesOverview />
        </DCArtboard>
      </DCSection>

      <DCSection id="ds"
        title="Design system — v1"
        subtitle="Tokens, type, spacing, radius, shadows, components. Tomato primary · Space Grotesk + Space Mono · Radix colors · light + dark."
      >
        <DCArtboard id="design-system" label="Design system" width={DS_DIM.w} height={DS_DIM.h}>
          <PageDesignSystem />
        </DCArtboard>
      </DCSection>

      <DCSection id="home" title="Home — /"
        subtitle="Desktop 1440 · Tablet 768 · Mobile 390 · Dark 1440.">
        <DCArtboard id="home-d" label="Desktop · 1440" width={HOME_DIM.w} height={HOME_DIM.h}><PageHome mode="light" /></DCArtboard>
        <DCArtboard id="home-t" label="Tablet · 768" width={HT_DIM.w} height={HT_DIM.h}><PageHomeTablet /></DCArtboard>
        <DCArtboard id="home-m" label="Mobile · 390" width={HM_DIM.w} height={HM_DIM.h}><PageHomeMobile /></DCArtboard>
        <DCArtboard id="home-dark" label="Desktop · dark" width={HOME_DIM.w} height={HOME_DIM.h}><PageHomeDark /></DCArtboard>
      </DCSection>

      <DCSection id="section" title="Section hub — /code"
        subtitle="Discipline accent inherits — code = tomato. Pattern repeats for every section.">
        <DCArtboard id="section-d" label="Desktop · 1440" width={SEC_DIM.w} height={SEC_DIM.h}><PageSection /></DCArtboard>
        <DCArtboard id="section-t" label="Tablet · 768" width={ST_DIM.w} height={ST_DIM.h}><PageSectionTablet /></DCArtboard>
        <DCArtboard id="section-m" label="Mobile · 390" width={SM_DIM.w} height={SM_DIM.h}><PageSectionMobile /></DCArtboard>
      </DCSection>

      <DCSection id="project" title="Project detail — /code/boucle"
        subtitle="Custom embed, body, gallery, prev/next, related.">
        <DCArtboard id="project-d" label="Desktop · 1440" width={PROJ_DIM.w} height={PROJ_DIM.h}><PageProject /></DCArtboard>
        <DCArtboard id="project-t" label="Tablet · 768" width={PT_DIM.w} height={PT_DIM.h}><PageProjectTablet /></DCArtboard>
        <DCArtboard id="project-m" label="Mobile · 390" width={PM_DIM.w} height={PM_DIM.h}><PageProjectMobile /></DCArtboard>
      </DCSection>

      <DCSection id="about" title="About + CV timeline — /about"
        subtitle="Scroll-revealed timeline (lower entries faded to indicate the on-scroll reveal).">
        <DCArtboard id="about-d" label="Desktop · 1440" width={ABOUT_DIM.w} height={ABOUT_DIM.h}><PageAbout /></DCArtboard>
        <DCArtboard id="about-t" label="Tablet · 768" width={AT_DIM.w} height={AT_DIM.h}><PageAboutTablet /></DCArtboard>
        <DCArtboard id="about-m" label="Mobile · 390" width={AM_DIM.w} height={AM_DIM.h}><PageAboutMobile /></DCArtboard>
      </DCSection>

      <DCSection id="blog-index" title="Blog index — /blog"
        subtitle="Blog uses the grass-green discipline accent.">
        <DCArtboard id="blog-i-d" label="Desktop · 1440" width={BL_DIM.w} height={BL_DIM.h}><PageBlogIndex /></DCArtboard>
        <DCArtboard id="blog-i-t" label="Tablet · 768" width={BIT_DIM.w} height={BIT_DIM.h}><PageBlogIndexTablet /></DCArtboard>
        <DCArtboard id="blog-i-m" label="Mobile · 390" width={BIM_DIM.w} height={BIM_DIM.h}><PageBlogIndexMobile /></DCArtboard>
      </DCSection>

      <DCSection id="blog-post" title="Blog post — /blog/[slug]"
        subtitle="Long-form reading with pull-quote and code block.">
        <DCArtboard id="blog-p-d" label="Desktop · 1440" width={BP_DIM.w} height={BP_DIM.h}><PageBlogPost /></DCArtboard>
        <DCArtboard id="blog-p-t" label="Tablet · 768" width={BPT_DIM.w} height={BPT_DIM.h}><PageBlogPostTablet /></DCArtboard>
        <DCArtboard id="blog-p-m" label="Mobile · 390" width={BPM_DIM.w} height={BPM_DIM.h}><PageBlogPostMobile /></DCArtboard>
      </DCSection>

      <DCSection id="system" title="System pages"
        subtitle="404 handling.">
        <DCArtboard id="404" label="404 · not-found · 1440" width={N4_DIM.w} height={N4_DIM.h}><PageNotFound /></DCArtboard>
      </DCSection>

      <DCSection id="motion" title="Animation polish"
        subtitle="Spec for the motion across the site. Each interaction has a before/after diagram, timing, easing, and a one-line intent.">
        <DCArtboard id="motion" label="Motion spec · v1" width={AN_DIM.w} height={AN_DIM.h}><PageAnimations /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
