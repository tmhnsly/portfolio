import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";
import cx from "@/utils/cx";

export type ContainerSize = 1 | 2 | 3 | 4;
export type ContainerWidth = "content" | "fluid" | ContainerSize;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: ContainerWidth;
};

const SIZE_CLASS: Record<ContainerSize, string> = {
  1: s.containerSize1,
  2: s.containerSize2,
  3: s.containerSize3,
  4: s.containerSize4,
};

export const Container = ({
  width = "content",
  className,
  ...rest
}: ContainerProps) => {
  const widthClass =
    width === "content"
      ? s.containerContent
      : width === "fluid"
      ? s.containerFluid
      : SIZE_CLASS[width];

  return <div className={cx(s.container, widthClass, className)} {...rest} />;
};
