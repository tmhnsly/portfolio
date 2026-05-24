export function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
export function readingLabel(minutes: number): string {
  return `${minutes} min read`;
}
