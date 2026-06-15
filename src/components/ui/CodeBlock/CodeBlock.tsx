import { highlight } from '@/lib/highlighter';
import styles from './CodeBlock.module.scss';

/**
 * A fenced code block. When the language is one the shared highlighter knows, it
 * renders Shiki's dual-theme HTML (coloured per token, light/dark via CSS vars);
 * otherwise it falls back to a plain <pre>. Both wear the same panel chrome from
 * the site's code tokens. Highlighting happens server-side, so no client JS ships.
 */
export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const html = highlight(code, lang);
  if (html) return <div className={styles.block} dangerouslySetInnerHTML={{ __html: html }} />;
  return (
    <pre className={styles.fallback}>
      <code>{code}</code>
    </pre>
  );
}
