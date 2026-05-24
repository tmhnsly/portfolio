import styles from './Button.module.scss';
type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
interface ButtonProps {
  variant: Variant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  'aria-label'?: string;
}
export function Button({ variant, children, href, onClick, type = 'button', className, 'aria-label': ariaLabel }: ButtonProps) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');
  if (href) return <a href={href} className={cls} aria-label={ariaLabel}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>{children}</button>;
}
