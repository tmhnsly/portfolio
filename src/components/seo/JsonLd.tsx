/**
 * Renders a JSON-LD <script> for structured data. Server component — drop a
 * builder result from src/lib/structured-data.ts straight in. One seam so every
 * page emits schema the same way and the markup stays out of the page bodies.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
