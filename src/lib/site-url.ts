/** Canonical production origin — used for metadataBase, sitemap, robots, OG.
    `www` is the primary host (the bare apex 308-redirects to it), so canonicals,
    sitemap entries, and structured-data URLs all resolve without a hop. */
export const SITE_URL = 'https://www.tomhinsley.com';

/** SITE_URL without its protocol or `www.` — the clean brand host for display
    (e.g. the OG card footer reads "tomhinsley.com", not "www.tomhinsley.com"). */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '').replace(/^www\./, '');
