import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Logo.module.css';

/**
 * Site logo component
 * Renders as a link to homepage with configured logo text
 */
export function Logo(): JSX.Element {
  return (
    <Link href="/" className={styles.logo}>
      {siteConfig.logo}
    </Link>
  );
}
