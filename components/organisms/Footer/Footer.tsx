import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';

/**
 * Site-wide footer component
 * Displays navigation links and logo
 * Responsive: Desktop shows horizontal layout, mobile stacks vertically
 */
export function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Footer navigation">
          {siteConfig.navigation.map(item => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.logoGroup}>
          <ThemeSwitcher />
          <Logo />
        </div>
      </div>
    </footer>
  );
}
