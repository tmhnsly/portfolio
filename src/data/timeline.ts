import { z } from 'zod';
import { timelineEntrySchema } from '@/lib/schemas';
import { COMPANIES } from './companies';

/**
 * Career timeline. `discipline` colours the rail dot + the card accent via the
 * shared discipline scale (theme-aware). `companyUrl` turns the whole entry into
 * a clickable card. `monogram` is the logo-tile fallback; drop a real logo into
 * `public/images/about/logos/` and set `logo` to use it instead.
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
  },
  {
    id: 'io-academy-2020',
    period: 'Sep — Dec 2020',
    role: 'Full Stack Software Engineering',
    place: 'iO Academy · Bath',
    companyUrl: COMPANIES.ioAcademy.url,
    description:
      'Intensive four-month engineering bootcamp — finished top 10 globally and #2 in the UK. PHP, JavaScript, React, Node.js, MySQL, MongoDB, Git, OOP and Agile.',
    tags: ['JavaScript', 'React', 'Node.js', 'PHP'],
    discipline: 'code',
    monogram: 'iO',
  },
  {
    id: 'ravensbourne-2012',
    period: '2012 — 2015',
    role: 'BA Sound Design',
    place: 'Ravensbourne University · London',
    companyUrl: COMPANIES.ravensbourne.url,
    description:
      'Audio-production degree covering TV, film, radio and games. The sound background still feeds the side projects — and the way I think about timing and feel.',
    tags: ['Sound design', 'Audio', 'Production'],
    discipline: 'sound',
    monogram: 'Rv',
  },
]);
