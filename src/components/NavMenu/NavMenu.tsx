"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiMenu } from "react-icons/fi";
import s from "./NavMenu.module.scss";

export type NavItem = { label: string; href: string };

export type NavMenuProps = {
  items: NavItem[];
  label?: string;
};

export const NavMenu = ({ items = [], label = "Open menu" }: NavMenuProps) => {
  const pathname = usePathname();
  if (items.length === 0) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.trigger} aria-label={label} type="button">
          <FiMenu size={18} aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} sideOffset={10} align="end">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <DropdownMenu.Item key={item.href} asChild className={s.menuItem}>
                <Link
                  className={s.menuLink}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
