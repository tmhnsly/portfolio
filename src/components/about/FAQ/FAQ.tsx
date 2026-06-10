'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { BiChevronDown } from 'react-icons/bi';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './FAQ.module.scss';

/**
 * Visible FAQ (Radix accordion, themed) that mirrors the FAQPage JSON-LD on the
 * About page. The first item is open by default so an answer is in the SSR HTML;
 * the structured data carries every answer for crawlers and assistant search.
 */
export function FAQ() {
  const { faqEyebrow, faqHeading, faq } = COPY.about;
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.head}>
        <Eyebrow>{faqEyebrow}</Eyebrow>
        <h2 id="faq-heading" className={styles.heading}>
          {faqHeading}<span className={styles.period}>.</span>
        </h2>
      </div>
      <Accordion.Root type="single" collapsible defaultValue="faq-0" className={styles.root}>
        {faq.map((item, i) => (
          <Accordion.Item key={item.q} value={`faq-${i}`} className={styles.item}>
            <Accordion.Header className={styles.header}>
              <Accordion.Trigger className={styles.trigger}>
                <span>{item.q}</span>
                <BiChevronDown className={styles.chevron} aria-hidden />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.content}>
              <p className={styles.answer}>{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
