import { DEMOS } from './registry';
import styles from './Demo.module.scss';

/**
 * A live preview inside a post, authored in markdown as a fenced ```demo block
 * holding either a bare key (`button`) or JSON (`{ "name": "button" }`). It renders
 * the *real* component from the registry, so the reader sees the actual thing the
 * surrounding prose measures — hover, focus and dark mode included, no extra JS.
 * Unknown keys render nothing rather than break the page.
 */
export function Demo({ spec }: { spec: string }) {
  const name = parseSpec(spec);
  const entry = name ? DEMOS[name] : undefined;
  if (!entry) return null;
  return (
    <figure className={styles.demo} aria-label={`Live preview: ${entry.label}`}>
      <figcaption className={styles.label}>{entry.label}</figcaption>
      <div className={styles.stage}>{entry.render()}</div>
    </figure>
  );
}

function parseSpec(spec: string): string | null {
  const text = spec.trim();
  if (!text) return null;
  try {
    const obj = JSON.parse(text) as { name?: string };
    return obj.name ?? null;
  } catch {
    return text; // bare keyword, e.g. ```demo\nbutton
  }
}
