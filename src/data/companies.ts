/**
 * Companies / establishments that recur across the site (timeline places,
 * project credits, copy). Keep their website URLs HERE so they live in one
 * place and update once. Reference `COMPANIES.<key>.url` wherever you link out
 * (e.g. timeline entries set `companyUrl: COMPANIES.neverbland.url`).
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
  ioAcademy: { name: 'iO Academy', url: 'https://ioacademy.co.uk' },
  ravensbourne: { name: 'Ravensbourne University', url: 'https://www.ravensbourne.ac.uk' },
} as const satisfies Record<string, Company>;

export type CompanyKey = keyof typeof COMPANIES;
