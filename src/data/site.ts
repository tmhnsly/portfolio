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
  // Your social links — add/remove freely; rendered in the footer "Elsewhere" column.
  // Set href to your real URL. Remove this entry or add more as needed.
  socials: [
    { label: 'GitHub', href: '#' },
  ],
  colophon: 'Set in Space Grotesk + Space Mono. Built with Next.js. Colours from Radix.',
});
