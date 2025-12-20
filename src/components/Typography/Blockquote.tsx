"use client";

import React from "react";
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
import s from "./Typography.module.scss";

export type BlockquoteProps = {
  size?: Size;
  weight?: Weight;
  align?: Align;
  color?: Color;
  tone?: Tone;
  wrap?: Wrap;
  truncate?: boolean;
  trim?: Trim;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.BlockquoteHTMLAttributes<HTMLElement>, "color">;

export function Blockquote({
  size = 4,
  weight = "regular",
  align = "left",
  color = "default",
  tone = "default",
  wrap = "pretty",
  truncate = false,
  trim = "none",
  className,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
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
        extra: s.blockquote,
      })}
      {...props}
    />
  );
}
