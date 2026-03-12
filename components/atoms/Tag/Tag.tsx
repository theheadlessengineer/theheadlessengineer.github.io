import Link from 'next/link';
import styles from './Tag.module.css';

export interface TagProps {
  readonly children: string;
  readonly href?: string;
}

export function Tag({ children, href }: TagProps): JSX.Element {
  if (href) {
    return (
      <Link href={href} className={styles.tag}>
        {children}
      </Link>
    );
  }

  return <span className={styles.tag}>{children}</span>;
}
