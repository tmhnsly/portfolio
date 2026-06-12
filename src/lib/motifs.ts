/**
 * The animated fallback-thumbnail motifs a Post can use when it ships no cover
 * image. This full set is the valid surface for a Post's `thumb` override; the
 * heuristic in BlogThumb/pickMotif picks from a subset and `feed` is the catch-all
 * (`datacenter`/`motion`/`tokens` are bespoke, reached only via an explicit `thumb`).
 *
 * Kept in lib so the Post schema can validate `thumb` at the content seam — the
 * same way tags validate against the registry in lib/tags.ts — rather than letting
 * a bad value fall through to pickMotif at render time.
 */
export const MOTIF_KEYS = ['code', 'audio', 'writing', 'reading', 'process', 'feed', 'datacenter', 'motion', 'tokens'] as const;
export type MotifKey = (typeof MOTIF_KEYS)[number];
export const isMotifKey = (s: string | undefined): s is MotifKey =>
  !!s && (MOTIF_KEYS as readonly string[]).includes(s);
