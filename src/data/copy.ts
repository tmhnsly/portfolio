/**
 * COPY — all editable UI/editorial strings, centralised for self-editing.
 * Extract from components and replace inline literals with references to this object.
 * Do NOT change wording/punctuation; strings are kept verbatim from source.
 */

export const COPY = {
  meta: {
    title: 'Tom Hinsley — digital creative',
    description: 'Frontend engineer based in London. Side practices in music, sound, photography and film.',
  },

  hero: {
    // h1 parts — the accent period stays literal in the JSX
    titleLead: 'Tom Hinsley,',
    titleMuted: 'digital creative',
    // subtitle paragraph
    sub: 'Frontend engineer based in London. Side practices in music, sound, photography and film.',
  },

  home: {
    // RecentWork eyebrow
    selectedWork: 'Selected work',
    // RecentWork h2 — accent period stays in JSX
    recent: 'Recent',
    // RecentWork "see all" link
    everything: 'Everything →',
    // DisciplineScroller eyebrow + aria-label
    exploreByDiscipline: 'Explore by discipline',
  },

  footer: {
    // Bio paragraph in first column (name comes from SITE.name above it)
    bio: 'A digital creative based in London. Frontend engineer with side practices in music, sound, photo, video & blog.',
    // Marquee items that are NOT SITE.name / SITE.email (those are composed in Footer.tsx)
    marqueeExtra: ['London 51.5°N', 'Get in touch'] as string[],
    // Column header labels
    sections: 'Sections',
    elsewhere: 'Elsewhere',
    colophonLabel: 'Colophon',
    // Copyright / version block
    copyright: '© 2026',
    version: 'v1.0',
  },

  about: {
    // AboutHero eyebrow suffix after "About · Tom Hinsley · "
    eyebrowLocation: 'London 51.5°N',
    // AboutHero intro paragraph
    intro: 'Trained as a designer, now a frontend engineer in London — with side practices in music, sound, photo, video and writing.',
    // AboutHero discipline chips
    chips: ['Frontend', '3D', 'Generative', 'Music', 'Sound design', 'Photography', 'Video', 'Writing'] as string[],

    // Intro section
    currentlyEyebrow: 'Currently',
    // headline parts — trailing '.' stays in JSX
    currentlyLead: 'Frontend Engineer at ',
    currentlyAccent: 'a research lab',
    // note block (two lines separated by <br />)
    currentlyNote: 'Mostly building research interfaces.\nWorking on side things in the evenings.',
    // body paragraphs (rsquo entities written as the real Unicode chars here; JSX can use &rsquo; or the char)
    bodyPara1: 'I’ve been building things on the web since 2018 — first as a designer, then increasingly as an engineer. My day job is shipping production interfaces; the rest of my time goes into smaller, weirder projects that mix code with sound, image and writing.',
    bodyPara2: 'Most of what’s here is self-initiated. If something looks like the sort of thing you’d like to commission, send me a note.',

    // Timeline section
    timelineEyebrow: '§ Career timeline · scroll-revealed',
    // heading — accent period stays in JSX
    timelineHeading: 'Where I’ve been',

    // Skills section
    skillsEyebrow: '§ Tools and craft',
    // heading — accent period stays in JSX
    skillsHeading: 'What I work with',

    // ContactCTA section
    ctaEyebrow: 'Get in touch',
    // heading parts — accent/soft span wraps second line in JSX
    ctaHeading: 'Working on something',
    ctaHeadingSoft: 'I should know about?',
    ctaNote: 'usually replies within a day or two.',
  },

  blog: {
    // BlogHero eyebrow suffix
    heroSince: 'since 2024',
    // BlogHero intro paragraph
    heroIntro: 'Notes, essays and dev logs. Mostly about whatever I’m currently chewing on — usually code, sometimes sound, occasionally a book.',

    // blog/[slug]/page.tsx
    foundUseful: 'Found this useful?',
    sendNote: 'Send a note ↗',
    olderPost: '← Older post',
    newerPost: 'Newer post →',
    relatedEyebrow: 'Related posts',
    // heading — accent period stays in JSX
    relatedHeading: 'More from the blog',
    allPosts: '↗ All posts',

    // AuthorCard CTA
    aboutArrow: 'About →',
  },

  project: {
    // RelatedWork eyebrow
    relatedEyebrow: 'You might also like',
    // RelatedWork heading — note: period is part of the string here as it was inline without accent styling
    relatedHeading: 'From across the practice.',
  },

  nav: {
    // Short CTA in Nav actions (aria-hidden sibling of full email)
    sayHi: 'Say hi →',
    // Monogram link aria-label
    homeAria: 'Tom Hinsley — home',
  },

  notFound: {
    // Eyebrow
    eyebrow: 'Error · 404',
    // Faux URL bar
    urlHost: 'tomhinsley.com',
    urlPath: '/the-page-you-wanted',
    // Lead paragraph
    lead: "That page doesn’t exist — but here’s everything that does.",
    // CTA text
    cta: 'Or get in touch.',
  },
} as const;

export type Copy = typeof COPY;
