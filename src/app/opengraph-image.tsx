import { ogImage, ogAccent, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Tom Hinsley, digital creative';

export default function Image() {
  return ogImage({ eyebrow: 'Portfolio', title: 'Tom Hinsley', accent: ogAccent('code') });
}
