'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';
import type { MediaItem } from '@/types';
import { IMG_SIZES } from '@/lib/breakpoints';
import { dismissOnDragDown } from '@/lib/gesture';
import { Media } from '@/components/ui/Media';
import { YouTubeEmbed } from '@/components/project/YouTubeEmbed';
import styles from './MediaCarousel.module.scss';

const pad = (n: number) => String(n).padStart(2, '0');

export function MediaCarousel({ items, startIndex = 0, gradient, onClose }: {
  items: MediaItem[]; startIndex?: number; gradient: string; onClose: () => void;
}) {
  const n = items.length;
  const canNav = n > 1;
  const [index, setIndex] = useState(startIndex);
  const backdropRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; locked: 'v' | 'h' | null; active: boolean }>({ x: 0, y: 0, locked: null, active: false });

  const go = useCallback((next: number) => {
    const clamped = (next + n) % n;
    (trackRef.current?.children[clamped] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setIndex(clamped);
  }, [n]);

  // Mount: jump to the start slide, focus the dialog, lock body scroll.
  useEffect(() => {
    (trackRef.current?.children[startIndex] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
    backdropRef.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, [startIndex]);

  // Keyboard: Esc closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'ArrowLeft') go(index - 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, go, onClose]);

  // Sync index from native scroll-snap once it settles.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const detect = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      if (i !== index && i >= 0 && i < n) setIndex(i);
    };
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => { clearTimeout(t); t = setTimeout(detect, 90); };
    el.addEventListener('scrollend', detect);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scrollend', detect); el.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, [index, n]);

  // Swipe-down-to-dismiss (vertical lock; horizontal stays native scroll-snap).
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    drag.current = { x: t.clientX, y: t.clientY, locked: null, active: true };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const d = drag.current;
    const t = e.touches[0];
    if (!d.active || !t) return;
    const dx = t.clientX - d.x;
    const dy = t.clientY - d.y;
    if (!d.locked) {
      if (Math.abs(dy) > 8 || Math.abs(dx) > 8) d.locked = Math.abs(dy) > Math.abs(dx) ? 'v' : 'h';
      else return;
    }
    if (d.locked !== 'v' || dy <= 0) return;
    const track = trackRef.current, backdrop = backdropRef.current;
    if (!track || !backdrop) return;
    const progress = Math.min(dy / 300, 1);
    track.style.transition = 'none';
    track.style.transform = `translateY(${dy}px) scale(${1 - progress * 0.15})`;
    backdrop.style.setProperty('--dismiss', String(1 - progress));
  };
  const onTouchEnd = () => {
    const track = trackRef.current, backdrop = backdropRef.current;
    const dy = track ? parseFloat((track.style.transform.match(/translateY\(([\d.]+)px\)/) ?? [])[1] ?? '0') : 0;
    if (track && backdrop) {
      if (dismissOnDragDown(dy)) {
        track.style.transition = 'transform 0.2s ease-out';
        track.style.transform = 'translateY(100vh) scale(0.85)';
        backdrop.style.setProperty('--dismiss', '0');
        window.setTimeout(onClose, 200);
        drag.current.active = false;
        return;
      }
      track.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)';
      track.style.transform = '';
      backdrop.style.setProperty('--dismiss', '1');
    }
    drag.current = { x: 0, y: 0, locked: null, active: false };
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.top}>
        <button type="button" className={styles.btn} aria-label="Close" onClick={onClose}><BiX aria-hidden /></button>
      </div>

      <div ref={trackRef} className={styles.track}>
        {items.map((item, i) => (
          <div key={i} className={styles.slide}>
            <div className={styles.stage}>
              {item.type === 'image'
                ? <Media src={item.src} alt={item.alt ?? item.title ?? ''} grad={gradient} ratio="16/9" sizes={IMG_SIZES.full} className={styles.media} />
                : <YouTubeEmbed id={item.id} list={item.list} poster={item.poster} title={item.title} grad={gradient} autoPlay={i === startIndex} />}
            </div>
            {item.title && <p className={styles.caption}>{item.title}</p>}
          </div>
        ))}
      </div>

      {canNav && (
        <div className={styles.bottom}>
          <button type="button" className={styles.btn} aria-label="previous" onClick={() => go(index - 1)}><BiChevronLeft aria-hidden /></button>
          <span className={styles.counter}>{pad(index + 1)} / {pad(n)}</span>
          <button type="button" className={styles.btn} aria-label="next" onClick={() => go(index + 1)}><BiChevronRight aria-hidden /></button>
        </div>
      )}
    </div>,
    document.body,
  );
}
