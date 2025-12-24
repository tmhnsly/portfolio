"use client";

import React from "react";
import { motion } from "motion/react";
import {
  typographyClassNames,
  type Align,
  type Color,
  type Size,
  type Tone,
  type Trim,
  type Weight,
  type Wrap,
} from "./typography";
import { getRevealProps } from "./getRevealProps";
import s from "./Typography.module.scss";

export type HeadingProps<TAs extends React.ElementType = "h2"> = {
  as?: TAs;
  size?: Size;
  weight?: Weight;
  align?: Align;
  color?: Color;
  tone?: Tone;
  wrap?: Wrap;
  truncate?: boolean;
  trim?: Trim;
  reveal?: boolean;
  revealDelay?: number;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "color">;

export function Heading<TAs extends React.ElementType = "h2">({
  as,
  size = 6,
  weight = "medium",
  align = "left",
  color = "default",
  tone = "default",
  wrap = "pretty",
  truncate = false,
  trim = "none",
  reveal = false,
  revealDelay,
  className,
  ...props
}: HeadingProps<TAs>) {
  const Comp = (as ?? "h2") as React.ElementType;
  const revealProps = getRevealProps({ reveal, delay: revealDelay });

  const content = (
    <Comp
      data-color={color}
      data-tone={tone}
      className={typographyClassNames({
        size,
        weight,
        align,
        wrap,
        trim,
        truncate,
        className,
        extra: s.heading,
      })}
      {...props}
    />
  );

  if (!revealProps) return content;

  return <motion.div {...revealProps}>{content}</motion.div>;
}
