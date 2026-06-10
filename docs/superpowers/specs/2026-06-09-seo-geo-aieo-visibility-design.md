# SEO / GEO / AI-EO visibility — design

**Date:** 2026-06-09
**Goal:** Make the site maximally findable and recommendable — by Google (SEO), Google AI Overviews (GEO), and assistant search like ChatGPT / Claude / Perplexity (AI-EO) — for **work**: both permanent roles (employers) and freelance/contract (clients).

## Positioning (locked)

- **Visible H1 stays `digital creative`.** No change to the hero identity.
- **Machine-readable label:** *Full-stack developer, frontend specialist.* Broad-first so it doesn't pigeonhole, with the React/Next.js/TypeScript specialism named. Schema `jobTitle` is an ordered array: `[Full-Stack Developer, Frontend Developer, Software Engineer]`.
- **Availability:** open to **permanent roles and freelance/contract** — never "freelance" alone.
- **Adaptability evidenced, not asserted:** `knowsAbout` lists the real dev stack from `tags.ts` plus high-level *Audio production / Video editing*, so range is data-backed.

Principle: **specific front door, broad house.** The precise keyword wins the match; the visible brand + `knowsAbout` breadth keep it from being a box.

## Copy (final)

- `<title>` (home default): `Tom Hinsley — Full-Stack Developer, Frontend Specialist` (subpages keep `%s · Tom Hinsley`).
- Meta description: *London-based full-stack developer, frontend specialist in React, Next.js & TypeScript. Open to roles and freelance work. Also makes audio and film.*
- Visible hire line (under hero CTA, subtle/mono): *Full-stack developer, frontend specialist — React, Next.js & TypeScript. Open to roles & freelance.*
- Availability block (new homepage section, after Recent work):
  - Eyebrow `Open to work` · Heading `Open to roles & freelance`
  - Body: *React, Next.js and TypeScript are home base, with full-stack reach when a project needs it — and I pick up new tools fast. The work here runs from web apps to audio and film. London, remote or on-site.*
  - CTAs: Get in touch (EmailLink) · Download CV.
- FAQ (on `/about`, drives `FAQPage`):
  - *Is Tom available for work?* → Yes — open to permanent roles and freelance or contract work, remote or in London.
  - *What's the core stack?* → React, Next.js and TypeScript, with full-stack capability and a strong accessibility focus. Comfortable picking up new tools as a project needs.
  - *Does he work remotely?* → Yes — remotely across the UK and internationally, and on-site in London.
  - *What kind of work does he take on?* → Full-stack and frontend for agencies, startups and digital publishers — including contract work for the Financial Times — plus self-initiated projects across audio and film.
  - *How do I get in touch?* → Email is best — use the contact link, or download the CV.

## Structured data (JSON-LD)

Routed through one tiny server component `JsonLd` (`src/components/seo/JsonLd.tsx`); builders live in `src/lib/structured-data.ts` (extends the existing `projectVideoJsonLd`). The existing inline VideoObject script is refactored onto `JsonLd` for consistency.

- **`Person` + `WebSite`** — sitewide in `layout.tsx` as an `@graph`. Person carries name, url, image (OG brand card for now; headshot later), `jobTitle` array, `description` (liftable prose), `address` (London/GB), `knowsAbout`, `alumniOf` (Ravensbourne), `sameAs` (GitHub/LinkedIn/YouTube/Instagram), `seeks`. **No email** — keeps the base64 obfuscation intact.
- **`BlogPosting`** — per post (`blog/[slug]`): headline, description, datePublished, author→Person, image (post OG), mainEntityOfPage.
- **`CreativeWork`** — per project, sibling to the existing VideoObject.
- **`BreadcrumbList`** — per content page (project, post, discipline), from existing breadcrumb data.
- **`FAQPage`** — from the `/about` FAQ Q&A (content is visible, per Google policy).

## llms.txt

Generated route `src/app/llms.txt/route.ts`, built from `SITE` + content so it stays fresh. Markdown brief: who/role/location/availability, stack, selected work (top projects + URLs), blog posts (+ URLs), links (GitHub/LinkedIn/YouTube), CV, contact note.

## Hygiene

- Canonical `www` — already shipped (#12).
- Sitemap: add `lastmod` to the top static pages.
- robots: AI crawlers (GPTBot, ClaudeBot, PerplexityBot) stay allowed (current `allow: '/'` already permits them) — keep it that way.

## Out of scope (phase 2+)

- Real headshot for `Person.image`.
- Client logos / testimonials.
- Off-site entity consistency (LinkedIn/GitHub job title + bio) — owner action, not code.

## Verification

- `npx vitest run`, `npx tsc --noEmit`, `npx eslint` clean.
- Each JSON-LD block validates in Google's Rich Results Test on the preview deploy.
- `llms.txt` served as `text/plain` at the site root.
