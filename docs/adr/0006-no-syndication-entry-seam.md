# The sitemap, RSS feed, and llms.txt do not share a "syndication entry" seam

All three syndication surfaces — `app/sitemap.ts`, `app/feed.xml/route.ts`, `app/llms.txt/route.ts` — walk the content corpus (`getAllProjects`/`getAllPosts`) and build absolute URLs, so an architecture review will be tempted to extract a shared `syndicationEntries()` that maps the corpus to a list of `{ url, title, date, description }`. **Don't** — it's net-negative, and the deletion test exposes why.

The three surfaces diverge almost entirely:

- **sitemap** wants Projects and Posts as *separate* entry arrays, each with `changeFrequency`/`priority`, an `images` array (the OG image + the project's own hosted YouTube posters), and a `videos` block from `projectVideos`.
- **feed.xml** is Posts-*only*, RSS 2.0, needing `guid`/`pubDate` and its own XML `esc()`.
- **llms.txt** wants Projects and Posts as *separate* grouped markdown sections ("Selected work" / "Writing").

So no consumer actually wants a *merged* list — each would immediately re-split it back into projects and posts. And "description" means something different in each: the sitemap doesn't use a text description at all; the feed uses `post.excerpt`; llms.txt uses the *raw* `project.desc` (no fallback) for projects and `post.excerpt` for posts. A shared entry would have to carry every channel's superset or hand back the source object — at which point it's an empty pass-through.

The only genuinely repeated atom is `absUrl(projectHref(...))` / `absUrl(postHref(...))` — a one-line compose of two seams that already exist (`lib/routes.ts` + `lib/site-url.ts`). The cross-cutting facts that *do* deserve one home already have one: URL shapes in `routes.ts`, the absolute-URL helper in `site-url.ts`, and the video facts in `projectVideos` (`structured-data.ts`, shared by the on-page VideoObject and the video sitemap).

Apply the deletion test: delete a hypothetical `syndicationEntries()` and the complexity doesn't reappear concentrated — it reappears as three already-different formatters, each re-splitting and re-decorating. That's a shallow seam. Keep the three walkers independent; each owns its own format. Don't re-suggest a unified syndication-entry list.
