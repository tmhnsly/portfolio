"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidBolt } from "react-icons/bi";
import { NavMenu, type NavItem } from "@/components/NavMenu/NavMenu";
import s from "./Nav.module.scss";

export type NavProps = {
  homeLabel: string;
  homeHref?: string;
  items?: NavItem[];
};

export const Nav = ({ homeLabel, homeHref = "/", items = [] }: NavProps) => {
  const pathname = usePathname();
  const isHomeActive = pathname === homeHref;

  return (
    <nav className={s.nav} aria-label="Primary">
      <div className={s.inner}>
        <Link
          className={s.home}
          href={homeHref}
          aria-label="Home"
          aria-current={isHomeActive ? "page" : undefined}
        >
          <span className={s.homeIcon} aria-hidden="true">
            <BiSolidBolt size={16} />
          </span>
          <span className={s.homeText}>{homeLabel}</span>
        </Link>

        <ul className={s.list}>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className={s.item}>
                <Link
                  className={s.link}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={s.mobileOnly}>
          <NavMenu items={items} />
        </div>
      </div>
    </nav>
  );
};
