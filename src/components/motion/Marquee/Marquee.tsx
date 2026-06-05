'use client';
import { useInView } from '@/lib/motion';
import { cx } from '@/lib/cx';
import styles from './Marquee.module.scss';

export function Marquee({ children, faded }: { children: React.ReactNode; faded?: boolean }) {
  // pause the scroll while off-screen (no animation when not visible)
  const { ref: viewportRef, inView } = useInView();

  const viewportClass = cx(styles.viewport, faded && styles.faded);
  const trackClass = cx(styles.track, !inView && styles.paused);

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
