/** A downward drag of `dy` px commits a dismiss once it passes `threshold`. */
export function dismissOnDragDown(dy: number, threshold = 100): boolean {
  return dy > threshold;
}
