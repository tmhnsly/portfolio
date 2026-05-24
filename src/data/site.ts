import { siteConfigSchema } from '@/lib/schemas';

export const SITE = siteConfigSchema.parse({
  name: 'Tom Hinsley',
  role: 'Frontend engineer',
  email: 'hello@tomhinsley.com',
  location: 'London',
  nav: [
    { label: 'Code',  href: '/code'  },
    { label: 'Music', href: '/music' },
    { label: 'Sound', href: '/sound' },
    { label: 'Photo', href: '/photo' },
    { label: 'Video', href: '/video' },
    { label: 'Blog',  href: '/blog'  },
    { label: 'About', href: '/about' },
  ],
  socials: [
    { label: 'Github',  href: '#' },
    { label: 'Are.na',  href: '#' },
    { label: 'Read.cv', href: '#' },
    { label: 'Bluesky', href: '#' },
  ],
  colophon: 'Set in Space Grotesk + Space Mono. Built with Next.js. Colours from Radix.',
});
