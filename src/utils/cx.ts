import clsx, { type ClassValue } from "clsx";

export type { ClassValue };

export default function cx(...values: ClassValue[]) {
  return clsx(values);
}
