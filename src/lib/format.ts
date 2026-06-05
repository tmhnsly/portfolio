export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
export function readingLabel(minutes: number): string {
  return `${minutes} min read`;
}
/** Zero-pad to two digits — used by carousel/deck counters ("01 / 12"). */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
/** Whole years elapsed since an ISO date — used for self-updating "X+ years" copy. */
export function yearsSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 31_557_600_000); // ms per 365.25 days
}
