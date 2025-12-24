import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";
import cx from "@/utils/cx";

type PageProps = HTMLAttributes<HTMLElement>;

export const Page = ({ className, ...rest }: PageProps) => {
  return <main className={cx(s.page, className)} {...rest} />;
};
