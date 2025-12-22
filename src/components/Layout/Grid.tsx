"use client";

import * as React from "react";
import type { CSSProperties, ReactNode } from "react";

import s from "./Layout.module.scss";
import { animation } from "@/styles/animation";
import { motion } from "motion/react";

const cx = (...p: Array<string | undefined | false>) =>
  p.filter(Boolean).join(" ");

export type GridCols = 1 | 2 | 3 | 4;
export type GridPreset =
  | "none"
  | "sidebar"
  | "sidebarReverse"
  | "feature"
  | "bento";
export type GridCollapse = "never" | "mobile" | "tablet";
export type GridMotion = "none" | "container" | "stagger";

/**
 * Safe “div-like” props without bringing in DOM drag handlers that conflict with Motion.
 * Add more explicit props as you need them (onClick etc).
 */
type SafeDivProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;

  id?: string;
  role?: string;
  tabIndex?: number;

  // Allow aria-* and data-* pass-through
  [key: `aria-${string}`]: unknown;
  [key: `data-${string}`]: unknown;
};

type GridProps = SafeDivProps & {
  cols?: GridCols;
  preset?: GridPreset;
  collapse?: GridCollapse;
  gap?: string;

  motion?: GridMotion;
  motionOnce?: boolean;
  motionStagger?: number;
  motionDelay?: number;
};

/** Typed helper: set CSS custom props without `any` */
const withCssVar = (
  base: CSSProperties | undefined,
  name: `--${string}`,
  value: string
): CSSProperties => {
  return { ...(base ?? {}), [name]: value } as CSSProperties;
};

const COLS_CLASS: Record<GridCols, string> = {
  1: s.gridCols1,
  2: s.gridCols2,
  3: s.gridCols3,
  4: s.gridCols4,
};

const PRESET_CLASS: Record<Exclude<GridPreset, "none">, string> = {
  sidebar: s.gridPresetSidebar,
  sidebarReverse: s.gridPresetSidebarReverse,
  feature: s.gridPresetFeature,
  bento: s.gridPresetBento,
};

const containerReveal = {
  hidden: { opacity: 0, y: animation.reveal.y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.base, ease: animation.ease.out },
  },
} as const;

const staggerContainer = {
  hidden: {},
  show: (cfg: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: cfg.stagger, delayChildren: cfg.delay },
  }),
} as const;

const itemReveal = {
  hidden: { opacity: 0, y: animation.reveal.y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.base, ease: animation.ease.out },
  },
} as const;

export const Grid = ({
  cols = 1,
  preset = "none",
  collapse = "tablet",
  gap,

  motion: motionMode = "none",
  motionOnce = animation.reveal.once,
  motionStagger = animation.reveal.stagger,
  motionDelay = animation.reveal.delay,

  className,
  style,
  children,
  ...attrs
}: GridProps) => {
  const collapseClass =
    collapse === "mobile"
      ? s.gridCollapseMobile
      : collapse === "tablet"
      ? s.gridCollapseTablet
      : undefined;

  const presetClass = preset === "none" ? undefined : PRESET_CLASS[preset];

  const mergedStyle = gap ? withCssVar(style, "--grid-gap", gap) : style;

  const gridClassName = cx(
    s.grid,
    presetClass ?? COLS_CLASS[cols],
    collapseClass,
    className
  );

  if (motionMode === "none") {
    return (
      <div className={gridClassName} style={mergedStyle} {...attrs}>
        {children}
      </div>
    );
  }

  if (motionMode === "container") {
    return (
      <motion.div
        className={gridClassName}
        style={mergedStyle}
        variants={containerReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: motionOnce, margin: animation.reveal.margin }}
        {...attrs}
      >
        {children}
      </motion.div>
    );
  }

  const wrappedChildren = React.Children.map(children, (child) => {
    if (child == null) return child;
    if (typeof child === "string" || typeof child === "number") return child;
    return <motion.div variants={itemReveal}>{child}</motion.div>;
  });

  return (
    <motion.div
      className={gridClassName}
      style={mergedStyle}
      variants={staggerContainer}
      custom={{ stagger: motionStagger, delay: motionDelay }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: motionOnce, margin: animation.reveal.margin }}
      {...attrs}
    >
      {wrappedChildren}
    </motion.div>
  );
};
