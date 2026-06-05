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
    id: 'freelance-2024',
    period: 'Nov 2024 — Present',
    role: 'Freelance Frontend Developer',
    place: 'Self-employed · London',
    description:
      'Contract frontend for digital publishers and product teams, including the Financial Times. Built interactive branded-content pages for FT clients (Julius Baer, Equinor) from Figma to production-ready, fully responsive code — working closely with designers and editorial, managing each project end to end.',
    tags: ['Next.js', 'TypeScript', 'SCSS', 'Figma'],
    discipline: 'code',
    monogram: 'TH',
  },
  {
    id: 'neverbland-2023',
    period: 'Jul 2023 — Aug 2024',
    role: 'Frontend Developer',
    place: 'Neverbland · London',
    companyUrl: COMPANIES.neverbland.url,
    description:
      'Digital agency across hospitality, education and fintech. Led the frontend of a new booking flow for Clays, integrated with a custom orchestration API — it drove a 48% increase in spend per booking in week one. Built accessible component libraries (Tooled-Up Education), a Sanity-backed booking system and a Storybook design system (Earnt), and ran sprint planning.',
    tags: ['React', 'Next.js', 'Sanity', 'Storybook'],
    discipline: 'code',
    monogram: 'Nb',
    logo: '/images/about/logos/neverbland.svg',
  },
  {
    id: 'rocketmakers-2021',
    period: 'Jul 2021 — May 2023',
    role: 'Full Stack Software Developer',
    place: 'Rocketmakers · Bath',
    companyUrl: COMPANIES.rocketmakers.url,
    description:
      'Software consultancy building custom products across energy, health and tech. Shipped React frontends for clients including Pure Planet, Sero and Wavesix, getting interfaces right across breakpoints. Contributed to Armstrong, the company’s open-source React component library, and wrote and delivered an HTML & CSS course for work-experience students.',
    tags: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    discipline: 'code',
    monogram: 'Rm',
    logo: '/images/about/logos/rocketmakers.svg',
  },
  {
    id: 'io-academy-2020',
    period: 'Sep — Dec 2020',
    role: 'Full Stack Software Engineering',
    place: 'iO Academy · Bath',
    // iO Academy closed in 2025; its own site is dead, so link the Course Report profile
    companyUrl: 'https://www.coursereport.com/schools/io-academy',
    description:
      'Intensive four-month engineering bootcamp — finished top 10 globally and #2 in the UK. PHP, JavaScript, React, Node.js, MySQL, MongoDB, Git, OOP and Agile.',
    tags: ['JavaScript', 'React', 'Node.js', 'PHP'],
    discipline: 'code',
    monogram: 'iO',
    logo: '/images/about/logos/io-academy.webp',
    logoFilled: true,
  },
  {
    // One block for the whole Apple era — the stints overlapped uni and ran across
    // several stores plus an Apple Premium Reseller (folded in as Apple here), so it
    // reads cleanest as a single span. Framed around the one-to-one teaching: the
    // root of the UX eye, hence the code accent (the bridge into the frontend work).
    id: 'apple-2011',
    period: 'Jun 2011 — Sep 2019',
    role: 'Specialist',
    place: 'Apple · London',
    companyUrl: 'https://www.apple.com/uk/retail/',
    description:
      'Eight years at Apple, one-to-one and teaching group sessions: getting people of every age and skill level comfortable with their devices and the creative tools on them, and troubleshooting whatever had them stuck. Explaining technical things in plain language, to anyone who walked in, became second nature. Watching exactly where people hesitated and got lost is where my eye for UX and interface began.',
    tags: ['Teaching', 'Troubleshooting', 'UX'],
    discipline: 'code',
    logo: '/images/about/logos/apple.svg',
  },
  {
    id: 'ravensbourne-2012',
    period: '2012 — 2015',
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
