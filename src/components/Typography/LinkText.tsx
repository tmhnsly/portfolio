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

export type LinkTextProps<TAs extends React.ElementType = "a"> = {
  as?: TAs;
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
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "color">;

export function LinkText<TAs extends React.ElementType = "a">({
  as,
  size = 3,
  weight = "medium",
  align = "left",
  color = "info",
  tone = "default",
  wrap = "normal",
  truncate = false,
  trim = "none",
  className,
  ...props
}: LinkTextProps<TAs>) {
  const Comp = (as ?? "a") as React.ElementType;

  return (
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
        extra: s.link,
      })}
      {...props}
    />
  );
}
