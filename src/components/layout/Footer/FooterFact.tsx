'use client';
import { useState } from 'react';
import { FOOTER_FACTS } from '@/data/facts';

/** Picks one true fact at random per page load. The lazy initializer differs
 *  between SSR and client, so suppressHydrationWarning silences the (harmless)
 *  mismatch — no effect, no setState, just a stable random pick for the session. */
export function FooterFact() {
  const [fact] = useState(() => FOOTER_FACTS[Math.floor(Math.random() * FOOTER_FACTS.length)]);
  return <p suppressHydrationWarning>{fact}</p>;
}
