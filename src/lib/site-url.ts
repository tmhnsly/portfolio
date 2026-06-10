/** Canonical production origin — used for metadataBase, sitemap, robots, OG.
    `www` is the primary host (the bare apex 308-redirects to it), so canonicals,
    sitemap entries, and structured-data URLs all resolve without a hop. */
export const SITE_URL = 'https://www.tomhinsley.com';

/** SITE_URL without its protocol or `www.` — the clean brand host for display
    (e.g. the OG card footer reads "tomhinsley.com", not "www.tomhinsley.com"). */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '').replace(/^www\./, '');

/** Absolutise a site path against SITE_URL; passes already-absolute URLs through.
    The one URL-prefixer shared by sitemap, RSS, llms.txt and structured data. */
export const absUrl = (path: string): string => (path.startsWith('http') ? path : `${SITE_URL}${path}`);
