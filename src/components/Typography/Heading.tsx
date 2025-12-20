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
} from "./typography";
import s from "./Typography.module.scss";

export type HeadingProps<TAs extends React.ElementType = "h2"> = {
  as?: TAs;
  size?: Size;
  weight?: Weight;
  align?: Align;
  color?: Color;
  tone?: Tone;
  trim?: Trim;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "color">;

export function Heading<TAs extends React.ElementType = "h2">({
  as,
  size = 6,
  weight = "bold",
  align = "left",
  color = "default",
  tone = "default",
  trim = "none",
  className,
  ...props
}: HeadingProps<TAs>) {
  const Comp = (as ?? "h2") as React.ElementType;

  return (
    <Comp
      data-color={color}
      data-tone={tone}
      className={typographyClassNames({
        size,
        weight,
        align,
        wrap: "balance",
        trim,
        truncate: false,
        className,
        extra: s.heading,
      })}
      {...props}
    />
  );
}
