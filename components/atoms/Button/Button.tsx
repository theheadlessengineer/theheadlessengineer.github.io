import Link from 'next/link';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: 'primary' | 'secondary';
  /** Button content */
  children: React.ReactNode;
  /** Optional href to render as link instead of button */
  href?: string;
}

/**
 * Terminal-styled button component
 * Renders as link if href is provided, otherwise as button
 * Styled with brackets and uppercase text following terminal theme
 *
 * @example
 * ```tsx
 * <Button href="/contact">Get In Touch</Button>
 * <Button variant="secondary" onClick={handleClick}>Submit</Button>
 * ```
 */
export function Button({
  variant = 'primary',
  children,
  href,
  ...props
}: ButtonProps): JSX.Element {
  const className = cn(styles.button, variant && styles[variant]);

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
