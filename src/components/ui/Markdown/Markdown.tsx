import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '../CodeBlock';
import { Chart } from '../Chart';
import { Demo } from '../Demo';
import styles from './Markdown.module.scss';

export function Markdown({ children }: { children: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          p: ({ children }) => <p className={styles.p}>{children}</p>,
          a: ({ href, children }) => {
            // external links open in a new tab (so readers don't lose the post)
            const external = !!href && /^https?:\/\//.test(href);
            const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
            return <a className={styles.a} href={href} {...ext}>{children}</a>;
          },
          ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
          blockquote: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children }) => {
            const cls = className ?? '';
            // ```chart blocks render a Radix-coloured bar chart (see Chart)
            if (cls.includes('language-chart')) return <Chart json={String(children)} />;
            // ```demo blocks render a real component inline (see Demo)
            if (cls.includes('language-demo')) return <Demo spec={String(children)} />;
            // any other ```lang fence → Shiki-highlighted block; bare `code` → inline
            const lang = /language-([\w-]+)/.exec(cls)?.[1];
            return lang
              ? <CodeBlock code={String(children).replace(/\n$/, '')} lang={lang} />
              : <code className={styles.inlineCode}>{children}</code>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
