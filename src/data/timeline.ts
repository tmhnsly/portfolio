import { z } from 'zod';
import { tomato, indigo, iris, brown, cyan, grass, sand } from '@radix-ui/colors';
import { timelineEntrySchema } from '@/lib/schemas';

export const TIMELINE = z.array(timelineEntrySchema).parse([
  {
    id: 'research-lab-2026',
    period: '2026 — present',
    role: 'Frontend Engineer',
    place: 'Research Lab · London',
    description: 'Building research interfaces and small tools. Working with the design team on a long-running internal system; occasional side experiments with WebGL.',
    tags: ['React', 'TypeScript', 'Three.js', 'Design systems'],
    accent: tomato.tomato9,
  },
  {
    id: 'studio-z-2024',
    period: '2024 — 2026',
    role: 'Senior Frontend',
    place: 'Studio Z · London',
    description: "Two years building marketing sites, product surfaces and the occasional micro-tool for client work. Set up the studio's component library.",
    tags: ['Next.js', 'Sanity', 'Tailwind', 'Storybook'],
    accent: indigo.indigo9,
  },
  {
    id: 'agency-y-2022',
    period: '2022 — 2024',
    role: 'Frontend Developer',
    place: 'Agency Y · Berlin',
    description: 'Joined a small studio in Mitte. Shipped a half-dozen identity sites, learned to draw clean React state diagrams on a whiteboard, drank too much filter coffee.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Contentful'],
    accent: iris.iris9,
  },
  {
    id: 'freelance-2020',
    period: '2020 — 2022',
    role: 'Designer / Developer',
    place: 'Independently · Remote',
    description: 'Freelance through the pandemic — building portfolios, brand sites, and a couple of small generative tools. Started teaching myself sound design somewhere in the middle.',
    tags: ['Webflow', 'Vue.js', 'Figma', 'Ableton'],
    accent: brown.brown9,
  },
  {
    id: 'university-2018',
    period: '2018 — 2022',
    role: 'BA Digital Media',
    place: 'University Q · UK',
    description: 'Half design, half code; thesis was a generative typography tool. The course pushed me toward writing more software than I planned to.',
    tags: ['Processing', 'p5.js', 'Print', 'Editorial'],
    accent: cyan.cyan9,
  },
  {
    id: 'self-taught-2016',
    period: '2016 — 2018',
    role: 'First projects',
    place: 'Self-taught',
    description: 'Made my first paid site for a local restaurant in 2017. Spent the next eighteen months learning git, css and how to invoice.',
    tags: ['HTML', 'CSS', 'jQuery', 'Self-taught'],
    accent: grass.grass9,
  },
  {
    id: 'sixth-form-2014',
    period: '2014 — 2016',
    role: 'Sixth form',
    place: 'Hampshire',
    description: "Started a blog about film cameras. Never updated it past month two, but learned enough about Squarespace to convince myself I could build websites.",
    tags: ['Squarespace', '35mm'],
    accent: sand.sand9,
  },
]);
