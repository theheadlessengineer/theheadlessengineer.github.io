import Link from 'next/link';
import styles from './BackLink.module.css';

export interface BackLinkProps {
  readonly href: string;
  readonly text: string;
}

export function BackLink({ href, text }: BackLinkProps): JSX.Element {
  return (
    <div className={styles.backLink}>
      <Link href={href}>{text}</Link>
    </div>
  );
}
