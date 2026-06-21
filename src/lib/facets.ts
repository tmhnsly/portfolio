export interface Facet {
  label: string;
  count: number;
}

/**
 * Build a FilterPills list from a collection: an "All" facet (the total) followed
 * by each distinct facet value with count > 0. If `order` is given, facets follow
 * it (values not present are dropped); otherwise they're in first-seen order.
 */
export function buildFacets<T>(items: T[], facetOf: (item: T) => string, order?: string[]): Facet[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const k = facetOf(item);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const labels = order ? order.filter((l) => counts.has(l)) : [...counts.keys()];
  return [{ label: 'All', count: items.length }, ...labels.map((label) => ({ label, count: counts.get(label)! }))];
}

/** Items matching the active facet label ('All' → everything). */
export function filterByFacet<T>(items: T[], facetOf: (item: T) => string, activeLabel: string): T[] {
  return activeLabel === 'All' ? items : items.filter((item) => facetOf(item) === activeLabel);
}

/**
 * The facet label to treat as active: `label` when it still exists in `filters`,
 * otherwise 'All'. Guards the case where the item set changed and the previously
 * selected facet has gone — without it a stale selection would silently filter to
 * a different or empty set. Keying selection by label (not list index) makes this
 * the single place that decides "is the selection still valid?".
 */
export function activeFacet(filters: Facet[], label: string): string {
  return filters.some((f) => f.label === label) ? label : 'All';
}

/**
 * Split a list into a featured item + the rest (capped at `restCount`). Featured
 * is the first item flagged `featured`, else the first item; the rest excludes it.
 */
export function splitFeatured<T extends { featured?: boolean }>(
  items: T[],
  restCount: number,
): { featured?: T; rest: T[] } {
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i !== featured).slice(0, restCount);
  return { featured, rest };
}
