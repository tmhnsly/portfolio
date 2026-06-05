/**
 * cx — join truthy class names with a space.
 * Replaces the repeated `[a, cond && b].filter(Boolean).join(' ')` idiom so
 * conditional className composition lives in one tested place.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
