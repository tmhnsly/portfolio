/**
 * Companies / establishments that recur across the site (timeline places,
 * project credits, copy). This is the SINGLE place a company's outbound link
 * lives — every Timeline entry that links out references `COMPANIES.<key>.url`,
 * never a raw URL (a data test enforces it), so a link updates in one place and
 * a typo'd key is a compile error.
 *
 * URLs are best-guess defaults — edit to the canonical site if any are wrong.
 */
export interface Company {
  name: string;
  url: string;
}

export const COMPANIES = {
  ft: { name: 'Financial Times', url: 'https://www.ft.com' },
  neverbland: { name: 'Neverbland', url: 'https://neverbland.com' },
  rocketmakers: { name: 'Rocketmakers', url: 'https://www.rocketmakers.com' },
  // iO Academy closed in 2025 and its own site is dead — the canonical link is now
  // the Course Report profile, so that's the URL to point at.
  ioAcademy: { name: 'iO Academy', url: 'https://www.coursereport.com/schools/io-academy' },
  ravensbourne: { name: 'Ravensbourne University', url: 'https://www.ravensbourne.ac.uk' },
  apple: { name: 'Apple', url: 'https://www.apple.com/uk/retail/' },
} as const satisfies Record<string, Company>;

export type CompanyKey = keyof typeof COMPANIES;
