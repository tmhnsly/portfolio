"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import s from "./Button.module.scss";
import cx from "@/utils/cx";

type Variant = "solid" | "soft" | "outline" | "ghost" | "glass";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
};

type ButtonMode = Common &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "className"
  > & {
    as?: "button";
    asChild?: false;
  };

type AnchorMode = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    as: "a";
    href: string;
    asChild?: false;
  };

type ChildMode = Common &
  Omit<React.HTMLAttributes<HTMLElement>, "className"> & {
    asChild: true;
    as?: never;
    children: React.ReactElement;
  };

export type ButtonProps = ButtonMode | AnchorMode | ChildMode;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const { variant = "solid", size = "md", className, disabled = false } = props;

  const classes = cx(
    s.button,
    s[`variant_${variant}`],
    s[`size_${size}`],
    className
  );

  // asChild (Next Link etc.)
  if ("asChild" in props && props.asChild) {
    const { children, ...rest } = props;
    return (
      <Slot
        ref={ref as unknown as React.Ref<HTMLElement>}
        className={classes}
        data-variant={variant}
        data-size={size}
        data-disabled={disabled ? "" : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : rest.tabIndex}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          rest.onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  // anchor mode
  if ("as" in props && props.as === "a") {
    const { as: _as, href, onClick, tabIndex, ...rest } = props;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        data-variant={variant}
        data-size={size}
        data-disabled={disabled ? "" : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        href={disabled ? undefined : href}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      />
    );
  }

  // button mode (default)
  const { as: _as, onClick, ...rest } = props;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      {...rest}
    />
  );
});
