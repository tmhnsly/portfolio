import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";
import { Grid } from "./Grid";

const cx = (...p: Array<string | undefined | false>) =>
  p.filter(Boolean).join(" ");

export type BentoSpan = 3 | 4 | 6 | 8 | 9 | 12;
export type BentoHeight = "auto" | "sm" | "md" | "lg";

type BentoProps = HTMLAttributes<HTMLDivElement> & {
  gap?: string;
  motion?: "none" | "container" | "stagger";
};

type BentoItemProps = HTMLAttributes<HTMLDivElement> & {
  span?: BentoSpan;
  height?: BentoHeight;
};

const SPAN_CLASS: Record<BentoSpan, string> = {
  3: s.bentoSpan3,
  4: s.bentoSpan4,
  6: s.bentoSpan6,
  8: s.bentoSpan8,
  9: s.bentoSpan9,
  12: s.bentoSpan12,
};

const HEIGHT_CLASS: Record<BentoHeight, string> = {
  auto: s.bentoHeightAuto,
  sm: s.bentoHeightSm,
  md: s.bentoHeightMd,
  lg: s.bentoHeightLg,
};

export const Bento = ({
  gap,
  motion = "none",
  className,
  children,
  ...rest
}: BentoProps) => {
  return (
    <Grid
      preset="bento"
      collapse="tablet"
      gap={gap}
      motion={motion}
      className={className}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export const BentoItem = ({
  span,
  height = "auto",
  className,
  ...rest
}: BentoItemProps) => {
  return (
    <div
      className={cx(
        s.bentoItem,
        span ? SPAN_CLASS[span] : undefined,
        HEIGHT_CLASS[height],
        className
      )}
      {...rest}
    />
  );
};
