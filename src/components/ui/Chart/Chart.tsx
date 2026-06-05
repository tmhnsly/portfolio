import { z } from 'zod';
import { HUE } from '@/lib/disciplines';
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
// A chart bar may use any discipline hue plus a neutral grey — sourced from the
// discipline HUE map (so a new discipline hue is automatically chartable) rather
// than a stray literal. These hues must have their Radix scale imported in
// app/layout.tsx for the `var(--<hue>-9)` fill to resolve.
const CHART_HUES = new Set<string>([...Object.values(HUE), 'gray']);

const barSchema = z.object({
  label: z.string(),
  value: z.number(),
  hue: z.string().optional(),
  display: z.string().optional(),
});
export const chartSpecSchema = z.object({
  title: z.string().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
  data: z.array(barSchema).min(1),
});
export type ChartSpec = z.infer<typeof chartSpecSchema>;

/**
 * Parse + validate a ```chart block's JSON against chartSpecSchema — the same
 * Zod gate the rest of the content passes through. Returns null on malformed JSON
 * OR an invalid shape (empty data, non-numeric value, …) so the caller shows the
 * raw block instead of silently rendering nothing or NaN bars.
 */
export function parseChartSpec(json: string): ChartSpec | null {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return null;
  }
  const result = chartSpecSchema.safeParse(raw);
  return result.success ? result.data : null;
}

const fmt = (value: number, unit?: string) =>
  `${value.toLocaleString('en-GB')}${unit ? ` ${unit}` : ''}`;

export function Chart({ json }: { json: string }) {
  const spec = parseChartSpec(json);
  if (!spec) return <pre className={styles.fallback}>{json}</pre>;
  const max = Math.max(...spec.data.map((d) => d.value), 0) || 1;

  return (
    <figure className={styles.chart}>
      {spec.title && <figcaption className={styles.title}>{spec.title}</figcaption>}
      <div className={styles.rows}>
        {spec.data.map((d, i) => {
          const hue = d.hue && CHART_HUES.has(d.hue) ? d.hue : 'orange';
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
