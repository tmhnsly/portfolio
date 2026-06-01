import styles from './AgileThumb.module.scss';

/**
 * Bespoke card thumbnail for the Agile Energy Dashboard — a stylised version of its
 * time-series chart: a day of half-hourly tariff prices (cheap overnight, morning +
 * evening peaks) with the cheap "load-shift" window highlighted, in Agile's blue.
 * Pure SVG/CSS so it stays crisp + theme-aware (panel/text flip; the chart blue is
 * brand-fixed); the line draws on mount. Rendered inside the <Media> frame.
 */

// Half-hourly price curve in a 100×52 viewBox (y down → lower = cheaper).
const LINE = 'M0,30 L8,40 L16,44 L24,38 L33,14 L42,23 L50,29 L58,24 L67,15 L75,10 L84,21 L92,33 L100,38';
const AREA = `${LINE} L100,52 L0,52 Z`;

export function AgileThumb() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.panel}>
        <div className={styles.head}>
          <span className={styles.wordmark} />
          <span className={styles.stat}>&minus;42%</span>
        </div>
        <svg viewBox="0 0 100 52" className={styles.chart} aria-hidden>
          <line x1="0" y1="18" x2="100" y2="18" className={styles.grid} />
          <line x1="0" y1="35" x2="100" y2="35" className={styles.grid} />
          {/* the cheap overnight window — where the dashboard suggests shifting load */}
          <rect x="8" y="0" width="18" height="52" className={styles.band} />
          <path d={AREA} className={styles.area} />
          <path d={LINE} className={styles.line} pathLength={1} strokeDasharray={1} />
          <circle cx="16" cy="44" r="2.6" className={styles.dot} />
        </svg>
      </div>
    </div>
  );
}
