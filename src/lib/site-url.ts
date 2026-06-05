/** Canonical production origin — used for metadataBase, sitemap, robots, OG. */
export const SITE_URL = 'https://tomhinsley.com';

/** SITE_URL without its protocol — for display (e.g. the OG card footer). */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');
