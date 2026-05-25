'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Marquee.module.scss';

export function Marquee({ children, faded }: { children: React.ReactNode; faded?: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const viewportClass = [styles.viewport, faded ? styles.faded : undefined].filter(Boolean).join(' ');
  const trackClass = [styles.track, !inView ? styles.paused : undefined].filter(Boolean).join(' ');

  return (
    <div ref={viewportRef} className={viewportClass}>
      <div className={trackClass}>
        <div className={styles.group}>{children}</div>
        {/* duplicate for the seamless loop — `inert` keeps its links out of the tab
            order and the a11y tree (aria-hidden alone leaves them focusable). */}
        <div className={styles.group} aria-hidden inert>{children}</div>
      </div>
    </div>
  );
}
