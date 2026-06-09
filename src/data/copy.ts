/*
 * COPY — all editable UI/editorial strings, centralised for self-editing.
 * Single source of truth for site wording; components reference this object.
 */

export const COPY = {
  meta: {
    title: 'Tom Hinsley · Full-Stack Developer, Frontend Specialist',
    description: 'London-based full-stack developer, frontend specialist in React, Next.js and TypeScript. Open to roles and freelance. Also works in audio and video.',
    // The liftable one-paragraph bio — what AI search quotes, and what the Person
    // JSON-LD + llms.txt share verbatim. Keep it factual and specific.
    summary: 'Tom Hinsley is a London-based full-stack developer and frontend specialist in React, Next.js and TypeScript, open to permanent roles and freelance or contract work. Previously at Neverbland and Rocketmakers, with contract work for the Financial Times. He also works in audio and video.',
  },

  hero: {
    // h1 parts — the accent period stays literal in the JSX
    titleLead: 'Tom Hinsley,',
    titleMuted: 'digital creative',
    // subtitle paragraph
    sub: 'Full-stack developer and frontend specialist in London, working across web, audio and video.',
    // small mono status line under the sub — the explicit hire/stack signal
    hireLine: 'React, Next.js & TypeScript · Open to roles and freelance',
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
    // Availability section (homepage) — the visible hire block
    availability: {
      eyebrow: 'Open to work',
      heading: 'Open to roles & freelance',
      body: 'React, Next.js and TypeScript are home base, with full-stack reach when a project needs it. I pick up new tools fast, and I take on audio and video work too. London, remote or on-site.',
      // subtle link to the /hire page (kept out of the nav on purpose)
      more: 'More on working together',
    },
  },

  footer: {
    // Bio paragraph in first column (name comes from SITE.name above it)
    bio: 'A digital creative based in London. Full-stack developer and frontend specialist, who also works in audio and video.',
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
    // AboutHero intro paragraph. {years} is replaced at render time from SITE.experienceSince.
    intro: 'Full-stack developer and frontend specialist in London with {years}+ years building responsive, accessible interfaces for agencies, a software consultancy and editorial publishers. Sound-design background, working across audio and video too.',
    // AboutHero discipline chips
    chips: ['Frontend', 'Full-stack', 'React', 'Next.js', 'TypeScript', 'Accessibility', 'Audio', 'Video'] as string[],

    // Intro section
    currentlyEyebrow: 'Currently',
    // headline parts — trailing '.' stays in JSX
    currentlyLead: 'Full-stack developer and frontend specialist, ',
    currentlyAccent: 'open to roles and freelance',
    // note block (two lines separated by <br />)
    currentlyNote: 'Frontend and full-stack contracts for digital publishers, including the Financial Times.\nAlso audio and video work, from music and sound design to film, plus the odd app like Chork.',
    // body paragraphs
    bodyPara1: 'I’ve been building for the web for {years}+ years, across agencies, a software consultancy and editorial publishers like the Financial Times. Strong React, Next.js and TypeScript foundations, with full-stack capability when a project calls for it.',
    bodyPara2: 'Off the clock I tinker with retro games and the emulators that run them, and get to a climbing wall when I can. Proudest useless achievement: finishing Super Mario Land on a Game Boy Color. The audio and video work here sits alongside the code, where the sound-design degree still leaks through.',

    // "Off the clock" — current book / TV series / game (Currently component).
    offTheClockEyebrow: 'Off the clock',
    offTheClock: [
      { kind: 'book', label: 'Reading', title: 'A Scanner Darkly', href: '' },
      { kind: 'tv', label: 'Watching', title: 'Dragon Ball Z (again)', href: '' },
      { kind: 'game', label: 'Playing', title: 'New Super Mario Bros. 2', href: '' },
    ],

    // Timeline section
    timelineEyebrow: 'Career timeline',
    timelineHeading: 'Where I’ve been',

    // Skills section
    skillsEyebrow: 'Tools and craft',
    skillsHeading: 'What I work with',

    // FAQ — visible Q&A that also drives FAQPage structured data. Strong AI-EO:
    // assistants lift these answers verbatim, so keep them factual and specific.
    faqEyebrow: 'FAQ',
    faqHeading: 'Common questions',
    faq: [
      { q: 'Is Tom available for work?', a: 'Yes. Open to permanent roles and freelance or contract work, remote or in London.' },
      { q: 'What is Tom’s core stack?', a: 'React, Next.js and TypeScript, with full-stack capability and a strong accessibility focus. Comfortable picking up new tools as a project needs.' },
      { q: 'Does Tom work remotely?', a: 'Yes, remotely across the UK and internationally, and on-site in London.' },
      { q: 'What kind of work does Tom take on?', a: 'Full-stack and frontend for agencies, startups and digital publishers, including contract work for the Financial Times. He also takes on audio and video work, from music and sound design to film.' },
      { q: 'Where is Tom based?', a: 'London, UK — available to work with teams and clients anywhere.' },
      { q: 'How do I get in touch?', a: 'Email is best. Use the contact link below, or download the CV.' },
    ],

    // ContactCTA section
    ctaEyebrow: 'Get in touch',
    ctaHeading: 'Got a project in mind?',
    ctaHeadingSoft: 'Or just say hello.',
    ctaNote: 'I usually reply within a day or two.',
  },

  blog: {
    // Disclosure shown at the top of every post (blog/[slug]/page.tsx).
    // Remove this notice (and the .notice block in page.module.scss) when the posts are replaced.
    postNotice: {
      label: 'Heads up',
      text: 'These posts are AI-assisted, but the figures and quotes have been fact-checked against the cited primary sources. Where the numbers are contested or dated, the post says so and leaves the range in.',
    },
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

  // /hire landing page — not linked in the nav (discoverable via search + a subtle
  // homepage link). Focused hire-intent copy.
  hire: {
    eyebrow: 'Work with me',
    title: 'Hire Tom Hinsley',
    lead: 'Full-stack developer and frontend specialist in London, open to permanent roles and freelance or contract work.',
    intro: 'React, Next.js and TypeScript are home base, with full-stack reach when a project needs it and a strong accessibility focus throughout. I’ve built for agencies, a software consultancy and editorial publishers including the Financial Times, and I pick up new tools fast. Alongside the web work I also take on audio and video.',
    servicesHeading: 'What I can help with',
    services: [
      { title: 'Frontend development', body: 'Responsive, accessible interfaces in React and Next.js, with design-system and performance work.' },
      { title: 'Full-stack web development', body: 'End-to-end features with TypeScript, APIs and a CMS when a project calls for it.' },
      { title: 'Audio production', body: 'Original music and sound design for film, games and brand work.' },
      { title: 'Video production', body: 'Editing, motion and short films, from concept to final cut.' },
    ],
    ctaHeading: 'Let’s talk',
    ctaNote: 'Tell me a bit about the project or role. I usually reply within a day or two.',
  },
} as const;

export type Copy = typeof COPY;
