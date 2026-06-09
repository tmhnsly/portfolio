/**
 * Renders a JSON-LD <script> for structured data. Server component — drop a
 * builder result from src/lib/structured-data.ts straight in. One seam so every
 * page emits schema the same way and the markup stays out of the page bodies.
 *
 * The serialised JSON is escaped before injection: `<`, `>` and `&` are rewritten
 * to their `\uXXXX` forms so no stored value (a project title, post excerpt, …)
 * can break out of the <script> with `</script>` or an HTML comment.
 * JSON.stringify only ever emits these characters inside string values, so the
 * escapes are valid JSON and parsers decode them identically.
 */
function safeJsonLd(data: object | object[]): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}
