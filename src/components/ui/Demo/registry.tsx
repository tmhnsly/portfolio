import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './Demo.module.scss';

interface DemoEntry {
  label: string;
  render: () => ReactNode;
}

// A small inline download glyph, sized intrinsically (no utility classes), so the
// button demo carries an icon the way the prose describes.
function DownloadGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  );
}

/**
 * The components a ```demo block can render. Renders the genuine component so the
 * preview and the prose's measurements describe the same code.
 */
export const DEMOS: Record<string, DemoEntry> = {
  button: {
    label: 'Live — the site’s real Button component',
    render: () => (
      <div className={styles.row}>
        <Button variant="primary">
          <DownloadGlyph />
          Download CV
        </Button>
        <Button variant="secondary">View work</Button>
        <Button variant="ghost">Read more</Button>
      </div>
    ),
  },
};
