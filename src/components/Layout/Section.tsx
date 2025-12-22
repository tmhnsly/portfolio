import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";

const cx = (...p: Array<string | undefined | false>) =>
  p.filter(Boolean).join(" ");

export type SectionSize = 1 | 2 | 3 | 4;
export type SectionTone = "default" | "muted" | "inset";

type SectionProps = HTMLAttributes<HTMLElement> & {
  size?: SectionSize;
  tone?: SectionTone;
};

const SIZE_CLASS: Record<SectionSize, string> = {
  1: s.sectionSize1,
  2: s.sectionSize2,
  3: s.sectionSize3,
  4: s.sectionSize4,
};

const TONE_CLASS: Record<SectionTone, string> = {
  default: s.sectionToneDefault,
  muted: s.sectionToneMuted,
  inset: s.sectionToneInset,
};

export const Section = ({
  size = 3,
  tone = "default",
  className,
  ...rest
}: SectionProps) => {
  return (
    <section
      className={cx(s.section, SIZE_CLASS[size], TONE_CLASS[tone], className)}
      {...rest}
    />
  );
};
