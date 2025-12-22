import type { HTMLAttributes } from "react";
import s from "./Layout.module.scss";

const cx = (...p: Array<string | undefined | false>) =>
  p.filter(Boolean).join(" ");

type PageProps = HTMLAttributes<HTMLElement>;

export const Page = ({ className, ...rest }: PageProps) => {
  return <main className={cx(s.page, className)} {...rest} />;
};
