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

export type KbdProps = {
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
} & Omit<React.HTMLAttributes<HTMLElement>, "color">;

export function Kbd({
  size = 2,
  weight = "medium",
  align = "left",
  color = "default",
  tone = "default",
  wrap = "nowrap",
  truncate = false,
  trim = "none",
  className,
  ...props
}: KbdProps) {
  return (
    <kbd
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
        extra: s.kbd,
      })}
      {...props}
    />
  );
}
