import s from "./Typography.module.scss";
import cx from "@/utils/cx";

export type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Weight = "regular" | "medium" | "semibold" | "bold";
export type Align = "left" | "center" | "right";
export type Wrap = "normal" | "pretty" | "balance" | "nowrap";
export type Trim = "none" | "start" | "end" | "both";

export type Color =
  | "default"
  | "accent"
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type Tone = "default" | "soft";

export function typographyClassNames(opts: {
  size: Size;
  weight: Weight;
  align: Align;
  wrap: Wrap;
  trim: Trim;
  truncate: boolean;
  className?: string;
  extra?: string | string[];
}) {
  return cx(
    s.base,
    s[`size-${opts.size}`],
    s[`w-${opts.weight}`],
    s[`align-${opts.align}`],
    s[`wrap-${opts.wrap}`],
    opts.trim !== "none" && s[`trim-${opts.trim}`],
    opts.truncate && s.truncate,
    opts.extra,
    opts.className
  );
}
