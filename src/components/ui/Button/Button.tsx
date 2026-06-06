import { cx } from '@/lib/cx';
import styles from './Button.module.scss';
type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
interface ButtonProps {
  variant: Variant;
  children: React.ReactNode;
  href?: string;
  /** when set on an href button, downloads the target (optionally renaming the file) */
  download?: boolean | string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  'aria-label'?: string;
}
export function Button({ variant, children, href, download, onClick, type = 'button', className, 'aria-label': ariaLabel }: ButtonProps) {
  const cls = cx(styles.btn, styles[variant], className);
  if (href) return <a href={href} download={download} className={cls} aria-label={ariaLabel}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>{children}</button>;
}
