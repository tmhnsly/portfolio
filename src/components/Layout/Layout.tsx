import * as React from "react";
import s from "./Layout.module.scss";
import cx from "@/utils/cx";

export type SectionSize = 1 | 2 | 3 | 4;
export type SectionTone = "default" | "muted" | "inset";
export type ContainerSize = 1 | 2 | 3 | 4;
export type ContainerWidth = "content" | "fluid" | ContainerSize;

const SECTION_SIZE_CLASS: Record<SectionSize, string> = {
  1: s.sectionSize1,
  2: s.sectionSize2,
  3: s.sectionSize3,
  4: s.sectionSize4,
};

const SECTION_TONE_CLASS: Record<SectionTone, string> = {
  default: s.sectionToneDefault,
  muted: s.sectionToneMuted,
  inset: s.sectionToneInset,
};

const CONTAINER_SIZE_CLASS: Record<ContainerSize, string> = {
  1: s.containerSize1,
  2: s.containerSize2,
  3: s.containerSize3,
  4: s.containerSize4,
};

export function Page(props: React.HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props;
  return <main className={cx(s.page, className)} {...rest} />;
}

/**
 * Section
 * - Full-width band with vertical padding.
 * - Defaults to <section> for semantics.
 */
export function Section(
  props: React.HTMLAttributes<HTMLElement> & {
    size?: SectionSize;
    tone?: SectionTone;
  }
) {
  const { size = 3, tone = "default", className, ...rest } = props;

  return (
    <section
      className={cx(
        s.section,
        SECTION_SIZE_CLASS[size],
        SECTION_TONE_CLASS[tone],
        className
      )}
      {...rest}
    />
  );
}

/**
 * Container
 * - Centers content, adds gutters, constrains max width.
 * - width="content" uses the site-wide default (--layout-content-width).
 */
export function Container(
  props: React.HTMLAttributes<HTMLDivElement> & {
    width?: ContainerWidth;
  }
) {
  const { width = "content", className, ...rest } = props;

  const widthClass =
    width === "content"
      ? s.containerContent
      : width === "fluid"
      ? s.containerFluid
      : CONTAINER_SIZE_CLASS[width];

  return <div className={cx(s.container, widthClass, className)} {...rest} />;
}

/**
 * Breakout
 * - Use inside a Container when one child must span the viewport width
 *   (carousel/reel/full-width media).
 */
export function Breakout(
  props: React.HTMLAttributes<HTMLDivElement> & {
    keepGutter?: boolean;
  }
) {
  const { keepGutter = false, className, ...rest } = props;

  return (
    <div
      className={cx(s.breakout, keepGutter && s.breakoutKeepGutter, className)}
      {...rest}
    />
  );
}
