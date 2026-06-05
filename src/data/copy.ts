/**
 * COPY — all editable UI/editorial strings, centralised for self-editing.
 * Single source of truth for site wording; components reference this object.
 */

export const COPY = {
  meta: {
    title: 'Tom Hinsley, digital creative',
    description: 'Frontend engineer based in London. Side practices in audio and film.',
  },

  hero: {
    // h1 parts — the accent period stays literal in the JSX
    titleLead: 'Tom Hinsley,',
    titleMuted: 'digital creative',
    // subtitle paragraph
    sub: 'Frontend engineer based in London. Side practices in audio and film.',
  },

  home: {
    // RecentWork eyebrow
    selectedWork: 'Selected work',
    // RecentWork h2 — accent period stays in JSX
    recent: 'Recent',
    // RecentWork "see all" link
    everything: 'Everything',
    // DisciplineScroller eyebrow + aria-label
    exploreByDiscipline: 'Explore by discipline',
  },

  footer: {
    // Bio paragraph in first column (name comes from SITE.name above it)
    bio: 'A digital creative based in London. Frontend engineer with side practices in audio, video & blog.',
    // Marquee items that are NOT SITE.name / SITE.email (those are composed in Footer.tsx)
    marqueeExtra: ['London 51.5°N', 'Get in touch'] as string[],
    // Column header labels
    sections: 'Sections',
    elsewhere: 'Elsewhere',
    factLabel: 'Useless fact',
    // Copyright / version block — the year is appended at render time (current year)
    copyright: '©',
    version: 'v1.0',
  },

  about: {
    // AboutHero eyebrow suffix after "About · Tom Hinsley · "
    eyebrowLocation: 'London 51.5°N',
    // AboutHero intro paragraph. {years} is replaced at render time from SITE.experienceSince.
    intro: 'Frontend developer in London with {years}+ years building responsive, accessible interfaces for agencies, a software consultancy and editorial publishers. Sound-design background, still making things in the margins.',
    // AboutHero discipline chips
    chips: ['Frontend', 'React', 'Next.js', 'TypeScript', 'Accessibility', 'Audio', 'Writing'] as string[],

    // Intro section
    currentlyEyebrow: 'Currently',
    // headline parts — trailing '.' stays in JSX
    currentlyLead: 'Freelance frontend developer, building ',
    currentlyAccent: 'whatever I feel like',
    // note block (two lines separated by <br />)
    currentlyNote: 'Contract frontend for digital publishers, including the Financial Times.\nSide projects come and go: music one week, a video the next, the odd app like Chork.',
    // body paragraphs
    bodyPara1: 'I’ve been building for the web for {years}+ years, across agencies, a software consultancy and editorial publishers like the Financial Times. Strong React, Next.js and TypeScript foundations, with full-stack capability when a project calls for it.',
    bodyPara2: 'Off the clock I tinker with retro games and the emulators that run them, mess about with music, and get to a climbing wall when I can. Proudest useless achievement: finishing Super Mario Land on a Game Boy Color. The self-initiated work here comes from the same itch, code that wanders into audio and writing, where the sound-design degree still leaks through.',

    // "Off the clock" — current book / TV series / game (Currently component).
    offTheClockEyebrow: 'Off the clock',
    offTheClock: [
      { kind: 'book', label: 'Reading', title: 'A Scanner Darkly', href: '' },
      { kind: 'tv', label: 'Watching', title: 'Dragon Ball Z (again)', href: '' },
      { kind: 'game', label: 'Playing', title: 'Game Boy classics, emulated', href: '' },
    ],

    // Timeline section
    timelineEyebrow: 'Career timeline',
    timelineHeading: 'Where I’ve been',

    // Skills section
    skillsEyebrow: 'Tools and craft',
    skillsHeading: 'What I work with',

    // ContactCTA section
    ctaEyebrow: 'Get in touch',
    ctaHeading: 'Got a project in mind?',
    ctaHeadingSoft: 'Or just say hello.',
    ctaNote: 'I usually reply within a day or two.',
  },

  blog: {
    // BlogHero eyebrow suffix
    heroSince: 'since 2024',
    // BlogHero intro paragraph
    heroIntro: 'Notes, essays and dev logs. Mostly about whatever I’m currently chewing on, usually code, sometimes audio, occasionally a book.',

    // blog/[slug]/page.tsx
    foundUseful: 'Found this useful?',
    sendNote: 'Send a note',
    olderPost: 'Older post',
    newerPost: 'Newer post',
    relatedEyebrow: 'Related posts',
    relatedHeading: 'More from the blog',
    allPosts: 'All posts',

    // AuthorCard CTA
    aboutArrow: 'About',
  },

  project: {
    // RelatedWork eyebrow
    relatedEyebrow: 'More work',
    // RelatedWork heading — period is part of the string (no accent styling)
    relatedHeading: 'From across the practice.',
  },

  nav: {
    // Short CTA in Nav actions (aria-hidden sibling of full email)
    sayHi: 'Say hi',
    // Monogram link aria-label
    homeAria: 'Tom Hinsley, home',
  },

  notFound: {
    eyebrow: 'Error · 404',
    urlHost: 'tomhinsley.com',
    urlPath: '/the-page-you-wanted',
    lead: 'That page doesn’t exist, but here’s everything that does.',
    cta: 'Or get in touch.',
  },
} as const;

export type Copy = typeof COPY;
