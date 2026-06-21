'use client';
import { useMemo, useState } from 'react';
import { activeFacet, buildFacets, filterByFacet, type Facet } from '@/lib/facets';

export interface Faceted<T> {
  filters: Facet[];
  active: number;
  setActive: (index: number) => void;
  activeLabel: string;
  filtered: T[];
}

/**
 * React wiring for a faceted list: builds the FilterPills facets, tracks the
 * active facet, and returns the items matching it. The facet rules live in
 * lib/facets (pure + tested); this concentrates the identical state wiring that
 * RecentWork and PostList otherwise repeated. Pass a module-stable `facetOf`
 * (and optional `order`) so the memo only recomputes when `items` change.
 *
 * Selection is stored by label, not list position: if `items` change so the
 * selected facet disappears, `activeFacet` falls back to 'All' rather than a
 * stale index silently selecting a different facet. `active`/`setActive` keep the
 * index-based shape FilterPills renders against.
 */
export function useFacets<T>(items: T[], facetOf: (item: T) => string, order?: string[]): Faceted<T> {
  const [selected, setSelected] = useState('All');
  const filters = useMemo(() => buildFacets(items, facetOf, order), [items, facetOf, order]);
  const activeLabel = activeFacet(filters, selected);
  const active = filters.findIndex((f) => f.label === activeLabel); // ≥ 0: activeLabel is always in filters
  const filtered = filterByFacet(items, facetOf, activeLabel);
  const setActive = (index: number) => setSelected(filters[index]?.label ?? 'All');
  return { filters, active, setActive, activeLabel, filtered };
}
