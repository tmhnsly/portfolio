import styles from './CodeBlock.module.scss';

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className={styles.block}>
      <code>{children}</code>
    </pre>
  );
}
