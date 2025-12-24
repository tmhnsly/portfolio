import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";
import cx from "@/utils/cx";

type BreakoutProps = HTMLAttributes<HTMLDivElement> & {
  keepGutter?: boolean;
};

export const Breakout = ({
  keepGutter = false,
  className,
  ...rest
}: BreakoutProps) => {
  return (
    <div
      className={cx(s.breakout, keepGutter && s.breakoutKeepGutter, className)}
      {...rest}
    />
  );
};
