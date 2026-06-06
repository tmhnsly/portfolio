import { siteConfigSchema } from '@/lib/schemas';

export const SITE = siteConfigSchema.parse({
  name: 'Tom Hinsley',
  role: 'Frontend engineer',
  // NB: the contact email is intentionally NOT here — it lives base64-encoded in
  // src/lib/email.ts (decoded client-side) so it's never in the HTML/bundle as
  // plain text. Use <EmailLink/> / useEmail() to render it.
  location: 'London',
  // first professional dev role — "X+ years" copy is computed from this, so it
  // stays current on every build. Bump only if the story changes.
  experienceSince: '2021-07',
  nav: [
    { label: 'Code',  href: '/code'  },
    { label: 'Video', href: '/video' },
    { label: 'Audio', href: '/audio' },
    { label: 'Blog',  href: '/blog'  },
    { label: 'About', href: '/about' },
  ],
  // Your social links — add/remove freely; rendered in the footer "Elsewhere" column.
  // Set href to your real URL. Remove this entry or add more as needed.
  socials: [
    { label: 'GitHub', href: 'https://github.com/tmhnsly' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tmhnsly/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@tomhinsley' },
    { label: 'Instagram', href: 'https://instagram.com/tomhinsley' },
  ],
});
