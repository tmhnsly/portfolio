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

export type TextProps<TAs extends React.ElementType = "span"> = {
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

export function Text<TAs extends React.ElementType = "span">({
  as,
  size = 3,
  weight = "regular",
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
}: TextProps<TAs>) {
  const Comp = (as ?? "span") as React.ElementType;
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
        extra: s.text,
      })}
      {...props}
    />
  );

  if (!revealProps) return content;

  return <motion.span {...revealProps}>{content}</motion.span>;
}
