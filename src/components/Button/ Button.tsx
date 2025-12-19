"use client";

import s from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className={s.button} {...props} />;
}
