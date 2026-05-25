# Breadcrumb data is built in the server layout and threaded through the Shell

The persistent **Breadcrumb** needs per-discipline project counts, a path→title map, and the post count (from `lib/content.ts`, which reads the markdown corpus via `node:fs` and is therefore **server-only**). The Breadcrumb itself is a **client** component (it uses `usePathname()` and animates). So the data is computed once in the server root layout (`app/layout.tsx` via `breadcrumbData()`) and passed as a single `breadcrumbData` prop through the (client) **Shell** to the Breadcrumb.

The Shell does not read this prop — it's a deliberate pass-through. A future reader might be tempted to "simplify" by having the Breadcrumb call the content queries directly; that's not possible because `node:fs` can't run in a client component. Keep the server→client threading.
