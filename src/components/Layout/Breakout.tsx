import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";

const cx = (...p: Array<string | undefined | false>) =>
  p.filter(Boolean).join(" ");

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
