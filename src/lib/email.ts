/**
 * Contact email, kept base64-encoded so the literal address never appears in the
 * rendered HTML, the source, or the client JS bundle as plain text — it's decoded
 * at runtime (client-side, after mount, via the EmailLink/useEmail helpers). This
 * stops bulk HTML scrapers / email harvesters. It is NOT bulletproof against bots
 * that execute JS and base64-decode bundle strings — that's an accepted trade-off
 * for keeping a friendly mailto: link.
 */
const ENCODED = 'aGVsbG9AdG9taGluc2xleS5jb20='; // base64('hello@tomhinsley.com')

/** Decode the contact email (browser `atob`, with a Node fallback for tests/SSR). */
export function decodeEmail(): string {
  return typeof atob === 'function' ? atob(ENCODED) : Buffer.from(ENCODED, 'base64').toString('utf8');
}

/** Build a `mailto:` href (with an optional pre-filled subject). */
export function mailtoHref(email: string, subject?: string): string {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
