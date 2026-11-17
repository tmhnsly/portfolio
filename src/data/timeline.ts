import { z } from 'zod';
import { timelineEntrySchema } from '@/lib/schemas';
import { COMPANIES } from './companies';

/**
 * Career timeline. `discipline` colours the rail dot + accent via the shared
 * discipline scale (theme-aware). `companyUrl` turns the whole entry into a
 * clickable card. `logo` points at a full-colour mark in
 * `public/images/about/logos/`; `monogram` is the fallback when there's no logo.
 */
export const TIMELINE = z.array(timelineEntrySchema).parse([
  {
    id: 'independent-2026',
    period: 'Jan 2026 – Present',
    role: 'Frontend Engineer',
    place: 'Self-employed · Guildford',
    description:
      'Designing and building my own products. Chork, a climbing app for bouldering comps where everyone shares one live leaderboard. Raditz, an exploration of how an accessible, themeable React component library could work. Plus an energy-tariff dashboard and Dreamscene, a story-development app.',
    tags: ['Next.js', 'TypeScript', 'Storybook', 'Accessibility'],
    discipline: 'code',
    monogram: 'TH',
  },
  {
    id: 'freelance-2024',
    period: 'Nov 2024 – Oct 2025',
    role: 'Freelance Frontend Developer',
    place: 'Financial Times · London',
    description:
      'Contract frontend for the Financial Times. Built two interactive branded-content pages for FT partners, Julius Baer and Equinor, inside the FT’s existing codebase: from Figma designs to production-ready, fully responsive code, working with designers and editorial and delivering to publication deadlines.',
    tags: ['Next.js', 'TypeScript', 'SCSS', 'Figma'],
    discipline: 'code',
    monogram: 'FT',
  },
  {
    id: 'neverbland-2023',
    period: 'Jul 2023 – Aug 2024',
    role: 'Frontend Developer',
    place: 'Neverbland · London',
    companyUrl: COMPANIES.neverbland.url,
    description:
      'Digital agency across hospitality, education and fintech. Led the frontend of a new booking flow for Clays, integrated with a custom orchestration API. It drove a 48% increase in spend per booking in week one. Built accessible component libraries (Tooled-Up Education), a Sanity-backed booking system and a Storybook design system (Earnt), and ran sprint planning.',
    tags: ['React', 'Next.js', 'Sanity', 'Storybook'],
    discipline: 'code',
    monogram: 'Nb',
    logo: '/images/about/logos/neverbland.webp',
  },
  {
    id: 'rocketmakers-2021',
    period: 'Jul 2021 – May 2023',
    role: 'Full Stack Software Developer',
    place: 'Rocketmakers · Bath',
    companyUrl: COMPANIES.rocketmakers.url,
    description:
      'Software consultancy building custom products across energy, health and tech. Shipped React frontends for clients including Pure Planet, Sero and Wavesix, getting interfaces right across breakpoints. Contributed to Armstrong, the company’s open-source React component library, and wrote and delivered an HTML & CSS course for work-experience students.',
    tags: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    discipline: 'code',
    monogram: 'Rm',
    logo: '/images/about/logos/rocketmakers.webp',
  },
  {
    id: 'io-academy-2020',
    period: 'Sep – Dec 2020',
    role: 'Full Stack Software Engineering',
    place: 'iO Academy · Bath',
    companyUrl: COMPANIES.ioAcademy.url, // dead own-site → Course Report (see companies.ts)
    description:
      'Intensive four-month engineering bootcamp. Finished top 10 globally and #2 in the UK. PHP, JavaScript, React, Node.js, MySQL, MongoDB, Git, OOP and Agile.',
    tags: ['JavaScript', 'React', 'Node.js', 'PHP'],
    discipline: 'code',
    monogram: 'iO',
    logo: '/images/about/logos/io-academy.webp',
    logoFilled: true,
  },
  {
    // Two stints across three stores (2011–2015, 2018–2019). The Apple Premium
    // Reseller and other jobs in between are deliberately not folded in here.
    id: 'apple-2011',
    period: '2011 – 2015, 2018 – 2019',
    role: 'Specialist',
    place: 'Apple · Basingstoke, Covent Garden, Kingston',
    companyUrl: COMPANIES.apple.url,
    description:
      'Six years across three Apple stores, one-to-one and in group sessions: getting people of every age and skill level comfortable with their devices and the creative tools on them, and troubleshooting whatever had them stuck. Ran Today at Apple sessions, including Swift Playgrounds and Sphero coding, photography and video editing. Watching exactly where people hesitated and got lost is where my eye for UX and interface began.',
    tags: ['Teaching', 'Troubleshooting', 'UX'],
    discipline: 'video',
    logo: '/images/about/logos/apple.svg',
  },
  {
    id: 'ravensbourne-2012',
    period: '2012 – 2015',
    role: 'BA Sound Design',
    place: 'Ravensbourne University · London',
    companyUrl: COMPANIES.ravensbourne.url,
    description:
      'Practical audio degree: recording, editing, sonic art and mixing for TV, film, radio and games. My dissertation looked at how the internet (social media, piracy, the early days of streaming) was reshaping music for independent artists, from how it’s consumed to how distribution and labels actually pay.',
    tags: ['Sound design', 'Audio', 'Production'],
    discipline: 'audio',
    monogram: 'Rv',
    logo: '/images/about/logos/ravensbourne.webp',
  },
]);
