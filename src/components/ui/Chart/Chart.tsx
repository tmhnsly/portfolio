import { z } from 'zod';
import { HUE } from '@/lib/disciplines';
import styles from './Chart.module.scss';

/**
 * A small server-rendered chart for blog posts, authored in markdown as a fenced
 * ```chart block holding this JSON. Pure HTML/CSS (no client JS), coloured with
 * Radix hue vars so it adapts to light + dark. Every bar/segment carries real
 * text labels + values, so it reads fine to a screen reader without extra ARIA.
 *
 * Three shapes, picked per dataset:
 *   - bar (default)         — horizontal magnitude bars. `scale: "log"` spreads
 *                             values spanning orders of magnitude and prints a
 *                             power-of-ten tick row.
 *   - bar with range bands  — give a bar `low`/`high` and it draws an uncertainty
 *                             band with a marker at `value` (for contested figures).
 *   - stacked               — one 100%-wide bar split into parts-of-a-whole, with
 *                             a legend (`type: "stacked"`; values are shares).
 *
 *   ```chart
 *   { "type": "stacked", "scale": "log", "title": "…", "unit": "ml", "note": "Sources: …",
 *     "data": [ { "label": "…", "value": 12, "low": 8, "high": 20, "hue": "blue", "display": "~8–20" } ] }
 *   ```
 *
 * `hue` is a Radix scale name (must be one imported in app/layout.tsx); it falls
 * back to the blog accent. `display` overrides the printed value text.
 */
// A chart bar may use any discipline hue plus a neutral grey — sourced from the
// discipline HUE map (so a new discipline hue is automatically chartable) rather
// than a stray literal. These hues must have their Radix scale imported in
// app/layout.tsx for the `var(--<hue>-N)` fills to resolve.
const CHART_HUES = new Set<string>([...Object.values(HUE), 'gray']);

const barSchema = z.object({
  label: z.string(),
  value: z.number(),
  low: z.number().optional(),
  high: z.number().optional(),
  hue: z.string().optional(),
  display: z.string().optional(),
});
export const chartSpecSchema = z.object({
  type: z.enum(['bar', 'stacked']).optional(),
  scale: z.enum(['linear', 'log']).optional(),
  title: z.string().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
  data: z.array(barSchema).min(1),
});
export type ChartSpec = z.infer<typeof chartSpecSchema>;

/**
 * Parse + validate a ```chart block's JSON against chartSpecSchema — the same
 * Zod gate the rest of the content passes through. Returns null on malformed JSON
 * OR an invalid shape (empty data, non-numeric value, unknown type/scale, …) so
 * the caller shows the raw block instead of silently rendering nothing or NaN bars.
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

const hueOf = (h?: string) => (h && CHART_HUES.has(h) ? h : 'orange');

// Compact power-of-ten tick label: 0.1, 1, 10, 1k, 100k, 1M …
function tickLabel(v: number): string {
  if (v >= 1_000_000) return `${v / 1_000_000}M`;
  if (v >= 1_000) return `${v / 1_000}k`;
  if (v < 1) return String(v);
  return String(v);
}

/** Stacked 100%-of-whole bar with a legend — for parts of a total. */
function StackedChart({ spec }: { spec: ChartSpec }) {
  const total = spec.data.reduce((sum, d) => sum + Math.max(0, d.value), 0) || 1;
  return (
    <div className={styles.stackWrap}>
      <div className={styles.stackBar}>
        {spec.data.map((d, i) => (
          <span
            key={i}
            className={styles.segment}
            style={{ width: `${(Math.max(0, d.value) / total) * 100}%`, background: `var(--${hueOf(d.hue)}-9)` }}
          />
        ))}
      </div>
      <ul className={styles.legend}>
        {spec.data.map((d, i) => (
          <li key={i} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: `var(--${hueOf(d.hue)}-9)` }} aria-hidden />
            <span className={styles.legendLabel}>{d.label}</span>
            <span className={styles.legendValue}>{d.display ?? fmt(d.value, spec.unit)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Horizontal bars — linear or log, with optional low/high uncertainty bands. */
function BarChart({ spec }: { spec: ChartSpec }) {
  const isLog = spec.scale === 'log';
  const pts = spec.data.flatMap((d) =>
    [d.value, d.low, d.high].filter((v): v is number => typeof v === 'number'),
  );
  const maxVal = Math.max(...pts, 0) || 1;
  const positive = pts.filter((v) => v > 0);
  const minPos = positive.length ? Math.min(...positive) : 1;
  const lo = Math.floor(Math.log10(minPos));
  const hi = Math.max(lo + 1, Math.ceil(Math.log10(maxVal)));

  // Map a value to a 0–100% position along the track.
  const pos = (v: number) =>
    isLog
      ? v <= 0
        ? 0
        : ((Math.log10(v) - lo) / (hi - lo)) * 100
      : (v / maxVal) * 100;

  // Powers of ten across the domain, thinned to ~6 labels max so a wide range
  // (e.g. 0.1 → 10M) doesn't crowd the axis on a narrow column.
  const decades = isLog ? Array.from({ length: hi - lo + 1 }, (_, i) => Math.pow(10, lo + i)) : [];
  const tickStep = Math.max(1, Math.ceil(decades.length / 6));
  const ticks = decades.filter((_, i) => i % tickStep === 0 || i === decades.length - 1);

  return (
    <div className={styles.rows}>
      {spec.data.map((d, i) => {
        const hue = hueOf(d.hue);
        const hasRange = typeof d.low === 'number' && typeof d.high === 'number';
        return (
          <div key={i} className={styles.row}>
            <span className={styles.label}>{d.label}</span>
            <span className={styles.track}>
              {hasRange ? (
                <>
                  <span
                    className={styles.band}
                    style={{
                      left: `${pos(d.low as number)}%`,
                      width: `${Math.max(1.5, pos(d.high as number) - pos(d.low as number))}%`,
                      background: `var(--${hue}-5)`,
                      borderColor: `var(--${hue}-8)`,
                    }}
                  />
                  <span className={styles.marker} style={{ left: `${pos(d.value)}%`, background: `var(--${hue}-11)` }} />
                </>
              ) : (
                <span className={styles.bar} style={{ width: `${Math.max(1.5, pos(d.value))}%`, background: `var(--${hue}-9)` }} />
              )}
            </span>
            <span className={styles.value}>{d.display ?? fmt(d.value, spec.unit)}</span>
          </div>
        );
      })}
      {ticks.length > 0 && (
        <div className={styles.axis} aria-hidden>
          <span />
          <span className={styles.axisTrack}>
            {ticks.map((t, i) => (
              <span key={i} className={styles.tick} style={{ left: `${pos(t)}%` }}>
                {tickLabel(t)}
              </span>
            ))}
          </span>
          <span />
        </div>
      )}
    </div>
  );
}

export function Chart({ json }: { json: string }) {
  const spec = parseChartSpec(json);
  if (!spec) return <pre className={styles.fallback}>{json}</pre>;

  return (
    <figure className={styles.chart}>
      {spec.title && <figcaption className={styles.title}>{spec.title}</figcaption>}
      {spec.type === 'stacked' ? <StackedChart spec={spec} /> : <BarChart spec={spec} />}
      {spec.note && <figcaption className={styles.note}>{spec.note}</figcaption>}
    </figure>
  );
}
