'use client';
import { useEmail } from './useEmail';
import { cx } from '@/lib/cx';
import { LinkArrow } from '@/components/ui/LinkArrow';
import btn from '@/components/ui/Button/Button.module.scss';

/**
 * A mailto link whose address is revealed client-side (see useEmail) — no literal
 * email in the SSR HTML. Drop into server components freely.
 * - `children` = visible label (e.g. "Say hi"); omit to show the email address.
 * - `variant` = reuse Button's primary/ghost styling.
 * - `showArrow`/`inline` = append the brand LinkArrow.
 */
export function EmailLink({
  subject,
  children,
  className,
  variant,
  showArrow = false,
  inline = false,
  mask = 'Email me',
}: {
  subject?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost';
  showArrow?: boolean;
  inline?: boolean;
  mask?: string;
}) {
  const { email, mailto } = useEmail();
  const cls = cx(variant && btn.btn, variant && btn[variant], className) || undefined;
  return (
    <a className={cls} href={mailto(subject)}>
      {children ?? email ?? mask}
      {showArrow && <LinkArrow inline={inline} />}
    </a>
  );
}
