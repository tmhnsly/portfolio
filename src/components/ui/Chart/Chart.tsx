import styles from './Chart.module.scss';

/**
 * A small horizontal bar chart for blog posts, authored in markdown as a fenced
 * ```chart block holding this JSON. Pure server-rendered HTML/CSS (no client JS),
 * coloured with Radix hue vars so it adapts to light + dark. Bars carry real text
 * labels + values, so it reads fine to a screen reader without extra ARIA.
 *
 *   ```chart
 *   { "title": "Water per …", "unit": "L", "note": "Sources: …",
 *     "data": [ { "label": "…", "value": 12, "hue": "blue", "display": "~12 L" } ] }
 *   ```
 *
 * `hue` is a Radix scale name (must be one imported in app/layout.tsx); it falls
 * back to the blog accent. `display` overrides the printed value text.
 */
type Bar = { label: string; value: number; hue?: string; display?: string };
interface ChartSpec {
  title?: string;
  unit?: string;
  note?: string;
  data: Bar[];
}

// Radix scales imported in app/layout.tsx — the hues a chart bar may use.
const HUES = new Set(['orange', 'blue', 'green', 'tomato', 'gray']);

const fmt = (value: number, unit?: string) =>
  `${value.toLocaleString('en-GB')}${unit ? ` ${unit}` : ''}`;

export function Chart({ json }: { json: string }) {
  let spec: ChartSpec;
  try {
    spec = JSON.parse(json);
  } catch {
    return <pre className={styles.fallback}>{json}</pre>;
  }
  if (!spec?.data?.length) return null;
  const max = Math.max(...spec.data.map((d) => d.value), 0) || 1;

  return (
    <figure className={styles.chart}>
      {spec.title && <figcaption className={styles.title}>{spec.title}</figcaption>}
      <div className={styles.rows}>
        {spec.data.map((d, i) => {
          const hue = d.hue && HUES.has(d.hue) ? d.hue : 'orange';
          const pct = Math.max(1.5, (d.value / max) * 100);
          return (
            <div key={i} className={styles.row}>
              <span className={styles.label}>{d.label}</span>
              <span className={styles.track}>
                <span className={styles.bar} style={{ width: `${pct}%`, background: `var(--${hue}-9)` }} />
              </span>
              <span className={styles.value}>{d.display ?? fmt(d.value, spec.unit)}</span>
            </div>
          );
        })}
      </div>
      {spec.note && <figcaption className={styles.note}>{spec.note}</figcaption>}
    </figure>
  );
}
