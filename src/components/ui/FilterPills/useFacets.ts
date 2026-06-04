'use client';
import { useMemo, useState } from 'react';
import { buildFacets, filterByFacet, type Facet } from '@/lib/facets';

export interface Faceted<T> {
  filters: Facet[];
  active: number;
  setActive: (index: number) => void;
  activeLabel: string;
  filtered: T[];
}

/**
 * React wiring for a faceted list: builds the FilterPills facets, tracks the
 * active index, and returns the items matching it. The facet rules live in
 * lib/facets (pure + tested); this concentrates the identical state wiring that
 * RecentWork and PostList otherwise repeated. Pass a module-stable `facetOf`
 * (and optional `order`) so the memo only recomputes when `items` change.
 */
export function useFacets<T>(items: T[], facetOf: (item: T) => string, order?: string[]): Faceted<T> {
  const [active, setActive] = useState(0);
  const filters = useMemo(() => buildFacets(items, facetOf, order), [items, facetOf, order]);
  const activeLabel = filters[active]?.label ?? 'All';
  const filtered = filterByFacet(items, facetOf, activeLabel);
  return { filters, active, setActive, activeLabel, filtered };
}
