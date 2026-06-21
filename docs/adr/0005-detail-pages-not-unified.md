# Project and Post detail pages are kept as two shapes, not unified

The Project detail page (`app/[discipline]/[slug]/page.tsx`) and the Post detail page (`app/blog/[slug]/page.tsx`) both follow a hero → body → prev/next → related rhythm, so an architecture review will be tempted to extract a shared `ContentDetailPage`. **Don't** — they diverge where it matters and the shared rhythm is already factored out at the right grain.

What's genuinely shared is *already* deep, behind small seams the two pages both call:

- neighbours + related selection — `projectNeighbours`/`relatedProjects` vs `postNeighbours`/`relatedPosts` in `lib/content.ts`;
- prev/next chrome — the generic `ui/PrevNext`;
- the head facts — `projectHead`/`postHead` in `lib/page-head.ts`;
- card display facts — `projectPresentation`/`postPresentation`.

What differs is the *body* of each page, and it differs a lot: the Project page has a `MediaHero` + `ProjectHero` over a Project's `media`; the Post page has an AI-notice banner, an end-matter block (tags + "send a note" `EmailLink`), an `AuthorCard`, and a bespoke related grid. A unified shape would need so many slots/flags to express those differences that it would be harder to read than the two explicit pages — the classic "unify things that merely look alike" trap this project has already declined for the two reveal mechanisms (ADR-0002) and the Discipline definition split (ADR-0003).

Apply the deletion test: delete a hypothetical `ContentDetailPage` and the complexity doesn't reappear across N callers — there are only two, and each would just inline its own already-distinct assembly. That's a shallow abstraction.

One sub-piece is worth revisiting *if it grows a third caller*: the blog page's inline `RelatedCard` (`blog/[slug]/page.tsx`) is a near-cousin of the project `RelatedWork`/`ProjectCard`. Today they're different enough (PostThumb + category pill + reading time vs ProjectThumb + tech chips) that sharing them would also be premature. Keep both detail pages explicit; don't re-suggest a unified detail-page shape.
