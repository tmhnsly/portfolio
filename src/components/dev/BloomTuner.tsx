'use client';
/*
 * DEV TUNING TOOL — REMOVE before merge (then bake the chosen blur into
 * Bloom.module.scss). Lets us A/B the Bloom's render cost on a REAL iOS device:
 * toggle the whole Bloom (the definitive "is this the cause?" test), scrub the
 * blur radius, flip will-change, and watch a live FPS readout while scrolling.
 *
 * It drives CSS custom properties on :root that Bloom.module.scss reads WITH
 * FALLBACKS (`var(--bloom-blur, 50px)` etc.), so when this component isn't
 * mounted production renders exactly as before.
 */
import { useEffect, useState, type CSSProperties } from 'react';

const PRESETS = [50, 30, 20, 12, 0];

export function BloomTuner() {
  const [on, setOn] = useState(true);
  const [blur, setBlur] = useState(50);
  const [wc, setWc] = useState(true);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty('--bloom-display', on ? 'block' : 'none');
    s.setProperty('--bloom-blur', `${blur}px`);
    s.setProperty('--bloom-wc', wc ? 'opacity' : 'auto');
  }, [on, blur, wc]);

  // Rolling FPS — the perf signal. Scroll the page / let the deck advance and
  // watch this drop when the Bloom is expensive.
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const tick = (t: number) => {
      frames += 1;
      const dt = t - last;
      if (dt >= 500) {
        setFps(Math.round((frames * 1000) / dt));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fpsColor = fps >= 55 ? '#3fb950' : fps >= 30 ? '#d29922' : '#f85149';

  const box: CSSProperties = {
    position: 'fixed', left: 12, bottom: 12, zIndex: 99999, width: 188,
    padding: 12, borderRadius: 12, background: 'rgba(18,18,20,0.94)',
    color: '#fff', font: '12px/1.4 ui-monospace, monospace',
    boxShadow: '0 8px 24px rgba(0,0,0,0.45)', touchAction: 'manipulation',
  };
  const row: CSSProperties = { display: 'flex', gap: 6, marginTop: 8 };
  const toggle = (active: boolean): CSSProperties => ({
    flex: 1, minHeight: 30, borderRadius: 7, border: '1px solid rgba(255,255,255,0.18)',
    background: active ? '#fff' : 'transparent', color: active ? '#111' : '#fff',
    fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
  });

  return (
    <div style={box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Bloom tuner</strong>
        <span style={{ color: fpsColor, fontWeight: 700 }}>{fps} fps</span>
      </div>

      <div style={row}>
        <button type="button" style={toggle(on)} onClick={() => setOn(true)}>Bloom on</button>
        <button type="button" style={toggle(!on)} onClick={() => setOn(false)}>off</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span>blur</span><span>{blur}px</span>
      </div>
      <input
        type="range" min={0} max={50} step={1} value={blur}
        onChange={(e) => setBlur(Number(e.target.value))}
        style={{ width: '100%', marginTop: 4, accentColor: '#fff' }}
        aria-label="Bloom blur radius"
      />
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setBlur(p)}
            style={{
              flex: 1, minHeight: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.18)',
              background: blur === p ? '#fff' : 'transparent', color: blur === p ? '#111' : '#fff',
              fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={row}>
        <button type="button" style={toggle(wc)} onClick={() => setWc(true)}>will-change</button>
        <button type="button" style={toggle(!wc)} onClick={() => setWc(false)}>auto</button>
      </div>
    </div>
  );
}
