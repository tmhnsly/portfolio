'use client';
import { useEffect, useState } from 'react';
import { decodeEmail, mailtoHref } from '@/lib/email';

/**
 * Reveals the contact email only AFTER mount, so it's absent from the SSR HTML
 * (and the first client render) — bulk scrapers fetching the markup never see it.
 * Returns the decoded `email` (null until mounted) and a `mailto(subject?)` builder.
 */
export function useEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    // one-time reveal after hydration (SSR + first render = null → no mismatch)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(decodeEmail());
  }, []);
  return { email, mailto: (subject?: string) => (email ? mailtoHref(email, subject) : undefined) };
}
