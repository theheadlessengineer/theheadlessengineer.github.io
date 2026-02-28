import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  href?: string;
  className?: string;
  target?: string;
}

export function Card({ children, title, href, className, target }: CardProps): JSX.Element {
  const props = {
    className: `${styles.card} ${className || ''}`,
    target: `${target || '_self'}`,
    ...(title && { 'data-title': title }),
  };

  if (href) {
    return (
      <Link href={href} {...props} target={target}>
        {children}
      </Link>
    );
  }

  return <div {...props}>{children}</div>;
}
